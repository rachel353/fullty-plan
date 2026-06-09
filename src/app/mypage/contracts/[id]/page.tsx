"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SignaturePad } from "@/components/SignaturePad";
import { cn } from "@/lib/utils";
import {
  contracts,
  contractTemplates,
  CONTRACT_BODY,
  type Contract,
  type ContractStatus,
} from "@/lib/contracts";

const MY_USER_ID = "u001";

const STATUS_VARIANT: Record<ContractStatus, "default" | "outline" | "muted" | "sage"> = {
  "대기 중": "outline",
  "서명 완료": "sage",
  "만료": "muted",
  "취소됨": "muted",
};

export default function MypageContractDetailPage({ params }: { params: { id: string } }) {
  const [localContract, setLocalContract] = useState<Contract | null>(() =>
    contracts.find((c) => c.id === params.id && c.userId === MY_USER_ID) ?? null
  );

  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [dateParts, setDateParts] = useState({ year: "", month: "", day: "" });
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!localContract) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        계약서를 찾을 수 없습니다.
        <Link href="/mypage/contracts" className="block mt-3 text-sage-ink underline">목록으로</Link>
      </div>
    );
  }

  const template = contractTemplates.find((t) => t.id === localContract.templateId);
  const body = CONTRACT_BODY[localContract.templateId] ?? [];
  const isPending = localContract.status === "대기 중";
  const isSigned = localContract.status === "서명 완료";

  const inputFields = template?.fields.filter((f) => f.type !== "signature") ?? [];
  const allFilled =
    inputFields.every((f) => {
      if (f.type === "date-parts") return !!(dateParts.year && dateParts.month && dateParts.day);
      return !!fieldValues[f.id]?.trim();
    });
  const canSubmit = allFilled && !!signatureDataUrl && agreed;

  function updateDatePart(part: "year" | "month" | "day", value: string) {
    const next = { ...dateParts, [part]: value };
    setDateParts(next);
    if (next.year && next.month && next.day) {
      setFieldValues((prev) => ({
        ...prev,
        f_date: `${next.year}년 ${next.month}월 ${next.day}일`,
      }));
    }
  }

  function handleSubmit() {
    const today = new Date().toISOString().slice(0, 10);
    setLocalContract((prev) =>
      prev ? { ...prev, status: "서명 완료", signedAt: today, signedValues: { ...fieldValues, f_sig: "__signed__" } } : prev
    );
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="py-20 text-center space-y-5">
        <CheckCircle2 size={48} className="text-sage-ink mx-auto" strokeWidth={1.5} />
        <div>
          <div className="text-xl font-bold text-sage-ink">계약이 체결되었습니다</div>
          <p className="text-sm text-muted-foreground mt-2">{localContract.templateName} 서명이 완료되었습니다.</p>
        </div>
        <Link href="/mypage/contracts">
          <Button variant="outline" size="sm">목록으로</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="border-b border-border pb-4">
        <Link href="/mypage/contracts" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 계약서 목록
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">{localContract.templateName}</h2>
            {localContract.note && <p className="text-sm text-muted-foreground mt-1">{localContract.note}</p>}
          </div>
          <Badge variant={STATUS_VARIANT[localContract.status]}>{localContract.status}</Badge>
        </div>
        <div className="flex gap-4 mt-3 text-[11px] text-muted-foreground">
          <span>발송일 {localContract.sentAt}</span>
          {isPending && <span>만료일 {localContract.expiresAt}</span>}
          {localContract.signedAt && <span>서명 완료 {localContract.signedAt}</span>}
        </div>
      </div>

      {/* 계약서 본문 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">계약서 내용</div>
        <div className="border border-border bg-white p-8 md:p-10 space-y-5 text-sm leading-loose text-gray-700 max-h-[60vh] overflow-y-auto">
          <div className="text-center space-y-1 pb-4 border-b border-gray-200">
            <div className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">Fullty Inc.</div>
            <div className="text-lg font-bold tracking-tight font-serif">{localContract.templateName}</div>
          </div>
          <div className="space-y-4 font-serif">
            {body.map((paragraph, i) => (
              <p key={i} className="leading-relaxed">{paragraph}</p>
            ))}
          </div>

          {/* 서명 필드 영역 */}
          {template && (
            <div className="pt-6 mt-4 border-t border-gray-200 space-y-5 font-sans">
              {template.fields.map((field) => {
                const signedVal = isSigned ? localContract.signedValues?.[field.id] : null;
                const label = field.docLabel ?? field.label;

                if (field.type === "date-parts") {
                  return (
                    <div key={field.id} className="flex items-end gap-3">
                      <span className="text-xs text-gray-500 w-20 flex-shrink-0 tracking-wider">{label}</span>
                      <div className="flex-1 border-b border-gray-300 pb-1 text-sm flex items-center gap-2">
                        {signedVal ? (
                          <span>{signedVal}</span>
                        ) : (
                          <span className="text-gray-300 tracking-widest flex items-center gap-3">
                            <span>______년</span>
                            <span>______월</span>
                            <span>______일</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                }

                if (field.type === "signature") {
                  return (
                    <div key={field.id} className="flex items-end gap-3">
                      <span className="text-xs text-gray-500 w-20 flex-shrink-0 tracking-wider">{label}</span>
                      <div className="flex-1 border-b border-dashed border-gray-300 h-8 flex items-center">
                        {signedVal === "__signed__" && (
                          <span className="text-sage-ink text-sm italic font-medium">✓ 서명 완료</span>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={field.id} className="flex items-end gap-3">
                    <span className="text-xs text-gray-500 w-20 flex-shrink-0 tracking-wider">{label}</span>
                    <div className="flex-1 border-b border-gray-300 pb-1 text-sm flex items-center justify-between min-h-[28px]">
                      <span>{signedVal ?? <span className="text-gray-300">&nbsp;</span>}</span>
                      {field.variant === "name-with-seal" && (
                        <span className="text-gray-500 text-xs ml-2 flex-shrink-0">(인)</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 서명 입력 폼 (대기 중일 때만) */}
      {isPending && template && (
        <section className="space-y-5">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">서명 작성</div>

          {inputFields.map((field) => {
            if (field.type === "date-parts") {
              return (
                <div key={field.id} className="space-y-1.5">
                  <label className="text-[11px] text-muted-foreground tracking-widest uppercase">
                    날짜 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="2026"
                      min={2000}
                      max={2099}
                      value={dateParts.year}
                      onChange={(e) => updateDatePart("year", e.target.value)}
                      className="w-24 h-10 border border-border px-3 text-sm bg-background outline-none focus:border-sage-ink text-center"
                    />
                    <span className="text-sm text-muted-foreground">년</span>
                    <input
                      type="number"
                      placeholder="1"
                      min={1}
                      max={12}
                      value={dateParts.month}
                      onChange={(e) => updateDatePart("month", e.target.value)}
                      className="w-16 h-10 border border-border px-3 text-sm bg-background outline-none focus:border-sage-ink text-center"
                    />
                    <span className="text-sm text-muted-foreground">월</span>
                    <input
                      type="number"
                      placeholder="1"
                      min={1}
                      max={31}
                      value={dateParts.day}
                      onChange={(e) => updateDatePart("day", e.target.value)}
                      className="w-16 h-10 border border-border px-3 text-sm bg-background outline-none focus:border-sage-ink text-center"
                    />
                    <span className="text-sm text-muted-foreground">일</span>
                  </div>
                </div>
              );
            }

            return (
              <div key={field.id} className="space-y-1.5">
                <label className="text-[11px] text-muted-foreground tracking-widest uppercase">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={fieldValues[field.id] ?? ""}
                    onChange={(e) => setFieldValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
                    placeholder={
                      field.id === "f_name" ? "실명을 입력하세요" :
                      field.id === "f_address" ? "도로명 주소를 입력하세요" :
                      field.id === "f_bank" ? "예: 신한은행" :
                      field.id === "f_account" ? "예: 110-123-456789" : ""
                    }
                    className="flex-1 h-10 border border-border px-3 text-sm bg-background outline-none focus:border-sage-ink"
                  />
                  {field.variant === "name-with-seal" && (
                    <span className="text-sm text-muted-foreground flex-shrink-0">(인)</span>
                  )}
                </div>
              </div>
            );
          })}

          {/* 서명 패드 */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-muted-foreground tracking-widest uppercase">
              서명 <span className="text-red-500">*</span>
            </label>
            <SignaturePad onChange={setSignatureDataUrl} />
          </div>

          {/* 동의 */}
          <div className="border border-border p-4 flex items-start gap-3">
            <button
              onClick={() => setAgreed((prev) => !prev)}
              className={cn(
                "mt-0.5 w-4 h-4 border flex items-center justify-center flex-shrink-0",
                agreed ? "border-sage-ink bg-sage-ink" : "border-border"
              )}
            >
              {agreed && <span className="text-background text-[10px] font-bold">✓</span>}
            </button>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              본인은 위 계약서의 내용을 충분히 숙지하였으며, 이에 동의하여 전자 서명으로 계약을 체결합니다.
              전자 서명은 자필 서명과 동일한 법적 효력을 가집니다.
            </p>
          </div>

          <Button className="w-full" disabled={!canSubmit} onClick={handleSubmit}>
            계약 체결
          </Button>
          <p className="text-[10px] text-center text-muted-foreground">
            서명 후에는 취소 및 수정이 불가능합니다. 내용을 충분히 확인 후 체결하세요.
          </p>
        </section>
      )}

      {/* 서명 완료 배너 */}
      {isSigned && (
        <div className="border border-sage-ink/20 bg-sage-soft/10 px-5 py-4 flex items-center gap-3">
          <CheckCircle2 size={16} className="text-sage-ink flex-shrink-0" strokeWidth={1.5} />
          <div className="text-sm">
            <span className="font-medium text-sage-ink">서명 완료</span>
            <span className="text-muted-foreground ml-2">{localContract.signedAt} 체결</span>
          </div>
        </div>
      )}
    </div>
  );
}
