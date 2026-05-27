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


// 스마트택배 API trackingDetails 이벤트 구조
type TrackingEvent = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  kind: string;
  where: string;
  timeString: string;
  manName?: string;
  telno?: string;
};

const LEVEL_LABELS: Record<number, string> = {
  1: "배송 준비",
  2: "집하",
  3: "이동 중",
  4: "배송 출발",
  5: "배달 중",
  6: "배달 완료",
};

// 주문 상태와 날짜 기반으로 trackingDetails mock 생성
function getMockTrackingEvents(status: Order["status"], date: string): TrackingEvent[] {
  const base = new Date(date);
  const fmt = (d: Date, h: number, m: number) => {
    const dd = new Date(d);
    dd.setDate(dd.getDate());
    return `${dd.getFullYear()}.${String(dd.getMonth() + 1).padStart(2, "0")}.${String(dd.getDate()).padStart(2, "0")} ${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };
  const addDay = (n: number) => new Date(base.getTime() + 86400000 * n);

  const all: TrackingEvent[] = [
    { level: 1, kind: "인터넷 접수", where: "온라인 접수", timeString: fmt(base, 14, 22) },
    { level: 2, kind: "집하 완료", where: "서울 강남 영업소", timeString: fmt(addDay(1), 9, 15) },
    { level: 3, kind: "간선 이동 중", where: "서울 허브 터미널", timeString: fmt(addDay(1), 18, 40) },
    { level: 3, kind: "간선 이동 완료", where: "수도권 허브 터미널", timeString: fmt(addDay(2), 3, 12) },
    { level: 4, kind: "배달 출발", where: "서울 마포 영업소", timeString: fmt(addDay(2), 8, 55), manName: "홍길동", telno: "010-1234-5678" },
    { level: 6, kind: "배달 완료", where: "서울 마포구 서교동", timeString: fmt(addDay(2), 14, 33), manName: "홍길동", telno: "010-1234-5678" },
  ];

  const levelMap: Record<Order["status"], number> = {
    "결제 완료": 0,
    "배송 준비": 1,
    "배송 중": 4,
    "배송 완료": 6,
    "구매 확정": 6,
    "취소": 0,
  };

  const maxIndex = levelMap[status];
  // 최신순 역순 반환 (실제 API와 동일)
  return all.filter((_, i) => i < maxIndex).reverse();
}

// 상태 → 현재 level 매핑
function getCurrentLevel(status: Order["status"]): number {
  const map: Record<Order["status"], number> = {
    "결제 완료": 1,
    "배송 준비": 1,
    "배송 중": 4,
    "배송 완료": 6,
    "구매 확정": 6,
    "취소": 0,
  };
  return map[status] ?? 1;
}

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const original = orders.find((o) => o.id === id);
  const [carrier, setCarrier] = useState(original?.trackingCarrier ?? "");
  const [trackingNo, setTrackingNo] = useState(original?.trackingNo ?? "");
  const [saved, setSaved] = useState(false);

  if (!original) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        주문을 찾을 수 없습니다.
      </div>
    );
  }

  const status = original.status;
  const isCancelled = status === "취소";
  const hasTracking = !!(carrier || original.trackingCarrier) && !!(trackingNo || original.trackingNo);
  const events = getMockTrackingEvents(status, original.date);
  const currentLevel = getCurrentLevel(status);

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
        <SectionHeader>주문 정보</SectionHeader>
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

      {/* 운송장 정보 */}
      {!isCancelled && (
        <section className="border border-border">
          <SectionHeader>운송장 정보</SectionHeader>
          <div className="p-5 space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <div className="text-[11px] text-muted-foreground mb-1">택배사</div>
                <input
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  placeholder="예: CJ대한통운"
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
            <div className="flex justify-end">
              <Button size="sm" onClick={handleSave}>
                {saved ? "저장 완료 ✓" : "저장"}
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* 배송 추적 */}
      {!isCancelled && (
        <section className="border border-border">
          <SectionHeader>
            <span>배송 추적</span>
            {hasTracking && currentLevel === 6 && (
              <span className="ml-2 text-[10px] bg-sage-ink text-background px-2 py-0.5">배달 완료</span>
            )}
          </SectionHeader>

          {!hasTracking ? (
            <div className="p-5 text-[12px] text-muted-foreground">운송장이 등록되지 않았습니다.</div>
          ) : (
            <div className="p-5 space-y-6">
              {/* 택배사 + 운송장 */}
              <div className="flex items-center justify-between border border-border p-4 bg-muted/30">
                <div className="space-y-0.5">
                  <div className="text-[11px] text-muted-foreground">택배사</div>
                  <div className="text-sm font-semibold">{carrier || original.trackingCarrier}</div>
                </div>
                <div className="text-right space-y-0.5">
                  <div className="text-[11px] text-muted-foreground">운송장 번호</div>
                  <div className="text-sm font-mono font-semibold tracking-widest">
                    {trackingNo || original.trackingNo}
                  </div>
                </div>
              </div>

              {/* Level 진행 바 (스마트택배 level 1~6) */}
              <div>
                <div className="flex justify-between mb-2">
                  {[1, 2, 3, 4, 6].map((lv) => (
                    <div key={lv} className="flex flex-col items-center gap-1 flex-1">
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full border-2 mx-auto transition-colors",
                          currentLevel >= lv
                            ? currentLevel === lv
                              ? "bg-sage-ink border-sage-ink ring-2 ring-sage-ink/20"
                              : "bg-foreground border-foreground"
                            : "bg-background border-border"
                        )}
                      />
                      <span
                        className={cn(
                          "text-[10px] text-center leading-tight",
                          currentLevel >= lv ? "text-foreground font-medium" : "text-muted-foreground/50"
                        )}
                      >
                        {LEVEL_LABELS[lv]}
                      </span>
                    </div>
                  ))}
                </div>
                {/* 연결선 */}
                <div className="relative -mt-8 mb-6 mx-2 h-px">
                  <div className="absolute inset-0 bg-border" />
                  <div
                    className="absolute inset-y-0 left-0 bg-foreground transition-all"
                    style={{ width: `${Math.min(100, ((currentLevel - 1) / 5) * 100)}%` }}
                  />
                </div>
              </div>

              {/* 이벤트 타임라인 (최신순) */}
              {events.length > 0 && (
                <div>
                  <div className="text-[11px] text-muted-foreground mb-3 uppercase tracking-wide font-medium">
                    배송 이력
                  </div>
                  <div className="space-y-0">
                    {events.map((ev, i) => {
                      const isLatest = i === 0;
                      return (
                        <div key={i} className="flex gap-3">
                          {/* 시각 */}
                          <div className="w-[120px] flex-shrink-0 pt-0.5">
                            <div
                              className={cn(
                                "text-[11px] leading-tight",
                                isLatest ? "text-foreground font-medium" : "text-muted-foreground"
                              )}
                            >
                              {ev.timeString.split(" ")[0]}
                            </div>
                            <div
                              className={cn(
                                "text-[11px]",
                                isLatest ? "text-sage-ink font-semibold" : "text-muted-foreground"
                              )}
                            >
                              {ev.timeString.split(" ")[1]}
                            </div>
                          </div>

                          {/* 타임라인 도트 */}
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div
                              className={cn(
                                "w-2.5 h-2.5 rounded-full border-2 mt-0.5 flex-shrink-0",
                                isLatest
                                  ? "bg-sage-ink border-sage-ink"
                                  : "bg-muted-foreground/30 border-muted-foreground/30"
                              )}
                            />
                            {i < events.length - 1 && (
                              <div className="w-px flex-1 bg-border mt-1 mb-1 min-h-[20px]" />
                            )}
                          </div>

                          {/* 이벤트 내용 */}
                          <div className="pb-5 flex-1 min-w-0">
                            <div
                              className={cn(
                                "text-sm font-medium",
                                isLatest ? "text-foreground" : "text-muted-foreground"
                              )}
                            >
                              {ev.kind}
                            </div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">{ev.where}</div>
                            {ev.manName && (
                              <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                                <span>{ev.manName} 기사</span>
                                <span className="font-mono">{ev.telno}</span>
                              </div>
                            )}
                          </div>

                          {/* 레벨 뱃지 */}
                          <div className="flex-shrink-0 pt-0.5">
                            <span
                              className={cn(
                                "text-[10px] px-1.5 py-0.5 border",
                                isLatest
                                  ? "border-sage-ink/40 text-sage-ink bg-sage-ink/5"
                                  : "border-border text-muted-foreground/50"
                              )}
                            >
                              Lv.{ev.level}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {events.length === 0 && (
                <div className="text-[12px] text-muted-foreground">
                  아직 배송 이력이 없습니다. 택배사 집하 후 업데이트됩니다.
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* 취소 정보 */}
      {isCancelled && (
        <section className="border border-border">
          <SectionHeader>취소 정보</SectionHeader>
          <div className="p-5 text-sm text-muted-foreground">
            주문이 취소된 상태입니다. 결제 금액은 3~5 영업일 내 환불 처리됩니다.
          </div>
        </section>
      )}

    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-5 py-3 border-b border-border bg-muted flex items-center gap-1">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{children}</span>
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
