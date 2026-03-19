import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Loader2 } from "lucide-react";
import { askAI } from "@/lib/aiClient";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hello. I am EcoTwin AI. Ask about sustainability insights.",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;

    setInput("");
    setLoading(true);

    // Optimistic UI update
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
    ]);

    try {
      // 🔥 Replace with real dynamic data later
      const context = {
        airQuality: "Moderate",
        traffic: "High",
        alerts: 2,
      };

      const res = await askAI({
        input: userText,
        context,
        type: "chat",
      });

      const reply =
        res?.reply?.trim() ||
        "No meaningful response generated.";

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: reply },
      ]);

    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            err?.message ||
            "AI request failed. Try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-emerald-500 text-black shadow-lg flex items-center justify-center hover:scale-110 transition"
      >
        <Bot size={22} />
      </button>

      {/* Chat Window */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 w-[360px] max-w-[90vw] h-[520px] z-50 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex flex-col"
          >
            {/* Header */}

            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Bot size={18} className="text-emerald-400" />
                <span className="text-sm text-white">
                  EcoTwin AI
                </span>
              </div>

              <button onClick={() => setOpen(false)}>
                <X size={16} />
              </button>
            </div>

            {/* Messages */}

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] text-xs px-3 py-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-emerald-500 text-black"
                        : "bg-black/40 border border-white/10 text-gray-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Loading */}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Loader2
                      className="animate-spin"
                      size={14}
                    />
                    Thinking...
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}

            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && sendMessage()
                }
                placeholder="Ask AI..."
                disabled={loading}
                className="flex-1 bg-black/40 border border-white/10 rounded-md px-3 py-2 text-xs text-white outline-none disabled:opacity-50"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="h-9 w-9 flex items-center justify-center rounded-md bg-emerald-500 text-black disabled:opacity-50"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}