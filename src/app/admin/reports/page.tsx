import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const reports = [
  {
    id: "rp001",
    target: "리뷰 rv041",
    reason: "허위 / 조작 리뷰 의심",
    reporter: "kimfullty@gmail.com",
    date: "2026-04-22",
    status: "조사 중" as const,
  },
  {
    id: "rp002",
    target: "정보글 ar018",
    reason: "광고성 콘텐츠",
    reporter: "park@gmail.com",
    date: "2026-04-19",
    status: "조치 완료" as const,
  },
  {
    id: "rp003",
    target: "리뷰 rv023",
    reason: "광고성 내용",
    reporter: "lee@kakao.com",
    date: "2026-04-15",
    status: "반려" as const,
  },
  {
    id: "rp004",
    target: "정보글 ar009",
    reason: "부적절한 외부 링크 포함",
    reporter: "choi@naver.com",
    date: "2026-04-11",
    status: "접수" as const,
  },
];

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">신고 관리</h2>
      </div>

      <div className="border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted">
            <tr className="text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">대상</th>
              <th className="px-4 py-3">사유</th>
              <th className="px-4 py-3">신고자</th>
              <th className="px-4 py-3">일자</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">처리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {reports.map((r) => (
              <tr key={r.id}>
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{r.id}</td>
                <td className="px-4 py-3 font-medium">{r.target}</td>
                <td className="px-4 py-3">{r.reason}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.reporter}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant={
                      r.status === "조치 완료"
                        ? "default"
                        : r.status === "반려"
                        ? "muted"
                        : "outline"
                    }
                  >
                    {r.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/reports/${r.id}`}>
                    <Button size="sm" variant={r.status === "조사 중" ? "default" : "ghost"}>상세</Button>
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
