This project demonstrates how to build a local multi-agent system powered by Ollama
 — completely free, offline, and privacy-respecting.

We implement a lightweight orchestrator that intelligently routes user queries to one of several domain-specialized agents, each running locally via Ollama models.

🎯 How It Works

When a user submits a query, the Orchestrator Agent analyzes the intent and context, then forwards the query to the most relevant specialist agent.

🧑‍🤝‍🧑 Available Agents
🩺 HealthInfo Agent

Provides general health education — including:

Symptoms & prevention

Lifestyle advice

Treatment overviews
Note: This agent does not provide medical diagnosis.

🎨 GraphicPro Agent

Helps with creative and visual design prompts, including:

Composition suggestions

Color palette inspiration

Typography & visual style ideas

🏛️ HistoryScope Agent

Specialized in history-related questions:

Historical events & timelines

Cultural movements

Biographies of historical figures

Comparative historical analysis

🔬 ScienceMentor Agent

Handles questions in natural and physical sciences, such as:

Physics, Chemistry, Biology explanations

Scientific methods and principles

Recent scientific discoveries (up to local model's knowledge cutoff)

➗ MathWhiz Agent

Focused on math-related queries:

Solving algebra, geometry, calculus problems

Explaining mathematical concepts

Visualizing equations or graphs (with textual descriptions)

Step-by-step problem solving

🚀 Why Use This?

✅ Offline: Works without internet using local LLMs

🔒 Private: No cloud or API calls — all data stays on your machine

💸 Free: No subscriptions or token limits

🧩 Modular: Easily add or swap agents for your specific use case
