import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const sellers = [
  { id: "sl001", name: "오브제 스튜디오", type: "사업자", applied: "2026-04-08", status: "심사 대기" as const },
  { id: "sl002", name: "노르딕홈", type: "사업자", applied: "2026-04-07", status: "심사 대기" as const },
  { id: "sl003", name: "김컬렉터", type: "개인", applied: "2026-04-05", status: "승인" as const },
  { id: "sl004", name: "이태리에디션", type: "사업자", applied: "2026-04-03", status: "반려" as const },
];

export default function AdminSellersPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">셀러 승인 심사</h2>
        <p className="text-sm text-muted-foreground mt-1">
          개인 / 사업자 셀러를 구분하여 심사하고 승인합니다.
        </p>
      </div>

      <div className="flex items-center gap-2">
        {["전체", "심사 대기", "승인", "반려"].map((s, i) => (
          <button
            key={s}
            className={
              i === 1
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
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">셀러명</th>
              <th className="px-4 py-3">유형</th>
              <th className="px-4 py-3">신청일</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sellers.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{s.id}</td>
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{s.type}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{s.applied}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      s.status === "승인" ? "default" : s.status === "반려" ? "muted" : "outline"
                    }
                  >
                    {s.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  {s.status === "심사 대기" ? (
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline">
                        반려
                      </Button>
                      <Button size="sm">승인</Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="ghost">
                      상세
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
