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
You are EcoTwin AI — an advanced sustainability analytics engine.

Your job is NOT to describe data.
Your job is to EXTRACT INSIGHTS.

You must:
1. Detect anomalies (sudden spikes/drops)
2. Identify trends (growth/decline patterns)
3. Correlate signals (traffic, air quality, energy, alerts)
4. Predict near-future outcomes
5. Recommend actions with measurable impact

OUTPUT STRICT JSON:

[
  {
    "type": "anomaly | prediction | recommendation",
    "title": "specific insight",
    "description": "WHY this is happening using data relationships and % change",
    "impact": "Low | Medium | High",
    "confidence": number (0-100)
  }
]

CRITICAL RULES:
- MUST include at least 1 anomaly, 1 prediction, 1 recommendation
- MUST use numbers or % when possible
- MUST explain cause (not just state)
- MUST connect multiple signals if available
- NO generic statements
- NO text outside JSON

EXAMPLE GOOD OUTPUT:
[
  {
    "type": "anomaly",
    "title": "Energy spike beyond baseline",
    "description": "Energy usage increased by ~18% compared to previous cycle, coinciding with high traffic levels indicating peak load demand",
    "impact": "High",
    "confidence": 92
  },
  {
    "type": "prediction",
    "title": "Rising consumption trend",
    "description": "If current growth rate (~10%) continues, next cycle will exceed safe capacity limits",
    "impact": "Medium",
    "confidence": 85
  },
  {
    "type": "recommendation",
    "title": "Load balancing required",
    "description": "Redistributing peak-hour usage could reduce energy spikes by 12–15%",
    "impact": "High",
    "confidence": 88
  }
]
`;
    } else {
      systemPrompt = `
You are EcoTwin AI — a smart city assistant.

Your job:
- Interpret data (not repeat it)
- Explain implications
- Suggest specific actions

RULES:
- Do NOT restate raw data
- Be concise but insightful
- Avoid generic answers

Example:
Bad: "Traffic is high"
Good: "High traffic suggests congestion buildup, likely increasing emissions and delays"
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
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: finalPrompt }] }],
          generationConfig: {
            temperature: 0.2,
            topK: 10,
            topP: 0.8,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("GEMINI ERROR:", data);
      return res.status(500).json({
        error: data?.error?.message || "Gemini API error",
      });
    }

    let reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated";

    // ---------------- SAFETY CLEANUP ----------------

    if (type === "analysis") {
      const match = reply.match(/\[.*\]/s);
      reply = match ? match[0] : "[]";
    }

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({
      error: err.message || "AI failed",
    });
  }
}