"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, Pencil, TrendingUp, Eye, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ImageBox } from "@/components/ImageBox";
import { cn } from "@/lib/utils";
import { products } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

const STATUS_MOCK: Record<string, { label: string; variant: "default" | "sage" | "muted" | "outline" }> = {
  "판매중": { label: "판매중", variant: "sage" },
  "렌탈중": { label: "렌탈중", variant: "default" },
  "품절": { label: "품절", variant: "muted" },
};

export default function SellerProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [paused, setPaused] = useState(false);

  if (!product) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        상품을 찾을 수 없습니다.
        <Link href="/seller/products" className="block mt-3 text-sage-ink underline">목록으로</Link>
      </div>
    );
  }

  const statusKey = paused ? "품절" : (product.status ?? "판매중");
  const statusInfo = STATUS_MOCK[statusKey] ?? { label: statusKey, variant: "outline" as const };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* 헤더 */}
      <div className="border-b border-border pb-4">
        <Link href="/seller/products" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 상품 관리
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] text-muted-foreground">{product.brand}</div>
            <h2 className="text-xl font-bold mt-0.5">{product.name}</h2>
            {product.option && <p className="text-sm text-muted-foreground mt-0.5">{product.option}</p>}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
            <Link href={`/seller/products/${id}/edit`}>
              <Button size="sm" variant="outline" className="flex items-center gap-1.5">
                <Pencil size={12} /> 수정
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 사진 */}
      <div className="grid grid-cols-5 gap-2">
        <ImageBox className="col-span-2 aspect-square" ratio="square" />
        {[1, 2, 3].map((i) => (
          <ImageBox key={i} className="aspect-square" ratio="square" />
        ))}
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-3 gap-3">
        <Stat icon={<Eye size={14} />} label="조회수" value="1,284" />
        <Stat icon={<MessageSquare size={14} />} label="Q&A" value="3건" />
        <Stat icon={<TrendingUp size={14} />} label="찜" value="48" />
      </div>

      {/* 기본 정보 */}
      <Section title="기본 정보">
        <div className="border border-border divide-y divide-border text-sm">
          <Row label="브랜드" value={product.brand} />
          <Row label="모델명" value={product.name} />
          <Row label="옵션 / 사이즈" value={product.option ?? "—"} />
          <Row label="카테고리" value={product.category ?? "—"} />
          <Row label="등급" value={<Badge variant="default">{product.grade}</Badge>} />
        </div>
      </Section>

      {/* 가격 */}
      <Section title="가격">
        <div className="border border-border divide-y divide-border text-sm">
          <Row label="판매가" value={<span className="font-semibold">{formatPrice(product.price)}</span>} />
          <Row label="배송비" value="35,000원" />
          <Row label="VAT" value={`${Math.round(product.price * 0.1).toLocaleString()}원`} />
          <Row label="실 정산액 (수수료 15%)" value={<span className="font-semibold text-sage-ink">{Math.round(product.price * 0.85).toLocaleString()}원</span>} />
        </div>
      </Section>

      {/* 렌탈 */}
      {(product.availability === "rent" || product.availability === "both") && (
        <Section title="렌탈 공급">
          <div className="border border-border divide-y divide-border text-sm">
            <Row label="렌탈 공급" value={<Badge variant="sage">ON</Badge>} />
            <Row label="최소 렌탈 일수" value="7일" />
            <Row label="최대 렌탈 일수" value="90일" />
          </div>
        </Section>
      )}

      {/* 하단 액션 */}
      <div className="border-t border-border pt-6 flex items-center justify-between">
        <Button
          variant="outline"
          className={cn(paused ? "text-sage-ink border-sage-ink" : "text-muted-foreground")}
          onClick={() => setPaused(!paused)}
        >
          {paused ? "판매 재개" : "판매 일시중지"}
        </Button>
        <Link href={`/seller/products/${id}/edit`}>
          <Button>수정하기</Button>
        </Link>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">{title}</div>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between gap-4">
      <span className="text-muted-foreground text-[11px] w-32 flex-shrink-0">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="border border-border p-4 flex items-center gap-3">
      <div className="text-muted-foreground">{icon}</div>
      <div>
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold mt-0.5">{value}</div>
      </div>
    </div>
  );
}
