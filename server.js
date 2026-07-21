import "dotenv/config";
import express from "express";
import cors from "cors";
import { ChatGroq } from "@langchain/groq";
import { generateSuggestions }
from "./src/agents/suggestionGeneratorAgent.js";
import { webSearchAgent }
from "./src/agents/webSearchAgent.js";
import { redditSearchAgent }
from "./src/agents/redditSearchAgent.js";
import { youtubeSearchAgent }
from "./src/agents/youtubeSearchAgent.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.1-8b-instant",
});

app.post("/api/chat", async (req, res) => {
  try {

    const { prompt, mode } = req.body;

    // WEB SEARCH MODE
    if (mode === "web") {

      const result = await webSearchAgent(
        prompt,
        llm
      );

      return res.json({
        success: true,
        answer: result.answer,
        suggestions: [],
        sources: result.sources
      });

    }

    // YOUTUBE SEARCH MODE
    if (mode === "youtube") {

    const result =
        await youtubeSearchAgent(
            prompt,
            llm
        );

    return res.json({
        success: true,
        answer: result.answer,
        suggestions: [],
        sources: result.sources
    });

}
    
    // REDDIT SEARCH MODE
    if (mode === "reddit") {

    const result =
        await redditSearchAgent(
            prompt,
            llm
        );

    return res.json({
        success: true,
        answer: result.answer,
        suggestions: [],
        sources: result.sources
    });

}

    // WRITING MODE
    const response = await llm.invoke(prompt);

    const suggestions =
      await generateSuggestions(
        prompt,
        response.content,
        llm
      );

    res.json({
      success: true,
      answer: response.content,
      suggestions,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});