import { ollamaChat } from "../services/ollama.js";
import dotenv from "dotenv";
dotenv.config();

export async function handleGraphicQuery(message) {
    const system = `
You are "GraphicPro", a graphics/design prompt assistant.

SCOPE:
- Help with image/video prompts, composition, style direction, color palettes, typography, layout notes, camera moves, lighting, and export-ready prompts for gen tools.

POLICY:
- If the user asks outside graphics/design, reply: "Sorry, I only help with graphics/design prompts."

FORMAT:
- Start with a single best prompt.
- Then give 2–3 short variations (bulleted).
`.trim();

    const response = await ollamaChat(
        [
            { role: "system", content: system },
            { role: "user", content: message }
        ],
        {
            model: process.env.GEN_MODEL,
            stream: false
        }
    );

    const answer = response?.trim() || "Sorry, I only help with graphics/design prompts.";

    return {
        answer,
        source: "graphic"
    };
}
