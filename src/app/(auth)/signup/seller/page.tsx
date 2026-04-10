import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function SellerSignupPage() {
  return (
    <div className="border border-border p-8">
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-4">
        <Link href="/signup" className="hover:text-foreground">
          회원가입
        </Link>
        <span>/</span>
        <span className="text-foreground">셀러</span>
      </div>
      <h1 className="text-xl font-bold mb-1">셀러 가입</h1>
      <p className="text-xs text-muted-foreground mb-6">
        가입 후 풀티 운영팀의 승인 심사를 거쳐 활성화됩니다.
      </p>

      {/* Steps */}
      <ol className="grid grid-cols-3 gap-1 mb-6">
        {["1. 유형 선택", "2. 정보 입력", "3. 심사 대기"].map((s, i) => (
          <li
            key={s}
            className={
              i === 0
                ? "border border-foreground bg-foreground text-background h-9 flex items-center justify-center text-[11px] font-medium"
                : "border border-border h-9 flex items-center justify-center text-[11px] text-muted-foreground"
            }
          >
            {s}
          </li>
        ))}
      </ol>

      <div className="space-y-3">
        <div className="text-xs text-muted-foreground mb-1.5">셀러 유형</div>
        <Link
          href="/signup/seller/individual"
          className="block border border-border p-5 hover:bg-muted group"
        >
          <div className="text-sm font-semibold">개인 셀러</div>
          <div className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
            개인 명의로 보유 중인 빈티지 가구를 등록·판매합니다. 신분증 인증 필요.
          </div>
        </Link>
        <Link
          href="/signup/seller/business"
          className="block border border-border p-5 hover:bg-muted group"
        >
          <div className="text-sm font-semibold">사업자 셀러</div>
          <div className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
            사업자등록증 보유 셀러. 정산 시 세금계산서 발행, 통신판매업 신고 정보 필요.
          </div>
        </Link>
      </div>

      <div className="text-center text-xs text-muted-foreground mt-8 pt-6 border-t border-border">
        일반 회원으로 시작하시겠어요?{" "}
        <Link
          href="/signup/general"
          className="text-foreground font-medium hover:underline underline-offset-4"
        >
          일반 회원
        </Link>
      </div>
    </div>
  );
}
