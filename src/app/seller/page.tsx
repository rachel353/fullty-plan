import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ImageBox } from "@/components/ImageBox";

export default function SellerDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Stat label="판매 중 상품" value="24개" />
        <Stat label="렌탈 중 상품" value="6개" />
        <Stat label="이번 달 예상 정산" value="3,840,000원" />
        <Stat label="신규 GET 요청" value="3건" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>매출 추이</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageBox ratio="wide" label="월별 매출 / 정산 차트" />
            <div className="grid grid-cols-3 gap-3 mt-4 text-xs">
              <div className="border border-border p-3">
                <div className="text-muted-foreground">판매 정산</div>
                <div className="text-lg font-bold mt-1">2,840,000원</div>
              </div>
              <div className="border border-border p-3">
                <div className="text-muted-foreground">렌탈 정산</div>
                <div className="text-lg font-bold mt-1">680,000원</div>
              </div>
              <div className="border border-border p-3">
                <div className="text-muted-foreground">위탁 정산</div>
                <div className="text-lg font-bold mt-1">320,000원</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>풀티 알림</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { type: "검수 결과", desc: "Aeron Chair 등록이 승인되었습니다.", time: "2시간 전" },
              {
                type: "GET 매칭",
                desc: "Stool 60 GET 요청이 도착했습니다.",
                time: "5시간 전",
              },
              { type: "정산", desc: "3월 정산이 확정되었습니다.", time: "1일 전" },
            ].map((n) => (
              <div key={n.desc} className="pb-3 border-b border-border last:border-0">
                <Badge variant="outline">{n.type}</Badge>
                <div className="text-sm mt-2">{n.desc}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{n.time}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최근 상품 상태</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-left text-xs font-medium text-muted-foreground">
                <th className="px-5 py-3">상품</th>
                <th className="px-5 py-3">판매가</th>
                <th className="px-5 py-3">렌탈</th>
                <th className="px-5 py-3">상태</th>
                <th className="px-5 py-3 text-right">실 정산액</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { name: "Herman Miller Aeron", price: "1,280,000원", rent: true, status: "판매중", payout: "1,088,000원" },
                { name: "USM Haller Sideboard", price: "3,200,000원", rent: true, status: "검수중", payout: "2,720,000원" },
                { name: "Vitra Eames LCW", price: "2,400,000원", rent: false, status: "판매중", payout: "2,040,000원" },
              ].map((row) => (
                <tr key={row.name}>
                  <td className="px-5 py-4 font-medium">{row.name}</td>
                  <td className="px-5 py-4">{row.price}</td>
                  <td className="px-5 py-4">
                    {row.rent ? <Badge variant="outline">RENT</Badge> : <span className="text-muted-foreground">-</span>}
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={row.status === "판매중" ? "default" : "muted"}>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right font-medium">{row.payout}</td>
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
