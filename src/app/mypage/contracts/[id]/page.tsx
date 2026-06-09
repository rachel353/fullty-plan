"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [localContract, setLocalContract] = useState<Contract | null>(() => {
    return contracts.find((c) => c.id === params.id && c.userId === MY_USER_ID) ?? null;
  });

  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!localContract) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        계약서를 찾을 수 없습니다.
        <Link href="/mypage/contracts" className="block mt-3 text-sage-ink underline">
          목록으로
        </Link>
      </div>
    );
  }

  const template = contractTemplates.find((t) => t.id === localContract.templateId);
  const body = CONTRACT_BODY[localContract.templateId] ?? [];
  const isPending = localContract.status === "대기 중";
  const isSigned = localContract.status === "서명 완료";

  const textFields = template?.fields.filter((f) => f.type !== "signature") ?? [];
  const allTextFilled = textFields.every((f) => !!fieldValues[f.id]?.trim());
  const canSubmit = allTextFilled && !!signatureDataUrl && agreed;

  function handleSubmit() {
    if (!template) return;
    const today = new Date().toISOString().slice(0, 10);
    const values: Record<string, string> = { ...fieldValues, f3: "__signed__" };
    setLocalContract((prev) =>
      prev
        ? { ...prev, status: "서명 완료", signedAt: today, signedValues: values }
        : prev
    );
    setSubmitted(true);
  }

  // 서명 완료 후 성공 화면
  if (submitted) {
    return (
      <div className="py-20 text-center space-y-5">
        <CheckCircle2 size={48} className="text-sage-ink mx-auto" strokeWidth={1.5} />
        <div>
          <div className="text-xl font-bold text-sage-ink">계약이 체결되었습니다</div>
          <p className="text-sm text-muted-foreground mt-2">
            {localContract.templateName} 서명이 완료되었습니다.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Link href="/mypage/contracts">
            <Button variant="outline" size="sm">목록으로</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="border-b border-border pb-4">
        <Link
          href="/mypage/contracts"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors"
        >
          <ChevronLeft size={13} /> 계약서 목록
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">{localContract.templateName}</h2>
            {localContract.note && (
              <p className="text-sm text-muted-foreground mt-1">{localContract.note}</p>
            )}
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
        <div className="border border-border bg-white p-8 md:p-10 space-y-5 text-sm leading-loose text-gray-800 max-h-[60vh] overflow-y-auto">
          <div className="text-center space-y-1 pb-4 border-b border-gray-200">
            <div className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">Fullty Inc.</div>
            <div className="text-lg font-bold tracking-tight font-serif">{localContract.templateName}</div>
          </div>
          <div className="space-y-4 font-serif">
            {body.map((paragraph, i) => (
              <p key={i} className="leading-relaxed">{paragraph}</p>
            ))}
          </div>
          {/* 서명 영역 미리보기 */}
          {template && (
            <div className="pt-6 border-t border-gray-200 space-y-5">
              {template.fields.map((field) => {
                const signedVal = isSigned ? localContract.signedValues?.[field.id] : null;
                return (
                  <div key={field.id} className="flex items-end gap-4">
                    <span className="text-xs text-gray-500 w-28 flex-shrink-0">{field.label}</span>
                    {field.type === "signature" ? (
                      <div className="flex-1 border-b border-dashed border-gray-300 h-8 flex items-center">
                        {signedVal === "__signed__" && (
                          <span className="text-sage-ink text-sm italic font-medium">✓ 서명 완료</span>
                        )}
                      </div>
                    ) : (
                      <div className="flex-1 border-b border-gray-300 pb-0.5 text-sm min-h-[28px] flex items-end">
                        {signedVal ?? <span className="text-gray-300 text-xs">&nbsp;</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 서명 대기 중 → 입력 폼 */}
      {isPending && template && (
        <section className="space-y-6">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">서명 작성</div>

          {/* 텍스트/날짜 필드 */}
          {textFields.map((field) => (
            <div key={field.id} className="space-y-1.5">
              <label className="text-[11px] text-muted-foreground tracking-widest uppercase">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={field.type === "date" ? "date" : "text"}
                value={fieldValues[field.id] ?? ""}
                onChange={(e) =>
                  setFieldValues((prev) => ({ ...prev, [field.id]: e.target.value }))
                }
                placeholder={field.type === "text" ? "실명을 입력하세요" : ""}
                className="w-full h-10 border border-border px-3 text-sm bg-background outline-none focus:border-sage-ink"
              />
            </div>
          ))}

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

          <Button
            className="w-full"
            disabled={!canSubmit}
            onClick={handleSubmit}
          >
            계약 체결
          </Button>

          <p className="text-[10px] text-center text-muted-foreground">
            서명 후에는 취소 및 수정이 불가능합니다. 내용을 충분히 확인 후 체결하세요.
          </p>
        </section>
      )}

      {/* 서명 완료 → 완료 메시지 */}
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
