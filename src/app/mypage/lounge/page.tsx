"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ImageBox } from "@/components/ImageBox";
import { useReviews } from "@/lib/review-context";
import { articles } from "@/lib/lounge";

// 내가 쓴 정보글 (mock: 첫 2개를 본인 글로 표시)
const myArticles = articles.slice(0, 2);

export default function MyLoungePage() {
  const router = useRouter();
  const { userReviews } = useReviews();

  // 주문조회에서 작성된 리뷰 + mock 3개
  const mockMyReviews = [
    { id: "m1", product: "Aeron Chair", date: "2026-04-10", grade: "S", rating: 5 },
    { id: "m2", product: "Eames Lounge Chair", date: "2026-03-22", grade: "SS", rating: 5 },
    { id: "m3", product: "CH24 Wishbone", date: "2026-02-28", grade: "A+", rating: 4 },
  ];
  const allMyReviews = [
    ...userReviews.map((r) => ({
      id: r.id,
      product: r.product,
      date: r.date,
      grade: r.grade,
      rating: r.rating,
    })),
    ...mockMyReviews,
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">리빙 라운지</h2>
          <p className="text-sm text-muted-foreground mt-1">
            내가 작성한 리뷰와 정보글을 관리합니다.
          </p>
        </div>
        <Link href="/lounge">
          <Button variant="ghost" size="sm">
            라운지 보기 →
          </Button>
        </Link>
      </div>

      {/* 내 리뷰 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            내 리뷰 ({allMyReviews.length})
          </div>
          <Button size="sm" variant="outline" onClick={() => router.push("/mypage/orders")}>
            리뷰 작성
          </Button>
        </div>
        {allMyReviews.length === 0 ? (
          <div className="border border-dashed border-border py-10 text-center text-[12px] text-muted-foreground">
            아직 작성한 리뷰가 없습니다.
            <br />
            구매 완료된 상품에서 리뷰를 작성해 보세요.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {allMyReviews.map((r) => (
              <div key={r.id} className="border border-border p-4 hover:bg-sage-soft/20 transition-colors">
                <ImageBox ratio="landscape" />
                <div className="mt-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">{r.grade}</Badge>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <span key={s} className={s <= r.rating ? "text-xs text-sage-ink" : "text-xs text-border"}>★</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-sage-ink">{r.product}</div>
                  <div className="text-[11px] text-muted-foreground">{r.date}</div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1">수정</Button>
                  <Button size="sm" variant="ghost" className="text-muted-foreground">삭제</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 내 정보글 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            내 정보글 ({myArticles.length})
          </div>
          <Link href="/lounge/write">
            <Button size="sm" variant="outline">정보글 작성</Button>
          </Link>
        </div>
        {myArticles.length === 0 ? (
          <div className="border border-dashed border-border py-10 text-center text-[12px] text-muted-foreground">
            아직 작성한 정보글이 없습니다.
          </div>
        ) : (
          <div className="space-y-2">
            {myArticles.map((a) => (
              <div key={a.id} className="border border-border p-4 flex items-center gap-4 hover:bg-sage-soft/20 transition-colors">
                <ImageBox className="w-16 h-16 flex-shrink-0" ratio="square" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-sage-ink truncate">{a.title}</div>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1">
                    <span>{a.date}</span>
                    <span>·</span>
                    <span>조회 {a.views.toLocaleString()}</span>
                    <span>·</span>
                    <span>좋아요 {a.likes}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Link href={`/lounge/articles/${a.id}`}>
                    <Button size="sm" variant="outline">보기</Button>
                  </Link>
                  <Button size="sm" variant="ghost" className="text-muted-foreground">수정</Button>
                  <Button size="sm" variant="ghost" className="text-muted-foreground">삭제</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
