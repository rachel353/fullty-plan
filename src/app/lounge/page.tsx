import Link from "next/link";
import { ImageBox } from "@/components/ImageBox";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const reviews = [
  {
    id: "rv1",
    author: "김**",
    product: "Herman Miller Aeron Chair",
    grade: "S",
    rating: 5,
    date: "2026-04-10",
    body: "박스 상태부터 깔끔했고, 실제 받아보니 Fullty 검수 등급이 정확하다는 걸 느꼈습니다. 미세한 사용감만 있고 전반적으로 만족해요.",
    helpful: 18,
  },
  {
    id: "rv2",
    author: "이**",
    product: "Vitra Eames Lounge Chair",
    grade: "SS",
    rating: 5,
    date: "2026-04-08",
    body: "빈티지 특유의 색감이 살아있어 만족스럽습니다. 렌탈로 먼저 써보고 구매 전환 결정했어요. 차액 결제 프로세스도 깔끔했습니다.",
    helpful: 24,
  },
  {
    id: "rv3",
    author: "박**",
    product: "USM Haller Sideboard",
    grade: "A+",
    rating: 4,
    date: "2026-04-05",
    body: "자연스러운 사용감이 오히려 빈티지 느낌을 더해줍니다. 모듈 조립도 단단하고 기능상 전혀 문제 없어요.",
    helpful: 12,
  },
];

const articles = [
  {
    id: "a1",
    author: "노르딕 리빙",
    title: "Herman Miller 시리즈 비교 — Aeron · Embody · Cosm",
    date: "2026-04-11",
    views: 3240,
    likes: 128,
    tag: "가구",
  },
  {
    id: "a2",
    author: "빈티지 웍스",
    title: "USM Haller 모듈 구성 가이드 — 집의 크기별 추천 조합",
    date: "2026-04-09",
    views: 1820,
    likes: 92,
    tag: "수납",
  },
  {
    id: "a3",
    author: "오브제 스튜디오",
    title: "프리미엄 가구 관리법 — 가죽·원목·철제 5년 관리 팁",
    date: "2026-04-03",
    views: 2610,
    likes: 156,
    tag: "케어",
  },
];

export default function LoungePage() {
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
            <Button variant="outline">정보글 작성</Button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-canvas mx-auto px-12 pt-12">
        <div className="flex gap-8 border-b border-border">
          {["전체", "리뷰", "정보글", "케어 가이드", "셀러 스토리"].map((tab, i) => (
            <button
              key={tab}
              className={
                i === 0
                  ? "pb-3 border-b-2 border-sage-ink text-sm font-semibold text-sage-ink"
                  : "pb-3 text-sm text-muted-foreground hover:text-sage-ink"
              }
            >
              {tab}
            </button>
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
          <button className="text-[11px] tracking-[0.18em] uppercase border-b border-sage-ink pb-1">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <article key={r.id} className="border border-border p-5 hover:bg-sage-soft/30 transition-colors">
              <ImageBox ratio="landscape" />
              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="default">{r.grade}</Badge>
                  <Stars rating={r.rating} />
                </div>
                <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                  {r.product}
                </div>
                <p className="text-sm leading-relaxed text-sage-ink">{r.body}</p>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border">
                  <span>{r.author} · {r.date}</span>
                  <span>👍 {r.helpful}</span>
                </div>
              </div>
            </article>
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
              <article
                key={a.id}
                className="bg-background p-6 flex items-center gap-6 hover:bg-sage-soft/30 transition-colors"
              >
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
