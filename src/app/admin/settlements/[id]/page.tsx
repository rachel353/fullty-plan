"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

type SettlementStatus = "정산 예정" | "정산 완료" | "보류";

type SettlementItem = {
  orderId: string;
  product: string;
  date: string;
  salePrice: number;
  fee: number;
  net: number;
  type: "판매" | "렌탈" | "위탁";
};

type Settlement = {
  id: string;
  seller: string;
  sellerBank: string;
  sellerAccount: string;
  type: "판매" | "렌탈" | "위탁";
  period: string;
  totalSale: number;
  feeRate: number;
  fee: number;
  amount: number;
  status: SettlementStatus;
  scheduledAt: string;
  items: SettlementItem[];
};

const SETTLEMENTS: Settlement[] = [
  {
    id: "ad001",
    seller: "빈티지 웍스",
    sellerBank: "신한은행",
    sellerAccount: "110-123-456789",
    type: "판매",
    period: "2026-03",
    totalSale: 1280000,
    feeRate: 15,
    fee: 192000,
    amount: 1088000,
    status: "정산 완료",
    scheduledAt: "2026-04-01",
    items: [
      { orderId: "o001", product: "Herman Miller Aeron Chair", date: "2026-03-08", salePrice: 1280000, fee: 192000, net: 1088000, type: "판매" },
    ],
  },
  {
    id: "ad002",
    seller: "오브제 스튜디오",
    sellerBank: "국민은행",
    sellerAccount: "123-456-789012",
    type: "렌탈",
    period: "2026-03",
    totalSale: 850000,
    feeRate: 15,
    fee: 127500,
    amount: 722500,
    status: "정산 예정",
    scheduledAt: "2026-04-30",
    items: [
      { orderId: "o002", product: "Fritz Hansen Egg Chair (렌탈)", date: "2026-03-15", salePrice: 850000, fee: 127500, net: 722500, type: "렌탈" },
    ],
  },
  {
    id: "ad003",
    seller: "노르딕홈",
    sellerBank: "우리은행",
    sellerAccount: "1002-567-890123",
    type: "위탁",
    period: "2026-04",
    totalSale: 380000,
    feeRate: 20,
    fee: 76000,
    amount: 304000,
    status: "정산 예정",
    scheduledAt: "2026-04-30",
    items: [
      { orderId: "o_ad003", product: "Muuto E27 Pendant (위탁 판매)", date: "2026-04-10", salePrice: 380000, fee: 76000, net: 304000, type: "위탁" },
    ],
  },
  {
    id: "ad004",
    seller: "이태리에디션",
    sellerBank: "하나은행",
    sellerAccount: "302-012-345678",
    type: "판매",
    period: "2026-04",
    totalSale: 5400000,
    feeRate: 15,
    fee: 810000,
    amount: 4590000,
    status: "정산 예정",
    scheduledAt: "2026-04-30",
    items: [
      { orderId: "o006", product: "Cassina LC4 Chaise Longue", date: "2026-04-15", salePrice: 5400000, fee: 810000, net: 4590000, type: "판매" },
    ],
  },
];

function ConfirmModal({ settlement, onConfirm, onClose }: { settlement: Settlement; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">정산 완료 처리</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <div className="border border-border px-4 py-3 space-y-1 text-sm">
          <div className="text-[11px] text-muted-foreground">{settlement.seller}</div>
          <div className="font-semibold">{formatPrice(settlement.amount)}</div>
          <div className="text-[11px] text-muted-foreground">{settlement.sellerBank} {settlement.sellerAccount}</div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          위 계좌로 정산금 지급이 완료되었음을 확인합니다.<br />
          셀러에게 정산 완료 알림이 발송됩니다.
        </p>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" onClick={onConfirm}>정산 완료 확인</Button>
        </div>
      </div>
    </div>
  );
}

function HoldModal({ onConfirm, onClose }: { onConfirm: (reason: string) => void; onClose: () => void }) {
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">정산 보류</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground">정산을 보류 처리합니다. 셀러에게 사유가 전달됩니다.</p>
        <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full h-10 border border-border px-3 text-sm bg-background">
          <option value="">보류 사유 선택</option>
          <option>계좌 정보 불일치</option>
          <option>거래 이의 제기</option>
          <option>정책 위반 조사 중</option>
          <option>기타</option>
        </select>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1 bg-amber-500 hover:bg-amber-600" disabled={!reason} onClick={() => onConfirm(reason)}>보류 처리</Button>
        </div>
      </div>
    </div>
  );
}

export default function SettlementDetailPage() {
  const { id } = useParams<{ id: string }>();
  const settlement = SETTLEMENTS.find((s) => s.id === id);
  const [status, setStatus] = useState<SettlementStatus | null>(null);
  const [holdReason, setHoldReason] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [holdOpen, setHoldOpen] = useState(false);

  if (!settlement) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        정산 내역을 찾을 수 없습니다.
        <Link href="/admin/settlements" className="block mt-3 text-sage-ink underline">목록으로</Link>
      </div>
    );
  }

  const currentStatus = status ?? settlement.status;
  const isPending = currentStatus === "정산 예정";

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="border-b border-border pb-4">
        <Link href="/admin/settlements" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 정산 관리
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{settlement.seller}</h2>
            <p className="text-[11px] text-muted-foreground mt-1">{settlement.id} · {settlement.period} 정산</p>
          </div>
          <Badge variant={currentStatus === "정산 완료" ? "default" : currentStatus === "보류" ? "muted" : "outline"}>
            {currentStatus}
          </Badge>
        </div>
      </div>

      {/* 완료 배너 */}
      {currentStatus === "정산 완료" && (
        <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-4 flex items-center gap-3">
          <div className="w-6 h-6 bg-sage-deep flex items-center justify-center flex-shrink-0">
            <Check size={12} className="text-background" />
          </div>
          <div>
            <div className="text-sm font-semibold">정산 완료</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">
              {formatPrice(settlement.amount)} 지급 완료 · 셀러 알림 발송됨
            </div>
          </div>
        </div>
      )}

      {currentStatus === "보류" && (
        <div className="border border-amber-200 bg-amber-50 px-5 py-4 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-amber-400 flex items-center justify-center text-[10px] text-amber-600">!</div>
            <span className="text-sm font-semibold text-amber-800">정산 보류</span>
          </div>
          {holdReason && <div className="text-[11px] text-amber-700 pl-7">사유: {holdReason}</div>}
        </div>
      )}

      {/* 정산 요약 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">정산 요약</div>
        <div className="border border-border divide-y divide-border text-sm">
          <Row label="유형" value={<Badge variant="outline">{settlement.type}</Badge>} />
          <Row label="정산 기간" value={settlement.period} />
          <Row label="예정일" value={settlement.scheduledAt} />
          <Row label="총 거래금액" value={formatPrice(settlement.totalSale)} />
          <Row label={`수수료 (${settlement.feeRate}%)`} value={<span className="text-muted-foreground">- {formatPrice(settlement.fee)}</span>} />
          <Row
            label="실 정산액"
            value={<span className="text-lg font-bold">{formatPrice(settlement.amount)}</span>}
          />
        </div>
      </section>

      {/* 입금 계좌 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">입금 계좌</div>
        <div className="border border-border divide-y divide-border text-sm">
          <Row label="셀러" value={settlement.seller} />
          <Row label="은행" value={settlement.sellerBank} />
          <Row label="계좌번호" value={settlement.sellerAccount} />
        </div>
      </section>

      {/* 정산 내역 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">정산 내역</div>
        <div className="border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted">
              <tr className="text-left text-xs font-medium text-muted-foreground">
                <th className="px-4 py-3">주문 ID</th>
                <th className="px-4 py-3">상품</th>
                <th className="px-4 py-3">거래일</th>
                <th className="px-4 py-3 text-right">거래액</th>
                <th className="px-4 py-3 text-right">수수료</th>
                <th className="px-4 py-3 text-right">정산액</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {settlement.items.map((item) => (
                <tr key={item.orderId} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-[11px] text-muted-foreground">{item.orderId}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{item.product}</div>
                    <Badge variant="outline" className="text-[10px] mt-0.5">{item.type}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{item.date}</td>
                  <td className="px-4 py-3 text-right">{formatPrice(item.salePrice)}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">-{formatPrice(item.fee)}</td>
                  <td className="px-4 py-3 text-right font-semibold">{formatPrice(item.net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 정산 처리 액션 */}
      {isPending && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">정산 처리</div>
          <div className="border border-border divide-y divide-border">
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">정산 완료 처리</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">지급 확인 후 정산 완료로 변경</div>
              </div>
              <Button size="sm" onClick={() => setConfirmOpen(true)}>정산 완료</Button>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-amber-700">정산 보류</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">이의 제기 또는 계좌 문제 시 보류</div>
              </div>
              <Button size="sm" variant="outline" className="text-amber-600 border-amber-200 hover:bg-amber-50" onClick={() => setHoldOpen(true)}>보류</Button>
            </div>
          </div>
        </section>
      )}

      <div className="border-t border-border pt-6 flex justify-end">
        <Link href="/admin/settlements"><Button variant="outline">목록으로</Button></Link>
      </div>

      {confirmOpen && (
        <ConfirmModal
          settlement={settlement}
          onConfirm={() => { setConfirmOpen(false); setStatus("정산 완료"); }}
          onClose={() => setConfirmOpen(false)}
        />
      )}
      {holdOpen && (
        <HoldModal
          onConfirm={(r) => { setHoldOpen(false); setStatus("보류"); setHoldReason(r); }}
          onClose={() => setHoldOpen(false)}
        />
      )}
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
