import OpenAI from "openai";
import { NextRequest } from "next/server";

const client = new OpenAI({
  apiKey: process.env.CALLMISSED_API_KEY!,
  baseURL: "https://api.callmissed.com/v1",
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const image = formData.get("image") as File | null;
    const question = formData.get("question") as string;

    if (!image) {
      return Response.json(
        {
          error: "Image is required.",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const mimeType = image.type || "image/png";

    const base64 = buffer.toString("base64");

    const response = await client.chat.completions.create({
      model: "kimi-k2.7-code",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                question ||
                "Describe this image in detail.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64}`,
              },
            },
          ],
        },
      ],
    });

    return Response.json({
      answer:
        response.choices[0].message.content ??
        "No response.",
    });
  } catch (error: any) {
    console.error("VISION ERROR:", error);

    return Response.json(
      {
        error:
          error?.message ??
          "Vision request failed.",
      },
      {
        status: error?.status ?? 500,
      }
    );
  }
}