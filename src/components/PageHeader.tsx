import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, eyebrow, className, actions }: PageHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between border-b border-border pb-8 mb-12", className)}>
      <div>
        {eyebrow && (
          <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-3">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-4xl md:text-5xl leading-[0.95] text-sage-ink">{title}</h1>
        {description && (
          <p className="mt-4 text-sm text-muted-foreground max-w-xl leading-relaxed">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
