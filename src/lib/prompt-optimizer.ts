import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.CALLMISSED_API_KEY!,
  baseURL: "https://api.callmissed.com/v1",
});

export async function optimizeImagePrompt(
  prompt: string
): Promise<string> {
  const completion = await client.chat.completions.create({
    model: "kimi-k2.7-code",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content: `
You are an AI prompt optimizer.

Your job is to rewrite prompts for an image generation model.

Rules:
- Keep the original meaning.
- Remove copyrighted names (Marvel, DC, Disney, etc.).
- Replace famous characters with descriptive alternatives.
- Remove unsafe wording if present.
- Improve visual detail.
- Return ONLY the rewritten prompt.
Do not explain anything.
        `,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return (
    completion.choices[0].message.content?.trim() ??
    prompt
  );
}