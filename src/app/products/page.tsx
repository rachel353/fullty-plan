import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { Select } from "@/components/ui/Select";
import { products, categories } from "@/lib/mock";

export default function ProductsPage() {
  return (
    <div className="max-w-canvas mx-auto px-12 py-16">
      <PageHeader
        eyebrow="Shop"
        title="The Collection"
        description="검수 완료된 프리미엄 빈티지 가구를 만나보세요."
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={
              i === 0
                ? "px-4 h-9 text-xs font-medium border border-foreground bg-foreground text-background"
                : "px-4 h-9 text-xs font-medium border border-border hover:bg-muted"
            }
          >
            {cat}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <Select placeholder="전체 등급" options={["SS", "S", "A+", "A", "B"]} className="w-32" />
          <Select placeholder="최신 등록순" options={["최신 등록순", "낮은 가격순", "높은 가격순"]} className="w-36" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <button className="px-6 h-10 border border-border text-xs hover:bg-muted">
          더 보기
        </button>
      </div>
    </div>
  );
}
