"use client";

import Link from "next/link";
import { ImageBox } from "@/components/ImageBox";
import { Badge } from "@/components/ui/Badge";
import { reviews } from "@/lib/lounge";
import { useReviews } from "@/lib/review-context";

export default function AllReviewsPage() {
  const { userReviews } = useReviews();
  const allReviews = [...userReviews, ...reviews];

  return (
    <div className="max-w-canvas mx-auto px-12 py-16">
      {/* Header */}
      <div className="border-b border-border pb-8 mb-10">
        <Link
          href="/lounge"
          className="text-[11px] text-muted-foreground tracking-[0.18em] uppercase hover:text-sage-ink transition-colors"
        >
          ← Living Lounge
        </Link>
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mt-6 mb-3">
          Community Reviews
        </div>
        <h1 className="font-display text-5xl text-sage-ink leading-none">
          커뮤니티 리뷰
        </h1>
        <p className="text-sm text-muted-foreground mt-3">
          총 {allReviews.length}개의 리뷰
        </p>
      </div>

      {/* Filter row */}
      <div className="flex gap-2 mb-8">
        {["전체", "SS", "S", "A+", "A", "B"].map((g, i) => (
          <button
            key={g}
            className={
              i === 0
                ? "px-4 h-9 text-xs border border-sage-ink bg-sage-ink text-background"
                : "px-4 h-9 text-xs border border-border hover:bg-muted"
            }
          >
            {g}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {allReviews.map((r) => (
          <Link
            key={r.id}
            href={r.id.startsWith("user-") ? "#" : `/lounge/reviews/${r.id}`}
            className="block group"
          >
            <article className="border border-border p-5 hover:bg-sage-soft/30 transition-colors h-full">
              {r.id.startsWith("user-") && (
                <div className="text-[10px] text-sage-deep tracking-[0.15em] uppercase mb-2">
                  내가 작성한 리뷰
                </div>
              )}
              <ImageBox ratio="landscape" />
              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="default">{r.grade}</Badge>
                  <Stars rating={r.rating} />
                </div>
                <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                  {r.product}
                </div>
                <p className="text-sm leading-relaxed text-sage-ink line-clamp-3">{r.body}</p>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border">
                  <span>{r.author} · {r.date}</span>
                  <span>👍 {r.helpful}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? "text-sm text-sage-ink" : "text-sm text-border"}>
          ★
        </span>
      ))}
    </div>
  );
}
