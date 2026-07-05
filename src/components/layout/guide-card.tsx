import { Card } from "@/components/ui/card";

export function GuideCard() {
  return (
    <Card className="bg-slate-900 border-slate-800 p-6">

      <h2 className="font-semibold text-lg">
        🚀 Getting Started
      </h2>

      <div className="mt-5 space-y-4 text-sm text-slate-300">

        <div>
          <strong>Chat</strong>
          <p>kimi-k2.7-code</p>
        </div>

        <div>
          <strong>Vision</strong>
          <p>kimi-k2.7-code</p>
        </div>

        <div>
          <strong>Images</strong>
          <p>flux-2-klein-9b</p>
        </div>

        <div className="pt-4 border-t border-slate-700">
          <p>
            Get your own API key from
          </p>

          <a
            href="https://docs.callmissed.com"
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            docs.callmissed.com
          </a>
        </div>

      </div>
    </Card>
  );
}