import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const members = [
  { id: "m001", name: "김풀티", email: "kimfullty@gmail.com", joined: "2025-08-12", grade: "S", status: "정상" },
  { id: "m002", name: "이가구", email: "leeg@kakao.com", joined: "2025-12-04", grade: "BRONZE", status: "정상" },
  { id: "m003", name: "박빈티", email: "park@gmail.com", joined: "2026-02-19", grade: "WELCOME", status: "정상" },
  { id: "m004", name: "최라운지", email: "choi@gmail.com", joined: "2026-04-01", grade: "WELCOME", status: "휴면 예정" },
];

export default function MembersPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <h2 className="text-xl font-bold">일반 회원</h2>
        <input
          placeholder="검색 (이름 / 이메일 / ID)"
          className="h-9 px-3 text-xs border border-border bg-background w-72"
        />
      </div>

      <div className="border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted">
            <tr className="text-left text-xs font-medium text-muted-foreground">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">이름</th>
              <th className="px-4 py-3">이메일</th>
              <th className="px-4 py-3">가입일</th>
              <th className="px-4 py-3">등급</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((m) => (
              <tr key={m.id}>
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{m.id}</td>
                <td className="px-4 py-3 font-medium">{m.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{m.email}</td>
                <td className="px-4 py-3 text-muted-foreground">{m.joined}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{m.grade}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={m.status === "정상" ? "default" : "muted"}>{m.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button size="sm" variant="ghost">
                    상세
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
