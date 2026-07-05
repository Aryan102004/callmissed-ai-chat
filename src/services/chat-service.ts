import { Role } from "@/types/chat";

export interface ChatMessagePayload {
  role: Role;
  content: string;
}

export interface StreamCallbacks {
  onStart?: () => void;
  onToken: (token: string) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

export class ChatService {
  static async streamChat(
    messages: ChatMessagePayload[],
    callbacks: StreamCallbacks,
    signal?: AbortSignal
  ) {
    try {
      callbacks.onStart?.();

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
        }),
        signal,
      });

      if (!response.ok) {
        let message = `Request failed (${response.status})`;

        try {
          const data = await response.json();
          message = data.error || data.message || message;
        } catch {}

        throw new Error(message);
      }

      if (!response.body) {
        throw new Error("Response body is empty.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let done = false;

      while (!done) {
        const result = await reader.read();

        done = result.done;

        if (done) break;

        const chunk = decoder.decode(result.value, {
          stream: true,
        });

        if (chunk) {
          callbacks.onToken(chunk);
        }
      }

      // Flush any remaining buffered text
      const remaining = decoder.decode();

      if (remaining) {
        callbacks.onToken(remaining);
      }

      callbacks.onComplete?.();
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      callbacks.onError?.(
        error instanceof Error
          ? error
          : new Error("Unknown streaming error")
      );
    }
  }
}