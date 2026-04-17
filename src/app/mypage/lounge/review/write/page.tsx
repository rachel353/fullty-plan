"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FileUpload } from "@/components/ui/FileUpload";
import { useReviews } from "@/lib/review-context";

export default function ReviewWritePage() {
  const router = useRouter();
  const { addReview } = useReviews();
  const [product, setProduct] = useState("");
  const [stars, setStars] = useState(5);
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isValid = product.trim() && body.trim();

  function handleSubmit() {
    if (!isValid) return;
    addReview({
      id: `user-${Date.now()}`,
      author: "김풀티",
      product: product.trim(),
      grade: "S",
      rating: stars,
      date: new Date().toISOString().slice(0, 10),
      body: body.trim(),
      helpful: 0,
    });
    setSubmitted(true);
    setTimeout(() => router.push("/mypage/lounge"), 1200);
  }

  if (submitted) {
    return (
      <div className="py-32 text-center space-y-4">
        <div className="w-12 h-12 mx-auto bg-sage-deep text-background flex items-center justify-center text-2xl font-display">
          ✓
        </div>
        <div className="font-display text-3xl text-sage-ink">리뷰 등록 완료</div>
        <div className="text-sm text-muted-foreground">잠시 후 리빙 라운지로 이동합니다.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">리뷰 작성</h2>
          <p className="text-sm text-muted-foreground mt-1">
            구매 또는 렌탈한 상품에 대한 솔직한 리뷰를 남겨주세요.
          </p>
        </div>
        <Link href="/mypage/lounge">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            ← 리빙 라운지
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {/* 상품명 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            상품명 <span className="text-sage-deep">*</span>
          </label>
          <input
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="예: Herman Miller Aeron Chair"
            className="w-full h-11 px-4 text-sm border border-border bg-background focus:outline-none focus:border-sage-ink/50"
          />
        </div>

        {/* 별점 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">별점</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setStars(n)}
                className={`text-3xl transition-colors ${n <= stars ? "text-sage-ink" : "text-border"}`}
              >
                ★
              </button>
            ))}
            <span className="ml-3 text-sm text-muted-foreground self-center">{stars}점</span>
          </div>
        </div>

        {/* 리뷰 내용 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">
            리뷰 내용 <span className="text-sage-deep">*</span>
          </label>
          <textarea
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="상품 상태, 배송 품질, 실제 사용감 등을 자유롭게 작성해 주세요.&#10;&#10;솔직한 리뷰는 다른 구매자에게 큰 도움이 됩니다."
            className="w-full p-4 text-sm border border-border bg-background resize-none focus:outline-none focus:border-sage-ink/40 leading-relaxed"
          />
          <div className="text-[10px] text-muted-foreground mt-1">{body.length}자 입력됨</div>
        </div>

        {/* 사진 첨부 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">사진 첨부 (선택)</label>
          <div className="grid grid-cols-3 gap-2">
            <FileUpload accept="image/*" />
            <FileUpload accept="image/*" />
            <FileUpload accept="image/*" />
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">
            최대 3장, 각 10MB 이하
          </div>
        </div>

        {/* 안내 */}
        <div className="bg-sage-soft/30 border border-sage/30 p-4 text-[11px] text-sage-ink leading-relaxed">
          <div className="font-semibold mb-1">리뷰 작성 안내</div>
          <div>· 허위 사실이나 비방 내용은 운영 기준에 따라 삭제될 수 있습니다.</div>
          <div>· 등록된 리뷰는 리빙 라운지 커뮤니티에 공개됩니다.</div>
          <div>· 수정은 마이페이지 → 리빙 라운지에서 가능합니다.</div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button variant="outline" onClick={() => router.back()}>
            취소
          </Button>
          <Button disabled={!isValid} onClick={handleSubmit}>
            리뷰 등록
          </Button>
        </div>
      </div>
    </div>
  );
}
