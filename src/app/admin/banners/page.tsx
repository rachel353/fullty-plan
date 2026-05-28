"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  getBanners, setBanners, subscribe,
  getCardBanners, setCardBanners, subscribeCards,
  type Banner, type BannerStatus,
} from "@/lib/bannerStore";

type Tab = "carousel" | "cards";

function getCarouselSnapshot() { return getBanners(); }
function getCardsSnapshot() { return getCardBanners(); }

export default function AdminBannersPage() {
  const [tab, setTab] = useState<Tab>("carousel");

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">배너 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">메인 홈 슬라이드 배너 및 카드뉴스 관리</p>
      </div>

      {/* 탭 */}
      <div className="flex gap-0 border border-border w-fit">
        {([["carousel", "메인 슬라이드"], ["cards", "카드뉴스 (4)"]] as [Tab, string][]).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-5 py-2 text-xs transition-colors",
              tab === t
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "carousel" ? <CarouselTab /> : <CardsTab />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 메인 슬라이드 탭
// ─────────────────────────────────────────────────────────────
function CarouselTab() {
  const banners = useSyncExternalStore(subscribe, getCarouselSnapshot, getCarouselSnapshot);
  const [deleteTarget, setDeleteTarget] = useState<Banner | null>(null);
  const [editTarget, setEditTarget] = useState<Banner | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const editFileRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;

  function move(id: string, dir: -1 | 1) {
    const prev = getBanners();
    const idx = prev.findIndex((b) => b.id === id);
    const next = idx + dir;
    if (next < 0 || next >= prev.length) return;
    const arr = [...prev];
    [arr[idx], arr[next]] = [arr[next], arr[idx]];
    setBanners(arr);
  }

  function toggleStatus(id: string) {
    setBanners(getBanners().map((b) =>
      b.id === id ? { ...b, status: b.status === "활성" ? "비활성" : "활성" } : b
    ));
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const newBanner: Banner = {
      id: `b${Date.now()}`, imageUrl: url, imageName: file.name, linkHref: "", status: "비활성",
    };
    setBanners([...getBanners(), newBanner]);
    e.target.value = "";
    setEditTarget(newBanner);
  }

  function handleEditImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editTarget) return;
    setEditTarget({ ...editTarget, imageUrl: URL.createObjectURL(file), imageName: file.name });
    e.target.value = "";
  }

  function saveEdit() {
    if (!editTarget) return;
    setBanners(getBanners().map((b) => (b.id === editTarget.id ? editTarget : b)));
    setEditTarget(null);
  }

  function handleDelete(id: string) {
    setBanners(getBanners().filter((b) => b.id !== id));
    setDeleteTarget(null);
  }

  const activeCount = banners.filter((b) => b.status === "활성").length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-3 gap-3 flex-1">
          <Stat label="전체" value={`${banners.length}개`} />
          <Stat label="활성" value={`${activeCount}개`} highlight />
          <Stat label="비활성" value={`${banners.length - activeCount}개`} />
        </div>
        <div className="ml-4 flex-shrink-0">
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          <Button size="sm" onClick={() => fileInputRef.current?.click()}>+ 슬라이드 업로드</Button>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground">순서는 위아래 버튼으로 조정. 활성 슬라이드만 홈에 노출됩니다.</p>

      <div className="space-y-2">
        {banners.length === 0 && (
          <div className="border border-border py-16 text-center text-sm text-muted-foreground">
            등록된 슬라이드가 없습니다.
          </div>
        )}
        {banners.map((b, i) => (
          <BannerRow
            key={b.id} banner={b} index={i} total={banners.length}
            onMove={(dir) => move(b.id, dir)}
            onToggle={() => toggleStatus(b.id)}
            onEdit={() => setEditTarget({ ...b })}
            onDelete={() => setDeleteTarget(b)}
          />
        ))}
      </div>

      {editTarget && (
        <EditModal
          target={editTarget}
          fileRef={editFileRef}
          onChange={setEditTarget}
          onImageChange={handleEditImage}
          onSave={saveEdit}
          onClose={() => setEditTarget(null)}
        />
      )}
      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.imageName}
          onConfirm={() => handleDelete(deleteTarget.id)}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 카드뉴스 탭 (4 고정 슬롯)
// ─────────────────────────────────────────────────────────────
const CARD_LABELS = ["카드 1", "카드 2", "카드 3", "카드 4"];

function CardsTab() {
  const cards = useSyncExternalStore(subscribeCards, getCardsSnapshot, getCardsSnapshot);
  const [editTarget, setEditTarget] = useState<Banner | null>(null);
  const editFileRef = useRef<HTMLInputElement>(null);

  function handleEditImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editTarget) return;
    setEditTarget({ ...editTarget, imageUrl: URL.createObjectURL(file), imageName: file.name });
    e.target.value = "";
  }

  function saveEdit() {
    if (!editTarget) return;
    setCardBanners(getCardBanners().map((b) => (b.id === editTarget.id ? editTarget : b)));
    setEditTarget(null);
  }

  function toggleStatus(id: string) {
    setCardBanners(getCardBanners().map((b) =>
      b.id === id ? { ...b, status: b.status === "활성" ? "비활성" : "활성" } : b
    ));
  }

  return (
    <div className="space-y-5">
      <p className="text-[11px] text-muted-foreground">
        카드뉴스는 4개 고정 슬롯입니다. 각 카드에 이미지를 업로드하고 링크를 설정하세요.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className={cn("border border-border space-y-2 p-3", card.status === "비활성" && "opacity-50")}
          >
            {/* 슬롯 라벨 */}
            <div className="text-[10px] text-muted-foreground font-mono">{CARD_LABELS[i]}</div>

            {/* 이미지 */}
            <div
              className="w-full bg-muted overflow-hidden cursor-pointer relative group"
              style={{ aspectRatio: "3/4" }}
              onClick={() => setEditTarget({ ...card })}
            >
              {card.imageUrl ? (
                <>
                  <img src={card.imageUrl} alt={card.imageName} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px]">
                    편집
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                  <div className="text-[10px] font-mono text-center px-2">{card.imageName}</div>
                  <div className="text-[10px]">클릭하여 편집</div>
                </div>
              )}
            </div>

            {/* 링크 */}
            <div className="text-[10px] text-muted-foreground font-mono truncate">
              {card.linkHref || "링크 없음"}
            </div>

            {/* 상태 + 액션 */}
            <div className="flex items-center gap-1.5">
              <Badge variant={card.status === "활성" ? "default" : "muted"} className="text-[10px]">
                {card.status}
              </Badge>
              <button
                onClick={() => toggleStatus(card.id)}
                className="text-[10px] px-2 py-0.5 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
              >
                {card.status === "활성" ? "비활성화" : "활성화"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {editTarget && (
        <EditModal
          target={editTarget}
          fileRef={editFileRef}
          onChange={setEditTarget}
          onImageChange={handleEditImage}
          onSave={saveEdit}
          onClose={() => setEditTarget(null)}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 공유 서브컴포넌트
// ─────────────────────────────────────────────────────────────
function BannerRow({
  banner: b, index: i, total,
  onMove, onToggle, onEdit, onDelete,
}: {
  banner: Banner; index: number; total: number;
  onMove: (dir: -1 | 1) => void;
  onToggle: () => void; onEdit: () => void; onDelete: () => void;
}) {
  return (
    <div className={cn("border border-border flex gap-4 p-4 items-center", b.status === "비활성" && "opacity-50")}>
      <div className="flex flex-col gap-0.5 flex-shrink-0">
        <button onClick={() => onMove(-1)} disabled={i === 0} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-20">
          <ChevronUp size={14} />
        </button>
        <span className="text-[10px] text-muted-foreground text-center font-mono">{i + 1}</span>
        <button onClick={() => onMove(1)} disabled={i === total - 1} className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-20">
          <ChevronDown size={14} />
        </button>
      </div>
      <div className="w-32 h-20 flex-shrink-0 bg-muted border border-border overflow-hidden">
        {b.imageUrl
          ? <img src={b.imageUrl} alt={b.imageName} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">{b.imageName}</div>
        }
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium truncate">{b.imageName}</div>
        <div className="text-[11px] text-muted-foreground mt-0.5 font-mono">{b.linkHref || "링크 없음"}</div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Badge variant={b.status === "활성" ? "default" : "muted"}>{b.status}</Badge>
        <button onClick={onToggle} className="text-[11px] px-2.5 py-1 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors">
          {b.status === "활성" ? "비활성화" : "활성화"}
        </button>
        <Button size="sm" variant="outline" onClick={onEdit}>편집</Button>
        <button onClick={onDelete} className="p-1.5 text-muted-foreground hover:text-foreground">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

function EditModal({
  target, fileRef, onChange, onImageChange, onSave, onClose,
}: {
  target: Banner;
  fileRef: React.RefObject<HTMLInputElement>;
  onChange: (b: Banner) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-md p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">배너 편집</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <div
          className="w-full h-36 border border-dashed border-border bg-muted flex items-center justify-center cursor-pointer hover:border-sage-ink/40 transition-colors overflow-hidden relative group"
          onClick={() => fileRef.current?.click()}
        >
          {target.imageUrl ? (
            <>
              <img src={target.imageUrl} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
                클릭하여 이미지 교체
              </div>
            </>
          ) : (
            <span className="text-[11px] text-muted-foreground">클릭하여 이미지 업로드</span>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onImageChange} />
        <div>
          <div className="text-[11px] text-muted-foreground mb-1">클릭 링크</div>
          <input
            value={target.linkHref}
            onChange={(e) => onChange({ ...target, linkHref: e.target.value })}
            placeholder="예: /products"
            className="h-9 px-3 text-xs border border-border bg-background w-full outline-none focus:border-sage-ink font-mono"
          />
        </div>
        <div>
          <div className="text-[11px] text-muted-foreground mb-2">상태</div>
          <div className="flex gap-2">
            {(["활성", "비활성"] as BannerStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => onChange({ ...target, status: s })}
                className={cn(
                  "px-4 py-1.5 text-xs border transition-colors",
                  target.status === s
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" onClick={onSave}>저장</Button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ name, onConfirm, onClose }: { name: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">배너 삭제</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">"{name}"</span>을 삭제합니다. 되돌릴 수 없습니다.
        </p>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={onConfirm}>삭제</Button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="border border-border p-4">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className={cn("text-base font-bold mt-1.5", highlight && "text-sage-ink")}>{value}</div>
    </div>
  );
}
