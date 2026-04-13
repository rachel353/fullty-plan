"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FileUpload } from "@/components/ui/FileUpload";

type Step = {
  id: string;
  question: string;
  type: "text" | "select" | "grade" | "price" | "image" | "confirm";
  options?: string[];
  placeholder?: string;
  hint?: string;
};

const steps: Step[] = [
  {
    id: "brand",
    question: "어떤 브랜드의 가구를 찾고 계신가요?",
    type: "text",
    placeholder: "예) Herman Miller, Vitra, USM ...",
    hint: "브랜드명을 입력하면 자동완성됩니다.",
  },
  {
    id: "model",
    question: "모델명을 알려주세요.",
    type: "text",
    placeholder: "예) Aeron Chair, Eames Lounge ...",
  },
  {
    id: "option",
    question: "원하시는 옵션이나 사이즈가 있으신가요?",
    type: "text",
    placeholder: "예) Size B / Graphite, Walnut / Black ...",
    hint: "잘 모르시면 '상관없음'이라고 적어도 돼요.",
  },
  {
    id: "grade",
    question: "선호하시는 상태 등급이 있나요?",
    type: "grade",
    options: ["SS", "S", "A+", "A", "B"],
  },
  {
    id: "budget",
    question: "희망 가격대를 알려주세요.",
    type: "price",
    placeholder: "예) 1,200,000",
  },
  {
    id: "image",
    question: "참고 이미지가 있으면 올려주세요. (선택)",
    type: "image",
  },
  {
    id: "memo",
    question: "추가로 전달할 사항이 있으신가요? (선택)",
    type: "text",
    placeholder: "찾는 이유, 용도, 특이 조건 등을 자유롭게 적어주세요.",
  },
  {
    id: "confirm",
    question: "요청 내용을 확인해 주세요.",
    type: "confirm",
  },
];

export default function NewGetRequestPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [current]);

  function handleNext(value?: string) {
    const step = steps[current];
    if (value !== undefined) {
      setAnswers((prev) => ({ ...prev, [step.id]: value }));
    } else if (input.trim()) {
      setAnswers((prev) => ({ ...prev, [step.id]: input.trim() }));
    }
    setInput("");
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    }
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      handleNext();
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-12 py-16">
        <div className="text-center py-16">
          <Badge variant="sage" className="mb-6">REQUEST SUBMITTED</Badge>
          <h1 className="font-display text-5xl text-sage-ink leading-[0.95]">
            요청이 등록되었습니다.
          </h1>
          <p className="text-sm text-muted-foreground mt-5 leading-relaxed">
            인증된 셀러에게 자동으로 알림이 발송됩니다.
            <br />
            셀러 제안은 Fullty 사전 검수 후 알림톡으로 전달됩니다.
          </p>

          <div className="border border-border p-5 text-left text-xs space-y-2 mt-10 mb-10">
            {Object.entries(answers).map(([key, val]) => {
              const label =
                key === "brand" ? "브랜드" :
                key === "model" ? "모델명" :
                key === "option" ? "옵션" :
                key === "grade" ? "선호 등급" :
                key === "budget" ? "희망 가격" :
                key === "memo" ? "메모" : key;
              if (key === "image" || key === "confirm") return null;
              return (
                <div key={key} className="flex justify-between">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{key === "budget" ? `${val}원` : val}</span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link href="/mypage/get" className="block">
              <Button variant="outline" size="lg" className="w-full">GET 내역 보기</Button>
            </Link>
            <Link href="/products" className="block">
              <Button size="lg" className="w-full">쇼핑 계속하기</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const step = steps[current];

  return (
    <div className="max-w-2xl mx-auto px-12 py-16 flex flex-col min-h-[calc(100vh-300px)]">
      {/* Header */}
      <div className="border-b border-border pb-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase">
              New GET Request
            </div>
            <h1 className="font-display text-3xl text-sage-ink mt-1">구해주세요</h1>
          </div>
          <div className="text-xs text-muted-foreground">
            {current + 1} / {steps.length}
          </div>
        </div>
        {/* Progress */}
        <div className="flex gap-1 mt-4">
          {steps.map((_, i) => (
            <div
              key={i}
              className={i <= current ? "flex-1 h-1 bg-sage-deep" : "flex-1 h-1 bg-border"}
            />
          ))}
        </div>
      </div>

      {/* Chat history */}
      <div className="flex-1 space-y-6 pb-8">
        {steps.slice(0, current + 1).map((s, i) => {
          const answer = answers[s.id];
          const isActive = i === current;

          return (
            <div key={s.id}>
              {/* Bot message */}
              <div className="flex gap-3 mb-3">
                <div className="w-7 h-7 bg-sage-deep text-background flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                  F
                </div>
                <div className="bg-sage-soft/50 border border-sage/30 px-4 py-3 max-w-[80%]">
                  <div className="text-sm text-sage-ink">{s.question}</div>
                  {s.hint && (
                    <div className="text-[11px] text-muted-foreground mt-1">{s.hint}</div>
                  )}
                </div>
              </div>

              {/* User answer (past steps) */}
              {answer && !isActive && (
                <div className="flex justify-end mb-1">
                  <div className="bg-sage-ink text-background px-4 py-3 max-w-[70%]">
                    <div className="text-sm">{answer}</div>
                  </div>
                </div>
              )}

              {/* Active input area */}
              {isActive && s.type === "text" && (
                <div className="flex justify-end">
                  <div className="w-[80%] flex gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={s.placeholder}
                      autoFocus
                      className="flex-1 h-11 px-3 text-sm border border-border bg-background"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleNext()}
                      disabled={!input.trim()}
                      className="h-11 px-5"
                    >
                      →
                    </Button>
                  </div>
                </div>
              )}

              {isActive && s.type === "grade" && (
                <div className="flex justify-end">
                  <div className="w-[80%] grid grid-cols-5 gap-2">
                    {s.options?.map((g) => (
                      <button
                        key={g}
                        onClick={() => handleNext(g)}
                        className="h-11 text-sm font-medium border border-border hover:bg-sage-soft hover:border-sage transition-colors"
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isActive && s.type === "price" && (
                <div className="flex justify-end">
                  <div className="w-[80%] flex gap-2">
                    <div className="flex-1 flex items-center border border-border bg-background h-11">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={s.placeholder}
                        autoFocus
                        className="flex-1 h-full px-3 text-sm bg-transparent"
                      />
                      <span className="text-xs text-muted-foreground px-3">원</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleNext()}
                      disabled={!input.trim()}
                      className="h-11 px-5"
                    >
                      →
                    </Button>
                  </div>
                </div>
              )}

              {isActive && s.type === "image" && (
                <div className="flex justify-end">
                  <div className="w-[80%] space-y-2">
                    <FileUpload label="참고 이미지 업로드" accept="image/*" />
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleNext("이미지 첨부됨")}
                        className="flex-1"
                      >
                        첨부 완료
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleNext("없음")}
                        className="flex-1"
                      >
                        건너뛰기
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {isActive && s.type === "confirm" && (
                <div className="flex justify-end">
                  <div className="w-[80%]">
                    <div className="border border-border p-4 text-xs space-y-2 mb-3">
                      {Object.entries(answers).map(([key, val]) => {
                        const label =
                          key === "brand" ? "브랜드" :
                          key === "model" ? "모델명" :
                          key === "option" ? "옵션" :
                          key === "grade" ? "선호 등급" :
                          key === "budget" ? "희망 가격" :
                          key === "image" ? "참고 이미지" :
                          key === "memo" ? "메모" : key;
                        return (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground">{label}</span>
                            <span className="font-medium">
                              {key === "budget" ? `${val}원` : val}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" onClick={() => { setCurrent(0); setAnswers({}); }}>
                        처음부터
                      </Button>
                      <Button size="sm" onClick={handleSubmit}>
                        요청 등록
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
