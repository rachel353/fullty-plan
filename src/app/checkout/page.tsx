"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AddressSearch } from "@/components/ui/AddressSearch";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

type Coupon = {
  id: string;
  name: string;
  type: "percent" | "fixed";
  value: number;
  minAmount?: number;
  expires: string;
};

const availableCoupons: Coupon[] = [
  { id: "c1", name: "신규 가입 5만원 할인", type: "fixed", value: 50000, expires: "2026-06-30" },
  { id: "c2", name: "렌탈 첫 주문 10% 할인", type: "percent", value: 10, expires: "2026-05-15" },
  { id: "c3", name: "SILVER 등급 2만원 할인", type: "fixed", value: 20000, minAmount: 1000000, expires: "2026-12-31" },
];

const subtotal = 2260000;
const shipping = 35000;
const points = 0;

export default function CheckoutPage() {
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupon, setCoupon] = useState<Coupon | null>(availableCoupons[0]);
  const [useMoney, setUseMoney] = useState(0);

  const discount =
    !coupon
      ? 0
      : coupon.type === "fixed"
      ? coupon.value
      : Math.round((subtotal * coupon.value) / 100);

  const total = Math.max(subtotal + shipping - discount - useMoney, 0);

  return (
    <div className="max-w-5xl mx-auto px-12 py-16">
      <div className="border-b border-border pb-8 mb-12">
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-3">
          Checkout
        </div>
        <h1 className="font-display text-5xl text-sage-ink leading-none">주문 / 결제</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <Section title="배송지">
            <div className="space-y-3">
              <Field label="받는 사람" placeholder="홍길동" />
              <Field label="연락처" placeholder="010-0000-0000" />
              <div className="grid grid-cols-4 items-start gap-3">
                <label className="text-xs text-muted-foreground mt-3">주소</label>
                <div className="col-span-3">
                  <AddressSearch placeholder="주소 검색 버튼을 눌러 주소를 입력해 주세요" />
                </div>
              </div>
              <Field label="배송 메모" placeholder="문 앞에 놓아주세요" />
            </div>
          </Section>

          <Section title="배송 옵션">
            <div className="space-y-2">
              {[
                { label: "표준 배송 (3~5일)", price: "35,000원", checked: true },
                { label: "지정일 배송", price: "45,000원" },
                { label: "조립 / 설치 포함", price: "85,000원" },
              ].map((opt) => (
                <label
                  key={opt.label}
                  className="flex items-center justify-between border border-border p-4 cursor-pointer hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      defaultChecked={opt.checked}
                      className="accent-sage-ink"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </div>
                  <span className="text-sm font-medium">{opt.price}</span>
                </label>
              ))}
            </div>
          </Section>

          {/* Coupon & points */}
          <Section title="쿠폰 / 풀티머니">
            <div className="space-y-3">
              {/* Coupon selection */}
              <div className="border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">쿠폰</div>
                    <div className="text-sm font-medium mt-1">
                      {coupon ? coupon.name : "적용된 쿠폰 없음"}
                    </div>
                    {coupon && (
                      <div className="text-[11px] text-sage-deep mt-0.5">
                        -{discount.toLocaleString()}원 할인 적용
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setCouponOpen(true)}>
                    쿠폰 선택
                  </Button>
                </div>
              </div>

              {/* Fullty money */}
              <div className="border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-xs text-muted-foreground">Fullty 머니</div>
                    <div className="text-[11px] text-muted-foreground">
                      보유 124,500원
                    </div>
                  </div>
                  <button
                    onClick={() => setUseMoney(Math.min(124500, subtotal + shipping - discount))}
                    className="text-[11px] text-sage-deep underline underline-offset-2"
                  >
                    전액 사용
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={useMoney || ""}
                    onChange={(e) => setUseMoney(Math.min(Number(e.target.value) || 0, 124500))}
                    placeholder="0"
                    className="flex-1 h-10 px-3 text-sm border border-border bg-background text-right"
                  />
                  <div className="h-10 px-3 flex items-center text-sm text-muted-foreground">원</div>
                </div>
              </div>
            </div>
          </Section>

          <Section title="결제 수단">
            <div className="grid grid-cols-3 gap-2">
              {["신용/체크카드", "계좌이체", "네이버페이", "카카오페이", "토스페이", "Fullty머니"].map(
                (m, i) => (
                  <button
                    key={m}
                    className={
                      i === 0
                        ? "h-11 text-sm border border-sage-ink bg-sage-ink text-background"
                        : "h-11 text-sm border border-border hover:bg-muted"
                    }
                  >
                    {m}
                  </button>
                )
              )}
            </div>
          </Section>
        </div>

        <aside className="border border-border p-6 h-fit space-y-3 text-sm sticky top-32">
          <div className="text-base font-semibold pb-3 border-b border-border">최종 결제 금액</div>
          <Row label="상품 금액" value={`${subtotal.toLocaleString()}원`} />
          <Row label="배송비" value={`${shipping.toLocaleString()}원`} />
          {discount > 0 && (
            <Row
              label={`쿠폰 할인 (${coupon?.name})`}
              value={`-${discount.toLocaleString()}원`}
              highlight
            />
          )}
          {useMoney > 0 && (
            <Row label="Fullty 머니 사용" value={`-${useMoney.toLocaleString()}원`} highlight />
          )}
          <div className="flex justify-between pt-3 border-t border-border font-semibold">
            <span>총 결제 금액</span>
            <span className="font-display text-xl text-sage-ink">
              {total.toLocaleString()}원
            </span>
          </div>
          <Link href="/checkout/complete" className="block">
            <Button size="lg" className="w-full mt-2">
              결제하기
            </Button>
          </Link>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            모든 상품은 Fullty 검수 완료 후 셀러 발송 → Fullty → 구매자 순서로 진행됩니다.
          </p>
        </aside>
      </div>

      {/* Coupon selection modal */}
      <Modal open={couponOpen} onClose={() => setCouponOpen(false)} title="쿠폰 선택">
        <div className="p-6 space-y-3">
          <div className="text-xs text-muted-foreground">
            주문 상품에 적용 가능한 쿠폰 {availableCoupons.length}장
          </div>
          <div className="space-y-2">
            {availableCoupons.map((c) => {
              const isActive = coupon?.id === c.id;
              const amountOff =
                c.type === "fixed"
                  ? `${c.value.toLocaleString()}원 할인`
                  : `${c.value}% 할인`;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setCoupon(isActive ? null : c);
                    setCouponOpen(false);
                  }}
                  className={
                    isActive
                      ? "w-full text-left border border-sage-ink bg-sage-soft/40 p-4 transition-colors"
                      : "w-full text-left border border-border p-4 hover:bg-muted/40 transition-colors"
                  }
                >
                  <div className="flex items-center justify-between">
                    <Badge variant={isActive ? "default" : "outline"}>{amountOff}</Badge>
                    {isActive && <span className="text-[10px] text-sage-deep font-medium">선택됨</span>}
                  </div>
                  <div className="text-sm font-medium mt-2">{c.name}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    {c.minAmount && `${c.minAmount.toLocaleString()}원 이상 주문 시 · `}
                    ~{c.expires}
                  </div>
                </button>
              );
            })}
          </div>
          <button
            onClick={() => {
              setCoupon(null);
              setCouponOpen(false);
            }}
            className="w-full text-center py-2 text-xs text-muted-foreground hover:text-sage-ink border-t border-border pt-3 mt-2"
          >
            쿠폰 사용 안 함
          </button>
        </div>
      </Modal>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-semibold mb-4 pb-2 border-b border-border">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="grid grid-cols-4 items-center gap-3">
      <label className="text-xs text-muted-foreground">{label}</label>
      <input
        className="col-span-3 h-10 px-3 text-sm border border-border bg-background"
        placeholder={placeholder}
      />
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className={highlight ? "text-sage-deep text-xs" : "text-muted-foreground"}>
        {label}
      </span>
      <span className={highlight ? "text-sage-deep font-medium" : ""}>{value}</span>
    </div>
  );
}
