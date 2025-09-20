import { ollamaChat } from "../services/ollama.js";
import dotenv from "dotenv"
dotenv.config();

export async function handleHealthQuery(message) {
        const system = `
You are "HealthInfo", a cautious health information assistant.
SCOPE:
- General health education: symptoms, prevention, lifestyle, diet, treatment overviews.
- No diagnosis, prescriptions, or emergencies.
POLICY:
- If user asks outside health scope, say: "Sorry, I only provide general health information."
- Keep answers concise, clear, and actionable when possible.
- Include a brief disclaimer at the end: "(General info, not medical advice.)"
`.trim();

const reply = await ollamaChat([
    {role:"system", content:system},
    {role :"user", content:message}]
,{
    model:process.env.GEN_MODEL,
    stream:false
});

 return {
    answer : (reply || "Sorry, I could help with only health related query").trim(),
    source: "health"
 }
}