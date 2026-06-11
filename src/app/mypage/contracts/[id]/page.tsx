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

const MY_MEMBER_ID = "m001";

const STATUS_VARIANT: Record<ContractStatus, "default" | "outline" | "muted" | "sage"> = {
  "작성중": "muted",
  "서명 대기": "outline",
  "서명 완료": "sage",
  "만료": "muted",
  "취소됨": "muted",
};

export default function MypageContractDetailPage({ params }: { params: { id: string } }) {
  const [localContract, setLocalContract] = useState<Contract | null>(() =>
    contracts.find((c) => c.id === params.id && c.memberId === MY_MEMBER_ID) ?? null
  );
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
  const isPending = localContract.status === "서명 대기";
  const isSigned = localContract.status === "서명 완료";
  const useSitePad = localContract.signatureMethod === "사이트 내 서명 화면으로 연결";
  const canSubmit = !!signatureDataUrl && agreed;

  function handleSubmit() {
    const today = new Date().toISOString().slice(0, 10);
    setLocalContract((prev) => (prev ? { ...prev, status: "서명 완료", completedAt: today } : prev));
    setSubmitted(true);
  }

  function handleModusignSign() {
    const today = new Date().toISOString().slice(0, 10);
    setLocalContract((prev) => (prev ? { ...prev, status: "서명 완료", completedAt: today } : prev));
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
            {localContract.messageToSigner && <p className="text-sm text-muted-foreground mt-1">{localContract.messageToSigner}</p>}
          </div>
          <Badge variant={STATUS_VARIANT[localContract.status]}>{localContract.status}</Badge>
        </div>
        <div className="flex gap-4 mt-3 text-[11px] text-muted-foreground">
          {localContract.sentAt && <span>발송일 {localContract.sentAt}</span>}
          {isPending && <span>서명 만료일 {localContract.signatureExpiry}</span>}
          {localContract.completedAt && <span>서명 완료 {localContract.completedAt}</span>}
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
          {template && (
            <div className="pt-6 mt-4 border-t border-gray-200 space-y-5 font-sans">
              {template.fields.map((field) => (
                <div key={field.id} className="flex items-end gap-3">
                  <span className="text-xs text-gray-500 w-24 flex-shrink-0 tracking-wider">{field.label}</span>
                  <div className="flex-1 border-b border-gray-300 pb-1 text-sm flex items-center min-h-[28px]">
                    <span>{localContract.values[field.id] || <span className="text-gray-300">&nbsp;</span>}</span>
                  </div>
                </div>
              ))}
              <div className="flex items-end gap-3">
                <span className="text-xs text-gray-500 w-24 flex-shrink-0 tracking-wider">서명 ({template.signerRoleName})</span>
                <div className="flex-1 border-b border-dashed border-gray-300 h-8 flex items-center">
                  {isSigned && <span className="text-sage-ink text-sm italic font-medium">✓ 서명 완료</span>}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 서명 (서명 대기일 때만) */}
      {isPending && (
        <section className="space-y-5">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">서명</div>
          {useSitePad ? (
            <>
              <div className="space-y-1.5">
                <label className="text-[11px] text-muted-foreground tracking-widest uppercase">
                  서명 <span className="text-red-500">*</span>
                </label>
                <SignaturePad onChange={setSignatureDataUrl} />
              </div>
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
            </>
          ) : (
            <>
              <p className="text-[11px] text-muted-foreground leading-relaxed border border-border bg-muted/30 px-4 py-3">
                이 계약서는 모두싸인을 통해 전자서명을 진행합니다. 아래 버튼을 클릭하면 모두싸인 서명 페이지로 이동합니다.
              </p>
              <Button className="w-full" onClick={handleModusignSign}>
                모두싸인에서 서명하기
              </Button>
            </>
          )}
        </section>
      )}

      {/* 서명 완료 배너 */}
      {isSigned && (
        <div className="border border-sage-ink/20 bg-sage-soft/10 px-5 py-4 flex items-center gap-3">
          <CheckCircle2 size={16} className="text-sage-ink flex-shrink-0" strokeWidth={1.5} />
          <div className="text-sm">
            <span className="font-medium text-sage-ink">서명 완료</span>
            <span className="text-muted-foreground ml-2">{localContract.completedAt} 체결</span>
          </div>
        </div>
      )}
    </div>
  );
}
