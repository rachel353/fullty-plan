"use client";

import { useState } from "react";
import { ImageBox } from "@/components/ImageBox";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

const rentals = [
  {
    id: "r001",
    brand: "Fritz Hansen",
    name: "Egg Chair",
    period: "2026-03-15 ~ 2026-04-13",
    daysLeft: 3,
    extended: 0,
    rentalFee: 850000,
    originalPrice: 6500000,
  },
  {
    id: "r002",
    brand: "Cassina",
    name: "LC4 Chaise Longue",
    period: "2026-03-25 ~ 2026-04-23",
    daysLeft: 13,
    extended: 1,
    rentalFee: 1240000,
    originalPrice: 5400000,
  },
];

type ReturnMethod = "pickup" | "direct" | null;
type ExtendDays = 30 | 60 | 90;

const extendOptions: { days: ExtendDays; label: string }[] = [
  { days: 30, label: "30일 연장" },
  { days: 60, label: "60일 연장" },
  { days: 90, label: "90일 연장 (최대)" },
];

function calcExtendFee(originalPrice: number, days: ExtendDays) {
  if (days <= 30) return Math.ceil((originalPrice * 0.00609 * days) / 100) * 100;
  if (days <= 60) return Math.ceil((originalPrice * 0.0046 * days) / 100) * 100;
  return Math.ceil((originalPrice * 0.00307 * days) / 100) * 100;
}

export default function RentalsPage() {
  // Return modal
  const [returnModal, setReturnModal] = useState<string | null>(null);
  const [returnMethod, setReturnMethod] = useState<ReturnMethod>(null);
  const [returnDone, setReturnDone] = useState<Set<string>>(new Set());

  // Extend modal
  const [extendModal, setExtendModal] = useState<string | null>(null);
  const [extendDays, setExtendDays] = useState<ExtendDays>(30);
  const [extendDone, setExtendDone] = useState<Record<string, ExtendDays>>({});

  // Purchase modal
  const [purchaseModal, setPurchaseModal] = useState<string | null>(null);
  const [purchaseMethod, setPurchaseMethod] = useState("카드");
  const [purchaseDone, setPurchaseDone] = useState<Set<string>>(new Set());
  const [purchasePhase, setPurchasePhase] = useState<"idle" | "processing" | "done">("idle");

  function openReturn(id: string) {
    setReturnMethod(null);
    setReturnModal(id);
  }
  function handleReturnConfirm() {
    if (!returnModal || !returnMethod) return;
    setReturnDone((prev) => new Set(prev).add(returnModal));
    setReturnModal(null);
  }

  function openExtend(id: string) {
    setExtendDays(30);
    setExtendModal(id);
  }
  function handleExtendConfirm() {
    if (!extendModal) return;
    setExtendDone((prev) => ({ ...prev, [extendModal]: extendDays }));
    setExtendModal(null);
  }

  function openPurchase(id: string) {
    setPurchaseMethod("카드");
    setPurchasePhase("idle");
    setPurchaseModal(id);
  }
  function handlePurchase() {
    if (!purchaseModal) return;
    setPurchasePhase("processing");
    setTimeout(() => {
      setPurchasePhase("done");
      setTimeout(() => {
        setPurchaseDone((prev) => new Set(prev).add(purchaseModal));
        setPurchaseModal(null);
        setPurchasePhase("idle");
      }, 800);
    }, 1600);
  }

  const getRental = (id: string) => rentals.find((r) => r.id === id);

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <h2 className="text-xl font-bold">렌탈 중인 상품</h2>
        <div className="text-xs text-muted-foreground">기본 최대 90일 · 연장 시 추가 최대 90일</div>
      </div>

      <div className="space-y-4">
        {rentals.map((r) => {
          const isDone = returnDone.has(r.id);
          const isPurchased = purchaseDone.has(r.id);
          const extendedDays = extendDone[r.id];

          return (
            <div key={r.id} className="border border-border p-5">
              <div className="flex gap-5">
                <ImageBox className="w-32 h-32 flex-shrink-0" ratio="square" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {isPurchased ? (
                      <Badge variant="default">구매 전환 완료</Badge>
                    ) : isDone ? (
                      <Badge variant="muted">반납 신청 완료</Badge>
                    ) : (
                      <Badge variant="outline">렌탈 중</Badge>
                    )}
                    {r.extended > 0 && !extendedDays && (
                      <Badge variant="default">연장 {r.extended}차</Badge>
                    )}
                    {extendedDays && (
                      <Badge variant="default">연장 +{extendedDays}일</Badge>
                    )}
                  </div>
                  <div className="text-[11px] text-muted-foreground">{r.brand}</div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{r.period}</div>
                  <div className="text-xs text-muted-foreground">렌탈료 {r.rentalFee.toLocaleString()}원</div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
                      <span>종료까지</span>
                      <span className="font-medium text-foreground">D-{r.daysLeft}</span>
                    </div>
                    <div className="h-1 bg-muted">
                      <div className="h-1 bg-foreground" style={{ width: `${100 - (r.daysLeft / 30) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {r.daysLeft <= 7 && !isDone && !isPurchased && (
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="text-xs font-semibold mb-3">종료 후 다음 단계 선택</div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={r.extended >= 1 && !extendDone[r.id]}
                      onClick={() => openExtend(r.id)}
                    >
                      {extendDone[r.id] ? `+${extendDone[r.id]}일 연장됨` : "연장하기"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openPurchase(r.id)}>
                      구매 전환 (차액 결제)
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openReturn(r.id)}>
                      반납하기
                    </Button>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                    연장은 추가 최대 90일까지 가능하며, 연장 이후에는 구매 전환 또는 반납만
                    가능합니다. 구매 전환 시 <strong>렌탈 시작 시점 판매가 - 누적 렌탈료</strong>를
                    즉시 결제하면 소유권이 이전됩니다.
                  </p>
                </div>
              )}

              {(isDone || isPurchased) && (
                <div className="mt-5 pt-5 border-t border-border text-[12px] text-muted-foreground">
                  {isDone && "반납 신청이 접수되었습니다. 안내 문자를 확인해 주세요."}
                  {isPurchased && "구매 전환이 완료되었습니다. 자산 리포트에 등록됩니다."}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── 연장하기 모달 ── */}
      <Modal open={extendModal !== null} onClose={() => setExtendModal(null)} title="렌탈 연장">
        {(() => {
          const r = getRental(extendModal ?? "");
          if (!r) return null;
          return (
            <div className="p-6 space-y-5">
              <div className="space-y-1">
                <div className="text-[11px] text-muted-foreground">{r.brand}</div>
                <div className="text-sm font-semibold">{r.name}</div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  현재 렌탈 기간: {r.period}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-2">연장 기간 선택</div>
                <div className="space-y-2">
                  {extendOptions.map((opt) => {
                    const fee = calcExtendFee(r.originalPrice, opt.days);
                    return (
                      <button
                        key={opt.days}
                        onClick={() => setExtendDays(opt.days)}
                        className={cn(
                          "w-full text-left border p-4 transition-colors",
                          extendDays === opt.days
                            ? "border-sage-ink bg-sage-soft/40"
                            : "border-border hover:bg-muted/40"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-4 h-4 rounded-full border-2 flex-shrink-0",
                              extendDays === opt.days ? "border-sage-ink bg-sage-ink" : "border-border"
                            )} />
                            <span className="text-sm font-medium text-sage-ink">{opt.label}</span>
                          </div>
                          <span className="text-sm font-semibold">{fee.toLocaleString()}원</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-sage-soft/30 border border-sage/30 p-3 text-[11px] text-sage-ink leading-relaxed">
                연장 후 총 렌탈 기간이 180일을 초과할 수 없습니다. 연장은 1회에 한합니다.
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setExtendModal(null)}>
                  취소
                </Button>
                <Button size="sm" className="flex-1" onClick={handleExtendConfirm}>
                  {calcExtendFee(r.originalPrice, extendDays).toLocaleString()}원 결제하고 연장
                </Button>
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* ── 구매 전환 모달 ── */}
      <Modal open={purchaseModal !== null} onClose={() => purchasePhase === "idle" && setPurchaseModal(null)} title="구매 전환 (차액 결제)">
        {(() => {
          const r = getRental(purchaseModal ?? "");
          if (!r) return null;
          const diff = Math.max(r.originalPrice - r.rentalFee, 0);
          return (
            <div className="p-6 space-y-5">
              <div className="space-y-1">
                <div className="text-[11px] text-muted-foreground">{r.brand}</div>
                <div className="text-sm font-semibold">{r.name}</div>
              </div>

              {/* 차액 계산 */}
              <div className="border border-border divide-y divide-border text-sm">
                <div className="flex justify-between px-4 py-3">
                  <span className="text-muted-foreground">렌탈 시작 시점 판매가</span>
                  <span>{r.originalPrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between px-4 py-3">
                  <span className="text-muted-foreground">누적 렌탈료</span>
                  <span className="text-sage-deep">- {r.rentalFee.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between px-4 py-3 font-semibold">
                  <span>최종 결제 차액</span>
                  <span className="font-display text-lg text-sage-ink">{diff.toLocaleString()}원</span>
                </div>
              </div>

              {/* 결제 수단 */}
              <div>
                <div className="text-xs text-muted-foreground mb-2">결제 수단</div>
                <div className="grid grid-cols-2 gap-2">
                  {["카드", "계좌이체", "네이버페이", "카카오페이"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setPurchaseMethod(m)}
                      className={cn(
                        "h-10 text-xs border transition-colors",
                        purchaseMethod === m
                          ? "border-sage-ink bg-sage-ink text-background"
                          : "border-border hover:bg-muted"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-sage-soft/30 border border-sage/30 p-3 text-[11px] text-sage-ink leading-relaxed">
                구매 전환 완료 시 소유권이 이전되며 자산 리포트에 자동 등록됩니다.
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setPurchaseModal(null)} disabled={purchasePhase !== "idle"}>
                  취소
                </Button>
                <Button size="sm" className="flex-1" onClick={handlePurchase} disabled={purchasePhase !== "idle"}>
                  {purchasePhase === "idle" && `${diff.toLocaleString()}원 결제하기`}
                  {purchasePhase === "processing" && "결제 처리 중..."}
                  {purchasePhase === "done" && "결제 완료"}
                </Button>
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* ── 반납 모달 ── */}
      <Modal open={returnModal !== null} onClose={() => setReturnModal(null)} title="반납하기">
        <div className="p-6 space-y-5">
          <div className="text-sm text-muted-foreground">반납 방법을 선택해 주세요.</div>
          <div className="space-y-2">
            {[
              { id: "pickup" as ReturnMethod, label: "Fullty 픽업 회수", desc: "담당자가 직접 방문하여 수거합니다. (서울 · 경기 지역)" },
              { id: "direct" as ReturnMethod, label: "직접 반납", desc: "Fullty 성수 쇼룸에 직접 방문하여 반납합니다. · 평일 10:00–18:00" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setReturnMethod(opt.id)}
                className={cn(
                  "w-full text-left border p-4 transition-colors",
                  returnMethod === opt.id ? "border-sage-ink bg-sage-soft/40" : "border-border hover:bg-muted/40"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 flex-shrink-0",
                    returnMethod === opt.id ? "border-sage-ink bg-sage-ink" : "border-border"
                  )} />
                  <div>
                    <div className="text-sm font-medium text-sage-ink">{opt.label}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{opt.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {returnMethod === "pickup" && (
            <div className="bg-sage-soft/30 border border-sage/30 p-3 text-[11px] text-sage-ink">
              픽업 일정은 신청 후 담당자가 채널톡으로 안내드립니다.
            </div>
          )}
          {returnMethod === "direct" && (
            <div className="bg-sage-soft/30 border border-sage/30 p-3 text-[11px] text-sage-ink">
              서울특별시 성동구 성수이로 · 방문 전 02-xxxx-1234로 예약해 주세요.
            </div>
          )}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => setReturnModal(null)}>취소</Button>
            <Button size="sm" className="flex-1" disabled={!returnMethod} onClick={handleReturnConfirm}>반납 신청</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
