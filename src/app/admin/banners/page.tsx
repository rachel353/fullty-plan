"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type BannerStatus = "활성" | "비활성";

type Banner = {
  id: string;
  eyebrow: string;
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  status: BannerStatus;
  startDate: string;
  endDate: string;
};

const INITIAL_BANNERS: Banner[] = [
  {
    id: "b001",
    eyebrow: "Premium Vintage Furniture · Since 2024",
    headline: "Live with objects that last.",
    description: "풀티는 검수된 프리미엄 빈티지 가구를 거래하고, 단기 렌탈하고, 내가 보유한 가구를 자산으로 관리할 수 있는 라이프스타일 플랫폼입니다.",
    ctaLabel: "Shop the Collection",
    ctaHref: "/products",
    status: "활성",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
  },
  {
    id: "b002",
    eyebrow: "Spring Collection 2026",
    headline: "New arrivals, curated for you.",
    description: "이번 시즌 새롭게 입고된 프리미엄 빈티지 컬렉션을 만나보세요.",
    ctaLabel: "새 상품 보기",
    ctaHref: "/products",
    status: "비활성",
    startDate: "2026-03-01",
    endDate: "2026-05-31",
  },
];

const EMPTY_BANNER: Omit<Banner, "id"> = {
  eyebrow: "",
  headline: "",
  description: "",
  ctaLabel: "",
  ctaHref: "",
  status: "비활성",
  startDate: "",
  endDate: "",
};

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>(INITIAL_BANNERS);
  const [editTarget, setEditTarget] = useState<Banner | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Banner | null>(null);

  function toggleStatus(id: string) {
    setBanners((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: b.status === "활성" ? "비활성" : "활성" } : b
      )
    );
  }

  function openNew() {
    setIsNew(true);
    setEditTarget({ id: "", ...EMPTY_BANNER });
  }

  function openEdit(b: Banner) {
    setIsNew(false);
    setEditTarget({ ...b });
  }

  function handleSave(b: Banner) {
    if (isNew) {
      setBanners((prev) => [...prev, { ...b, id: `b${Date.now()}` }]);
    } else {
      setBanners((prev) => prev.map((x) => (x.id === b.id ? b : x)));
    }
    setEditTarget(null);
  }

  function handleDelete(id: string) {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    setDeleteTarget(null);
  }

  const activeCount = banners.filter((b) => b.status === "활성").length;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">배너 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">메인 홈 히어로 배너 등록 및 노출 관리</p>
        </div>
        <Button size="sm" onClick={openNew}>+ 배너 추가</Button>
      </div>

      {/* 요약 */}
      <div className="grid grid-cols-3 gap-3">
        <Stat label="전체 배너" value={`${banners.length}개`} />
        <Stat label="현재 활성" value={`${activeCount}개`} />
        <Stat label="비활성" value={`${banners.length - activeCount}개`} />
      </div>

      {/* 배너 목록 */}
      <div className="space-y-3">
        {banners.length === 0 && (
          <div className="border border-border py-16 text-center text-sm text-muted-foreground">
            등록된 배너가 없습니다.
          </div>
        )}
        {banners.map((b, i) => (
          <div key={b.id} className="border border-border p-5 space-y-4">
            {/* 상단: 순서 + 상태 + 액션 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-muted-foreground font-mono w-6">#{i + 1}</span>
                <Badge variant={b.status === "활성" ? "default" : "muted"}>{b.status}</Badge>
                <span className="text-[11px] text-muted-foreground">
                  {b.startDate} ~ {b.endDate}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStatus(b.id)}
                  className={cn(
                    "text-[11px] px-3 py-1 border transition-colors",
                    b.status === "활성"
                      ? "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                      : "border-sage-ink/40 text-sage-ink hover:bg-sage-soft/20"
                  )}
                >
                  {b.status === "활성" ? "비활성화" : "활성화"}
                </button>
                <Button size="sm" variant="outline" onClick={() => openEdit(b)}>편집</Button>
                <Button size="sm" variant="ghost" onClick={() => setDeleteTarget(b)}>
                  <X size={13} />
                </Button>
              </div>
            </div>

            {/* 미리보기 */}
            <div className="bg-sage px-6 py-8 grid grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-[10px] text-sage-ink/60 tracking-[0.25em] uppercase mb-3">
                  {b.eyebrow || "—"}
                </div>
                <div className="font-display text-3xl text-sage-ink leading-tight">
                  {b.headline || "—"}
                </div>
                <p className="text-xs text-sage-ink/70 mt-3 leading-relaxed line-clamp-2">
                  {b.description || "—"}
                </p>
                {b.ctaLabel && (
                  <div className="mt-4 inline-block bg-sage-ink text-background text-xs px-4 py-2">
                    {b.ctaLabel}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 opacity-30">
                <div className="aspect-[3/4] bg-sage-ink/20" />
                <div className="space-y-2 pt-6">
                  <div className="aspect-square bg-sage-ink/20" />
                  <div className="aspect-square bg-sage-ink/20" />
                </div>
              </div>
            </div>

            {/* CTA 링크 */}
            <div className="flex gap-6 text-[11px] text-muted-foreground">
              <span>CTA: <span className="text-foreground font-medium">{b.ctaLabel || "—"}</span></span>
              <span>링크: <span className="text-foreground font-mono">{b.ctaHref || "—"}</span></span>
            </div>
          </div>
        ))}
      </div>

      {/* 편집/추가 모달 */}
      {editTarget && (
        <BannerModal
          banner={editTarget}
          isNew={isNew}
          onChange={setEditTarget}
          onSave={handleSave}
          onClose={() => setEditTarget(null)}
        />
      )}

      {/* 삭제 확인 모달 */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">배너 삭제</h3>
              <button onClick={() => setDeleteTarget(null)}><X size={16} className="text-muted-foreground" /></button>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">"{deleteTarget.headline}"</span> 배너를 삭제합니다. 되돌릴 수 없습니다.
            </p>
            <div className="flex gap-2 pt-1">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteTarget(null)}>취소</Button>
              <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={() => handleDelete(deleteTarget.id)}>삭제</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BannerModal({
  banner,
  isNew,
  onChange,
  onSave,
  onClose,
}: {
  banner: Banner;
  isNew: boolean;
  onChange: (b: Banner) => void;
  onSave: (b: Banner) => void;
  onClose: () => void;
}) {
  function field(key: keyof Banner, label: string, placeholder?: string, mono?: boolean) {
    return (
      <div>
        <div className="text-[11px] text-muted-foreground mb-1">{label}</div>
        <input
          value={banner[key] as string}
          onChange={(e) => onChange({ ...banner, [key]: e.target.value })}
          placeholder={placeholder}
          className={cn(
            "h-9 px-3 text-xs border border-border bg-background w-full outline-none focus:border-sage-ink",
            mono && "font-mono"
          )}
        />
      </div>
    );
  }

  const canSave = banner.headline.trim() && banner.ctaLabel.trim() && banner.ctaHref.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-lg p-6 space-y-5 z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">{isNew ? "배너 추가" : "배너 편집"}</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>

        <div className="space-y-4">
          {field("eyebrow", "상단 문구", "예: Premium Vintage Furniture · Since 2024")}
          {field("headline", "헤드라인 *", "예: Live with objects that last.")}

          <div>
            <div className="text-[11px] text-muted-foreground mb-1">본문</div>
            <textarea
              rows={3}
              value={banner.description}
              onChange={(e) => onChange({ ...banner, description: e.target.value })}
              placeholder="배너 본문 내용을 입력하세요."
              className="w-full px-3 py-2 text-xs border border-border bg-background resize-none outline-none focus:border-sage-ink"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {field("ctaLabel", "CTA 버튼 텍스트 *", "예: Shop the Collection")}
            {field("ctaHref", "CTA 링크 *", "예: /products", true)}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[11px] text-muted-foreground mb-1">노출 시작일</div>
              <input
                type="date"
                value={banner.startDate}
                onChange={(e) => onChange({ ...banner, startDate: e.target.value })}
                className="h-9 px-3 text-xs border border-border bg-background w-full outline-none focus:border-sage-ink"
              />
            </div>
            <div>
              <div className="text-[11px] text-muted-foreground mb-1">노출 종료일</div>
              <input
                type="date"
                value={banner.endDate}
                onChange={(e) => onChange({ ...banner, endDate: e.target.value })}
                className="h-9 px-3 text-xs border border-border bg-background w-full outline-none focus:border-sage-ink"
              />
            </div>
          </div>

          <div>
            <div className="text-[11px] text-muted-foreground mb-2">상태</div>
            <div className="flex gap-2">
              {(["활성", "비활성"] as BannerStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => onChange({ ...banner, status: s })}
                  className={cn(
                    "px-4 py-1.5 text-xs border transition-colors",
                    banner.status === s
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" disabled={!canSave} onClick={() => onSave(banner)}>
            {isNew ? "추가" : "저장"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-4">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-base font-bold mt-1.5">{value}</div>
    </div>
  );
}
