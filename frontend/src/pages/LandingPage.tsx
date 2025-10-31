import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ArrowRight, ShieldCheck, Sparkle, Calendar, ExternalLink } from "lucide-react";
import { useI18n } from "../lib/i18n";
import LanguageToggle from "../components/LanguageToggle";
import NeonButton from "../components/NeonButton";
import Section from "../components/Section";

const proofPoints = [
  "99.97% uptime on multi-cloud agents",
  "< 2.5s LCP across Lighthouse benchmarks",
  "WCAG AA verified via Playwright MCP",
  "Claude + Gemini + GPT routing out of the box"
];

const templateCategories = [
  "SaaS",
  "Ecommerce",
  "Fitness",
  "Education",
  "Crypto",
  "Healthcare",
  "Portfolio",
  "Finance",
  "AI Studio"
];

const howSteps = [
  {
    title: "Model-routing intelligence",
    description: "Guide traffic across Anthropic, DeepSeek, Qwen3, and more with built-in guardrails."
  },
  {
    title: "Claude Code + CloudFlow",
    description: "Author features and workflows with conversational code execution and templated flows."
  },
  {
    title: "Deploy with confidence",
    description: "Observe tokens, latency, and cost in real-time before shipping to Cloud Run."
  }
];

export default function LandingPage() {
  const { t, toggleLanguage, language } = useI18n();

  useEffect(() => {
    gsap.fromTo(
      "[data-animate=hero]",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.2 }
    );
  }, [language]);

  const bilingualProof = useMemo(
    () =>
      proofPoints.map((point, idx) => ({
        en: point,
        es: [
          "Disponibilidad del 99.97% en agentes multicloud",
          "LCP < 2.5s en todas las pruebas Lighthouse",
          "WCAG AA verificado con Playwright MCP",
          "Enrutamiento Claude + Gemini + GPT listo para usar"
        ][idx]
      })),
    []
  );

  return (
    <div className="min-h-screen text-foreground">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-primary/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-xl tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            SYNTHIA 3.0
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/templates"
              className="rounded-full border border-primary/40 px-4 py-2 text-sm transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              Templates
            </Link>
            <LanguageToggle onToggle={toggleLanguage} language={language} />
          </div>
        </div>
      </header>
      <main tabIndex={-1} className="focus-visible:outline-none">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-60 blur-3xl" aria-hidden="true">
            <div className="absolute -top-24 left-1/3 h-64 w-64 rounded-full bg-primary/40" />
            <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-secondary/30" />
          </div>
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-24 text-center lg:py-32">
            <span data-animate="hero" className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/40 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.3em] text-primary">
              <Sparkle className="h-4 w-4" aria-hidden="true" />
              SYNTHIA CLOUD AUTOMATION
            </span>
            <h1 data-animate="hero" className="font-display text-4xl leading-tight md:text-6xl">
              {t.heroTitle}
            </h1>
            <p data-animate="hero" className="mx-auto max-w-2xl text-lg text-foreground/80">
              {t.heroSubtitle}
            </p>
            <div data-animate="hero" className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <NeonButton asChild>
                <a href="#schedule" className="inline-flex items-center gap-2">
                  {t.primaryCta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </NeonButton>
              <a
                href="#demos"
                className="inline-flex items-center gap-2 rounded-full border border-secondary/40 px-6 py-3 text-sm text-secondary transition hover:border-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                {t.secondaryCta}
              </a>
            </div>
            <div className="grid grid-cols-1 gap-4 rounded-3xl border border-primary/20 bg-black/40 p-6 sm:grid-cols-2 lg:grid-cols-4">
              {bilingualProof.map((item, index) => (
                <div key={item.en} className="flex items-start gap-3 text-left">
                  <ShieldCheck className="mt-1 h-5 w-5 text-primary" aria-hidden="true" />
                  <p className="text-sm text-foreground/80">
                    {language === "en" ? item.en : item.es}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Link
            to="/admin"
            className="fixed bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary shadow-neon transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            {t.adminLink}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        <Section id="categories" title={t.categoriesTitle} description={t.categoriesSubtitle} icon={Sparkle}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templateCategories.map((category) => (
              <Link
                key={category}
                to={`/templates?category=${encodeURIComponent(category)}`}
                className="glass-panel group flex flex-col gap-4 rounded-3xl p-6 transition hover:shadow-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl">{category}</h3>
                  <ArrowRight className="h-5 w-5 text-primary transition group-hover:translate-x-1" aria-hidden="true" />
                </div>
                <p className="text-sm text-foreground/70">
                  {language === "en"
                    ? "Preview dozens of curated Bootstrap-5 layouts adapted for React/Tailwind."
                    : "Explora docenas de diseños Bootstrap-5 adaptados a React/Tailwind."}
                </p>
              </Link>
            ))}
          </div>
        </Section>

        <Section id="how" title={t.howTitle} description="" icon={ArrowRight}>
          <div className="grid gap-6 md:grid-cols-3">
            {howSteps.map((step) => (
              <div key={step.title} className="glass-panel rounded-3xl p-6">
                <h3 className="font-display text-xl text-primary">{step.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{step.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="demos" title={t.demosTitle} description="Experience guided demos from the CloudFlow orchestration suite." icon={Sparkle}>
          <div className="glass-panel grid gap-6 rounded-3xl p-6 md:grid-cols-2">
            <article className="rounded-2xl border border-primary/20 bg-black/40 p-6">
              <h3 className="font-display text-lg">Agentic Debugger</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Attach to live Claude Code sessions, stream logs, and refactor in place.
              </p>
            </article>
            <article className="rounded-2xl border border-secondary/20 bg-black/40 p-6">
              <h3 className="font-display text-lg">CloudFlow Pipelines</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Trigger reusable workflows like “Upgrade UI” and “Write tests” with run history.
              </p>
            </article>
          </div>
        </Section>

        <Section
          id="schedule"
          title={t.scheduleTitle}
          description={
            language === "en"
              ? "Connect with the BMAD voice concierge for a 20-minute mapping session."
              : "Conecta con la concierge de voz BMAD para una sesión de 20 minutos."
          }
          icon={Calendar}
        >
          <form
            className="glass-panel flex flex-col gap-4 rounded-3xl p-6"
            action="/api/interview/start"
            method="post"
          >
            <label className="flex flex-col text-left text-sm">
              <span className="mb-1 font-semibold text-foreground">{language === "en" ? "Name" : "Nombre"}</span>
              <input
                required
                name="name"
                className="rounded-xl border border-primary/30 bg-black/50 px-4 py-3 text-sm text-foreground placeholder:text-foreground/50 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                placeholder={language === "en" ? "Ada Lovelace" : "Ada Lovelace"}
              />
            </label>
            <label className="flex flex-col text-left text-sm">
              <span className="mb-1 font-semibold text-foreground">Email</span>
              <input
                required
                type="email"
                name="email"
                className="rounded-xl border border-primary/30 bg-black/50 px-4 py-3 text-sm text-foreground placeholder:text-foreground/50 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                placeholder="you@example.com"
              />
            </label>
            <label className="flex flex-col text-left text-sm">
              <span className="mb-1 font-semibold text-foreground">{language === "en" ? "Preferred time" : "Horario preferido"}</span>
              <input
                required
                name="slot"
                type="datetime-local"
                className="rounded-xl border border-primary/30 bg-black/50 px-4 py-3 text-sm text-foreground placeholder:text-foreground/50 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              />
            </label>
            <NeonButton type="submit" className="w-full justify-center">
              {t.scheduleButton}
            </NeonButton>
          </form>
        </Section>
      </main>
      <footer className="border-t border-primary/20 bg-black/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 text-sm text-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>{t.footer}</p>
          <div className="flex items-center gap-4">
            <a href="#categories" className="hover:text-primary">Categories</a>
            <Link to="/admin" className="hover:text-primary">
              {language === "en" ? "Admin Console" : "Consola Admin"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
