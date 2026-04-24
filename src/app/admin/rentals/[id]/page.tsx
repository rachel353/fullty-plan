"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type RentalStatus = "렌탈 중" | "연장 1차" | "연장 2차" | "회수 대기" | "회수 완료" | "구매 전환";

type Rental = {
  id: string;
  user: string;
  userId: string;
  phone: string;
  product: string;
  brand: string;
  seller: string;
  startDate: string;
  endDate: string;
  rentPrice: number;
  extended: number;
  status: RentalStatus;
  daysLeft: number;
  address: string;
};

const RENTALS: Rental[] = [
  {
    id: "rt001",
    user: "김풀티",
    userId: "m001",
    phone: "010-1234-5678",
    product: "Fritz Hansen Egg Chair",
    brand: "Fritz Hansen",
    seller: "덴마크빈티지",
    startDate: "2026-03-15",
    endDate: "2026-04-13",
    rentPrice: 250000,
    extended: 0,
    status: "렌탈 중",
    daysLeft: 3,
    address: "서울 마포구 합정동 123-4",
  },
  {
    id: "rt002",
    user: "이가구",
    userId: "m002",
    phone: "010-9876-5432",
    product: "Cassina LC4 Chaise",
    brand: "Cassina",
    seller: "이태리에디션",
    startDate: "2026-03-25",
    endDate: "2026-04-23",
    rentPrice: 180000,
    extended: 1,
    status: "연장 1차",
    daysLeft: 13,
    address: "서울 강남구 청담동 56-1",
  },
  {
    id: "rt003",
    user: "박빈티",
    userId: "m003",
    phone: "010-5555-1234",
    product: "USM Haller Sideboard",
    brand: "USM",
    seller: "모듈러 코리아",
    startDate: "2026-02-08",
    endDate: "2026-04-08",
    rentPrice: 90000,
    extended: 2,
    status: "회수 대기",
    daysLeft: 0,
    address: "서울 용산구 한남동 22-5",
  },
];

const RENTAL_FLOW: RentalStatus[] = ["렌탈 중", "연장 1차", "연장 2차", "회수 대기", "회수 완료"];

function ExtendModal({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">연장 승인</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          렌탈 기간을 30일 연장합니다.<br />
          사용자에게 연장 알림이 발송됩니다.
        </p>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" onClick={onConfirm}>연장 승인</Button>
        </div>
      </div>
    </div>
  );
}

function ReturnModal({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">회수 요청</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          회수 요청을 발송합니다.<br />
          사용자에게 반납 안내 알림이 전송됩니다.
        </p>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" onClick={onConfirm}>회수 요청</Button>
        </div>
      </div>
    </div>
  );
}

function CompleteReturnModal({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">회수 완료 처리</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          상품 회수가 완료되었음을 확인합니다.<br />
          렌탈이 종료되고 상품은 판매 상태로 전환됩니다.
        </p>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" onClick={onConfirm}>회수 완료</Button>
        </div>
      </div>
    </div>
  );
}

function PurchaseModal({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">구매 전환</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          렌탈을 구매로 전환 처리합니다.<br />
          기납입 렌탈 금액이 구매가에서 차감됩니다.
        </p>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" onClick={onConfirm}>구매 전환 확정</Button>
        </div>
      </div>
    </div>
  );
}

export default function RentalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const rental = RENTALS.find((r) => r.id === id);
  const [status, setStatus] = useState<RentalStatus | null>(null);
  const [extendOpen, setExtendOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  if (!rental) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        렌탈을 찾을 수 없습니다.
        <Link href="/admin/rentals" className="block mt-3 text-sage-ink underline">목록으로</Link>
      </div>
    );
  }

  const currentStatus = status ?? rental.status;

  function nextExtendStatus(s: RentalStatus): RentalStatus {
    if (s === "렌탈 중") return "연장 1차";
    if (s === "연장 1차") return "연장 2차";
    return s;
  }

  const canExtend = currentStatus === "렌탈 중" || currentStatus === "연장 1차";
  const canReturn = currentStatus !== "회수 완료" && currentStatus !== "구매 전환";
  const canComplete = currentStatus === "회수 대기";
  const canPurchase = currentStatus === "연장 1차" || currentStatus === "연장 2차" || currentStatus === "렌탈 중";
  const isDone = currentStatus === "회수 완료" || currentStatus === "구매 전환";

  const flowIndex = RENTAL_FLOW.indexOf(currentStatus);

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="border-b border-border pb-4">
        <Link href="/admin/rentals" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 렌탈 관리
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{rental.product}</h2>
            <p className="text-[11px] text-muted-foreground mt-1">{rental.id} · {rental.brand}</p>
          </div>
          <Badge variant={isDone ? "muted" : currentStatus === "회수 대기" ? "default" : "outline"}>
            {currentStatus}
          </Badge>
        </div>
      </div>

      {/* 완료 배너 */}
      {currentStatus === "회수 완료" && (
        <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-4 flex items-center gap-3">
          <div className="w-6 h-6 bg-sage-deep flex items-center justify-center flex-shrink-0">
            <Check size={12} className="text-background" />
          </div>
          <div>
            <div className="text-sm font-semibold">회수 완료</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">상품이 정상 회수되었습니다. 판매 상태로 전환됩니다.</div>
          </div>
        </div>
      )}

      {currentStatus === "구매 전환" && (
        <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-4 flex items-center gap-3">
          <div className="w-6 h-6 bg-sage-deep flex items-center justify-center flex-shrink-0">
            <Check size={12} className="text-background" />
          </div>
          <div>
            <div className="text-sm font-semibold">구매 전환 완료</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">렌탈이 구매로 전환되었습니다.</div>
          </div>
        </div>
      )}

      {/* 렌탈 진행 상태 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">진행 상태</div>
        <div className="flex items-center gap-1">
          {RENTAL_FLOW.map((step, i) => (
            <div key={step} className="flex items-center gap-1 flex-1 min-w-0">
              <div className={cn(
                "flex-1 text-center py-2 text-[10px] border font-medium truncate px-1",
                i <= flowIndex ? "border-sage-ink bg-sage-soft/20 text-sage-ink" : "border-border text-muted-foreground"
              )}>
                {step}
              </div>
              {i < RENTAL_FLOW.length - 1 && (
                <div className={cn("w-3 h-px flex-shrink-0", i < flowIndex ? "bg-sage-ink" : "bg-border")} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 렌탈 정보 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">렌탈 정보</div>
        <div className="border border-border divide-y divide-border text-sm">
          <Row label="시작일" value={rental.startDate} />
          <Row label="종료일" value={rental.endDate} />
          <Row label="월 렌탈가" value={`${rental.rentPrice.toLocaleString()}원`} />
          <Row label="연장 횟수" value={`${rental.extended}회`} />
          <Row label="남은 일수" value={rental.daysLeft > 0 ? `D-${rental.daysLeft}` : <span className="text-red-500 font-medium">만료</span>} />
          <Row label="셀러" value={rental.seller} />
        </div>
      </section>

      {/* 사용자 정보 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">사용자 정보</div>
        <div className="border border-border divide-y divide-border text-sm">
          <Row label="이름" value={rental.user} />
          <Row label="연락처" value={rental.phone} />
          <Row label="반납 주소" value={rental.address} />
        </div>
      </section>

      {/* 관리 액션 */}
      {!isDone && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">렌탈 관리</div>
          <div className="border border-border divide-y divide-border">
            {canExtend && (
              <div className="px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">연장 승인</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">30일 연장 · {currentStatus === "연장 1차" ? "최대 1회 더 가능" : "최대 2회까지 가능"}</div>
                </div>
                <Button size="sm" onClick={() => setExtendOpen(true)}>연장 승인</Button>
              </div>
            )}
            {canPurchase && (
              <div className="px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">구매 전환</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">렌탈 → 구매 전환 처리</div>
                </div>
                <Button size="sm" variant="outline" onClick={() => setPurchaseOpen(true)}>구매 전환</Button>
              </div>
            )}
            {canReturn && !canComplete && (
              <div className="px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">회수 요청</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">사용자에게 반납 안내 발송</div>
                </div>
                <Button size="sm" variant="outline" onClick={() => setReturnOpen(true)}>회수 요청</Button>
              </div>
            )}
            {canComplete && (
              <div className="px-5 py-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">회수 완료 처리</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">상품 회수 확인 후 렌탈 종료 처리</div>
                </div>
                <Button size="sm" onClick={() => setCompleteOpen(true)}>회수 완료</Button>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="border-t border-border pt-6 flex justify-end">
        <Link href="/admin/rentals"><Button variant="outline">목록으로</Button></Link>
      </div>

      {extendOpen && <ExtendModal onConfirm={() => { setExtendOpen(false); setStatus(nextExtendStatus(currentStatus)); }} onClose={() => setExtendOpen(false)} />}
      {returnOpen && <ReturnModal onConfirm={() => { setReturnOpen(false); setStatus("회수 대기"); }} onClose={() => setReturnOpen(false)} />}
      {completeOpen && <CompleteReturnModal onConfirm={() => { setCompleteOpen(false); setStatus("회수 완료"); }} onClose={() => setCompleteOpen(false)} />}
      {purchaseOpen && <PurchaseModal onConfirm={() => { setPurchaseOpen(false); setStatus("구매 전환"); }} onClose={() => setPurchaseOpen(false)} />}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between gap-4">
      <span className="text-muted-foreground text-[11px] w-24 flex-shrink-0">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
