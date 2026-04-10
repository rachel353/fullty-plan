"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type SidebarSection = {
  title: string;
  items: { href: string; label: string }[];
};

export function SidebarNav({ sections }: { sections: SidebarSection[] }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-10 sticky top-32">
      {sections.map((section) => (
        <div key={section.title}>
          <div className="text-[10px] font-medium tracking-[0.25em] text-muted-foreground uppercase mb-4">
            {section.title}
          </div>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-2 text-sm transition-colors",
                      active
                        ? "text-sage-deep font-medium"
                        : "text-muted-foreground hover:text-sage-ink"
                    )}
                  >
                    <span className={active ? "border-b border-sage-deep pb-0.5" : ""}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
