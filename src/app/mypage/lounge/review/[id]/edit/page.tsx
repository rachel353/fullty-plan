"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FileUpload } from "@/components/ui/FileUpload";
import { reviews } from "@/lib/lounge";
import { useReviews } from "@/lib/review-context";

export default function ReviewEditPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { userReviews } = useReviews();

  // userReviews(context)에서 먼저 찾고, 없으면 mock에서
  const existing =
    userReviews.find((r) => r.id === id) ?? reviews.find((r) => r.id === id);

  const [product, setProduct] = useState(existing?.product ?? "");
  const [stars, setStars] = useState(existing?.rating ?? 5);
  const [body, setBody] = useState(existing?.body ?? "");
  const [submitted, setSubmitted] = useState(false);

  const isValid = product.trim() && body.trim();

  function handleSubmit() {
    if (!isValid) return;
    setSubmitted(true);
    setTimeout(() => router.push("/mypage/lounge"), 1200);
  }

  if (!existing) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="text-sm text-muted-foreground">리뷰를 찾을 수 없습니다.</div>
        <Link href="/mypage/lounge">
          <Button variant="outline" size="sm">돌아가기</Button>
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="py-32 text-center space-y-4">
        <div className="w-12 h-12 mx-auto bg-sage-deep text-background flex items-center justify-center text-2xl font-display">
          ✓
        </div>
        <div className="font-display text-3xl text-sage-ink">수정 완료</div>
        <div className="text-sm text-muted-foreground">잠시 후 리빙 라운지로 이동합니다.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">리뷰 수정</h2>
          <p className="text-sm text-muted-foreground mt-1">
            작성한 리뷰를 수정합니다.
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
            className="w-full p-4 text-sm border border-border bg-background resize-none focus:outline-none focus:border-sage-ink/40 leading-relaxed"
          />
          <div className="text-[10px] text-muted-foreground mt-1">{body.length}자</div>
        </div>

        {/* 사진 */}
        <div>
          <label className="text-xs text-muted-foreground mb-2 block">사진 교체 (선택)</label>
          <div className="grid grid-cols-3 gap-2">
            <FileUpload accept="image/*" />
            <FileUpload accept="image/*" />
            <FileUpload accept="image/*" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button variant="outline" onClick={() => router.back()}>
            취소
          </Button>
          <Button disabled={!isValid} onClick={handleSubmit}>
            수정 완료
          </Button>
        </div>
      </div>
    </div>
  );
}
