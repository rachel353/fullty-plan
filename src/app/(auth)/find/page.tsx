"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function FindPage() {
  const [tab, setTab] = useState<"id" | "pw">("id");

  return (
    <div className="border border-border">
      {/* Tabs */}
      <div className="grid grid-cols-2">
        <button
          onClick={() => setTab("id")}
          className={
            tab === "id"
              ? "h-12 text-sm font-medium border-b-2 border-sage-ink"
              : "h-12 text-sm text-muted-foreground border-b border-border hover:text-sage-ink"
          }
        >
          아이디 찾기
        </button>
        <button
          onClick={() => setTab("pw")}
          className={
            tab === "pw"
              ? "h-12 text-sm font-medium border-b-2 border-sage-ink"
              : "h-12 text-sm text-muted-foreground border-b border-border hover:text-sage-ink"
          }
        >
          비밀번호 찾기
        </button>
      </div>

      <div className="p-8">
        {tab === "id" ? <FindId /> : <FindPw />}
      </div>
    </div>
  );
}

function FindId() {
  const [step, setStep] = useState<"form" | "verify" | "result">("form");

  if (step === "result") {
    return (
      <div className="text-center">
        <h2 className="font-display text-3xl text-sage-ink mb-2">아이디를 찾았습니다</h2>
        <p className="text-sm text-muted-foreground mb-8">
          입력하신 정보와 일치하는 계정입니다.
        </p>

        <div className="border border-border p-5 mb-8">
          <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
            등록된 이메일
          </div>
          <div className="text-lg font-medium mt-2">kim****@gmail.com</div>
          <div className="text-[11px] text-muted-foreground mt-1">가입일 2025-08-12</div>
        </div>

        <div className="space-y-2">
          <Link href="/login" className="block">
            <Button size="lg" className="w-full">
              로그인하기
            </Button>
          </Link>
          <button
            onClick={() => setStep("form")}
            className="w-full text-xs text-muted-foreground hover:text-sage-ink py-2"
          >
            다시 찾기
          </button>
        </div>
      </div>
    );
  }

  if (step === "verify") {
    return (
      <div>
        <h2 className="font-display text-3xl text-sage-ink mb-2">인증번호 입력</h2>
        <p className="text-sm text-muted-foreground mb-6">
          010-****-5678로 전송된 6자리 인증번호를 입력해 주세요.
        </p>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">인증번호</label>
            <div className="flex gap-2">
              <input
                placeholder="6자리 입력"
                maxLength={6}
                className="flex-1 h-11 px-3 text-sm border border-border bg-background tracking-[0.3em] text-center font-medium"
              />
              <button className="h-11 px-4 text-xs border border-border text-muted-foreground hover:text-sage-ink hover:border-sage-ink/40">
                재발송
              </button>
            </div>
            <div className="text-[11px] text-muted-foreground mt-1.5">
              유효시간 2:58
            </div>
          </div>

          <Button size="lg" className="w-full mt-4" onClick={() => setStep("result")}>
            확인
          </Button>
          <button
            onClick={() => setStep("form")}
            className="w-full text-xs text-muted-foreground hover:text-sage-ink py-2"
          >
            이전으로
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-3xl text-sage-ink mb-2">아이디 찾기</h2>
      <p className="text-sm text-muted-foreground mb-6">
        가입 시 입력한 이름과 연락처로 아이디를 찾을 수 있습니다.
      </p>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">이름</label>
          <input
            placeholder="가입 시 입력한 이름"
            className="w-full h-11 px-3 text-sm border border-border bg-background"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">연락처</label>
          <input
            placeholder="010-0000-0000"
            className="w-full h-11 px-3 text-sm border border-border bg-background"
          />
        </div>

        <Button size="lg" className="w-full mt-4" onClick={() => setStep("verify")}>
          인증번호 발송
        </Button>
      </div>
    </div>
  );
}

function FindPw() {
  const [step, setStep] = useState<"form" | "sent">("form");

  if (step === "sent") {
    return (
      <div className="text-center">
        <h2 className="font-display text-3xl text-sage-ink mb-2">이메일을 발송했습니다</h2>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          kim****@gmail.com 으로 비밀번호 재설정 링크를 보냈습니다.
          <br />
          이메일의 재설정 버튼을 클릭하면 비밀번호를 변경할 수 있습니다.
        </p>

        <div className="border border-border p-5 text-left text-xs space-y-2 mb-8">
          <div className="flex justify-between">
            <span className="text-muted-foreground">발송 이메일</span>
            <span className="font-medium">kim****@gmail.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">유효 시간</span>
            <span className="font-medium">30분</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">발송 시각</span>
            <span className="font-medium">2026-04-13 14:32</span>
          </div>
        </div>

        <div className="bg-sage-soft/40 border border-sage/40 p-4 text-left text-[11px] text-sage-ink leading-relaxed mb-8">
          메일이 오지 않는 경우 스팸 폴더를 확인해 주세요.
          <br />
          재발송이 필요하면 아래 버튼을 눌러주세요.
        </div>

        <div className="space-y-2">
          <button
            onClick={() => setStep("form")}
            className="w-full h-11 border border-border text-sm hover:bg-muted"
          >
            재발송
          </button>
          <Link href="/login" className="block">
            <Button variant="ghost" className="w-full text-xs">
              로그인으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-3xl text-sage-ink mb-2">비밀번호 찾기</h2>
      <p className="text-sm text-muted-foreground mb-6">
        가입한 이메일을 입력하면 비밀번호 재설정 링크를 보내드립니다.
      </p>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground mb-1.5 block">이메일</label>
          <input
            type="email"
            placeholder="가입한 이메일 주소"
            className="w-full h-11 px-3 text-sm border border-border bg-background"
          />
        </div>

        <Button size="lg" className="w-full mt-4" onClick={() => setStep("sent")}>
          재설정 링크 발송
        </Button>
      </div>
    </div>
  );
}
