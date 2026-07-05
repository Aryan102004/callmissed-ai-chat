export interface ImageGenerationResponse {
  image: string;
}

export class ImageService {
  static async generate(prompt: string): Promise<string> {
    const response = await fetch("/api/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      let message = "Failed to generate image.";

      try {
        const data = await response.json();
        message = data.error || message;
      } catch {
        // Ignore JSON parsing errors
      }

      if (
  message.includes("content_policy_violation") ||
  message.toLowerCase().includes("safety filter") ||
  message.toLowerCase().includes("blocked")
) {
  throw new Error(
    "This image request was blocked by the model's safety policy. Try describing an original character or scene instead of a copyrighted character."
  );
}

throw new Error(message);
    }

    const data: ImageGenerationResponse = await response.json();

    if (!data.image) {
      throw new Error("No image returned from server.");
    }

    // Convert Base64 → Browser-compatible Data URL
    return `data:image/png;base64,${data.image}`;
  }
}