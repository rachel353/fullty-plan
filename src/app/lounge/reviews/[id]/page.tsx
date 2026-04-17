import { notFound } from "next/navigation";
import Link from "next/link";
import { ImageBox } from "@/components/ImageBox";
import { Badge } from "@/components/ui/Badge";
import { reviews } from "@/lib/lounge";
import { CommentSection } from "@/components/lounge/CommentSection";

export default function ReviewDetailPage({ params }: { params: { id: string } }) {
  const review = reviews.find((r) => r.id === params.id);
  if (!review) notFound();

  return (
    <div className="max-w-2xl mx-auto px-12 py-16">
      {/* Back */}
      <Link
        href="/lounge"
        className="text-[11px] text-muted-foreground tracking-[0.18em] uppercase hover:text-sage-ink transition-colors"
      >
        ← Living Lounge
      </Link>

      <div className="mt-8 border-b border-border pb-8 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="default">{review.grade}</Badge>
          <Stars rating={review.rating} />
        </div>
        <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
          {review.product}
        </div>
        <div className="flex items-center gap-3 mt-3 text-[11px] text-muted-foreground">
          <span>{review.author}</span>
          <span>·</span>
          <span>{review.date}</span>
        </div>
      </div>

      {/* Image */}
      <ImageBox ratio="landscape" className="mb-8" />

      {/* Body */}
      <p className="text-sm leading-relaxed text-sage-ink">{review.body}</p>

      {/* Helpful */}
      <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
        <div className="text-[11px] text-muted-foreground">이 리뷰가 도움이 됐나요?</div>
        <button className="flex items-center gap-2 border border-border px-4 h-9 text-[11px] hover:bg-muted/40 transition-colors">
          👍 도움돼요 {review.helpful}
        </button>
      </div>

      {/* Comments */}
      <CommentSection contentLabel="이 리뷰" />

      {/* Other reviews */}
      <div className="mt-12">
        <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase mb-4">
          다른 리뷰 보기
        </div>
        <div className="space-y-2">
          {reviews
            .filter((r) => r.id !== review.id)
            .map((r) => (
              <Link
                key={r.id}
                href={`/lounge/reviews/${r.id}`}
                className="flex items-center gap-4 border border-border p-4 hover:bg-sage-soft/20 transition-colors"
              >
                <div className="w-14 h-14 bg-muted flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                    {r.product}
                  </div>
                  <div className="text-sm text-sage-ink truncate mt-0.5">{r.body}</div>
                </div>
                <Badge variant="default" className="flex-shrink-0">{r.grade}</Badge>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? "text-sm text-sage-ink" : "text-sm text-border"}>
          ★
        </span>
      ))}
    </div>
  );
}
