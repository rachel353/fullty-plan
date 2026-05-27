"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { orders, type Order } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STATUS_VARIANT: Record<string, "default" | "sage" | "muted" | "outline"> = {
  "결제 완료": "default",
  "배송 준비": "default",
  "배송 중": "sage",
  "배송 완료": "sage",
  "구매 확정": "muted",
  "취소": "outline",
};

const STATUS_FLOW: Order["status"][] = ["결제 완료", "배송 준비", "배송 중", "배송 완료", "구매 확정"];
const ALL_STATUSES: Order["status"][] = [...STATUS_FLOW, "취소"];

function getTrackingSteps(status: Order["status"], date: string) {
  const base = new Date(date);
  const fmt = (d: Date) =>
    `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;

  const d0 = fmt(base);
  const d1 = fmt(new Date(base.getTime() + 86400000));
  const d2 = fmt(new Date(base.getTime() + 86400000 * 2));
  const d3 = fmt(new Date(base.getTime() + 86400000 * 3));

  const statusIndex = STATUS_FLOW.indexOf(status);

  const steps = [
    { label: "결제 완료", sub: "주문이 접수되었습니다", date: d0, doneIndex: 0 },
    { label: "배송 준비", sub: "운송장 등록 및 발송 준비 중", date: d1, doneIndex: 1 },
    { label: "배송 중", sub: "상품이 이동 중입니다", date: d2, doneIndex: 2 },
    { label: "배송 완료", sub: "배달이 완료되었습니다", date: d3, doneIndex: 3 },
    { label: "구매 확정", sub: "구매가 최종 확정되었습니다", date: d3, doneIndex: 4 },
  ];

  return steps.map((s) => ({
    ...s,
    done: s.doneIndex <= statusIndex,
    current: s.doneIndex === statusIndex,
  }));
}

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const original = orders.find((o) => o.id === id);
  const [status, setStatus] = useState<Order["status"]>(original?.status ?? "결제 완료");
  const [trackingCarrier, setTrackingCarrier] = useState(original?.trackingCarrier ?? "");
  const [trackingNo, setTrackingNo] = useState(original?.trackingNo ?? "");
  const [saved, setSaved] = useState(false);

  if (!original) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        주문을 찾을 수 없습니다.
      </div>
    );
  }

  const isCancelled = status === "취소";
  const trackingSteps = getTrackingSteps(status, original.date);
  const currentStepIndex = STATUS_FLOW.indexOf(status);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-8 max-w-2xl">
      {/* 헤더 */}
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <button
          onClick={() => router.back()}
          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          ← 목록
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-bold">주문 상세</h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">주문번호 {original.id}</p>
        </div>
        <Badge variant={STATUS_VARIANT[status] ?? "outline"}>{status}</Badge>
      </div>

      {/* 주문 정보 */}
      <section className="border border-border">
        <div className="px-5 py-3 border-b border-border bg-muted">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">주문 정보</span>
        </div>
        <div className="p-5 grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <InfoRow label="상품" value={`${original.brand} ${original.productName}`} />
          <InfoRow label="유형">
            <Badge variant="outline">{original.type}</Badge>
          </InfoRow>
          <InfoRow label="구매자" value={original.buyer} />
          <InfoRow label="셀러" value={original.seller} />
          <InfoRow label="결제 금액" value={formatPrice(original.price)} bold />
          <InfoRow label="주문일" value={original.date} />
        </div>
      </section>

      {/* 배송 추적 */}
      {!isCancelled && (
        <section className="border border-border">
          <div className="px-5 py-3 border-b border-border bg-muted">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">배송 추적</span>
          </div>
          <div className="p-5 space-y-5">
            {/* 운송장 정보 */}
            {original.trackingNo ? (
              <div className="flex gap-6 text-sm">
                <div>
                  <div className="text-[11px] text-muted-foreground mb-0.5">택배사</div>
                  <div className="font-medium">{trackingCarrier || original.trackingCarrier}</div>
                </div>
                <div>
                  <div className="text-[11px] text-muted-foreground mb-0.5">운송장 번호</div>
                  <div className="font-mono font-medium tracking-wider">{trackingNo || original.trackingNo}</div>
                </div>
              </div>
            ) : (
              <div className="text-[11px] text-muted-foreground">운송장 미등록</div>
            )}

            {/* 타임라인 */}
            <div className="space-y-0">
              {trackingSteps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full border-2 mt-0.5 flex-shrink-0",
                        step.current
                          ? "bg-sage-ink border-sage-ink ring-2 ring-sage-ink/20"
                          : step.done
                          ? "bg-foreground border-foreground"
                          : "bg-background border-border"
                      )}
                    />
                    {i < trackingSteps.length - 1 && (
                      <div className={cn("w-px flex-1 mt-1 mb-1", step.done ? "bg-foreground/30" : "bg-border")} />
                    )}
                  </div>
                  <div className="pb-5">
                    <div
                      className={cn(
                        "text-sm font-medium",
                        step.current ? "text-sage-ink" : step.done ? "text-foreground" : "text-muted-foreground/50"
                      )}
                    >
                      {step.label}
                      {step.current && (
                        <span className="ml-2 text-[10px] bg-sage-ink text-background px-1.5 py-0.5">현재</span>
                      )}
                    </div>
                    <div className={cn("text-[11px]", step.done ? "text-muted-foreground" : "text-muted-foreground/40")}>
                      {step.sub}
                    </div>
                    {step.done && (
                      <div className="text-[10px] text-muted-foreground/60 mt-0.5">{step.date}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 취소 정보 */}
      {isCancelled && (
        <section className="border border-border">
          <div className="px-5 py-3 border-b border-border bg-muted">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">취소 정보</span>
          </div>
          <div className="p-5 text-sm text-muted-foreground">
            주문이 취소된 상태입니다. 결제 금액은 3~5 영업일 내 환불 처리됩니다.
          </div>
        </section>
      )}

      {/* 어드민 상태 관리 */}
      {!isCancelled && (
        <section className="border border-border">
          <div className="px-5 py-3 border-b border-border bg-muted">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">상태 관리</span>
          </div>
          <div className="p-5 space-y-5">
            {/* 상태 스텝 버튼 */}
            <div>
              <div className="text-xs text-muted-foreground mb-3">주문 상태 변경</div>
              <div className="flex flex-wrap gap-2">
                {ALL_STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={cn(
                      "px-3 py-1.5 text-xs border transition-colors",
                      status === s
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* 운송장 등록 - 배송 준비 이상부터 */}
            {currentStepIndex >= 2 && (
              <div className="space-y-3 pt-3 border-t border-border">
                <div className="text-xs text-muted-foreground">운송장 정보</div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <div className="text-[11px] text-muted-foreground mb-1">택배사</div>
                    <input
                      value={trackingCarrier}
                      onChange={(e) => setTrackingCarrier(e.target.value)}
                      placeholder="CJ대한통운"
                      className="h-8 px-3 text-xs border border-border bg-background w-full outline-none focus:border-sage-ink"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] text-muted-foreground mb-1">운송장 번호</div>
                    <input
                      value={trackingNo}
                      onChange={(e) => setTrackingNo(e.target.value)}
                      placeholder="운송장 번호 입력"
                      className="h-8 px-3 text-xs border border-border bg-background w-full outline-none focus:border-sage-ink font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button size="sm" onClick={handleSave}>
                {saved ? "저장 완료 ✓" : "변경 저장"}
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function InfoRow({
  label,
  value,
  bold,
  children,
}: {
  label: string;
  value?: string;
  bold?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[11px] text-muted-foreground mb-0.5">{label}</div>
      {children ?? (
        <div className={cn("text-sm", bold && "font-bold text-sage-ink")}>{value}</div>
      )}
    </div>
  );
}
