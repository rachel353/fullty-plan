import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { contracts, contractTemplates, CONTRACT_BODY, type ContractStatus } from "@/lib/contracts";

const STATUS_VARIANT: Record<ContractStatus, "default" | "outline" | "muted" | "sage"> = {
  "작성중": "muted",
  "서명 대기": "outline",
  "서명 완료": "sage",
  "만료": "muted",
  "취소됨": "muted",
};

export default function AdminContractDetailPage({ params }: { params: { id: string } }) {
  const contract = contracts.find((c) => c.id === params.id);
  if (!contract) notFound();

  const template = contractTemplates.find((t) => t.id === contract.templateId);
  const body = CONTRACT_BODY[contract.templateId] ?? [];
  const isSigned = contract.status === "서명 완료";

  return (
    <div className="space-y-8 max-w-2xl">
      {/* 헤더 */}
      <div className="border-b border-border pb-4">
        <Link
          href="/admin/contracts"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors"
        >
          <ChevronLeft size={13} /> 계약 관리
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">{contract.name}</h2>
            {contract.internalMemo && (
              <p className="text-sm text-muted-foreground mt-1">{contract.internalMemo}</p>
            )}
          </div>
          <Badge variant={STATUS_VARIANT[contract.status]}>{contract.status}</Badge>
        </div>
      </div>

      {/* 계약 메타 */}
      <section className="grid grid-cols-2 gap-3">
        <InfoRow label="계약 번호" value={contract.id} mono />
        <InfoRow label="계약 유형" value={contract.contractType} />
        <InfoRow label="수신 회원" value={`${contract.memberName} (${contract.memberEmail})`} />
        <InfoRow label="연락처" value={contract.memberPhone} />
        <InfoRow label="연결 상품·주문" value={`${contract.linkedProductName} · ${contract.linkedRefId}`} />
        <InfoRow label="계약 템플릿" value={contract.templateName} />
        <InfoRow label="발송일" value={contract.sentAt ?? "-"} />
        <InfoRow label="완료일" value={contract.completedAt ?? "-"} />
        <InfoRow label="서명 만료일" value={contract.signatureExpiry || "-"} />
      </section>

      {/* 메시지 / 메모 */}
      <section className="grid grid-cols-2 gap-3">
        <InfoRow label="서명자에게 보낸 메시지" value={contract.messageToSigner || "-"} />
        <InfoRow label="내부 메모" value={contract.internalMemo || "-"} />
      </section>

      {/* 계약서 미리보기 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">계약서 내용</div>
        <div className="border border-border bg-white p-8 space-y-5 font-serif text-sm leading-loose text-gray-800">
          <div className="text-center space-y-1 pb-4 border-b border-gray-200">
            <div className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">Fullty Inc.</div>
            <div className="text-lg font-bold tracking-tight">{contract.templateName}</div>
          </div>
          {body.map((paragraph, i) => (
            <p key={i} className="leading-loose">{paragraph}</p>
          ))}
          {/* 계약 필드 */}
          {template && (
            <div className="pt-6 border-t border-gray-200 space-y-5 font-sans">
              {template.fields.map((field) => (
                <div key={field.id} className="flex items-end gap-4">
                  <span className="text-xs text-gray-500 w-24 flex-shrink-0 tracking-wider">{field.label}</span>
                  <div className="flex-1 border-b border-gray-300 pb-1 text-sm min-h-[28px] flex items-center">
                    <span>{contract.values[field.id] || <span className="text-gray-300">—</span>}</span>
                  </div>
                </div>
              ))}
              <div className="flex items-end gap-4">
                <span className="text-xs text-gray-500 w-24 flex-shrink-0 tracking-wider">
                  서명 ({template.signerRoleName})
                </span>
                <div className="flex-1 border-b border-dashed border-gray-300 h-8 flex items-center">
                  {isSigned && <span className="text-sage-ink text-sm font-medium italic">✓ 전자 서명 완료</span>}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 입력된 계약 정보 */}
      {template && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">계약 정보 입력값</div>
          <div className="border border-border divide-y divide-border">
            {template.fields.map((field) => (
              <div key={field.id} className="px-4 py-3 flex items-center justify-between gap-4">
                <span className="text-xs font-medium flex-shrink-0">{field.label}</span>
                <span className="text-sm text-sage-ink font-medium text-right">{contract.values[field.id] || "-"}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 서명 완료 배너 */}
      {isSigned && (
        <div className="border border-sage-ink/20 bg-sage-soft/10 px-5 py-4 flex items-center gap-3">
          <CheckCircle2 size={16} className="text-sage-ink flex-shrink-0" strokeWidth={1.5} />
          <div className="text-sm">
            <span className="font-medium text-sage-ink">서명 완료</span>
            <span className="text-muted-foreground ml-2">{contract.completedAt} 체결</span>
          </div>
        </div>
      )}

      <div className="border-t border-border pt-6">
        <Link href="/admin/contracts">
          <button className="text-xs text-muted-foreground hover:text-sage-ink transition-colors">
            ← 목록으로 돌아가기
          </button>
        </Link>
      </div>
    </div>
  );
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="border border-border px-4 py-3">
      <div className="text-[10px] text-muted-foreground mb-1">{label}</div>
      <div className={mono ? "text-xs font-mono text-sage-ink" : "text-sm font-medium"}>{value}</div>
    </div>
  );
}
