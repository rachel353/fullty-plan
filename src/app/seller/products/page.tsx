"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { products } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";
import { useSellerType } from "@/lib/seller-context";

export default function SellerProductsPage() {
  const { sellerType } = useSellerType();
  const isBusiness = sellerType === "사업자";

  const statuses = isBusiness
    ? ["전체", "판매중", "렌탈중", "품절"]
    : ["전체", "판매중", "검수중", "렌탈중", "품절"];

  const [activeStatus, setActiveStatus] = useState("전체");

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold">상품 관리</h2>
          {isBusiness ? (
            <p className="text-sm text-muted-foreground mt-1">직접 등록 · 즉시 노출</p>
          ) : (
            <p className="text-sm text-muted-foreground mt-1">검수 완료 후 노출되는 상품 목록</p>
          )}
        </div>
        <Link href="/seller/products/new">
          <Button>+ 상품 등록</Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setActiveStatus(s)}
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
              <th className="px-4 py-3">상품</th>
              <th className="px-4 py-3">등급</th>
              <th className="px-4 py-3">판매가</th>
              <th className="px-4 py-3">수수료</th>
              <th className="px-4 py-3">렌탈</th>
              <th className="px-4 py-3">상태</th>
              {isBusiness && <th className="px-4 py-3">배송</th>}
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => {
              const status = isBusiness && p.status === "검수중" ? "판매중" : p.status;
              if (activeStatus !== "전체" && status !== activeStatus) return null;
              return (
                <tr key={p.id}>
                  <td className="px-4 py-3">
                    <div className="text-[11px] text-muted-foreground">{p.brand}</div>
                    <div className="font-medium">{p.name}</div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="default">{p.grade}</Badge>
                  </td>
                  <td className="px-4 py-3">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3 text-muted-foreground">15%</td>
                  <td className="px-4 py-3">
                    {p.availability === "both" ? (
                      <Badge variant="outline">BUY·RENT</Badge>
                    ) : p.availability === "rent" ? (
                      <Badge variant="sage">RENT ONLY</Badge>
                    ) : (
                      <span className="text-muted-foreground">BUY</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={status === "판매중" ? "default" : "muted"}>{status}</Badge>
                  </td>
                  {isBusiness && (
                    <td className="px-4 py-3">
                      <span className="text-[11px] text-muted-foreground">직배송</span>
                    </td>
                  )}
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="ghost">수정</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 개인 셀러: 검수 현황 패널 */}
      {!isBusiness && (
        <div className="border border-border p-5 space-y-3">
          <div className="text-xs font-semibold tracking-widest text-muted-foreground">
            검수 진행 현황
          </div>
          {[
            { name: "Vitra Eames DSR", status: "검수 대기", date: "2026.04.20 접수" },
            { name: "Cassina LC2 Sofa", status: "검수 중", date: "2026.04.18 수령" },
          ].map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{item.date}</div>
              </div>
              <Badge variant={item.status === "검수 중" ? "default" : "muted"}>{item.status}</Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
