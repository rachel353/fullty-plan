import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const PENDING = [
  {
    id: "pa001",
    reason: "구매평 작성",
    amount: 2000,
    date: "2026-04-27",
  },
  {
    id: "pa002",
    reason: "포토 구매평 추가지급",
    amount: 1000,
    date: "2026-04-27",
  },
];

const HISTORY = [
  { date: "2026-04-13", type: "적립" as const, desc: "구매 적립", amount: 12800, expires: "2027-04-13" },
  { date: "2026-04-05", type: "프로모션" as const, desc: "신규 가입 혜택", amount: 30000, expires: "2026-07-04" },
  { date: "2026-03-20", type: "사용" as const, desc: "결제 사용", amount: -18300, expires: "-" },
];

export default function MyMoneyPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4">
        <Link
          href="/mypage/grade"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors"
        >
          <ChevronLeft size={13} /> 등급 / 쿠폰 / 풀티머니
        </Link>
        <h2 className="text-xl font-bold">풀티머니 내역</h2>
      </div>

      {/* 잔액 */}
      <Card>
        <CardContent className="py-6">
          <div className="text-[11px] text-muted-foreground tracking-widest uppercase">사용 가능 잔액</div>
          <div className="text-3xl font-bold mt-2">124,500원</div>
        </CardContent>
      </Card>

      {/* 적립 예정 (심사중) */}
      {PENDING.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>적립 예정 ({PENDING.length}건 심사중)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {PENDING.map((p) => (
              <div key={p.id} className="border border-border p-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{p.reason}</span>
                    <Badge variant="outline">심사중</Badge>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    {p.date} 신청 · 운영팀 검수 후 적립됩니다 (영업일 기준 1~2일 소요)
                  </div>
                </div>
                <div className="text-sm font-semibold flex-shrink-0">+{p.amount.toLocaleString()}원</div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 전체 내역 */}
      <Card>
        <CardHeader>
          <CardTitle>전체 내역</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted">
              <tr className="text-left text-xs font-medium text-muted-foreground">
                <th className="px-4 py-3">일자</th>
                <th className="px-4 py-3">구분</th>
                <th className="px-4 py-3">내용</th>
                <th className="px-4 py-3">만료일</th>
                <th className="px-4 py-3 text-right">금액</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {HISTORY.map((h, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 text-muted-foreground">{h.date}</td>
                  <td className="px-4 py-3">
                    <Badge variant={h.amount < 0 ? "muted" : "default"}>{h.type}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{h.desc}</td>
                  <td className="px-4 py-3 text-muted-foreground">{h.expires}</td>
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
        </CardContent>
      </Card>
    </div>
  );
}
