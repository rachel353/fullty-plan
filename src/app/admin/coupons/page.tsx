import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const coupons = [
  {
    id: "c001",
    name: "신규 가입 5만원 할인",
    code: "WELCOME50",
    target: "전체",
    discount: "50,000원",
    issued: 1284,
    used: 642,
    remaining: 642,
    expires: "2026-06-30",
    status: "활성",
  },
  {
    id: "c002",
    name: "렌탈 첫 주문 10% 할인",
    code: "RENT10",
    target: "전체",
    discount: "10%",
    issued: 820,
    used: 301,
    remaining: 519,
    expires: "2026-05-15",
    status: "활성",
  },
  {
    id: "c003",
    name: "GOLD 등급 전용 15% 할인",
    code: "GOLD15",
    target: "GOLD 이상",
    discount: "15%",
    issued: 48,
    used: 12,
    remaining: 36,
    expires: "2026-07-01",
    status: "활성",
  },
  {
    id: "c004",
    name: "1월 프로모션 2만원",
    code: "JAN20K",
    target: "전체",
    discount: "20,000원",
    issued: 500,
    used: 487,
    remaining: 13,
    expires: "2026-02-28",
    status: "종료",
  },
];

export default function AdminCouponsPage() {
  const totalIssued = coupons.reduce((s, c) => s + c.issued, 0);
  const totalUsed = coupons.reduce((s, c) => s + c.used, 0);
  const totalRemaining = coupons.reduce((s, c) => s + c.remaining, 0);
  const overallRate = totalIssued > 0 ? Math.round((totalUsed / totalIssued) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">쿠폰 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">
            자동 발행 · 쿠폰 코드 생성 · 특정 등급 지정 발행 · 이용 가능 수량 조정
          </p>
        </div>
        <Link href="/admin/coupons/new"><Button>+ 쿠폰 생성</Button></Link>
      </div>

      {/* 전체 요약 stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="활성 쿠폰" value={`${coupons.filter(c => c.status === "활성").length}개`} />
        <Stat label="총 발행" value={totalIssued.toLocaleString() + "장"} />
        <Stat label="총 사용" value={totalUsed.toLocaleString() + "장"} highlight />
        <Stat label="총 잔여" value={totalRemaining.toLocaleString() + "장"} />
      </div>

      {/* 전체 사용률 바 */}
      <div className="border border-border p-5 space-y-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted-foreground font-medium tracking-wide">전체 쿠폰 사용률</span>
          <span className="font-bold text-sage-ink">{overallRate}%</span>
        </div>
        <div className="relative h-3 bg-muted overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-sage-ink transition-all"
            style={{ width: `${overallRate}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>사용 {totalUsed.toLocaleString()}장</span>
          <span>잔여 {totalRemaining.toLocaleString()}장 · 총 {totalIssued.toLocaleString()}장 발행</span>
        </div>
      </div>

      {/* 필터 탭 */}
      <div className="flex items-center gap-2">
        {["전체", "활성", "예정", "종료"].map((s, i) => (
          <button
            key={s}
            className={
              i === 0
                ? "px-4 h-9 text-xs font-medium border border-foreground bg-foreground text-background"
                : "px-4 h-9 text-xs font-medium border border-border hover:bg-muted"
            }
          >
            {s}
          </button>
        ))}
      </div>

      {/* 쿠폰 목록 */}
      <div className="border border-border divide-y divide-border">
        {coupons.map((c) => {
          const rate = c.issued > 0 ? Math.round((c.used / c.issued) * 100) : 0;
          const isLow = c.remaining > 0 && c.remaining / c.issued < 0.05;
          const isExpired = c.status === "종료";

          return (
            <div
              key={c.id}
              className={cn(
                "px-5 py-5 grid grid-cols-12 gap-4 items-start",
                isExpired && "opacity-60"
              )}
            >
              {/* 왼쪽: 기본 정보 */}
              <div className="col-span-12 md:col-span-5 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={isExpired ? "muted" : "default"}>{c.status}</Badge>
                  <Badge variant="outline">{c.target}</Badge>
                  <span className="font-mono text-[11px] text-muted-foreground bg-muted px-2 py-0.5">
                    {c.code}
                  </span>
                </div>
                <div className="font-medium text-sage-ink">{c.name}</div>
                <div className="text-[11px] text-muted-foreground">
                  할인 <span className="text-foreground font-medium">{c.discount}</span>
                  &nbsp;·&nbsp;
                  만료 <span className="text-foreground">{c.expires}</span>
                </div>
              </div>

              {/* 오른쪽: 사용 현황 */}
              <div className="col-span-12 md:col-span-6 space-y-2">
                {/* 수치 행 */}
                <div className="grid grid-cols-3 text-center divide-x divide-border border border-border">
                  <UsageStat label="발행" value={c.issued} />
                  <UsageStat label="사용" value={c.used} accent />
                  <UsageStat
                    label="잔여"
                    value={c.remaining}
                    warn={isLow}
                  />
                </div>

                {/* 프로그레스 바 */}
                <div className="space-y-1">
                  <div className="relative h-2 bg-muted overflow-hidden">
                    <div
                      className={cn(
                        "absolute inset-y-0 left-0 transition-all",
                        isExpired ? "bg-muted-foreground/40" : "bg-sage-ink"
                      )}
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>사용률 <strong className={cn("font-semibold", !isExpired && "text-sage-ink")}>{rate}%</strong></span>
                    {isLow && (
                      <span className="text-amber-600 font-medium">잔여 수량 부족</span>
                    )}
                    {!isLow && (
                      <span>잔여 {c.remaining.toLocaleString()}장</span>
                    )}
                  </div>
                </div>
              </div>

              {/* 관리 버튼 */}
              <div className="col-span-12 md:col-span-1 flex md:justify-end items-start">
                <Link href={`/admin/coupons/${c.id}`}>
                  <Button size="sm" variant="outline">수정</Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="border border-border p-5">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className={cn("text-xl font-bold mt-2", highlight && "text-sage-ink")}>{value}</div>
    </div>
  );
}

function UsageStat({
  label,
  value,
  accent,
  warn,
}: {
  label: string;
  value: number;
  accent?: boolean;
  warn?: boolean;
}) {
  return (
    <div className="py-2.5 px-3">
      <div className="text-[10px] text-muted-foreground mb-0.5">{label}</div>
      <div
        className={cn(
          "text-base font-bold",
          accent && "text-sage-ink",
          warn && "text-amber-600"
        )}
      >
        {value.toLocaleString()}
      </div>
    </div>
  );
}
