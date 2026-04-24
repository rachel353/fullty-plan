"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, X, Clock, CheckCircle } from "lucide-react";
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

// --- Modals ---

function ApproveProposalModal({ seller, product, onConfirm, onClose }: {
  seller: string; product: string; onConfirm: () => void; onClose: () => void;
}) {
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
          제안을 승인하면 구매자에게 해당 제안이 노출됩니다.
        </p>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" onClick={onConfirm}>승인 확정</Button>
        </div>
      </div>
    </div>
  );
}

function RejectProposalModal({ seller, product, onConfirm, onClose }: {
  seller: string; product: string; onConfirm: (reason: string) => void; onClose: () => void;
}) {
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
            <button key={r} onClick={() => setSelected(r)}
              className={cn("w-full text-left px-3 py-2 border text-xs transition-colors",
                selected === r ? "border-sage-ink bg-sage-soft/20 text-sage-ink" : "border-border hover:bg-muted")}>
              {r}
            </button>
          ))}
          {isCustom && (
            <textarea value={custom} onChange={(e) => setCustom(e.target.value)}
              placeholder="반려 사유를 직접 입력하세요"
              className="w-full border border-border px-3 py-2 text-sm bg-transparent resize-none h-16 outline-none focus:border-sage-ink" />
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

// --- Status Views ---

function WaitingView({ request }: { request: typeof getRequests[number] }) {
  return (
    <div className="space-y-8">
      {/* 대기 상태 배너 */}
      <div className="border border-border px-6 py-8 flex flex-col items-center text-center space-y-3">
        <div className="w-10 h-10 border border-border flex items-center justify-center">
          <Clock size={18} className="text-muted-foreground" />
        </div>
        <div>
          <div className="text-sm font-semibold">제안 수신 대기 중</div>
          <div className="text-[11px] text-muted-foreground mt-1">
            셀러의 제안이 도착하면 검수 후 구매자에게 노출됩니다.
          </div>
        </div>
      </div>

      {/* 매칭 기준 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">매칭 기준</div>
        <div className="border border-border divide-y divide-border text-sm">
          <Row label="브랜드" value={request.brand} />
          <Row label="모델명" value={request.model} />
          <Row label="옵션" value={request.option} />
          <Row label="희망 예산" value={<span className="font-semibold">{formatPrice(request.budget)}</span>} />
          <Row label="요청일" value={request.createdAt} />
        </div>
      </section>
    </div>
  );
}

function ProposalInspectionView({ requestId, decisions, onApprove, onReject }: {
  requestId: string;
  decisions: Record<string, { type: ProposalDecision; reason?: string }>;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const related = proposals.filter((p) => p.getRequestId === requestId);
  const pending = related.filter((p) => p.status === "풀티 검수 중");
  const others = related.filter((p) => p.status !== "풀티 검수 중");

  return (
    <div className="space-y-8">
      {/* 검수 대기 제안 */}
      {pending.length > 0 ? (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="text-[10px] text-muted-foreground tracking-widest uppercase">검수 대기 제안</div>
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-background text-[9px] font-bold">
              {pending.filter((p) => !decisions[p.id]).length}
            </span>
          </div>
          <div className="border border-border divide-y divide-border">
            {pending.map((p) => {
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
                      <div className="font-semibold">{formatPrice(p.price)}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">제안가</div>
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
                        <Button size="sm" variant="outline" onClick={() => onReject(p.id)}>반려</Button>
                        <Button size="sm" onClick={() => onApprove(p.id)}>승인</Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <div className="border border-border py-10 text-center text-sm text-muted-foreground">
          검수 대기 중인 제안이 없습니다.
        </div>
      )}

      {/* 기처리 제안 */}
      {others.length > 0 && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">처리된 제안</div>
          <div className="border border-border divide-y divide-border">
            {others.map((p) => (
              <div key={p.id} className="px-4 py-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] text-muted-foreground">{p.productBrand}</div>
                  <div className="font-medium text-sm">{p.productName}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">등급 {p.productGrade} · {p.sentAt}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">{formatPrice(p.price)}</div>
                  <Badge
                    variant={p.status === "사용자 수락" ? "default" : p.status === "거절됨" ? "muted" : "outline"}
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
    </div>
  );
}

function DealCompleteView({ requestId }: { requestId: string }) {
  const related = proposals.filter((p) => p.getRequestId === requestId);
  const accepted = related.find((p) => p.status === "사용자 수락");
  const rejected = related.filter((p) => p.status === "거절됨");

  return (
    <div className="space-y-8">
      {/* 완료 배너 */}
      <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-5 flex items-center gap-4">
        <div className="w-8 h-8 bg-sage-deep flex items-center justify-center flex-shrink-0">
          <CheckCircle size={16} className="text-background" />
        </div>
        <div>
          <div className="text-sm font-semibold">거래 완료</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">
            매칭이 성사되어 거래가 완료되었습니다.
          </div>
        </div>
      </div>

      {/* 성사 제안 */}
      {accepted && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">성사된 제안</div>
          <div className="border border-sage-deep/20 divide-y divide-border">
            <div className="px-4 py-4 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] text-muted-foreground">{accepted.productBrand}</div>
                  <div className="font-semibold text-sm">{accepted.productName}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    등급 {accepted.productGrade} · 사용 {accepted.usagePeriod}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{formatPrice(accepted.price)}</div>
                  <Badge variant="default" className="mt-1 text-[10px]">사용자 수락</Badge>
                </div>
              </div>
              {accepted.note && (
                <div className="text-[11px] text-muted-foreground bg-muted/30 px-3 py-2 border border-border">
                  {accepted.note}
                </div>
              )}
              {/* 배송 상태 */}
              {(accepted.tracking || accepted.fullttiTracking) && (
                <div className="border border-border px-4 py-3 text-sm space-y-1">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest">배송 현황</div>
                  {accepted.tracking && (
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">셀러 → 구매자</span>
                      <span>{accepted.tracking.carrier} {accepted.tracking.trackingNo} · {accepted.tracking.status}</span>
                    </div>
                  )}
                  {accepted.sellerTracking && (
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">셀러 → 풀티</span>
                      <span>{accepted.sellerTracking.carrier} · {accepted.sellerTracking.status}</span>
                    </div>
                  )}
                  {accepted.fullttiTracking && (
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">풀티 → 구매자</span>
                      <span>{accepted.fullttiTracking.carrier} · {accepted.fullttiTracking.status}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 반려된 제안 */}
      {rejected.length > 0 && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">미선택 제안 ({rejected.length}건)</div>
          <div className="border border-border divide-y divide-border">
            {rejected.map((p) => (
              <div key={p.id} className="px-4 py-3 flex items-center justify-between gap-4 opacity-60">
                <div>
                  <div className="text-[11px] text-muted-foreground">{p.productBrand}</div>
                  <div className="text-sm">{p.productName}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">{formatPrice(p.price)}</div>
                  <Badge variant="muted" className="text-[10px] mt-0.5">미선택</Badge>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// --- Main Page ---

export default function AdminGetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const request = getRequests.find((g) => g.id === id);

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

  const related = proposals.filter((p) => p.getRequestId === id);
  const approveProposal = approveTarget ? related.find((p) => p.id === approveTarget) : null;
  const rejectProposal = rejectTarget ? related.find((p) => p.id === rejectTarget) : null;

  return (
    <div className="space-y-8 max-w-2xl">
      {/* 헤더 */}
      <div className="border-b border-border pb-4">
        <Link href="/admin/get" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> GET 관리
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] text-muted-foreground mb-1">{request.brand}</div>
            <h2 className="text-xl font-bold">{request.model}</h2>
            <p className="text-[11px] text-muted-foreground mt-1">
              {request.id} · {request.option} · 생성 {request.createdAt}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Badge variant={request.status === "거래 완료" ? "muted" : request.status === "셀러 제안" ? "default" : "outline"}>
              {request.status}
            </Badge>
            <span className="text-[11px] text-muted-foreground">제안 {request.proposalCount}건</span>
          </div>
        </div>
      </div>

      {/* 요청 정보 - 항상 표시 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">요청 정보</div>
        <div className="border border-border divide-y divide-border text-sm">
          <Row label="브랜드" value={request.brand} />
          <Row label="모델" value={request.model} />
          <Row label="옵션" value={request.option} />
          <Row label="희망 예산" value={<span className="font-semibold">{formatPrice(request.budget)}</span>} />
        </div>
      </section>

      {/* 상태별 본문 */}
      {request.status === "대기중" && <WaitingView request={request} />}

      {request.status === "셀러 제안" && (
        <ProposalInspectionView
          requestId={id ?? ""}
          decisions={decisions}
          onApprove={(pid) => setApproveTarget(pid)}
          onReject={(pid) => setRejectTarget(pid)}
        />
      )}

      {request.status === "거래 완료" && <DealCompleteView requestId={id ?? ""} />}

      <div className="border-t border-border pt-6 flex justify-end">
        <Link href="/admin/get"><Button variant="outline">목록으로</Button></Link>
      </div>

      {approveTarget && approveProposal && (
        <ApproveProposalModal
          seller={approveProposal.productBrand}
          product={approveProposal.productName}
          onConfirm={() => {
            setDecisions((prev) => ({ ...prev, [approveTarget]: { type: "승인" } }));
            setApproveTarget(null);
          }}
          onClose={() => setApproveTarget(null)}
        />
      )}

      {rejectTarget && rejectProposal && (
        <RejectProposalModal
          seller={rejectProposal.productBrand}
          product={rejectProposal.productName}
          onConfirm={(reason) => {
            setDecisions((prev) => ({ ...prev, [rejectTarget]: { type: "반려", reason } }));
            setRejectTarget(null);
          }}
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
