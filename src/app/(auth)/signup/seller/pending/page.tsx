import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function SellerPendingPage() {
  return (
    <div className="border border-border p-8 text-center">
      <ol className="grid grid-cols-3 gap-1 mb-8">
        {["1. 유형 선택", "2. 정보 입력", "3. 심사 대기"].map((s, i) => (
          <li
            key={s}
            className={
              i === 2
                ? "border border-foreground bg-foreground text-background h-9 flex items-center justify-center text-[11px] font-medium"
                : "border border-border h-9 flex items-center justify-center text-[11px] text-muted-foreground"
            }
          >
            {s}
          </li>
        ))}
      </ol>

      <Badge variant="default" className="mb-4">
        심사 진행 중
      </Badge>
      <h1 className="text-xl font-bold mb-2">셀러 신청이 접수되었습니다</h1>
      <p className="text-xs text-muted-foreground leading-relaxed mb-8">
        풀티 운영팀이 제출하신 정보를 확인하고 있습니다.
        <br />
        승인 결과는 등록하신 이메일과 알림톡으로 안내됩니다.
      </p>

      <div className="border border-border p-5 text-left text-xs space-y-2 mb-8">
        <div className="flex justify-between">
          <span className="text-muted-foreground">신청 ID</span>
          <span className="font-medium">SLR-2026-04-10-001</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">신청 유형</span>
          <span className="font-medium">사업자 셀러</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">예상 처리 기간</span>
          <span className="font-medium">영업일 기준 1~3일</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">현재 상태</span>
          <Badge variant="outline">심사 중</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <Link href="/" className="block">
          <Button variant="outline" className="w-full">
            홈으로
          </Button>
        </Link>
        <Link href="/products" className="block">
          <Button variant="ghost" className="w-full text-xs">
            먼저 둘러보기
          </Button>
        </Link>
      </div>

      <div className="text-[11px] text-muted-foreground mt-8 pt-6 border-t border-border leading-relaxed">
        승인 완료 시: 상품 등록, GET 응답, 렌탈 공급, 정산 관리 기능이 활성화됩니다.
        <br />
        반려 시: 사유와 함께 재신청 안내 메일이 발송됩니다.
      </div>
    </div>
  );
}
