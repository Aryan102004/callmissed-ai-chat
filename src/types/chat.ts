export type Role = "user" | "assistant";

export type MessageType = "text" | "image";

export interface Message {
  id: string;
  role: "user" | "assistant";
  type: "text" | "image";
  content: string;
  streaming?: boolean;
}