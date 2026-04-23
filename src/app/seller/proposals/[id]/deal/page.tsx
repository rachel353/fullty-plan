"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { proposals } from "@/lib/mock";
import { useSellerType } from "@/lib/seller-context";

const CARRIERS = ["CJ대한통운", "롯데택배", "한진택배", "우체국택배", "로젠택배"];

const INDIVIDUAL_STEPS = ["운송장 등록", "풀티 물류센터", "구매자 배송", "거래 완료"];

function initialPhase(proposal: NonNullable<ReturnType<typeof proposals.find>>): number {
  if (proposal.fullttiTracking?.status === "배송 완료") return 3;
  if (proposal.fullttiTracking) return 2;
  if (proposal.sellerTracking) return 1;
  return 0;
}

export default function ProposalDealPage() {
  const { id } = useParams<{ id: string }>();
  const { sellerType } = useSellerType();
  const isBusiness = sellerType === "사업자";
  const proposal = proposals.find((p) => p.id === id);

  const [carrier, setCarrier] = useState("");
  const [trackingNo, setTrackingNo] = useState("");
  const [registered, setRegistered] = useState(false);
  const [phase, setPhase] = useState(() => (proposal ? initialPhase(proposal) : 0));

  if (!proposal) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        제안을 찾을 수 없습니다.
        <Link href="/seller/proposals" className="block mt-3 text-sage-ink underline">돌아가기</Link>
      </div>
    );
  }

  /* ── 사업자: 구매자 직접 배송 ──────────────────────────────────── */
  if (isBusiness && !proposal.fullttiTracking) {
    if (registered) {
      return (
        <div className="py-20 flex flex-col items-center gap-4 text-center">
          <div className="w-14 h-14 border-2 border-sage-deep flex items-center justify-center">
            <Check size={24} className="text-sage-deep" />
          </div>
          <div className="text-lg font-semibold">운송장이 등록되었습니다</div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            구매자에게 배송 정보가 전달되었습니다.<br />배송 완료 후 정산이 진행됩니다.
          </p>
          <div className="border border-border px-6 py-4 text-sm mt-2 space-y-1.5 text-left min-w-[260px]">
            <div className="flex justify-between gap-8"><span className="text-muted-foreground">택배사</span><span className="font-medium">{carrier}</span></div>
            <div className="flex justify-between gap-8"><span className="text-muted-foreground">운송장 번호</span><span className="font-medium">{trackingNo}</span></div>
            <div className="flex justify-between gap-8"><span className="text-muted-foreground">정산 예정액</span><span className="font-semibold text-sage-deep">{(proposal.price * 0.85).toLocaleString()}원</span></div>
          </div>
          <div className="flex gap-2 mt-2">
            <Link href="/seller/proposals"><Button variant="outline">제안 현황</Button></Link>
            <Link href="/seller/settlements"><Button>정산 내역 확인</Button></Link>
          </div>
        </div>
      );
    }
    return <ShippingForm isBusiness proposal={proposal} carrier={carrier} setCarrier={setCarrier} trackingNo={trackingNo} setTrackingNo={setTrackingNo} onSubmit={() => setRegistered(true)} />;
  }

  /* ── 개인 셀러: 풀티 물류센터 경유 → 구매자 배송 ─────────────── */

  // phase 0: 운송장 입력 폼
  if (phase === 0) {
    return <ShippingForm
      isBusiness={false}
      proposal={proposal}
      carrier={carrier}
      setCarrier={setCarrier}
      trackingNo={trackingNo}
      setTrackingNo={setTrackingNo}
      onSubmit={() => { setRegistered(true); setPhase(1); }}
    />;
  }

  const tc = registered ? { carrier, trackingNo } : proposal.sellerTracking;
  const demoFt = {
    carrier: proposal.fullttiTracking?.carrier ?? "CJ대한통운",
    trackingNo: proposal.fullttiTracking?.trackingNo ?? "3344556677889",
  };

  // phase 3: 거래 완료
  if (phase === 3) {
    return (
      <div className="space-y-8 max-w-2xl">
        <PageHeader id={id} title="거래 진행" />
        <StepBar steps={INDIVIDUAL_STEPS} current={4} />

        <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-4 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-sage-deep flex items-center justify-center flex-shrink-0">
              <Check size={11} className="text-background" />
            </div>
            <span className="text-sm font-semibold">거래가 완료되었습니다</span>
          </div>
          <p className="text-[11px] text-muted-foreground pl-7">구매자 배송이 완료되어 정산이 진행됩니다.</p>
        </div>

        <section>
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">풀티 → 구매자 배송 현황</div>
          <div className="border border-border p-4 space-y-3">
            <DeliverySteps status="배송 완료" />
            <div className="border-t border-border pt-3 grid grid-cols-2 gap-2 text-sm">
              <div><div className="text-[10px] text-muted-foreground mb-0.5">택배사</div><div className="font-medium">{demoFt.carrier}</div></div>
              <div><div className="text-[10px] text-muted-foreground mb-0.5">운송장 번호</div><div className="font-medium">{demoFt.trackingNo}</div></div>
            </div>
          </div>
        </section>

        <div className="border border-border divide-y divide-border text-sm">
          <div className="flex justify-between px-4 py-3"><span className="text-muted-foreground">제안 가격</span><span>{proposal.price.toLocaleString()}원</span></div>
          <div className="flex justify-between px-4 py-3"><span className="text-muted-foreground">풀티 수수료 (15%)</span><span className="text-muted-foreground">−{(proposal.price * 0.15).toLocaleString()}원</span></div>
          <div className="flex justify-between px-4 py-4 font-bold"><span>정산 예정액</span><span className="text-sage-deep">{(proposal.price * 0.85).toLocaleString()}원</span></div>
        </div>

        <div className="border-t border-border pt-6 flex justify-end gap-2">
          <Link href="/seller/settlements"><Button>정산 내역 확인</Button></Link>
        </div>
      </div>
    );
  }

  // phase 2: 구매자 배송 중
  if (phase === 2) {
    return (
      <div className="space-y-8 max-w-2xl">
        <PageHeader id={id} title="거래 진행" />
        <StepBar steps={INDIVIDUAL_STEPS} current={2} />

        <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-4 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-sage-deep flex items-center justify-center flex-shrink-0">
              <Check size={11} className="text-background" />
            </div>
            <span className="text-sm font-semibold">풀티가 구매자에게 발송했습니다</span>
          </div>
          <p className="text-[11px] text-muted-foreground pl-7">배송 완료 후 정산이 자동 진행됩니다.</p>
        </div>

        <section>
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">풀티 → 구매자 배송 현황</div>
          <div className="border border-border p-4 space-y-3">
            <DeliverySteps status="배송 중" />
            <div className="border-t border-border pt-3 grid grid-cols-2 gap-2 text-sm">
              <div><div className="text-[10px] text-muted-foreground mb-0.5">택배사</div><div className="font-medium">{demoFt.carrier}</div></div>
              <div><div className="text-[10px] text-muted-foreground mb-0.5">운송장 번호</div><div className="font-medium">{demoFt.trackingNo}</div></div>
            </div>
          </div>
        </section>

        <div className="border border-border divide-y divide-border text-sm">
          <div className="flex justify-between px-4 py-3"><span className="text-muted-foreground">제안 가격</span><span>{proposal.price.toLocaleString()}원</span></div>
          <div className="flex justify-between px-4 py-3"><span className="text-muted-foreground">풀티 수수료 (15%)</span><span className="text-muted-foreground">−{(proposal.price * 0.15).toLocaleString()}원</span></div>
          <div className="flex justify-between px-4 py-4 font-bold"><span>정산 예정액</span><span className="text-sage-deep">{(proposal.price * 0.85).toLocaleString()}원</span></div>
        </div>

        <div className="border-t border-border pt-6 flex items-center justify-between">
          <Link href="/seller/proposals"><Button variant="outline">제안 현황</Button></Link>
          <Button onClick={() => setPhase(3)}>배송 완료 처리</Button>
        </div>
      </div>
    );
  }

  // phase 1: 풀티 물류센터 이동 중
  return (
    <div className="space-y-8 max-w-2xl">
      <PageHeader id={id} title="거래 진행" />
      <StepBar steps={INDIVIDUAL_STEPS} current={1} />

      <div className="border border-border bg-muted/20 px-5 py-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-sage-deep animate-pulse" />
          <span className="text-sm font-medium">풀티 물류센터로 이동 중입니다</span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          상품 도착 확인 후 구매자에게 바로 발송됩니다.<br />
          발송 시 알림으로 안내드립니다.
        </p>
      </div>

      {tc && (
        <section>
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">발송 운송장</div>
          <div className="border border-border p-4 grid grid-cols-2 gap-2 text-sm">
            <div><div className="text-[10px] text-muted-foreground mb-0.5">택배사</div><div className="font-medium">{tc.carrier}</div></div>
            <div><div className="text-[10px] text-muted-foreground mb-0.5">운송장 번호</div><div className="font-medium">{tc.trackingNo}</div></div>
          </div>
        </section>
      )}

      <div className="border-t border-border pt-6 flex items-center justify-between">
        <Link href="/seller/proposals"><Button variant="outline">제안 현황으로</Button></Link>
        <Button onClick={() => setPhase(2)}>구매자 배송 시작</Button>
      </div>
    </div>
  );
}

/* ── 공통 컴포넌트 ──────────────────────────────────────────────── */

function PageHeader({ id, title }: { id: string; title: string }) {
  return (
    <div className="border-b border-border pb-4">
      <Link href={`/seller/proposals/${id}`} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
        <span style={{ fontSize: 13 }}>‹</span> 제안 상세
      </Link>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  );
}

function StepBar({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center">
      {steps.map((label, i) => {
        const isDone = i < current;
        const isCurrent = i === current;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn(
                "w-6 h-6 border-2 flex items-center justify-center text-[10px]",
                isDone ? "border-sage-deep bg-sage-deep text-background" :
                isCurrent ? "border-sage-deep text-sage-deep font-semibold" :
                "border-border text-muted-foreground opacity-40"
              )}>
                {isDone ? "✓" : i + 1}
              </div>
              <span className={cn(
                "text-[10px] whitespace-nowrap",
                isCurrent ? "text-sage-deep font-semibold" :
                isDone ? "text-muted-foreground" : "text-muted-foreground opacity-40"
              )}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("flex-1 h-px mb-5 mx-1", i < current ? "bg-sage-deep" : "bg-border")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function DeliverySteps({ status }: { status: string }) {
  const STEPS = ["배송 준비 중", "배송 중", "배송 완료"];
  const currentIdx = STEPS.indexOf(status);
  return (
    <div className="flex items-center">
      {STEPS.map((s, i) => {
        const isDone = i <= currentIdx;
        const isCurrent = i === currentIdx;
        return (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn("w-5 h-5 border-2 flex items-center justify-center text-[9px]",
                isDone ? "border-sage-deep bg-sage-deep text-background" : "border-border opacity-40"
              )}>{isDone && !isCurrent ? "✓" : i + 1}</div>
              <span className={cn("text-[10px] whitespace-nowrap",
                isCurrent ? "text-sage-deep font-semibold" : isDone ? "text-muted-foreground" : "text-muted-foreground opacity-40"
              )}>{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={cn("flex-1 h-px mb-5 mx-1", i < currentIdx ? "bg-sage-deep" : "bg-border")} />}
          </div>
        );
      })}
    </div>
  );
}

function ShippingForm({
  isBusiness, proposal, carrier, setCarrier, trackingNo, setTrackingNo, onSubmit,
}: {
  isBusiness: boolean;
  proposal: NonNullable<ReturnType<typeof proposals.find>>;
  carrier: string; setCarrier: (v: string) => void;
  trackingNo: string; setTrackingNo: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-8 max-w-2xl">
      <div className="border-b border-border pb-4">
        <Link href={`/seller/proposals/${proposal.id}`} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <span style={{ fontSize: 13 }}>‹</span> 제안 상세
        </Link>
        <h2 className="text-xl font-bold">{isBusiness ? "직접 배송 · 운송장 등록" : "거래 진행 · 운송장 등록"}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {isBusiness ? "구매자에게 직접 발송 후 운송장 번호를 등록하세요." : "상품을 풀티 물류센터로 발송하고 운송 정보를 등록하세요."}
        </p>
      </div>

      {!isBusiness && <StepBar steps={INDIVIDUAL_STEPS} current={0} />}

      <div className="border border-border bg-muted/10 px-4 py-3 text-[11px] leading-relaxed space-y-1">
        <div className="font-medium text-foreground text-xs mb-1">{isBusiness ? "구매자 배송지" : "풀티 물류센터 발송 안내"}</div>
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
            <div className="pt-1 text-amber-600">※ 운송장에 제안 ID ({proposal.id})를 반드시 기재해주세요. 배송비는 셀러 부담입니다.</div>
          </>
        )}
      </div>

      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">택배사 선택</div>
        <div className="flex flex-wrap gap-2">
          {CARRIERS.map((c) => (
            <button key={c} onClick={() => setCarrier(c)}
              className={cn("px-4 h-9 border text-xs transition-colors",
                carrier === c ? "border-sage-ink bg-sage-ink text-background" : "border-border hover:bg-muted"
              )}>
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">운송장 번호</div>
        <input value={trackingNo} onChange={(e) => setTrackingNo(e.target.value.replace(/[^0-9-]/g, ""))}
          placeholder="숫자만 입력"
          className="w-full border border-border h-11 px-4 text-sm bg-transparent focus:border-sage-ink outline-none transition-colors"
        />
      </section>

      {isBusiness && (
        <div className="border border-border divide-y divide-border text-sm">
          <div className="flex justify-between px-4 py-3"><span className="text-muted-foreground">제안 가격</span><span>{proposal.price.toLocaleString()}원</span></div>
          <div className="flex justify-between px-4 py-3"><span className="text-muted-foreground">풀티 수수료 (15%)</span><span className="text-muted-foreground">−{(proposal.price * 0.15).toLocaleString()}원</span></div>
          <div className="flex justify-between px-4 py-4 font-bold"><span>정산 예정액</span><span className="text-sage-deep">{(proposal.price * 0.85).toLocaleString()}원</span></div>
        </div>
      )}

      <div className="border-t border-border pt-6 flex justify-end gap-2">
        <Link href={`/seller/proposals/${proposal.id}`}><Button variant="outline">취소</Button></Link>
        <Button disabled={!carrier || !trackingNo} onClick={onSubmit}>운송장 등록 완료</Button>
      </div>
    </div>
  );
}
