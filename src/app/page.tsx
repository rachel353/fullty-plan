import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { HeroBannerCarousel } from "@/components/HeroBannerCarousel";
import { CardNewsBanners } from "@/components/CardNewsBanners";
import { products } from "@/lib/mock";
import { ShoppingBag, MessageCircle, Tag } from "lucide-react";

const SERVICE_LINKS = [
  {
    href: "/products",
    icon: ShoppingBag,
    title: "Buy / Rent",
    desc: "정품 인증된 가구를 합리적인 가격에 구매해 보세요.",
  },
  {
    href: "/get",
    icon: MessageCircle,
    title: "Get",
    desc: "원하는 상품이 없고 소식을 가장 빠르게 전달받고 싶으세요?",
  },
  {
    href: "/sell",
    icon: Tag,
    title: "Sell",
    desc: "사용하다 않는 가구, 쉽고 빠르게 판매해 보세요.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* 버튼형 리스트 */}
      <section className="bg-sage border-b border-sage-ink/10">
        <div className="max-w-canvas mx-auto px-12">
          <div className="grid grid-cols-3 divide-x divide-sage-ink/10">
            {SERVICE_LINKS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="flex flex-col items-center gap-2 py-6 px-4 hover:bg-sage-ink/5 transition-colors text-center group"
              >
                <s.icon size={22} className="text-sage-ink/60 group-hover:text-sage-ink transition-colors" strokeWidth={1.5} />
                <div className="text-xs font-semibold text-sage-ink tracking-wide">{s.title}</div>
                <div className="text-[11px] text-sage-ink/60 leading-relaxed hidden md:block max-w-[180px]">
                  {s.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 메인 배너 캐러셀 */}
      <HeroBannerCarousel />

      {/* 상품 목록 */}
      <section className="border-b border-border">
        <div className="max-w-canvas mx-auto px-12 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-2">
                New Arrivals
              </div>
              <h2 className="font-display text-3xl text-sage-ink leading-tight">신규 입고</h2>
            </div>
            <Link
              href="/products"
              className="text-[11px] tracking-[0.18em] uppercase hover:text-sage-deep border-b border-sage-ink pb-1"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 카드뉴스 */}
      <CardNewsBanners />

      {/* 띠배너 */}
      <section className="bg-sage-ink text-background">
        <div className="max-w-canvas mx-auto px-12 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="text-[10px] text-sage tracking-[0.25em] uppercase mb-3">Fullty Is</div>
            <p className="font-display text-3xl md:text-4xl leading-tight">
              사용하던 가구, 버리지 말고 가치를 전달하세요.
              <br />
              <span className="text-sage">사용하던 가구, 편리한 이동가치를 구매해 보세요.</span>
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link href="/sell">
              <Button variant="sage" size="lg">시작하기 →</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
