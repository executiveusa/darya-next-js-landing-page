import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Play } from "lucide-react";

interface Template {
  name: string;
  category: string;
  description: string;
  thumbnail: string;
}

const templates: Template[] = [
  { name: "SaaS Launchpad", category: "SaaS", description: "Subscription billing, onboarding flows, and metrics dashboard.", thumbnail: "/thumbnails/saas.png" },
  { name: "Ecommerce Pulse", category: "Ecommerce", description: "High contrast storefront with MCP automations.", thumbnail: "/thumbnails/ecommerce.png" },
  { name: "Wellness Coach", category: "Fitness", description: "AI program planner and schedule booking widgets.", thumbnail: "/thumbnails/fitness.png" }
];

interface Props {
  admin?: boolean;
}

export default function TemplatesHub({ admin }: Props) {
  const [params] = useSearchParams();
  const activeCategory = params.get("category");

  const filteredTemplates = useMemo(
    () =>
      templates.filter((template) =>
        activeCategory ? template.category === activeCategory : true
      ),
    [activeCategory]
  );

  return (
    <section className="min-h-screen bg-[#050608] px-6 py-16 text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl">Template Library</h1>
            <p className="text-sm text-foreground/60">Each template bundles AI-ready React/Tailwind components plus connectors for Figma, Playwright MCP, and Rube.</p>
          </div>
          {!admin && (
            <Link
              to="/admin/templates"
              className="rounded-full border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              Manage in admin
            </Link>
          )}
        </header>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <article key={template.name} className="glass-panel flex flex-col overflow-hidden rounded-3xl">
              <div className="h-40 bg-gradient-to-br from-primary/30 to-secondary/20" aria-hidden="true" />
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl text-primary">{template.name}</h2>
                  <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-secondary">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-foreground/70">{template.description}</p>
                <div className="mt-auto flex gap-3 text-sm">
                  <a
                    href={`/templates/${encodeURIComponent(template.name)}`}
                    className="flex-1 rounded-xl border border-primary/30 px-3 py-2 text-center uppercase tracking-[0.2em] text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  >
                    Preview
                  </a>
                  <button
                    className="flex-1 rounded-xl border border-secondary/30 px-3 py-2 text-center uppercase tracking-[0.2em] text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <Play className="h-4 w-4" aria-hidden="true" /> Build
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
