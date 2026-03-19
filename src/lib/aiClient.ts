import { localAI } from "./localAI";

let cache: any = {};

export async function askAI({
  input,
  context,
  type = "chat",
}: {
  input: string;
  context?: any;
  type?: string;
}) {
  const key = JSON.stringify({ input, context, type });

  // ---------- CACHE ----------
  if (cache[key]) return cache[key];

  // ---------- LOCAL AI ----------
  const localResult = localAI({ input, context, type });

  // If analysis → local is enough
  if (type === "analysis" && localResult.length > 0) {
    const response = {
      reply: JSON.stringify(localResult),
      source: "local",
    };

    cache[key] = response;
    return response;
  }

  // ---------- GEMINI FALLBACK ----------
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: [{ content: input }], context, type }),
    });

    if (!res.ok) {
      throw new Error("API error");
    }

    const data = await res.json();

    cache[key] = {
      ...data,
      source: "gemini",
    };

    return data;

  } catch (err) {
    // fallback if Gemini fails
    return {
      reply: JSON.stringify(localResult),
      source: "fallback",
    };
  }
}