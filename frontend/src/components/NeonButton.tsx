import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const NeonButton = forwardRef<HTMLButtonElement, Props>(({ className, asChild, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref as any}
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-primary/20 px-6 py-3 text-sm font-semibold text-primary shadow-neon transition hover:bg-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
});

NeonButton.displayName = "NeonButton";

export default NeonButton;
