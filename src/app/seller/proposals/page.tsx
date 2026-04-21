"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type Status = "풀티 검수 중" | "사용자 확인 대기" | "사용자 수락" | "거절됨";

const PROPOSALS: { id: string; target: string; price: number; status: Status; sentAt: string }[] = [
  { id: "pp001", target: "Herman Miller Aeron Remastered", price: 1380000, status: "풀티 검수 중", sentAt: "2026-04-08" },
  { id: "pp002", target: "Vitra Panton Chair", price: 360000, status: "사용자 확인 대기", sentAt: "2026-04-06" },
  { id: "pp003", target: "Artek Stool 60", price: 420000, status: "사용자 수락", sentAt: "2026-04-04" },
  { id: "pp004", target: "USM Haller Trolley", price: 980000, status: "거절됨", sentAt: "2026-03-29" },
  { id: "pp005", target: "Fritz Hansen Series 7", price: 620000, status: "사용자 수락", sentAt: "2026-03-25" },
  { id: "pp006", target: "Knoll Womb Chair", price: 2100000, status: "사용자 확인 대기", sentAt: "2026-03-21" },
  { id: "pp007", target: "Cassina LC2 Sofa", price: 3400000, status: "거절됨", sentAt: "2026-03-18" },
  { id: "pp008", target: "Muuto E27 Lamp", price: 180000, status: "사용자 수락", sentAt: "2026-03-15" },
  { id: "pp009", target: "HAY About A Chair", price: 290000, status: "풀티 검수 중", sentAt: "2026-03-10" },
  { id: "pp010", target: "Kartell Louis Ghost", price: 240000, status: "사용자 확인 대기", sentAt: "2026-03-07" },
  { id: "pp011", target: "Vitra Eames DSW", price: 580000, status: "사용자 수락", sentAt: "2026-03-03" },
  { id: "pp012", target: "Artek 81C Side Table", price: 320000, status: "거절됨", sentAt: "2026-02-28" },
];

const STATUSES = ["전체", "풀티 검수 중", "사용자 확인 대기", "사용자 수락", "거절됨"] as const;
const ITEMS_PER_PAGE = 5;

const badgeVariant = (status: Status) => {
  if (status === "사용자 수락") return "default";
  if (status === "거절됨") return "muted";
  return "outline";
};

export default function ProposalsPage() {
  const [activeStatus, setActiveStatus] = useState<string>("전체");
  const [page, setPage] = useState(1);

  const filtered = PROPOSALS.filter(
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

      <div className="flex items-center gap-2">
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
              <tr key={p.id}>
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
