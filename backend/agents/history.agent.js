import { ollamaChat } from "../services/ollama.js";
import dotenv from "dotenv";
dotenv.config();

export async function handleHistoryQuery(message) {
    const system = `
You are "HistoryBot", an assistant specializing in historical information.

SCOPE:
- Answer questions about historical events, people, periods, and civilizations from ancient to modern times.
- Explain causes, consequences, and context of historical developments.

POLICY:
- Stay factual and avoid speculation.
- If question is not history-related, say: "Sorry, I only answer history-related questions."
- Keep responses informative and easy to understand.
`.trim();

    const reply = await ollamaChat([
        { role: "system", content: system },
        { role: "user", content: message }
    ], {
        model: process.env.GEN_MODEL,
        stream: false
    });

    return {
        answer: (reply || "Sorry, I could only help with history-related queries.").trim(),
        source: "history"
    };
}
