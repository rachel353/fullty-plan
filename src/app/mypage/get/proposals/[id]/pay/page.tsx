"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { proposals, getRequests } from "@/lib/mock";

const PAYMENT_METHODS = ["신용카드", "카카오페이", "토스페이", "무통장 입금"] as const;
type PayMethod = typeof PAYMENT_METHODS[number];

export default function GetProposalPayPage() {
  const { id } = useParams<{ id: string }>();
  const proposal = proposals.find((p) => p.id === id);
  const req = proposal ? getRequests.find((r) => r.id === proposal.getRequestId) : null;

  const [method, setMethod] = useState<PayMethod>("신용카드");
  const [agreed, setAgreed] = useState(false);
  const [paid, setPaid] = useState(false);

  if (!proposal || !req) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        제안을 찾을 수 없습니다.
        <Link href="/mypage/get" className="block mt-3 text-sage-ink underline">돌아가기</Link>
      </div>
    );
  }

  const shipping: number = 0;
  const total = proposal.price + shipping;

  if (paid) {
    return (
      <div className="py-20 flex flex-col items-center gap-4 text-center">
        <div className="w-14 h-14 border-2 border-sage-deep flex items-center justify-center">
          <Check size={24} className="text-sage-deep" />
        </div>
        <div className="text-lg font-semibold">결제가 완료되었습니다</div>
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          셀러에게 거래 확정 알림이 전송되었습니다.<br />
          배송 준비 후 운송장 번호를 알려드립니다.
        </p>
        <div className="border border-border px-6 py-4 text-sm mt-2 space-y-1.5 text-left min-w-[240px]">
          <div className="flex justify-between">
            <span className="text-muted-foreground">결제 금액</span>
            <span className="font-semibold">{total.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">결제 수단</span>
            <span>{method}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <Link href="/mypage/get"><Button variant="outline">GET 내역</Button></Link>
          <Link href="/mypage/orders"><Button>주문 내역 확인</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4">
        <Link
          href={`/mypage/get/proposals/${id}`}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors"
        >
          <ChevronLeft size={13} /> 제안 상세
        </Link>
        <h2 className="text-xl font-bold">결제</h2>
      </div>

      {/* 주문 상품 */}
      <section>
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">주문 상품</div>
        <div className="border border-border p-4 flex items-start justify-between">
          <div>
            <div className="text-[11px] text-muted-foreground">{proposal.productBrand}</div>
            <div className="font-semibold">{proposal.productName}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">사용 기간 {proposal.usagePeriod} · 등급 {proposal.productGrade}</div>
          </div>
          <div className="text-right">
            <div className="text-base font-bold">{proposal.price.toLocaleString()}원</div>
          </div>
        </div>
      </section>

      {/* 배송지 */}
      <section>
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">배송지</div>
        <div className="border border-border p-4 space-y-1 text-sm">
          <div className="font-medium">홍길동</div>
          <div className="text-muted-foreground">서울특별시 강남구 테헤란로 123, 456호</div>
          <div className="text-muted-foreground">010-1234-5678</div>
          <button className="text-[11px] text-sage-ink underline underline-offset-2 mt-1">배송지 변경</button>
        </div>
      </section>

      {/* 결제 수단 */}
      <section>
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">결제 수단</div>
        <div className="grid grid-cols-2 gap-2">
          {PAYMENT_METHODS.map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={cn(
                "h-11 border text-sm transition-colors",
                method === m
                  ? "border-sage-ink bg-sage-soft/20 text-sage-ink font-medium"
                  : "border-border hover:bg-muted"
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </section>

      {/* 결제 금액 */}
      <section>
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">결제 금액</div>
        <div className="border border-border divide-y divide-border text-sm">
          <div className="flex justify-between px-4 py-3">
            <span className="text-muted-foreground">상품 금액</span>
            <span>{proposal.price.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-muted-foreground">배송비</span>
            <span>{shipping === 0 ? "무료" : `${shipping.toLocaleString()}원`}</span>
          </div>
          <div className="flex justify-between px-4 py-4 font-bold">
            <span>최종 결제 금액</span>
            <span className="text-sage-deep text-base">{total.toLocaleString()}원</span>
          </div>
        </div>
      </section>

      {/* 동의 */}
      <label className="flex items-start gap-3 cursor-pointer">
        <div
          onClick={() => setAgreed(!agreed)}
          className={cn(
            "w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
            agreed ? "border-sage-ink bg-sage-ink" : "border-border"
          )}
        >
          {agreed && <Check size={11} className="text-background" />}
        </div>
        <span className="text-[11px] text-muted-foreground leading-relaxed">
          주문 내용을 확인하였으며, 구매 조건 및 개인정보 처리방침에 동의합니다.
        </span>
      </label>

      {/* 결제 버튼 */}
      <div className="border-t border-border pt-6">
        <Button
          className="w-full h-12 text-base"
          disabled={!agreed}
          onClick={() => setPaid(true)}
        >
          {total.toLocaleString()}원 결제하기
        </Button>
      </div>
    </div>
  );
}
