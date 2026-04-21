"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { getRequests } from "@/lib/mock";

const INITIAL_KEYWORDS = ["Herman Miller", "Vitra", "USM"];
const SUGGESTED = ["Fritz Hansen", "Knoll", "Cassina", "Artek", "Kartell", "Muuto", "HAY"];

export default function SellerGetRequestsPage() {
  const [keywords, setKeywords] = useState<string[]>(INITIAL_KEYWORDS);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<string[]>(INITIAL_KEYWORDS);
  const [input, setInput] = useState("");

  function openModal() {
    setDraft([...keywords]);
    setModalOpen(true);
  }

  function addKeyword(kw: string) {
    const trimmed = kw.trim();
    if (!trimmed || draft.includes(trimmed)) return;
    setDraft((prev) => [...prev, trimmed]);
    setInput("");
  }

  function removeKeyword(kw: string) {
    setDraft((prev) => prev.filter((k) => k !== kw));
  }

  function save() {
    setKeywords(draft);
    setModalOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">GET 요청 알림</h2>
        <p className="text-sm text-muted-foreground mt-1">
          관심 카테고리에 등록된 새로운 구해주세요 요청. 제안 시 풀티 검수 후 사용자에게 전달됩니다.
        </p>
      </div>

      {/* 관심 키워드 */}
      <div className="border border-border p-4 bg-muted/40 flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground">관심 키워드</span>
        {keywords.map((kw) => (
          <span key={kw} className="text-xs font-medium text-foreground bg-background border border-border px-2 py-0.5">
            {kw}
          </span>
        ))}
        <button
          onClick={openModal}
          className="ml-1 text-[11px] text-sage-ink underline underline-offset-2 hover:text-sage-deep transition-colors"
        >
          변경
        </button>
      </div>

      {/* GET 요청 목록 */}
      <div className="space-y-3">
        {getRequests.map((req) => (
          <div key={req.id} className="border border-border p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-[11px] text-muted-foreground">
                  {req.id} · {req.createdAt}
                </div>
                <div className="text-[11px] text-muted-foreground mt-2">{req.brand}</div>
                <div className="text-sm font-semibold">{req.model}</div>
                <div className="text-[11px] text-muted-foreground">{req.option}</div>
                <div className="text-sm font-medium mt-2">
                  희망가 {req.budget.toLocaleString()}원
                </div>
              </div>
              <Badge variant={req.proposalCount > 0 ? "default" : "outline"}>
                {req.proposalCount > 0 ? `${req.proposalCount}개 제안 등록됨` : "신규"}
              </Badge>
            </div>
            <div className="border-t border-border pt-4 flex items-center justify-between">
              <div className="text-[11px] text-muted-foreground leading-relaxed">
                제안 작성 시 <strong>상품 / 사진 / 사용 기간 / 가격</strong>을 입력합니다.
                <br />
                Fullty 검수 후 사용자에게 전달됩니다.
              </div>
              <Button size="sm">제안 작성</Button>
            </div>
          </div>
        ))}
      </div>

      {/* 관심 키워드 모달 */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModalOpen(false)} />
          <div className="relative bg-background border border-border w-full max-w-md p-6 space-y-5 z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">관심 키워드 설정</h3>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>

            <p className="text-[11px] text-muted-foreground">
              등록한 키워드와 일치하는 GET 요청이 들어오면 알림을 받습니다.
            </p>

            {/* 등록된 키워드 */}
            <div>
              <div className="text-xs text-muted-foreground mb-2">등록된 키워드 ({draft.length})</div>
              <div className="flex flex-wrap gap-2 min-h-[36px]">
                {draft.length === 0 && (
                  <span className="text-[11px] text-muted-foreground">키워드를 추가해주세요.</span>
                )}
                {draft.map((kw) => (
                  <span
                    key={kw}
                    className="flex items-center gap-1.5 px-2.5 py-1 border border-sage-ink/40 bg-sage-soft/30 text-xs text-sage-ink"
                  >
                    {kw}
                    <button onClick={() => removeKeyword(kw)} className="hover:text-sage-deep">
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* 직접 입력 */}
            <div>
              <div className="text-xs text-muted-foreground mb-2">키워드 직접 추가</div>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center border border-border h-10">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addKeyword(input)}
                    placeholder="브랜드명, 모델명 입력"
                    className="flex-1 h-full px-3 text-sm bg-transparent"
                  />
                </div>
                <button
                  onClick={() => addKeyword(input)}
                  className="px-4 h-10 border border-sage-ink bg-sage-ink text-background text-xs hover:opacity-90 transition-opacity"
                >
                  추가
                </button>
              </div>
            </div>

            {/* 추천 키워드 */}
            <div>
              <div className="text-xs text-muted-foreground mb-2">추천 브랜드</div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED.filter((s) => !draft.includes(s)).map((s) => (
                  <button
                    key={s}
                    onClick={() => addKeyword(s)}
                    className="px-2.5 py-1 border border-border text-xs hover:border-sage-ink hover:text-sage-ink transition-colors"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <Button variant="outline" onClick={() => setModalOpen(false)}>취소</Button>
              <Button onClick={save}>저장</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
