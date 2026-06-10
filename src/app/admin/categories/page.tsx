"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Pencil, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { categories as INITIAL_CATEGORIES, type Category, type Subcategory } from "@/lib/categories";
import { products } from "@/lib/mock";

type CategoryModal = { mode: "add" } | { mode: "edit"; target: Category };
type SubcategoryModal = { mode: "add"; categoryId: string } | { mode: "edit"; categoryId: string; target: Subcategory };
type DeactivateTarget = { categoryId: string; name: string; usageCount: number };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(INITIAL_CATEGORIES.map((c) => c.id))
  );

  const [catModal, setCatModal] = useState<CategoryModal | null>(null);
  const [catName, setCatName] = useState("");

  const [subModal, setSubModal] = useState<SubcategoryModal | null>(null);
  const [subName, setSubName] = useState("");

  const [deactivateTarget, setDeactivateTarget] = useState<DeactivateTarget | null>(null);

  function usageCount(name: string) {
    return products.filter((p) => p.category === name).length;
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  // 대분류 추가/수정
  function openAddCategory() {
    setCatName("");
    setCatModal({ mode: "add" });
  }
  function openEditCategory(cat: Category) {
    setCatName(cat.name);
    setCatModal({ mode: "edit", target: cat });
  }
  function handleSaveCategory() {
    if (!catModal) return;
    if (catModal.mode === "add") {
      const newCat: Category = { id: `cat_${Date.now()}`, name: catName, active: true, subcategories: [] };
      setCategories((prev) => [...prev, newCat]);
      setExpanded((prev) => new Set(prev).add(newCat.id));
    } else {
      const id = catModal.target.id;
      setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name: catName } : c)));
    }
    setCatModal(null);
    setCatName("");
  }

  // 대분류 사용중단 / 재개
  function requestToggleCategory(cat: Category) {
    if (cat.active) {
      const count = usageCount(cat.name);
      if (count > 0) {
        setDeactivateTarget({ categoryId: cat.id, name: cat.name, usageCount: count });
        return;
      }
    }
    setCategories((prev) => prev.map((c) => (c.id === cat.id ? { ...c, active: !c.active } : c)));
  }
  function confirmDeactivate() {
    if (!deactivateTarget) return;
    setCategories((prev) =>
      prev.map((c) => (c.id === deactivateTarget.categoryId ? { ...c, active: false } : c))
    );
    setDeactivateTarget(null);
  }

  // 소분류 추가/수정
  function openAddSub(categoryId: string) {
    setSubName("");
    setSubModal({ mode: "add", categoryId });
  }
  function openEditSub(categoryId: string, sub: Subcategory) {
    setSubName(sub.name);
    setSubModal({ mode: "edit", categoryId, target: sub });
  }
  function handleSaveSub() {
    if (!subModal) return;
    if (subModal.mode === "add") {
      const newSub: Subcategory = { id: `sub_${Date.now()}`, name: subName, active: true };
      setCategories((prev) =>
        prev.map((c) =>
          c.id === subModal.categoryId ? { ...c, subcategories: [...c.subcategories, newSub] } : c
        )
      );
    } else {
      const subId = subModal.target.id;
      setCategories((prev) =>
        prev.map((c) =>
          c.id === subModal.categoryId
            ? { ...c, subcategories: c.subcategories.map((s) => (s.id === subId ? { ...s, name: subName } : s)) }
            : c
        )
      );
    }
    setSubModal(null);
    setSubName("");
  }

  // 소분류 사용중단 / 재개
  function toggleSub(categoryId: string, subId: string) {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, subcategories: c.subcategories.map((s) => (s.id === subId ? { ...s, active: !s.active } : s)) }
          : c
      )
    );
  }

  const activeCount = categories.filter((c) => c.active).length;
  const subTotal = categories.reduce((sum, c) => sum + c.subcategories.length, 0);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">카테고리 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">
            상품 대분류 / 소분류 관리 — 사용 중단 시 상품 데이터는 유지됩니다.
          </p>
        </div>
        <Button size="sm" onClick={openAddCategory}>
          <Plus size={13} /> 대분류 추가
        </Button>
      </div>

      {/* 요약 */}
      <div className="grid grid-cols-3 gap-3">
        <Stat label="전체 대분류" value={`${categories.length}개`} />
        <Stat label="사용 중" value={`${activeCount}개`} highlight />
        <Stat label="전체 소분류" value={`${subTotal}개`} />
      </div>

      {/* 카테고리 목록 */}
      <div className="space-y-3">
        {categories.map((cat) => {
          const isOpen = expanded.has(cat.id);
          const count = usageCount(cat.name);
          return (
            <div key={cat.id} className={cn("border border-border", !cat.active && "opacity-50")}>
              <div className="flex items-center justify-between px-4 py-3">
                <button
                  onClick={() => toggleExpand(cat.id)}
                  className="flex items-center gap-2 min-w-0 text-left"
                >
                  {isOpen ? <ChevronDown size={14} className="flex-shrink-0 text-muted-foreground" /> : <ChevronRight size={14} className="flex-shrink-0 text-muted-foreground" />}
                  <span className="font-medium text-sm">{cat.name}</span>
                  <Badge variant={cat.active ? "sage" : "muted"}>{cat.active ? "사용 중" : "사용 중단"}</Badge>
                  <span className="text-[11px] text-muted-foreground">상품 {count}개 · 소분류 {cat.subcategories.length}개</span>
                </button>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => openEditCategory(cat)}
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    title="이름 수정"
                  >
                    <Pencil size={14} />
                  </button>
                  <Button size="sm" variant="outline" onClick={() => requestToggleCategory(cat)}>
                    {cat.active ? "사용 중단" : "사용 재개"}
                  </Button>
                </div>
              </div>

              {isOpen && (
                <div className="border-t border-border divide-y divide-border bg-muted/20">
                  {cat.subcategories.length === 0 ? (
                    <div className="px-4 py-3 pl-9 text-[11px] text-muted-foreground">
                      등록된 소분류가 없습니다.
                    </div>
                  ) : (
                    cat.subcategories.map((sub) => (
                      <div key={sub.id} className="flex items-center justify-between px-4 py-2.5 pl-9">
                        <div className="flex items-center gap-2">
                          <span className={cn("text-xs", !sub.active && "text-muted-foreground line-through")}>
                            {sub.name}
                          </span>
                          <Badge variant={sub.active ? "outline" : "muted"}>{sub.active ? "사용 중" : "사용 중단"}</Badge>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openEditSub(cat.id, sub)}
                            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                            title="이름 수정"
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            onClick={() => toggleSub(cat.id, sub.id)}
                            className="text-[11px] text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                          >
                            {sub.active ? "사용 중단" : "사용 재개"}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                  <div className="px-4 py-2.5 pl-9">
                    <button
                      onClick={() => openAddSub(cat.id)}
                      className="text-[11px] text-sage-ink hover:text-sage-deep transition-colors flex items-center gap-1"
                    >
                      <Plus size={11} /> 소분류 추가
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 대분류 추가/수정 모달 */}
      {catModal && (
        <Modal title={catModal.mode === "add" ? "대분류 추가" : "대분류 이름 수정"} onClose={() => setCatModal(null)}>
          <ModalField label="카테고리 이름">
            <input
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              placeholder="예: 가전"
              className="w-full h-9 border border-border px-3 text-xs bg-background outline-none focus:border-sage-ink"
              autoFocus
            />
          </ModalField>
          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setCatModal(null)}>취소</Button>
            <Button className="flex-1" disabled={!catName.trim()} onClick={handleSaveCategory}>저장</Button>
          </div>
        </Modal>
      )}

      {/* 소분류 추가/수정 모달 */}
      {subModal && (
        <Modal title={subModal.mode === "add" ? "소분류 추가" : "소분류 이름 수정"} onClose={() => setSubModal(null)}>
          <ModalField label="소분류 이름">
            <input
              value={subName}
              onChange={(e) => setSubName(e.target.value)}
              placeholder="예: 책상"
              className="w-full h-9 border border-border px-3 text-xs bg-background outline-none focus:border-sage-ink"
              autoFocus
            />
          </ModalField>
          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setSubModal(null)}>취소</Button>
            <Button className="flex-1" disabled={!subName.trim()} onClick={handleSaveSub}>저장</Button>
          </div>
        </Modal>
      )}

      {/* 대분류 사용중단 확인 모달 */}
      {deactivateTarget && (
        <Modal title="카테고리 사용 중단" onClose={() => setDeactivateTarget(null)}>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">"{deactivateTarget.name}"</span> 카테고리를 사용 중단합니다.
            현재 이 카테고리로 등록된 상품 <span className="font-semibold text-foreground">{deactivateTarget.usageCount}개</span>는
            그대로 유지되며, 신규 등록 시에만 노출되지 않습니다.
          </p>
          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setDeactivateTarget(null)}>취소</Button>
            <Button className="flex-1" onClick={confirmDeactivate}>사용 중단</Button>
          </div>
        </Modal>
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

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-md p-6 space-y-1 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
}

function ModalField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] text-muted-foreground mb-1">{label}</div>
      {children}
    </div>
  );
}
