import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

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
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">쿠폰 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">
            자동 발행 · 쿠폰 코드 생성 · 특정 등급 지정 발행 · 이용 가능 수량 조정
          </p>
        </div>
        <Button>+ 쿠폰 생성</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Stat label="활성 쿠폰" value="3개" />
        <Stat label="이번 달 발행" value="1,420장" />
        <Stat label="이번 달 사용" value="742장" />
        <Stat label="예상 할인액" value="18,240,000원" />
      </div>

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

      <div className="border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted">
            <tr className="text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">쿠폰 ID</th>
              <th className="px-4 py-3">이름</th>
              <th className="px-4 py-3">코드</th>
              <th className="px-4 py-3">대상</th>
              <th className="px-4 py-3">할인</th>
              <th className="px-4 py-3">발행/사용/잔여</th>
              <th className="px-4 py-3">만료</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {coupons.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{c.id}</td>
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 font-mono text-[11px]">{c.code}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{c.target}</Badge>
                </td>
                <td className="px-4 py-3 font-medium">{c.discount}</td>
                <td className="px-4 py-3 text-[11px] text-muted-foreground">
                  {c.issued} / {c.used} / <strong className="text-sage-ink">{c.remaining}</strong>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{c.expires}</td>
                <td className="px-4 py-3">
                  <Badge variant={c.status === "활성" ? "default" : "muted"}>{c.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button size="sm" variant="ghost">
                    수정
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-5">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-xl font-bold mt-2">{value}</div>
    </div>
  );
}
