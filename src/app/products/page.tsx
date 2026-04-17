"use client";

import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { Select } from "@/components/ui/Select";
import { products, categories } from "@/lib/mock";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 8;

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [activeGrade, setActiveGrade] = useState("전체 등급");
  const [activeSort, setActiveSort] = useState("최신 등록순");
  const [page, setPage] = useState(1);

  const filtered = products.filter((p) => {
    const matchCategory = activeCategory === "전체" || p.category === activeCategory;
    const matchGrade = activeGrade === "전체 등급" || p.grade === activeGrade;
    return matchCategory && matchGrade;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (activeSort === "낮은 가격순") return a.price - b.price;
    if (activeSort === "높은 가격순") return b.price - a.price;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  function handleFilter(cat: string) {
    setActiveCategory(cat);
    setPage(1);
  }

  return (
    <div className="max-w-canvas mx-auto px-12 py-16">
      <PageHeader
        eyebrow="Shop"
        title="The Collection"
        description="검수 완료된 프리미엄 빈티지 가구를 만나보세요."
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={cn(
              "px-4 h-9 text-xs font-medium border transition-colors",
              activeCategory === cat
                ? "border-foreground bg-foreground text-background"
                : "border-border hover:bg-muted"
            )}
          >
            {cat}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <Select
            placeholder="전체 등급"
            options={["전체 등급", "SS", "S", "A+", "A", "B"]}
            className="w-32"
            onChange={(v) => { setActiveGrade(v); setPage(1); }}
          />
          <Select
            placeholder="최신 등록순"
            options={["최신 등록순", "낮은 가격순", "높은 가격순"]}
            className="w-36"
            onChange={(v) => { setActiveSort(v); setPage(1); }}
          />
        </div>
      </div>

      {/* Count */}
      <div className="text-[11px] text-muted-foreground mb-6">
        총 {sorted.length}개 상품
      </div>

      {paginated.length === 0 ? (
        <div className="py-24 text-center text-sm text-muted-foreground">
          해당 조건의 상품이 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
          {paginated.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-9 h-9 border border-border text-xs hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ←
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={cn(
                "w-9 h-9 border text-xs transition-colors",
                n === page
                  ? "border-sage-ink bg-sage-ink text-background"
                  : "border-border hover:bg-muted"
              )}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-9 h-9 border border-border text-xs hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
