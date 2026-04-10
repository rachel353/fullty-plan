import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "default" | "outline" | "ghost" | "link" | "sage";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  default:
    "bg-sage-ink text-background hover:bg-sage-deep border border-sage-ink hover:border-sage-deep",
  sage: "bg-sage text-sage-ink hover:bg-sage-soft border border-sage hover:border-sage-soft",
  outline: "bg-transparent text-sage-ink border border-sage-ink/30 hover:bg-sage-soft/40 hover:border-sage-ink/60",
  ghost: "bg-transparent text-sage-ink hover:bg-sage-soft/40 border border-transparent",
  link: "bg-transparent text-sage-ink underline underline-offset-4 hover:text-sage-deep border border-transparent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[11px] tracking-[0.12em]",
  md: "h-11 px-6 text-xs tracking-[0.14em]",
  lg: "h-14 px-8 text-xs tracking-[0.18em]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-none font-medium uppercase transition-colors disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
