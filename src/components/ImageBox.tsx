import { cn } from "@/lib/utils";

interface ImageBoxProps {
  className?: string;
  ratio?: "square" | "portrait" | "landscape" | "wide";
  label?: string;
}

const ratios = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

export function ImageBox({ className, ratio = "square", label }: ImageBoxProps) {
  return (
    <div
      className={cn(
        "w-full bg-muted flex items-center justify-center text-muted-foreground text-xs",
        ratios[ratio],
        className
      )}
    >
      {label}
    </div>
  );
}
