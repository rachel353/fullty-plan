import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Variant = "default" | "outline" | "muted" | "sage";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  default: "bg-sage-ink text-background border-sage-ink",
  sage: "bg-sage text-sage-ink border-sage",
  outline: "bg-transparent text-sage-ink border-sage-ink/40",
  muted: "bg-muted text-muted-foreground border-border",
};

export function Badge({ className, variant = "outline", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-[10px] font-medium tracking-[0.12em] uppercase border",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
