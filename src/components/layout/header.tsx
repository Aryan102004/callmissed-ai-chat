"use client";

import { Bot, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Left */}

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">

            <Bot className="h-7 w-7 text-white" />

          </div>

          <div>

            <h1 className="text-2xl font-bold tracking-tight text-white">
              CallMissed AI
            </h1>

            <p className="text-sm text-slate-400">
              Your Multimodal AI Assistant
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">

          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>

          <span className="text-sm font-medium text-emerald-300">
            Online
          </span>

          <Sparkles className="h-4 w-4 text-emerald-300" />

        </div>

      </div>
    </header>
  );
}