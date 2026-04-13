import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";

const rows = [
  {
    id: "st001",
    name: "Herman Miller Aeron",
    type: "판매" as const,
    sale: 1280000,
    fee: 192000,
    payout: 1088000,
    status: "지급 완료" as const,
    period: "2026-03",
  },
  {
    id: "st002",
    name: "Fritz Hansen Egg Chair",
    type: "렌탈" as const,
    sale: 850000,
    fee: 127500,
    payout: 722500,
    status: "정산 확정" as const,
    period: "2026-03",
  },
  {
    id: "st003",
    name: "Vitra Panton Chair",
    type: "위탁" as const,
    sale: 380000,
    fee: 76000,
    payout: 304000,
    status: "정산 예정" as const,
    period: "2026-04",
  },
];

export default function SettlementsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">정산 내역</h2>
        <p className="text-sm text-muted-foreground mt-1">매월 15일 정산 지급</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Stat label="이번 달 정산 예정" value="3,840,000원" />
        <Stat label="지난 달 지급 완료" value="2,180,000원" />
        <Stat label="누적 정산" value="42,650,000원" />
      </div>

      <div className="flex items-center gap-2">
        {["전체", "판매", "렌탈", "위탁"].map((s, i) => (
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
        <div className="ml-auto">
          <Select placeholder="최근 3개월" options={["최근 3개월", "최근 6개월", "2026년"]} className="w-32" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted">
              <tr className="text-left text-xs font-medium text-muted-foreground">
                <th className="px-4 py-3">정산 ID</th>
                <th className="px-4 py-3">상품</th>
                <th className="px-4 py-3">유형</th>
                <th className="px-4 py-3">판매가</th>
                <th className="px-4 py-3">수수료(15%)</th>
                <th className="px-4 py-3">실 정산액</th>
                <th className="px-4 py-3">기간</th>
                <th className="px-4 py-3 text-right">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 text-[11px] text-muted-foreground">{r.id}</td>
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline">{r.type}</Badge>
                  </td>
                  <td className="px-4 py-3">{r.sale.toLocaleString()}원</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.fee.toLocaleString()}원</td>
                  <td className="px-4 py-3 font-semibold">{r.payout.toLocaleString()}원</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.period}</td>
                  <td className="px-4 py-3 text-right">
                    <Badge
                      variant={
                        r.status === "지급 완료"
                          ? "default"
                          : r.status === "정산 확정"
                          ? "outline"
                          : "muted"
                      }
                    >
                      {r.status}
                    </Badge>
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-5">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-xl font-bold mt-2">{value}</div>
    </div>
  );
}
