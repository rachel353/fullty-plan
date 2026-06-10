import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { billingRequests, type BillingStatus } from "@/lib/billing";

const STATUS_VARIANT: Record<BillingStatus, "default" | "outline" | "muted" | "sage"> = {
  "대기 중": "outline",
  "결제 완료": "sage",
  "연체": "default",
  "취소됨": "muted",
};

export default function AdminBillingDetailPage({ params }: { params: { id: string } }) {
  const request = billingRequests.find((r) => r.id === params.id);
  if (!request) notFound();

  const isOverdue = request.status === "연체";

  return (
    <div className="space-y-8 max-w-2xl">
      {/* 헤더 */}
      <div className="border-b border-border pb-4">
        <Link
          href="/admin/billing"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors"
        >
          <ChevronLeft size={13} /> 추가 청구 관리
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">{request.reason}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {request.brand} {request.productName}
            </p>
          </div>
          <Badge
            variant={STATUS_VARIANT[request.status]}
            className={isOverdue ? "bg-red-500 text-background border-red-500" : undefined}
          >
            {request.status}
          </Badge>
        </div>
      </div>

      {/* 청구 정보 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">청구 정보</div>
        <div className="border border-border divide-y divide-border text-sm">
          <Row label="청구 번호" value={request.id} mono />
          <Row label="연결 렌탈" value={request.rentalId} mono />
          <Row label="회원" value={`${request.userName} (${request.userEmail})`} />
          <Row label="청구 사유" value={request.reason} />
          <Row label="청구 금액" value={`${request.amount.toLocaleString()}원`} />
          <Row label="요청일" value={request.requestedAt} />
          <Row label="납부 마감일" value={request.dueDate} />
          {request.paidAt && <Row label="결제 완료일" value={request.paidAt} />}
        </div>
      </section>

      {/* 메모 */}
      {request.memo && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">메모</div>
          <div className="border border-border px-4 py-3 text-sm text-muted-foreground leading-relaxed">
            {request.memo}
          </div>
        </section>
      )}

      <div className="border-t border-border pt-6">
        <Link href="/admin/billing">
          <Button variant="outline">목록으로</Button>
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between gap-4">
      <span className="text-muted-foreground text-[11px] w-24 flex-shrink-0">{label}</span>
      <span className={mono ? "font-mono text-xs text-sage-ink" : "font-medium text-right"}>{value}</span>
    </div>
  );
}
