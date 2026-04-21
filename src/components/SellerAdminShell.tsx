"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SidebarNav, SidebarSection } from "@/components/SidebarNav";
import { SellerTypeProvider, SellerType, useSellerType } from "@/lib/seller-context";

function ShellContent({ sections, children }: { sections: SidebarSection[]; children: ReactNode }) {
  const { sellerType, setSellerType } = useSellerType();

  return (
    <div className="max-w-canvas mx-auto px-12 py-16">
      <div className="border-b border-border pb-8 mb-12">
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase">
          Seller Admin
        </div>
        <h1 className="font-display text-5xl text-sage-ink mt-3 leading-none">빈티지 웍스</h1>
        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center border border-border">
            {(["개인", "사업자"] as SellerType[]).map((t) => (
              <button
                key={t}
                onClick={() => setSellerType(t)}
                className={cn(
                  "px-4 py-1.5 text-[11px] tracking-[0.1em] transition-colors",
                  sellerType === t
                    ? "bg-sage-ink text-background"
                    : "text-muted-foreground hover:text-sage-ink"
                )}
              >
                {t} 셀러
              </button>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">· 승인 완료</span>
          {sellerType === "사업자" && (
            <span className="text-[10px] text-sage-deep border border-sage-deep/40 bg-sage-deep/5 px-2 py-0.5 tracking-wide">
              직배송 권한
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">
        <aside>
          <SidebarNav sections={sections} />
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}

export function SellerAdminShell({
  sections,
  children,
}: {
  sections: SidebarSection[];
  children: ReactNode;
}) {
  return (
    <SellerTypeProvider>
      <ShellContent sections={sections}>{children}</ShellContent>
    </SellerTypeProvider>
  );
}
