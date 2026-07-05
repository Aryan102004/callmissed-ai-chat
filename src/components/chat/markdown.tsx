"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  content: string;
}

export function Markdown({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          if (match) {
            return (
              <SyntaxHighlighter
                style={oneDark as any}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          }

          return (
            <code
              className="rounded bg-zinc-800 px-1.5 py-0.5 text-violet-300"
              {...props}
            >
              {children}
            </code>
          );
        },

        h1: ({ children }) => (
          <h1 className="mb-4 text-3xl font-bold">
            {children}
          </h1>
        ),

        h2: ({ children }) => (
          <h2 className="mb-3 mt-6 text-2xl font-bold">
            {children}
          </h2>
        ),

        h3: ({ children }) => (
          <h3 className="mb-2 mt-5 text-xl font-semibold">
            {children}
          </h3>
        ),

        ul: ({ children }) => (
          <ul className="list-disc space-y-2 pl-6">
            {children}
          </ul>
        ),

        ol: ({ children }) => (
          <ol className="list-decimal space-y-2 pl-6">
            {children}
          </ol>
        ),

        table: ({ children }) => (
          <table className="my-4 w-full border-collapse border border-zinc-700">
            {children}
          </table>
        ),

        th: ({ children }) => (
          <th className="border border-zinc-700 bg-zinc-800 p-2">
            {children}
          </th>
        ),

        td: ({ children }) => (
          <td className="border border-zinc-700 p-2">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
