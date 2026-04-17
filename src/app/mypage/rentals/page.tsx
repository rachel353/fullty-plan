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
  },
  {
    id: "r002",
    brand: "Cassina",
    name: "LC4 Chaise Longue",
    period: "2026-03-25 ~ 2026-04-23",
    daysLeft: 13,
    extended: 1,
    rentalFee: 1240000,
  },
];

type ReturnMethod = "pickup" | "direct" | null;

export default function RentalsPage() {
  const [returnModal, setReturnModal] = useState<string | null>(null); // rental id
  const [returnMethod, setReturnMethod] = useState<ReturnMethod>(null);
  const [returnDone, setReturnDone] = useState<Set<string>>(new Set());

  function openReturn(id: string) {
    setReturnMethod(null);
    setReturnModal(id);
  }

  function handleReturnConfirm() {
    if (!returnModal || !returnMethod) return;
    setReturnDone((prev) => new Set(prev).add(returnModal));
    setReturnModal(null);
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <h2 className="text-xl font-bold">렌탈 중인 상품</h2>
        <div className="text-xs text-muted-foreground">
          기본 최대 90일 · 연장 시 추가 최대 90일
        </div>
      </div>

      <div className="space-y-4">
        {rentals.map((r) => (
          <div key={r.id} className="border border-border p-5">
            <div className="flex gap-5">
              <ImageBox className="w-32 h-32 flex-shrink-0" ratio="square" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">렌탈 중</Badge>
                  {r.extended > 0 && <Badge variant="default">연장 {r.extended}차</Badge>}
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
                    <div
                      className="h-1 bg-foreground"
                      style={{ width: `${100 - (r.daysLeft / 30) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {r.daysLeft <= 7 && (
              <div className="mt-5 pt-5 border-t border-border">
                <div className="text-xs font-semibold mb-3">종료 후 다음 단계 선택</div>
                {returnDone.has(r.id) ? (
                  <div className="text-[12px] text-muted-foreground border border-border px-4 py-3">
                    반납 신청이 접수되었습니다. 안내 문자를 확인해 주세요.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" disabled={r.extended >= 1}>
                      연장하기
                    </Button>
                    <Button variant="outline" size="sm">
                      구매 전환 (차액 결제)
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openReturn(r.id)}>
                      반납하기
                    </Button>
                  </div>
                )}
                <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                  연장은 추가 최대 90일까지 가능하며, 연장 이후에는 구매 전환 또는 반납만
                  가능합니다. 구매 전환 시 <strong>렌탈 시작 시점 판매가 - 누적 렌탈료</strong>를
                  즉시 결제하면 소유권이 이전되고 자산화 등록이 가능합니다.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 반납 모달 */}
      <Modal
        open={returnModal !== null}
        onClose={() => setReturnModal(null)}
        title="반납하기"
      >
        <div className="p-6 space-y-5">
          <div className="text-sm text-muted-foreground">반납 방법을 선택해 주세요.</div>

          <div className="space-y-2">
            {[
              {
                id: "pickup" as ReturnMethod,
                label: "Fullty 픽업 회수",
                desc: "담당자가 직접 방문하여 수거합니다. (서울 · 경기 지역)",
              },
              {
                id: "direct" as ReturnMethod,
                label: "직접 반납",
                desc: "Fullty 성수 쇼룸에 직접 방문하여 반납합니다. · 평일 10:00–18:00",
              },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setReturnMethod(opt.id)}
                className={cn(
                  "w-full text-left border p-4 transition-colors",
                  returnMethod === opt.id
                    ? "border-sage-ink bg-sage-soft/40"
                    : "border-border hover:bg-muted/40"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2 flex-shrink-0",
                      returnMethod === opt.id
                        ? "border-sage-ink bg-sage-ink"
                        : "border-border"
                    )}
                  />
                  <div>
                    <div className="text-sm font-medium text-sage-ink">{opt.label}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{opt.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {returnMethod === "pickup" && (
            <div className="bg-sage-soft/30 border border-sage/30 p-3 text-[11px] text-sage-ink leading-relaxed">
              픽업 일정은 신청 후 담당자가 채널톡으로 안내드립니다.
            </div>
          )}
          {returnMethod === "direct" && (
            <div className="bg-sage-soft/30 border border-sage/30 p-3 text-[11px] text-sage-ink leading-relaxed">
              서울특별시 성동구 성수이로 · 방문 전 02-xxxx-1234로 예약해 주세요.
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => setReturnModal(null)}>
              취소
            </Button>
            <Button
              size="sm"
              className="flex-1"
              disabled={!returnMethod}
              onClick={handleReturnConfirm}
            >
              반납 신청
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
