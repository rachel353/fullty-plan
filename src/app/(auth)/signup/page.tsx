import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SignupRoleSelectPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-1 text-center">회원가입</h1>
      <p className="text-xs text-muted-foreground mb-8 text-center">
        풀티에서 어떤 활동을 시작할지 선택해 주세요.
      </p>

      <div className="space-y-3">
        <Link
          href="/signup/general"
          className="block border border-border p-6 hover:bg-muted transition-colors group"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="text-xs text-muted-foreground tracking-widest">MEMBER</div>
            <ArrowRight
              size={16}
              className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
            />
          </div>
          <div className="text-base font-bold">일반 회원</div>
          <div className="text-xs text-muted-foreground mt-2 leading-relaxed">
            상품 구매 / 렌탈, 구해주세요 요청, 위탁·매입 신청, 가구 자산화 이용
          </div>
        </Link>

        <Link
          href="/signup/seller"
          className="block border border-border p-6 hover:bg-muted transition-colors group"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="text-xs text-muted-foreground tracking-widest">SELLER</div>
            <ArrowRight
              size={16}
              className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
            />
          </div>
          <div className="text-base font-bold">셀러 (개인 / 사업자)</div>
          <div className="text-xs text-muted-foreground mt-2 leading-relaxed">
            상품 직접 등록·판매, GET 요청 응답, 렌탈 공급, 정산 관리
            <br />
            <span className="text-foreground">* 풀티 운영팀의 승인 심사 후 활성화됩니다.</span>
          </div>
        </Link>
      </div>

      <div className="text-center text-xs text-muted-foreground mt-8 pt-6 border-t border-border">
        이미 계정이 있으신가요?{" "}
        <Link
          href="/login"
          className="text-foreground font-medium hover:underline underline-offset-4"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
