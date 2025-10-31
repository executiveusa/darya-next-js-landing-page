import { createContext, useContext, useMemo, useState, PropsWithChildren, useCallback } from "react";

type Language = "en" | "es";

type Translation = {
  heroTitle: string;
  heroSubtitle: string;
  primaryCta: string;
  secondaryCta: string;
  proofTitle: string;
  howTitle: string;
  demosTitle: string;
  pricingTitle: string;
  templatesTitle: string;
  scheduleTitle: string;
  scheduleButton: string;
  adminLink: string;
  categoriesTitle: string;
  categoriesSubtitle: string;
  footer: string;
};

const dictionary: Record<Language, Translation> = {
  en: {
    heroTitle: "Synthia 3.0 // Hyper-Intelligent Automation",
    heroSubtitle: "Build agents, orchestrate CloudFlow, and ship faster across every stack.",
    primaryCta: "Launch Synthia",
    secondaryCta: "Ver demo en español",
    proofTitle: "Trusted by teams automating critical AI ops",
    howTitle: "How Synthia Works",
    demosTitle: "Live Demos",
    pricingTitle: "Pricing",
    templatesTitle: "Template Library",
    scheduleTitle: "Schedule a voice intake",
    scheduleButton: "Book Discovery Call",
    adminLink: "Admin",
    categoriesTitle: "Template Categories",
    categoriesSubtitle: "Launch-ready scaffolds inspired by the jQueryScript Bootstrap-5 collection.",
    footer: "Crafted for builders who automate responsibly."
  },
  es: {
    heroTitle: "Synthia 3.0 // Automatización Hiperinteligente",
    heroSubtitle: "Crea agentes, orquesta CloudFlow y entrega más rápido en cualquier stack.",
    primaryCta: "Iniciar Synthia",
    secondaryCta: "Watch demo in English",
    proofTitle: "Equipos líderes confían en Synthia para operar IA crítica",
    howTitle: "Cómo funciona Synthia",
    demosTitle: "Demos en vivo",
    pricingTitle: "Precios",
    templatesTitle: "Biblioteca de plantillas",
    scheduleTitle: "Agenda una llamada de voz",
    scheduleButton: "Reservar sesión",
    adminLink: "Administración",
    categoriesTitle: "Categorías de plantillas",
    categoriesSubtitle: "Paquetes listos para lanzar inspirados en la librería Bootstrap-5 de jQueryScript.",
    footer: "Diseñado para creadores que automatizan con responsabilidad."
  }
};

type I18nContextValue = {
  language: Language;
  toggleLanguage: () => void;
  t: Translation;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      toggleLanguage,
      t: dictionary[language]
    }),
    [language, toggleLanguage]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
