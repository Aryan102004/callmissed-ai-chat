"use client";

import { useCallback, useState } from "react";
import { ImageService } from "@/services/image-service";

export function useImage() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = useCallback(async (prompt: string) => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const generatedImage = await ImageService.generate(prompt);

      setImage(generatedImage);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate image."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const clearImage = useCallback(() => {
    setImage(null);
    setError(null);
  }, []);

  return {
    image,
    loading,
    error,
    generateImage,
    clearImage,
  };
}