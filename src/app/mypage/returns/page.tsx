import { Badge } from "@/components/ui/Badge";

const items = [
  {
    id: "rt001",
    type: "취소" as const,
    name: "USM Haller Sideboard",
    date: "2026-03-22",
    status: "취소 완료",
  },
  {
    id: "rt002",
    type: "반품" as const,
    name: "Vitra DSW Side Chair",
    date: "2026-04-04",
    status: "픽업 수거 중",
  },
];

export default function ReturnsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">취소 / 반품 내역</h2>
      </div>

      <div className="flex gap-2">
        <button className="px-4 h-9 text-xs font-medium border border-foreground bg-foreground text-background">
          전체
        </button>
        <button className="px-4 h-9 text-xs font-medium border border-border hover:bg-muted">
          취소
        </button>
        <button className="px-4 h-9 text-xs font-medium border border-border hover:bg-muted">
          반품
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={item.type === "반품" ? "default" : "outline"}>
                    {item.type}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">
                    {item.id} · {item.date}
                  </span>
                </div>
                <div className="text-sm font-semibold mt-2">{item.name}</div>
              </div>
              <Badge variant="muted">{item.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
