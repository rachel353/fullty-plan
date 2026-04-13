import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function GeneralSignupCompletePage() {
  return (
    <div className="border border-border p-8 text-center">
      <Badge variant="sage" className="mb-6">
        WELCOME
      </Badge>
      <h1 className="font-display text-5xl text-sage-ink leading-[0.95]">
        회원가입이
        <br />
        완료되었습니다.
      </h1>
      <p className="text-sm text-muted-foreground mt-6 leading-relaxed">
        풀티의 모든 서비스를 이용할 수 있습니다.
        <br />
        구매, 렌탈, 구해주세요, 위탁/매입, 가구 자산화까지.
      </p>

      <div className="border border-border p-5 text-left text-xs space-y-2 mt-8 mb-8">
        <div className="flex justify-between">
          <span className="text-muted-foreground">가입 계정</span>
          <span className="font-medium">kimfullty@gmail.com</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">가입 유형</span>
          <span className="font-medium">일반 회원</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">현재 등급</span>
          <Badge variant="outline">WELCOME</Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">가입 축하 혜택</span>
          <span className="font-medium">5만원 할인 쿠폰 지급</span>
        </div>
      </div>

      <div className="space-y-2">
        <Link href="/products" className="block">
          <Button size="lg" className="w-full">
            쇼핑 시작하기
          </Button>
        </Link>
        <Link href="/mypage" className="block">
          <Button variant="outline" size="lg" className="w-full">
            마이페이지
          </Button>
        </Link>
      </div>
    </div>
  );
}
