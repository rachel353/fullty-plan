"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { billingRequests, type BillingRequest, type BillingStatus } from "@/lib/billing";

const MY_USER_ID = "u001";

const STATUS_VARIANT: Record<BillingStatus, "default" | "outline" | "muted" | "sage"> = {
  "대기 중": "outline",
  "결제 완료": "sage",
  "연체": "default",
  "취소됨": "muted",
};

const PAY_METHODS = ["카드", "계좌이체", "네이버페이", "카카오페이"];

export default function MypageBillingDetailPage({ params }: { params: { id: string } }) {
  const [localRequest, setLocalRequest] = useState<BillingRequest | null>(() =>
    billingRequests.find((r) => r.id === params.id && r.userId === MY_USER_ID) ?? null
  );
  const [payMethod, setPayMethod] = useState(PAY_METHODS[0]);
  const [phase, setPhase] = useState<"idle" | "processing" | "done">("idle");

  if (!localRequest) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        청구 내역을 찾을 수 없습니다.
        <Link href="/mypage/billing" className="block mt-3 text-sage-ink underline">목록으로</Link>
      </div>
    );
  }

  const isPayable = localRequest.status === "대기 중" || localRequest.status === "연체";
  const isOverdue = localRequest.status === "연체";
  const isPaid = localRequest.status === "결제 완료";

  function handlePay() {
    setPhase("processing");
    setTimeout(() => {
      setPhase("done");
      setTimeout(() => {
        setLocalRequest((prev) =>
          prev ? { ...prev, status: "결제 완료", paidAt: new Date().toISOString().slice(0, 10) } : prev
        );
      }, 800);
    }, 1600);
  }

  if (phase === "done") {
    return (
      <div className="py-20 text-center space-y-5">
        <CheckCircle2 size={48} className="text-sage-ink mx-auto" strokeWidth={1.5} />
        <div>
          <div className="text-xl font-bold text-sage-ink">결제가 완료되었습니다</div>
          <p className="text-sm text-muted-foreground mt-2">
            {localRequest.brand} {localRequest.productName} · {localRequest.reason}{" "}
            {localRequest.amount.toLocaleString()}원이 결제되었습니다.
          </p>
        </div>
        <Link href="/mypage/billing">
          <Button variant="outline" size="sm">목록으로</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="border-b border-border pb-4">
        <Link href="/mypage/billing" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 추가 청구 목록
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">{localRequest.reason}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {localRequest.brand} {localRequest.productName}
            </p>
          </div>
          <Badge
            variant={STATUS_VARIANT[localRequest.status]}
            className={isOverdue ? "bg-red-500 text-background border-red-500" : undefined}
          >
            {localRequest.status}
          </Badge>
        </div>
      </div>

      {/* 청구 정보 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">청구 정보</div>
        <div className="border border-border divide-y divide-border text-sm">
          <Row label="청구 항목" value={localRequest.reason} />
          <Row label="청구 금액" value={`${localRequest.amount.toLocaleString()}원`} />
          <Row label="요청일" value={localRequest.requestedAt} />
          <Row label="납부 마감일" value={localRequest.dueDate} />
          {localRequest.paidAt && <Row label="결제 완료일" value={localRequest.paidAt} />}
        </div>
        {localRequest.memo && (
          <p className="text-[11px] text-muted-foreground leading-relaxed border border-border px-4 py-3">
            {localRequest.memo}
          </p>
        )}
      </section>

      {isOverdue && (
        <div className="border border-red-300 bg-red-50 px-5 py-4 text-[12px] text-red-600 leading-relaxed">
          납부 마감일이 지났습니다. 빠른 시일 내 결제를 완료해 주세요.
        </div>
      )}

      {/* 결제 */}
      {isPayable && (
        <section className="space-y-4">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">결제 수단</div>
          <div className="grid grid-cols-2 gap-2">
            {PAY_METHODS.map((m) => (
              <button
                key={m}
                onClick={() => setPayMethod(m)}
                disabled={phase !== "idle"}
                className={cn(
                  "h-10 text-xs border transition-colors",
                  payMethod === m
                    ? "border-sage-ink bg-sage-ink text-background"
                    : "border-border hover:bg-muted"
                )}
              >
                {m}
              </button>
            ))}
          </div>
          <Button className="w-full" disabled={phase !== "idle"} onClick={handlePay}>
            {phase === "idle" && `${localRequest.amount.toLocaleString()}원 결제하기`}
            {phase === "processing" && "결제 처리 중..."}
          </Button>
        </section>
      )}

      {/* 결제 완료 배너 */}
      {isPaid && (
        <div className="border border-sage-ink/20 bg-sage-soft/10 px-5 py-4 flex items-center gap-3">
          <CheckCircle2 size={16} className="text-sage-ink flex-shrink-0" strokeWidth={1.5} />
          <div className="text-sm">
            <span className="font-medium text-sage-ink">결제 완료</span>
            <span className="text-muted-foreground ml-2">{localRequest.paidAt} 결제</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between gap-4">
      <span className="text-muted-foreground text-[11px] w-24 flex-shrink-0">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
