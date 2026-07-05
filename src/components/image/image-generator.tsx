"use client";

import { useState } from "react";
import {
  Download,
  ImagePlus,
  Loader2,
  Sparkles,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useImage } from "@/hooks/use-image";

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("");

  const {
    image,
    loading,
    error,
    generateImage,
    clearImage,
  } = useImage();

  async function handleGenerate() {
    if (!prompt.trim()) return;

    await generateImage(prompt);
  }

  return (
    <div className="flex h-[calc(100vh-130px)] flex-col overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/60 shadow-2xl backdrop-blur-xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-800/60 px-6 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 shadow-lg">

            <Sparkles className="h-6 w-6 text-white" />

          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              AI Image Generator
            </h2>

            <p className="text-sm text-slate-400">
              Powered by flux-2-klein-9b
            </p>

          </div>

        </div>

        <div className="rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
          Create stunning AI images
        </div>

      </div>

      {/* Content */}

      <div className="grid flex-1 gap-8 overflow-hidden p-6 lg:grid-cols-2">

        {/* Left Panel */}

        <div className="flex flex-col">

          <h3 className="mb-3 text-lg font-semibold">
            Describe your image
          </h3>

          <Textarea
            placeholder="Example: A futuristic city at sunset with flying cars, cinematic lighting, ultra realistic..."
            value={prompt}
            disabled={loading}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[220px] resize-none rounded-2xl border-slate-700 bg-slate-800 text-base"
          />

          <div className="mt-6 flex gap-3">

            <Button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="flex-1 rounded-xl bg-gradient-to-r from-violet-500 to-blue-600"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <ImagePlus className="mr-2 h-4 w-4" />
                  Generate Image
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                clearImage();
                setPrompt("");
              }}
              disabled={loading}
              className="rounded-xl"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>

          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
              {error}
            </div>
          )}

        </div>

        {/* Right Panel */}

        <div className="flex h-full flex-col">

          <h3 className="mb-3 text-lg font-semibold">
            Generated Image
          </h3>

          <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-800/50 p-6">

            {loading ? (

              <div className="text-center">

                <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-violet-400" />

                <h3 className="text-lg font-semibold">
                  Creating your masterpiece...
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  This usually takes a few seconds.
                </p>

              </div>

            ) : image ? (

              <div className="w-full">

                <img
                  src={image}
                  alt="Generated"
                  className="max-h-[520px] w-full rounded-2xl object-contain shadow-xl"
                />

                <div className="mt-6 flex justify-center">

                  <a
                    href={image}
                    download="generated-image.png"
                  >
                    <Button className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600">

                      <Download className="mr-2 h-4 w-4" />

                      Download Image

                    </Button>
                  </a>

                </div>

              </div>

            ) : (

              <div className="text-center">

                <ImagePlus className="mx-auto mb-5 h-16 w-16 text-slate-600" />

                <h3 className="text-xl font-semibold text-white">
                  No image generated yet
                </h3>

                <p className="mt-2 max-w-sm text-slate-400">
                  Enter a detailed prompt on the left and click
                  <span className="font-medium text-violet-400">
                    {" "}Generate Image
                  </span>.
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}