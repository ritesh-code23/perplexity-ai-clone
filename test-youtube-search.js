import "dotenv/config";

import { ChatGroq } from "@langchain/groq";

import { youtubeSearchAgent }
from "./src/agents/youtubeSearchAgent.js";

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.1-8b-instant",
});

const result =
  await youtubeSearchAgent(
    "Best LangChain tutorial",
    llm
  );

console.log(result.answer);

console.log(result.sources);