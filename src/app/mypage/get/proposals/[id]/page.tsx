"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { proposals, getRequests } from "@/lib/mock";
import type { DeliveryStatus } from "@/lib/mock";

const DELIVERY_STEPS: DeliveryStatus[] = ["배송 준비 중", "배송 중", "배송 완료"];

export default function GetProposalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const proposal = proposals.find((p) => p.id === id);
  const req = proposal ? getRequests.find((r) => r.id === proposal.getRequestId) : null;

  if (!proposal || !req) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        제안을 찾을 수 없습니다.
        <Link href="/mypage/get" className="block mt-3 text-sage-ink underline">돌아가기</Link>
      </div>
    );
  }

  const overBudget = proposal.price > req.budget;

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4">
        <Link href="/mypage/get" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> GET 내역
        </Link>
        <h2 className="text-xl font-bold">셀러 제안 상세</h2>
        <p className="text-[11px] text-muted-foreground mt-1">풀티 검수를 통과한 제안입니다.</p>
      </div>

      {/* 내 GET 요청 요약 */}
      <section>
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">내 GET 요청</div>
        <div className="border border-border p-4 bg-muted/10 flex items-start justify-between">
          <div>
            <div className="text-[11px] text-muted-foreground">{req.brand}</div>
            <div className="font-semibold">{req.model}</div>
            <div className="text-[11px] text-muted-foreground">{req.option}</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-muted-foreground">내 희망가</div>
            <div className="font-bold mt-0.5">{req.budget.toLocaleString()}원</div>
          </div>
        </div>
      </section>

      {/* 제안 상품 정보 */}
      <section className="space-y-4">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">제안 상품</div>

        <div className="grid grid-cols-2 gap-3">
          <InfoBox label="브랜드 · 상품" value={`${proposal.productBrand} ${proposal.productName}`} />
          <InfoBox label="상품 등급" value={<Badge variant="default">{proposal.productGrade}</Badge>} />
          <InfoBox label="사용 기간" value={proposal.usagePeriod} />
          <InfoBox label="제안 가격" value={
            <span className={cn("font-bold text-base", overBudget ? "text-amber-600" : "text-sage-deep")}>
              {proposal.price.toLocaleString()}원
            </span>
          } />
        </div>

        <div className={cn(
          "px-4 py-3 border text-[11px]",
          overBudget
            ? "border-amber-200 bg-amber-50 text-amber-700"
            : "border-sage-deep/20 bg-sage-deep/5 text-sage-ink"
        )}>
          내 희망가 {req.budget.toLocaleString()}원 대비{" "}
          {overBudget
            ? `+${(proposal.price - req.budget).toLocaleString()}원 초과`
            : `${(req.budget - proposal.price).toLocaleString()}원 저렴`}
        </div>

        {/* 상품 사진 */}
        <div>
          <div className="text-xs text-muted-foreground mb-2">상품 사진</div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-border aspect-square bg-muted/20" />
            ))}
          </div>
        </div>

        {/* 셀러 메모 */}
        {proposal.note && (
          <div>
            <div className="text-xs text-muted-foreground mb-2">셀러 메모</div>
            <div className="border border-border px-4 py-3 text-sm bg-muted/10 leading-relaxed">
              {proposal.note}
            </div>
          </div>
        )}
      </section>

      {/* 풀티 검수 통과 안내 */}
      <div className="border border-border px-4 py-3 bg-muted/10 flex items-center gap-3">
        <div className="w-5 h-5 bg-sage-deep flex items-center justify-center flex-shrink-0">
          <span className="text-background text-[10px]">✓</span>
        </div>
        <div className="text-[11px] text-muted-foreground leading-relaxed">
          이 제안은 풀티 검수를 통과했습니다. 상품 상태, 사진, 가격이 확인되었습니다.
        </div>
      </div>

      {/* 배송 현황 */}
      {proposal.tracking && (
        <section>
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">배송 현황</div>
          <div className="border border-border p-4 space-y-4">
            {/* 스텝 */}
            <div className="flex items-center">
              {DELIVERY_STEPS.map((s, i) => {
                const currentIdx = DELIVERY_STEPS.indexOf(proposal.tracking!.status);
                const isDone = i <= currentIdx;
                const isCurrent = i === currentIdx;
                return (
                  <div key={s} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className={cn(
                        "w-5 h-5 border-2 flex items-center justify-center text-[9px]",
                        isDone ? "border-sage-deep bg-sage-deep text-background" : "border-border text-muted-foreground opacity-40"
                      )}>
                        {isDone && !isCurrent ? "✓" : i + 1}
                      </div>
                      <span className={cn(
                        "text-[10px] whitespace-nowrap",
                        isCurrent ? "text-sage-deep font-semibold" : isDone ? "text-muted-foreground" : "text-muted-foreground opacity-40"
                      )}>{s}</span>
                    </div>
                    {i < DELIVERY_STEPS.length - 1 && (
                      <div className={cn("flex-1 h-px mb-5 mx-1", i < currentIdx ? "bg-sage-deep" : "bg-border")} />
                    )}
                  </div>
                );
              })}
            </div>
            {/* 운송장 정보 */}
            <div className="border-t border-border pt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-[10px] text-muted-foreground mb-0.5">택배사</div>
                <div className="font-medium">{proposal.tracking.carrier}</div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground mb-0.5">운송장 번호</div>
                <div className="font-medium">{proposal.tracking.trackingNo}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 하단 CTA */}
      <div className="border-t border-border pt-6 flex items-center justify-between">
        <Link href="/mypage/get"><Button variant="outline">목록으로</Button></Link>
        {!proposal.tracking && (
          <div className="flex gap-2">
            <Button variant="outline">거절</Button>
            <Link href={`/mypage/get/proposals/${proposal.id}/pay`}>
              <Button>결제하기 · {proposal.price.toLocaleString()}원</Button>
            </Link>
          </div>
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
