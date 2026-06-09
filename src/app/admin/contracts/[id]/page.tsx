import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { contracts, contractTemplates, CONTRACT_BODY, type ContractStatus } from "@/lib/contracts";

const STATUS_VARIANT: Record<ContractStatus, "default" | "outline" | "muted" | "sage"> = {
  "대기 중": "outline",
  "서명 완료": "sage",
  "만료": "muted",
  "취소됨": "muted",
};

const FIELD_TYPE_LABEL: Record<string, string> = {
  text: "텍스트",
  "date-parts": "날짜",
  signature: "서명",
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
            <h2 className="text-xl font-bold">{contract.templateName}</h2>
            {contract.note && (
              <p className="text-sm text-muted-foreground mt-1">{contract.note}</p>
            )}
          </div>
          <Badge variant={STATUS_VARIANT[contract.status]}>{contract.status}</Badge>
        </div>
      </div>

      {/* 계약 메타 */}
      <section className="grid grid-cols-2 gap-3">
        <InfoRow label="계약 번호" value={contract.id} mono />
        <InfoRow label="수신 회원" value={`${contract.userName} (${contract.userEmail})`} />
        <InfoRow label="발송일" value={contract.sentAt} />
        <InfoRow label="만료일" value={contract.expiresAt} />
        {contract.signedAt && <InfoRow label="서명 완료일" value={contract.signedAt} />}
        {template && <InfoRow label="사용 템플릿" value={template.name} />}
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
          {/* 서명 필드 */}
          {template && (
            <div className="pt-6 border-t border-gray-200 space-y-5 font-sans">
              {template.fields.map((field) => {
                const value = contract.signedValues?.[field.id];
                const label = field.docLabel ?? field.label;

                if (field.type === "signature") {
                  return (
                    <div key={field.id} className="flex items-end gap-4">
                      <span className="text-xs text-gray-500 w-20 flex-shrink-0 tracking-wider">{label}</span>
                      <div className="flex-1 border-b border-dashed border-gray-300 h-8 flex items-center">
                        {isSigned && <span className="text-sage-ink text-sm font-medium italic">✓ 전자 서명 완료</span>}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={field.id} className="flex items-end gap-4">
                    <span className="text-xs text-gray-500 w-20 flex-shrink-0 tracking-wider">{label}</span>
                    <div className="flex-1 border-b border-gray-300 pb-1 text-sm flex items-center justify-between min-h-[28px]">
                      <span>{value ?? <span className="text-gray-300">—</span>}</span>
                      {field.variant === "name-with-seal" && (
                        <span className="text-gray-400 text-xs ml-2">(인)</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 서명 완료 시 입력값 */}
      {isSigned && contract.signedValues && template && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">서명 입력값</div>
          <div className="border border-border divide-y divide-border">
            {template.fields.map((field) => {
              const value = contract.signedValues![field.id];
              return (
                <div key={field.id} className="px-4 py-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium">{field.label}</span>
                    <span className="ml-2 text-[10px] text-muted-foreground">({FIELD_TYPE_LABEL[field.type]})</span>
                  </div>
                  <div className="text-sm text-sage-ink font-medium">
                    {value === "__signed__" ? "✓ 서명 완료" : value}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
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
