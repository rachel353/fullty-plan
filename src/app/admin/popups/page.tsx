"use client";

import { useState, useRef } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type PopupStatus = "활성" | "비활성";
type PopupPosition = "center" | "bottom-left" | "bottom-right";

type Popup = {
  id: string;
  imageUrl: string;
  imageName: string;
  linkHref: string;
  status: PopupStatus;
  position: PopupPosition;
  oncePerDay: boolean;
  startDate: string;
  endDate: string;
};

const INITIAL_POPUPS: Popup[] = [
  {
    id: "pp001",
    imageUrl: "",
    imageName: "popup_spring_event.jpg",
    linkHref: "/products",
    status: "활성",
    position: "center",
    oncePerDay: true,
    startDate: "2026-05-01",
    endDate: "2026-05-31",
  },
  {
    id: "pp002",
    imageUrl: "",
    imageName: "popup_member_only.jpg",
    linkHref: "/get",
    status: "비활성",
    position: "bottom-right",
    oncePerDay: false,
    startDate: "2026-06-01",
    endDate: "2026-06-30",
  },
];

const POSITION_LABELS: Record<PopupPosition, string> = {
  center: "중앙",
  "bottom-left": "좌하단",
  "bottom-right": "우하단",
};

export default function AdminPopupsPage() {
  const [popups, setPopups] = useState<Popup[]>(INITIAL_POPUPS);
  const [editTarget, setEditTarget] = useState<Popup | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Popup | null>(null);
  const editFileRef = useRef<HTMLInputElement>(null);

  const isNew = !!editTarget && !popups.some((p) => p.id === editTarget.id);

  function toggleStatus(id: string) {
    setPopups((prev) =>
      prev.map((p) => p.id === id ? { ...p, status: p.status === "활성" ? "비활성" : "활성" } : p)
    );
  }

  function openCreateModal() {
    setEditTarget({
      id: `pp${Date.now()}`,
      imageUrl: "",
      imageName: "",
      linkHref: "",
      status: "비활성",
      position: "center",
      oncePerDay: true,
      startDate: "",
      endDate: "",
    });
  }

  function handleEditImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editTarget) return;
    setEditTarget({ ...editTarget, imageUrl: URL.createObjectURL(file), imageName: file.name });
    e.target.value = "";
  }

  function saveEdit() {
    if (!editTarget) return;
    setPopups((prev) =>
      prev.some((p) => p.id === editTarget.id)
        ? prev.map((p) => (p.id === editTarget.id ? editTarget : p))
        : [...prev, editTarget]
    );
    setEditTarget(null);
  }

  function handleDelete(id: string) {
    setPopups((prev) => prev.filter((p) => p.id !== id));
    setDeleteTarget(null);
  }

  const activeCount = popups.filter((p) => p.status === "활성").length;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">팝업 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">홈 화면 노출 팝업 등록 및 노출 기간 관리</p>
        </div>
        <div>
          <Button size="sm" onClick={openCreateModal}>+ 팝업 등록</Button>
        </div>
      </div>

      {/* 요약 */}
      <div className="grid grid-cols-3 gap-3">
        <Stat label="전체 팝업" value={`${popups.length}개`} />
        <Stat label="현재 활성" value={`${activeCount}개`} highlight />
        <Stat label="비활성" value={`${popups.length - activeCount}개`} />
      </div>

      <p className="text-[11px] text-muted-foreground">활성 상태이며 노출 기간 내인 팝업만 홈에 표시됩니다. 오늘 하루 안 보기 설정도 팝업별로 적용됩니다.</p>

      {/* 팝업 목록 */}
      <div className="space-y-2">
        {popups.length === 0 && (
          <div className="border border-border py-16 text-center text-sm text-muted-foreground">
            등록된 팝업이 없습니다.
          </div>
        )}
        {popups.map((p) => (
          <div
            key={p.id}
            className={cn(
              "border border-border flex gap-4 p-4 items-center",
              p.status === "비활성" && "opacity-50"
            )}
          >
            {/* 썸네일 */}
            <div className="w-24 h-24 flex-shrink-0 bg-muted border border-border overflow-hidden">
              {p.imageUrl ? (
                <img src={p.imageUrl} alt={p.imageName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground text-center px-1">
                  {p.imageName}
                </div>
              )}
            </div>

            {/* 정보 */}
            <div className="flex-1 min-w-0 space-y-1">
              <div className="text-xs font-medium truncate">{p.imageName}</div>
              <div className="text-[11px] text-muted-foreground font-mono">{p.linkHref || "링크 없음"}</div>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span>위치: {POSITION_LABELS[p.position]}</span>
                <span>·</span>
                <span>{p.oncePerDay ? "오늘 하루 안 보기 ON" : "오늘 하루 안 보기 OFF"}</span>
                {p.startDate && p.endDate && (
                  <>
                    <span>·</span>
                    <span>{p.startDate} ~ {p.endDate}</span>
                  </>
                )}
              </div>
            </div>

            {/* 상태 + 액션 */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Badge variant={p.status === "활성" ? "default" : "muted"}>{p.status}</Badge>
              <button
                onClick={() => toggleStatus(p.id)}
                className="text-[11px] px-2.5 py-1 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
              >
                {p.status === "활성" ? "비활성화" : "활성화"}
              </button>
              <Button size="sm" variant="outline" onClick={() => setEditTarget({ ...p })}>편집</Button>
              <button onClick={() => setDeleteTarget(p)} className="p-1.5 text-muted-foreground hover:text-foreground">
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
          <div className="relative bg-background border border-border w-full max-w-md p-6 space-y-5 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">{isNew ? "팝업 등록" : "팝업 편집"}</h3>
              <button onClick={() => setEditTarget(null)}><X size={16} className="text-muted-foreground" /></button>
            </div>

            {/* 이미지 */}
            <div
              className="w-full h-40 border border-dashed border-border bg-muted flex items-center justify-center cursor-pointer hover:border-sage-ink/40 transition-colors overflow-hidden relative group"
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

            {/* 노출 위치 */}
            <div>
              <div className="text-[11px] text-muted-foreground mb-2">노출 위치</div>
              <div className="flex gap-2">
                {(["center", "bottom-left", "bottom-right"] as PopupPosition[]).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setEditTarget({ ...editTarget, position: pos })}
                    className={cn(
                      "px-4 py-1.5 text-xs border transition-colors",
                      editTarget.position === pos
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    )}
                  >
                    {POSITION_LABELS[pos]}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5 leading-relaxed">
                중앙은 화면을 덮는 메인 팝업, 좌·우하단은 페이지를 가리지 않는 레이어 팝업으로 동시에 여러 개 노출할 수 있습니다.
              </p>
            </div>

            {/* 노출 기간 */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] text-muted-foreground mb-1">노출 시작일</div>
                <input
                  type="date"
                  value={editTarget.startDate}
                  onChange={(e) => setEditTarget({ ...editTarget, startDate: e.target.value })}
                  className="h-9 px-3 text-xs border border-border bg-background w-full outline-none focus:border-sage-ink"
                />
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground mb-1">노출 종료일</div>
                <input
                  type="date"
                  value={editTarget.endDate}
                  onChange={(e) => setEditTarget({ ...editTarget, endDate: e.target.value })}
                  className="h-9 px-3 text-xs border border-border bg-background w-full outline-none focus:border-sage-ink"
                />
              </div>
            </div>

            {/* 오늘 하루 안 보기 */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-medium">오늘 하루 안 보기</div>
                <div className="text-[10px] text-muted-foreground">사용자가 닫으면 당일 재노출 안 함</div>
              </div>
              <button
                onClick={() => setEditTarget({ ...editTarget, oncePerDay: !editTarget.oncePerDay })}
                className={cn(
                  "w-10 h-5 rounded-full transition-colors relative",
                  editTarget.oncePerDay ? "bg-sage-ink" : "bg-border"
                )}
              >
                <span className={cn(
                  "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                  editTarget.oncePerDay ? "translate-x-5" : "translate-x-0.5"
                )} />
              </button>
            </div>

            {/* 상태 */}
            <div>
              <div className="text-[11px] text-muted-foreground mb-2">상태</div>
              <div className="flex gap-2">
                {(["활성", "비활성"] as PopupStatus[]).map((s) => (
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
              <Button className="flex-1" onClick={saveEdit}>{isNew ? "등록" : "저장"}</Button>
            </div>
          </div>
        </div>
      )}

      {/* 삭제 확인 */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">팝업 삭제</h3>
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
