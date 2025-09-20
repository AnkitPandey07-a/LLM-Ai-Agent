

import { ollamaGenerate } from "../services/ollama.js";
import dotenv from "dotenv"
import { handleHealthQuery } from "./health.agent.js";
import { handleGraphicQuery } from "./graphic.agent.js";
import { handleMathsQuery } from "./maths.agent.js";
import { handleScienceQuery } from "./science.agent.js";
import { handleCodeQuery } from "./code.agent.js";
dotenv.config();


async function classifyQueryWithLLM(message) {
       const system = `
You are a strict router that decides which agent handles the user's message.

OPTIONS:
- "maths"   -> maths calculations, algebra, geometry, calculus, statistics
- "code"   -> programming, coding, debugging, algorithms, data structures
- "science"-> physics, chemistry, biology, astronomy, earth science
- "health"  -> health information, symptoms, prevention, lifestyle, treatment overviews
- "graphic" -> graphic/design help: prompts, layout, color palettes, composition, visual styles
- "unknown" -> anything else, not related to health or graphics or code or maths or science

RULES:
- Respond with EXACTLY one word: code, graphic, health, maths, science, or unknown.
- No punctuation. No explanation.
`.trim();

const prompt =`${system}
User:${message}
Answer (one word)`;

const raw = await ollamaGenerate(prompt,{model:process.env.GEN_MODEL});


const token = raw?.trim().toLowerCase() || "unknown";

if(token === "maths" || token === "science" || token === "code" || token === "health" || token ==="graphic"|| token ==="unknown"){
    return token;
}
return "unknown";
    
}
export async function handleQuery(message){
    const domain = await classifyQueryWithLLM(message);

    if(domain ==="maths") return handleMathsQuery(message);
    if(domain ==="science") return handleScienceQuery(message);
    if(domain ==="code") return handleCodeQuery(message);
    if(domain === "health") return handleHealthQuery(message);
    if(domain ==="graphic") return handleGraphicQuery(message);
    
    if(domain ==="unknown"){

        return{
            answer:"I can help only with general health information or graphics/design prompts.",
            source:"unknown"
        }
    }
}