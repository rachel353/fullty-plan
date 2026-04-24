import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const rentals = [
  { id: "rt001", user: "김풀티", product: "Fritz Hansen Egg Chair", period: "2026-03-15 ~ 2026-04-13", extended: 0, status: "렌탈 중" as const, daysLeft: 3 },
  { id: "rt002", user: "이가구", product: "Cassina LC4", period: "2026-03-25 ~ 2026-04-23", extended: 1, status: "연장 1차" as const, daysLeft: 13 },
  { id: "rt003", user: "박빈티", product: "USM Haller", period: "2026-02-08 ~ 2026-04-08", extended: 2, status: "회수 대기" as const, daysLeft: 0 },
];

type RentalStatus = "렌탈 중" | "연장 1차" | "연장 2차" | "회수 대기" | "회수 완료";

export default function AdminRentalsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">렌탈 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">
          연장 / 구매 전환 / 회수 흐름 및 회수 후 검수 / 등급 결정
        </p>
      </div>

      <div className="border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted">
            <tr className="text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">사용자</th>
              <th className="px-4 py-3">상품</th>
              <th className="px-4 py-3">기간</th>
              <th className="px-4 py-3">연장</th>
              <th className="px-4 py-3">남은 일수</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rentals.map((r) => (
              <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{r.id}</td>
                <td className="px-4 py-3">{r.user}</td>
                <td className="px-4 py-3 font-medium">{r.product}</td>
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{r.period}</td>
                <td className="px-4 py-3">{r.extended}회</td>
                <td className="px-4 py-3">
                  {r.daysLeft > 0 ? `D-${r.daysLeft}` : <span className="text-red-500 font-medium">만료</span>}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={r.status === "회수 대기" ? "default" : "outline"}>
                    {r.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/rentals/${r.id}`}>
                    <Button size="sm" variant={r.status === "회수 대기" ? "default" : "ghost"}>상세</Button>
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
