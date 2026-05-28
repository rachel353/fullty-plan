"use client";

import { useRef, useSyncExternalStore } from "react";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  getBanners,
  setBanners,
  subscribe,
  type Banner,
  type BannerStatus,
} from "@/lib/bannerStore";
import { useState } from "react";

function getSnapshot() {
  return getBanners();
}

export default function AdminBannersPage() {
  const banners = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const [deleteTarget, setDeleteTarget] = useState<Banner | null>(null);
  const [editTarget, setEditTarget] = useState<Banner | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);

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
    setBanners(
      getBanners().map((b) =>
        b.id === id ? { ...b, status: b.status === "활성" ? "비활성" : "활성" } : b
      )
    );
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const newBanner: Banner = {
      id: `b${Date.now()}`,
      imageUrl: url,
      imageName: file.name,
      linkHref: "",
      status: "비활성",
    };
    setBanners([...getBanners(), newBanner]);
    e.target.value = "";
    setEditTarget(newBanner);
  }

  function handleEditImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editTarget) return;
    const url = URL.createObjectURL(file);
    setEditTarget({ ...editTarget, imageUrl: url, imageName: file.name });
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
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">배너 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">메인 홈 슬라이드 배너 등록 및 순서 관리</p>
        </div>
        <div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          <Button size="sm" onClick={() => fileInputRef.current?.click()}>+ 배너 업로드</Button>
        </div>
      </div>

      {/* 요약 */}
      <div className="grid grid-cols-3 gap-3">
        <Stat label="전체 배너" value={`${banners.length}개`} />
        <Stat label="현재 활성" value={`${activeCount}개`} highlight />
        <Stat label="비활성" value={`${banners.length - activeCount}개`} />
      </div>

      <p className="text-[11px] text-muted-foreground">슬라이드 순서는 위아래 버튼으로 조정합니다. 활성 배너만 홈에 노출됩니다.</p>

      {/* 배너 목록 */}
      <div className="space-y-2">
        {banners.length === 0 && (
          <div className="border border-border py-16 text-center text-sm text-muted-foreground">
            등록된 배너가 없습니다. 이미지를 업로드해 주세요.
          </div>
        )}
        {banners.map((b, i) => (
          <div
            key={b.id}
            className={cn(
              "border border-border flex gap-4 p-4 items-center",
              b.status === "비활성" && "opacity-50"
            )}
          >
            {/* 순서 버튼 */}
            <div className="flex flex-col gap-0.5 flex-shrink-0">
              <button
                onClick={() => move(b.id, -1)}
                disabled={i === 0}
                className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
              >
                <ChevronUp size={14} />
              </button>
              <span className="text-[10px] text-muted-foreground text-center font-mono">{i + 1}</span>
              <button
                onClick={() => move(b.id, 1)}
                disabled={i === banners.length - 1}
                className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
              >
                <ChevronDown size={14} />
              </button>
            </div>

            {/* 이미지 썸네일 */}
            <div className="w-32 h-20 flex-shrink-0 bg-muted border border-border overflow-hidden">
              {b.imageUrl ? (
                <img src={b.imageUrl} alt={b.imageName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">
                  {b.imageName}
                </div>
              )}
            </div>

            {/* 정보 */}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate">{b.imageName}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5 font-mono">{b.linkHref || "링크 없음"}</div>
            </div>

            {/* 상태 + 액션 */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge variant={b.status === "활성" ? "default" : "muted"}>{b.status}</Badge>
              <button
                onClick={() => toggleStatus(b.id)}
                className="text-[11px] px-2.5 py-1 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
              >
                {b.status === "활성" ? "비활성화" : "활성화"}
              </button>
              <Button size="sm" variant="outline" onClick={() => setEditTarget({ ...b })}>편집</Button>
              <button
                onClick={() => setDeleteTarget(b)}
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 편집 모달 */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditTarget(null)} />
          <div className="relative bg-background border border-border w-full max-w-md p-6 space-y-5 z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">배너 편집</h3>
              <button onClick={() => setEditTarget(null)}><X size={16} className="text-muted-foreground" /></button>
            </div>

            {/* 이미지 미리보기 + 재업로드 */}
            <div
              className="w-full h-36 border border-dashed border-border bg-muted flex items-center justify-center cursor-pointer hover:border-sage-ink/40 transition-colors overflow-hidden relative group"
              onClick={() => editFileRef.current?.click()}
            >
              {editTarget.imageUrl ? (
                <>
                  <img src={editTarget.imageUrl} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
                    클릭하여 이미지 교체
                  </div>
                </>
              ) : (
                <span className="text-[11px] text-muted-foreground">클릭하여 이미지 업로드</span>
              )}
            </div>
            <input ref={editFileRef} type="file" accept="image/*" className="hidden" onChange={handleEditImage} />

            {/* 링크 */}
            <div>
              <div className="text-[11px] text-muted-foreground mb-1">클릭 링크</div>
              <input
                value={editTarget.linkHref}
                onChange={(e) => setEditTarget({ ...editTarget, linkHref: e.target.value })}
                placeholder="예: /products"
                className="h-9 px-3 text-xs border border-border bg-background w-full outline-none focus:border-sage-ink font-mono"
              />
            </div>

            {/* 상태 */}
            <div>
              <div className="text-[11px] text-muted-foreground mb-2">상태</div>
              <div className="flex gap-2">
                {(["활성", "비활성"] as BannerStatus[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setEditTarget({ ...editTarget, status: s })}
                    className={cn(
                      "px-4 py-1.5 text-xs border transition-colors",
                      editTarget.status === s
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
              <Button variant="outline" className="flex-1" onClick={() => setEditTarget(null)}>취소</Button>
              <Button className="flex-1" onClick={saveEdit}>저장</Button>
            </div>
          </div>
        </div>
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
              <span className="font-semibold text-foreground">"{deleteTarget.imageName}"</span>을 삭제합니다. 되돌릴 수 없습니다.
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

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="border border-border p-4">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className={cn("text-base font-bold mt-1.5", highlight && "text-sage-ink")}>{value}</div>
    </div>
  );
}
