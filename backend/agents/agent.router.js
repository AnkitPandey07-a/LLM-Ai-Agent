import { ollamaGenerate } from "../services/ollama.js";
import dotenv from "dotenv";

import { handleHealthQuery } from "./health.agent.js";
import { handleGraphicQuery } from "./graphic.agent.js";
import { handleHistoryQuery } from "./history.agent.js";
import { handleMathsQuery } from "./maths.agent.js";
import { handleScienceQuery } from "./science.agent.js";

dotenv.config();

const VALID_DOMAINS = ["health", "graphic", "history", "maths", "science", "unknown"];

async function classifyQueryWithLLM(message) {
    const system = `
You are a strict router that decides which agent handles the user's message.

OPTIONS:
- "health"  -> health info: symptoms, lifestyle, prevention, treatment overviews
- "graphic" -> graphic/design: prompts, layout, color, composition, visual style
- "history" -> history: events, people, timelines, ancient to modern
- "maths"   -> math problems: algebra, calculus, equations, statistics
- "science" -> science topics: biology, chemistry, physics, experiments
- "unknown" -> anything else not in these categories

RULES:
- Respond with EXACTLY one word: health, graphic, history, maths, science, or unknown
- No punctuation. No explanation.
`.trim();

    const prompt = `${system}
User: ${message}
Answer (one word)`;

    const raw = await ollamaGenerate(prompt, { model: process.env.GEN_MODEL });
    const token = raw?.trim().toLowerCase();

    return VALID_DOMAINS.includes(token) ? token : "unknown";
}

export async function handleQuery(message) {
    const domain = await classifyQueryWithLLM(message);

    switch (domain) {
        case "health":
            return handleHealthQuery(message);
        case "graphic":
            return handleGraphicQuery(message);
        case "history":
            return handleHistoryQuery(message);
        case "maths":
            return handleMathsQuery(message);
        case "science":
            return handleScienceQuery(message);
        case "unknown":
        default:
            return {
                answer: "I can help only with health, graphics/design, history, maths, or science-related queries.",
                source: "unknown"
            };
    }
}
