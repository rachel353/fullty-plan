"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { products as mockProducts } from "@/lib/mock";

type Tab = "검수 대기" | "판매중" | "렌탈중" | "품절" | "반려";

type AdminMeta = {
  tab?: Tab;
  submittedAt?: string;
  description?: string;
  usagePeriod?: string;
  sellerType?: "사업자" | "개인";
  imageCount?: number;
  rentPrice?: number;
  // 판매중 stats
  views?: number;
  likes?: number;
  salesCount?: number;
  listedAt?: string;
  // 렌탈중
  renter?: string;
  rentalStart?: string;
  rentalEnd?: string;
  // 품절
  soldOutAt?: string;
  // 반려/검수대기
  rejectReason?: string;
  rejectedAt?: string;
};

type AdminProductDetail = {
  id: string;
  brand: string;
  name: string;
  option: string;
  seller: string;
  sellerType: "사업자" | "개인";
  grade: string;
  price: number;
  tab: Tab;
  submittedAt: string;
  description: string;
  usagePeriod: string;
  availability: string;
  rentPrice?: number;
  category: string;
  imageCount: number;
  views?: number;
  likes?: number;
  salesCount?: number;
  listedAt?: string;
  renter?: string;
  rentalStart?: string;
  rentalEnd?: string;
  soldOutAt?: string;
  rejectReason?: string;
  rejectedAt?: string;
};

// Admin-specific metadata: overrides / supplements mockProducts fields
const ADMIN_META: Record<string, AdminMeta> = {
  // 검수 대기 (overrides mock status)
  p008: {
    tab: "검수 대기",
    submittedAt: "2026-04-22",
    description: "2018년 구매, 대리석 상판에 미세한 스크래치 1~2개 있으나 일상 사용에 지장 없음. 하부 받침 상태 양호. 정품 인증서 보유.",
    usagePeriod: "5~7년",
    sellerType: "사업자",
    imageCount: 4,
    rentPrice: 180000,
  },
  p017: {
    tab: "검수 대기",
    submittedAt: "2026-04-21",
    description: "2024년 구매 후 전시용으로만 사용. 사용감 거의 없음. 원 박스 포함, 케이블 길이 조절 가능.",
    usagePeriod: "1년 미만",
    sellerType: "사업자",
    imageCount: 3,
  },
  p018: {
    tab: "검수 대기",
    submittedAt: "2026-04-20",
    description: "2022년 구매, 가정 내 서재에서 사용. 패브릭 오염 없음. 다리 하단 일부 마모 있으나 안정성 문제 없음.",
    usagePeriod: "2~3년",
    sellerType: "개인",
    imageCount: 5,
    rentPrice: 15000,
  },
  // 판매중 stats
  p001: { listedAt: "2026-01-15", views: 284, likes: 31, salesCount: 0, description: "2022년 구매, 오피스에서 2년 사용. 럼바 서포트 포함, 암레스트 높이 조절 정상.", usagePeriod: "2~3년", sellerType: "개인", imageCount: 4 },
  p002: { listedAt: "2025-11-20", views: 512, likes: 87, salesCount: 1, description: "2019년 구매, 거실 코너에 배치. 월넛 패널 및 블랙 레더 상태 우수. 오토만 포함.", usagePeriod: "3~5년", sellerType: "사업자", imageCount: 6 },
  p003: { listedAt: "2026-02-08", views: 103, likes: 14, salesCount: 0, description: "2021년 구매, 홈오피스 서재에서 사용. 도장면 스크래치 없음. 구성품 전체 포함.", usagePeriod: "3~5년", sellerType: "사업자", imageCount: 3 },
  p004: { listedAt: "2026-01-25", views: 198, likes: 22, salesCount: 0, description: "2020년 구매, 다이닝 룸에서 사용. 코드 상태 양호, 오크 소프 마감 정상.", usagePeriod: "3~5년", sellerType: "사업자", imageCount: 4 },
  p006: { listedAt: "2025-12-10", views: 347, likes: 58, salesCount: 0, description: "2018년 구매, 거실에서 독서용으로 사용. 포니하이드 상태 우수. 정품 인증서 포함.", usagePeriod: "5~7년", sellerType: "사업자", imageCount: 5 },
  p007: { listedAt: "2026-03-01", views: 625, likes: 141, salesCount: 0, description: "2023년 구매, 거의 사용하지 않음. 부클레 패브릭 상태 우수. 모듈 분리 가능.", usagePeriod: "1~2년", sellerType: "사업자", imageCount: 6 },
  p009: { listedAt: "2026-02-14", views: 89, likes: 11, salesCount: 0, description: "2021년 구매, 다이닝 조명으로 사용. 페인트 상태 양호. E27 소켓 정상.", usagePeriod: "3~5년", sellerType: "사업자", imageCount: 3 },
  p010: { listedAt: "2026-01-05", views: 232, likes: 43, salesCount: 0, description: "2020년 구매, 거실 플로어 조명으로 사용. 대리석 베이스 손상 없음. 전구 포함.", usagePeriod: "3~5년", sellerType: "사업자", imageCount: 4 },
  p011: { listedAt: "2026-03-20", views: 54, likes: 7, salesCount: 2, description: "2023년 구매 후 1회 사용. 스크래치 없음. 전 구성품 원 박스 포함.", usagePeriod: "1년 미만", sellerType: "사업자", imageCount: 3 },
  p012: { listedAt: "2025-10-15", views: 176, likes: 29, salesCount: 0, description: "2019년 구매, 테이블 데코로 사용. 스테인리스 마감 상태 우수.", usagePeriod: "5~7년", sellerType: "사업자", imageCount: 3 },
  p013: { listedAt: "2026-04-01", views: 41, likes: 5, salesCount: 0, description: "2024년 구매, 소파 위에 얹어 두었음. 세탁 이력 없음. 패턴 선명.", usagePeriod: "1년 미만", sellerType: "사업자", imageCount: 2 },
  p014: { listedAt: "2026-02-28", views: 128, likes: 19, salesCount: 0, description: "2021년 구매, 선반 위 장식용. 유리 크랙 없음. 정품 스티커 부착.", usagePeriod: "3~5년", sellerType: "개인", imageCount: 3 },
  p015: { listedAt: "2025-09-01", views: 203, likes: 37, salesCount: 0, description: "액자 포함 구매. 에디션 100부 한정 작품. 서명 인증 포함. 보관 상태 최상.", usagePeriod: "3~5년", sellerType: "사업자", imageCount: 2 },
  p016: { listedAt: "2025-07-15", views: 419, likes: 92, salesCount: 0, description: "1985년 리소그라프 작품. 서명 인증서 포함. 액자 새 제품으로 교체. 전문 보관.", usagePeriod: "10년 이상", sellerType: "사업자", imageCount: 2 },
  // 렌탈중
  p005: { renter: "이가구 (m002)", rentalStart: "2026-03-01", rentalEnd: "2026-05-31", description: "2021년 구매, 서재 독서 의자로 사용. 울 패브릭 오염 없음. 리클라이닝 정상.", usagePeriod: "3~5년", sellerType: "사업자", imageCount: 4, rentPrice: 250000 },
  // 품절 (standalone)
  p022: { tab: "품절", soldOutAt: "2026-04-15", description: "2020년 구매, 홈오피스 서재 선반으로 사용. 화이트 도장 상태 우수. 구성품 전체 포함.", usagePeriod: "3~5년", sellerType: "사업자", imageCount: 4 },
  // 반려 (standalone)
  p019: { tab: "반려", rejectReason: "상품 사진과 실물 상태 불일치", rejectedAt: "2026-04-10", description: "2020년 구매. 블랙 레더 원단.", usagePeriod: "3~5년", sellerType: "사업자", imageCount: 2 },
  p020: { tab: "반려", rejectReason: "등급 기준 미달", rejectedAt: "2026-04-08", description: "2019년 구매. 다용도실 사용.", usagePeriod: "5~7년", sellerType: "사업자", imageCount: 3 },
  p021: { tab: "반려", rejectReason: "상품 정보 미비", rejectedAt: "2026-04-05", description: "2021년 구매.", usagePeriod: "3~5년", sellerType: "사업자", imageCount: 1 },
};

// Standalone products not in mockProducts
const STANDALONE: AdminProductDetail[] = [
  { id: "p022", brand: "String", name: "String System", option: "3×3 / Pure White", seller: "모듈러 코리아", sellerType: "사업자", grade: "A+", price: 980000, tab: "품절", submittedAt: "2026-03-10", description: "2020년 구매, 홈오피스 서재 선반으로 사용. 화이트 도장 상태 우수. 구성품 전체 포함.", usagePeriod: "3~5년", availability: "판매", category: "가구", imageCount: 4, soldOutAt: "2026-04-15" },
  { id: "p019", brand: "Cassina", name: "LC2 Armchair", option: "2-seater / Black Leather", seller: "이태리에디션", sellerType: "사업자", grade: "A", price: 2800000, tab: "반려", submittedAt: "2026-04-08", description: "2020년 구매. 블랙 레더 원단.", usagePeriod: "3~5년", availability: "판매", category: "가구", imageCount: 2, rejectReason: "상품 사진과 실물 상태 불일치", rejectedAt: "2026-04-10" },
  { id: "p020", brand: "Vitra", name: "DSW Chair", option: "White / Maple", seller: "오브제 스튜디오", sellerType: "사업자", grade: "B", price: 450000, tab: "반려", submittedAt: "2026-04-06", description: "2019년 구매. 다용도실 사용.", usagePeriod: "5~7년", availability: "판매", category: "가구", imageCount: 3, rejectReason: "등급 기준 미달", rejectedAt: "2026-04-08" },
  { id: "p021", brand: "Artek", name: "A110 Hand Grenade", option: "Brass", seller: "노르딕홈", sellerType: "사업자", grade: "A+", price: 620000, tab: "반려", submittedAt: "2026-04-03", description: "2021년 구매.", usagePeriod: "3~5년", availability: "판매", category: "조명", imageCount: 1, rejectReason: "상품 정보 미비", rejectedAt: "2026-04-05" },
];

function availLabel(a: string) {
  if (a === "rent") return "렌탈";
  if (a === "both") return "판매 · 렌탈";
  return "판매";
}

function buildProduct(id: string): AdminProductDetail | null {
  const meta = ADMIN_META[id] ?? {};
  const mock = mockProducts.find((p) => p.id === id);

  if (mock) {
    const tab: Tab = meta.tab ?? (mock.status === "검수중" ? "검수 대기" : mock.status as Tab);
    return {
      id: mock.id,
      brand: mock.brand,
      name: mock.name,
      option: mock.option,
      seller: mock.seller,
      sellerType: meta.sellerType ?? "사업자",
      grade: mock.grade,
      price: mock.price,
      tab,
      submittedAt: meta.submittedAt ?? "2026-01-01",
      description: meta.description ?? "판매자 설명이 없습니다.",
      usagePeriod: meta.usagePeriod ?? "미확인",
      availability: availLabel(mock.availability),
      rentPrice: meta.rentPrice,
      category: mock.category,
      imageCount: meta.imageCount ?? 3,
      views: meta.views,
      likes: meta.likes,
      salesCount: meta.salesCount,
      listedAt: meta.listedAt,
      renter: meta.renter,
      rentalStart: meta.rentalStart,
      rentalEnd: meta.rentalEnd,
      soldOutAt: meta.soldOutAt,
      rejectReason: meta.rejectReason,
      rejectedAt: meta.rejectedAt,
    };
  }

  return STANDALONE.find((p) => p.id === id) ?? null;
}

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

function ApproveModal({ product, onConfirm, onClose }: { product: AdminProductDetail; onConfirm: () => void; onClose: () => void }) {
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

function RejectModal({ product, onConfirm, onClose }: { product: AdminProductDetail; onConfirm: (reason: string) => void; onClose: () => void }) {
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
          <Button className="flex-1 bg-red-500 hover:bg-red-600" disabled={!reason.trim()} onClick={() => onConfirm(reason)}>반려 확정</Button>
        </div>
      </div>
    </div>
  );
}

function SuspendModal({ product, onConfirm, onClose }: { product: AdminProductDetail; onConfirm: (reason: string) => void; onClose: () => void }) {
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">판매 중단</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <div className="border border-border px-4 py-3 text-sm space-y-1">
          <div className="text-[11px] text-muted-foreground">{product.brand}</div>
          <div className="font-semibold">{product.name}</div>
          <div className="text-[11px] text-muted-foreground">{product.option}</div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          판매를 중단하면 플랫폼 노출이 즉시 해제됩니다.<br />
          셀러에게 중단 알림이 발송됩니다.
        </p>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full h-10 border border-border px-3 text-sm bg-background"
        >
          <option value="">중단 사유 선택</option>
          <option>셀러 요청</option>
          <option>상품 상태 이슈</option>
          <option>가격 정책 위반</option>
          <option>기타</option>
        </select>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1 bg-red-500 hover:bg-red-600" disabled={!reason} onClick={() => onConfirm(reason)}>판매 중단</Button>
        </div>
      </div>
    </div>
  );
}

function ReturnModal({ product, onConfirm, onClose }: { product: AdminProductDetail; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">렌탈 종료 처리</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <div className="border border-border px-4 py-3 text-sm space-y-1">
          <div className="text-[11px] text-muted-foreground">{product.brand}</div>
          <div className="font-semibold">{product.name}</div>
          <div className="text-[11px] text-muted-foreground">{product.option}</div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          렌탈 종료 처리 시 상품 회수가 완료된 것으로 기록됩니다.<br />
          상품은 다시 판매 상태로 전환됩니다.
        </p>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" onClick={onConfirm}>종료 확정</Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = buildProduct(id ?? "");

  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);
  const [result, setResult] = useState<{ type: "승인" | "반려" | "판매중단" | "렌탈종료"; reason?: string } | null>(null);

  if (!product) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        상품을 찾을 수 없습니다.
        <Link href="/admin/products" className="block mt-3 text-sage-ink underline">목록으로</Link>
      </div>
    );
  }

  const currentTab: Tab = result?.type === "승인" ? "판매중"
    : result?.type === "반려" ? "반려"
    : result?.type === "판매중단" ? "품절"
    : result?.type === "렌탈종료" ? "판매중"
    : product.tab;

  const tabLabel = currentTab;

  return (
    <div className="space-y-8 max-w-2xl">
      {/* 헤더 */}
      <div className="border-b border-border pb-4">
        <Link href="/admin/products" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 상품 관리
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] text-muted-foreground mb-1">{product.brand}</div>
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-[11px] text-muted-foreground mt-1">{product.id} · {product.option}</p>
          </div>
          <Badge variant={
            currentTab === "판매중" || currentTab === "렌탈중" ? "default"
            : currentTab === "반려" || currentTab === "품절" ? "muted"
            : "outline"
          }>
            {result ? (result.type === "승인" ? "판매중" : result.type === "렌탈종료" ? "판매중" : result.type) : tabLabel}
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
            <div className="text-[11px] text-muted-foreground mt-0.5">플랫폼 노출 및 셀러 알림 발송 완료</div>
          </div>
        </div>
      )}

      {(result?.type === "반려" || (product.tab === "반려" && !result)) && (
        <div className="border border-red-200 bg-red-50 px-5 py-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-red-400 flex items-center justify-center text-[10px] text-red-500">✕</div>
            <span className="text-sm font-semibold text-red-700">반려 처리됨</span>
            {product.rejectedAt && !result && (
              <span className="text-[11px] text-red-400 ml-auto">{product.rejectedAt}</span>
            )}
          </div>
          <div className="text-[11px] text-red-600 pl-7">{result?.reason ?? product.rejectReason}</div>
        </div>
      )}

      {result?.type === "판매중단" && (
        <div className="border border-amber-200 bg-amber-50 px-5 py-4 flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-amber-400 flex items-center justify-center text-[10px] text-amber-600">!</div>
          <div>
            <div className="text-sm font-semibold text-amber-800">판매 중단됨</div>
            <div className="text-[11px] text-amber-600 mt-0.5">사유: {result.reason}</div>
          </div>
        </div>
      )}

      {result?.type === "렌탈종료" && (
        <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-4 flex items-center gap-3">
          <div className="w-6 h-6 bg-sage-deep flex items-center justify-center flex-shrink-0">
            <Check size={12} className="text-background" />
          </div>
          <div>
            <div className="text-sm font-semibold">렌탈 종료 완료</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">상품 회수 처리됨 · 판매 상태로 전환됩니다</div>
          </div>
        </div>
      )}

      {/* 상품 이미지 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">상품 사진 ({product.imageCount}장)</div>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: Math.min(product.imageCount, 4) }).map((_, i) => (
            <div key={i} className="border border-border aspect-video bg-muted/20 flex items-center justify-center text-[10px] text-muted-foreground">
              사진 {i + 1}
            </div>
          ))}
          {product.imageCount > 4 && (
            <div className="border border-border aspect-video bg-muted/20 flex items-center justify-center text-[11px] text-muted-foreground">
              +{product.imageCount - 4}장 더
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
          <Row label="판매가" value={<span className="font-semibold">{formatPrice(product.price)}</span>} />
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

      {/* 판매중: 판매 현황 */}
      {(currentTab === "판매중" && !result) && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">판매 현황</div>
          <div className="grid grid-cols-4 gap-3 text-sm">
            <StatBox label="노출일" value={product.listedAt ?? "-"} />
            <StatBox label="조회수" value={`${(product.views ?? 0).toLocaleString()}`} />
            <StatBox label="찜" value={`${(product.likes ?? 0).toLocaleString()}`} />
            <StatBox label="판매" value={`${product.salesCount ?? 0}건`} />
          </div>
        </section>
      )}

      {/* 렌탈중: 렌탈 현황 */}
      {(currentTab === "렌탈중" && !result) && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">렌탈 현황</div>
          <div className="border border-border divide-y divide-border text-sm">
            <Row label="렌탈 고객" value={product.renter ?? "-"} />
            <Row label="렌탈 시작일" value={product.rentalStart ?? "-"} />
            <Row label="반납 예정일" value={product.rentalEnd ?? "-"} />
          </div>
        </section>
      )}

      {/* 품절: 품절 정보 */}
      {(currentTab === "품절" && !result) && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">품절 정보</div>
          <div className="border border-border divide-y divide-border text-sm">
            <Row label="품절 처리일" value={product.soldOutAt ?? "-"} />
          </div>
        </section>
      )}

      {/* 검수 결정 액션 */}
      {currentTab === "검수 대기" && !result && (
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

      {/* 판매중 액션 */}
      {currentTab === "판매중" && !result && (
        <div className="border border-border px-5 py-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">판매 중단</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">플랫폼 노출 해제 및 셀러 알림 발송</div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setSuspendOpen(true)}>판매 중단</Button>
        </div>
      )}

      {/* 렌탈중 액션 */}
      {currentTab === "렌탈중" && !result && (
        <div className="border border-border px-5 py-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">렌탈 종료 처리</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">상품 회수 완료 처리 및 판매 상태 전환</div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setReturnOpen(true)}>종료 처리</Button>
        </div>
      )}

      <div className="border-t border-border pt-6 flex justify-end">
        <Link href="/admin/products">
          <Button variant="outline">목록으로</Button>
        </Link>
      </div>

      {approveOpen && <ApproveModal product={product} onConfirm={() => { setApproveOpen(false); setResult({ type: "승인" }); }} onClose={() => setApproveOpen(false)} />}
      {rejectOpen && <RejectModal product={product} onConfirm={(r) => { setRejectOpen(false); setResult({ type: "반려", reason: r }); }} onClose={() => setRejectOpen(false)} />}
      {suspendOpen && <SuspendModal product={product} onConfirm={(r) => { setSuspendOpen(false); setResult({ type: "판매중단", reason: r }); }} onClose={() => setSuspendOpen(false)} />}
      {returnOpen && <ReturnModal product={product} onConfirm={() => { setReturnOpen(false); setResult({ type: "렌탈종료" }); }} onClose={() => setReturnOpen(false)} />}
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

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border px-4 py-3">
      <div className="text-[10px] text-muted-foreground mb-1">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
