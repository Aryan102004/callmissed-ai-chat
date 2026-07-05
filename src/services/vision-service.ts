import { VisionResponse } from "@/types/vision";

export class VisionService {
  static async analyze(
    image: File,
    question: string
  ): Promise<string> {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("question", question);

    const response = await fetch("/api/vision", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      let message = "Vision request failed.";

      try {
        const data = await response.json();
        message = data.error || message;
      } catch {}

      throw new Error(message);
    }

    const data: VisionResponse =
      await response.json();

    return data.answer;
  }
}