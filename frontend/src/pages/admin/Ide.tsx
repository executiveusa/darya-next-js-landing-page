import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { Send, Play, Upload } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const workflows = [
  { name: "Upgrade UI", command: "claude /plan ui-refresh" },
  { name: "Generate PRD", command: "cloudflow run prd" },
  { name: "Write tests", command: "cloudflow run playwright-regression" }
];

export default function Ide() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Welcome to Claude Code. Ask for refactors, new components, or CloudFlow runs." }
  ]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const submitMessage = (text: string) => {
    if (!text.trim()) return;
    const newMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, newMessage, { role: "assistant", content: "Streaming response from Claude Code…" }]);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => submitMessage(input));
    setInput("");
  };

  return (
    <section className="grid gap-6 px-8 py-10 lg:grid-cols-[320px,1fr]">
      <aside className="glass-panel flex flex-col gap-4 rounded-3xl p-6">
        <header>
          <h2 className="font-display text-xl text-primary">CloudFlow Templates</h2>
          <p className="text-sm text-foreground/60">Launch curated workflows that send commands to Claude Code.</p>
        </header>
        <ul className="space-y-3">
          {workflows.map((workflow) => (
            <li key={workflow.name}>
              <button
                className="w-full rounded-xl border border-primary/30 px-3 py-2 text-left text-sm text-foreground transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                onClick={() => submitMessage(workflow.command)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-primary">{workflow.name}</span>
                  <Play className="h-4 w-4 text-secondary" aria-hidden="true" />
                </div>
                <p className="mt-1 text-xs text-foreground/60">{workflow.command}</p>
              </button>
            </li>
          ))}
        </ul>
        <label className="flex flex-col text-sm">
          Upload workflow YAML
          <input type="file" accept=".yml,.yaml" className="mt-2 text-xs" />
        </label>
      </aside>
      <div className="glass-panel flex h-[70vh] flex-col rounded-3xl">
        <header className="border-b border-primary/20 px-6 py-4">
          <h2 className="font-display text-xl">Claude Code IDE</h2>
        </header>
        <div ref={logRef} className="flex-1 space-y-4 overflow-y-auto px-6 py-4 text-sm">
          {messages.map((message, index) => (
            <div key={index} className="rounded-2xl border border-primary/10 bg-black/40 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-primary">{message.role}</p>
              <pre className="mt-2 whitespace-pre-wrap font-mono text-xs text-foreground/80">{message.content}</pre>
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit} className="border-t border-primary/20 px-6 py-4">
          <label className="sr-only" htmlFor="command">
            Claude Code command
          </label>
          <div className="flex items-center gap-3">
            <input
              id="command"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Describe what you want Claude Code to do"
              className="flex-1 rounded-xl border border-primary/30 bg-black/40 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            />
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              Send
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-secondary/30 px-4 py-2 text-sm text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <Upload className="h-4 w-4" aria-hidden="true" />
              Cloud Code
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
