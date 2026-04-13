"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectProps {
  placeholder?: string;
  options: string[];
  className?: string;
}

export function Select({ placeholder = "선택", options, className }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full h-11 px-3 flex items-center justify-between text-sm border border-border bg-background transition-colors hover:border-sage-ink/40",
          selected ? "text-sage-ink" : "text-muted-foreground"
        )}
      >
        <span className="truncate">{selected || placeholder}</span>
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={cn(
            "text-muted-foreground transition-transform flex-shrink-0 ml-2",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 top-[calc(100%+2px)] left-0 w-full border border-border bg-background shadow-sm max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-3 py-2.5 text-sm transition-colors",
                opt === selected
                  ? "bg-sage-soft/60 text-sage-ink font-medium"
                  : "text-sage-ink hover:bg-muted"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
