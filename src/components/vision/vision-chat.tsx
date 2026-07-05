"use client";

import {
  Loader2,
  Upload,
  Trash2,
  ImageIcon,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useVision } from "@/hooks/use-vision";

export function VisionChat() {
  const {
    image,
    setImage,
    question,
    setQuestion,
    answer,
    loading,
    error,
    analyze,
    clear,
  } = useVision();

  return (
    <div className="flex h-[calc(100vh-130px)] flex-col overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/60 shadow-2xl backdrop-blur-xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-800/60 px-6 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-violet-500 shadow-lg">

            <Sparkles className="h-6 w-6 text-white" />

          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              AI Vision
            </h2>

            <p className="text-sm text-slate-400">
              Analyze any uploaded image
            </p>

          </div>

        </div>

        <div className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
          Powered by kimi-k2.7-code
        </div>

      </div>

      {/* Main Content */}

      <div className="grid flex-1 gap-8 overflow-hidden p-6 lg:grid-cols-2">

        {/* Left */}

        <div className="flex flex-col">

          <h3 className="mb-3 text-lg font-semibold">
            Upload Image
          </h3>

          <label className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-800/40 transition-all hover:border-violet-500 hover:bg-slate-800">

            <ImageIcon className="mb-4 h-12 w-12 text-slate-500" />

            <p className="font-medium text-white">
              Click to choose an image
            </p>

            <p className="mt-2 text-sm text-slate-400">
              PNG, JPG or JPEG
            </p>

            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setImage(file);
                }
              }}
            />

          </label>

          <Textarea
            value={question}
            placeholder="Ask anything about this image..."
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            className="mt-6 min-h-[140px] rounded-2xl border-slate-700 bg-slate-800"
          />

          <div className="mt-6 flex gap-3">

            <Button
              onClick={analyze}
              disabled={loading || !image}
              className="flex-1 rounded-xl bg-gradient-to-r from-violet-500 to-blue-600"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Analyze Image
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={clear}
              className="rounded-xl"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>

          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
              {error}
            </div>
          )}

        </div>

        {/* Right */}

        <div className="flex flex-col">

          <h3 className="mb-3 text-lg font-semibold">
            Analysis
          </h3>

          <div className="flex flex-1 flex-col rounded-2xl border border-slate-700 bg-slate-800/40 p-6">

            {loading ? (

              <div className="flex flex-1 flex-col items-center justify-center text-center">

                <Loader2 className="mb-5 h-12 w-12 animate-spin text-violet-400" />

                <h3 className="text-xl font-semibold">
                  AI is analyzing your image...
                </h3>

                <p className="mt-2 text-slate-400">
                  Please wait a few seconds.
                </p>

              </div>

            ) : image ? (

              <>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="max-h-72 rounded-2xl object-contain"
                />

                <p className="mt-3 text-center text-sm text-slate-400">
                  {image.name}
                </p>

                {answer && (

                  <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-900/80 p-5">

                    <h4 className="mb-3 font-semibold text-violet-400">
                      AI Response
                    </h4>

                    <p className="whitespace-pre-wrap leading-7 text-slate-300">
                      {answer}
                    </p>

                  </div>

                )}

              </>

            ) : (

              <div className="flex flex-1 flex-col items-center justify-center text-center">

                <ImageIcon className="mb-5 h-16 w-16 text-slate-600" />

                <h3 className="text-xl font-semibold text-white">
                  No Image Selected
                </h3>

                <p className="mt-2 max-w-sm text-slate-400">
                  Upload an image and ask a question to
                  analyze it using AI Vision.
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}