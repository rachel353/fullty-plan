import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { billingRequests, type BillingStatus } from "@/lib/billing";
import { cn } from "@/lib/utils";

const MY_USER_ID = "u001";

const STATUS_VARIANT: Record<BillingStatus, "default" | "outline" | "muted" | "sage"> = {
  "대기 중": "outline",
  "결제 완료": "sage",
  "연체": "default",
  "취소됨": "muted",
};

export default function MypageBillingPage() {
  const myRequests = billingRequests.filter((r) => r.userId === MY_USER_ID);
  const pending = myRequests.filter((r) => r.status === "대기 중" || r.status === "연체");
  const rest = myRequests.filter((r) => r.status === "결제 완료" || r.status === "취소됨");

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-5">
        <h2 className="text-lg font-bold">추가 청구</h2>
        <p className="text-sm text-muted-foreground mt-1">
          렌탈 이용 중 발생한 손상 / 연체 / 클리닝 등 추가 결제 요청 내역입니다.
        </p>
      </div>

      {/* 결제 필요 */}
      {pending.length > 0 && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">결제 필요</div>
          <div className="space-y-px">
            {pending.map((r) => {
              const isOverdue = r.status === "연체";
              return (
                <Link key={r.id} href={`/mypage/billing/${r.id}`} className="block">
                  <div
                    className={cn(
                      "border px-5 py-4 flex items-center justify-between gap-4 transition-colors",
                      isOverdue
                        ? "border-red-300 bg-red-50 hover:bg-red-100/70"
                        : "border-sage-ink/30 bg-sage-soft/10 hover:bg-sage-soft/20"
                    )}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant={STATUS_VARIANT[r.status]}
                          className={isOverdue ? "bg-red-500 text-background border-red-500" : undefined}
                        >
                          {r.status}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">납부 마감 {r.dueDate}</span>
                      </div>
                      <div className="font-medium text-sage-ink truncate">
                        {r.brand} {r.productName} · {r.reason}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {r.amount.toLocaleString()}원
                      </div>
                    </div>
                    <span className="text-xs font-medium text-sage-ink flex-shrink-0">결제하기 →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* 처리 내역 */}
      {rest.length > 0 && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">처리 내역</div>
          <div className="border border-border divide-y divide-border">
            {rest.map((r) => (
              <Link
                key={r.id}
                href={r.status === "결제 완료" ? `/mypage/billing/${r.id}` : "#"}
                className={cn(
                  "flex items-center justify-between gap-4 px-5 py-4 transition-colors",
                  r.status === "결제 완료" ? "hover:bg-muted/30" : "cursor-default opacity-50"
                )}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>
                    <span className="text-[10px] text-muted-foreground">
                      {r.paidAt ? `결제 ${r.paidAt}` : `요청 ${r.requestedAt}`}
                    </span>
                  </div>
                  <div className="font-medium text-sage-ink truncate">
                    {r.brand} {r.productName} · {r.reason}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {r.amount.toLocaleString()}원
                  </div>
                </div>
                {r.status === "결제 완료" && (
                  <span className="text-xs text-muted-foreground flex-shrink-0">보기 →</span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {myRequests.length === 0 && (
        <div className="py-20 text-center text-sm text-muted-foreground">
          추가 청구 내역이 없습니다.
        </div>
      )}
    </div>
  );
}
