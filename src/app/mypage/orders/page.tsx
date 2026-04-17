"use client";

import { useState } from "react";
import { ImageBox } from "@/components/ImageBox";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { orders, type Order } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

type ModalType = "delivery" | "confirm" | "review" | "cancel" | null;

const trackingSteps = [
  { date: "2026.04.08 14:32", label: "배송 출발", sub: "서울 동작구 허브 터미널", done: true },
  { date: "2026.04.09 08:15", label: "배달기사 인수", sub: "배달기사 이동 중", done: true },
  { date: "2026.04.09 중", label: "배달 예정", sub: "오늘 배달 완료 예정", done: false },
];

export default function OrdersPage() {
  const [modal, setModal] = useState<ModalType>(null);
  const [selected, setSelected] = useState<Order | null>(null);
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [confirmed, setConfirmed] = useState<Set<string>>(new Set());
  const [reviewed, setReviewed] = useState<Set<string>>(new Set());
  const [cancelled, setCancelled] = useState<Set<string>>(new Set());

  function open(type: ModalType, order: Order) {
    setSelected(order);
    setModal(type);
  }
  function close() {
    setModal(null);
    setSelected(null);
  }

  function handleConfirm() {
    if (!selected) return;
    setConfirmed((prev) => new Set(prev).add(selected.id));
    close();
  }
  function handleReview() {
    if (!selected) return;
    setReviewed((prev) => new Set(prev).add(selected.id));
    setReviewText("");
    setReviewStars(5);
    close();
  }

  function handleCancel() {
    if (!selected) return;
    setCancelled((prev) => new Set(prev).add(selected.id));
    close();
  }

  function statusBadgeVariant(status: Order["status"]): "default" | "outline" | "muted" {
    if (status === "취소") return "muted";
    if (status === "반품") return "outline";
    return "default";
  }

  const resolvedStatus = (o: Order): Order["status"] => {
    if (cancelled.has(o.id)) return "취소";
    if (confirmed.has(o.id) && o.status === "배송 완료") return "구매 확정";
    return o.status;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between border-b border-border pb-4">
        <h2 className="text-xl font-bold">주문 조회</h2>
        <div className="flex items-center gap-2">
          <Select placeholder="최근 3개월" options={["최근 3개월", "최근 6개월", "최근 1년"]} className="w-32" />
          <Select
            placeholder="전체 상태"
            options={["전체 상태", "배송 대기", "배송 준비", "배송 중", "배송 완료", "구매 확정", "취소", "반품"]}
            className="w-32"
          />
        </div>
      </div>

      <div className="space-y-3">
        {orders.map((o) => {
          const status = resolvedStatus(o);
          const isCancelled = status === "취소" || status === "반품";
          return (
            <div key={o.id} className="border border-border p-4">
              <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
                <div className="text-xs text-muted-foreground">{o.date} · 주문번호 {o.id}</div>
                <Badge variant={statusBadgeVariant(status)}>{status}</Badge>
              </div>
              <div className="flex gap-4">
                <ImageBox className="w-24 h-24 flex-shrink-0" ratio="square" />
                <div className="flex-1">
                  <div className="text-[11px] text-muted-foreground">{o.brand}</div>
                  <div className="text-sm font-semibold">{o.productName}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={o.type === "렌탈" ? "outline" : "muted"}>{o.type}</Badge>
                    <span className="text-sm font-medium">{formatPrice(o.price)}</span>
                  </div>
                  {isCancelled && (
                    <div className="text-[11px] text-muted-foreground mt-2">
                      {status === "취소" ? "주문이 취소되었습니다." : "반품이 진행 중입니다."}
                    </div>
                  )}
                </div>
                {!isCancelled && (
                  <div className="flex flex-col gap-2">
                    {status === "배송 대기" ? (
                      <Button size="sm" variant="outline" className="w-28" onClick={() => open("cancel", o)}>
                        주문 취소
                      </Button>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" className="w-28" onClick={() => open("delivery", o)}>
                          배송 조회
                        </Button>
                        {status === "배송 완료" && (
                          <Button size="sm" variant="outline" className="w-28" onClick={() => open("confirm", o)}>
                            구매 확정 (D-3)
                          </Button>
                        )}
                        {status === "구매 확정" && !reviewed.has(o.id) && (
                          <Button size="sm" variant="outline" className="w-28" onClick={() => open("review", o)}>
                            리뷰 작성
                          </Button>
                        )}
                        {reviewed.has(o.id) && (
                          <div className="w-28 h-9 flex items-center justify-center text-[11px] text-muted-foreground border border-border">
                            리뷰 완료
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 주문 취소 모달 */}
      <Modal open={modal === "cancel"} onClose={close} title="주문 취소">
        <div className="p-6 space-y-5">
          <div className="space-y-1">
            <div className="text-[11px] text-muted-foreground">{selected?.brand}</div>
            <div className="text-base font-semibold">{selected?.productName}</div>
            <div className="text-sm font-medium text-sage-ink">{selected && formatPrice(selected.price)}</div>
          </div>

          <div className="bg-muted/50 border border-border p-4 space-y-2 text-[12px] text-sage-ink">
            <div className="font-semibold mb-1">취소 안내사항</div>
            <div>· 배송 대기 상태에서만 취소가 가능합니다.</div>
            <div>· 결제 금액은 3~5 영업일 내 환불됩니다.</div>
            <div>· 취소 후에는 되돌릴 수 없습니다.</div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={close}>
              돌아가기
            </Button>
            <Button size="sm" className="flex-1" onClick={handleCancel}>
              취소 확인
            </Button>
          </div>
        </div>
      </Modal>

      {/* 배송 조회 모달 */}
      <Modal open={modal === "delivery"} onClose={close} title="배송 조회">
        <div className="p-6 space-y-5">
          <div className="border border-border p-4 space-y-1">
            <div className="text-xs text-muted-foreground">택배사</div>
            <div className="text-sm font-semibold">CJ대한통운</div>
            <div className="text-xs text-muted-foreground mt-2">운송장 번호</div>
            <div className="text-sm font-mono font-medium tracking-wider">123456789012</div>
          </div>

          <div className="space-y-0">
            {trackingSteps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                      step.done ? "bg-sage-ink border-sage-ink" : "bg-background border-border"
                    }`}
                  />
                  {i < trackingSteps.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-1 mb-1" />
                  )}
                </div>
                <div className="pb-5">
                  <div className={`text-sm font-medium ${step.done ? "text-sage-ink" : "text-muted-foreground"}`}>
                    {step.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground">{step.sub}</div>
                  <div className="text-[10px] text-muted-foreground/70 mt-0.5">{step.date}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-muted-foreground border-t border-border pt-4">
            {selected?.productName} · {selected && formatPrice(selected.price)}
          </div>
        </div>
      </Modal>

      {/* 구매 확정 모달 */}
      <Modal open={modal === "confirm"} onClose={close} title="구매 확정">
        <div className="p-6 space-y-5">
          <div className="space-y-1">
            <div className="text-[11px] text-muted-foreground">{selected?.brand}</div>
            <div className="text-base font-semibold">{selected?.productName}</div>
            <div className="text-sm font-medium text-sage-ink">{selected && formatPrice(selected.price)}</div>
          </div>

          <div className="bg-sage-soft/40 border border-sage/40 p-4 space-y-2 text-[12px] text-sage-ink">
            <div className="font-semibold mb-1">구매 확정 시 안내사항</div>
            <div>· 셀러에게 정산이 진행됩니다.</div>
            <div>· 구매금액의 1% 적립금이 지급됩니다.</div>
            <div>· 확정 후에는 취소 / 반품이 불가합니다.</div>
          </div>

          <div className="text-[11px] text-muted-foreground">
            구매 확정 기한까지 미확정 시 자동으로 구매 확정됩니다.
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={close}>
              취소
            </Button>
            <Button size="sm" className="flex-1" onClick={handleConfirm}>
              구매 확정
            </Button>
          </div>
        </div>
      </Modal>

      {/* 리뷰 작성 모달 */}
      <Modal open={modal === "review"} onClose={close} title="리뷰 작성">
        <div className="p-6 space-y-5">
          <div className="space-y-1">
            <div className="text-[11px] text-muted-foreground">{selected?.brand}</div>
            <div className="text-sm font-semibold">{selected?.productName}</div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-2">별점</div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setReviewStars(n)}
                  className={`text-2xl transition-colors ${n <= reviewStars ? "text-sage-ink" : "text-border"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-2">리뷰 내용</div>
            <textarea
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="상품 상태, 배송, 사용감 등을 자유롭게 작성해 주세요."
              className="w-full p-3 text-sm border border-border bg-background resize-none focus:outline-none focus:border-sage-ink/40"
            />
          </div>

          <div>
            <div className="text-xs text-muted-foreground mb-2">사진 첨부 (선택)</div>
            <div className="border border-dashed border-border h-20 flex items-center justify-center text-[11px] text-muted-foreground cursor-pointer hover:border-sage-ink/30 transition-colors">
              클릭하여 사진 업로드
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={close}>
              취소
            </Button>
            <Button size="sm" className="flex-1" onClick={handleReview}>
              작성 완료
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
