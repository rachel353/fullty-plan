"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type SellerStatus = "심사 대기" | "승인" | "반려";

const SELLER_DATA = [
  {
    id: "sl001",
    name: "오브제 스튜디오",
    type: "사업자" as const,
    applied: "2026-04-08",
    status: "심사 대기" as SellerStatus,
    rep: "김오브제",
    phone: "02-1234-5678",
    email: "objet@studio.kr",
    bizNo: "123-45-67890",
    bizType: "소매업 / 가구 및 홈인테리어",
    address: "서울특별시 성동구 성수이로 77, 3층",
    docSubmitted: true,
  },
  {
    id: "sl002",
    name: "노르딕홈",
    type: "사업자" as const,
    applied: "2026-04-07",
    status: "심사 대기" as SellerStatus,
    rep: "이노르딕",
    phone: "031-987-6543",
    email: "nordic@home.kr",
    bizNo: "987-65-43210",
    bizType: "소매업 / 북유럽 가구",
    address: "경기도 성남시 분당구 판교역로 235",
    docSubmitted: true,
  },
  {
    id: "sl003",
    name: "김컬렉터",
    type: "개인" as const,
    applied: "2026-04-05",
    status: "승인" as SellerStatus,
    rep: "김컬렉터",
    phone: "010-5555-7777",
    email: "collector@gmail.com",
    bizNo: null,
    bizType: null,
    address: "서울특별시 마포구 합정동",
    docSubmitted: true,
    approvedAt: "2026-04-06",
    sales: {
      products: 4,
      gmvTotal: 2840000,
      gmvMonth: 680000,
      activeRentals: 1,
      pendingSettlement: 320000,
    },
  },
  {
    id: "sl004",
    name: "이태리에디션",
    type: "사업자" as const,
    applied: "2026-04-03",
    status: "반려" as SellerStatus,
    rep: "박이태리",
    phone: "02-8888-9999",
    email: "italy@edition.kr",
    bizNo: "555-66-77777",
    bizType: "소매업 / 이탈리아 수입 가구",
    address: "서울특별시 강남구 청담동 12",
    docSubmitted: false,
    rejectedAt: "2026-04-05",
    rejectReason: "사업자등록증 서류 미제출",
  },
];

const REJECT_REASONS = [
  "사업자등록증 미제출 또는 불일치",
  "신분증 미제출 또는 불일치",
  "서류 정보와 신청 정보 불일치",
  "중복 계정 의심",
  "운영 정책 위반 이력",
  "기타 (직접 입력)",
];

function ApproveModal({ name, onConfirm, onClose }: { name: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">셀러 승인</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">{name}</span>을(를) 셀러로 승인합니다.<br />
          승인 즉시 셀러 기능이 활성화되고 알림이 발송됩니다.
        </p>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" onClick={onConfirm}>승인 확정</Button>
        </div>
      </div>
    </div>
  );
}

function RejectModal({ name, onConfirm, onClose }: { name: string; onConfirm: (reason: string) => void; onClose: () => void }) {
  const [selected, setSelected] = useState("");
  const [custom, setCustom] = useState("");
  const isCustom = selected === "기타 (직접 입력)";
  const reason = isCustom ? custom : selected;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">셀러 반려</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{name}</span>의 셀러 신청을 반려합니다.<br />
          반려 사유가 신청자에게 전달됩니다.
        </p>
        <div className="space-y-2">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">반려 사유</div>
          {REJECT_REASONS.map((r) => (
            <button
              key={r}
              onClick={() => setSelected(r)}
              className={cn(
                "w-full text-left px-3 py-2.5 border text-sm transition-colors",
                selected === r ? "border-sage-ink bg-sage-soft/20 text-sage-ink" : "border-border hover:bg-muted"
              )}
            >
              {r}
            </button>
          ))}
          {isCustom && (
            <textarea
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="반려 사유를 직접 입력하세요"
              className="w-full border border-border px-3 py-2 text-sm bg-transparent resize-none h-20 outline-none focus:border-sage-ink"
            />
          )}
        </div>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button
            className="flex-1 bg-red-500 hover:bg-red-600"
            disabled={!reason.trim()}
            onClick={() => onConfirm(reason)}
          >
            반려 확정
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function SellerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const sellerData = SELLER_DATA.find((s) => s.id === id);
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [status, setStatus] = useState<SellerStatus | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  if (!sellerData) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        셀러를 찾을 수 없습니다.
        <Link href="/admin/sellers" className="block mt-3 text-sage-ink underline">목록으로</Link>
      </div>
    );
  }

  const currentStatus = status ?? sellerData.status;
  const currentRejectReason = rejectReason || sellerData.rejectReason;

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="border-b border-border pb-4">
        <Link href="/admin/sellers" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 셀러 승인 심사
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{sellerData.name}</h2>
            <p className="text-[11px] text-muted-foreground mt-1">{sellerData.id} · 신청일 {sellerData.applied}</p>
          </div>
          <Badge variant={currentStatus === "승인" ? "default" : currentStatus === "반려" ? "muted" : "outline"}>
            {currentStatus}
          </Badge>
        </div>
      </div>

      {/* 처리 결과 배너 */}
      {currentStatus === "승인" && (
        <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-4 flex items-center gap-3">
          <div className="w-6 h-6 bg-sage-deep flex items-center justify-center flex-shrink-0">
            <Check size={12} className="text-background" />
          </div>
          <div>
            <div className="text-sm font-semibold">승인 완료</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">
              {sellerData.approvedAt ?? "방금"} · 셀러 기능 활성화 및 알림 발송 완료
            </div>
          </div>
        </div>
      )}

      {currentStatus === "반려" && (
        <div className="border border-red-200 bg-red-50 px-5 py-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-red-400 flex items-center justify-center text-[10px] text-red-500">✕</div>
            <span className="text-sm font-semibold text-red-700">반려 처리됨</span>
            {(sellerData.rejectedAt) && <span className="text-[11px] text-red-400 ml-auto">{sellerData.rejectedAt}</span>}
          </div>
          {currentRejectReason && (
            <div className="text-[11px] text-red-600 pl-7">{currentRejectReason}</div>
          )}
        </div>
      )}

      {/* 매출 정보 — 승인된 셀러만 */}
      {currentStatus === "승인" && sellerData.sales && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">매출 정보</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SalesStat label="등록 상품" value={`${sellerData.sales.products}개`} />
            <SalesStat label="누적 GMV" value={`${sellerData.sales.gmvTotal.toLocaleString()}원`} />
            <SalesStat label="이번 달 GMV" value={`${sellerData.sales.gmvMonth.toLocaleString()}원`} />
            <SalesStat label="활성 렌탈" value={`${sellerData.sales.activeRentals}건`} />
          </div>
          <div className="border border-border px-4 py-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground text-[11px]">정산 예정 금액</span>
            <span className="font-semibold">{sellerData.sales.pendingSettlement.toLocaleString()}원</span>
          </div>
        </section>
      )}

      {/* 신청자 정보 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">신청자 정보</div>
        <div className="border border-border divide-y divide-border text-sm">
          <Row label="셀러명" value={sellerData.name} />
          <Row label="유형" value={<Badge variant="outline">{sellerData.type} 셀러</Badge>} />
          <Row label="대표자 / 신청인" value={sellerData.rep} />
          <Row label="연락처" value={sellerData.phone} />
          <Row label="이메일" value={sellerData.email} />
          <Row label="주소" value={sellerData.address} />
        </div>
      </section>

      {/* 사업자 추가 정보 */}
      {sellerData.type === "사업자" && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">사업자 정보</div>
          <div className="border border-border divide-y divide-border text-sm">
            <Row label="사업자등록번호" value={sellerData.bizNo ?? "-"} />
            <Row label="업태 / 업종" value={sellerData.bizType ?? "-"} />
          </div>
        </section>
      )}

      {/* 제출 서류 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">제출 서류</div>
        <div className="border border-border p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>{sellerData.type === "사업자" ? "사업자등록증" : "신분증"}</span>
            <Badge variant={sellerData.docSubmitted ? "default" : "muted"}>
              {sellerData.docSubmitted ? "제출 완료" : "미제출"}
            </Badge>
          </div>
          {sellerData.docSubmitted && (
            <div className="grid grid-cols-2 gap-2">
              <div className="border border-border aspect-video bg-muted/20 flex items-center justify-center text-[10px] text-muted-foreground">
                서류 이미지 1
              </div>
              <div className="border border-border aspect-video bg-muted/20 flex items-center justify-center text-[10px] text-muted-foreground">
                서류 이미지 2
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 심사 액션 */}
      {currentStatus === "심사 대기" && (
        <div className="border border-border px-5 py-5 space-y-4">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">심사 결정</div>
          <p className="text-[11px] text-muted-foreground">
            승인 시 즉시 셀러 기능이 활성화됩니다. 반려 시 사유가 신청자에게 전달됩니다.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setRejectOpen(true)}>반려</Button>
            <Button className="flex-1" onClick={() => setApproveOpen(true)}>승인</Button>
          </div>
        </div>
      )}

      <div className="border-t border-border pt-6 flex justify-end">
        <Link href="/admin/sellers"><Button variant="outline">목록으로</Button></Link>
      </div>

      {approveOpen && (
        <ApproveModal
          name={sellerData.name}
          onConfirm={() => { setApproveOpen(false); setStatus("승인"); }}
          onClose={() => setApproveOpen(false)}
        />
      )}

      {rejectOpen && (
        <RejectModal
          name={sellerData.name}
          onConfirm={(reason) => { setRejectOpen(false); setStatus("반려"); setRejectReason(reason); }}
          onClose={() => setRejectOpen(false)}
        />
      )}
    </div>
  );
}

function SalesStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-4">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-base font-bold mt-1.5">{value}</div>
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
