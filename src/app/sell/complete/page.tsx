import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function SellCompletePage() {
  return (
    <div className="max-w-2xl mx-auto px-12 py-20">
      <div className="text-center pb-12 border-b border-border">
        <Badge variant="sage" className="mb-6">
          PAYMENT CONFIRMED
        </Badge>
        <h1 className="font-display text-5xl text-sage-ink leading-[0.95]">
          SELL 신청이
          <br />
          접수되었습니다.
        </h1>
        <p className="text-sm text-muted-foreground mt-5 leading-relaxed">
          픽업 배송비 결제가 완료되어 Fullty가 일정을 조율합니다.
          <br />
          픽업·검수가 끝나면 매입가와 위탁 조건을 함께 제안드립니다.
        </p>
      </div>

      <div className="mt-10 space-y-1">
        <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
          Receipt
        </div>
        <div className="border border-border">
          <div className="grid grid-cols-2 divide-x divide-border">
            <Cell label="신청 번호" value="FUL-SELL-2026-04-10-042" />
            <Cell label="결제 금액" value="45,000원" />
            <Cell label="결제 수단" value="신용/체크카드" />
            <Cell label="예상 픽업 일정" value="2026-04-15 (화)" />
          </div>
        </div>
      </div>

      <div className="mt-10 bg-sage-soft/40 border border-sage/40 p-6">
        <div className="text-[10px] tracking-[0.25em] uppercase text-sage-ink mb-3">
          Next Steps
        </div>
        <ol className="space-y-3 text-xs text-sage-ink">
          <li className="flex items-start gap-3">
            <span className="font-display text-lg leading-none">1.</span>
            <span>Fullty가 24시간 내 연락드려 픽업 일정을 조율합니다.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-display text-lg leading-none">2.</span>
            <span>픽업 완료 후 검수 (2~3영업일)가 진행됩니다.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-display text-lg leading-none">3.</span>
            <span>검수 통과 시 매입가 / 위탁 조건을 함께 제안드립니다.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-display text-lg leading-none">4.</span>
            <span>제안 확인 후 원하는 방식으로 계약이 진행됩니다.</span>
          </li>
        </ol>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3">
        <Link href="/mypage/sell" className="block">
          <Button variant="outline" size="lg" className="w-full">
            SELL 내역 보기
          </Button>
        </Link>
        <Link href="/" className="block">
          <Button size="lg" className="w-full">
            홈으로
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-5">
      <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">{label}</div>
      <div className="text-sm font-medium mt-1">{value}</div>
    </div>
  );
}
