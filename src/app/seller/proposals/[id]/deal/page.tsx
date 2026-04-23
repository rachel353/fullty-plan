"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { proposals } from "@/lib/mock";
import { useSellerType } from "@/lib/seller-context";

const CARRIERS = ["CJ대한통운", "롯데택배", "한진택배", "우체국택배", "로젠택배"];

export default function ProposalDealPage() {
  const { id } = useParams<{ id: string }>();
  const { sellerType } = useSellerType();
  const isBusiness = sellerType === "사업자";
  const proposal = proposals.find((p) => p.id === id);

  const [step, setStep] = useState<"shipping" | "done">("shipping");
  const [carrier, setCarrier] = useState("");
  const [trackingNo, setTrackingNo] = useState("");

  if (!proposal) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        제안을 찾을 수 없습니다.
        <Link href="/seller/proposals" className="block mt-3 text-sage-ink underline">돌아가기</Link>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="py-20 flex flex-col items-center gap-4 text-center">
        <div className="w-14 h-14 border-2 border-sage-deep flex items-center justify-center">
          <Check size={24} className="text-sage-deep" />
        </div>
        <div className="text-lg font-semibold">운송장이 등록되었습니다</div>
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          {isBusiness
            ? "구매자에게 배송 정보가 전달되었습니다.\n배송 완료 후 정산이 진행됩니다."
            : "발송 정보가 등록되었습니다.\n풀티 물류센터 도착 후 검수가 진행됩니다."}
        </p>
        <div className="border border-border px-6 py-4 text-sm mt-2 space-y-1.5 text-left min-w-[260px]">
          <div className="flex justify-between gap-8">
            <span className="text-muted-foreground">택배사</span>
            <span className="font-medium">{carrier}</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="text-muted-foreground">운송장 번호</span>
            <span className="font-medium">{trackingNo}</span>
          </div>
          {isBusiness && (
            <div className="flex justify-between gap-8">
              <span className="text-muted-foreground">정산 예정액</span>
              <span className="font-semibold text-sage-deep">{(proposal.price * 0.85).toLocaleString()}원</span>
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          <Link href="/seller/proposals"><Button variant="outline">제안 현황</Button></Link>
          {isBusiness
            ? <Link href="/seller/settlements"><Button>정산 내역 확인</Button></Link>
            : <Link href="/seller/proposals"><Button>확인</Button></Link>
          }
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="border-b border-border pb-4">
        <Link
          href={`/seller/proposals/${id}`}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors"
        >
          <ChevronLeft size={13} /> 제안 상세
        </Link>
        <h2 className="text-xl font-bold">{isBusiness ? "직접 배송 · 운송장 등록" : "거래 진행"}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {isBusiness
            ? "구매자에게 직접 발송 후 운송장 번호를 등록하세요."
            : "상품을 풀티 물류센터로 발송하고 운송 정보를 등록하세요."}
        </p>
      </div>

      {/* 진행 단계 */}
      <div className="flex items-center">
        {(isBusiness
          ? ["거래 확정", "운송장 등록", "배송 완료 · 정산"]
          : ["거래 확정", "발송 정보 입력", "검수 · 배송 · 정산"]
        ).map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn(
                "w-6 h-6 border-2 flex items-center justify-center text-[10px]",
                i === 0 ? "border-sage-deep bg-sage-deep text-background" :
                i === 1 ? "border-sage-deep text-sage-deep font-semibold" :
                "border-border text-muted-foreground opacity-40"
              )}>
                {i === 0 ? "✓" : i + 1}
              </div>
              <span className={cn(
                "text-[10px] whitespace-nowrap",
                i === 1 ? "text-sage-deep font-semibold" : "text-muted-foreground opacity-60"
              )}>{label}</span>
            </div>
            {i < 2 && <div className={cn("flex-1 h-px mb-5 mx-1", i === 0 ? "bg-sage-deep" : "bg-border")} />}
          </div>
        ))}
      </div>

      {/* 발송 대상 안내 */}
      <div className="border border-border bg-muted/10 px-4 py-3 text-[11px] leading-relaxed space-y-1">
        <div className="font-medium text-foreground text-xs mb-1">
          {isBusiness ? "구매자 배송지" : "풀티 물류센터 발송 안내"}
        </div>
        {isBusiness ? (
          <>
            <div className="text-muted-foreground">수령인: 홍길동 · 010-1234-5678</div>
            <div className="text-muted-foreground">주소: 서울특별시 강남구 테헤란로 456, 101호</div>
            <div className="pt-1 text-amber-600">※ 구매자가 결제를 완료한 후 발송하세요.</div>
          </>
        ) : (
          <>
            <div className="text-muted-foreground">주소: 서울특별시 강남구 테헤란로 123, 풀티 물류센터</div>
            <div className="text-muted-foreground">수령인: 풀티 입고팀 · 02-1234-5678</div>
            <div className="pt-1 text-amber-600">※ 운송장에 반드시 제안 ID ({proposal.id})를 기재해주세요.</div>
          </>
        )}
      </div>

      {/* 택배사 선택 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">택배사 선택</div>
        <div className="flex flex-wrap gap-2">
          {CARRIERS.map((c) => (
            <button
              key={c}
              onClick={() => setCarrier(c)}
              className={cn(
                "px-4 h-9 border text-xs transition-colors",
                carrier === c ? "border-sage-ink bg-sage-ink text-background" : "border-border hover:bg-muted"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* 운송장 번호 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">운송장 번호</div>
        <input
          value={trackingNo}
          onChange={(e) => setTrackingNo(e.target.value.replace(/[^0-9-]/g, ""))}
          placeholder="숫자만 입력"
          className="w-full border border-border h-11 px-4 text-sm bg-transparent focus:border-sage-ink outline-none transition-colors"
        />
      </section>

      {/* 정산 예정 (사업자만) */}
      {isBusiness && (
        <div className="border border-border divide-y divide-border text-sm">
          <div className="flex justify-between px-4 py-3">
            <span className="text-muted-foreground">제안 가격</span>
            <span>{proposal.price.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between px-4 py-3">
            <span className="text-muted-foreground">풀티 수수료 (15%)</span>
            <span className="text-muted-foreground">−{(proposal.price * 0.15).toLocaleString()}원</span>
          </div>
          <div className="flex justify-between px-4 py-4 font-bold">
            <span>정산 예정액</span>
            <span className="text-sage-deep">{(proposal.price * 0.85).toLocaleString()}원</span>
          </div>
        </div>
      )}

      <div className="border-t border-border pt-6 flex justify-end gap-2">
        <Link href={`/seller/proposals/${id}`}><Button variant="outline">취소</Button></Link>
        <Button disabled={!carrier || !trackingNo} onClick={() => setStep("done")}>
          운송장 등록 완료
        </Button>
      </div>
    </div>
  );
}
