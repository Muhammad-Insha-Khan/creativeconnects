// utils/aiParser.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});


async function parseWithAI(query, role) {
  const prompt = `
You are helping a ${role} perform a search.
Extract structured fields from the query below.
Query: "${query}"
Return JSON with the following fields:
{
  profession: string | null,
  skills: string[], 
  jobTypes: string[]
}
`;

  const response = openai.responses.create({
  model: "gpt-4o-mini",
  input: "write a haiku about ai",
  store: true,
});


  const content = response.choices[0].message.content;

  try {
    const structured = JSON.parse(content);
    return structured;
  } catch (e) {
    console.error("Failed to parse AI response:", content);
    return { profession: null, skills: [], jobTypes: [] };
  }
}

module.exports = parseWithAI;
