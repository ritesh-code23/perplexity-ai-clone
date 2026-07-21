import { tavily } from "@tavily/core";

import { ChatPromptTemplate }
from "@langchain/core/prompts";

import { RunnableSequence }
from "@langchain/core/runnables";

import { StringOutputParser }
from "@langchain/core/output_parsers";

import { redditSearchPrompt }
from "../prompts/redditSearchPrompt.js";

const searchClient = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

export const redditSearchAgent = async (
  query,
  llm
) => {

  const searchResults =
    await searchClient.search(
      `${query} site:reddit.com`
    );

  const chain = RunnableSequence.from([
    ChatPromptTemplate.fromMessages([
      ["system", redditSearchPrompt],
      [
        "human",
        `
Question:
{query}

Reddit Results:
{results}
        `,
      ],
    ]),
    llm,
    new StringOutputParser(),
  ]);

  const answer = await chain.invoke({
    query,
    results: JSON.stringify(searchResults),
  });

  return {
    answer,
    sources: searchResults.results || [],
  };
};