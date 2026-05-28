"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { getCardBanners, subscribeCards, type Banner } from "@/lib/bannerStore";

function getSnapshot(): Banner[] {
  return getCardBanners().filter((b) => b.status === "활성");
}

export function CardNewsBanners() {
  const cards = useSyncExternalStore(subscribeCards, getSnapshot, getSnapshot);

  if (cards.length === 0) return null;

  return (
    <section>
      <div className="max-w-canvas mx-auto px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {cards.map((card) => {
            const inner = (
              <div className="relative w-full overflow-hidden bg-muted group" style={{ aspectRatio: "3/4" }}>
                {card.imageUrl ? (
                  <img
                    src={card.imageUrl}
                    alt={card.imageName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[11px] text-muted-foreground font-mono">
                    {card.imageName}
                  </div>
                )}
              </div>
            );

            return card.linkHref ? (
              <Link key={card.id} href={card.linkHref} className="block">
                {inner}
              </Link>
            ) : (
              <div key={card.id}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
