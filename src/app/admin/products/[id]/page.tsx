"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

type InspectionProduct = {
  id: string;
  brand: string;
  name: string;
  option: string;
  seller: string;
  sellerType: "사업자" | "개인";
  grade: string;
  price: number;
  tab: "검수 대기" | "판매중" | "렌탈중" | "품절" | "반려";
  submittedAt: string;
  description: string;
  usagePeriod: string;
  availability: "판매" | "렌탈" | "판매 · 렌탈";
  rentPrice?: number;
  category: string;
  imageCount: number;
  rejectReason?: string;
  rejectedAt?: string;
  approvedAt?: string;
};

const PRODUCTS: InspectionProduct[] = [
  {
    id: "p008",
    brand: "Knoll",
    name: "Saarinen Tulip Table",
    option: "Round 120 / Marble",
    seller: "미드센추리",
    sellerType: "사업자",
    grade: "A",
    price: 4200000,
    tab: "검수 대기",
    submittedAt: "2026-04-22",
    description: "2018년 구매, 대리석 상판에 미세한 스크래치 1~2개 있으나 일상 사용에 지장 없음. 하부 받침 상태 양호. 정품 인증서 보유.",
    usagePeriod: "5~7년",
    availability: "판매 · 렌탈",
    rentPrice: 180000,
    category: "가구",
    imageCount: 4,
  },
  {
    id: "p017",
    brand: "Muuto",
    name: "E27 Pendant",
    option: "White",
    seller: "노르딕홈",
    sellerType: "사업자",
    grade: "S",
    price: 380000,
    tab: "검수 대기",
    submittedAt: "2026-04-21",
    description: "2024년 구매 후 전시용으로만 사용. 사용감 거의 없음. 원 박스 포함, 케이블 길이 조절 가능.",
    usagePeriod: "1년 미만",
    availability: "판매",
    category: "조명",
    imageCount: 3,
  },
  {
    id: "p018",
    brand: "HAY",
    name: "About A Chair AAC22",
    option: "Soft Black",
    seller: "빈티지 웍스",
    sellerType: "개인",
    grade: "A+",
    price: 290000,
    tab: "검수 대기",
    submittedAt: "2026-04-20",
    description: "2022년 구매, 가정 내 서재에서 사용. 패브릭 오염 없음. 다리 하단 일부 마모 있으나 안정성 문제 없음.",
    usagePeriod: "2~3년",
    availability: "판매 · 렌탈",
    rentPrice: 15000,
    category: "가구",
    imageCount: 5,
  },
  {
    id: "p019",
    brand: "Cassina",
    name: "LC2 Armchair",
    option: "2-seater / Black Leather",
    seller: "이태리에디션",
    sellerType: "사업자",
    grade: "A",
    price: 2800000,
    tab: "반려",
    submittedAt: "2026-04-08",
    rejectedAt: "2026-04-10",
    rejectReason: "상품 사진과 실물 상태 불일치",
    description: "2020년 구매. 블랙 레더 원단.",
    usagePeriod: "3~5년",
    availability: "판매",
    category: "가구",
    imageCount: 2,
  },
  {
    id: "p020",
    brand: "Vitra",
    name: "DSW Chair",
    option: "White / Maple",
    seller: "오브제 스튜디오",
    sellerType: "사업자",
    grade: "B",
    price: 450000,
    tab: "반려",
    submittedAt: "2026-04-06",
    rejectedAt: "2026-04-08",
    rejectReason: "등급 기준 미달",
    description: "2019년 구매. 다용도실 사용.",
    usagePeriod: "5~7년",
    availability: "판매",
    category: "가구",
    imageCount: 3,
  },
  {
    id: "p021",
    brand: "Artek",
    name: "A110 Hand Grenade",
    option: "Brass",
    seller: "노르딕홈",
    sellerType: "사업자",
    grade: "A+",
    price: 620000,
    tab: "반려",
    submittedAt: "2026-04-03",
    rejectedAt: "2026-04-05",
    rejectReason: "상품 정보 미비",
    description: "2021년 구매.",
    usagePeriod: "3~5년",
    availability: "판매",
    category: "조명",
    imageCount: 1,
  },
];

const REJECT_REASONS = [
  "상품 사진 불충분 (추가 촬영 필요)",
  "사진과 실물 상태 불일치",
  "등급 기준 미달",
  "가격 기준 초과 (S등급 신품 최저가 초과)",
  "상품 정보 미비",
  "기타 (직접 입력)",
];

const GRADE_CRITERIA: Record<string, string> = {
  SS: "미개봉 / 전시용 수준, 사용 흔적 없음",
  S: "사용감 거의 없음, 완벽에 가까운 상태",
  "A+": "경미한 사용감, 눈에 띄는 흠집 없음",
  A: "사용감 있음, 기능 이상 없음",
  B: "사용감 뚜렷하나 기능 정상",
};

function ApproveModal({ product, onConfirm, onClose }: {
  product: InspectionProduct;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">상품 승인</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <div className="border border-border px-4 py-3 text-sm space-y-1">
          <div className="text-[11px] text-muted-foreground">{product.brand}</div>
          <div className="font-semibold">{product.name}</div>
          <div className="text-[11px] text-muted-foreground">{product.option}</div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          승인 즉시 플랫폼에 상품이 노출됩니다.<br />
          셀러에게 승인 알림이 발송됩니다.
        </p>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" onClick={onConfirm}>승인 확정</Button>
        </div>
      </div>
    </div>
  );
}

function RejectModal({ product, onConfirm, onClose }: {
  product: InspectionProduct;
  onConfirm: (reason: string) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState("");
  const [custom, setCustom] = useState("");
  const isCustom = selected === "기타 (직접 입력)";
  const reason = isCustom ? custom : selected;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">상품 반려</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <div className="border border-border px-4 py-3 text-sm space-y-1">
          <div className="text-[11px] text-muted-foreground">{product.brand}</div>
          <div className="font-semibold">{product.name}</div>
          <div className="text-[11px] text-muted-foreground">{product.option}</div>
        </div>
        <div className="space-y-2">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">반려 사유</div>
          {REJECT_REASONS.map((r) => (
            <button
              key={r}
              onClick={() => setSelected(r)}
              className={cn(
                "w-full text-left px-3 py-2 border text-xs transition-colors",
                selected === r ? "border-sage-ink bg-sage-soft/20 text-sage-ink" : "border-border hover:bg-muted"
              )}
            >
              {r}
            </button>
          ))}
          {isCustom && (
            <textarea
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="반려 사유를 직접 입력하세요"
              className="w-full border border-border px-3 py-2 text-sm bg-transparent resize-none h-20 outline-none focus:border-sage-ink"
            />
          )}
        </div>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button
            className="flex-1 bg-red-500 hover:bg-red-600"
            disabled={!reason.trim()}
            onClick={() => onConfirm(reason)}
          >
            반려 확정
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);

  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [result, setResult] = useState<{ type: "승인" | "반려"; reason?: string } | null>(null);

  if (!product) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        상품을 찾을 수 없습니다.
        <Link href="/admin/products" className="block mt-3 text-sage-ink underline">목록으로</Link>
      </div>
    );
  }

  const currentTab = result
    ? (result.type === "승인" ? "판매중" : "반려")
    : product.tab;

  const isPending = currentTab === "검수 대기";

  return (
    <div className="space-y-8 max-w-2xl">
      {/* 헤더 */}
      <div className="border-b border-border pb-4">
        <Link
          href="/admin/products"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors"
        >
          <ChevronLeft size={13} /> 상품 관리
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] text-muted-foreground mb-1">{product.brand}</div>
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-[11px] text-muted-foreground mt-1">{product.id} · {product.option}</p>
          </div>
          <Badge variant={
            currentTab === "판매중" ? "default"
            : currentTab === "반려" ? "muted"
            : "outline"
          }>
            {result ? result.type : currentTab}
          </Badge>
        </div>
      </div>

      {/* 처리 결과 배너 */}
      {result?.type === "승인" && (
        <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-4 flex items-center gap-3">
          <div className="w-6 h-6 bg-sage-deep flex items-center justify-center flex-shrink-0">
            <Check size={12} className="text-background" />
          </div>
          <div>
            <div className="text-sm font-semibold">승인 완료</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">
              방금 · 플랫폼에 상품 노출 및 셀러 알림 발송 완료
            </div>
          </div>
        </div>
      )}

      {(result?.type === "반려" || product.tab === "반려") && (
        <div className="border border-red-200 bg-red-50 px-5 py-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-red-400 flex items-center justify-center text-[10px] text-red-500">✕</div>
            <span className="text-sm font-semibold text-red-700">반려 처리됨</span>
            {product.rejectedAt && !result && (
              <span className="text-[11px] text-red-400 ml-auto">{product.rejectedAt}</span>
            )}
          </div>
          <div className="text-[11px] text-red-600 pl-7">
            {result?.reason ?? product.rejectReason}
          </div>
        </div>
      )}

      {/* 상품 이미지 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">상품 사진 ({product.imageCount}장)</div>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: Math.min(product.imageCount, 4) }).map((_, i) => (
            <div
              key={i}
              className="border border-border aspect-video bg-muted/20 flex items-center justify-center text-[10px] text-muted-foreground"
            >
              사진 {i + 1}
            </div>
          ))}
          {product.imageCount > 4 && (
            <div className="border border-border aspect-video bg-muted/20 flex items-center justify-center text-[10px] text-muted-foreground">
              +{product.imageCount - 4}장 더보기
            </div>
          )}
        </div>
      </section>

      {/* 상품 정보 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">상품 정보</div>
        <div className="border border-border divide-y divide-border text-sm">
          <Row label="브랜드" value={product.brand} />
          <Row label="모델명" value={product.name} />
          <Row label="옵션" value={product.option} />
          <Row label="카테고리" value={product.category} />
          <Row label="사용 기간" value={product.usagePeriod} />
          <Row
            label="등급"
            value={
              <div className="flex items-center gap-2">
                <Badge variant="default">{product.grade}</Badge>
                <span className="text-[11px] text-muted-foreground">{GRADE_CRITERIA[product.grade] ?? ""}</span>
              </div>
            }
          />
          <Row
            label="판매가"
            value={<span className="font-semibold">{formatPrice(product.price)}</span>}
          />
          {product.rentPrice && (
            <Row label="렌탈가" value={`${formatPrice(product.rentPrice)} / 월`} />
          )}
          <Row label="판매 유형" value={<Badge variant="outline">{product.availability}</Badge>} />
        </div>
      </section>

      {/* 셀러 정보 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">셀러 정보</div>
        <div className="border border-border divide-y divide-border text-sm">
          <Row label="셀러명" value={product.seller} />
          <Row label="셀러 유형" value={<Badge variant="outline">{product.sellerType}</Badge>} />
          <Row label="등록일" value={product.submittedAt} />
        </div>
      </section>

      {/* 판매자 설명 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">판매자 설명</div>
        <div className="border border-border px-4 py-4 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </div>
      </section>

      {/* 검수 결정 */}
      {isPending && (
        <div className="border border-border px-5 py-5 space-y-4">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">검수 결정</div>
          <p className="text-[11px] text-muted-foreground">
            승인 시 즉시 플랫폼에 노출됩니다. 반려 시 사유가 셀러에게 전달됩니다.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setRejectOpen(true)}>반려</Button>
            <Button className="flex-1" onClick={() => setApproveOpen(true)}>승인</Button>
          </div>
        </div>
      )}

      <div className="border-t border-border pt-6 flex justify-end">
        <Link href="/admin/products">
          <Button variant="outline">목록으로</Button>
        </Link>
      </div>

      {approveOpen && (
        <ApproveModal
          product={product}
          onConfirm={() => { setApproveOpen(false); setResult({ type: "승인" }); }}
          onClose={() => setApproveOpen(false)}
        />
      )}

      {rejectOpen && (
        <RejectModal
          product={product}
          onConfirm={(reason) => { setRejectOpen(false); setResult({ type: "반려", reason }); }}
          onClose={() => setRejectOpen(false)}
        />
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between gap-4">
      <span className="text-muted-foreground text-[11px] w-24 flex-shrink-0">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
