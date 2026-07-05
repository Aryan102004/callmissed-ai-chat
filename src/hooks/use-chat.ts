"use client";

import { useCallback, useRef, useState } from "react";

import { ChatService } from "@/services/chat-service";
import { ImageService } from "@/services/image-service";

import { Message } from "@/types/chat";
import { isImageRequest } from "@/lib/is-image-request";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const abortController = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || loading) return;

      abortController.current?.abort();
      abortController.current = new AbortController();

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        type: "text",
        content,
      };

      const assistantId = crypto.randomUUID();

    const assistantMessage: Message = {
  id: assistantId,
  role: "assistant",
  type: "text",
  content: "",
  streaming: true,
};

      const updatedMessages = [
        ...messages,
        userMessage,
        assistantMessage,
      ];

      setMessages(updatedMessages);
      setLoading(true);

      try {
        // ===========================
        // IMAGE GENERATION
        // ===========================
        if (isImageRequest(content)) {
          const image = await ImageService.generate(content);

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId
                ? {
                    ...msg,
                    type: "image",
                    content: image,
                  }
                : msg
            )
          );

          return;
        }

        // ===========================
        // CHAT STREAMING
        // ===========================
        let assistantText = "";

        await ChatService.streamChat(
          updatedMessages.map(({ role, content }) => ({
            role,
            content,
          })),
          {
            onToken(token) {
              assistantText += token;

              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantId
                    ? {
                        ...msg,
                        content: assistantText,
                      }
                    : msg
                )
              );
            },

            onComplete() {
              setLoading(false);
            },

            onError(error) {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantId
                    ? {
                        ...msg,
                        content: `❌ ${error.message}`,
                      }
                    : msg
                )
              );

              setLoading(false);
            },
          },
          abortController.current.signal
        );
      } catch (error) {
        console.error(error);

       setMessages((prev) =>
  prev.map((msg) =>
    msg.id === assistantId
      ? {
          ...msg,
          streaming: false,
          content: `❌ ${error instanceof Error ? error.message : "Something went wrong."}`,
        }
      : msg
  )
);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const stopGeneration = useCallback(() => {
    abortController.current?.abort();
    setLoading(false);
  }, []);

  const clearChat = useCallback(() => {
    abortController.current?.abort();
    setMessages([]);
    setLoading(false);
  }, []);

  return {
    messages,
    loading,
    sendMessage,
    stopGeneration,
    clearChat,
  };
}
