"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { getRequests } from "@/lib/mock";

const BRANDS = [
  "Herman Miller", "Vitra", "Fritz Hansen", "Knoll", "USM",
  "Cassina", "Artek", "Kartell", "Muuto", "HAY",
  "Carl Hansen", "Moooi", "&Tradition", "Magis", "Nendo",
];

const CATEGORIES = [
  "의자", "소파", "테이블", "조명", "수납",
  "침대/침구", "데스크", "아웃도어", "아트/데코",
];

type Selection = { brands: string[]; categories: string[] };

const INITIAL: Selection = { brands: ["Herman Miller", "Vitra", "USM"], categories: ["의자"] };

function MultiSelectDropdown({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function openDropdown() {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function toggle(opt: string) {
    onChange(
      selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]
    );
  }

  const filtered = query.trim()
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={open ? () => { setOpen(false); setQuery(""); } : openDropdown}
        className={cn(
          "w-full flex items-center justify-between px-3 h-10 border text-sm transition-colors",
          open ? "border-sage-ink" : "border-border hover:border-sage-ink/50"
        )}
      >
        <span className="text-sm">
          {label}
          {selected.length > 0 && (
            <span className="ml-2 px-1.5 py-0.5 bg-sage-ink text-background text-[10px]">
              {selected.length}
            </span>
          )}
        </span>
        <ChevronDown
          size={14}
          className={cn("text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="absolute z-20 top-full left-0 right-0 mt-1 border border-border bg-background shadow-sm">
          {/* 검색 인풋 */}
          <div className="border-b border-border px-3 py-2">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색..."
              className="w-full text-sm bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* 필터된 목록 */}
          <div className="max-h-44 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-3 py-3 text-xs text-muted-foreground">결과 없음</div>
            ) : (
              filtered.map((opt) => {
                const checked = selected.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggle(opt)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors",
                      checked ? "bg-sage-soft/30 text-sage-ink" : "hover:bg-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "w-4 h-4 border flex items-center justify-center flex-shrink-0",
                        checked ? "border-sage-ink bg-sage-ink" : "border-border"
                      )}
                    >
                      {checked && <Check size={10} className="text-background" />}
                    </span>
                    {opt}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SellerGetRequestsPage() {
  const [selection, setSelection] = useState<Selection>(INITIAL);
  const [modalOpen, setModalOpen] = useState(false);
  const [draft, setDraft] = useState<Selection>(INITIAL);

  function openModal() {
    setDraft({ ...selection });
    setModalOpen(true);
  }

  function save() {
    setSelection(draft);
    setModalOpen(false);
  }

  function removeTag(type: "brands" | "categories", val: string) {
    setDraft((prev) => ({ ...prev, [type]: prev[type].filter((v) => v !== val) }));
  }

  const allSelected = [...selection.brands, ...selection.categories];

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">GET 요청 알림</h2>
        <p className="text-sm text-muted-foreground mt-1">
          관심 카테고리에 등록된 새로운 구해주세요 요청. 제안 시 풀티 검수 후 사용자에게 전달됩니다.
        </p>
      </div>

      {/* 관심 키워드 */}
      <div className="border border-border p-4 bg-muted/40 flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground">관심 키워드</span>
        {allSelected.length === 0 ? (
          <span className="text-xs text-muted-foreground">설정된 키워드 없음</span>
        ) : (
          allSelected.map((kw) => (
            <span key={kw} className="text-xs font-medium text-foreground bg-background border border-border px-2 py-0.5">
              {kw}
            </span>
          ))
        )}
        <button
          onClick={openModal}
          className="ml-1 text-[11px] text-sage-ink underline underline-offset-2 hover:text-sage-deep transition-colors"
        >
          변경
        </button>
      </div>

      {/* GET 요청 목록 */}
      <div className="space-y-3">
        {getRequests.map((req) => (
          <div key={req.id} className="border border-border p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-[11px] text-muted-foreground">{req.id} · {req.createdAt}</div>
                <div className="text-[11px] text-muted-foreground mt-2">{req.brand}</div>
                <div className="text-sm font-semibold">{req.model}</div>
                <div className="text-[11px] text-muted-foreground">{req.option}</div>
                <div className="text-sm font-medium mt-2">희망가 {req.budget.toLocaleString()}원</div>
              </div>
              <Badge variant={req.proposalCount > 0 ? "default" : "outline"}>
                {req.proposalCount > 0 ? `${req.proposalCount}개 제안 등록됨` : "신규"}
              </Badge>
            </div>
            <div className="border-t border-border pt-4 flex items-center justify-between">
              <div className="text-[11px] text-muted-foreground leading-relaxed">
                제안 작성 시 <strong>상품 / 사진 / 사용 기간 / 가격</strong>을 입력합니다.<br />
                Fullty 검수 후 사용자에게 전달됩니다.
              </div>
              <Link href={`/seller/get-requests/${req.id}/propose`}>
                <Button size="sm">제안 작성</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 관심 키워드 모달 */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModalOpen(false)} />
          <div className="relative bg-background border border-border w-full max-w-md p-6 space-y-5 z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">관심 키워드 설정</h3>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>

            <p className="text-[11px] text-muted-foreground">
              선택한 브랜드·카테고리의 GET 요청이 들어오면 알림을 받습니다.
            </p>

            {/* 드롭다운 */}
            <div className="space-y-3">
              <div>
                <div className="text-xs text-muted-foreground mb-1.5">브랜드</div>
                <MultiSelectDropdown
                  label="브랜드 선택"
                  options={BRANDS}
                  selected={draft.brands}
                  onChange={(next) => setDraft((d) => ({ ...d, brands: next }))}
                />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1.5">카테고리</div>
                <MultiSelectDropdown
                  label="카테고리 선택"
                  options={CATEGORIES}
                  selected={draft.categories}
                  onChange={(next) => setDraft((d) => ({ ...d, categories: next }))}
                />
              </div>
            </div>

            {/* 선택된 태그 */}
            {(draft.brands.length > 0 || draft.categories.length > 0) && (
              <div>
                <div className="text-xs text-muted-foreground mb-2">
                  선택됨 ({draft.brands.length + draft.categories.length})
                </div>
                <div className="flex flex-wrap gap-2">
                  {draft.brands.map((b) => (
                    <span key={b} className="flex items-center gap-1.5 px-2.5 py-1 border border-sage-ink/40 bg-sage-soft/30 text-xs text-sage-ink">
                      {b}
                      <button onClick={() => removeTag("brands", b)}><X size={10} /></button>
                    </span>
                  ))}
                  {draft.categories.map((c) => (
                    <span key={c} className="flex items-center gap-1.5 px-2.5 py-1 border border-border bg-muted text-xs text-muted-foreground">
                      {c}
                      <button onClick={() => removeTag("categories", c)}><X size={10} /></button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <Button variant="outline" onClick={() => setModalOpen(false)}>취소</Button>
              <Button onClick={save}>저장</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
