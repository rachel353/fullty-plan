"use client";

import { useState } from "react";
import Link from "next/link";
import { X, FileText } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  contracts as INITIAL_CONTRACTS,
  contractTemplates as INITIAL_TEMPLATES,
  type Contract,
  type ContractTemplate,
  type ContractStatus,
} from "@/lib/contracts";

type Tab = "계약 현황" | "템플릿 관리";
type StatusFilter = "전체" | ContractStatus;

const STATUS_VARIANT: Record<ContractStatus, "default" | "outline" | "muted" | "sage"> = {
  "대기 중": "outline",
  "서명 완료": "sage",
  "만료": "muted",
  "취소됨": "muted",
};

const USERS = [
  { id: "u001", name: "김풀티", email: "kim@example.com" },
  { id: "u002", name: "이라운지", email: "lounge@example.com" },
  { id: "u003", name: "박빈티지", email: "vintage@example.com" },
  { id: "u004", name: "최가구", email: "furniture@example.com" },
];

export default function AdminContractsPage() {
  const [tab, setTab] = useState<Tab>("계약 현황");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("전체");
  const [contracts, setContracts] = useState<Contract[]>(INITIAL_CONTRACTS);
  const [templates, setTemplates] = useState<ContractTemplate[]>(INITIAL_TEMPLATES);

  // 계약 발송 모달
  const [sendOpen, setSendOpen] = useState(false);
  const [sendUserId, setSendUserId] = useState(USERS[0].id);
  const [sendTemplateId, setSendTemplateId] = useState(INITIAL_TEMPLATES[0].id);
  const [sendExpiry, setSendExpiry] = useState("");
  const [sendNote, setSendNote] = useState("");

  // 템플릿 등록 모달
  const [tmplOpen, setTmplOpen] = useState(false);
  const [tmplName, setTmplName] = useState("");
  const [tmplDesc, setTmplDesc] = useState("");
  const [tmplFile, setTmplFile] = useState("");

  // 취소 확인 모달
  const [cancelTarget, setCancelTarget] = useState<Contract | null>(null);

  // 템플릿 삭제 확인 모달
  const [deleteTmplTarget, setDeleteTmplTarget] = useState<ContractTemplate | null>(null);

  const filtered = contracts.filter(
    (c) => statusFilter === "전체" || c.status === statusFilter
  );

  const pendingCount = contracts.filter((c) => c.status === "대기 중").length;
  const signedCount = contracts.filter((c) => c.status === "서명 완료").length;
  const expiredCount = contracts.filter(
    (c) => c.status === "만료" || c.status === "취소됨"
  ).length;

  function handleSend() {
    const user = USERS.find((u) => u.id === sendUserId)!;
    const template = templates.find((t) => t.id === sendTemplateId)!;
    const newContract: Contract = {
      id: `ct${Date.now()}`,
      templateId: template.id,
      templateName: template.name,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      status: "대기 중",
      sentAt: new Date().toISOString().slice(0, 10),
      expiresAt: sendExpiry,
      note: sendNote,
    };
    setContracts((prev) => [newContract, ...prev]);
    setSendOpen(false);
    setSendNote("");
    setSendExpiry("");
  }

  function handleAddTemplate() {
    const t: ContractTemplate = {
      id: `tmpl${Date.now()}`,
      name: tmplName,
      fileName: tmplFile || `${tmplName.replace(/\s/g, "_")}.pdf`,
      description: tmplDesc,
      fields: [
        { id: "f_date",    label: "날짜",   docLabel: "날    짜", type: "date-parts" as const, required: true },
        { id: "f_name",    label: "고객명", docLabel: "고 객 명", type: "text" as const, variant: "name-with-seal" as const, required: true },
        { id: "f_address", label: "주소",   docLabel: "주    소", type: "text" as const, required: true },
        { id: "f_bank",    label: "은행명", docLabel: "은 행 명", type: "text" as const, required: true },
        { id: "f_account", label: "계좌번호", docLabel: "계좌번호", type: "text" as const, required: true },
        { id: "f_sig",     label: "서명",   docLabel: "서    명", type: "signature" as const, required: true },
      ],
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setTemplates((prev) => [...prev, t]);
    setTmplOpen(false);
    setTmplName("");
    setTmplDesc("");
    setTmplFile("");
  }

  function handleDeleteTemplate(id: string) {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    setDeleteTmplTarget(null);
  }

  function handleCancel(id: string) {
    setContracts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "취소됨" } : c))
    );
    setCancelTarget(null);
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">계약 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">
            PDF 계약서 발송 · 전자 서명 수령 · 계약 이력 관리
          </p>
        </div>
        <Button size="sm" onClick={() => setSendOpen(true)}>+ 계약 발송</Button>
      </div>

      {/* 요약 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="전체 계약" value={`${contracts.length}건`} />
        <Stat label="대기 중" value={`${pendingCount}건`} highlight />
        <Stat label="서명 완료" value={`${signedCount}건`} />
        <Stat label="만료 / 취소" value={`${expiredCount}건`} />
      </div>

      {/* 탭 */}
      <div className="flex items-center border-b border-border">
        {(["계약 현황", "템플릿 관리"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
              tab === t
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 계약 현황 탭 */}
      {tab === "계약 현황" && (
        <>
          <div className="flex gap-2">
            {(["전체", "대기 중", "서명 완료", "만료", "취소됨"] as StatusFilter[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  "px-3 h-8 text-xs border transition-colors",
                  statusFilter === s
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:bg-muted"
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted">
                <tr className="text-left text-xs font-medium text-muted-foreground">
                  <th className="px-4 py-3">번호</th>
                  <th className="px-4 py-3">계약서</th>
                  <th className="px-4 py-3">회원</th>
                  <th className="px-4 py-3">발송일</th>
                  <th className="px-4 py-3">만료일</th>
                  <th className="px-4 py-3">서명일</th>
                  <th className="px-4 py-3">상태</th>
                  <th className="px-4 py-3 text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-16 text-center text-[11px] text-muted-foreground">
                      해당하는 계약이 없습니다.
                    </td>
                  </tr>
                ) : filtered.map((c) => (
                  <tr
                    key={c.id}
                    className={cn(
                      "hover:bg-muted/30 transition-colors",
                      (c.status === "만료" || c.status === "취소됨") && "opacity-50"
                    )}
                  >
                    <td className="px-4 py-3 text-[11px] text-muted-foreground">{c.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-sage-ink">{c.templateName}</div>
                      {c.note && <div className="text-[10px] text-muted-foreground mt-0.5">{c.note}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{c.userName}</div>
                      <div className="text-[10px] text-muted-foreground">{c.userEmail}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.sentAt}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.expiresAt}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.signedAt ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Badge variant={STATUS_VARIANT[c.status]}>{c.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link href={`/admin/contracts/${c.id}`}>
                          <Button size="sm" variant="outline">보기</Button>
                        </Link>
                        {c.status === "대기 중" && (
                          <button
                            onClick={() => setCancelTarget(c)}
                            className="p-1.5 text-muted-foreground hover:text-foreground"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* 템플릿 관리 탭 */}
      {tab === "템플릿 관리" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={() => setTmplOpen(true)}>
              + 새 템플릿 등록
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((t) => {
              const inUse = contracts.filter(
                (c) => c.templateId === t.id && c.status === "대기 중"
              ).length;
              return (
                <div key={t.id} className="border border-border p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText size={14} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="font-medium text-sage-ink truncate">{t.name}</div>
                        <div className="text-[10px] font-mono text-muted-foreground mt-0.5">{t.fileName}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] text-muted-foreground">{t.createdAt}</span>
                      <button
                        onClick={() => setDeleteTmplTarget(t)}
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                        title="템플릿 삭제"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{t.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.fields.map((f) => (
                      <span
                        key={f.id}
                        className="text-[10px] px-2 py-0.5 border border-border bg-muted text-muted-foreground"
                      >
                        {f.label} ({f.type})
                      </span>
                    ))}
                  </div>
                  {inUse > 0 && (
                    <p className="text-[10px] text-amber-600">
                      현재 서명 대기 중인 계약 {inUse}건에서 사용 중
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 계약 발송 모달 */}
      {sendOpen && (
        <Modal title="계약 발송" onClose={() => setSendOpen(false)}>
          <div className="space-y-4">
            <ModalField label="수신 회원">
              <select
                value={sendUserId}
                onChange={(e) => setSendUserId(e.target.value)}
                className="w-full h-9 border border-border px-3 text-xs bg-background outline-none focus:border-sage-ink"
              >
                {USERS.map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
            </ModalField>
            <ModalField label="계약 템플릿">
              <select
                value={sendTemplateId}
                onChange={(e) => setSendTemplateId(e.target.value)}
                className="w-full h-9 border border-border px-3 text-xs bg-background outline-none focus:border-sage-ink"
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </ModalField>
            <ModalField label="서명 만료일">
              <input
                type="date"
                value={sendExpiry}
                onChange={(e) => setSendExpiry(e.target.value)}
                className="w-full h-9 border border-border px-3 text-xs bg-background outline-none focus:border-sage-ink"
              />
            </ModalField>
            <ModalField label="메모 (선택)">
              <input
                value={sendNote}
                onChange={(e) => setSendNote(e.target.value)}
                placeholder="예: Aeron 렌탈 계약"
                className="w-full h-9 border border-border px-3 text-xs bg-background outline-none focus:border-sage-ink"
              />
            </ModalField>
          </div>
          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setSendOpen(false)}>취소</Button>
            <Button className="flex-1" disabled={!sendExpiry} onClick={handleSend}>발송</Button>
          </div>
        </Modal>
      )}

      {/* 템플릿 등록 모달 */}
      {tmplOpen && (
        <Modal title="새 템플릿 등록" onClose={() => setTmplOpen(false)}>
          <div className="space-y-4">
            <ModalField label="템플릿 이름">
              <input
                value={tmplName}
                onChange={(e) => setTmplName(e.target.value)}
                placeholder="예: 렌탈 서비스 이용 약정서"
                className="w-full h-9 border border-border px-3 text-xs bg-background outline-none focus:border-sage-ink"
              />
            </ModalField>
            <ModalField label="설명">
              <input
                value={tmplDesc}
                onChange={(e) => setTmplDesc(e.target.value)}
                placeholder="간단한 설명을 입력하세요"
                className="w-full h-9 border border-border px-3 text-xs bg-background outline-none focus:border-sage-ink"
              />
            </ModalField>
            <ModalField label="PDF 파일 업로드">
              <div className="border border-dashed border-border p-6 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setTmplFile(e.target.files?.[0]?.name ?? "")}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  {tmplFile ? (
                    <span className="text-xs font-mono text-sage-ink">{tmplFile}</span>
                  ) : (
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">PDF 파일을 선택하세요</div>
                      <div className="text-[10px] text-muted-foreground/60">클릭하여 업로드</div>
                    </div>
                  )}
                </label>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5">
                업로드된 PDF 위에 성명·날짜·서명 입력 필드가 자동으로 구성됩니다.
              </p>
            </ModalField>
          </div>
          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setTmplOpen(false)}>취소</Button>
            <Button className="flex-1" disabled={!tmplName} onClick={handleAddTemplate}>등록</Button>
          </div>
        </Modal>
      )}

      {/* 계약 취소 확인 모달 */}
      {cancelTarget && (
        <Modal title="계약 취소" onClose={() => setCancelTarget(null)}>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">{cancelTarget.userName}</span>에게 발송된
            {" "}<span className="font-semibold text-foreground">"{cancelTarget.templateName}"</span> 계약을 취소합니다.
            취소된 계약은 상대방이 서명할 수 없습니다.
          </p>
          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setCancelTarget(null)}>돌아가기</Button>
            <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={() => handleCancel(cancelTarget.id)}>취소 확정</Button>
          </div>
        </Modal>
      )}

      {/* 템플릿 삭제 확인 모달 */}
      {deleteTmplTarget && (
        <Modal title="템플릿 삭제" onClose={() => setDeleteTmplTarget(null)}>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">"{deleteTmplTarget.name}"</span> 템플릿을 삭제합니다.
            삭제 후 이 템플릿으로 새 계약을 발송할 수 없습니다.
          </p>
          {contracts.some((c) => c.templateId === deleteTmplTarget.id && c.status === "대기 중") && (
            <p className="text-[11px] text-amber-600 mt-3 border border-amber-200 bg-amber-50 px-3 py-2">
              현재 서명 대기 중인 계약이 있습니다. 삭제해도 기존 발송된 계약은 유지됩니다.
            </p>
          )}
          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setDeleteTmplTarget(null)}>취소</Button>
            <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={() => handleDeleteTemplate(deleteTmplTarget.id)}>삭제</Button>
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
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
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
