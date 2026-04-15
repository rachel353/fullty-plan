"use client";

import { useState } from "react";
import { ImageBox } from "./ImageBox";
import { Badge } from "./ui/Badge";
import { Product, Grade } from "@/lib/mock";
import { cn } from "@/lib/utils";

const tabs = ["상품 정보", "검수 등급", "리뷰"] as const;
type Tab = (typeof tabs)[number];

const gradeDefs: { grade: Grade; title: string; desc: string; checks: string[] }[] = [
  {
    grade: "SS",
    title: "최상품 / 거의 신품",
    desc: "전시용 또는 극히 짧은 사용 기간. 박스·부속품이 모두 보존된 상태.",
    checks: ["사용감 거의 없음", "스크래치 0", "원본 부속 전부", "박스 보존"],
  },
  {
    grade: "S",
    title: "사용감 매우 적음",
    desc: "눈에 띄지 않는 미세한 사용 흔적. 일상 사용에 전혀 지장 없는 상태.",
    checks: ["미세 사용감", "미세 스크래치 1~2곳", "기능 완전", "주요 부속 포함"],
  },
  {
    grade: "A+",
    title: "우수한 컨디션",
    desc: "자연스러운 사용감이 있으나 전체 컨디션이 우수. 데일리 사용에 적합.",
    checks: ["가벼운 사용감", "가구적 세월감 허용", "구조 견고", "기능 정상"],
  },
  {
    grade: "A",
    title: "양호한 사용감",
    desc: "뚜렷한 사용 흔적이 있지만 원형은 유지된 상태. 수리 이력 없음.",
    checks: ["사용감 뚜렷", "일부 자국/눌림", "구조 안정", "기능 정상"],
  },
  {
    grade: "B",
    title: "기능적 사용감",
    desc: "사용감이 크지만 기능은 정상 작동. 빈티지의 세월감을 좋아하는 분께 추천.",
    checks: ["사용감 큼", "눌림/자국 있음", "수리 이력 가능", "기능 정상"],
  },
];

const reviews = [
  {
    id: "rv1",
    author: "김**",
    grade: "S",
    rating: 5,
    date: "2026-03-28",
    body: "박스 상태부터 깔끔했고, 실제 받아보니 풀티 검수 등급이 정확하다는 걸 느꼈습니다. 미세한 사용감만 있고 전반적으로 만족해요.",
    helpful: 18,
  },
  {
    id: "rv2",
    author: "이**",
    grade: "A+",
    rating: 4,
    date: "2026-03-15",
    body: "가격 대비 컨디션이 좋습니다. 설명란에 적힌 대로 자연스러운 사용감이 있었고 예상한 범위 안이었어요. 렌탈로 먼저 써보고 구매 전환했습니다.",
    helpful: 12,
  },
  {
    id: "rv3",
    author: "박**",
    grade: "A",
    rating: 5,
    date: "2026-02-22",
    body: "빈티지 특유의 세월감이 좋아서 오히려 만족. 구조도 튼튼하고 기능상 문제 전혀 없어요. 가구 자산화 등록도 바로 진행했습니다.",
    helpful: 9,
  },
];

const stats = {
  average: 4.7,
  total: 3,
  distribution: [
    { star: 5, count: 2 },
    { star: 4, count: 1 },
    { star: 3, count: 0 },
    { star: 2, count: 0 },
    { star: 1, count: 0 },
  ],
};

export function ProductDetailTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<Tab>("상품 정보");

  return (
    <div className="mt-20 border-t border-border pt-12">
      <div className="flex gap-8 border-b border-border mb-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={cn(
              "pb-3 text-sm transition-colors",
              active === tab
                ? "border-b-2 border-sage-ink font-semibold text-sage-ink"
                : "text-muted-foreground hover:text-sage-ink"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {active === "상품 정보" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              {product.brand}의 대표작 {product.name}입니다. Fullty 검수팀의 자체 기준에 의해{" "}
              <strong className="text-sage-ink">{product.grade}</strong> 등급으로 평가되었습니다.
            </p>
            <ImageBox ratio="wide" label="상세 이미지 영역" />
            <p>
              사용감과 본래 디자인 의도가 잘 보존된 상태로, 일상에서 매일 사용해도 좋은
              컨디션입니다. 모든 상품은 Fullty 검수 후 노출됩니다.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-4">
              <InfoRow label="브랜드" value={product.brand} />
              <InfoRow label="모델" value={product.name} />
              <InfoRow label="옵션" value={product.option} />
              <InfoRow label="카테고리" value={product.category} />
              <InfoRow label="상태 등급" value={product.grade} />
              <InfoRow label="렌탈 공급" value={product.rentable ? "가능" : "불가"} />
            </div>
          </div>

          <aside className="border border-border p-5 h-fit bg-sage-soft/30">
            <div className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-4">
              About the Seller
            </div>
            <div className="font-display text-xl text-sage-ink">{product.seller}</div>
            <div className="text-[11px] text-muted-foreground mt-1">사업자 셀러 · 승인 완료</div>
            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">판매중</span>
                <span className="font-medium">24개</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">평균 평점</span>
                <span className="font-medium">4.8 / 5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">응답 속도</span>
                <span className="font-medium">평균 2시간</span>
              </div>
            </div>
          </aside>
        </div>
      )}

      {active === "검수 등급" && (
        <div>
          <div className="border border-border p-6 bg-sage-soft/30 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="default">{product.grade}</Badge>
              <span className="text-sm font-medium text-sage-ink">이 상품의 검수 등급</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              모든 상품은 Fullty 검수팀이 외관·기능·부속·원본 여부를 점검한 후 5단계 등급(SS / S /
              A+ / A / B)으로 분류합니다. 같은 등급이라도 세부 상태는 상품 상세의 "상품 정보" 탭과
              이미지를 참고해 주세요.
            </p>
          </div>

          <div className="space-y-3">
            {gradeDefs.map((g) => {
              const isThis = g.grade === product.grade;
              return (
                <div
                  key={g.grade}
                  className={cn(
                    "grid grid-cols-12 gap-4 p-5 border transition-colors",
                    isThis
                      ? "border-sage-ink bg-sage-soft/40"
                      : "border-border hover:bg-muted/40"
                  )}
                >
                  <div className="col-span-1 flex items-start">
                    <Badge variant={isThis ? "default" : "outline"}>{g.grade}</Badge>
                  </div>
                  <div className="col-span-7">
                    <div className="text-sm font-semibold text-sage-ink">{g.title}</div>
                    <div className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                      {g.desc}
                    </div>
                  </div>
                  <div className="col-span-4">
                    <ul className="space-y-1 text-[11px] text-muted-foreground">
                      {g.checks.map((c) => (
                        <li key={c} className="flex items-start gap-1.5">
                          <span className="text-sage-deep">·</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border border-border p-5 mt-8 text-[11px] text-muted-foreground leading-relaxed">
            * 등급은 거래 당시 상태 기준이며, 회수 후 재판매 시에는 다시 검수하여 등급이 조정될 수
            있습니다. 자산화 등록 후 보유 중인 가구 역시 판매 시점에 재검수됩니다.
          </div>
        </div>
      )}

      {active === "리뷰" && (
        <div>
          {/* Rating summary */}
          <div className="grid grid-cols-12 gap-8 mb-10">
            <div className="col-span-4 border border-border p-6 text-center">
              <div className="font-display text-6xl text-sage-ink leading-none">
                {stats.average}
              </div>
              <Stars rating={Math.round(stats.average)} className="justify-center mt-3" />
              <div className="text-[11px] text-muted-foreground mt-3">
                총 {stats.total}개 리뷰
              </div>
            </div>

            <div className="col-span-8 space-y-2">
              {stats.distribution.map((d) => {
                const pct = stats.total ? (d.count / stats.total) * 100 : 0;
                return (
                  <div key={d.star} className="flex items-center gap-3 text-xs">
                    <div className="w-6 text-muted-foreground">{d.star}★</div>
                    <div className="flex-1 h-1.5 bg-muted">
                      <div
                        className="h-1.5 bg-sage-deep transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="w-8 text-right text-muted-foreground">{d.count}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review list */}
          <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
            <div className="text-sm font-semibold">리뷰 ({stats.total})</div>
            <div className="flex items-center gap-2 text-xs">
              <button className="text-sage-ink font-medium border-b border-sage-ink pb-0.5">
                최신순
              </button>
              <span className="text-muted-foreground">·</span>
              <button className="text-muted-foreground hover:text-sage-ink">평점 높은순</button>
              <span className="text-muted-foreground">·</span>
              <button className="text-muted-foreground hover:text-sage-ink">도움순</button>
            </div>
          </div>

          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="border border-border p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-sage-ink">{r.author}</div>
                      <Badge variant="outline">{r.grade}</Badge>
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-1">{r.date}</div>
                  </div>
                  <Stars rating={r.rating} />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border text-[11px] text-muted-foreground">
                  <button className="hover:text-sage-ink">
                    👍 도움이 돼요 ({r.helpful})
                  </button>
                  <button className="hover:text-sage-ink">신고</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border py-2.5 flex justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-sage-ink font-medium">{value}</span>
    </div>
  );
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={cn(
            "text-sm",
            i <= rating ? "text-sage-ink" : "text-border"
          )}
        >
          ★
        </span>
      ))}
    </div>
  );
}
