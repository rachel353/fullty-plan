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
  shippingFee?: number;
  pickupDate?: string;
  pickupPerson?: string;
  inspectionGrade?: string;
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
    shippingFee: 5000,
    pickupDate: "2026-04-05",
    pickupPerson: "풀티 물류 1팀",
    inspectionNote: "전반적 상태 양호. 좌판 쿠션 약 20% 마모. A등급 적정. 최종 정산가 산정 중.",
    inspectionGrade: "A",
  },
  s002: {
    option: "Pure White",
    seller: "박빈티",
    sellerPhone: "010-5555-1234",
    address: "서울 용산구 한남동 22-5",
    note: "2020년 구매, 서재에서 사용. 화이트 도장 스크래치 없음.",
    shippingFee: 5000,
    pickupDate: "2026-03-28",
    pickupPerson: "풀티 물류 2팀",
    inspectionGrade: "S",
    inspectionNote: "상태 우수. S등급 적합. 최종 매입가 산정 완료.",
    finalPrice: 880000,
  },
  s003: {
    option: "Cashmere Fabric / Walnut",
    seller: "최라운지",
    sellerPhone: "010-7777-8888",
    address: "서울 마포구 합정동 33-2",
    note: "2019년 구매. 거실 인테리어 소품으로만 사용. 상태 최상.",
    shippingFee: 5000,
  },
};

const GRADES = ["SS", "S", "A+", "A", "B"];

const CHECKLIST_ITEMS = [
  { key: "scratch", label: "스크래치 / 찍힘 없음 (또는 경미)" },
  { key: "stain", label: "오염 / 변색 없음" },
  { key: "deform", label: "변형 / 파손 없음" },
  { key: "function", label: "모든 기능 정상 작동" },
  { key: "parts", label: "조절 / 접이 기능 정상" },
  { key: "accessories", label: "구성품 완비" },
];

// --- Status-specific sections ---

function StatusAccepted() {
  return (
    <div className="border border-border px-5 py-5 space-y-2">
      <div className="text-[10px] text-muted-foreground tracking-widest uppercase">현재 단계 안내</div>
      <div className="text-sm font-medium">신청 접수 완료</div>
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        SELL 신청이 접수되었습니다. 배송비 결제 후 픽업 일정이 안내됩니다.
      </p>
      <div className="flex items-center justify-between pt-2 border-t border-border mt-3">
        <span className="text-[11px] text-muted-foreground">배송비 납부 대기 중</span>
        <Badge variant="outline">결제 대기</Badge>
      </div>
    </div>
  );
}

function StatusShippingPaid({ meta }: { meta: SellMeta }) {
  return (
    <div className="border border-border px-5 py-5 space-y-3">
      <div className="text-[10px] text-muted-foreground tracking-widest uppercase">현재 단계 안내</div>
      <div className="text-sm font-medium">배송비 결제 완료</div>
      <div className="flex items-center justify-between text-sm border border-border px-4 py-3">
        <span className="text-muted-foreground text-[11px]">결제 금액</span>
        <span className="font-semibold">{formatPrice(meta.shippingFee ?? 5000)}</span>
      </div>
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        픽업 일정을 조율하여 담당자를 지정합니다.
      </p>
    </div>
  );
}

function StatusPickupPending({ meta, onComplete }: { meta: SellMeta; onComplete: () => void }) {
  return (
    <div className="border border-border divide-y divide-border">
      <div className="px-5 py-4 space-y-1">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-2">픽업 정보</div>
        <div className="text-sm font-medium">{meta.address}</div>
        <div className="text-[11px] text-muted-foreground">{meta.seller} · {meta.sellerPhone}</div>
      </div>
      <div className="px-5 py-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">픽업 완료 처리</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">상품 수령 확인 후 처리</div>
        </div>
        <Button size="sm" onClick={onComplete}>픽업 완료</Button>
      </div>
    </div>
  );
}

function StatusPickupDone({ meta, onStartInspect }: { meta: SellMeta; onStartInspect: () => void }) {
  return (
    <div className="border border-border divide-y divide-border">
      <div className="px-5 py-4 space-y-1">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-2">픽업 완료</div>
        {meta.pickupDate && (
          <div className="text-sm">픽업일: <span className="font-medium">{meta.pickupDate}</span></div>
        )}
        {meta.pickupPerson && (
          <div className="text-[11px] text-muted-foreground">담당: {meta.pickupPerson}</div>
        )}
      </div>
      <div className="px-5 py-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">검수 시작</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">상품 상태 검수 진행</div>
        </div>
        <Button size="sm" onClick={onStartInspect}>검수 시작</Button>
      </div>
    </div>
  );
}

function StatusInspecting({
  meta, estimated, onOffer,
}: {
  meta: SellMeta;
  estimated: number;
  onOffer: (grade: string, note: string, price: number) => void;
}) {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [grade, setGrade] = useState(meta.inspectionGrade ?? "");
  const [note, setNote] = useState(meta.inspectionNote ?? "");
  const [price, setPrice] = useState(String(meta.finalPrice ?? estimated ?? ""));

  function toggle(key: string) {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const parsedPrice = Number(String(price).replace(/,/g, ""));
  const canOffer = grade && parsedPrice > 0;

  return (
    <div className="space-y-5">
      {/* 검수 체크리스트 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">검수 체크리스트</div>
        <div className="border border-border divide-y divide-border">
          {CHECKLIST_ITEMS.map((item) => (
            <label key={item.key} className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-muted/30 transition-colors">
              <div
                onClick={() => toggle(item.key)}
                className={cn(
                  "w-4 h-4 border flex items-center justify-center flex-shrink-0 cursor-pointer",
                  checks[item.key] ? "border-sage-ink bg-sage-ink" : "border-border"
                )}
              >
                {checks[item.key] && <Check size={10} className="text-background" />}
              </div>
              <span className="text-sm">{item.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* 등급 선택 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">최종 등급 결정</div>
        <div className="flex gap-2">
          {GRADES.map((g) => (
            <button
              key={g}
              onClick={() => setGrade(g)}
              className={cn(
                "flex-1 py-2.5 text-sm font-medium border transition-colors",
                grade === g ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </section>

      {/* 검수 메모 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">검수 메모</div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="검수 내용 및 특이사항 기록"
          className="w-full border border-border px-4 py-3 text-sm bg-transparent resize-none h-24 outline-none focus:border-sage-ink"
        />
      </section>

      {/* 최종 금액 제안 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">최종 제안가</div>
        <div className="flex items-center border border-border">
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="금액 입력"
            className="flex-1 px-4 py-2.5 text-sm bg-background outline-none"
          />
          <span className="px-3 text-sm text-muted-foreground">원</span>
        </div>
        <div className="text-[11px] text-muted-foreground">예상 금액: {formatPrice(estimated)}</div>
      </section>

      <Button className="w-full" disabled={!canOffer} onClick={() => onOffer(grade, note, parsedPrice)}>
        금액 제안 발송
      </Button>
    </div>
  );
}

function StatusPriceOffered({ grade, note, price, estimated, onContract, onRetry }: {
  grade: string; note: string; price: number; estimated: number;
  onContract: () => void; onRetry: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="border border-border divide-y divide-border">
        <div className="px-5 py-4">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-3">최종 금액 제안</div>
          <div className="text-3xl font-bold">{formatPrice(price)}</div>
          <div className="text-[11px] text-muted-foreground mt-1">예상 금액 {formatPrice(estimated)} 대비 {price >= estimated ? "+" : ""}{formatPrice(price - estimated)}</div>
        </div>
        <div className="px-5 py-3 flex items-center gap-3">
          <Badge variant="default">{grade}</Badge>
          {note && <span className="text-[11px] text-muted-foreground truncate">{note}</span>}
        </div>
      </div>

      <div className="border border-border px-5 py-4 space-y-2">
        <div className="text-[11px] text-muted-foreground">셀러 응답 대기 중</div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          셀러가 금액에 동의하면 계약 완료 처리합니다.
        </p>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onRetry}>금액 재제안</Button>
          <Button className="flex-1" onClick={onContract}>계약 완료</Button>
        </div>
      </div>
    </div>
  );
}

function StatusContractDone({ grade, price }: { grade: string; price: number }) {
  return (
    <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-5 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-sage-deep flex items-center justify-center flex-shrink-0">
          <Check size={12} className="text-background" />
        </div>
        <div>
          <div className="text-sm font-semibold">계약 완료</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">최종 금액 {formatPrice(price)} · 등급 {grade}</div>
        </div>
      </div>
      <div className="border-t border-sage-deep/20 pt-3 text-[11px] text-muted-foreground">
        정산 대기 중 · 월말 일괄 정산 예정
      </div>
    </div>
  );
}

// --- Main ---

export default function AdminSellDetailPage() {
  const { id } = useParams<{ id: string }>();
  const sell = sellRequests.find((s) => s.id === id);
  const meta = { ...(SELL_META[id ?? ""] ?? {}), estimated: sell?.estimated ?? 0 } as SellMeta & { estimated: number };

  const [status, setStatus] = useState<SellStatus | null>(null);
  const [finalGrade, setFinalGrade] = useState(meta.inspectionGrade ?? "");
  const [finalNote, setFinalNote] = useState(meta.inspectionNote ?? "");
  const [finalPrice, setFinalPrice] = useState<number | null>(meta.finalPrice ?? null);
  const [rejectReason, setRejectReason] = useState("");

  const [pickupModal, setPickupModal] = useState(false);
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
  const displayPrice = finalPrice ?? (meta.finalPrice ?? sell.estimated);

  return (
    <div className="space-y-8 max-w-2xl">
      {/* 헤더 */}
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
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge variant={sell.type === "위탁" ? "outline" : "default"}>{sell.type}</Badge>
            <Badge variant={isRejected ? "muted" : isDone ? "default" : "outline"}>{currentStatus}</Badge>
          </div>
        </div>
      </div>

      {/* 반려 배너 */}
      {isRejected && (
        <div className="border border-red-200 bg-red-50 px-5 py-4 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-red-400 flex items-center justify-center text-[10px] text-red-500">✕</div>
            <span className="text-sm font-semibold text-red-700">반려 처리됨</span>
          </div>
          {rejectReason && <div className="text-[11px] text-red-600 pl-7">사유: {rejectReason}</div>}
        </div>
      )}

      {/* 진행 파이프라인 */}
      {!isRejected && (
        <section className="space-y-2">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">진행 단계</div>
          <div className="flex items-center gap-0.5 overflow-x-auto pb-1">
            {SELL_FLOW.map((step, i) => (
              <div key={step} className="flex items-center gap-0.5 flex-shrink-0">
                <div className={cn(
                  "px-2 py-1.5 text-[9px] font-medium border whitespace-nowrap",
                  i < flowIdx ? "border-muted-foreground/20 bg-muted/50 text-muted-foreground/50"
                  : i === flowIdx ? "border-sage-ink bg-sage-soft/20 text-sage-ink"
                  : "border-border text-muted-foreground/60"
                )}>
                  {step}
                </div>
                {i < SELL_FLOW.length - 1 && (
                  <div className={cn("w-1.5 h-px flex-shrink-0", i < flowIdx ? "bg-muted-foreground/20" : "bg-border")} />
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
          {meta.option && <Row label="옵션" value={meta.option} />}
          <Row label="유형" value={<Badge variant={sell.type === "위탁" ? "outline" : "default"}>{sell.type}</Badge>} />
          <Row label="예상 금액" value={formatPrice(sell.estimated)} />
        </div>
      </section>

      {/* 셀러 정보 */}
      {meta.seller && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">셀러 정보</div>
          <div className="border border-border divide-y divide-border text-sm">
            <Row label="셀러" value={meta.seller} />
            <Row label="연락처" value={meta.sellerPhone} />
            <Row label="주소" value={meta.address} />
          </div>
        </section>
      )}

      {/* 셀러 메모 */}
      {meta.note && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">셀러 메모</div>
          <div className="border border-border px-4 py-4 text-sm text-muted-foreground leading-relaxed">{meta.note}</div>
        </section>
      )}

      {/* 상태별 메인 콘텐츠 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">
          {currentStatus === "검수 중" ? "검수 진행" : currentStatus === "최종 금액 제안" ? "금액 제안 현황" : currentStatus === "계약 완료" ? "계약 정보" : "현재 단계"}
        </div>

        {currentStatus === "접수 완료" && <StatusAccepted />}
        {currentStatus === "배송비 결제 완료" && <StatusShippingPaid meta={meta} />}
        {currentStatus === "픽업 대기" && (
          <StatusPickupPending meta={meta} onComplete={() => setPickupModal(true)} />
        )}
        {currentStatus === "픽업 완료" && (
          <StatusPickupDone meta={meta} onStartInspect={() => setStatus("검수 중")} />
        )}
        {currentStatus === "검수 중" && (
          <StatusInspecting
            meta={meta}
            estimated={sell.estimated}
            onOffer={(g, n, p) => { setFinalGrade(g); setFinalNote(n); setFinalPrice(p); setStatus("최종 금액 제안"); }}
          />
        )}
        {currentStatus === "최종 금액 제안" && (
          <StatusPriceOffered
            grade={finalGrade || meta.inspectionGrade || ""}
            note={finalNote || meta.inspectionNote || ""}
            price={displayPrice}
            estimated={sell.estimated}
            onContract={() => setStatus("계약 완료")}
            onRetry={() => setStatus("검수 중")}
          />
        )}
        {currentStatus === "계약 완료" && (
          <StatusContractDone
            grade={finalGrade || meta.inspectionGrade || ""}
            price={displayPrice}
          />
        )}
      </section>

      {/* 반려 버튼 */}
      {!isDone && (
        <div className="border border-border px-5 py-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-red-600">신청 반려</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">셀러에게 반려 사유 전달</div>
          </div>
          <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50" onClick={() => setRejectModal(true)}>
            반려
          </Button>
        </div>
      )}

      <div className="border-t border-border pt-6 flex justify-end">
        <Link href="/admin/sell"><Button variant="outline">목록으로</Button></Link>
      </div>

      {/* 픽업 완료 모달 */}
      {pickupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setPickupModal(false)} />
          <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">픽업 완료 처리</h3>
              <button onClick={() => setPickupModal(false)}><X size={16} className="text-muted-foreground" /></button>
            </div>
            <p className="text-sm text-muted-foreground">상품 픽업이 완료되었음을 확인합니다. 검수 단계로 이동합니다.</p>
            <div className="flex gap-2 pt-1">
              <Button variant="outline" className="flex-1" onClick={() => setPickupModal(false)}>취소</Button>
              <Button className="flex-1" onClick={() => { setPickupModal(false); setStatus("픽업 완료"); }}>픽업 완료</Button>
            </div>
          </div>
        </div>
      )}

      {/* 반려 모달 */}
      {rejectModal && (
        <RejectSellModal
          onConfirm={(r) => { setRejectModal(false); setStatus("반려"); setRejectReason(r); }}
          onClose={() => setRejectModal(false)}
        />
      )}
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

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between gap-4">
      <span className="text-muted-foreground text-[11px] w-28 flex-shrink-0">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
