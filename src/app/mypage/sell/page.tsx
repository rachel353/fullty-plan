"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ImageBox } from "@/components/ImageBox";
import { sellRequests } from "@/lib/mock";
import { cn } from "@/lib/utils";

const steps = [
  "접수 완료",
  "배송비 결제 완료",
  "픽업 대기",
  "픽업 완료",
  "검수 중",
  "최종 금액 제안",
  "계약 완료",
];

const OFFERED_PRICES: Record<string, number> = {
  s002: 880000,
};

const REJECT_REASONS = [
  "제안 금액이 너무 낮음",
  "개인 사정으로 판매 취소",
  "다른 채널에서 거래 예정",
  "기타",
];

type SellItemStatus = "idle" | "accepted" | "rejected";

export default function MySellPage() {
  const [itemStatuses, setItemStatuses] = useState<Record<string, SellItemStatus>>({});
  const [rejectOpen, setRejectOpen] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  function accept(id: string) {
    setItemStatuses((prev) => ({ ...prev, [id]: "accepted" }));
  }

  function reject(id: string) {
    setItemStatuses((prev) => ({ ...prev, [id]: "rejected" }));
    setRejectOpen(null);
    setRejectReason("");
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">SELL 내역</h2>
      </div>

      <div className="space-y-4">
        {sellRequests.map((s) => {
          const currentStep = steps.indexOf(s.status);
          const isOffer = s.status === "최종 금액 제안";
          const offeredPrice = OFFERED_PRICES[s.id];
          const itemStatus = itemStatuses[s.id] ?? "idle";

          return (
            <div key={s.id} className="border border-border p-5">
              <div className="flex gap-5">
                <ImageBox className="w-24 h-24 flex-shrink-0" ratio="square" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={s.type === "위탁" ? "outline" : "default"}>{s.type}</Badge>
                    <span className="text-[11px] text-muted-foreground">{s.id}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground">{s.brand}</div>
                  <div className="text-sm font-semibold">{s.model}</div>
                  <div className="text-xs text-muted-foreground mt-1">신청일 {s.createdAt}</div>

                  {/* 최종 금액 제안 단계에만 가격 표시 */}
                  {isOffer && offeredPrice && itemStatus === "idle" && (
                    <div className="mt-2 text-[11px] text-muted-foreground">
                      예상가 <span className="line-through">{s.estimated.toLocaleString()}원</span>
                    </div>
                  )}
                  {isOffer && itemStatus === "accepted" && (
                    <div className="mt-2 text-sm font-bold text-sage-ink">
                      {offeredPrice?.toLocaleString()}원 · 수락 완료
                    </div>
                  )}
                  {isOffer && itemStatus === "rejected" && (
                    <div className="mt-2 text-sm text-muted-foreground">거절됨</div>
                  )}
                </div>
              </div>

              {/* 진행 스텝 */}
              <div className="mt-5 pt-5 border-t border-border">
                <div className="grid grid-cols-7 gap-1">
                  {steps.map((step, i) => (
                    <div key={step} className="text-center">
                      <div className={cn("h-1", i <= currentStep ? "bg-foreground" : "bg-muted")} />
                      <div className={cn(
                        "text-[10px] mt-2",
                        i === currentStep ? "font-semibold text-foreground" : "text-muted-foreground"
                      )}>
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 최종 금액 제안 — 수락/거절 UX */}
              {isOffer && itemStatus === "idle" && offeredPrice && (
                <div className="mt-5 pt-5 border-t border-border space-y-4">
                  {/* 금액 카드 */}
                  <div className="border border-border px-5 py-4 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-[10px] text-muted-foreground tracking-widest uppercase">풀티 최종 제안가</div>
                      <div className="text-2xl font-bold">{offeredPrice.toLocaleString()}원</div>
                      <div className="text-[11px] text-muted-foreground">
                        예상가 {s.estimated.toLocaleString()}원 대비{" "}
                        <span className={offeredPrice >= s.estimated ? "text-sage-ink" : "text-red-400"}>
                          {offeredPrice >= s.estimated ? "+" : ""}
                          {(offeredPrice - s.estimated).toLocaleString()}원
                        </span>
                      </div>
                    </div>
                    <div className="text-right space-y-0.5">
                      <div className="text-[10px] text-muted-foreground">수수료 15% 제외</div>
                      <div className="text-sm font-semibold">{Math.round(offeredPrice * 0.85).toLocaleString()}원 수령</div>
                    </div>
                  </div>

                  {/* 액션 */}
                  <div className="space-y-2">
                    <Button className="w-full h-11" onClick={() => accept(s.id)}>
                      이 금액으로 수락
                    </Button>

                    {rejectOpen === s.id ? (
                      <div className="border border-border p-4 space-y-3">
                        <div className="text-xs font-medium text-muted-foreground">거절 사유 선택</div>
                        <div className="space-y-1.5">
                          {REJECT_REASONS.map((r) => (
                            <button
                              key={r}
                              onClick={() => setRejectReason(r)}
                              className={cn(
                                "w-full text-left px-3 py-2 text-sm border transition-colors",
                                rejectReason === r
                                  ? "border-foreground bg-foreground text-background"
                                  : "border-border hover:bg-muted"
                              )}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          거절 후 운영팀이 재제안을 드릴 수 있습니다. 채널톡으로 연락드립니다.
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1" onClick={() => { setRejectOpen(null); setRejectReason(""); }}>
                            취소
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1 text-red-500 border-red-200 hover:bg-red-50"
                            disabled={!rejectReason}
                            onClick={() => reject(s.id)}
                          >
                            거절 확정
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full h-11 text-muted-foreground"
                        onClick={() => setRejectOpen(s.id)}
                      >
                        거절
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* 수락 완료 배너 */}
              {isOffer && itemStatus === "accepted" && (
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-4 space-y-1">
                    <div className="text-sm font-semibold">수락 완료</div>
                    <div className="text-[11px] text-muted-foreground">
                      계약이 진행됩니다. 풀티에서 순서대로 안내드립니다.
                    </div>
                  </div>
                </div>
              )}

              {/* 거절 완료 배너 */}
              {isOffer && itemStatus === "rejected" && (
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="border border-border px-5 py-4 space-y-1">
                    <div className="text-sm text-muted-foreground">거절 처리되었습니다.</div>
                    <div className="text-[11px] text-muted-foreground">
                      운영팀이 재제안 여부를 검토 후 채널톡으로 연락드립니다.
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
