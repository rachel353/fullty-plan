"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { proposals } from "@/lib/mock";
import type { ProposalStatus } from "@/lib/mock";
import { useSellerType } from "@/lib/seller-context";

const STATUS_STEPS: ProposalStatus[] = ["풀티 검수 중", "사용자 확인 대기", "사용자 수락"];

const badgeVariant = (status: ProposalStatus) => {
  if (status === "사용자 수락") return "default";
  if (status === "거절됨") return "muted";
  return "outline";
};

function StatusTimeline({ status }: { status: ProposalStatus }) {
  const isRejected = status === "거절됨";
  const currentIdx = isRejected ? -1 : STATUS_STEPS.indexOf(status);

  return (
    <div>
      <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">진행 상태</div>
      <div className="flex items-center">
        {STATUS_STEPS.map((step, i) => {
          const isDone = !isRejected && i <= currentIdx;
          const isCurrent = !isRejected && i === currentIdx;
          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div className={cn(
                  "w-6 h-6 border-2 flex items-center justify-center text-[10px]",
                  isDone ? "border-sage-deep bg-sage-deep text-background" : "border-border text-muted-foreground"
                )}>
                  {isDone && !isCurrent ? "✓" : i + 1}
                </div>
                <span className={cn(
                  "text-[10px] whitespace-nowrap",
                  isCurrent ? "text-sage-deep font-semibold" : isDone ? "text-muted-foreground" : "text-muted-foreground opacity-50"
                )}>
                  {step}
                </span>
              </div>
              {i < STATUS_STEPS.length - 1 && (
                <div className={cn("flex-1 h-px mb-5 mx-1", i < currentIdx ? "bg-sage-deep" : "bg-border")} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ConfirmModal({ price, onConfirm, onClose }: { price: number; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">거래 확정</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X size={16} /></button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          거래를 확정하면 구매자에게 알림이 전송되고 직접 배송을 진행합니다.<br />
          확정 후에는 취소가 불가합니다.
        </p>
        <div className="border border-border px-4 py-3 flex justify-between text-sm">
          <span className="text-muted-foreground">정산 예정액</span>
          <span className="font-bold text-sage-deep">{(price * 0.85).toLocaleString()}원</span>
        </div>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" onClick={onConfirm}>거래 확정</Button>
        </div>
      </div>
    </div>
  );
}

function AcceptedBanner({
  proposal,
  isBusiness,
}: {
  proposal: NonNullable<ReturnType<typeof proposals.find>>;
  isBusiness: boolean;
}) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-4 flex items-center gap-3">
        <div className="w-7 h-7 bg-sage-deep flex items-center justify-center flex-shrink-0">
          <Check size={13} className="text-background" />
        </div>
        <div>
          <div className="text-sm font-semibold">거래가 확정되었습니다</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">구매자에게 직접 배송을 진행해주세요.</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sage-deep flex items-center justify-center flex-shrink-0">
            <Check size={14} className="text-background" />
          </div>
          <div>
            <div className="text-sm font-semibold">사용자가 제안을 수락했습니다</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">
              {isBusiness ? "거래를 확정하고 직접 배송을 진행하세요." : "풀티를 통해 거래를 진행해주세요."}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-[11px]">
          {(isBusiness
            ? [
                { step: "01", label: "거래 확정", desc: "구매자 알림 발송" },
                { step: "02", label: "직접 배송", desc: "운송장 직접 등록" },
                { step: "03", label: "거래 완료", desc: "대금 정산" },
              ]
            : [
                { step: "01", label: "거래 확정", desc: "풀티 거래 승인" },
                { step: "02", label: "상품 발송", desc: "풀티 물류 센터" },
                { step: "03", label: "거래 완료", desc: "대금 정산" },
              ]
          ).map((s) => (
            <div key={s.step} className="border border-sage-deep/20 px-3 py-2.5 bg-background">
              <div className="text-[10px] text-sage-deep font-semibold">{s.step}</div>
              <div className="font-medium mt-0.5">{s.label}</div>
              <div className="text-muted-foreground">{s.desc}</div>
            </div>
          ))}
        </div>

        {(proposal.tracking || proposal.sellerTracking || proposal.fullttiTracking) ? (
          <Link href={`/seller/proposals/${proposal.id}/deal`} className="block">
            <Button variant="outline" className="w-full">거래 현황 보기</Button>
          </Link>
        ) : isBusiness ? (
          <Button className="w-full" onClick={() => setModalOpen(true)}>거래 진행하기</Button>
        ) : (
          <Link href={`/seller/proposals/${proposal.id}/deal`} className="block">
            <Button className="w-full">거래 진행하기</Button>
          </Link>
        )}
      </div>

      {modalOpen && (
        <ConfirmModal
          price={proposal.price}
          onConfirm={() => { setModalOpen(false); router.push(`/seller/proposals/${proposal.id}/deal`); }}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

function StatusBanner({ status, proposal, isBusiness }: {
  status: ProposalStatus;
  proposal: ReturnType<typeof proposals.find>;
  isBusiness: boolean;
}) {
  if (!proposal) return null;

  if (status === "사용자 확인 대기") {
    return (
      <div className="border border-border bg-muted/20 px-5 py-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-sm font-medium">사용자가 제안을 검토 중입니다</span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {proposal.sentAt} 발송 · 사용자가 수락하면 풀티를 통해 거래가 진행됩니다.<br />
          수락 또는 거절 시 알림으로 안내드립니다.
        </p>
        <div className="pt-1 border-t border-border flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">제안을 취소하려면 아래 버튼을 누르세요.</span>
          <Button variant="outline" size="sm">제안 철회</Button>
        </div>
      </div>
    );
  }

  if (status === "사용자 수락") {
    return <AcceptedBanner proposal={proposal} isBusiness={isBusiness} />;
  }

  if (status === "거절됨") {
    return (
      <div className="border border-border bg-muted/10 px-5 py-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border border-border flex items-center justify-center text-[11px] text-muted-foreground">✕</div>
          <span className="text-sm font-medium">제안이 거절되었습니다</span>
          {proposal.reviewedAt && <span className="text-[11px] text-muted-foreground ml-auto">{proposal.reviewedAt}</span>}
        </div>
        {proposal.rejectionReason && (
          <div className="border border-border px-4 py-3 bg-background">
            <div className="text-[10px] text-muted-foreground mb-1">거절 사유</div>
            <div className="text-sm">{proposal.rejectionReason}</div>
          </div>
        )}
        <div className="pt-1 border-t border-border flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">같은 GET 요청에 다시 제안할 수 있습니다.</span>
          <Link href={`/seller/get-requests/${proposal.getRequestId}/propose`}>
            <Button size="sm">새 제안 작성</Button>
          </Link>
        </div>
      </div>
    );
  }

  return null;
}

export default function ProposalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { sellerType } = useSellerType();
  const isBusiness = sellerType === "사업자";
  const proposal = proposals.find((p) => p.id === id);

  if (!proposal) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        제안을 찾을 수 없습니다.
        <Link href="/seller/proposals" className="block mt-3 text-sage-ink underline">제안 현황으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="border-b border-border pb-4">
        <Link href="/seller/proposals" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 제안 현황
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">제안 상세</h2>
            <p className="text-[11px] text-muted-foreground mt-1">{proposal.id} · {proposal.sentAt} 발송</p>
          </div>
          <Badge variant={badgeVariant(proposal.status)}>{proposal.status}</Badge>
        </div>
      </div>

      <StatusBanner status={proposal.status} proposal={proposal} isBusiness={isBusiness} />
      <StatusTimeline status={proposal.status} />

      <section>
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">대상 GET 요청</div>
        <div className="border border-border p-4 bg-muted/10 space-y-1">
          <div className="text-[11px] text-muted-foreground">{proposal.brand}</div>
          <div className="font-semibold">{proposal.model}</div>
          <div className="text-[11px] text-muted-foreground">{proposal.option}</div>
          <div className="text-sm font-medium mt-2">
            구매자 희망가 <span className="text-sage-deep font-bold">{proposal.budget.toLocaleString()}원</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">제안 내용</div>
        <div className="grid grid-cols-2 gap-3">
          <InfoBox label="제안 상품" value={`${proposal.productBrand} ${proposal.productName}`} />
          <InfoBox label="상품 등급" value={<Badge variant="default">{proposal.productGrade}</Badge>} />
          <InfoBox label="사용 기간" value={proposal.usagePeriod} />
          <InfoBox label="제안 가격" value={
            <span className={cn("font-semibold", proposal.price > proposal.budget ? "text-amber-600" : "text-sage-deep")}>
              {proposal.price.toLocaleString()}원
            </span>
          } />
        </div>
        <div className={cn(
          "flex items-center gap-2 text-[11px] px-3 py-2 border",
          proposal.price > proposal.budget ? "border-amber-200 bg-amber-50 text-amber-700" : "border-sage-deep/20 bg-sage-deep/5 text-sage-ink"
        )}>
          구매자 희망가 대비{" "}
          {proposal.price > proposal.budget ? `+${(proposal.price - proposal.budget).toLocaleString()}원 초과` : `${(proposal.budget - proposal.price).toLocaleString()}원 이내`}
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-2">첨부 사진</div>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4].map((i) => <div key={i} className="border border-border aspect-square bg-muted/20" />)}
          </div>
        </div>
        {proposal.note && (
          <div>
            <div className="text-xs text-muted-foreground mb-2">추가 메모</div>
            <div className="border border-border px-4 py-3 text-sm bg-muted/10 leading-relaxed">{proposal.note}</div>
          </div>
        )}
      </section>

      <div className="border-t border-border pt-6 flex justify-end gap-2">
        <Link href="/seller/proposals"><Button variant="outline">목록으로</Button></Link>
        {(proposal.status === "풀티 검수 중" || proposal.status === "사용자 확인 대기") && (
          <Link href={`/seller/get-requests/${proposal.getRequestId}/propose`}>
            <Button variant="outline">제안 수정</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border border-border px-4 py-3">
      <div className="text-[10px] text-muted-foreground mb-1">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
