import OpenAI from "openai";
import { NextRequest } from "next/server";

const client = new OpenAI({
  apiKey: process.env.CALLMISSED_API_KEY!,
  baseURL: "https://api.callmissed.com/v1",
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        {
          error: "Messages array is required.",
        },
        {
          status: 400,
        }
      );
    }

    const stream = await client.chat.completions.create({
      model: "kimi-k2.7-code",
      messages,
      stream: true,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
  const token =
    chunk.choices?.[0]?.delta?.content ?? "";

  if (!token) continue;

  

  controller.enqueue(
    encoder.encode(token)
  );
}
        } catch (error) {
          console.error("Streaming Error:", error);
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);

    return Response.json(
      {
        error:
          error?.message ??
          "Internal Server Error",
      },
      {
        status: error?.status ?? 500,
      }
    );
  }
}