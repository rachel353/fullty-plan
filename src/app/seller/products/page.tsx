import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

export default function SellerProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between border-b border-border pb-4">
        <h2 className="text-xl font-bold">상품 관리</h2>
        <Link href="/seller/products/new">
          <Button>+ 상품 등록</Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {["전체", "판매중", "검수중", "렌탈중", "품절"].map((s, i) => (
          <button
            key={s}
            className={
              i === 0
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
              <th className="px-4 py-3">상품</th>
              <th className="px-4 py-3">등급</th>
              <th className="px-4 py-3">판매가</th>
              <th className="px-4 py-3">수수료</th>
              <th className="px-4 py-3">렌탈</th>
              <th className="px-4 py-3">상태</th>
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3">
                  <div className="text-[11px] text-muted-foreground">{p.brand}</div>
                  <div className="font-medium">{p.name}</div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="default">{p.grade}</Badge>
                </td>
                <td className="px-4 py-3">{formatPrice(p.price)}</td>
                <td className="px-4 py-3 text-muted-foreground">15%</td>
                <td className="px-4 py-3">
                  {p.rentable ? (
                    <Badge variant="outline">ON</Badge>
                  ) : (
                    <span className="text-muted-foreground">OFF</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={p.status === "판매중" ? "default" : "muted"}>{p.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button size="sm" variant="ghost">
                    수정
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
