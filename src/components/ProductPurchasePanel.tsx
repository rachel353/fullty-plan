"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Product, rentalPricing } from "@/lib/mock";
import { formatPrice, cn } from "@/lib/utils";

type Mode = "buy" | "rent";

const rentalDays = [7, 14, 30, 60, 90];

const buyShipping = [
  { name: "스탠다드 배송", desc: "3~5영업일 · 일반 택배", price: "35,000원" },
  { name: "프리미엄 배송", desc: "지정일 · 2인 조립 / 설치 포함", price: "95,000원" },
  { name: "초고속 배송", desc: "당일 / 익일 · 서울·수도권 한정", price: "80,000원" },
  { name: "셀프 픽업", desc: "Fullty 성수 쇼룸 방문 수령", price: "무료" },
];

const rentShipping = [
  {
    name: "렌탈 전용 배송",
    desc: "2인 배송 + 회수 포함 · 렌탈 상품 전용",
    price: "49,000원",
  },
];

export function ProductPurchasePanel({ product }: { product: Product }) {
  const soldOut = product.status === "품절";
  const canRent = product.rentable && !soldOut;
  const [mode, setMode] = useState<Mode>(canRent ? "rent" : "buy");
  const [selectedDays, setSelectedDays] = useState(7);
  const [selectedShipping, setSelectedShipping] = useState(0);

  const shippingList = mode === "rent" ? rentShipping : buyShipping;

  // Reset shipping selection when mode changes
  function switchMode(m: Mode) {
    setMode(m);
    setSelectedShipping(0);
  }

  return (
    <div>
      {/* Mode toggle */}
      {canRent && (
        <div className="mb-6 grid grid-cols-2 gap-0 border border-border">
          <button
            onClick={() => switchMode("buy")}
            className={cn(
              "h-11 text-xs tracking-[0.14em] uppercase transition-colors",
              mode === "buy"
                ? "bg-sage-ink text-background font-semibold"
                : "bg-background text-muted-foreground hover:text-sage-ink"
            )}
          >
            구매
          </button>
          <button
            onClick={() => switchMode("rent")}
            className={cn(
              "h-11 text-xs tracking-[0.14em] uppercase transition-colors border-l border-border",
              mode === "rent"
                ? "bg-sage-ink text-background font-semibold"
                : "bg-background text-muted-foreground hover:text-sage-ink"
            )}
          >
            렌탈
          </button>
        </div>
      )}

      {/* Options */}
      <div className="py-6 border-b border-border space-y-5">
        <div>
          <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-2">
            옵션 선택
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[product.option, "옵션 B", "옵션 C"].map((opt, i) => (
              <button
                key={opt}
                className={
                  i === 0
                    ? "h-11 border border-sage-ink bg-sage-ink text-background text-xs font-medium"
                    : "h-11 border border-border text-xs hover:bg-muted"
                }
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-2">
            수량
          </div>
          <div className="inline-flex items-center border border-border h-11">
            <button className="w-11 h-full text-sm hover:bg-muted">−</button>
            <div className="w-12 text-center text-sm">1</div>
            <button className="w-11 h-full text-sm hover:bg-muted">+</button>
          </div>
        </div>

        {/* Rental period (only in rent mode) */}
        {mode === "rent" && (
          <div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-2">
              렌탈 기간
            </div>
            <div className="grid grid-cols-5 gap-2">
              {rentalDays.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDays(d)}
                  className={cn(
                    "h-16 flex flex-col items-center justify-center text-xs border transition-colors",
                    selectedDays === d
                      ? "border-sage-ink bg-sage-soft/60 text-sage-ink"
                      : "border-border hover:bg-muted"
                  )}
                >
                  <span className="font-medium">{d}일</span>
                  <span className="text-muted-foreground text-[10px] mt-0.5">
                    {rentalPricing(product.price, d).toLocaleString()}원
                  </span>
                </button>
              ))}
            </div>
            <div className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
              * 선택한 배송 시작일 기준 렌탈 시작. 최대 90일 · 연장 시 추가 최대 90일.
              <br />
              * 종료 7일 전 알림 발송 (7일 렌탈은 3일 전) → 연장 / 구매전환 / 회수 선택
            </div>
          </div>
        )}

        {/* Shipping options */}
        <div>
          <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-2">
            배송 옵션
          </div>
          <div className="space-y-2">
            {shippingList.map((opt, i) => (
              <label
                key={opt.name}
                className={cn(
                  "flex items-center gap-3 p-3 cursor-pointer border transition-colors",
                  selectedShipping === i
                    ? "border-sage-ink bg-sage-soft/40"
                    : "border-border hover:bg-muted/40"
                )}
              >
                <input
                  type="radio"
                  name="shipping"
                  checked={selectedShipping === i}
                  onChange={() => setSelectedShipping(i)}
                  className="accent-sage-ink"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{opt.name}</span>
                    {mode === "rent" && <Badge variant="sage">RENT</Badge>}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{opt.desc}</div>
                </div>
                <div className="text-sm font-medium">{opt.price}</div>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2 text-sm pt-2 border-t border-border">
          <div className="flex justify-between pt-3">
            <span className="text-muted-foreground">셀러</span>
            <span>{product.seller}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">등급</span>
            <span>{product.grade} (Fullty 검수 완료)</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      {mode === "buy" ? (
        <div className="pt-6 grid grid-cols-2 gap-2">
          <Link href="/cart" className={soldOut ? "pointer-events-none" : ""}>
            <Button variant="outline" size="lg" className="w-full" disabled={soldOut}>
              장바구니 담기
            </Button>
          </Link>
          <Link href="/checkout" className={soldOut ? "pointer-events-none" : ""}>
            <Button size="lg" className="w-full" disabled={soldOut}>
              바로 구매
            </Button>
          </Link>
        </div>
      ) : (
        <div className="pt-6 space-y-2">
          <div className="border border-border p-4 flex items-center justify-between bg-sage-soft/30">
            <div>
              <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                렌탈 {selectedDays}일 · 예상 금액
              </div>
              <div className="font-display text-2xl text-sage-ink mt-1">
                {formatPrice(rentalPricing(product.price, selectedDays))}
              </div>
            </div>
          </div>
          <Link href="/checkout" className="block">
            <Button size="lg" className="w-full">
              렌탈로 시작하기
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
