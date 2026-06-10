"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  billingRequests as INITIAL_BILLING,
  BILLING_REASONS,
  RENTAL_OPTIONS,
  type BillingRequest,
  type BillingStatus,
} from "@/lib/billing";

type StatusFilter = "전체" | BillingStatus;

const STATUS_VARIANT: Record<BillingStatus, "default" | "outline" | "muted" | "sage"> = {
  "대기 중": "outline",
  "결제 완료": "sage",
  "연체": "default",
  "취소됨": "muted",
};

export default function AdminBillingPage() {
  return (
    <Suspense>
      <AdminBillingContent />
    </Suspense>
  );
}

function AdminBillingContent() {
  const searchParams = useSearchParams();
  const presetRentalId = searchParams.get("rentalId");

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("전체");
  const [requests, setRequests] = useState<BillingRequest[]>(INITIAL_BILLING);

  // 청구 발송 모달
  const [sendOpen, setSendOpen] = useState(() => !!presetRentalId);
  const [sendRentalId, setSendRentalId] = useState(
    () => presetRentalId ?? RENTAL_OPTIONS[0].rentalId
  );
  const [sendReason, setSendReason] = useState(BILLING_REASONS[0]);
  const [sendAmount, setSendAmount] = useState("");
  const [sendDueDate, setSendDueDate] = useState("");
  const [sendMemo, setSendMemo] = useState("");

  // 취소 확인 모달
  const [cancelTarget, setCancelTarget] = useState<BillingRequest | null>(null);

  const filtered = requests.filter(
    (r) => statusFilter === "전체" || r.status === statusFilter
  );

  const pendingCount = requests.filter((r) => r.status === "대기 중").length;
  const paidCount = requests.filter((r) => r.status === "결제 완료").length;
  const overdueCount = requests.filter((r) => r.status === "연체").length;
  const outstandingAmount = requests
    .filter((r) => r.status === "대기 중" || r.status === "연체")
    .reduce((sum, r) => sum + r.amount, 0);

  function handleSend() {
    const target = RENTAL_OPTIONS.find((r) => r.rentalId === sendRentalId)!;
    const newRequest: BillingRequest = {
      id: `bl${Date.now()}`,
      rentalId: target.rentalId,
      productName: target.productName,
      brand: target.brand,
      userId: target.userId,
      userName: target.userName,
      userEmail: target.userEmail,
      reason: sendReason,
      amount: Number(sendAmount),
      status: "대기 중",
      requestedAt: new Date().toISOString().slice(0, 10),
      dueDate: sendDueDate,
      memo: sendMemo || undefined,
    };
    setRequests((prev) => [newRequest, ...prev]);
    setSendOpen(false);
    setSendReason(BILLING_REASONS[0]);
    setSendAmount("");
    setSendDueDate("");
    setSendMemo("");
  }

  function handleCancel(id: string) {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "취소됨" } : r))
    );
    setCancelTarget(null);
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">추가 청구 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">
            렌탈 손상 / 연체 / 클리닝 등 추가 결제 요청 발송 및 이력 관리
          </p>
        </div>
        <Button size="sm" onClick={() => setSendOpen(true)}>+ 청구 발송</Button>
      </div>

      {/* 요약 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="대기 중" value={`${pendingCount}건`} highlight />
        <Stat label="연체" value={`${overdueCount}건`} highlight={overdueCount > 0} />
        <Stat label="결제 완료" value={`${paidCount}건`} />
        <Stat label="미수금 합계" value={`${outstandingAmount.toLocaleString()}원`} />
      </div>

      {/* 상태 필터 */}
      <div className="flex gap-2">
        {(["전체", "대기 중", "연체", "결제 완료", "취소됨"] as StatusFilter[]).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn(
              "px-3 h-8 text-xs border transition-colors",
              statusFilter === s
                ? "border-foreground bg-foreground text-background"
                : "border-border hover:bg-muted"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 목록 */}
      <div className="border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted">
            <tr className="text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">번호</th>
              <th className="px-4 py-3">렌탈 상품</th>
              <th className="px-4 py-3">회원</th>
              <th className="px-4 py-3">사유</th>
              <th className="px-4 py-3">금액</th>
              <th className="px-4 py-3">요청일</th>
              <th className="px-4 py-3">마감일</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-16 text-center text-[11px] text-muted-foreground">
                  해당하는 청구 내역이 없습니다.
                </td>
              </tr>
            ) : filtered.map((r) => (
              <tr
                key={r.id}
                className={cn(
                  "hover:bg-muted/30 transition-colors",
                  r.status === "취소됨" && "opacity-50"
                )}
              >
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{r.id}</td>
                <td className="px-4 py-3">
                  <div className="text-[11px] text-muted-foreground">{r.brand}</div>
                  <div className="font-medium">{r.productName}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{r.userName}</div>
                  <div className="text-[10px] text-muted-foreground">{r.userEmail}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{r.reason}</td>
                <td className="px-4 py-3 font-medium">{r.amount.toLocaleString()}원</td>
                <td className="px-4 py-3 text-muted-foreground">{r.requestedAt}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.dueDate}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant={STATUS_VARIANT[r.status]}
                    className={r.status === "연체" ? "bg-red-500 text-background border-red-500" : undefined}
                  >
                    {r.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link href={`/admin/billing/${r.id}`}>
                      <Button size="sm" variant="outline">보기</Button>
                    </Link>
                    {(r.status === "대기 중" || r.status === "연체") && (
                      <button
                        onClick={() => setCancelTarget(r)}
                        className="p-1.5 text-muted-foreground hover:text-foreground"
                        title="청구 취소"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 청구 발송 모달 */}
      {sendOpen && (
        <Modal title="추가 청구 발송" onClose={() => setSendOpen(false)}>
          <div className="space-y-4">
            <ModalField label="대상 렌탈">
              <select
                value={sendRentalId}
                onChange={(e) => setSendRentalId(e.target.value)}
                className="w-full h-9 border border-border px-3 text-xs bg-background outline-none focus:border-sage-ink"
              >
                {RENTAL_OPTIONS.map((r) => (
                  <option key={r.rentalId} value={r.rentalId}>
                    {r.rentalId} · {r.productName} ({r.userName})
                  </option>
                ))}
              </select>
            </ModalField>
            <ModalField label="청구 사유">
              <select
                value={sendReason}
                onChange={(e) => setSendReason(e.target.value)}
                className="w-full h-9 border border-border px-3 text-xs bg-background outline-none focus:border-sage-ink"
              >
                {BILLING_REASONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </ModalField>
            <ModalField label="청구 금액">
              <input
                type="number"
                min={0}
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                placeholder="예: 85000"
                className="w-full h-9 border border-border px-3 text-xs bg-background outline-none focus:border-sage-ink"
              />
            </ModalField>
            <ModalField label="납부 마감일">
              <input
                type="date"
                value={sendDueDate}
                onChange={(e) => setSendDueDate(e.target.value)}
                className="w-full h-9 border border-border px-3 text-xs bg-background outline-none focus:border-sage-ink"
              />
            </ModalField>
            <ModalField label="메모 (선택)">
              <input
                value={sendMemo}
                onChange={(e) => setSendMemo(e.target.value)}
                placeholder="예: 회수 검수 중 손상 확인"
                className="w-full h-9 border border-border px-3 text-xs bg-background outline-none focus:border-sage-ink"
              />
            </ModalField>
          </div>
          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setSendOpen(false)}>취소</Button>
            <Button
              className="flex-1"
              disabled={!sendAmount || Number(sendAmount) <= 0 || !sendDueDate}
              onClick={handleSend}
            >
              발송
            </Button>
          </div>
        </Modal>
      )}

      {/* 청구 취소 확인 모달 */}
      {cancelTarget && (
        <Modal title="청구 취소" onClose={() => setCancelTarget(null)}>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">{cancelTarget.userName}</span>님에게 발송된
            {" "}<span className="font-semibold text-foreground">"{cancelTarget.reason}"</span> 청구
            ({cancelTarget.amount.toLocaleString()}원)를 취소합니다.
            취소 후에는 사용자가 결제할 수 없습니다.
          </p>
          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setCancelTarget(null)}>돌아가기</Button>
            <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={() => handleCancel(cancelTarget.id)}>취소 확정</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="border border-border p-4">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className={cn("text-base font-bold mt-1.5", highlight && "text-sage-ink")}>{value}</div>
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-md p-6 space-y-1 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">{title}</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ModalField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] text-muted-foreground mb-1">{label}</div>
      {children}
    </div>
  );
}
