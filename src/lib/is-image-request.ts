export function isImageRequest(prompt: string) {
  const text = prompt.toLowerCase().trim();

  const keywords = [
    "draw",
    "generate",
    "image",
    "picture",
    "photo",
    "illustration",
    "painting",
    "paint",
    "art",
    "logo",
    "poster",
    "render",
    "sketch",
    "design",
    "create",
  ];

  if (keywords.some((word) => text.includes(word))) {
    return true;
  }

  // Detect descriptive prompts that look like image requests
  if (
    text.split(" ").length >= 4 &&
    !text.endsWith("?")
  ) {
    return true;
  }

  return false;
}