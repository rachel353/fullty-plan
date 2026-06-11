"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Check, X, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { INITIAL_PENDING } from "@/lib/money";

const MEMBER_EMAILS: Record<string, string> = {
  m001: "kimfullty@gmail.com",
  m002: "leeg@kakao.com",
  m003: "park@gmail.com",
};

export default function MoneyApprovalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const item = INITIAL_PENDING.find((p) => p.id === id);

  const [confirmType, setConfirmType] = useState<"approve" | "reject" | null>(null);
  const [processed, setProcessed] = useState<"approve" | "reject" | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!item) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        항목을 찾을 수 없습니다.
        <Link href="/admin/money" className="block mt-3 text-sage-ink underline">목록으로</Link>
      </div>
    );
  }

  function handleConfirm() {
    if (!confirmType) return;
    setProcessed(confirmType);
    setConfirmType(null);
    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 2000);
  }

  return (
    <div className="space-y-8 max-w-xl">
      {/* 헤더 */}
      <div className="border-b border-border pb-4">
        <Link href="/admin/money" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 풀티머니 관리
        </Link>
        <h2 className="text-xl font-bold">적립 승인 대기 상세</h2>
        <p className="text-[11px] text-muted-foreground mt-1">{item.id}</p>
      </div>

      {/* 처리 완료 */}
      {showBanner && (
        <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-3 text-sm font-medium">
          처리되었습니다.
        </div>
      )}

      {/* 상세 정보 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">신청 정보</div>
        <dl className="text-[11px] text-muted-foreground border border-border divide-y divide-border">
          <div className="flex justify-between px-3 py-2">
            <dt>회원</dt>
            <dd className="text-foreground">
              {item.member} ({item.memberId})
              {MEMBER_EMAILS[item.memberId] ? ` · ${MEMBER_EMAILS[item.memberId]}` : ""}
            </dd>
          </div>
          <div className="flex justify-between px-3 py-2">
            <dt>적립 사유</dt>
            <dd className="text-foreground">{item.reason}</dd>
          </div>
          <div className="flex justify-between px-3 py-2">
            <dt>관련 주문</dt>
            <dd className="text-foreground">{item.orderId}</dd>
          </div>
          <div className="flex justify-between px-3 py-2">
            <dt>신청일</dt>
            <dd className="text-foreground">{item.date}</dd>
          </div>
          <div className="flex justify-between px-3 py-2">
            <dt>적립 예정 금액</dt>
            <dd className="text-foreground">+{item.amount.toLocaleString()}원</dd>
          </div>
          <div className="flex justify-between px-3 py-2">
            <dt>만료 예정일</dt>
            <dd className="text-foreground">{item.expiresAt}</dd>
          </div>
        </dl>
      </section>

      {/* 리뷰 내용 */}
      <section className="space-y-1.5">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">리뷰 내용</div>
        <div className="border border-border p-3 text-sm leading-relaxed bg-muted/30">
          {item.reviewText}
        </div>
        <div className="flex gap-3 text-[11px] text-muted-foreground">
          <span>글자수 {item.reviewText.length}자</span>
          <span>첨부 이미지 {item.reviewImages}장</span>
        </div>
        {item.reviewImages > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: item.reviewImages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="aspect-square border border-border bg-muted flex items-center justify-center hover:border-sage-ink transition-colors"
              >
                <ImageIcon size={20} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 처리 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">처리</div>
        {processed ? (
          <Badge variant={processed === "approve" ? "sage" : "muted"}>
            {processed === "approve" ? "승인 완료" : "거절 완료"}
          </Badge>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 border-red-400 text-red-500 hover:bg-red-50"
              onClick={() => setConfirmType("reject")}
            >
              <X size={12} className="mr-1" /> 거절
            </Button>
            <Button className="flex-1" onClick={() => setConfirmType("approve")}>
              <Check size={12} className="mr-1" /> 승인
            </Button>
          </div>
        )}
      </section>

      <div className="border-t border-border pt-6 flex justify-end">
        <Link href="/admin/money"><Button variant="outline">목록으로</Button></Link>
      </div>

      {/* 승인/거절 확인 모달 */}
      {confirmType && (
        <Modal
          title={confirmType === "approve" ? "적립 승인" : "적립 거절"}
          onClose={() => setConfirmType(null)}
        >
          {confirmType === "approve" ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">{item.member}</span>님의{" "}
                <span className="font-semibold text-foreground">&quot;{item.reason}&quot;</span> 적립 요청을
                승인합니다. 회원 잔액에{" "}
                <span className="font-semibold text-foreground">+{item.amount.toLocaleString()}원</span>
                이 적립되고, 적립/사용 이력에 기록됩니다.
              </p>
              <dl className="text-[11px] text-muted-foreground border border-border divide-y divide-border">
                <div className="flex justify-between px-3 py-2">
                  <dt>관련 주문</dt>
                  <dd className="text-foreground">{item.orderId}</dd>
                </div>
                <div className="flex justify-between px-3 py-2">
                  <dt>만료 예정일</dt>
                  <dd className="text-foreground">{item.expiresAt}</dd>
                </div>
              </dl>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">{item.member}</span>님의{" "}
              <span className="font-semibold text-foreground">&quot;{item.reason}&quot;</span> 적립 요청
              (+{item.amount.toLocaleString()}원)을 거절합니다. 거절된 요청은 복구할 수 없습니다.
            </p>
          )}
          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setConfirmType(null)}>
              취소
            </Button>
            {confirmType === "approve" ? (
              <Button className="flex-1" onClick={handleConfirm}>승인</Button>
            ) : (
              <Button
                className="flex-1 border-red-400 bg-red-500 text-white hover:bg-red-600 hover:border-red-500"
                onClick={handleConfirm}
              >
                거절
              </Button>
            )}
          </div>
        </Modal>
      )}

      {/* 이미지 라이트박스 */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setLightboxIndex(null)} />
          <div className="relative z-10 flex items-center gap-4">
            <button
              onClick={() => setLightboxIndex((i) => (i! - 1 + item.reviewImages) % item.reviewImages)}
              disabled={item.reviewImages <= 1}
              className="text-white hover:text-sage-soft disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="space-y-2">
              <div className="w-72 h-72 border border-border bg-muted flex items-center justify-center">
                <ImageIcon size={48} className="text-muted-foreground" />
              </div>
              <div className="text-center text-xs text-white">
                사진 {lightboxIndex + 1} / {item.reviewImages}
              </div>
            </div>
            <button
              onClick={() => setLightboxIndex((i) => (i! + 1) % item.reviewImages)}
              disabled={item.reviewImages <= 1}
              className="text-white hover:text-sage-soft disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
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
        </div>
        {children}
      </div>
    </div>
  );
}
