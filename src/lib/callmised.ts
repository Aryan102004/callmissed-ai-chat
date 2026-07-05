import OpenAI from "openai";

export const callmissed = new OpenAI({
  apiKey: process.env.CALLMISSED_API_KEY!,
  baseURL: process.env.CALLMISSED_BASE_URL,
});