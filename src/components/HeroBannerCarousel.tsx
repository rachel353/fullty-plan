"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getBanners, subscribe, type Banner } from "@/lib/bannerStore";
import { cn } from "@/lib/utils";

function getSnapshot() {
  return getBanners();
}

const INTERVAL = 5000;

function toPairs(items: Banner[]): Banner[][] {
  const pairs: Banner[][] = [];
  for (let i = 0; i < items.length; i += 2) pairs.push(items.slice(i, i + 2));
  return pairs;
}

export function HeroBannerCarousel() {
  const allBanners = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const banners = allBanners.filter((b) => b.status === "활성");
  const pairs = toPairs(banners);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = pairs.length;

  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  // Clamp index when banner list shrinks
  useEffect(() => {
    if (count > 0 && index >= count) setIndex(count - 1);
  }, [count, index]);

  // Auto-advance
  useEffect(() => {
    if (count <= 1 || paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [count, paused, next]);

  if (count === 0) return null;

  const current = pairs[index];

  return (
    <section className="border-b border-border">
      <div className="max-w-canvas mx-auto px-12 py-8">
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className={cn("grid gap-3", current.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1")}>
            {current.map((b) => (
              <div
                key={b.id}
                className="relative w-full overflow-hidden bg-sage-ink"
                style={{ aspectRatio: "16/7" }}
              >
                {b.imageUrl ? (
                  <img
                    src={b.imageUrl}
                    alt={b.imageName}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-sage">
                    <span className="text-sage-ink/40 text-sm font-mono">{b.imageName}</span>
                  </div>
                )}
                {b.linkHref && (
                  <Link href={b.linkHref} className="absolute inset-0 z-20" aria-label={b.imageName} />
                )}
              </div>
            ))}
          </div>

          {/* Prev / Next arrows */}
          {count > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-colors"
                aria-label="이전"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-9 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-colors"
                aria-label="다음"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Dot indicators */}
        {count > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {pairs.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "bg-sage-ink w-4" : "bg-border w-1.5 hover:bg-muted-foreground/40"
                )}
                aria-label={`슬라이드 ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
