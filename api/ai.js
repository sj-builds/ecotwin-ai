export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { messages = [], type = "chat", context = {} } = req.body;

    // ---------------- SYSTEM CONTROL ----------------

    let systemPrompt = "";

    if (type === "analysis") {
      systemPrompt = `
You are EcoTwin AI.

Analyze sustainability data and return STRICT JSON.

Format:
[
  {
    "type": "prediction | anomaly | recommendation",
    "title": "string",
    "description": "string",
    "impact": "Low | Medium | High",
    "confidence": number (0-100)
  }
]

Rules:
- No extra text
- No markdown
- No explanation outside JSON
`;
    } else {
      systemPrompt = `
You are EcoTwin AI assistant.

Rules:
- Be concise
- Give actionable insights
- Avoid generic answers
`;
    }

    // ---------------- PROMPT BUILD ----------------

    const userText = messages.map(m => m.content).join("\n");

    const finalPrompt = `
${systemPrompt}

Context:
${JSON.stringify(context, null, 2)}

User:
${userText}
`;

    // ---------------- GEMINI CALL ----------------

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: finalPrompt }] }],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: "Gemini API error",
        details: data,
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated";

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({
      error: "AI failed",
      details: err.message,
    });
  }
}