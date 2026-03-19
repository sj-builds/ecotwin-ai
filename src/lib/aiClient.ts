export async function askAI({
  input,
  context = {},
  type = "chat",
}: {
  input: string;
  context?: any;
  type?: "chat" | "analysis";
}) {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: input }],
      context,
      type,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || "AI request failed");
  }

  return res.json();
}