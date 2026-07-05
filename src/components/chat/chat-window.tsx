"use client";

import { useEffect, useRef } from "react";

import { useChat } from "@/hooks/use-chat";

import { EmptyState } from "./empty-state";
import { ChatInput } from "./chat-input";
import { ChatMessage } from "./message";

export function ChatWindow() {
  const {
    messages,
    loading,
    sendMessage,
    stopGeneration,
  } = useChat();

  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex h-[calc(100vh-130px)] flex-col overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/60 shadow-2xl backdrop-blur-xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/60 bg-slate-900/80 px-6 py-4">

        <div>
          <h2 className="text-lg font-semibold text-white">
            AI Chat
          </h2>

          <p className="text-sm text-slate-400">
            Powered by kimi-k2.7-code
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">

          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

          <span className="text-sm text-emerald-300">
            Ready
          </span>

        </div>

      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">

        {messages.length === 0 ? (
          <EmptyState
            onSelectPrompt={(prompt) =>
              sendMessage(prompt)
            }
          />
        ) : (
          <div className="space-y-6">

            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
              />
            ))}

            <div ref={bottomRef} />

          </div>
        )}

      </div>

      {/* Bottom Input */}
      <div className="border-t border-slate-800/60 bg-slate-900/70 p-4">

        <ChatInput
          onSend={sendMessage}
          loading={loading}
        />

        {loading && (
          <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">

            <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />

            AI is generating a response...

          </div>
        )}

      </div>

    </div>
  );
}