import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">상품 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">
          셀러 등록 상품의 사전 검수 / 승인 / 반려 / 매입·위탁 상품 등록
        </p>
      </div>

      <div className="flex items-center gap-2">
        {["전체", "검수 대기", "판매중", "렌탈중", "품절", "반려"].map((s, i) => (
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
              <th className="px-4 py-3">상품</th>
              <th className="px-4 py-3">셀러</th>
              <th className="px-4 py-3">등급</th>
              <th className="px-4 py-3">판매가</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">검수</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 text-[11px] text-muted-foreground">{p.id}</td>
                <td className="px-4 py-3">
                  <div className="text-[11px] text-muted-foreground">{p.brand}</div>
                  <div className="font-medium">{p.name}</div>
                </td>
                <td className="px-4 py-3">{p.seller}</td>
                <td className="px-4 py-3">
                  <Badge variant="default">{p.grade}</Badge>
                </td>
                <td className="px-4 py-3">{formatPrice(p.price)}</td>
                <td className="px-4 py-3">
                  <Badge variant={p.status === "판매중" ? "default" : "muted"}>{p.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline">
                      반려
                    </Button>
                    <Button size="sm">승인</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
