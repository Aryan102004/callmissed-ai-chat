"use client";

import { useCallback, useState } from "react";
import { VisionService } from "@/services/vision-service";

export function useVision() {
  const [image, setImage] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = useCallback(async () => {
    if (!image) {
      setError("Please upload an image.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const result = await VisionService.analyze(
        image,
        question
      );

      setAnswer(result);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Vision request failed."
      );
    } finally {
      setLoading(false);
    }
  }, [image, question]);

  const clear = useCallback(() => {
    setImage(null);
    setQuestion("");
    setAnswer("");
    setError("");
  }, []);

  return {
    image,
    setImage,

    question,
    setQuestion,

    answer,

    loading,

    error,

    analyze,

    clear,
  };
}