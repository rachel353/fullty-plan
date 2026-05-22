"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const SELLER_NAMES: Record<string, string> = {
  sl003: "김컬렉터", sl005: "빈티지 웍스", sl006: "오브제랩",
  sl007: "이태리에디션", sl008: "노르딕홈",
};

type TxStatus = "구매 확정" | "배송 중" | "정산 완료" | "취소/반품";

const MOCK_TX: Record<string, {
  id: string; buyer: string; product: string; grade: string;
  price: number; commission: number; settlement: number;
  date: string; status: TxStatus; type: "판매" | "렌탈";
}[]> = {
  sl003: [
    { id: "tx001", buyer: "김풀티", product: "Aeron Chair", grade: "S", price: 1180000, commission: 177000, settlement: 1003000, date: "2026-04-08", status: "정산 완료", type: "판매" },
    { id: "tx002", buyer: "이가구", product: "DSW Chair", grade: "A+", price: 340000, commission: 51000, settlement: 289000, date: "2026-04-03", status: "구매 확정", type: "판매" },
    { id: "tx003", buyer: "박빈티", product: "Stool 60", grade: "A", price: 420000, commission: 63000, settlement: 357000, date: "2026-03-25", status: "배송 중", type: "렌탈" },
    { id: "tx004", buyer: "최유저", product: "Haller Sideboard", grade: "S", price: 2980000, commission: 447000, settlement: 2533000, date: "2026-03-10", status: "정산 완료", type: "판매" },
  ],
  sl005: [
    { id: "tx010", buyer: "김풀티", product: "Series 7", grade: "SS", price: 680000, commission: 102000, settlement: 578000, date: "2026-04-10", status: "배송 중", type: "판매" },
    { id: "tx011", buyer: "박빈티", product: "LC2 Armchair", grade: "S", price: 2400000, commission: 360000, settlement: 2040000, date: "2026-04-05", status: "정산 완료", type: "판매" },
    { id: "tx012", buyer: "이가구", product: "Barcelona Chair", grade: "A+", price: 1850000, commission: 277500, settlement: 1572500, date: "2026-03-28", status: "취소/반품", type: "판매" },
  ],
};

const TABS = ["전체", "판매", "렌탈", "취소/반품"] as const;
type Tab = typeof TABS[number];

const badgeVariant = (status: TxStatus) => {
  if (status === "정산 완료") return "muted" as const;
  if (status === "취소/반품") return "outline" as const;
  return "default" as const;
};

export default function SellerTransactionsPage() {
  const { id } = useParams<{ id: string }>();
  const sellerName = SELLER_NAMES[id] ?? id;
  const txList = MOCK_TX[id] ?? [];
  const [tab, setTab] = useState<Tab>("전체");

  const filtered = tab === "전체" ? txList :
    tab === "취소/반품" ? txList.filter((t) => t.status === "취소/반품") :
    txList.filter((t) => t.type === tab && t.status !== "취소/반품");

  const totalGmv = filtered.filter((t) => t.status !== "취소/반품").reduce((s, t) => s + t.price, 0);
  const totalSettlement = filtered.filter((t) => t.status === "정산 완료").reduce((s, t) => s + t.settlement, 0);

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <Link href={`/admin/sellers/${id}`} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> {sellerName} 상세
        </Link>
        <h2 className="text-xl font-bold">거래 내역</h2>
        <p className="text-sm text-muted-foreground mt-1">{sellerName} · 총 {txList.length}건</p>
      </div>

      {/* 요약 */}
      <div className="grid grid-cols-3 gap-3">
        <div className="border border-border p-4">
          <div className="text-[11px] text-muted-foreground">조회 GMV</div>
          <div className="text-base font-bold mt-1.5">{totalGmv.toLocaleString()}원</div>
        </div>
        <div className="border border-border p-4">
          <div className="text-[11px] text-muted-foreground">정산 완료</div>
          <div className="text-base font-bold mt-1.5">{totalSettlement.toLocaleString()}원</div>
        </div>
        <div className="border border-border p-4">
          <div className="text-[11px] text-muted-foreground">취소/반품</div>
          <div className="text-base font-bold mt-1.5 text-amber-500">
            {txList.filter((t) => t.status === "취소/반품").length}건
          </div>
        </div>
      </div>

      {/* 탭 */}
      <div className="flex items-center gap-0 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
              tab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted">
            <tr className="text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">구매자</th>
              <th className="px-4 py-3">상품</th>
              <th className="px-4 py-3">유형</th>
              <th className="px-4 py-3 text-right">거래가</th>
              <th className="px-4 py-3 text-right">수수료 (15%)</th>
              <th className="px-4 py-3 text-right">정산액</th>
              <th className="px-4 py-3">거래일</th>
              <th className="px-4 py-3">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr><td colSpan={9} className="px-4 py-12 text-center text-[11px] text-muted-foreground">거래 내역이 없습니다.</td></tr>
            ) : filtered.map((t) => (
              <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{t.id}</td>
                <td className="px-4 py-3 font-medium">{t.buyer}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{t.product}</div>
                  <Badge variant="default" className="mt-0.5">{t.grade}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{t.type}</Badge>
                </td>
                <td className="px-4 py-3 text-right font-medium">{formatPrice(t.price)}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{t.commission.toLocaleString()}원</td>
                <td className="px-4 py-3 text-right font-semibold text-sage-ink">
                  {t.status === "취소/반품" ? "—" : `${t.settlement.toLocaleString()}원`}
                </td>
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{t.date}</td>
                <td className="px-4 py-3">
                  <Badge variant={badgeVariant(t.status)}>{t.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
