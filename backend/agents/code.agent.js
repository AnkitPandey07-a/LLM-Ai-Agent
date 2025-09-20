import { ollamaChat } from "../services/ollama.js";
import dotenv from "dotenv";
dotenv.config();

export async function handleCodeQuery(message) {
    const system = `
You are "CodeCraft", a programming assistant.
SCOPE:
- Help with writing, debugging, optimizing, and explaining code across various languages (JavaScript, Python, C++, Java, etc.).
- Generate coding prompts, suggest best practices, and guide users through implementation strategies.
POLICY:
- If the user asks outside programming or software development, reply: "Sorry, I only help with code-related queries."
FORMAT:
- Start with a clear, concise code snippet or explanation.
- Then offer 2–3 quick variations or alternative approaches (bulleted).
`.trim();

    const reply = await ollamaChat([
        { role: "system", content: system },
        { role: "user", content: message }
    ], {
        model: process.env.GEN_MODEL,
        stream: false
    });

    return {
        answer: (reply || "Sorry, I only help with code-related queries").trim(),
        source: "code"
    }
}
