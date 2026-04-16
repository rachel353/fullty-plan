"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ImageBox } from "@/components/ImageBox";

const methods = [
  { id: "카드", label: "신용/체크카드", desc: "국내 모든 카드" },
  { id: "계좌이체", label: "실시간 계좌이체", desc: "은행 앱 또는 공인인증서" },
  { id: "가상계좌", label: "가상계좌", desc: "계좌 발급 후 입금" },
  { id: "휴대폰", label: "휴대폰 결제", desc: "통신사 소액 결제" },
];

export default function SellPaymentPage() {
  const router = useRouter();
  const [method, setMethod] = useState("카드");
  const [phase, setPhase] = useState<"idle" | "processing" | "done">("idle");
  const amount = 45000;
  const orderId = `FUL-SELL-${Date.now()}`;

  function handlePay() {
    setPhase("processing");
    // Simulate Toss-like flow: 인증 → 승인 → 이동
    setTimeout(() => {
      setPhase("done");
      setTimeout(() => router.push("/sell/complete"), 700);
    }, 1800);
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
            <div className="font-semibold mb-1">프로토타입 안내</div>
            실제 결제가 발생하지 않는 시뮬레이션 화면입니다. 결제하기 버튼을 누르면 잠시 후
            완료 페이지로 이동합니다.
          </div>
        </div>

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
            disabled={phase !== "idle"}
          >
            {phase === "idle" && `${amount.toLocaleString()}원 결제하기`}
            {phase === "processing" && "결제 처리 중..."}
            {phase === "done" && "결제 완료"}
          </Button>
          <Link href="/sell" className="block">
            <Button size="sm" variant="ghost" className="w-full text-[11px]">
              ← 이전 단계로
            </Button>
          </Link>
        </aside>
      </div>

      {/* Processing overlay */}
      {phase !== "idle" && (
        <div className="fixed inset-0 z-50 bg-sage-ink/40 flex items-center justify-center p-4">
          <div className="bg-background border border-border w-full max-w-sm p-8 text-center">
            {phase === "processing" && (
              <>
                <Spinner />
                <div className="font-display text-2xl text-sage-ink mt-6">결제 처리 중</div>
                <div className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {method} 결제를 처리하고 있습니다.
                  <br />
                  창을 닫지 말고 잠시 기다려 주세요.
                </div>
              </>
            )}
            {phase === "done" && (
              <>
                <div className="w-12 h-12 mx-auto bg-sage-deep text-background flex items-center justify-center text-2xl font-display">
                  ✓
                </div>
                <div className="font-display text-2xl text-sage-ink mt-6">결제 완료</div>
                <div className="text-xs text-muted-foreground mt-2">
                  완료 페이지로 이동합니다...
                </div>
              </>
            )}
          </div>
        </div>
      )}
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

function Spinner() {
  return (
    <div className="w-12 h-12 mx-auto border-2 border-sage/30 border-t-sage-deep rounded-full animate-spin" />
  );
}
