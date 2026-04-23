"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Pencil, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { settlements } from "@/lib/mock";

export default function SettlementDetailPage() {
  const { id } = useParams<{ id: string }>();
  const original = settlements.find((s) => s.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState(original?.memo ?? "");
  const [draftMemo, setDraftMemo] = useState(original?.memo ?? "");

  if (!original) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        정산 내역을 찾을 수 없습니다.
        <Link href="/seller/settlements" className="block mt-3 text-sage-ink underline">
          정산 내역으로 돌아가기
        </Link>
      </div>
    );
  }

  function startEdit() {
    setDraftMemo(memo);
    setIsEditing(true);
  }

  function cancelEdit() {
    setDraftMemo(memo);
    setIsEditing(false);
  }

  function saveEdit() {
    setMemo(draftMemo);
    setIsEditing(false);
  }

  const isCompleted = original.status === "정산 완료";

  return (
    <div className="space-y-8 max-w-2xl">
      {/* 헤더 */}
      <div className="border-b border-border pb-4">
        <Link
          href="/seller/settlements"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors"
        >
          <ChevronLeft size={13} /> 정산 내역
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">정산 상세</h2>
            <p className="text-[11px] text-muted-foreground mt-1">{original.id} · {original.period} 정산</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isCompleted ? "default" : "outline"}>{original.status}</Badge>
            {!isEditing ? (
              <button
                onClick={startEdit}
                className="flex items-center gap-1.5 px-3 h-8 border border-border text-xs hover:bg-muted transition-colors"
              >
                <Pencil size={11} /> 수정
              </button>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-1 px-3 h-8 border border-border text-xs hover:bg-muted transition-colors"
                >
                  <X size={11} /> 취소
                </button>
                <button
                  onClick={saveEdit}
                  className="flex items-center gap-1 px-3 h-8 border border-sage-ink bg-sage-ink text-background text-xs transition-colors"
                >
                  <Check size={11} /> 저장
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 정산 금액 요약 */}
      <section>
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">정산 금액</div>
        <div className="grid grid-cols-3 gap-3">
          <div className="border border-border px-4 py-4">
            <div className="text-[11px] text-muted-foreground mb-1">판매가</div>
            <div className="text-lg font-bold">{original.sale.toLocaleString()}원</div>
          </div>
          <div className="border border-border px-4 py-4">
            <div className="text-[11px] text-muted-foreground mb-1">수수료 (15%)</div>
            <div className="text-lg font-bold text-muted-foreground">−{original.fee.toLocaleString()}원</div>
          </div>
          <div className="border border-sage-deep/40 px-4 py-4 bg-sage-soft/10">
            <div className="text-[11px] text-sage-deep mb-1">실 정산액</div>
            <div className="text-lg font-bold text-sage-deep">{original.payout.toLocaleString()}원</div>
          </div>
        </div>
      </section>

      {/* 상품 정보 */}
      <section>
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">상품 정보</div>
        <div className="border border-border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] text-muted-foreground">{original.brand}</div>
              <div className="font-semibold">{original.name}</div>
            </div>
            <Badge variant="outline">{original.type}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border text-sm">
            <InfoItem label="주문 ID" value={original.orderId} />
            <InfoItem label="정산 기간" value={original.period} />
          </div>
        </div>
      </section>

      {/* 정산 계좌 */}
      <section>
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">정산 계좌</div>
        {isEditing ? (
          <div className="border border-sage-ink/40 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <EditField label="은행" defaultValue={original.bank ?? ""} disabled />
              <EditField label="계좌번호" defaultValue={original.accountNo ?? ""} disabled />
            </div>
            <p className="text-[11px] text-muted-foreground">
              계좌 변경은 <Link href="/seller/settings" className="text-sage-ink underline">셀러 설정</Link>에서 할 수 있습니다.
            </p>
          </div>
        ) : (
          <div className="border border-border p-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <InfoItem label="은행" value={original.bank ?? "—"} />
              <InfoItem label="계좌번호" value={original.accountNo ?? "—"} />
            </div>
          </div>
        )}
      </section>

      {/* 정산 일정 */}
      {isCompleted && original.settledAt && (
        <section>
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">정산 완료</div>
          <div className="border border-border p-4 flex items-center gap-3 text-sm">
            <div className="w-6 h-6 bg-sage-deep flex items-center justify-center flex-shrink-0">
              <Check size={12} className="text-background" />
            </div>
            <div>
              <span className="font-medium">{original.settledAt}</span>
              <span className="text-muted-foreground ml-2">지급 완료</span>
            </div>
          </div>
        </section>
      )}

      {/* 비고 */}
      <section>
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">비고</div>
        {isEditing ? (
          <textarea
            value={draftMemo}
            onChange={(e) => setDraftMemo(e.target.value)}
            placeholder="정산 관련 메모를 입력하세요."
            rows={4}
            className="w-full border border-sage-ink/40 px-4 py-3 text-sm bg-transparent resize-none focus:outline-none transition-colors"
          />
        ) : (
          <div className={cn(
            "border border-border px-4 py-3 text-sm min-h-[80px]",
            !memo && "text-muted-foreground"
          )}>
            {memo || "입력된 비고 없음"}
          </div>
        )}
      </section>

      {/* 이의 제기 */}
      {!isEditing && (
        <section className="border-t border-border pt-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium">정산 내역 이의 제기</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">금액이 잘못되었다면 풀티에 문의하세요.</div>
            </div>
            <Button variant="outline" size="sm">이의 제기</Button>
          </div>
        </section>
      )}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] text-muted-foreground mb-0.5">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function EditField({ label, defaultValue, disabled }: { label: string; defaultValue: string; disabled?: boolean }) {
  return (
    <div>
      <label className="text-[11px] text-muted-foreground mb-1 block">{label}</label>
      <input
        defaultValue={defaultValue}
        disabled={disabled}
        className="w-full border border-border h-9 px-3 text-sm bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
}
