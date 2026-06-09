import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { contracts, type ContractStatus } from "@/lib/contracts";
import { cn } from "@/lib/utils";

const MY_USER_ID = "u001";

const STATUS_VARIANT: Record<ContractStatus, "default" | "outline" | "muted" | "sage"> = {
  "대기 중": "outline",
  "서명 완료": "sage",
  "만료": "muted",
  "취소됨": "muted",
};

export default function MypageContractsPage() {
  const myContracts = contracts.filter((c) => c.userId === MY_USER_ID);
  const pending = myContracts.filter((c) => c.status === "대기 중");
  const rest = myContracts.filter((c) => c.status !== "대기 중");

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-5">
        <h2 className="text-lg font-bold">계약서</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Fullty에서 발송된 계약서 목록입니다. 서명 대기 중인 계약서는 기간 내 서명을 완료하세요.
        </p>
      </div>

      {/* 서명 대기 */}
      {pending.length > 0 && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">서명 필요</div>
          <div className="space-y-px">
            {pending.map((c) => (
              <Link key={c.id} href={`/mypage/contracts/${c.id}`} className="block">
                <div className="border border-sage-ink/30 bg-sage-soft/10 px-5 py-4 flex items-center justify-between gap-4 hover:bg-sage-soft/20 transition-colors">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">대기 중</Badge>
                      <span className="text-[10px] text-muted-foreground">만료 {c.expiresAt}</span>
                    </div>
                    <div className="font-medium text-sage-ink truncate">{c.templateName}</div>
                    {c.note && <div className="text-[11px] text-muted-foreground mt-0.5">{c.note}</div>}
                  </div>
                  <span className="text-xs font-medium text-sage-ink flex-shrink-0">서명하기 →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 전체 내역 */}
      {rest.length > 0 && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">계약 내역</div>
          <div className="border border-border divide-y divide-border">
            {rest.map((c) => (
              <Link
                key={c.id}
                href={c.status === "서명 완료" ? `/mypage/contracts/${c.id}` : "#"}
                className={cn(
                  "flex items-center justify-between gap-4 px-5 py-4 transition-colors",
                  c.status === "서명 완료" ? "hover:bg-muted/30" : "cursor-default opacity-50"
                )}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={STATUS_VARIANT[c.status]}>{c.status}</Badge>
                    <span className="text-[10px] text-muted-foreground">
                      {c.signedAt ? `서명 ${c.signedAt}` : `발송 ${c.sentAt}`}
                    </span>
                  </div>
                  <div className="font-medium text-sage-ink truncate">{c.templateName}</div>
                  {c.note && <div className="text-[11px] text-muted-foreground mt-0.5">{c.note}</div>}
                </div>
                {c.status === "서명 완료" && (
                  <span className="text-xs text-muted-foreground flex-shrink-0">보기 →</span>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {myContracts.length === 0 && (
        <div className="py-20 text-center text-sm text-muted-foreground">
          발송된 계약서가 없습니다.
        </div>
      )}
    </div>
  );
}
