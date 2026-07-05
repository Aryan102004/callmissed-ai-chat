"use client";

import {
  MessageSquare,
  ImageIcon,
  Eye,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

export type ViewType = "chat" | "image" | "vision";

interface SidebarProps {
  activeView: ViewType;
  onChange: (view: ViewType) => void;
}

const items = [
  {
    id: "chat",
    label: "AI Chat",
    icon: MessageSquare,
    description: "Talk with Kimi",
  },
  {
    id: "image",
    label: "Image Generator",
    icon: ImageIcon,
    description: "Create AI images",
  },
  {
    id: "vision",
    label: "Vision",
    icon: Eye,
    description: "Analyze images",
  },
] as const;

export function Sidebar({
  activeView,
  onChange,
}: SidebarProps) {
  return (
    <aside className="flex h-full flex-col rounded-3xl border border-slate-800/60 bg-slate-900/70 backdrop-blur-xl p-6 shadow-2xl">

      {/* Logo */}

      <div className="flex items-center gap-3 mb-10">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 shadow-lg">

          <Sparkles className="h-6 w-6 text-white" />

        </div>

        <div>

          <h1 className="text-xl font-bold">
            CallMissed AI
          </h1>

          <p className="text-sm text-slate-400">
            Multimodal Assistant
          </p>

        </div>

      </div>

      {/* Navigation */}

      <nav className="space-y-3">

        {items.map((item) => {
          const Icon = item.icon;

          const active =
            activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={cn(
                "group flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all duration-300",

                active
                  ? "bg-gradient-to-r from-violet-500 to-blue-600 text-white shadow-lg scale-[1.02]"
                  : "hover:bg-slate-800/70 text-slate-300 hover:translate-x-1"
              )}
            >
              <Icon className="h-6 w-6" />

              <div>

                <p className="font-semibold">
                  {item.label}
                </p>

                <p
                  className={cn(
                    "text-xs",

                    active
                      ? "text-violet-100"
                      : "text-slate-500"
                  )}
                >
                  {item.description}
                </p>

              </div>

            </button>
          );
        })}

      </nav>

      {/* Footer */}

      <div className="mt-auto rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4">

        <p className="text-sm font-medium text-violet-300">
          ✨ Powered by
        </p>

        <p className="mt-1 text-xs text-slate-300">
          kimi-k2.7-code • flux-2-klein-9b
        </p>

      </div>

    </aside>
  );
}