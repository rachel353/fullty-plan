"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { assets } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const TABS = ["전체", "정상", "검토 필요", "판매 전환"] as const;
type Tab = typeof TABS[number];

const PAGE_SIZE = 10;

export default function AdminAssetsPage() {
  const [tab, setTab] = useState<Tab>("전체");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = assets.filter((a) => {
    const matchTab = tab === "전체" || a.status === tab;
    const matchQuery = !query || a.brand.includes(query) || a.name.includes(query) || a.owner.includes(query);
    return matchTab && matchQuery;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const reviewCount = assets.filter((a) => a.status === "검토 필요").length;
  const totalValue = assets.reduce((s, a) => s + a.currentValue, 0);

  function handleTabChange(t: Tab) {
    setTab(t);
    setPage(1);
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">자산화 상품 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">
          회원이 등록한 자산화 가구 현황 조회 및 관리
        </p>
      </div>

      {/* 요약 스탯 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Stat label="전체 자산 수" value={`${assets.length}개`} />
        <Stat label="총 자산 가치" value={`${(totalValue / 10000).toFixed(0)}만원`} />
        <Stat label="검토 필요" value={`${reviewCount}개`} accent={reviewCount > 0} />
      </div>

      {/* 탭 */}
      <div className="flex items-center gap-0 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => handleTabChange(t)}
            className={cn(
              "px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors relative",
              tab === t
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t}
            {t === "검토 필요" && reviewCount > 0 && (
              <span className="ml-1.5 text-[10px] bg-foreground text-background px-1.5 py-0.5">
                {reviewCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 검색 */}
      <div className="flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder="브랜드 / 상품명 / 회원명 검색"
          className="h-9 px-3 text-xs border border-border bg-background w-56 outline-none focus:border-sage-ink"
        />
      </div>

      {/* 테이블 */}
      <div className="space-y-3">
        <div className="border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted">
              <tr className="text-left text-xs font-medium text-muted-foreground">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">회원</th>
                <th className="px-4 py-3">상품</th>
                <th className="px-4 py-3">등급</th>
                <th className="px-4 py-3">등록일</th>
                <th className="px-4 py-3 text-right">현재 가치</th>
                <th className="px-4 py-3">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-[11px] text-muted-foreground">
                    해당 항목이 없습니다.
                  </td>
                </tr>
              ) : paged.map((a) => (
                <tr key={a.id} className="hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="px-4 py-3 text-[11px] text-muted-foreground">
                    <Link href={`/admin/assets/${a.id}`} className="block">{a.id}</Link>
                  </td>
                  <td className="px-4 py-3 font-medium">
                    <Link href={`/admin/assets/${a.id}`} className="block">{a.owner}</Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/assets/${a.id}`} className="block">
                      <div className="text-[11px] text-muted-foreground">{a.brand}</div>
                      <div className="font-medium">{a.name}</div>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/assets/${a.id}`} className="block">
                      <Badge variant="default">{a.grade}</Badge>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-[11px]">
                    <Link href={`/admin/assets/${a.id}`} className="block">{a.acquiredAt}</Link>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    <Link href={`/admin/assets/${a.id}`} className="block">
                      {a.currentValue > 0 ? formatPrice(a.currentValue) : <span className="text-muted-foreground text-[11px]">미입력</span>}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/assets/${a.id}`} className="block">
                      <Badge variant={
                        a.status === "검토 필요" ? "default" :
                        a.status === "판매 전환" ? "muted" : "outline"
                      }>
                        {a.status}
                      </Badge>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{filtered.length}개 중 {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)}개</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 h-8 border border-border hover:bg-muted disabled:opacity-40 transition-colors"
            >
              이전
            </button>
            {Array.from({ length: Math.max(totalPages, 1) }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={cn(
                  "w-8 h-8 border text-xs transition-colors",
                  n === page ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"
                )}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(Math.max(totalPages, 1), p + 1))}
              disabled={page >= totalPages}
              className="px-3 h-8 border border-border hover:bg-muted disabled:opacity-40 transition-colors"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="border border-border p-4">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className={cn("text-lg font-bold mt-1.5", accent && "text-amber-500")}>{value}</div>
    </div>
  );
}
