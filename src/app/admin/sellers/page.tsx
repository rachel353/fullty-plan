"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const activeSellers = [
  {
    id: "sl003",
    name: "김컬렉터",
    type: "개인",
    email: "kimcollect@gmail.com",
    joinedAt: "2026-03-10",
    products: 4,
    gmv: 2840000,
    status: "활성" as const,
  },
  {
    id: "sl005",
    name: "빈티지 웍스",
    type: "사업자",
    email: "vintage@works.co.kr",
    joinedAt: "2026-01-15",
    products: 12,
    gmv: 18200000,
    status: "활성" as const,
  },
  {
    id: "sl006",
    name: "오브제랩",
    type: "사업자",
    email: "objet@lab.kr",
    joinedAt: "2026-02-08",
    products: 7,
    gmv: 6540000,
    status: "활성" as const,
  },
  {
    id: "sl007",
    name: "이태리에디션",
    type: "사업자",
    email: "italy@edition.kr",
    joinedAt: "2025-11-20",
    products: 9,
    gmv: 32100000,
    status: "활성" as const,
  },
  {
    id: "sl008",
    name: "노르딕홈",
    type: "사업자",
    email: "nordic@home.co.kr",
    joinedAt: "2026-03-25",
    products: 5,
    gmv: 4820000,
    status: "정지" as const,
  },
];

const pendingSellers = [
  { id: "sl001", name: "오브제 스튜디오", type: "사업자", applied: "2026-04-08", status: "심사 대기" as "심사 대기" | "승인" | "반려" },
  { id: "sl002", name: "노르딕홈 2호", type: "사업자", applied: "2026-04-07", status: "심사 대기" as "심사 대기" | "승인" | "반려" },
  { id: "sl004", name: "이태리에디션B", type: "사업자", applied: "2026-04-03", status: "반려" as "심사 대기" | "승인" | "반려" },
];

type Tab = "목록" | "심사";

export default function AdminSellersPage() {
  const [tab, setTab] = useState<Tab>("목록");

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">셀러 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">
          활성 셀러 목록 조회 및 신규 셀러 심사·승인
        </p>
      </div>

      {/* 탭 */}
      <div className="flex items-center gap-0 border-b border-border">
        {(["목록", "심사"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
              tab === t
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t === "목록" ? "셀러 목록" : "심사 관리"}
            {t === "심사" && (
              <span className="ml-1.5 text-[10px] bg-foreground text-background px-1.5 py-0.5">
                {pendingSellers.filter((s) => s.status === "심사 대기").length}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === "목록" && <SellerList />}
      {tab === "심사" && <SellerReview />}
    </div>
  );
}

function SellerList() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("전체");

  const filtered = activeSellers.filter((s) => {
    const matchType = typeFilter === "전체" || s.type === typeFilter;
    const matchQuery = !query || s.name.includes(query) || s.email.includes(query);
    return matchType && matchQuery;
  });

  return (
    <div className="space-y-4">
      {/* 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="전체 셀러" value={`${activeSellers.length}명`} />
        <Stat label="활성" value={`${activeSellers.filter((s) => s.status === "활성").length}명`} />
        <Stat label="누적 GMV" value="64,500,000원" />
        <Stat label="이번 달 신규" value="3명" />
      </div>

      {/* 필터 */}
      <div className="flex items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="셀러명 / 이메일 검색"
          className="h-9 px-3 text-xs border border-border bg-background w-52 outline-none focus:border-sage-ink"
        />
        {["전체", "사업자", "개인"].map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={cn(
              "px-4 h-9 text-xs font-medium border transition-colors",
              typeFilter === t
                ? "border-foreground bg-foreground text-background"
                : "border-border hover:bg-muted"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 테이블 */}
      <div className="border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted">
            <tr className="text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">셀러명</th>
              <th className="px-4 py-3">유형</th>
              <th className="px-4 py-3">이메일</th>
              <th className="px-4 py-3">가입일</th>
              <th className="px-4 py-3 text-right">상품</th>
              <th className="px-4 py-3 text-right">GMV</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{s.id}</td>
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{s.type}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-[11px]">{s.email}</td>
                <td className="px-4 py-3 text-muted-foreground">{s.joinedAt}</td>
                <td className="px-4 py-3 text-right">{s.products}개</td>
                <td className="px-4 py-3 text-right font-medium">{s.gmv.toLocaleString()}원</td>
                <td className="px-4 py-3">
                  <Badge variant={s.status === "활성" ? "default" : "muted"}>{s.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/sellers/${s.id}`}>
                    <Button size="sm" variant="ghost">상세</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type ReviewStatus = "심사 대기" | "승인" | "반려";

function SellerReview() {
  const [statuses, setStatuses] = useState<Record<string, ReviewStatus>>({});
  const [confirmTarget, setConfirmTarget] = useState<{ id: string; name: string; action: "승인" | "반려" } | null>(null);

  function handleAction(id: string, action: "승인" | "반려") {
    setStatuses((prev) => ({ ...prev, [id]: action }));
    setConfirmTarget(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {["전체", "심사 대기", "승인", "반려"].map((s, i) => (
          <button
            key={s}
            className={cn(
              "px-4 h-9 text-xs font-medium border transition-colors",
              i === 1
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
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">셀러명</th>
              <th className="px-4 py-3">유형</th>
              <th className="px-4 py-3">신청일</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {pendingSellers.map((s) => {
              const currentStatus = statuses[s.id] ?? s.status;
              const isPending = currentStatus === "심사 대기";
              return (
                <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-[11px] text-muted-foreground">{s.id}</td>
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline">{s.type}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{s.applied}</td>
                  <td className="px-4 py-3">
                    <Badge variant={currentStatus === "승인" ? "default" : currentStatus === "반려" ? "muted" : "outline"}>
                      {currentStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {isPending ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-500 border-red-200 hover:bg-red-50"
                          onClick={() => setConfirmTarget({ id: s.id, name: s.name, action: "반려" })}
                        >
                          반려
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setConfirmTarget({ id: s.id, name: s.name, action: "승인" })}
                        >
                          승인
                        </Button>
                      </div>
                    ) : (
                      <Link href={`/admin/sellers/${s.id}`}>
                        <Button size="sm" variant="ghost">상세</Button>
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 확인 모달 */}
      {confirmTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setConfirmTarget(null)} />
          <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
            <h3 className="text-base font-semibold">
              {confirmTarget.action === "승인" ? "셀러 승인" : "셀러 반려"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">{confirmTarget.name}</span>
              {confirmTarget.action === "승인"
                ? "을(를) 셀러로 승인합니다.\n승인 즉시 셀러 기능이 활성화됩니다."
                : "의 셀러 신청을 반려합니다.\n반려 사유는 상세 페이지에서 입력할 수 있습니다."}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setConfirmTarget(null)}>취소</Button>
              <Button
                className={cn("flex-1", confirmTarget.action === "반려" && "bg-red-500 hover:bg-red-600")}
                onClick={() => handleAction(confirmTarget.id, confirmTarget.action)}
              >
                {confirmTarget.action} 확정
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-4">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-lg font-bold mt-1.5">{value}</div>
    </div>
  );
}
