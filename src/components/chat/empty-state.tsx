"use client";

import {
  Sparkles,
  Code2,
  ImageIcon,
  Eye,
} from "lucide-react";

interface EmptyStateProps {
  onSelectPrompt?: (prompt: string) => void;
}

const prompts = [
  {
    icon: <Code2 className="h-5 w-5 text-violet-400" />,
    title: "Explain React Hooks",
    prompt: "Explain React Hooks with examples.",
  },
  {
    icon: <ImageIcon className="h-5 w-5 text-purple-400" />,
    title: "Generate an Image",
    prompt: "Generate an image of a futuristic city at sunset.",
  },
  {
    icon: <Eye className="h-5 w-5 text-emerald-400" />,
    title: "Vision Analysis",
    prompt: "Describe the uploaded image in detail.",
  },
  {
    icon: <Sparkles className="h-5 w-5 text-yellow-400" />,
    title: "AI Assistant",
    prompt: "What can you help me with?",
  },
];

export function EmptyState({
  onSelectPrompt,
}: EmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">

      {/* Logo */}

      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-blue-500 to-indigo-600 shadow-2xl shadow-violet-500/30">

        <Sparkles className="h-12 w-12 text-white" />

      </div>

      {/* Title */}

      <h1 className="text-4xl font-bold tracking-tight text-white">
        Welcome to CallMissed AI
      </h1>

      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
        Your intelligent AI assistant for chatting, image generation,
        and vision analysis.
      </p>

      {/* Suggestions */}

      <div className="mt-12 grid w-full max-w-4xl gap-5 md:grid-cols-2">

        {prompts.map((item) => (
          <button
            key={item.title}
            onClick={() =>
              onSelectPrompt?.(item.prompt)
            }
            className="group rounded-2xl border border-slate-700 bg-slate-900/60 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:bg-slate-800 hover:shadow-xl hover:shadow-violet-500/10"
          >
            <div className="mb-4">
              {item.icon}
            </div>

            <h3 className="font-semibold text-white">
              {item.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {item.prompt}
            </p>
          </button>
        ))}

      </div>

      {/* Footer */}

      <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">

        <span className="rounded-full border border-slate-700 px-4 py-2">
          💬 AI Chat
        </span>

        <span className="rounded-full border border-slate-700 px-4 py-2">
          🎨 Image Generation
        </span>

        <span className="rounded-full border border-slate-700 px-4 py-2">
          👁 Vision AI
        </span>

      </div>

    </div>
  );
}