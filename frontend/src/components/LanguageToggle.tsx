import { ButtonHTMLAttributes } from "react";
import { Languages } from "lucide-react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  language: "en" | "es";
  onToggle: () => void;
}

export default function LanguageToggle({ language, onToggle, ...props }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-4 py-2 text-xs uppercase tracking-[0.3em] text-primary shadow-neon transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      aria-live="polite"
      {...props}
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      {language === "en" ? "ES" : "EN"}
    </button>
  );
}
