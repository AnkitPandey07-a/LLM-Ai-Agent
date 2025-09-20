import { ollamaChat } from "../services/ollama.js";
import dotenv from "dotenv";
dotenv.config();

export async function handleMathsQuery(message) {
    const system = `
You are "MathsHelper", a friendly and accurate math assistant.

SCOPE:
- Solve math problems and explain concepts from basic arithmetic to advanced topics.
- Examples: algebra, geometry, calculus, statistics, equations, word problems.

POLICY:
- Show steps if applicable.
- If question is not math-related, say: "Sorry, I only help with math-related questions."
- Keep answers clear and concise.
`.trim();

    const reply = await ollamaChat([
        { role: "system", content: system },
        { role: "user", content: message }
    ], {
        model: process.env.GEN_MODEL,
        stream: false
    });

    return {
        answer: (reply || "Sorry, I could only help with math-related queries.").trim(),
        source: "maths"
    };
}
