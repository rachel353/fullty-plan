"use client";

import Link from "next/link";
import { ImageBox } from "@/components/ImageBox";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { reviews, articles } from "@/lib/lounge";
import { useReviews } from "@/lib/review-context";

export default function LoungePage() {
  const { userReviews } = useReviews();
  const allReviews = [...userReviews, ...reviews];
  return (
    <div>
      {/* Hero */}
      <section className="bg-sage-soft/40 border-b border-border">
        <div className="max-w-canvas mx-auto px-12 py-16">
          <div className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase mb-4">
            Living Lounge
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-sage-ink leading-[0.95] mb-4">
            빈티지를 사랑하는 사람들의
            <br />
            이야기.
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
            Fullty에서 거래한 고객들의 솔직한 리뷰와 가구 전문가의 인사이트를 만나보세요.
            당신의 경험도 함께 남겨주세요.
          </p>
          <div className="flex gap-2 mt-8">
            <Link href="/mypage/lounge">
              <Button>내 라운지 관리</Button>
            </Link>
            <Link href="/lounge/write">
              <Button variant="outline">정보글 작성</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-canvas mx-auto px-12 pt-12">
        <div className="flex gap-8 border-b border-border">
          {[
            { label: "전체", href: "/lounge", active: true },
            { label: "리뷰", href: "/lounge/reviews", active: false },
            { label: "정보글", href: "/lounge/articles", active: false },
            { label: "제품자랑", href: "/lounge/articles?tag=제품자랑", active: false },
            { label: "인테리어", href: "/lounge/articles?tag=인테리어", active: false },
            { label: "일상", href: "/lounge/articles?tag=일상", active: false },
          ].map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className={
                tab.active
                  ? "pb-3 border-b-2 border-sage-ink text-sm font-semibold text-sage-ink"
                  : "pb-3 text-sm text-muted-foreground hover:text-sage-ink transition-colors"
              }
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Reviews grid */}
      <section className="max-w-canvas mx-auto px-12 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase">
              Recent Reviews
            </div>
            <h2 className="font-display text-3xl text-sage-ink mt-2">커뮤니티 리뷰</h2>
          </div>
          <Link href="/lounge/reviews" className="text-[11px] tracking-[0.18em] uppercase border-b border-sage-ink pb-1 hover:text-sage-deep transition-colors">
            View All →
          </Link>
        </div>

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
      </section>

      {/* Articles */}
      <section className="bg-muted/40 border-t border-border">
        <div className="max-w-canvas mx-auto px-12 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase">
                Journal
              </div>
              <h2 className="font-display text-3xl text-sage-ink mt-2">정보글 · 인사이트</h2>
            </div>
          </div>

          <div className="space-y-px bg-border">
            {articles.map((a) => (
              <Link key={a.id} href={`/lounge/articles/${a.id}`} className="block">
                <article className="bg-background p-6 flex items-center gap-6 hover:bg-sage-soft/30 transition-colors">
                  <ImageBox className="w-28 h-28 flex-shrink-0" ratio="square" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{a.tag}</Badge>
                      <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                        {a.author}
                      </span>
                    </div>
                    <div className="font-display text-xl text-sage-ink mt-2 leading-snug">
                      {a.title}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-2">
                      <span>{a.date}</span>
                      <span>·</span>
                      <span>조회 {a.views.toLocaleString()}</span>
                      <span>·</span>
                      <span>좋아요 {a.likes}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={i <= rating ? "text-sm text-sage-ink" : "text-sm text-border"}
        >
          ★
        </span>
      ))}
    </div>
  );
}
