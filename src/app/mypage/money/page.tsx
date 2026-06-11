"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const PENDING = [
  {
    id: "pa001",
    reason: "구매평 작성",
    amount: 2000,
    date: "2026-04-27",
  },
  {
    id: "pa002",
    reason: "포토 구매평 추가지급",
    amount: 1000,
    date: "2026-04-27",
  },
];

type HistoryType = "적립" | "사용" | "소멸" | "프로모션";

type HistoryItem = {
  date: string;
  type: HistoryType;
  desc: string;
  amount: number;
  detail?: {
    productName?: string;
    orderId?: string;
    expiresAt?: string;
    note?: string;
  };
};

const HISTORY: HistoryItem[] = [
  { date: "2026-04-13", type: "적립", desc: "구매 적립 · Aeron Chair", amount: 12800, detail: { productName: "Aeron Chair", orderId: "o001", expiresAt: "2027-04-13" } },
  { date: "2026-04-05", type: "프로모션", desc: "신규 가입 혜택", amount: 30000, detail: { expiresAt: "2026-07-04", note: "회원가입 축하 적립금입니다." } },
  { date: "2026-03-27", type: "적립", desc: "리뷰 적립 · CH24 Wishbone", amount: 1000, detail: { productName: "CH24 Wishbone", orderId: "o003", expiresAt: "2026-06-27" } },
  { date: "2026-03-20", type: "사용", desc: "결제 사용 · Louis Ghost", amount: -18300, detail: { productName: "Louis Ghost", orderId: "o012" } },
  { date: "2026-01-02", type: "적립", desc: "포토 리뷰 추가지급 · Aeron Chair", amount: 500, detail: { productName: "Aeron Chair", orderId: "o001", expiresAt: "2026-04-02" } },
  { date: "2026-01-02", type: "적립", desc: "리뷰 적립 · Aeron Chair", amount: 500, detail: { productName: "Aeron Chair", orderId: "o001", expiresAt: "2026-04-02" } },
  { date: "2025-12-23", type: "적립", desc: "구매 적립 · CH24 Wishbone", amount: 1000, detail: { productName: "CH24 Wishbone", orderId: "o003", expiresAt: "2026-12-23" } },
  { date: "2025-12-01", type: "소멸", desc: "적립금 소멸", amount: -2400, detail: { note: "유효기간(1년)이 지난 적립금이 소멸되었습니다." } },
  { date: "2025-10-02", type: "적립", desc: "리뷰 적립 · Louis Ghost", amount: 500, detail: { productName: "Louis Ghost", orderId: "o012", expiresAt: "2026-01-02" } },
  { date: "2025-08-02", type: "적립", desc: "리뷰 적립 · CH24 Wishbone", amount: 500, detail: { productName: "CH24 Wishbone", orderId: "o003", expiresAt: "2025-11-02" } },
  { date: "2025-08-02", type: "적립", desc: "포토 리뷰 추가지급 · CH24 Wishbone", amount: 500, detail: { productName: "CH24 Wishbone", orderId: "o003", expiresAt: "2025-11-02" } },
  { date: "2025-01-02", type: "적립", desc: "리뷰 적립 · Louis Ghost", amount: 500, detail: { productName: "Louis Ghost", orderId: "o012", expiresAt: "2025-04-02" } },
  { date: "2024-12-29", type: "적립", desc: "구매 적립 · Louis Ghost", amount: 500, detail: { productName: "Louis Ghost", orderId: "o012", expiresAt: "2025-12-29" } },
  { date: "2024-11-02", type: "적립", desc: "리뷰 적립 · Louis Ghost", amount: 500, detail: { productName: "Louis Ghost", orderId: "o012", expiresAt: "2025-02-02" } },
  { date: "2024-09-15", type: "사용", desc: "결제 사용 · Aeron Chair", amount: -50000, detail: { productName: "Aeron Chair", orderId: "o001" } },
];

const FILTERS: { label: string; value: "전체" | HistoryType }[] = [
  { label: "전체", value: "전체" },
  { label: "적립", value: "적립" },
  { label: "사용", value: "사용" },
  { label: "소멸", value: "소멸" },
];

const PAGE_SIZE = 8;

export default function MyMoneyPage() {
  const [filter, setFilter] = useState<"전체" | HistoryType>("전체");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = HISTORY.filter((h) => {
    if (filter === "전체") return true;
    if (filter === "적립") return h.type === "적립" || h.type === "프로모션";
    return h.type === filter;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function selectFilter(value: "전체" | HistoryType) {
    setFilter(value);
    setPage(1);
    setExpanded(null);
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4">
        <Link
          href="/mypage/grade"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors"
        >
          <ChevronLeft size={13} /> 등급 / 쿠폰 / 풀티머니
        </Link>
        <h2 className="text-xl font-bold">풀티머니 내역</h2>
      </div>

      {/* 잔액 */}
      <Card>
        <CardContent className="py-6">
          <div className="text-[11px] text-muted-foreground tracking-widest uppercase">사용 가능 잔액</div>
          <div className="text-3xl font-bold mt-2">124,500원</div>
        </CardContent>
      </Card>

      {/* 적립 예정 (심사중) */}
      {PENDING.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>적립 예정 ({PENDING.length}건 심사중)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {PENDING.map((p) => (
              <div key={p.id} className="border border-border p-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{p.reason}</span>
                    <Badge variant="outline">심사중</Badge>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    {p.date} 신청 · 운영팀 검수 후 적립됩니다 (영업일 기준 1~2일 소요)
                  </div>
                </div>
                <div className="text-sm font-semibold flex-shrink-0">+{p.amount.toLocaleString()}원</div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 전체 내역 */}
      <div className="space-y-3">
        <div className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          전체 내역
        </div>

        {/* 필터 */}
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => selectFilter(f.value)}
              className={cn(
                "px-4 h-9 text-xs border transition-colors",
                filter === f.value
                  ? "border-sage-ink bg-sage-ink text-background"
                  : "border-border hover:bg-muted"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 목록 */}
        {paged.length === 0 ? (
          <div className="border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
            해당 내역이 없습니다.
          </div>
        ) : (
          <div className="border border-border divide-y divide-border">
            {paged.map((h, i) => {
              const idx = (page - 1) * PAGE_SIZE + i;
              const prev = paged[i - 1];
              const showYear = !prev || h.date.slice(0, 4) !== prev.date.slice(0, 4);
              const isOpen = expanded === idx;

              return (
                <div key={idx}>
                  <button
                    onClick={() => h.detail && setExpanded(isOpen ? null : idx)}
                    className={cn(
                      "w-full grid grid-cols-[64px_1fr_auto_auto] items-center gap-4 px-4 py-3 text-left transition-colors",
                      h.detail ? "hover:bg-muted/30" : "cursor-default"
                    )}
                  >
                    <div className="text-xs text-muted-foreground leading-tight">
                      {showYear && <div className="text-sm font-semibold text-foreground">{h.date.slice(0, 4)}</div>}
                      <div>{h.date.slice(5).replace("-", ".")}</div>
                    </div>
                    <div className="text-sm">{h.desc}</div>
                    <div className={cn("text-sm font-medium", h.amount > 0 ? "text-sage-deep" : "text-muted-foreground")}>
                      {h.amount > 0 ? "+" : ""}
                      {h.amount.toLocaleString()}원
                    </div>
                    <div className="w-4 text-muted-foreground">
                      {h.detail && (isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                    </div>
                  </button>

                  {isOpen && h.detail && (
                    <dl className="text-[11px] text-muted-foreground bg-muted/30 border-t border-border px-4 py-3 space-y-1.5">
                      {h.detail.productName && (
                        <div className="flex justify-between">
                          <dt>관련 상품</dt>
                          <dd className="text-foreground">{h.detail.productName}</dd>
                        </div>
                      )}
                      {h.detail.expiresAt && (
                        <div className="flex justify-between">
                          <dt>적립금 유효기간</dt>
                          <dd className="text-foreground">~ {h.detail.expiresAt}</dd>
                        </div>
                      )}
                      {h.detail.note && <div className="text-foreground">{h.detail.note}</div>}
                      {h.detail.orderId && (
                        <div className="pt-1">
                          <Link href="/mypage/orders" className="text-sage-ink hover:underline">
                            관련 주문 보기 →
                          </Link>
                        </div>
                      )}
                    </dl>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 pt-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-sage-ink disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={cn(
                  "w-8 h-8 flex items-center justify-center text-xs border transition-colors",
                  page === i + 1
                    ? "border-sage-ink bg-sage-ink text-background"
                    : "border-transparent text-muted-foreground hover:bg-muted"
                )}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-sage-ink disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* 적립금 정책 안내 */}
      <div className="border border-sage-deep/20 bg-sage-soft/10 px-5 py-4 text-[11px] text-muted-foreground leading-relaxed space-y-1">
        <p className="font-medium text-foreground">적립금 안내</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>구매확정 적립금은 구매확정 시(배송시작 후 9일째) 지급됩니다.</li>
          <li>리뷰작성 적립금은 리뷰 작성 완료 즉시 지급됩니다.</li>
          <li>적립금의 기본 유효기간은 적립 일자로부터 1년이며, 유효기간이 지난 적립금은 소멸됩니다. 소멸된 적립금은 복구되지 않습니다.</li>
          <li>이벤트 적립금의 경우, 유효기간 내에만 사용이 가능하며, 미사용 적립금은 소멸됩니다.</li>
          <li>구매금액과 상관없이 보유 적립금을 모두 사용할 수 있습니다.</li>
          <li>적립금은 남은 유효기간이 짧은 순서대로 사용됩니다.</li>
          <li>주문 취소/반품으로 인한 적립금 환불 시, 남은 유효기간이 긴 순서대로 환불됩니다.</li>
        </ul>
      </div>
    </div>
  );
}
