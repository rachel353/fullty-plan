import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TransactionChart } from "@/components/admin/TransactionChart";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Stat label="신규 회원" value="128명" hint="이번 주" />
        <Stat label="셀러 심사 대기" value="6건" hint="처리 필요" />
        <Stat label="상품 검수 대기" value="12건" hint="처리 필요" />
        <Stat label="이번 달 GMV" value="184,200,000원" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>거래량 추이</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>오늘 처리할 일</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Row label="셀러 승인 심사" value="6" />
            <Row label="상품 검수" value="12" />
            <Row label="GET 제안 검수" value="8" />
            <Row label="SELL 검수 결과 등록" value="3" />
            <Row label="회수 일정 조율" value="2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최근 운영 이벤트</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted">
              <tr className="text-left text-xs font-medium text-muted-foreground">
                <th className="px-4 py-3">시각</th>
                <th className="px-4 py-3">이벤트</th>
                <th className="px-4 py-3">담당</th>
                <th className="px-4 py-3 text-right">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { time: "10:42", event: "셀러 '오브제 스튜디오' 승인 완료", actor: "운영 A" },
                { time: "10:18", event: "Aeron Chair (sk-2031) 검수 승인", actor: "검수팀" },
                { time: "09:55", event: "GET g003 셀러 제안 검수 통과", actor: "운영 B" },
                { time: "09:31", event: "SELL s002 픽업 예약 완료", actor: "물류" },
              ].map((row) => (
                <tr key={row.time}>
                  <td className="px-4 py-3 text-[11px] text-muted-foreground">{row.time}</td>
                  <td className="px-4 py-3">{row.event}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.actor}</td>
                  <td className="px-4 py-3 text-right">
                    <Badge variant="default">완료</Badge>
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

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="border border-border p-5">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-xl font-bold mt-2">{value}</div>
      {hint && <div className="text-[11px] text-muted-foreground mt-1">{hint}</div>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between pb-3 border-b border-border last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
