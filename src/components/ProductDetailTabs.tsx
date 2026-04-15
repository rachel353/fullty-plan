"use client";

import { useState } from "react";
import { ImageBox } from "./ImageBox";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Product } from "@/lib/mock";
import { cn } from "@/lib/utils";

const tabs = ["상품 정보", "리뷰", "Q&A"] as const;
type Tab = (typeof tabs)[number];

const reviews = [
  {
    id: "rv1",
    author: "김**",
    grade: "S",
    rating: 5,
    date: "2026-03-28",
    body: "박스 상태부터 깔끔했고, 실제 받아보니 Fullty 검수 등급이 정확하다는 걸 느꼈습니다. 미세한 사용감만 있고 전반적으로 만족해요.",
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

const reviewStats = {
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

const qna = [
  {
    id: "q1",
    author: "최**",
    date: "2026-04-05",
    status: "답변 완료" as const,
    question: "실제 수령까지 보통 며칠 걸리나요? 검수 포함해서요.",
    answer:
      "안녕하세요. 셀러 → Fullty 검수 → 구매자 순으로 진행되며 평균 3~5영업일 내 수령 가능합니다. 검수 일정은 주문 후 마이페이지에서 실시간 확인 가능합니다.",
    answeredAt: "2026-04-06",
    answeredBy: "Fullty 운영팀",
  },
  {
    id: "q2",
    author: "정**",
    date: "2026-04-01",
    status: "답변 완료" as const,
    question: "렌탈로 먼저 사용해보고 구매 전환하는 경우, 차액 계산은 어떻게 되나요?",
    answer:
      "렌탈 시작 시점의 판매가에서 누적 렌탈료를 차감한 금액이 차액입니다. 구매 전환 버튼을 누르시면 자동으로 계산된 금액이 결제창에 표시됩니다.",
    answeredAt: "2026-04-02",
    answeredBy: "Fullty 운영팀",
  },
  {
    id: "q3",
    author: "윤**",
    date: "2026-03-28",
    status: "답변 대기" as const,
    question: "옵션이 다른 색상(Polished Aluminum)도 입고 예정이 있을까요?",
  },
];

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
        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          <p>
            {product.brand}의 대표작 {product.name}입니다. Fullty 검수팀의 자체 기준에 의해{" "}
            <strong className="text-sage-ink">{product.grade}</strong> 등급으로 평가되었습니다.
          </p>
          <ImageBox ratio="wide" label="상세 이미지 영역" />
          <p>
            사용감과 본래 디자인 의도가 잘 보존된 상태로, 일상에서 매일 사용해도 좋은 컨디션입니다.
            모든 상품은 Fullty 검수 후 노출됩니다.
          </p>

          <div className="grid grid-cols-2 gap-x-8 pt-4 border-t border-border">
            <InfoRow label="브랜드" value={product.brand} />
            <InfoRow label="모델" value={product.name} />
            <InfoRow label="옵션" value={product.option} />
            <InfoRow label="카테고리" value={product.category} />
            <InfoRow label="상태 등급" value={product.grade} />
            <InfoRow label="렌탈 공급" value={product.rentable ? "가능" : "불가"} />
          </div>
        </div>
      )}

      {active === "리뷰" && (
        <div>
          {/* Rating summary */}
          <div className="grid grid-cols-12 gap-8 mb-10">
            <div className="col-span-4 border border-border p-6 text-center">
              <div className="font-display text-6xl text-sage-ink leading-none">
                {reviewStats.average}
              </div>
              <Stars rating={Math.round(reviewStats.average)} className="justify-center mt-3" />
              <div className="text-[11px] text-muted-foreground mt-3">
                총 {reviewStats.total}개 리뷰
              </div>
            </div>

            <div className="col-span-8 space-y-2">
              {reviewStats.distribution.map((d) => {
                const pct = reviewStats.total ? (d.count / reviewStats.total) * 100 : 0;
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
            <div className="text-sm font-semibold">리뷰 ({reviewStats.total})</div>
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

      {active === "Q&A" && (
        <div>
          <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
            <div className="text-sm font-semibold">Q&A ({qna.length})</div>
            <Button size="sm">질문 작성</Button>
          </div>

          <div className="space-y-3">
            {qna.map((q) => (
              <div key={q.id} className="border border-border">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-lg text-sage-ink">Q.</span>
                      <Badge
                        variant={q.status === "답변 완료" ? "default" : "outline"}
                      >
                        {q.status}
                      </Badge>
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {q.author} · {q.date}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed">{q.question}</p>
                </div>

                {q.answer && (
                  <div className="border-t border-border bg-sage-soft/30 p-5">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="font-display text-lg text-sage-deep">A.</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="text-[11px] font-medium text-sage-deep">
                            {q.answeredBy}
                          </div>
                          <div className="text-[11px] text-muted-foreground">{q.answeredAt}</div>
                        </div>
                        <p className="text-sm leading-relaxed text-sage-ink mt-2">{q.answer}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border border-border p-4 text-[11px] text-muted-foreground leading-relaxed mt-6">
            상품 사용법, 옵션 추가 여부, 배송 등 궁금한 점을 남겨주세요. Fullty 운영팀 또는 셀러가
            24시간 내 답변드립니다. 개인정보가 포함된 내용은 1:1 문의를 이용해 주세요.
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border py-3 flex justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-sage-ink font-medium">{value}</span>
    </div>
  );
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={cn("text-sm", i <= rating ? "text-sage-ink" : "text-border")}>
          ★
        </span>
      ))}
    </div>
  );
}
