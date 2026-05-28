"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getBanners, subscribe, type Banner } from "@/lib/bannerStore";
import { cn } from "@/lib/utils";

function getSnapshot() {
  return getBanners();
}

const INTERVAL = 4000;

export function HeroBannerCarousel() {
  const allBanners = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const banners = allBanners.filter((b) => b.status === "활성");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = banners.length;

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

  const current = banners[index];

  return (
    <div
      className="relative w-full overflow-hidden bg-sage-ink"
      style={{ aspectRatio: "16/6" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {banners.map((b, i) => (
        <div
          key={b.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
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
          {/* Click overlay */}
          {b.linkHref && (
            <Link href={b.linkHref} className="absolute inset-0 z-20" aria-label={b.imageName} />
          )}
        </div>
      ))}

      {/* Prev / Next arrows */}
      {count > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-colors"
            aria-label="이전"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-colors"
            aria-label="다음"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {count > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all",
                i === index ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide counter */}
      {count > 1 && (
        <div className="absolute bottom-4 right-4 z-30 text-[10px] text-white/60 font-mono">
          {index + 1} / {count}
        </div>
      )}
    </div>
  );
}
