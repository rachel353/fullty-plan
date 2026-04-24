"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { getRequests, proposals } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

type ProposalDecision = "승인" | "반려";

const REJECT_REASONS = [
  "가격 기준 초과",
  "상품 상태 불량",
  "사진 불충분",
  "등급 기준 미달",
  "기타 (직접 입력)",
];

function ApproveProposalModal({ seller, product, onConfirm, onClose }: { seller: string; product: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">제안 승인</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <div className="border border-border px-4 py-3 text-sm space-y-0.5">
          <div className="text-[11px] text-muted-foreground">{seller}</div>
          <div className="font-semibold">{product}</div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          제안을 승인합니다.<br />
          구매자에게 해당 제안이 노출됩니다.
        </p>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" onClick={onConfirm}>승인 확정</Button>
        </div>
      </div>
    </div>
  );
}

function RejectProposalModal({ seller, product, onConfirm, onClose }: { seller: string; product: string; onConfirm: (reason: string) => void; onClose: () => void }) {
  const [selected, setSelected] = useState("");
  const [custom, setCustom] = useState("");
  const isCustom = selected === "기타 (직접 입력)";
  const reason = isCustom ? custom : selected;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">제안 반려</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <div className="border border-border px-4 py-3 text-sm space-y-0.5">
          <div className="text-[11px] text-muted-foreground">{seller}</div>
          <div className="font-semibold">{product}</div>
        </div>
        <div className="space-y-2">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">반려 사유</div>
          {REJECT_REASONS.map((r) => (
            <button
              key={r}
              onClick={() => setSelected(r)}
              className={cn(
                "w-full text-left px-3 py-2 border text-xs transition-colors",
                selected === r ? "border-sage-ink bg-sage-soft/20 text-sage-ink" : "border-border hover:bg-muted"
              )}
            >
              {r}
            </button>
          ))}
          {isCustom && (
            <textarea
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="반려 사유를 직접 입력하세요"
              className="w-full border border-border px-3 py-2 text-sm bg-transparent resize-none h-16 outline-none focus:border-sage-ink"
            />
          )}
        </div>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1 bg-red-500 hover:bg-red-600" disabled={!reason.trim()} onClick={() => onConfirm(reason)}>반려 확정</Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminGetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const request = getRequests.find((g) => g.id === id);
  const relatedProposals = proposals.filter((p) => p.getRequestId === id);

  const [decisions, setDecisions] = useState<Record<string, { type: ProposalDecision; reason?: string }>>({});
  const [approveTarget, setApproveTarget] = useState<string | null>(null);
  const [rejectTarget, setRejectTarget] = useState<string | null>(null);

  if (!request) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        GET 요청을 찾을 수 없습니다.
        <Link href="/admin/get" className="block mt-3 text-sage-ink underline">목록으로</Link>
      </div>
    );
  }

  const pendingProposals = relatedProposals.filter((p) => p.status === "풀티 검수 중");
  const otherProposals = relatedProposals.filter((p) => p.status !== "풀티 검수 중");

  const approveProposal = approveTarget ? relatedProposals.find((p) => p.id === approveTarget) : null;
  const rejectProposal = rejectTarget ? relatedProposals.find((p) => p.id === rejectTarget) : null;

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="border-b border-border pb-4">
        <Link href="/admin/get" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> GET 관리
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] text-muted-foreground mb-1">{request.brand}</div>
            <h2 className="text-xl font-bold">{request.model}</h2>
            <p className="text-[11px] text-muted-foreground mt-1">{request.id} · 생성 {request.createdAt}</p>
          </div>
          <Badge variant={request.status === "거래 완료" ? "muted" : request.status === "셀러 제안" ? "default" : "outline"}>
            {request.status}
          </Badge>
        </div>
      </div>

      {/* 요청 정보 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">요청 정보</div>
        <div className="border border-border divide-y divide-border text-sm">
          <Row label="브랜드" value={request.brand} />
          <Row label="모델" value={request.model} />
          <Row label="옵션" value={request.option} />
          <Row label="희망 예산" value={<span className="font-semibold">{formatPrice(request.budget)}</span>} />
          <Row label="제안 수" value={`${request.proposalCount}건`} />
        </div>
      </section>

      {/* 검수 대기 제안 */}
      {pendingProposals.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="text-[10px] text-muted-foreground tracking-widest uppercase">검수 대기 제안</div>
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-background text-[9px] font-bold">
              {pendingProposals.length}
            </span>
          </div>
          <div className="border border-border divide-y divide-border">
            {pendingProposals.map((p) => {
              const decision = decisions[p.id];
              return (
                <div key={p.id} className="px-4 py-4 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] text-muted-foreground">{p.productBrand}</div>
                      <div className="font-medium text-sm">{p.productName}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        등급 {p.productGrade} · 사용 {p.usagePeriod}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold text-sm">{formatPrice(p.price)}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">제안가</div>
                    </div>
                  </div>
                  {p.note && (
                    <div className="text-[11px] text-muted-foreground bg-muted/30 px-3 py-2 border border-border">
                      {p.note}
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">{p.id} · {p.sentAt}</span>
                    {decision ? (
                      <div className="flex items-center gap-2">
                        <Badge variant={decision.type === "승인" ? "default" : "muted"}>{decision.type}</Badge>
                        {decision.reason && <span className="text-[10px] text-muted-foreground">{decision.reason}</span>}
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setRejectTarget(p.id)}>반려</Button>
                        <Button size="sm" onClick={() => setApproveTarget(p.id)}>승인</Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 기타 제안 (이미 처리된 것들) */}
      {otherProposals.length > 0 && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">기타 제안</div>
          <div className="border border-border divide-y divide-border">
            {otherProposals.map((p) => (
              <div key={p.id} className="px-4 py-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] text-muted-foreground">{p.productBrand}</div>
                  <div className="font-medium text-sm">{p.productName}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">등급 {p.productGrade} · {p.sentAt}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">{formatPrice(p.price)}</div>
                  <Badge
                    variant={
                      p.status === "사용자 수락" ? "default"
                      : p.status === "거절됨" ? "muted"
                      : "outline"
                    }
                    className="mt-1 text-[10px]"
                  >
                    {p.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {relatedProposals.length === 0 && (
        <div className="border border-border py-12 text-center text-sm text-muted-foreground">
          아직 제안이 없습니다.
        </div>
      )}

      <div className="border-t border-border pt-6 flex justify-end">
        <Link href="/admin/get"><Button variant="outline">목록으로</Button></Link>
      </div>

      {approveTarget && approveProposal && (
        <ApproveProposalModal
          seller={approveProposal.productBrand}
          product={approveProposal.productName}
          onConfirm={() => { setDecisions((prev) => ({ ...prev, [approveTarget]: { type: "승인" } })); setApproveTarget(null); }}
          onClose={() => setApproveTarget(null)}
        />
      )}

      {rejectTarget && rejectProposal && (
        <RejectProposalModal
          seller={rejectProposal.productBrand}
          product={rejectProposal.productName}
          onConfirm={(reason) => { setDecisions((prev) => ({ ...prev, [rejectTarget]: { type: "반려", reason } })); setRejectTarget(null); }}
          onClose={() => setRejectTarget(null)}
        />
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between gap-4">
      <span className="text-muted-foreground text-[11px] w-28 flex-shrink-0">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
