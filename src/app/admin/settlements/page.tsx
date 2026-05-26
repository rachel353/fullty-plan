"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const rows = [
  { id: "ad001", seller: "빈티지 웍스", type: "판매", amount: 1088000, period: "2026-03", status: "정산 완료" as const },
  { id: "ad002", seller: "오브제 스튜디오", type: "렌탈", amount: 722500, period: "2026-03", status: "정산 예정" as const },
  { id: "ad003", seller: "노르딕홈", type: "위탁", amount: 304000, period: "2026-04", status: "정산 예정" as const },
  { id: "ad004", seller: "이태리에디션", type: "판매", amount: 4590000, period: "2026-04", status: "정산 예정" as const },
  { id: "ad005", seller: "김컬렉터", type: "판매", amount: 1003000, period: "2026-04", status: "정산 완료" as const },
  { id: "ad006", seller: "김컬렉터", type: "판매", amount: 2533000, period: "2026-03", status: "정산 완료" as const },
  { id: "ad007", seller: "빈티지 웍스", type: "판매", amount: 2040000, period: "2026-04", status: "정산 완료" as const },
];

export default function AdminSettlementsPage() {
  return (
    <Suspense>
      <AdminSettlementsContent />
    </Suspense>
  );
}

function AdminSettlementsContent() {
  const searchParams = useSearchParams();
  const [sellerFilter, setSellerFilter] = useState(searchParams.get("seller") ?? "");

  const filtered = sellerFilter
    ? rows.filter((r) => r.seller.includes(sellerFilter))
    : rows;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">정산 관리</h2>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          <strong>매입:</strong> 기준일 기준 3일 소요. 100만원 이상일 경우 7:3 분할 정산 (3일 후 70% / 15일 후 30%)
          <br />
          <strong>셀러:</strong> 월 1회 월말 일괄 정산
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Stat label="이번 달 정산 예정" value="184건 / 28,400,000원" />
        <Stat label="지난 달 지급 완료" value="201건 / 31,250,000원" />
        <Stat label="누적 GMV" value="1,820,000,000원" />
        <Stat label="평균 수수료율" value="15.2%" />
      </div>

      {/* 셀러 필터 */}
      <div className="flex items-center gap-2">
        <input
          value={sellerFilter}
          onChange={(e) => setSellerFilter(e.target.value)}
          placeholder="셀러명으로 필터"
          className="h-9 px-3 text-xs border border-border bg-background w-44 outline-none focus:border-sage-ink"
        />
        {sellerFilter && (
          <button onClick={() => setSellerFilter("")} className="text-muted-foreground hover:text-foreground">
            <X size={14} />
          </button>
        )}
        {sellerFilter && (
          <span className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{sellerFilter}</span> · {filtered.length}건
          </span>
        )}
      </div>

      <div className="border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted">
            <tr className="text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">정산 ID</th>
              <th className="px-4 py-3">셀러</th>
              <th className="px-4 py-3">유형</th>
              <th className="px-4 py-3">실 정산액</th>
              <th className="px-4 py-3">기간</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-[11px] text-muted-foreground">
                  해당 셀러의 정산 내역이 없습니다.
                </td>
              </tr>
            ) : filtered.map((r) => (
              <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{r.id}</td>
                <td className="px-4 py-3 font-medium">{r.seller}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{r.type}</Badge>
                </td>
                <td className="px-4 py-3 font-semibold">{r.amount.toLocaleString()}원</td>
                <td className="px-4 py-3 text-muted-foreground">{r.period}</td>
                <td className="px-4 py-3">
                  <Badge variant={r.status === "정산 완료" ? "default" : "outline"}>{r.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/settlements/${r.id}`}>
                    <Button size="sm" variant={r.status === "정산 예정" ? "default" : "ghost"}>
                      {r.status === "정산 예정" ? "정산 처리" : "상세"}
                    </Button>
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-5">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-base font-bold mt-2">{value}</div>
    </div>
  );
}
