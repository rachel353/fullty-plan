"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FileUpload } from "@/components/ui/FileUpload";
import { ImageBox } from "@/components/ImageBox";
import { products } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

type StepDef = {
  id: string;
  question: string;
  type: "text" | "grade" | "image" | "confirm" | "choice";
  placeholder?: string;
  hint?: string;
  choices?: string[];
  optional?: boolean;
};

const baseSteps: StepDef[] = [
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
];

const afterMatchSteps: StepDef[] = [
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
    optional: true,
  },
  {
    id: "alert",
    question: "요청 조건과 일부 달라도 셀러 제안 알림을 받으시겠어요?",
    type: "choice",
    choices: ["알림 받기", "알림 받지 않기"],
  },
  {
    id: "duration",
    question: "요청 유지 기간을 선택해 주세요.",
    type: "choice",
    choices: ["3개월", "6개월", "12개월"],
    hint: "선택한 기간이 종료되면 요청이 자동으로 취소됩니다.",
  },
  {
    id: "confirm",
    question: "요청 내용을 확인해 주세요.",
    type: "confirm",
  },
];

function findMatches(brand: string, model: string) {
  const b = brand.toLowerCase();
  const m = model.toLowerCase();
  return products.filter(
    (p) =>
      p.brand.toLowerCase().includes(b) &&
      p.name.toLowerCase().includes(m) &&
      p.status !== "품절"
  );
}

type ChatMsg = {
  from: "bot" | "user" | "system";
  content: string;
  stepId?: string;
  matches?: typeof products;
};

export default function NewGetRequestPage() {
  const [messages, setMessages] = useState<ChatMsg[]>([
    { from: "bot", content: baseSteps[0].question, stepId: "brand" },
  ]);
  const [stepIndex, setStepIndex] = useState(0);
  const [steps, setSteps] = useState<StepDef[]>(baseSteps);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [matchShown, setMatchShown] = useState(false);
  const [waitingMatch, setWaitingMatch] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const currentStep = steps[stepIndex];
  const totalSteps = steps.length;

  function addMsg(msg: ChatMsg) {
    setMessages((prev) => [...prev, msg]);
  }

  function advance(nextIdx: number, nextSteps: StepDef[]) {
    if (nextIdx < nextSteps.length) {
      const next = nextSteps[nextIdx];
      setTimeout(() => {
        addMsg({ from: "bot", content: next.question, stepId: next.id });
        if (next.hint) {
          // hint is shown inline via stepId
        }
      }, 400);
      setStepIndex(nextIdx);
    }
  }

  function handleAnswer(value: string) {
    const step = currentStep;
    setAnswers((prev) => ({ ...prev, [step.id]: value }));
    addMsg({ from: "user", content: value });
    setInput("");

    // After model step → check for matches
    if (step.id === "model" && !matchShown) {
      const brand = answers["brand"] || "";
      const matches = findMatches(brand, value);

      if (matches.length > 0) {
        setWaitingMatch(true);
        setTimeout(() => {
          addMsg({
            from: "system",
            content: `${matches.length}개의 상품이 현재 Fullty에 등록되어 있어요!`,
            matches,
          });
          setWaitingMatch(false);
          setMatchShown(true);
        }, 600);
        return; // wait for user to pick "구매" or "계속 요청"
      } else {
        setTimeout(() => {
          addMsg({
            from: "bot",
            content: "현재 Fullty에 등록된 상품이 없어요. 구해주세요 요청을 계속 진행할게요!",
          });
        }, 400);
        setMatchShown(true);
        // Build full steps and advance
        const full = [...baseSteps, ...afterMatchSteps];
        setSteps(full);
        advance(2, full);
        return;
      }
    }

    // Normal advance
    const nextIdx = stepIndex + 1;
    if (nextIdx < steps.length) {
      advance(nextIdx, steps);
    }
  }

  function handleContinueRequest() {
    // User chose to continue GET request instead of buying matched product
    addMsg({ from: "user", content: "없는 조건으로 계속 요청할게요" });
    setTimeout(() => {
      addMsg({
        from: "bot",
        content: "알겠어요! 조건을 좀 더 구체적으로 알려주세요.",
      });
    }, 300);
    const full = [...baseSteps, ...afterMatchSteps];
    setSteps(full);
    setTimeout(() => {
      advance(2, full);
    }, 700);
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  function handleReset() {
    setMessages([{ from: "bot", content: baseSteps[0].question, stepId: "brand" }]);
    setStepIndex(0);
    setSteps(baseSteps);
    setAnswers({});
    setInput("");
    setMatchShown(false);
    setWaitingMatch(false);
    setSubmitted(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      handleAnswer(input.trim());
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
                key === "memo" ? "메모" : null;
              if (!label) return null;
              return (
                <div key={key} className="flex justify-between">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{val}</span>
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

  const progress = Math.min(((stepIndex + 1) / Math.max(totalSteps, 1)) * 100, 100);

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
            {stepIndex + 1} / {totalSteps}
          </div>
        </div>
        <div className="h-1 bg-border mt-4">
          <div
            className="h-1 bg-sage-deep transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 space-y-4 pb-8">
        {messages.map((msg, i) => {
          if (msg.from === "bot") {
            const step = steps.find((s) => s.id === msg.stepId);
            return (
              <div key={i} className="flex gap-3">
                <div className="w-7 h-7 bg-sage-deep text-background flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                  F
                </div>
                <div className="bg-sage-soft/50 border border-sage/30 px-4 py-3 max-w-[80%]">
                  <div className="text-sm text-sage-ink">{msg.content}</div>
                  {step?.hint && (
                    <div className="text-[11px] text-muted-foreground mt-1">{step.hint}</div>
                  )}
                </div>
              </div>
            );
          }

          if (msg.from === "user") {
            return (
              <div key={i} className="flex justify-end">
                <div className="bg-sage-ink text-background px-4 py-3 max-w-[70%]">
                  <div className="text-sm">{msg.content}</div>
                </div>
              </div>
            );
          }

          // system — product matches
          if (msg.from === "system" && msg.matches) {
            return (
              <div key={i} className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-7 h-7 bg-sage-deep text-background flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    F
                  </div>
                  <div className="bg-sage-soft/50 border border-sage/30 px-4 py-3 max-w-[80%]">
                    <div className="text-sm text-sage-ink">{msg.content}</div>
                    <div className="text-[11px] text-muted-foreground mt-1">
                      아래에서 바로 구매하거나, 원하는 조건이 다르면 요청을 계속할 수 있어요.
                    </div>
                  </div>
                </div>

                {/* Product cards */}
                <div className="ml-10 space-y-2">
                  {msg.matches.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.id}`}
                      className="flex items-center gap-4 border border-border p-3 hover:bg-sage-soft/30 transition-colors"
                    >
                      <ImageBox className="w-16 h-16 flex-shrink-0" ratio="square" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <Badge variant="default">{p.grade}</Badge>
                          {p.rentable && <Badge variant="sage">RENT</Badge>}
                        </div>
                        <div className="text-[10px] text-muted-foreground tracking-[0.18em] uppercase mt-1.5">
                          {p.brand}
                        </div>
                        <div className="text-sm font-medium truncate">{p.name}</div>
                        <div className="text-[11px] text-muted-foreground">{p.option}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-medium">{formatPrice(p.price)}</div>
                        <div className="text-[10px] text-sage-deep mt-0.5">구매 →</div>
                      </div>
                    </Link>
                  ))}

                  <button
                    onClick={handleContinueRequest}
                    className="w-full border border-dashed border-border p-3 text-xs text-muted-foreground hover:text-sage-ink hover:border-sage-ink/40 transition-colors"
                  >
                    원하는 조건이 달라요 — 구해주세요 요청 계속하기 →
                  </button>
                </div>
              </div>
            );
          }

          return null;
        })}

        {/* Active input */}
        {currentStep && !waitingMatch && !(messages[messages.length - 1]?.from === "system" && messages[messages.length - 1]?.matches) && (
          <>
            {currentStep.type === "text" && (
              <div className="flex justify-end">
                <div className="w-[80%] space-y-2">
                  <div className="flex gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={currentStep.placeholder}
                      autoFocus
                      className="flex-1 h-11 px-3 text-sm border border-border bg-background"
                    />
                    <Button
                      size="sm"
                      onClick={() => input.trim() && handleAnswer(input.trim())}
                      disabled={!input.trim()}
                      className="h-11 px-5"
                    >
                      →
                    </Button>
                  </div>
                  {currentStep.optional && (
                    <button
                      onClick={() => handleAnswer("없음")}
                      className="w-full text-xs text-muted-foreground hover:text-sage-ink border border-dashed border-border hover:border-sage-ink/40 py-2 transition-colors"
                    >
                      건너뛰기 →
                    </button>
                  )}
                </div>
              </div>
            )}

            {currentStep.type === "grade" && (
              <div className="flex justify-end">
                <div className="w-[80%] grid grid-cols-5 gap-2">
                  {["SS", "S", "A+", "A", "B"].map((g) => (
                    <button
                      key={g}
                      onClick={() => handleAnswer(g)}
                      className="h-11 text-sm font-medium border border-border hover:bg-sage-soft hover:border-sage transition-colors"
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep.type === "choice" && currentStep.choices && (
              <div className="flex justify-end">
                <div
                  className="w-[80%] grid gap-2"
                  style={{ gridTemplateColumns: `repeat(${currentStep.choices.length}, 1fr)` }}
                >
                  {currentStep.choices.map((c) => (
                    <button
                      key={c}
                      onClick={() => handleAnswer(c)}
                      className="h-11 text-sm font-medium border border-border hover:bg-sage-soft hover:border-sage transition-colors"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep.type === "image" && (
              <div className="flex justify-end">
                <div className="w-[80%] space-y-2">
                  <FileUpload label="참고 이미지 업로드" accept="image/*" />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleAnswer("이미지 첨부됨")} className="flex-1">
                      첨부 완료
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleAnswer("없음")} className="flex-1">
                      건너뛰기
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentStep.type === "confirm" && (
              <div className="flex justify-end">
                <div className="w-[80%]">
                  <div className="border border-border p-4 text-xs space-y-2 mb-3">
                    {Object.entries(answers).map(([key, val]) => {
                      const label =
                        key === "brand" ? "브랜드" :
                        key === "model" ? "모델명" :
                        key === "option" ? "옵션" :
                        key === "grade" ? "선호 등급" :
                        key === "image" ? "참고 이미지" :
                        key === "memo" ? "메모" :
                        key === "alert" ? "조건 외 알림" :
                        key === "duration" ? "유지 기간" : null;
                      if (!label) return null;
                      return (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-medium">{val}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      처음부터
                    </Button>
                    <Button size="sm" onClick={handleSubmit}>
                      요청 등록
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
