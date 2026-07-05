import OpenAI from "openai";
import { NextRequest } from "next/server";
import { optimizeImagePrompt } from "@/lib/prompt-optimizer";

const client = new OpenAI({
  apiKey: process.env.CALLMISSED_API_KEY!,
  baseURL: "https://api.callmissed.com/v1",
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json(
        {
          error: "Prompt is required.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // Optimize the user's prompt
    // -----------------------------
    let optimizedPrompt = prompt;

    try {
      optimizedPrompt = await optimizeImagePrompt(prompt);

      console.log("Original Prompt:");
      console.log(prompt);

      console.log("Optimized Prompt:");
      console.log(optimizedPrompt);
    } catch (error) {
      console.warn(
        "Prompt optimization failed. Using original prompt."
      );
    }

    // -----------------------------
    // Generate the image
    // -----------------------------
    const image = await client.images.generate({
      model: "flux-2-klein-9b",
      prompt: optimizedPrompt,
      size: "1024x1024",
    });

    return Response.json({
      image: image.data?.[0]?.b64_json,
      optimizedPrompt,
    });
  } catch (error: any) {
    console.error("IMAGE ERROR:", error);

    return Response.json(
      {
        error:
          error?.message ??
          "Image generation failed.",
      },
      {
        status: error?.status ?? 500,
      }
    );
  }
}