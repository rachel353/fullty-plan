"use client";

import { useState } from "react";
import { Pencil, X, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const INITIAL = {
  holder: "빈티지 웍스",
  bank: "국민은행",
  accountNo: "123-12-345678",
  bizNo: "123-45-67890",
};

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(INITIAL);
  const [draft, setDraft] = useState(INITIAL);

  function startEdit() {
    setDraft(saved);
    setIsEditing(true);
  }

  function cancel() {
    setDraft(saved);
    setIsEditing(false);
  }

  function save() {
    setSaved(draft);
    setIsEditing(false);
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div className="border-b border-border pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">정산 계좌 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">정산 수령 계좌 정보를 확인하고 변경할 수 있습니다.</p>
        </div>
        {!isEditing ? (
          <button
            onClick={startEdit}
            className="flex items-center gap-1.5 px-3 h-8 border border-border text-xs hover:bg-muted transition-colors"
          >
            <Pencil size={11} /> 수정
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <button
              onClick={cancel}
              className="flex items-center gap-1 px-3 h-8 border border-border text-xs hover:bg-muted transition-colors"
            >
              <X size={11} /> 취소
            </button>
            <button
              onClick={save}
              className="flex items-center gap-1 px-3 h-8 border border-sage-ink bg-sage-ink text-background text-xs"
            >
              <Check size={11} /> 저장
            </button>
          </div>
        )}
      </div>

      <div className="border border-border divide-y divide-border">
        {isEditing ? (
          <>
            <EditField label="예금주" value={draft.holder} onChange={(v) => setDraft((d) => ({ ...d, holder: v }))} />
            <EditField label="은행" value={draft.bank} onChange={(v) => setDraft((d) => ({ ...d, bank: v }))} />
            <EditField label="계좌번호" value={draft.accountNo} onChange={(v) => setDraft((d) => ({ ...d, accountNo: v }))} />
            <EditField label="사업자 등록번호" value={draft.bizNo} onChange={(v) => setDraft((d) => ({ ...d, bizNo: v }))} />
          </>
        ) : (
          <>
            <ViewField label="예금주" value={saved.holder} />
            <ViewField label="은행" value={saved.bank} />
            <ViewField label="계좌번호" value={saved.accountNo} />
            <ViewField label="사업자 등록번호" value={saved.bizNo} />
          </>
        )}
      </div>

      {isEditing && (
        <div className="border border-amber-200 bg-amber-50 p-4 text-[11px] text-amber-700 leading-relaxed">
          계좌 변경 시 풀티 운영팀의 승인이 필요합니다. 사업자등록증 / 통장 사본 첨부가 요구될 수 있습니다.
        </div>
      )}

      {!isEditing && (
        <div className="border border-border p-4 text-[11px] text-muted-foreground leading-relaxed">
          정산 계좌 변경이 필요하면 수정 버튼을 눌러 요청하세요. 운영팀 승인 후 반영됩니다.
        </div>
      )}
    </div>
  );
}

function ViewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-4 items-center gap-3 px-5 py-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="col-span-3 h-10 px-3 text-sm border border-border bg-muted/30 flex items-center">
        {value}
      </div>
    </div>
  );
}

function EditField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-4 items-center gap-3 px-5 py-3">
      <label className="text-xs text-muted-foreground">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="col-span-3 h-10 px-3 text-sm border border-border bg-background focus:border-sage-ink outline-none transition-colors"
      />
    </div>
  );
}
