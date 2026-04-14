import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const balances = [
  { id: "m001", name: "김풀티", email: "kimfullty@gmail.com", balance: 124500 },
  { id: "m002", name: "이가구", email: "leeg@kakao.com", balance: 48200 },
  { id: "m003", name: "박빈티", email: "park@gmail.com", balance: 0 },
];

const history = [
  { date: "2026-04-13", member: "김풀티", type: "적립" as const, amount: 12800, reason: "구매 적립" },
  { date: "2026-04-10", member: "이가구", type: "사용" as const, amount: -50000, reason: "결제 사용" },
  { date: "2026-04-08", member: "박빈티", type: "수동 조정" as const, amount: 10000, reason: "운영팀 보정" },
  { date: "2026-04-05", member: "김풀티", type: "프로모션" as const, amount: 30000, reason: "신규 가입 혜택" },
];

export default function AdminMoneyPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">풀티머니 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">
          회원별 잔액 · 적립/사용 이력 · 관리자 수동 조정 · 프로모션 지급
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Stat label="총 발행액" value="12,840,000원" />
        <Stat label="총 사용액" value="8,210,000원" />
        <Stat label="총 잔액" value="4,630,000원" />
        <Stat label="이번 달 적립" value="840,000원" />
      </div>

      {/* Balances */}
      <div>
        <div className="flex items-end justify-between mb-3">
          <div className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            회원 잔액 조회
          </div>
          <div className="flex gap-2">
            <input
              placeholder="회원 검색"
              className="h-9 px-3 text-xs border border-border bg-background w-60"
            />
            <Button size="sm">수동 조정</Button>
          </div>
        </div>
        <div className="border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted">
              <tr className="text-left text-xs font-medium text-muted-foreground">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">이름</th>
                <th className="px-4 py-3">이메일</th>
                <th className="px-4 py-3 text-right">잔액</th>
                <th className="px-4 py-3 text-right">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {balances.map((b) => (
                <tr key={b.id}>
                  <td className="px-4 py-3 text-[11px] text-muted-foreground">{b.id}</td>
                  <td className="px-4 py-3 font-medium">{b.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{b.email}</td>
                  <td className="px-4 py-3 text-right font-medium">
                    {b.balance.toLocaleString()}원
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="ghost">
                      조정
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* History */}
      <div>
        <div className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
          적립 / 사용 이력
        </div>
        <div className="border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted">
              <tr className="text-left text-xs font-medium text-muted-foreground">
                <th className="px-4 py-3">일자</th>
                <th className="px-4 py-3">회원</th>
                <th className="px-4 py-3">구분</th>
                <th className="px-4 py-3">사유</th>
                <th className="px-4 py-3 text-right">금액</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {history.map((h, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 text-muted-foreground">{h.date}</td>
                  <td className="px-4 py-3 font-medium">{h.member}</td>
                  <td className="px-4 py-3">
                    <Badge variant={h.amount < 0 ? "muted" : "default"}>{h.type}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{h.reason}</td>
                  <td
                    className={
                      h.amount < 0
                        ? "px-4 py-3 text-right font-medium text-muted-foreground"
                        : "px-4 py-3 text-right font-medium"
                    }
                  >
                    {h.amount > 0 ? "+" : ""}
                    {h.amount.toLocaleString()}원
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
