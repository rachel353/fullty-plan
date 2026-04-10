import Link from "next/link";
import { ImageBox } from "@/components/ImageBox";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { products, getRequests } from "@/lib/mock";
import { ArrowUpRight } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero — sage backdrop, editorial */}
      <section className="bg-sage">
        <div className="max-w-canvas mx-auto px-12 pt-20 pb-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-6">
            <div className="text-[10px] text-sage-ink/70 tracking-[0.3em] uppercase mb-8">
              Premium Vintage Furniture · Since 2024
            </div>
            <h1 className="font-display text-[clamp(56px,8vw,128px)] leading-[0.88] text-sage-ink">
              Live with
              <br />
              <em className="not-italic">objects</em>
              <br />
              that last.
            </h1>
            <p className="text-sm text-sage-ink/75 leading-[1.8] mt-10 max-w-md">
              풀티는 검수된 프리미엄 빈티지 가구를 거래하고, 단기 렌탈하고,
              <br />
              내가 보유한 가구를 자산으로 관리할 수 있는 라이프스타일 플랫폼입니다.
            </p>
            <div className="flex items-center gap-3 mt-10">
              <Link href="/products">
                <Button size="lg">Shop the Collection</Button>
              </Link>
              <Link href="/get">
                <Button size="lg" variant="ghost">
                  Request a Piece →
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:col-span-6 grid grid-cols-12 gap-3">
            <div className="col-span-7">
              <ImageBox ratio="portrait" className="bg-sage-ink/15" />
            </div>
            <div className="col-span-5 space-y-3 pt-12">
              <ImageBox ratio="square" className="bg-sage-ink/15" />
              <ImageBox ratio="square" className="bg-sage-ink/15" />
            </div>
          </div>
        </div>
      </section>

      {/* Service quick links */}
      <section>
        <div className="max-w-canvas mx-auto px-12 py-24">
          <div className="grid grid-cols-12 gap-12 mb-16">
            <div className="col-span-12 md:col-span-4">
              <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-3">
                Four Ways to Fullty
              </div>
              <h2 className="font-display text-4xl leading-tight text-sage-ink">
                사고, 빌리고,
                <br />
                찾고, 맡기다.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-8 grid grid-cols-2 gap-px bg-border">
              {[
                {
                  href: "/products",
                  num: "01",
                  title: "BUY",
                  ko: "검수된 빈티지 구매",
                  desc: "풀티가 직접 검수한 프리미엄 셀렉션을 구매하세요.",
                },
                {
                  href: "/products?rent=1",
                  num: "02",
                  title: "RENT",
                  ko: "최대 90일 단기 렌탈",
                  desc: "구매 전에 사용해보고, 마음에 들면 차액으로 소유권 이전.",
                },
                {
                  href: "/get",
                  num: "03",
                  title: "GET",
                  ko: "구해주세요 매칭",
                  desc: "찾고 있는 가구를 등록하면 인증된 셀러가 직접 제안합니다.",
                },
                {
                  href: "/sell",
                  num: "04",
                  title: "SELL",
                  ko: "위탁 / 매입",
                  desc: "보유 가구를 풀티에 위탁하거나 매입 신청할 수 있습니다.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="bg-background p-8 hover:bg-sage-soft/40 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-10">
                    <div className="text-[10px] text-muted-foreground tracking-[0.25em]">
                      {item.num}
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-sage-ink/40 group-hover:text-sage-deep group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                  <div className="font-display text-3xl text-sage-ink">{item.title}</div>
                  <div className="text-xs font-medium text-sage-ink mt-1">{item.ko}</div>
                  <div className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
                    {item.desc}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="border-t border-border">
        <div className="max-w-canvas mx-auto px-12 py-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-3">
                New Arrivals
              </div>
              <h2 className="font-display text-4xl text-sage-ink leading-tight">
                신규 입고
              </h2>
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

      {/* GET feed */}
      <section className="bg-muted/60">
        <div className="max-w-canvas mx-auto px-12 py-24">
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-12 md:col-span-4">
              <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-3">
                Live Requests
              </div>
              <h2 className="font-display text-4xl text-sage-ink leading-tight mb-4">
                실시간
                <br />
                구해주세요.
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                지금 사람들이 찾고 있는 가구들. 셀러라면 직접 제안해보세요. 채팅 없이 안전하게.
              </p>
              <Link href="/get" className="inline-block mt-6">
                <Button variant="outline" size="sm">
                  요청 둘러보기
                </Button>
              </Link>
            </div>
            <div className="col-span-12 md:col-span-8 space-y-px bg-border">
              {getRequests.slice(0, 4).map((req) => (
                <div
                  key={req.id}
                  className="bg-background p-6 flex items-center justify-between hover:bg-sage-soft/40 transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <div className="font-display text-2xl text-sage-ink/40 w-12">
                      {req.id.replace("g00", "")}
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground tracking-[0.18em] uppercase">
                        {req.brand}
                      </div>
                      <div className="font-display text-xl text-sage-ink mt-1">{req.model}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {req.option} · 희망가 {req.budget.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-muted-foreground tracking-[0.18em]">
                      OFFERS
                    </div>
                    <div className="font-display text-2xl text-sage-ink">{req.proposalCount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Asset pitch */}
      <section className="bg-sage-ink text-background">
        <div className="max-w-canvas mx-auto px-12 py-32 grid grid-cols-12 gap-12 items-center">
          <div className="col-span-12 md:col-span-6">
            <div className="text-[10px] text-sage tracking-[0.25em] uppercase mb-4">
              My Collection
            </div>
            <h2 className="font-display text-5xl md:text-6xl leading-[0.95] mb-8">
              Furniture
              <br />
              as <em className="not-italic text-sage">an asset.</em>
            </h2>
            <p className="text-sm text-background/70 leading-[1.8] max-w-md mb-10">
              풀티에서 구매한 가구는 물론, 직접 등록한 가구도 등급별 시세와 함께 자산으로
              관리됩니다. 언제든 판매하거나 렌탈로 수익을 창출할 수 있습니다.
            </p>
            <Link href="/mypage/collection">
              <Button variant="sage">컬렉션 시작하기</Button>
            </Link>
          </div>

          <div className="col-span-12 md:col-span-6">
            <div className="bg-background text-sage-ink p-10">
              <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase">
                Total Value
              </div>
              <div className="font-display text-5xl mt-3 leading-none">4,480,000원</div>
              <div className="text-[11px] text-muted-foreground mt-2">
                3 items · S 평균 등급 · 전월 대비 +2.4%
              </div>
              <div className="mt-8">
                <ImageBox ratio="landscape" label="가치 추이 차트 영역" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
