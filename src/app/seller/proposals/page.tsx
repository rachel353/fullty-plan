import { Badge } from "@/components/ui/Badge";

const proposals = [
  {
    id: "pp001",
    target: "Herman Miller Aeron Remastered",
    price: 1380000,
    status: "풀티 검수 중" as const,
    sentAt: "2026-04-08",
  },
  {
    id: "pp002",
    target: "Vitra Panton Chair",
    price: 360000,
    status: "사용자 확인 대기" as const,
    sentAt: "2026-04-06",
  },
  {
    id: "pp003",
    target: "Artek Stool 60",
    price: 420000,
    status: "사용자 수락" as const,
    sentAt: "2026-04-04",
  },
  {
    id: "pp004",
    target: "USM Haller Trolley",
    price: 980000,
    status: "거절됨" as const,
    sentAt: "2026-03-29",
  },
];

export default function ProposalsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">내 제안 현황</h2>
        <p className="text-sm text-muted-foreground mt-1">
          내가 GET 요청에 보낸 제안 상태를 한눈에 확인합니다.
        </p>
      </div>

      <div className="border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted">
            <tr className="text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">제안 ID</th>
              <th className="px-4 py-3">대상 GET</th>
              <th className="px-4 py-3">제시 가격</th>
              <th className="px-4 py-3">발송일</th>
              <th className="px-4 py-3">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {proposals.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{p.id}</td>
                <td className="px-4 py-3 font-medium">{p.target}</td>
                <td className="px-4 py-3">{p.price.toLocaleString()}원</td>
                <td className="px-4 py-3 text-muted-foreground">{p.sentAt}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      p.status === "사용자 수락"
                        ? "default"
                        : p.status === "거절됨"
                        ? "muted"
                        : "outline"
                    }
                  >
                    {p.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
