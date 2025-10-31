import { ElementType, PropsWithChildren } from "react";
import { cn } from "../lib/utils";

interface Props extends PropsWithChildren {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
}

export default function Section({ id, title, description, icon: Icon, children }: Props) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-6 py-20">
      <header className="mb-10 flex flex-col gap-4 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.3em] text-primary">
          <Icon className="h-4 w-4" aria-hidden="true" />
          {title}
        </div>
        <p className="mx-auto max-w-3xl text-sm text-foreground/70">{description}</p>
      </header>
      <div className={cn("grid", "gap-6")}>{children}</div>
    </section>
  );
}
