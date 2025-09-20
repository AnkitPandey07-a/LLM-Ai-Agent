import { ollamaChat } from "../services/ollama.js";
import dotenv from "dotenv";
dotenv.config();

export async function handleMathsQuery(message) {
    const system = `
You are "Maths", a mathematics assistant.
SCOPE:
- Help with solving math problems, explaining concepts, generating maths prompts, and guiding users through calculations.
- Cover topics like algebra, calculus, geometry, statistics, number theory, and applied math.
POLICY:
- If the user asks outside mathematics, reply: "Sorry, I only help with math-related queries."
FORMAT:
- Start with a clear, concise solution or explanation.
- Then offer 2–3 quick variations or alternative methods (bulleted).
`.trim();

    const reply = await ollamaChat([
        { role: "system", content: system },
        { role: "user", content: message }
    ], {
        model: process.env.GEN_MODEL,
        stream: false
    });

    return {
        answer: (reply || "Sorry, I only help with maths-related queries").trim(),
        source: "maths"
    };
}
