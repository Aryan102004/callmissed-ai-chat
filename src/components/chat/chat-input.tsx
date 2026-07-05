"use client";

import { useState } from "react";

import {
  ImagePlus,
  SendHorizontal,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  loading: boolean;
}

export function ChatInput({
  onSend,
  loading,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSend() {
    if (!message.trim() || loading) return;

    onSend(message);

    setMessage("");
  }

  return (
    <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-4 shadow-2xl">

      <div className="flex items-end gap-3">

        {/* Attachment */}

        <Button
          variant="ghost"
          size="icon"
          className="h-11 w-11 rounded-xl hover:bg-slate-800"
        >
          <ImagePlus className="h-5 w-5 text-slate-300" />
        </Button>

        {/* Input */}

        <Textarea
          value={message}
          placeholder="Ask anything..."
          onChange={(e) =>
            setMessage(e.target.value)
          }
          rows={1}
          className="max-h-40 min-h-[56px] resize-none rounded-2xl border-slate-700 bg-slate-800 px-5 py-4 text-base text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-violet-500"
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();

              handleSend();
            }
          }}
        />

        {/* Send */}

        <Button
          onClick={handleSend}
          disabled={loading}
          className="h-12 w-12 rounded-xl bg-gradient-to-r from-violet-500 to-blue-600 shadow-lg transition hover:scale-105"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <SendHorizontal className="h-5 w-5" />
          )}
        </Button>

      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">

        <span>
          Press <b>Enter</b> to send
        </span>

        <span>
          <b>Shift + Enter</b> for new line
        </span>

      </div>

    </div>
  );
}