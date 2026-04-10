import { Button } from "@/components/ui/Button";
import { ImageBox } from "@/components/ImageBox";

export default function LoungePage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">리빙 라운지</h2>
        <p className="text-sm text-muted-foreground mt-1">
          내가 작성한 리뷰와 정보글을 관리합니다.
        </p>
      </div>

      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold tracking-widest text-muted-foreground">
            내 리뷰 (3)
          </div>
          <Button size="sm" variant="outline">
            리뷰 작성
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-border p-4">
              <ImageBox ratio="landscape" />
              <div className="text-sm font-medium mt-3">Aeron Chair, 1년 사용 후기</div>
              <div className="text-[11px] text-muted-foreground mt-1">2026-03-{10 + i}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-semibold tracking-widest text-muted-foreground">
            정보글 (2)
          </div>
          <Button size="sm" variant="outline">
            정보글 작성
          </Button>
        </div>
        <div className="space-y-2">
          {["Herman Miller 시리즈 비교", "USM Haller 모듈 가이드"].map((title) => (
            <div key={title} className="border border-border p-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">{title}</div>
                <div className="text-[11px] text-muted-foreground mt-1">조회 1,240 · 좋아요 38</div>
              </div>
              <Button size="sm" variant="ghost">
                수정
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
