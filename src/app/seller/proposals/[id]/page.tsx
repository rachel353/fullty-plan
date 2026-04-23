"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { proposals } from "@/lib/mock";
import type { ProposalStatus } from "@/lib/mock";

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
    <div className="space-y-1">
      <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">진행 상태</div>
      <div className="flex items-center gap-0">
        {STATUS_STEPS.map((step, i) => {
          const isDone = !isRejected && i <= currentIdx;
          const isCurrent = !isRejected && i === currentIdx;
          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div className={cn(
                  "w-6 h-6 border-2 flex items-center justify-center text-[10px] transition-colors",
                  isDone
                    ? "border-sage-deep bg-sage-deep text-background"
                    : "border-border text-muted-foreground"
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
                <div className={cn(
                  "flex-1 h-px mb-5 mx-1",
                  i < currentIdx ? "bg-sage-deep" : "bg-border"
                )} />
              )}
            </div>
          );
        })}
      </div>
      {isRejected && (
        <div className="mt-3 flex items-center gap-2 px-3 py-2 border border-border bg-muted/30 text-xs text-muted-foreground">
          <span className="w-4 h-4 border border-border flex items-center justify-center text-[10px]">✕</span>
          제안이 거절되었습니다
        </div>
      )}
    </div>
  );
}

export default function ProposalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const proposal = proposals.find((p) => p.id === id);

  if (!proposal) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        제안을 찾을 수 없습니다.
        <Link href="/seller/proposals" className="block mt-3 text-sage-ink underline">
          제안 현황으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* 헤더 */}
      <div className="border-b border-border pb-4">
        <Link
          href="/seller/proposals"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors"
        >
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

      {/* 진행 상태 */}
      <StatusTimeline status={proposal.status} />

      {/* 거절 사유 */}
      {proposal.status === "거절됨" && proposal.rejectionReason && (
        <div className="border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <div className="text-[10px] font-semibold tracking-widest uppercase mb-1 text-amber-600">거절 사유</div>
          {proposal.rejectionReason}
          {proposal.reviewedAt && (
            <div className="text-[11px] text-amber-600 mt-1">{proposal.reviewedAt} 확인됨</div>
          )}
        </div>
      )}

      {/* 수락 CTA */}
      {proposal.status === "사용자 수락" && (
        <div className="border border-sage-deep/30 bg-sage-soft/20 px-5 py-4 space-y-3">
          <div className="text-[10px] font-semibold tracking-widest text-sage-deep uppercase">사용자가 제안을 수락했습니다</div>
          <p className="text-sm text-muted-foreground">
            풀티를 통해 거래를 진행합니다. 아래 버튼을 눌러 거래 절차를 확인하세요.
          </p>
          <Button size="sm">거래 진행하기</Button>
        </div>
      )}

      {/* GET 요청 정보 */}
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

      {/* 제안 내용 */}
      <section className="space-y-4">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">제안 내용</div>

        <div className="grid grid-cols-2 gap-3">
          <InfoRow label="제안 상품" value={`${proposal.productBrand} ${proposal.productName}`} />
          <InfoRow label="상품 등급" value={<Badge variant="default">{proposal.productGrade}</Badge>} />
          <InfoRow label="사용 기간" value={proposal.usagePeriod} />
          <InfoRow label="제안 가격" value={
            <span className={cn(
              "font-semibold",
              proposal.price > proposal.budget ? "text-amber-600" : "text-sage-deep"
            )}>
              {proposal.price.toLocaleString()}원
            </span>
          } />
        </div>

        {/* 가격 비교 */}
        <div className={cn(
          "flex items-center gap-2 text-[11px] px-3 py-2 border",
          proposal.price > proposal.budget
            ? "border-amber-200 bg-amber-50 text-amber-700"
            : "border-sage-deep/20 bg-sage-deep/5 text-sage-ink"
        )}>
          구매자 희망가 대비{" "}
          {proposal.price > proposal.budget
            ? `+${(proposal.price - proposal.budget).toLocaleString()}원 초과`
            : `${(proposal.budget - proposal.price).toLocaleString()}원 이내`}
        </div>

        {/* 상품 사진 */}
        <div>
          <div className="text-xs text-muted-foreground mb-2">첨부 사진</div>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-border aspect-square bg-muted/20" />
            ))}
          </div>
        </div>

        {/* 메모 */}
        {proposal.note && (
          <div>
            <div className="text-xs text-muted-foreground mb-2">추가 메모</div>
            <div className="border border-border px-4 py-3 text-sm bg-muted/10 leading-relaxed">
              {proposal.note}
            </div>
          </div>
        )}
      </section>

      {/* 하단 버튼 */}
      <div className="border-t border-border pt-6 flex justify-end gap-2">
        <Link href="/seller/proposals">
          <Button variant="outline">목록으로</Button>
        </Link>
        {(proposal.status === "풀티 검수 중" || proposal.status === "사용자 확인 대기") && (
          <Link href={`/seller/get-requests/${proposal.getRequestId}/propose`}>
            <Button variant="outline">제안 수정</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border border-border px-4 py-3">
      <div className="text-[10px] text-muted-foreground mb-1">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
