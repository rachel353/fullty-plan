"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { proposals } from "@/lib/mock";
import type { ProposalStatus } from "@/lib/mock";

const STATUSES = ["전체", "풀티 검수 중", "사용자 확인 대기", "사용자 수락", "거절됨"] as const;
const ITEMS_PER_PAGE = 5;

const badgeVariant = (status: ProposalStatus) => {
  if (status === "사용자 수락") return "default";
  if (status === "거절됨") return "muted";
  return "outline";
};

export default function ProposalsPage() {
  const [activeStatus, setActiveStatus] = useState<string>("전체");
  const [page, setPage] = useState(1);

  const filtered = proposals.filter(
    (p) => activeStatus === "전체" || p.status === activeStatus
  );
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">내 제안 현황</h2>
        <p className="text-sm text-muted-foreground mt-1">
          내가 GET 요청에 보낸 제안 상태를 한눈에 확인합니다.
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => { setActiveStatus(s); setPage(1); }}
            className={cn(
              "px-4 h-9 text-xs font-medium border transition-colors",
              activeStatus === s
                ? "border-foreground bg-foreground text-background"
                : "border-border hover:bg-muted"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted">
            <tr className="text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">제안 ID</th>
              <th className="px-4 py-3">대상 GET</th>
              <th className="px-4 py-3">제시 가격</th>
              <th className="px-4 py-3">발송일</th>
              <th className="px-4 py-3">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paged.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-muted/40 transition-colors cursor-pointer"
                onClick={() => window.location.href = `/seller/proposals/${p.id}`}
              >
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{p.id}</td>
                <td className="px-4 py-3 font-medium">{p.target}</td>
                <td className="px-4 py-3">{p.price.toLocaleString()}원</td>
                <td className="px-4 py-3 text-muted-foreground">{p.sentAt}</td>
                <td className="px-4 py-3">
                  <Badge variant={badgeVariant(p.status)}>{p.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{filtered.length}개 제안 · {page}/{totalPages} 페이지</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 border border-border flex items-center justify-center disabled:opacity-30 hover:bg-muted transition-colors"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={cn(
                  "w-8 h-8 border text-xs transition-colors",
                  page === n
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:bg-muted"
                )}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 border border-border flex items-center justify-center disabled:opacity-30 hover:bg-muted transition-colors"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
