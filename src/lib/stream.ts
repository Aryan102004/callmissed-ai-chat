export interface StreamHandlers {
  onStart?: () => void;
  onToken: (token: string) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

export class ChatService {
  static async streamMessage(
    message: string,
    handlers: StreamHandlers,
    signal?: AbortSignal
  ) {
    try {
      handlers.onStart?.();

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
        signal,
      });

      if (!response.ok) {
        let errorMessage = "Failed to send message.";

        try {
          const data = await response.json();
          errorMessage = data.error || data.message || errorMessage;
        } catch {}

        throw new Error(errorMessage);
      }

      if (!response.body) {
        throw new Error("Response body is empty.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, {
          stream: true,
        });

        handlers.onToken(chunk);
      }

      handlers.onComplete?.();
    } catch (error) {
      if (error instanceof Error) {
        handlers.onError?.(error);
      } else {
        handlers.onError?.(
          new Error("Unknown streaming error")
        );
      }
    }
  }
}