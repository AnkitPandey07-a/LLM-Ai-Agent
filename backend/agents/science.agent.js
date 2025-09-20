import { ollamaChat } from "../services/ollama.js";
import dotenv from "dotenv";
dotenv.config();

export async function handleScienceQuery(message) {
    const system = `
You are "ScienceGuide", a knowledgeable assistant for science topics.

SCOPE:
- Explain scientific concepts, theories, and principles in physics, chemistry, biology, and more.
- Help with experiments, definitions, processes, and real-world applications.

POLICY:
- Stay within science education topics.
- If question is not science-related, say: "Sorry, I only answer science-related questions."
- Keep answers concise, clear, and engaging.
`.trim();

    const reply = await ollamaChat([
        { role: "system", content: system },
        { role: "user", content: message }
    ], {
        model: process.env.GEN_MODEL,
        stream: false
    });

    return {
        answer: (reply || "Sorry, I could only help with science-related queries.").trim(),
        source: "science"
    };
}
