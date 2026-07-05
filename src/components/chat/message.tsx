"use client";

import Image from "next/image";
import {
  Bot,
  User,
  Copy,
  Check,
  Download,
} from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Message } from "@/types/chat";
import { Markdown } from "./markdown";
import { TypingCursor } from "./typing-cursor";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({
  message,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    await navigator.clipboard.writeText(message.content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-4xl gap-4 ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            isUser
              ? "bg-violet-600"
              : "bg-gradient-to-br from-violet-500 to-fuchsia-600"
          }`}
        >
          {isUser ? (
            <User className="h-5 w-5 text-white" />
          ) : (
            <Bot className="h-5 w-5 text-white" />
          )}
        </div>

        {/* Content */}

        <div>

          <div
            className={`mb-2 flex items-center gap-2 ${
              isUser
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <span className="text-sm font-semibold text-slate-300">
              {isUser
                ? "You"
                : "CallMissed AI"}
            </span>
          </div>

          <div
            className={`rounded-3xl border px-5 py-4 shadow-lg transition-all ${
              isUser
                ? "border-violet-600 bg-violet-600 text-white"
                : "border-slate-700 bg-slate-800 text-slate-100"
            }`}
          >
            {message.type === "image" ? (
              <div className="space-y-4">

                <Image
                  src={message.content}
                  alt="Generated Image"
                  width={768}
                  height={768}
                  className="rounded-2xl"
                  unoptimized
                />

                <a
                  href={message.content}
                  download="generated-image.png"
                >
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />

                    Download Image
                  </Button>
                </a>

              </div>
            ) : (
          <div>
  <Markdown content={message.content} />

  {message.streaming && (
    <TypingCursor />
  )}
</div>
            )}
          </div>

          {!isUser && message.type === "text" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={copyMessage}
              className="mt-2"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />

                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />

                  Copy
                </>
              )}
            </Button>
          )}

        </div>

      </div>
    </div>
  );
}