"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { sellRequests, SellRequest } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

type SellStatus = SellRequest["status"];

const SELL_FLOW: SellStatus[] = [
  "접수 완료",
  "배송비 결제 완료",
  "픽업 대기",
  "픽업 완료",
  "검수 중",
  "최종 금액 제안",
  "계약 완료",
];

type SellMeta = {
  option: string;
  seller: string;
  sellerPhone: string;
  address: string;
  note: string;
  inspectionNote?: string;
  finalPrice?: number;
};

const SELL_META: Record<string, SellMeta> = {
  s001: {
    option: "Ice Blue / Standard",
    seller: "이가구",
    sellerPhone: "010-9876-5432",
    address: "서울 강남구 청담동 56-1",
    note: "2021년 구매, 오피스에서 사용. 팔걸이 양 옆 미세 스크래치 있음.",
    inspectionNote: "전반적 상태 양호. 좌판 쿠션 약 20% 마모. A등급 적정. 최종 정산가 산정 중.",
  },
  s002: {
    option: "Pure White",
    seller: "박빈티",
    sellerPhone: "010-5555-1234",
    address: "서울 용산구 한남동 22-5",
    note: "2020년 구매, 서재에서 사용. 화이트 도장 스크래치 없음.",
    inspectionNote: "상태 우수. S등급 적합. 최종 매입가 산정 완료.",
    finalPrice: 880000,
  },
  s003: {
    option: "Cashmere Fabric / Walnut",
    seller: "최라운지",
    sellerPhone: "010-7777-8888",
    address: "서울 마포구 합정동 33-2",
    note: "2019년 구매. 거실 인테리어 소품으로만 사용. 상태 최상.",
  },
};

function PickupCompleteModal({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">픽업 완료 처리</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground">상품 픽업이 완료되었음을 확인합니다. 검수 단계로 이동합니다.</p>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" onClick={onConfirm}>픽업 완료</Button>
        </div>
      </div>
    </div>
  );
}

function InspectionStartModal({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">검수 시작</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground">상품 검수를 시작합니다.</p>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" onClick={onConfirm}>검수 시작</Button>
        </div>
      </div>
    </div>
  );
}

function PriceOfferModal({ estimated, onConfirm, onClose }: { estimated: number; onConfirm: (price: number) => void; onClose: () => void }) {
  const [price, setPrice] = useState(String(estimated));
  const parsed = Number(price.replace(/,/g, ""));
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">최종 금액 제안</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground">검수 결과를 바탕으로 최종 금액을 제안합니다. 셀러에게 알림이 발송됩니다.</p>
        <div className="space-y-2">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">최종 제안가</div>
          <div className="flex items-center border border-border">
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex-1 px-3 py-2.5 text-sm bg-background outline-none"
              placeholder="금액 입력"
            />
            <span className="px-3 text-sm text-muted-foreground">원</span>
          </div>
          <div className="text-[11px] text-muted-foreground">예상 금액: {formatPrice(estimated)}</div>
        </div>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" disabled={!parsed || parsed <= 0} onClick={() => onConfirm(parsed)}>제안 발송</Button>
        </div>
      </div>
    </div>
  );
}

function ContractModal({ price, onConfirm, onClose }: { price: number; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">계약 완료 처리</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          셀러가 금액에 동의하였음을 확인합니다.<br />
          <span className="font-semibold text-foreground">{formatPrice(price)}</span>로 계약 처리됩니다.
        </p>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" onClick={onConfirm}>계약 완료</Button>
        </div>
      </div>
    </div>
  );
}

function RejectSellModal({ onConfirm, onClose }: { onConfirm: (reason: string) => void; onClose: () => void }) {
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">신청 반려</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground">반려 처리 시 셀러에게 사유가 전달됩니다.</p>
        <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full h-10 border border-border px-3 text-sm bg-background">
          <option value="">반려 사유 선택</option>
          <option>상품 상태 불량</option>
          <option>취급 불가 품목</option>
          <option>가격 기준 미달</option>
          <option>셀러 요청 (취소)</option>
          <option>기타</option>
        </select>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1 bg-red-500 hover:bg-red-600" disabled={!reason} onClick={() => onConfirm(reason)}>반려 확정</Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminSellDetailPage() {
  const { id } = useParams<{ id: string }>();
  const sell = sellRequests.find((s) => s.id === id);
  const meta = SELL_META[id ?? ""];

  const [status, setStatus] = useState<SellStatus | null>(null);
  const [finalPrice, setFinalPrice] = useState<number | null>(meta?.finalPrice ?? null);
  const [rejectReason, setRejectReason] = useState("");

  const [pickupModal, setPickupModal] = useState(false);
  const [inspectModal, setInspectModal] = useState(false);
  const [priceModal, setPriceModal] = useState(false);
  const [contractModal, setContractModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  if (!sell) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        SELL 신청을 찾을 수 없습니다.
        <Link href="/admin/sell" className="block mt-3 text-sage-ink underline">목록으로</Link>
      </div>
    );
  }

  const currentStatus = status ?? sell.status;
  const isRejected = currentStatus === "반려";
  const isDone = currentStatus === "계약 완료" || isRejected;
  const flowIdx = SELL_FLOW.indexOf(currentStatus);

  const displayFinalPrice = finalPrice ?? (meta?.finalPrice ?? sell.estimated);

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="border-b border-border pb-4">
        <Link href="/admin/sell" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> SELL 관리
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] text-muted-foreground mb-1">{sell.brand}</div>
            <h2 className="text-xl font-bold">{sell.model}</h2>
            <p className="text-[11px] text-muted-foreground mt-1">{sell.id} · 신청 {sell.createdAt}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={sell.type === "위탁" ? "outline" : "default"}>{sell.type}</Badge>
            <Badge variant={isRejected ? "muted" : isDone ? "default" : "outline"}>{currentStatus}</Badge>
          </div>
        </div>
      </div>

      {/* 완료 배너 */}
      {currentStatus === "계약 완료" && (
        <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-4 flex items-center gap-3">
          <div className="w-6 h-6 bg-sage-deep flex items-center justify-center flex-shrink-0">
            <Check size={12} className="text-background" />
          </div>
          <div>
            <div className="text-sm font-semibold">계약 완료</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">최종 금액 {formatPrice(displayFinalPrice)} · 정산 대기 중</div>
          </div>
        </div>
      )}

      {isRejected && (
        <div className="border border-red-200 bg-red-50 px-5 py-4 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-red-400 flex items-center justify-center text-[10px] text-red-500">✕</div>
            <span className="text-sm font-semibold text-red-700">반려 처리됨</span>
          </div>
          {rejectReason && <div className="text-[11px] text-red-600 pl-7">{rejectReason}</div>}
        </div>
      )}

      {/* 진행 파이프라인 */}
      {!isRejected && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">진행 단계</div>
          <div className="flex items-center gap-0.5 overflow-x-auto">
            {SELL_FLOW.map((step, i) => (
              <div key={step} className="flex items-center gap-0.5 flex-shrink-0">
                <div className={cn(
                  "px-2 py-1.5 text-[9px] font-medium border whitespace-nowrap",
                  i < flowIdx ? "border-muted-foreground/30 bg-muted text-muted-foreground"
                  : i === flowIdx ? "border-sage-ink bg-sage-soft/20 text-sage-ink"
                  : "border-border text-muted-foreground"
                )}>
                  {step}
                </div>
                {i < SELL_FLOW.length - 1 && (
                  <div className={cn("w-2 h-px flex-shrink-0", i < flowIdx ? "bg-muted-foreground/30" : "bg-border")} />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 상품 정보 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">상품 정보</div>
        <div className="border border-border divide-y divide-border text-sm">
          <Row label="브랜드" value={sell.brand} />
          <Row label="모델명" value={sell.model} />
          {meta?.option && <Row label="옵션" value={meta.option} />}
          <Row label="유형" value={<Badge variant={sell.type === "위탁" ? "outline" : "default"}>{sell.type}</Badge>} />
          <Row label="예상 금액" value={formatPrice(sell.estimated)} />
          {(currentStatus === "최종 금액 제안" || currentStatus === "계약 완료") && finalPrice && (
            <Row label="최종 제안가" value={<span className="font-semibold text-sage-ink">{formatPrice(finalPrice)}</span>} />
          )}
        </div>
      </section>

      {/* 셀러 정보 */}
      {meta && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">셀러 정보</div>
          <div className="border border-border divide-y divide-border text-sm">
            <Row label="셀러" value={meta.seller} />
            <Row label="연락처" value={meta.sellerPhone} />
            <Row label="픽업 주소" value={meta.address} />
          </div>
        </section>
      )}

      {/* 셀러 메모 */}
      {meta?.note && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">셀러 메모</div>
          <div className="border border-border px-4 py-4 text-sm text-muted-foreground leading-relaxed">{meta.note}</div>
        </section>
      )}

      {/* 검수 노트 */}
      {meta?.inspectionNote && (currentStatus === "검수 중" || currentStatus === "최종 금액 제안" || currentStatus === "계약 완료") && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">검수 노트</div>
          <div className="border border-border px-4 py-4 text-sm text-muted-foreground leading-relaxed">{meta.inspectionNote}</div>
        </section>
      )}

      {/* 관리 액션 */}
      {!isDone && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">상태 처리</div>
          <div className="border border-border divide-y divide-border">
            {currentStatus === "픽업 대기" && (
              <div className="px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">픽업 완료 처리</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">픽업 확인 후 검수 단계로 이동</div>
                </div>
                <Button size="sm" onClick={() => setPickupModal(true)}>픽업 완료</Button>
              </div>
            )}
            {currentStatus === "픽업 완료" && (
              <div className="px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">검수 시작</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">상품 검수 단계 진입</div>
                </div>
                <Button size="sm" onClick={() => setInspectModal(true)}>검수 시작</Button>
              </div>
            )}
            {currentStatus === "검수 중" && (
              <div className="px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">최종 금액 제안</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">검수 완료 후 셀러에게 금액 제안</div>
                </div>
                <Button size="sm" onClick={() => setPriceModal(true)}>금액 제안</Button>
              </div>
            )}
            {currentStatus === "최종 금액 제안" && (
              <div className="px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">계약 완료 처리</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">셀러 동의 확인 후 계약 처리</div>
                </div>
                <Button size="sm" onClick={() => setContractModal(true)}>계약 완료</Button>
              </div>
            )}
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-red-600">신청 반려</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">셀러에게 반려 사유 전달</div>
              </div>
              <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50" onClick={() => setRejectModal(true)}>반려</Button>
            </div>
          </div>
        </section>
      )}

      <div className="border-t border-border pt-6 flex justify-end">
        <Link href="/admin/sell"><Button variant="outline">목록으로</Button></Link>
      </div>

      {pickupModal && <PickupCompleteModal onConfirm={() => { setPickupModal(false); setStatus("픽업 완료"); }} onClose={() => setPickupModal(false)} />}
      {inspectModal && <InspectionStartModal onConfirm={() => { setInspectModal(false); setStatus("검수 중"); }} onClose={() => setInspectModal(false)} />}
      {priceModal && <PriceOfferModal estimated={sell.estimated} onConfirm={(p) => { setPriceModal(false); setFinalPrice(p); setStatus("최종 금액 제안"); }} onClose={() => setPriceModal(false)} />}
      {contractModal && <ContractModal price={displayFinalPrice} onConfirm={() => { setContractModal(false); setStatus("계약 완료"); }} onClose={() => setContractModal(false)} />}
      {rejectModal && <RejectSellModal onConfirm={(r) => { setRejectModal(false); setStatus("반려"); setRejectReason(r); }} onClose={() => setRejectModal(false)} />}
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
