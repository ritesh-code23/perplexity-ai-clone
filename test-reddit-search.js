import "dotenv/config";

import { ChatGroq } from "@langchain/groq";

import { redditSearchAgent }
from "./src/agents/redditSearchAgent.js";

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.1-8b-instant",
});

const result =
  await redditSearchAgent(
    "Best programming language for beginners",
    llm
  );

console.log("\nANSWER:\n");
console.log(result.answer);

console.log("\nSOURCES:\n");
console.log(result.sources);