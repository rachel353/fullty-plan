import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function GeneralSignupPage() {
  return (
    <div className="border border-border p-8">
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-4">
        <Link href="/signup" className="hover:text-foreground">
          회원가입
        </Link>
        <span>/</span>
        <span className="text-foreground">일반 회원</span>
      </div>
      <h1 className="text-xl font-bold mb-1">일반 회원 가입</h1>
      <p className="text-xs text-muted-foreground mb-6">
        가입 즉시 구매 / 렌탈 / GET / SELL을 이용할 수 있습니다.
      </p>

      <div className="space-y-3">
        <Field label="이름" placeholder="홍길동" />
        <Field label="이메일" placeholder="name@example.com" type="email" />
        <Field label="비밀번호" placeholder="영문/숫자/특수문자 8자 이상" type="password" />
        <Field label="비밀번호 확인" placeholder="" type="password" />
        <Field label="휴대폰" placeholder="010-0000-0000" />

        <div className="border border-border p-3 mt-4 space-y-2 text-[11px]">
          <label className="flex items-start gap-2">
            <input type="checkbox" className="accent-foreground mt-0.5" defaultChecked />
            <span className="text-foreground font-medium">약관 전체 동의</span>
          </label>
          <div className="border-t border-border pt-2 space-y-1.5 text-muted-foreground">
            <label className="flex items-start gap-2">
              <input type="checkbox" className="accent-foreground mt-0.5" defaultChecked />
              <span>(필수) 이용약관 동의</span>
            </label>
            <label className="flex items-start gap-2">
              <input type="checkbox" className="accent-foreground mt-0.5" defaultChecked />
              <span>(필수) 개인정보 수집 및 이용 동의</span>
            </label>
            <label className="flex items-start gap-2">
              <input type="checkbox" className="accent-foreground mt-0.5" defaultChecked />
              <span>(필수) 만 14세 이상입니다</span>
            </label>
            <label className="flex items-start gap-2">
              <input type="checkbox" className="accent-foreground mt-0.5" />
              <span>(선택) 마케팅 정보 수신 (알림톡 / 이메일)</span>
            </label>
          </div>
        </div>

        <Link href="/signup/general/complete" className="block pt-2">
          <Button size="lg" className="w-full">
            가입 완료
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1.5 block">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-11 px-3 text-sm border border-border bg-background"
      />
    </div>
  );
}
