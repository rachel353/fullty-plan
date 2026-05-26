"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const CATEGORIES = ["주문 / 결제", "렌탈", "상품 / 검수", "계정", "기타"];

export default function InquiryNewPage() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isValid = category && title.trim() && body.trim();

  function handleSubmit() {
    if (!isValid) return;
    setSubmitted(true);
    setTimeout(() => router.push("/mypage/inquiries"), 1200);
  }

  if (submitted) {
    return (
      <div className="py-32 text-center space-y-4">
        <div className="w-12 h-12 mx-auto bg-sage-deep text-background flex items-center justify-center text-xl font-bold">✓</div>
        <div className="font-display text-3xl text-sage-ink">문의가 접수되었습니다</div>
        <div className="text-sm text-muted-foreground">영업일 기준 1~2일 내 답변 드립니다.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <Link href="/mypage/inquiries" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 1:1 문의
        </Link>
        <h2 className="text-xl font-bold">문의하기</h2>
      </div>

      <div className="space-y-5">
        {/* 카테고리 */}
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">문의 유형 <span className="text-sage-deep">*</span></label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "px-3 h-8 text-xs border transition-colors",
                  category === c ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 제목 */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">제목 <span className="text-sage-deep">*</span></label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="문의 제목을 입력하세요"
            className="w-full h-11 px-4 text-sm border border-border bg-background outline-none focus:border-sage-ink"
          />
        </div>

        {/* 내용 */}
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">내용 <span className="text-sage-deep">*</span></label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="문의 내용을 자세히 입력해 주세요."
            rows={8}
            className="w-full px-4 py-3 text-sm border border-border bg-background resize-none outline-none focus:border-sage-ink leading-relaxed"
          />
        </div>

        <p className="text-[11px] text-muted-foreground">영업일 기준 1~2일 내 답변 드립니다.</p>

        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button variant="outline" onClick={() => router.back()}>취소</Button>
          <Button disabled={!isValid} onClick={handleSubmit}>문의 접수</Button>
        </div>
      </div>
    </div>
  );
}
