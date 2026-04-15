"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sage-ink/40"
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-background w-full max-w-md max-h-[90vh] flex flex-col shadow-xl",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between px-6 py-4 bg-sage border-b border-sage/50">
          <h2 className="text-sm font-semibold text-sage-ink">{title}</h2>
          <button
            onClick={onClose}
            className="text-sage-ink hover:text-sage-deep transition-colors"
            aria-label="close"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
