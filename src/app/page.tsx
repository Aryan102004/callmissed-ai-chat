"use client";

import { useState } from "react";

import { Header } from "@/components/layout/header";
import {
  Sidebar,
  ViewType,
} from "@/components/layout/sidebar";

import { ChatWindow } from "@/components/chat/chat-window";
import { ImageGenerator } from "@/components/image/image-generator";
import { VisionChat } from "@/components/vision/vision-chat";

export default function Home() {
  const [activeView, setActiveView] =
    useState<ViewType>("chat");

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <Header />

      <div className="mx-auto max-w-[1600px] px-6 py-6">

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

          {/* Sidebar */}

          <div className="sticky top-28 h-[calc(100vh-130px)]">

            <Sidebar
              activeView={activeView}
              onChange={setActiveView}
            />

          </div>

          {/* Main Content */}

          <div className="min-h-[calc(100vh-130px)]">

            {activeView === "chat" && (
              <ChatWindow />
            )}

            {activeView === "image" && (
              <ImageGenerator />
            )}

            {activeView === "vision" && (
              <VisionChat />
            )}

          </div>

        </div>

      </div>

    </main>
  );
}