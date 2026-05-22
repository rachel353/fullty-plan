"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useState } from "react";

const SELLER_NAMES: Record<string, string> = {
  sl003: "김컬렉터", sl005: "빈티지 웍스", sl006: "오브제랩",
  sl007: "이태리에디션", sl008: "노르딕홈",
};

const MOCK_PRODUCTS: Record<string, {
  id: string; brand: string; name: string; option: string;
  grade: string; price: number; status: string; availability: string; registeredAt: string;
}[]> = {
  sl003: [
    { id: "sp001", brand: "Herman Miller", name: "Aeron Chair", option: "Size B / Graphite", grade: "S", price: 1180000, status: "판매중", availability: "BUY", registeredAt: "2026-04-01" },
    { id: "sp002", brand: "Vitra", name: "DSW Chair", option: "White", grade: "A+", price: 340000, status: "판매중", availability: "BUY·RENT", registeredAt: "2026-03-20" },
    { id: "sp003", brand: "USM", name: "Haller Sideboard", option: "Pure White", grade: "S", price: 2980000, status: "품절", availability: "BUY", registeredAt: "2026-02-15" },
    { id: "sp004", brand: "Artek", name: "Stool 60", option: "Birch", grade: "A", price: 420000, status: "판매중", availability: "RENT ONLY", registeredAt: "2026-01-10" },
  ],
  sl005: [
    { id: "sp010", brand: "Fritz Hansen", name: "Series 7", option: "Black / Chrome", grade: "SS", price: 680000, status: "판매중", availability: "BUY·RENT", registeredAt: "2026-04-05" },
    { id: "sp011", brand: "Cassina", name: "LC2 Armchair", option: "Black Leather", grade: "S", price: 2400000, status: "판매중", availability: "BUY", registeredAt: "2026-03-28" },
    { id: "sp012", brand: "Knoll", name: "Barcelona Chair", option: "Cream", grade: "A+", price: 1850000, status: "판매중", availability: "BUY", registeredAt: "2026-03-10" },
  ],
};

const TABS = ["전체", "판매중", "품절", "렌탈중"] as const;
type Tab = typeof TABS[number];

export default function SellerProductsPage() {
  const { id } = useParams<{ id: string }>();
  const sellerName = SELLER_NAMES[id] ?? id;
  const products = MOCK_PRODUCTS[id] ?? [];
  const [tab, setTab] = useState<Tab>("전체");

  const filtered = tab === "전체" ? products : products.filter((p) => p.status === tab || (tab === "렌탈중" && p.availability.includes("RENT")));

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <Link href={`/admin/sellers/${id}`} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> {sellerName} 상세
        </Link>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold">등록 상품</h2>
            <p className="text-sm text-muted-foreground mt-1">{sellerName} · 총 {products.length}개</p>
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
              <th className="px-4 py-3">상품</th>
              <th className="px-4 py-3">등급</th>
              <th className="px-4 py-3">유형</th>
              <th className="px-4 py-3 text-right">판매가</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3">등록일</th>
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-12 text-center text-[11px] text-muted-foreground">해당 상품이 없습니다.</td></tr>
            ) : filtered.map((p) => (
              <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{p.id}</td>
                <td className="px-4 py-3">
                  <div className="text-[11px] text-muted-foreground">{p.brand}</div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-[10px] text-muted-foreground">{p.option}</div>
                </td>
                <td className="px-4 py-3"><Badge variant="default">{p.grade}</Badge></td>
                <td className="px-4 py-3"><Badge variant="outline">{p.availability}</Badge></td>
                <td className="px-4 py-3 text-right font-medium">{formatPrice(p.price)}</td>
                <td className="px-4 py-3">
                  <Badge variant={p.status === "판매중" ? "sage" : "muted"}>{p.status}</Badge>
                </td>
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{p.registeredAt}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/products/${p.id}`}>
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
