import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { sellRequests } from "@/lib/mock";

const STATUS_VARIANT: Record<string, "default" | "outline" | "muted"> = {
  "접수 완료": "outline",
  "배송비 결제 완료": "outline",
  "픽업 대기": "outline",
  "픽업 완료": "outline",
  "검수 중": "default",
  "최종 금액 제안": "default",
  "계약 완료": "muted",
  "반려": "muted",
};

export default function AdminSellPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">SELL 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">
          위탁 / 매입 신청 접수 → 픽업 → 검수 → 금액 제안 → 계약
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <Stat label="신청 접수" value="9" />
        <Stat label="픽업 대기" value="4" />
        <Stat label="검수 중" value="6" />
        <Stat label="금액 제안 대기" value="3" />
        <Stat label="계약 완료" value="12" />
      </div>

      <div className="border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted">
            <tr className="text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">상품</th>
              <th className="px-4 py-3">유형</th>
              <th className="px-4 py-3">예상 금액</th>
              <th className="px-4 py-3">신청일</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sellRequests.map((s) => (
              <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{s.id}</td>
                <td className="px-4 py-3">
                  <div className="text-[11px] text-muted-foreground">{s.brand}</div>
                  <div className="font-medium">{s.model}</div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={s.type === "위탁" ? "outline" : "default"}>{s.type}</Badge>
                </td>
                <td className="px-4 py-3">{s.estimated.toLocaleString()}원</td>
                <td className="px-4 py-3 text-muted-foreground">{s.createdAt}</td>
                <td className="px-4 py-3">
                  <Badge variant={STATUS_VARIANT[s.status] ?? "outline"}>{s.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/sell/${s.id}`}>
                    <Button size="sm" variant="ghost">상세</Button>
                  </Link>
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
