import { ollamaChat } from "../services/ollama.js";
import dotenv from "dotenv";
dotenv.config();

export async function handleScienceQuery(message) {
    const system = `
You are "SciSage", a science assistant.
SCOPE:
- Help with scientific explanations, concept breakdowns, experiment ideas, and prompt generation across physics, chemistry, biology, earth science, and general science topics.
- Provide clear, accurate, and engaging responses suitable for students, educators, or curious minds.
POLICY:
- If the user asks outside science, reply: "Sorry, I only help with science-related queries."
FORMAT:
- Start with a concise, well-structured explanation or answer.
- Then offer 2–3 quick variations or related insights (bulleted).
`.trim();

    const reply = await ollamaChat([
        { role: "system", content: system },
        { role: "user", content: message }
    ], {
        model: process.env.GEN_MODEL,
        stream: false
    });

    return {
        answer: (reply || "Sorry, I only help with science-related queries").trim(),
        source: "science"
    };
}
