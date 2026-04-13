import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  return (
    <div className="border border-border p-8">
      <h1 className="text-xl font-bold mb-1">로그인</h1>
      <p className="text-xs text-muted-foreground mb-8">계속하려면 로그인해 주세요.</p>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">이메일</label>
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full h-11 px-3 text-sm border border-border bg-background"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">비밀번호</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full h-11 px-3 text-sm border border-border bg-background"
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-foreground" />
            로그인 상태 유지
          </label>
          <Link href="/find" className="hover:text-foreground">
            아이디 / 비밀번호 찾기
          </Link>
        </div>

        <Link href="/mypage" className="block">
          <Button size="lg" className="w-full mt-3">
            로그인
          </Button>
        </Link>

        <div className="relative my-6">
          <div className="border-t border-border" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-background px-2 text-[11px] text-muted-foreground">
            또는
          </span>
        </div>

        <div className="space-y-2">
          <button className="w-full h-11 border border-border text-sm hover:bg-muted">
            카카오로 시작하기
          </button>
          <button className="w-full h-11 border border-border text-sm hover:bg-muted">
            네이버로 시작하기
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground mt-8 pt-6 border-t border-border">
        아직 계정이 없으신가요?{" "}
        <Link href="/signup" className="text-foreground font-medium hover:underline underline-offset-4">
          회원가입
        </Link>
      </div>
    </div>
  );
}
