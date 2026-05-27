"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { orders } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const TABS = ["전체", "결제 완료", "배송 중", "배송 완료", "구매 확정", "취소"] as const;
type Tab = typeof TABS[number];

const STATUS_VARIANT: Record<string, "default" | "sage" | "muted" | "outline"> = {
  "결제 완료": "default",
  "배송 중": "sage",
  "배송 완료": "sage",
  "구매 확정": "muted",
  "취소": "outline",
};

const PAGE_SIZE = 10;

export default function AdminOrdersPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("전체");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = orders.filter((o) => {
    const matchTab = tab === "전체" ? true : o.status === tab;
    const matchQuery = !query ||
      o.productName.includes(query) ||
      o.brand.includes(query) ||
      o.buyer.includes(query) ||
      o.seller.includes(query);
    return matchTab && matchQuery;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleTabChange(t: Tab) {
    setTab(t);
    setPage(1);
  }

  function handleQueryChange(q: string) {
    setQuery(q);
    setPage(1);
  }

  const cancelCount = orders.filter((o) => o.status === "취소").length;
  const inDeliveryCount = orders.filter((o) => o.status === "배송 중").length;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">주문 / 배송 / 취소 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">전체 주문 현황 조회 및 배송·취소 관리</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="전체 주문" value={`${orders.length}건`} />
        <Stat label="배송 중" value={`${inDeliveryCount}건`} />
        <Stat label="취소" value={`${cancelCount}건`} accent={cancelCount > 0} />
        <Stat label="이번 달 GMV" value={formatPrice(orders.filter((o) => o.status !== "취소").reduce((s, o) => s + o.price, 0))} />
      </div>

      <div className="flex items-center gap-0 border-b border-border overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap relative",
              tab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t}
            {t === "취소" && cancelCount > 0 && (
              <span className="ml-1.5 text-[10px] bg-foreground text-background px-1.5 py-0.5">{cancelCount}</span>
            )}
          </button>
        ))}
      </div>

      <div>
        <input
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="상품명 / 브랜드 / 구매자 / 셀러 검색"
          className="h-9 px-3 text-xs border border-border bg-background w-64 outline-none focus:border-sage-ink"
        />
      </div>

      <div className="border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted">
            <tr className="text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">주문 ID</th>
              <th className="px-4 py-3">상품</th>
              <th className="px-4 py-3">유형</th>
              <th className="px-4 py-3">구매자</th>
              <th className="px-4 py-3">셀러</th>
              <th className="px-4 py-3 text-right">결제금액</th>
              <th className="px-4 py-3">운송장</th>
              <th className="px-4 py-3">주문일</th>
              <th className="px-4 py-3">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-12 text-center text-[11px] text-muted-foreground">
                  해당 주문이 없습니다.
                </td>
              </tr>
            ) : paginated.map((o) => (
              <tr
                key={o.id}
                onClick={() => router.push(`/admin/orders/${o.id}`)}
                className="hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{o.id}</td>
                <td className="px-4 py-3">
                  <div className="text-[11px] text-muted-foreground">{o.brand}</div>
                  <div className="font-medium">{o.productName}</div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{o.type}</Badge>
                </td>
                <td className="px-4 py-3 font-medium">{o.buyer}</td>
                <td className="px-4 py-3 text-muted-foreground">{o.seller}</td>
                <td className="px-4 py-3 text-right font-medium">{formatPrice(o.price)}</td>
                <td className="px-4 py-3">
                  {o.trackingNo ? (
                    <div>
                      <div className="text-[11px] text-muted-foreground">{o.trackingCarrier}</div>
                      <div className="text-[11px] font-medium">{o.trackingNo}</div>
                    </div>
                  ) : (
                    <span className="text-[11px] text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{o.date}</td>
                <td className="px-4 py-3">
                  <Badge variant={STATUS_VARIANT[o.status] ?? "outline"}>{o.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <div className="text-[11px] text-muted-foreground">
            총 {filtered.length}건 · {currentPage}/{totalPages} 페이지
          </div>
          <div className="flex items-center gap-1">
            <PageBtn onClick={() => setPage(1)} disabled={currentPage === 1} label="«" />
            <PageBtn onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} label="‹" />
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => Math.abs(p - currentPage) <= 2)
              .map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    "w-8 h-8 text-xs border transition-colors",
                    p === currentPage
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  )}
                >
                  {p}
                </button>
              ))}
            <PageBtn onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} label="›" />
            <PageBtn onClick={() => setPage(totalPages)} disabled={currentPage === totalPages} label="»" />
          </div>
        </div>
      )}
    </div>
  );
}

function PageBtn({ onClick, disabled, label }: { onClick: () => void; disabled: boolean; label: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-8 h-8 text-xs border border-border text-muted-foreground hover:border-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      {label}
    </button>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="border border-border p-4">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className={cn("text-base font-bold mt-1.5", accent && "text-amber-500")}>{value}</div>
    </div>
  );
}
