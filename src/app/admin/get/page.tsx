import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getRequests } from "@/lib/mock";

export default function AdminGetPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">GET 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">
          GET 요청 / 셀러 제안 검수 / 매칭 상태 관리
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Stat label="요청 (대기)" value="14" />
        <Stat label="제안 검수 대기" value="8" />
        <Stat label="이번 주 매칭" value="22" />
        <Stat label="평균 매칭 시간" value="2.4일" />
      </div>

      <div className="border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted">
            <tr className="text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">요청 상품</th>
              <th className="px-4 py-3">희망가</th>
              <th className="px-4 py-3">제안</th>
              <th className="px-4 py-3">생성일</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {getRequests.map((g) => (
              <tr key={g.id}>
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{g.id}</td>
                <td className="px-4 py-3">
                  <div className="text-[11px] text-muted-foreground">{g.brand}</div>
                  <div className="font-medium">{g.model}</div>
                </td>
                <td className="px-4 py-3">{g.budget.toLocaleString()}원</td>
                <td className="px-4 py-3">{g.proposalCount}건</td>
                <td className="px-4 py-3 text-muted-foreground">{g.createdAt}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      g.status === "거래 완료"
                        ? "muted"
                        : g.status === "셀러 제안"
                        ? "default"
                        : "outline"
                    }
                  >
                    {g.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button size="sm" variant="ghost">
                    제안 검수
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
