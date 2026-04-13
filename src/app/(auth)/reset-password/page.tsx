"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function ResetPasswordPage() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="border border-border p-8 text-center">
        <Badge variant="sage" className="mb-6">
          COMPLETE
        </Badge>
        <h1 className="font-display text-4xl text-sage-ink leading-[0.95]">
          비밀번호가
          <br />
          변경되었습니다.
        </h1>
        <p className="text-sm text-muted-foreground mt-5 mb-8">
          새 비밀번호로 로그인해 주세요.
        </p>
        <Link href="/login" className="block">
          <Button size="lg" className="w-full">
            로그인하기
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="border border-border p-8">
      <h1 className="font-display text-4xl text-sage-ink mb-2">비밀번호 재설정</h1>
      <p className="text-sm text-muted-foreground mb-8">
        새로운 비밀번호를 입력해 주세요.
      </p>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">새 비밀번호</label>
          <input
            type="password"
            placeholder="영문/숫자/특수문자 8자 이상"
            className="w-full h-11 px-3 text-sm border border-border bg-background"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">새 비밀번호 확인</label>
          <input
            type="password"
            placeholder="다시 입력"
            className="w-full h-11 px-3 text-sm border border-border bg-background"
          />
        </div>

        <div className="border border-border p-3 text-[11px] text-muted-foreground space-y-1 mt-2">
          <div>· 영문, 숫자, 특수문자 포함 8자 이상</div>
          <div>· 이전 비밀번호와 동일 불가</div>
          <div>· 연속 3자 이상 동일 문자 불가</div>
        </div>

        <Button size="lg" className="w-full mt-4" onClick={() => setDone(true)}>
          비밀번호 변경
        </Button>
      </div>
    </div>
  );
}
