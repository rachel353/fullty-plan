"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ImageBox } from "@/components/ImageBox";

declare global {
  interface Window {
    TossPayments?: (clientKey: string) => {
      requestPayment: (method: string, options: TossRequestOptions) => Promise<void>;
    };
  }
}

interface TossRequestOptions {
  amount: number;
  orderId: string;
  orderName: string;
  customerName?: string;
  customerEmail?: string;
  successUrl: string;
  failUrl: string;
}

// Toss Payments 공식 테스트용 client key (docs 샘플)
const CLIENT_KEY = "test_ck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const SCRIPT_SRC = "https://js.tosspayments.com/v1/payment";

function loadTossScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.TossPayments) {
      resolve();
      return;
    }
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Toss SDK load failed"));
    document.head.appendChild(script);
  });
}

const methods = [
  { id: "카드", label: "신용/체크카드", desc: "국내 모든 카드" },
  { id: "계좌이체", label: "실시간 계좌이체", desc: "은행 앱 또는 공인인증서" },
  { id: "가상계좌", label: "가상계좌", desc: "계좌 발급 후 입금" },
  { id: "휴대폰", label: "휴대폰 결제", desc: "통신사 소액 결제" },
];

export default function SellPaymentPage() {
  const [method, setMethod] = useState("카드");
  const [loading, setLoading] = useState(false);
  const amount = 45000;
  const orderId = `FUL-SELL-${Date.now()}`;

  async function handlePay() {
    setLoading(true);
    try {
      await loadTossScript();
      if (!window.TossPayments) throw new Error("SDK not loaded");
      const toss = window.TossPayments(CLIENT_KEY);
      await toss.requestPayment(method, {
        amount,
        orderId,
        orderName: "SELL 픽업 배송비",
        customerName: "김풀티",
        customerEmail: "kimfullty@gmail.com",
        successUrl: window.location.origin + "/sell/complete",
        failUrl: window.location.origin + "/sell/payment",
      });
    } catch (err) {
      // 사용자가 결제창을 닫거나 오류
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-12 py-16">
      <div className="border-b border-border pb-8 mb-10">
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-3">
          Payment — SELL 픽업 배송비
        </div>
        <h1 className="font-display text-5xl text-sage-ink leading-none">결제하기</h1>
        <p className="text-sm text-muted-foreground mt-4">
          픽업 배송비 결제가 완료되면 Fullty가 일정을 조율해 드립니다.
        </p>
      </div>

      {/* Order summary */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-8">
          <section>
            <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
              Order Item
            </div>
            <div className="border border-border p-5 flex gap-4">
              <ImageBox className="w-20 h-20 flex-shrink-0" ratio="square" />
              <div className="flex-1">
                <Badge variant="outline">SELL 신청</Badge>
                <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-2">
                  신청 ID · {orderId}
                </div>
                <div className="text-sm font-medium mt-1">SELL 픽업 배송비</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  크기 70 × 65 × 110cm · 서울 마포구
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
              Payment Method
            </div>
            <div className="space-y-2">
              {methods.map((m) => (
                <label
                  key={m.id}
                  className={
                    method === m.id
                      ? "flex items-center gap-3 border border-sage-ink bg-sage-soft/40 p-4 cursor-pointer"
                      : "flex items-center gap-3 border border-border p-4 cursor-pointer hover:bg-muted/40"
                  }
                >
                  <input
                    type="radio"
                    name="method"
                    checked={method === m.id}
                    onChange={() => setMethod(m.id)}
                    className="accent-sage-ink"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-sage-ink">{m.label}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{m.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </section>

          <div className="border border-sage/40 bg-sage-soft/30 p-4 text-[11px] text-sage-ink leading-relaxed">
            <div className="font-semibold mb-1">Toss Payments 테스트 결제</div>
            이 프로토타입은 Toss Payments 테스트 환경을 사용합니다. 실제 결제는 발생하지 않으며
            결제창에서 "테스트 결제하기"를 누르면 완료 페이지로 이동합니다.
          </div>
        </div>

        {/* Summary sidebar */}
        <aside className="border border-border p-6 h-fit space-y-3 text-sm">
          <div className="text-base font-semibold pb-3 border-b border-border">최종 결제 금액</div>
          <Row label="픽업 배송비" value={`${amount.toLocaleString()}원`} />
          <Row label="추가 작업비" value="추후 청구" />
          <div className="flex justify-between pt-3 border-t border-border font-semibold">
            <span>총 결제 금액</span>
            <span className="font-display text-xl text-sage-ink">
              {amount.toLocaleString()}원
            </span>
          </div>
          <Button
            size="lg"
            className="w-full mt-2"
            onClick={handlePay}
            disabled={loading}
          >
            {loading ? "결제창 여는 중..." : `${amount.toLocaleString()}원 결제하기`}
          </Button>
          <Link href="/sell" className="block">
            <Button size="sm" variant="ghost" className="w-full text-[11px]">
              ← 이전 단계로
            </Button>
          </Link>
          <p className="text-[10px] text-muted-foreground leading-relaxed pt-2 border-t border-border">
            테스트 카드번호: 4330-1234-1234-1234 / 아무 CVV·유효기간 입력 가능
          </p>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
