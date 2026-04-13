import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function SellerApprovedPage() {
  return (
    <div className="border border-border p-8 text-center">
      <ol className="grid grid-cols-3 gap-1 mb-8">
        {["1. 유형 선택", "2. 정보 입력", "3. 승인 완료"].map((s) => (
          <li
            key={s}
            className="border border-sage-deep bg-sage-deep text-background h-9 flex items-center justify-center text-[11px] font-medium"
          >
            {s}
          </li>
        ))}
      </ol>

      <Badge variant="default" className="mb-6">
        APPROVED
      </Badge>
      <h1 className="font-display text-5xl text-sage-ink leading-[0.95]">
        셀러 승인이
        <br />
        완료되었습니다.
      </h1>
      <p className="text-sm text-muted-foreground mt-6 leading-relaxed">
        축하합니다! 풀티 셀러로 활동할 수 있습니다.
        <br />
        지금부터 상품 등록, GET 응답, 렌탈 공급, 정산 관리가 가능합니다.
      </p>

      <div className="border border-border p-5 text-left text-xs space-y-2 mt-8 mb-8">
        <div className="flex justify-between">
          <span className="text-muted-foreground">셀러 ID</span>
          <span className="font-medium">SLR-2026-04-10-001</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">셀러 유형</span>
          <span className="font-medium">사업자 셀러</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">승인 상태</span>
          <Badge variant="sage">승인 완료</Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">활성화된 기능</span>
          <span className="font-medium">상품 등록 / GET 응답 / 렌탈 / 정산</span>
        </div>
      </div>

      <div className="bg-sage-soft/40 border border-sage/40 p-5 text-left mb-8">
        <div className="text-[10px] tracking-[0.25em] uppercase text-sage-ink mb-3">
          시작 가이드
        </div>
        <ul className="space-y-2 text-xs text-sage-ink">
          <li className="flex items-start gap-2">
            <span className="font-display text-base leading-none">1.</span>
            <span>셀러 어드민에서 첫 상품을 등록하세요. 풀티 검수 후 노출됩니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-display text-base leading-none">2.</span>
            <span>관심 브랜드/카테고리를 설정하면 GET 요청 알림을 받을 수 있습니다.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-display text-base leading-none">3.</span>
            <span>정산 계좌를 미리 등록하면 판매 후 바로 정산이 시작됩니다.</span>
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <Link href="/seller" className="block">
          <Button size="lg" className="w-full">
            셀러 어드민으로 이동
          </Button>
        </Link>
        <Link href="/seller/products/new" className="block">
          <Button variant="outline" size="lg" className="w-full">
            첫 상품 등록하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
