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
  CONTRACT_MEMBERS,
  LINKABLE_REFS,
  CONTRACT_BODY,
  type Contract,
  type ContractTemplate,
  type ContractStatus,
  type ContractType,
  type FieldMapping,
  type ContractField,
} from "@/lib/contracts";

type Tab = "계약 현황" | "템플릿 관리";
type StatusFilter = "전체" | ContractStatus;

const STATUS_VARIANT: Record<ContractStatus, "default" | "outline" | "muted" | "sage"> = {
  "작성중": "muted",
  "서명 대기": "outline",
  "서명 완료": "sage",
  "만료": "muted",
  "취소됨": "muted",
};

const CONTRACT_TYPES: ContractType[] = ["렌탈", "위탁", "매입"];

const fieldClass = "w-full h-9 border border-border px-3 text-xs bg-background outline-none focus:border-sage-ink";
const textareaClass = "w-full border border-border px-3 py-2 text-xs bg-background outline-none focus:border-sage-ink resize-none";

const EXAMPLE_MAPPINGS: FieldMapping[] = [
  { docField: "계약자명", modusignKey: "{member_name}", ourData: "회원 이름", required: true },
  { docField: "주소", modusignKey: "{address}", ourData: "회원 주소", required: true },
  { docField: "상품명", modusignKey: "{product_name}", ourData: "상품명", required: true },
  { docField: "렌탈 시작일", modusignKey: "{rental_start_date}", ourData: "렌탈 시작일", required: true },
  { docField: "렌탈 종료일", modusignKey: "{rental_end_date}", ourData: "렌탈 종료일", required: true },
  { docField: "서명", modusignKey: "{signature}", ourData: "서명 필드", required: true },
];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function addDays(dateStr: string, days: number) {
  const d = dateStr ? new Date(dateStr) : new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function buildDefaultValues(
  template: ContractTemplate | undefined,
  member: { name: string },
  productName?: string
): Record<string, string> {
  if (!template) return {};
  const values: Record<string, string> = {};
  for (const f of template.fields) {
    if (f.id === "contract_name") values[f.id] = `${template.name}_${member.name}`;
    else if (f.id === "member_name") values[f.id] = member.name;
    else if (f.id === "product_name") values[f.id] = productName ?? "";
    else values[f.id] = "";
  }
  return values;
}

function fieldsFromMappings(mappings: FieldMapping[]): ContractField[] {
  return mappings
    .filter((m) => m.modusignKey !== "{signature}" && m.docField.trim() !== "")
    .map((m) => ({
      id: m.modusignKey.replace(/[{}]/g, "") || m.docField,
      label: m.docField,
      type: "text" as const,
      required: m.required,
    }));
}

export default function AdminContractsPage() {
  const [tab, setTab] = useState<Tab>("계약 현황");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("전체");
  const [contracts, setContracts] = useState<Contract[]>(INITIAL_CONTRACTS);
  const [templates, setTemplates] = useState<ContractTemplate[]>(INITIAL_TEMPLATES);
  const [toast, setToast] = useState<string | null>(null);

  // 계약 발송 모달
  const [sendOpen, setSendOpen] = useState(false);
  const [sendStep, setSendStep] = useState<"form" | "preview">("form");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [sendMemberId, setSendMemberId] = useState(CONTRACT_MEMBERS[0].id);
  const [sendProductName, setSendProductName] = useState("");
  const [sendLinkedRefId, setSendLinkedRefId] = useState("");
  const [sendTemplateId, setSendTemplateId] = useState("");
  const [sendValues, setSendValues] = useState<Record<string, string>>({});
  const [sendExpiry, setSendExpiry] = useState("");
  const [sendMessage, setSendMessage] = useState("계약서 내용을 확인하신 후 서명 부탁드립니다.");
  const [sendMemo, setSendMemo] = useState("");

  // 새 템플릿 등록 / 수정 모달
  const [tmplOpen, setTmplOpen] = useState(false);
  const [editingTmplId, setEditingTmplId] = useState<string | null>(null);
  const [tmplName, setTmplName] = useState("");
  const [tmplType, setTmplType] = useState<ContractType>("렌탈");
  const [tmplDesc, setTmplDesc] = useState("");
  const [tmplModusignId, setTmplModusignId] = useState("");
  const [tmplSignerRole, setTmplSignerRole] = useState("");
  const [tmplActive, setTmplActive] = useState(true);
  const [tmplMappings, setTmplMappings] = useState<FieldMapping[]>(EXAMPLE_MAPPINGS);

  // 확인 모달
  const [cancelTarget, setCancelTarget] = useState<Contract | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Contract | null>(null);
  const [deactivateTarget, setDeactivateTarget] = useState<ContractTemplate | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<ContractTemplate | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }

  const filtered = contracts.filter(
    (c) => statusFilter === "전체" || c.status === statusFilter
  );

  const totalCount = contracts.length;
  const pendingCount = contracts.filter((c) => c.status === "서명 대기").length;
  const signedCount = contracts.filter((c) => c.status === "서명 완료").length;
  const expiredCount = contracts.filter(
    (c) => c.status === "만료" || c.status === "취소됨"
  ).length;

  const memberRefs = LINKABLE_REFS.filter((r) => r.memberId === sendMemberId);
  const productOptions = Array.from(new Set(memberRefs.map((r) => r.productName)));
  const refOptions = memberRefs.filter((r) => r.productName === sendProductName);
  const selectedMember = CONTRACT_MEMBERS.find((m) => m.id === sendMemberId) ?? CONTRACT_MEMBERS[0];
  const selectedTemplate = templates.find((t) => t.id === sendTemplateId);

  const requiredFieldsFilled = selectedTemplate
    ? selectedTemplate.fields
        .filter((f) => f.required)
        .every((f) => (sendValues[f.id] ?? "").trim() !== "")
    : false;
  const canProceed = !!selectedTemplate && !!sendExpiry && requiredFieldsFilled;

  // ---- 계약 발송 모달 핸들러 ----

  function openSendModal() {
    setEditingId(null);
    const member = CONTRACT_MEMBERS[0];
    const refs = LINKABLE_REFS.filter((r) => r.memberId === member.id);
    const product = refs[0]?.productName ?? "";
    const ref = refs.find((r) => r.productName === product);
    const tmpl = templates.find((t) => t.active) ?? templates[0];

    setSendMemberId(member.id);
    setSendProductName(product);
    setSendLinkedRefId(ref?.id ?? "");
    setSendTemplateId(tmpl?.id ?? "");
    setSendValues(buildDefaultValues(tmpl, member, ref?.productName));
    setSendExpiry(addDays(todayStr(), 14));
    setSendMessage("계약서 내용을 확인하신 후 서명 부탁드립니다.");
    setSendMemo("");
    setSendStep("form");
    setSendOpen(true);
  }

  function openEditDraft(c: Contract) {
    setEditingId(c.id);
    setSendMemberId(c.memberId);
    setSendProductName(c.linkedProductName);
    setSendLinkedRefId(c.linkedRefId);
    setSendTemplateId(c.templateId);
    setSendValues({ ...c.values });
    setSendExpiry(c.signatureExpiry || addDays(todayStr(), 14));
    setSendMessage(c.messageToSigner);
    setSendMemo(c.internalMemo ?? "");
    setSendStep("form");
    setSendOpen(true);
  }

  function handleMemberChange(memberId: string) {
    const member = CONTRACT_MEMBERS.find((m) => m.id === memberId)!;
    const refs = LINKABLE_REFS.filter((r) => r.memberId === memberId);
    const product = refs[0]?.productName ?? "";
    const ref = refs.find((r) => r.productName === product);
    const tmpl = templates.find((t) => t.id === sendTemplateId);

    setSendMemberId(memberId);
    setSendProductName(product);
    setSendLinkedRefId(ref?.id ?? "");
    setSendValues(buildDefaultValues(tmpl, member, ref?.productName));
  }

  function handleProductChange(productName: string) {
    const refs = LINKABLE_REFS.filter((r) => r.memberId === sendMemberId && r.productName === productName);
    const ref = refs[0];
    setSendProductName(productName);
    setSendLinkedRefId(ref?.id ?? "");
    setSendValues((prev) => ({ ...prev, product_name: ref?.productName ?? productName }));
  }

  function handleTemplateChange(templateId: string) {
    const tmpl = templates.find((t) => t.id === templateId);
    setSendTemplateId(templateId);
    setSendValues(buildDefaultValues(tmpl, selectedMember, sendProductName));
  }

  function handleSend() {
    const member = CONTRACT_MEMBERS.find((m) => m.id === sendMemberId)!;
    const ref = LINKABLE_REFS.find((r) => r.id === sendLinkedRefId);
    const template = templates.find((t) => t.id === sendTemplateId)!;
    const today = todayStr();

    if (editingId) {
      setContracts((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? {
                ...c,
                name: sendValues.contract_name || c.name,
                contractType: template.contractType,
                memberId: member.id,
                memberName: member.name,
                memberEmail: member.email,
                memberPhone: member.phone,
                linkedRefId: ref?.id ?? c.linkedRefId,
                linkedProductName: ref?.productName ?? c.linkedProductName,
                templateId: template.id,
                templateName: template.name,
                status: "서명 대기" as ContractStatus,
                sentAt: today,
                signatureExpiry: sendExpiry,
                messageToSigner: sendMessage,
                internalMemo: sendMemo,
                values: sendValues,
              }
            : c
        )
      );
    } else {
      const newContract: Contract = {
        id: `ct${Date.now()}`,
        name: sendValues.contract_name || `${template.name}_${member.name}`,
        contractType: template.contractType,
        memberId: member.id,
        memberName: member.name,
        memberEmail: member.email,
        memberPhone: member.phone,
        linkedRefId: ref?.id ?? "",
        linkedProductName: ref?.productName ?? "",
        templateId: template.id,
        templateName: template.name,
        status: "서명 대기",
        sentAt: today,
        signatureExpiry: sendExpiry,
        messageToSigner: sendMessage,
        internalMemo: sendMemo,
        values: sendValues,
      };
      setContracts((prev) => [newContract, ...prev]);
    }

    setSendOpen(false);
    showToast("전자서명 요청이 발송되었습니다.");
  }

  // ---- 계약 현황 빠른 작업 ----

  function handleQuickSend(c: Contract) {
    setContracts((prev) =>
      prev.map((x) =>
        x.id === c.id
          ? {
              ...x,
              status: "서명 대기" as ContractStatus,
              sentAt: todayStr(),
              signatureExpiry: x.signatureExpiry || addDays(todayStr(), 14),
            }
          : x
      )
    );
    showToast("전자서명 요청이 발송되었습니다.");
  }

  function handleResend(c: Contract) {
    setContracts((prev) =>
      prev.map((x) =>
        x.id === c.id
          ? {
              ...x,
              status: "서명 대기" as ContractStatus,
              sentAt: todayStr(),
              completedAt: undefined,
              signatureExpiry: addDays(todayStr(), 14),
            }
          : x
      )
    );
    showToast("전자서명 요청이 재발송되었습니다.");
  }

  function handleDownload() {
    showToast("PDF 다운로드를 시작합니다.");
  }

  function handleCancel(id: string) {
    setContracts((prev) => prev.map((c) => (c.id === id ? { ...c, status: "취소됨" } : c)));
    setCancelTarget(null);
    showToast("계약이 취소되었습니다.");
  }

  function handleDelete(id: string) {
    setContracts((prev) => prev.filter((c) => c.id !== id));
    setDeleteTarget(null);
  }

  // ---- 템플릿 관리 핸들러 ----

  function openNewTemplate() {
    setEditingTmplId(null);
    setTmplName("");
    setTmplType("렌탈");
    setTmplDesc("");
    setTmplModusignId("");
    setTmplSignerRole("");
    setTmplActive(true);
    setTmplMappings(EXAMPLE_MAPPINGS.map((m) => ({ ...m })));
    setTmplOpen(true);
  }

  function openEditTemplate(t: ContractTemplate) {
    setEditingTmplId(t.id);
    setTmplName(t.name);
    setTmplType(t.contractType);
    setTmplDesc(t.description);
    setTmplModusignId(t.modusignTemplateId);
    setTmplSignerRole(t.signerRoleName);
    setTmplActive(t.active);
    setTmplMappings(t.fieldMappings.map((m) => ({ ...m })));
    setTmplOpen(true);
  }

  function updateMapping(index: number, key: keyof FieldMapping, value: string | boolean) {
    setTmplMappings((prev) => prev.map((m, i) => (i === index ? { ...m, [key]: value } : m)));
  }

  function addMappingRow() {
    setTmplMappings((prev) => [...prev, { docField: "", modusignKey: "", ourData: "", required: true }]);
  }

  function removeMappingRow(index: number) {
    setTmplMappings((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSaveTemplate() {
    if (editingTmplId) {
      setTemplates((prev) =>
        prev.map((t) =>
          t.id === editingTmplId
            ? {
                ...t,
                name: tmplName,
                contractType: tmplType,
                description: tmplDesc,
                modusignTemplateId: tmplModusignId,
                signerRoleName: tmplSignerRole,
                active: tmplActive,
                fieldMappingStatus: tmplMappings.every((m) => m.docField && m.modusignKey) ? "완료" : "미완료",
                fieldMappings: tmplMappings,
              }
            : t
        )
      );
    } else {
      const newTemplate: ContractTemplate = {
        id: `tmpl${Date.now()}`,
        name: tmplName,
        contractType: tmplType,
        description: tmplDesc,
        integrationType: "모두싸인 템플릿",
        modusignTemplateId: tmplModusignId,
        signerRoleName: tmplSignerRole,
        fieldMappingStatus: tmplMappings.every((m) => m.docField && m.modusignKey) ? "완료" : "미완료",
        active: tmplActive,
        version: "v1.0",
        updatedAt: todayStr(),
        fields: fieldsFromMappings(tmplMappings),
        fieldMappings: tmplMappings,
      };
      setTemplates((prev) => [...prev, newTemplate]);
    }
    setTmplOpen(false);
  }

  function handleToggleActive(id: string) {
    setTemplates((prev) => prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t)));
    setDeactivateTarget(null);
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">계약 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">
            계약서 생성, 모두싸인 전자서명 발송, 서명 상태를 관리합니다.
          </p>
        </div>
        <Button size="sm" onClick={openSendModal}>+ 계약 발송</Button>
      </div>

      {/* 처리 결과 토스트 */}
      {toast && (
        <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-3 text-sm font-medium">
          {toast}
        </div>
      )}

      {/* 요약 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="전체 계약" value={`${totalCount}건`} />
        <Stat label="서명 대기" value={`${pendingCount}건`} highlight />
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
          <div className="flex gap-2 flex-wrap">
            {(["전체", "작성중", "서명 대기", "서명 완료", "만료", "취소됨"] as StatusFilter[]).map((s) => (
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

          <div className="border border-border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted">
                <tr className="text-left text-xs font-medium text-muted-foreground whitespace-nowrap">
                  <th className="px-4 py-3">번호</th>
                  <th className="px-4 py-3">계약명</th>
                  <th className="px-4 py-3">계약 유형</th>
                  <th className="px-4 py-3">수신 회원</th>
                  <th className="px-4 py-3">연결 상품·주문</th>
                  <th className="px-4 py-3">계약 템플릿</th>
                  <th className="px-4 py-3">서명 상태</th>
                  <th className="px-4 py-3">발송일</th>
                  <th className="px-4 py-3">완료일</th>
                  <th className="px-4 py-3 text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-16 text-center text-[11px] text-muted-foreground">
                      해당하는 계약이 없습니다.
                    </td>
                  </tr>
                ) : filtered.map((c) => (
                  <tr
                    key={c.id}
                    className={cn(
                      "hover:bg-muted/30 transition-colors whitespace-nowrap",
                      (c.status === "만료" || c.status === "취소됨") && "opacity-50"
                    )}
                  >
                    <td className="px-4 py-3 text-[11px] text-muted-foreground">{c.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-sage-ink">{c.name}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.contractType}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{c.memberName}</div>
                      <div className="text-[10px] text-muted-foreground">{c.memberEmail}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-mono text-[11px] text-muted-foreground">{c.linkedRefId}</div>
                      <div className="text-[10px] text-muted-foreground">{c.linkedProductName}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.templateName}</td>
                    <td className="px-4 py-3">
                      <Badge variant={STATUS_VARIANT[c.status]}>{c.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.sentAt ?? "-"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.completedAt ?? "-"}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5 flex-wrap">
                        {c.status === "작성중" && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => openEditDraft(c)}>수정</Button>
                            <Button size="sm" onClick={() => handleQuickSend(c)}>발송</Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-300 text-red-500 hover:bg-red-50"
                              onClick={() => setDeleteTarget(c)}
                            >
                              삭제
                            </Button>
                          </>
                        )}
                        {c.status === "서명 대기" && (
                          <>
                            <Link href={`/admin/contracts/${c.id}`}>
                              <Button size="sm" variant="outline">보기</Button>
                            </Link>
                            <Button size="sm" variant="outline" onClick={() => handleResend(c)}>재발송</Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-300 text-red-500 hover:bg-red-50"
                              onClick={() => setCancelTarget(c)}
                            >
                              취소
                            </Button>
                          </>
                        )}
                        {c.status === "서명 완료" && (
                          <>
                            <Link href={`/admin/contracts/${c.id}`}>
                              <Button size="sm" variant="outline">보기</Button>
                            </Link>
                            <Button size="sm" variant="outline" onClick={handleDownload}>PDF 다운로드</Button>
                          </>
                        )}
                        {c.status === "만료" && (
                          <>
                            <Link href={`/admin/contracts/${c.id}`}>
                              <Button size="sm" variant="outline">보기</Button>
                            </Link>
                            <Button size="sm" variant="outline" onClick={() => handleResend(c)}>재발송</Button>
                          </>
                        )}
                        {c.status === "취소됨" && (
                          <Link href={`/admin/contracts/${c.id}`}>
                            <Button size="sm" variant="outline">보기</Button>
                          </Link>
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
            <Button size="sm" variant="outline" onClick={openNewTemplate}>
              + 새 템플릿 등록
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((t) => {
              const inUse = contracts.filter(
                (c) => c.templateId === t.id && c.status === "서명 대기"
              ).length;
              return (
                <div key={t.id} className="border border-border p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText size={14} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="font-medium text-sage-ink truncate">{t.name}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">
                          {t.contractType} · {t.integrationType}
                        </div>
                      </div>
                    </div>
                    <Badge variant={t.active ? "sage" : "muted"}>{t.active ? "사용중" : "비활성"}</Badge>
                  </div>

                  <p className="text-[11px] text-muted-foreground leading-relaxed">{t.description}</p>

                  <div className="grid grid-cols-2 gap-2">
                    <InfoChip label="모두싸인 템플릿 ID" value={t.modusignTemplateId} mono />
                    <InfoChip label="필드 매핑 상태" value={t.fieldMappingStatus} />
                    <InfoChip label="버전" value={t.version} />
                    <InfoChip label="최종 수정일" value={t.updatedAt} />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {t.fieldMappings.map((m, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 border border-border bg-muted text-muted-foreground font-mono"
                      >
                        {m.docField} {m.modusignKey}
                      </span>
                    ))}
                  </div>

                  {inUse > 0 && (
                    <p className="text-[10px] text-amber-600">
                      현재 서명 대기 중인 계약 {inUse}건에서 사용 중
                    </p>
                  )}

                  <div className="flex gap-2 pt-1">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => setPreviewTemplate(t)}>
                      미리보기
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => openEditTemplate(t)}>
                      수정
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => setDeactivateTarget(t)}>
                      {t.active ? "비활성화" : "활성화"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 계약 발송 모달 */}
      {sendOpen && (
        <Modal title="계약 발송" onClose={() => setSendOpen(false)} wide>
          {sendStep === "form" ? (
            <div className="space-y-6">
              {/* A. 수신 회원 */}
              <section className="space-y-2">
                <SectionTitle>A. 수신 회원</SectionTitle>
                <ModalField label="회원 검색/선택">
                  <select
                    value={sendMemberId}
                    onChange={(e) => handleMemberChange(e.target.value)}
                    className={fieldClass}
                  >
                    {CONTRACT_MEMBERS.map((m) => (
                      <option key={m.id} value={m.id}>{m.name} ({m.email})</option>
                    ))}
                  </select>
                </ModalField>
                <div className="border border-border bg-muted/30 px-3 py-2 text-[11px] text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                  <span className="text-foreground font-medium">{selectedMember.name}</span>
                  <span>{selectedMember.email}</span>
                  <span>{selectedMember.phone}</span>
                </div>
              </section>

              {/* B. 연결 대상 */}
              <section className="space-y-2">
                <SectionTitle>B. 연결 대상</SectionTitle>
                <div className="grid grid-cols-2 gap-3">
                  <ModalField label="연결 상품 선택">
                    <select
                      value={sendProductName}
                      onChange={(e) => handleProductChange(e.target.value)}
                      className={fieldClass}
                    >
                      {productOptions.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </ModalField>
                  <ModalField label="연결 주문/렌탈 건 선택">
                    <select
                      value={sendLinkedRefId}
                      onChange={(e) => setSendLinkedRefId(e.target.value)}
                      className={fieldClass}
                    >
                      {refOptions.map((r) => (
                        <option key={r.id} value={r.id}>{r.id}</option>
                      ))}
                    </select>
                  </ModalField>
                </div>
              </section>

              {/* C. 계약 템플릿 */}
              <section className="space-y-2">
                <SectionTitle>C. 계약 템플릿</SectionTitle>
                <ModalField label="계약 템플릿 선택">
                  <select
                    value={sendTemplateId}
                    onChange={(e) => handleTemplateChange(e.target.value)}
                    className={fieldClass}
                  >
                    {templates.filter((t) => t.active).map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </ModalField>
              </section>

              {/* D. 계약 정보 입력 */}
              {selectedTemplate && (
                <section className="space-y-3">
                  <SectionTitle>D. 계약 정보 입력</SectionTitle>
                  <p className="text-[11px] text-muted-foreground">
                    입력한 정보는 모두싸인 템플릿의 계약 필드에 자동 반영됩니다.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedTemplate.fields.map((f) => (
                      <ModalField
                        key={f.id}
                        label={`${f.label}${f.required ? " *" : ""}`}
                        className={f.type === "textarea" ? "col-span-2" : undefined}
                      >
                        {f.type === "textarea" ? (
                          <textarea
                            value={sendValues[f.id] ?? ""}
                            onChange={(e) => setSendValues((prev) => ({ ...prev, [f.id]: e.target.value }))}
                            rows={2}
                            className={textareaClass}
                          />
                        ) : (
                          <input
                            type={f.type === "date" ? "date" : "text"}
                            value={sendValues[f.id] ?? ""}
                            onChange={(e) => setSendValues((prev) => ({ ...prev, [f.id]: e.target.value }))}
                            className={fieldClass}
                          />
                        )}
                      </ModalField>
                    ))}
                  </div>
                </section>
              )}

              {/* E. 서명 설정 */}
              <section className="space-y-2">
                <SectionTitle>E. 서명 설정</SectionTitle>
                <ModalField label="서명 만료일">
                  <input
                    type="date"
                    value={sendExpiry}
                    onChange={(e) => setSendExpiry(e.target.value)}
                    className={cn(fieldClass, "max-w-[200px]")}
                  />
                </ModalField>
                <p className="text-[11px] text-muted-foreground">
                  전자서명은 모두싸인 링크로 발송됩니다. 서명자가 링크에서 서명을 완료하면 계약 현황에 자동 반영됩니다.
                </p>
              </section>

              {/* F. 메시지 / 내부 메모 */}
              <section className="space-y-2">
                <SectionTitle>F. 메시지 / 내부 메모</SectionTitle>
                <ModalField label="서명자에게 보낼 메시지">
                  <textarea
                    value={sendMessage}
                    onChange={(e) => setSendMessage(e.target.value)}
                    rows={2}
                    className={textareaClass}
                  />
                </ModalField>
                <ModalField label="내부 메모">
                  <input
                    value={sendMemo}
                    onChange={(e) => setSendMemo(e.target.value)}
                    placeholder="예: Aeron 렌탈 계약 건"
                    className={fieldClass}
                  />
                </ModalField>
              </section>
            </div>
          ) : (
            <div className="space-y-5">
              <SectionTitle>계약서 PDF 미리보기</SectionTitle>
              <div className="border border-border bg-white p-6 space-y-4 font-serif text-sm leading-loose text-gray-800 max-h-64 overflow-y-auto">
                <div className="text-center space-y-1 pb-3 border-b border-gray-200">
                  <div className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">Fullty Inc.</div>
                  <div className="text-base font-bold tracking-tight">{selectedTemplate?.name}</div>
                </div>
                {(CONTRACT_BODY[sendTemplateId] ?? []).map((p, i) => (
                  <p key={i} className="leading-relaxed">{p}</p>
                ))}
                <div className="pt-4 border-t border-gray-200 space-y-2 font-sans text-xs">
                  {(selectedTemplate?.fields ?? []).map((f) => (
                    <div key={f.id} className="flex justify-between gap-3">
                      <span className="text-gray-500">{f.label}</span>
                      <span className="text-gray-800 font-medium">{sendValues[f.id] || "-"}</span>
                    </div>
                  ))}
                </div>
              </div>

              <SectionTitle>수신 회원 정보</SectionTitle>
              <dl className="border border-border divide-y divide-border text-[11px]">
                <Row label="이름" value={selectedMember.name} />
                <Row label="이메일" value={selectedMember.email} />
                <Row label="연락처" value={selectedMember.phone} />
              </dl>

              <SectionTitle>연결 상품/주문 정보</SectionTitle>
              <dl className="border border-border divide-y divide-border text-[11px]">
                <Row label="상품명" value={sendProductName} />
                <Row label="주문/렌탈 번호" value={sendLinkedRefId} />
              </dl>

              <SectionTitle>입력된 계약 정보 요약</SectionTitle>
              <dl className="border border-border divide-y divide-border text-[11px]">
                {(selectedTemplate?.fields ?? []).map((f) => (
                  <Row key={f.id} label={f.label} value={sendValues[f.id] || "-"} />
                ))}
              </dl>

              <dl className="border border-border divide-y divide-border text-[11px]">
                <Row label="서명 만료일" value={sendExpiry} />
              </dl>

              <p className="text-[11px] text-muted-foreground border border-sage-ink/20 bg-sage-soft/10 px-3 py-2">
                입력한 계약 정보가 모두싸인 템플릿에 반영된 후 전자서명 요청이 발송됩니다.
              </p>
            </div>
          )}

          <div className="flex gap-2 mt-6 pt-4 border-t border-border">
            {sendStep === "form" ? (
              <>
                <Button variant="outline" className="flex-1" onClick={() => setSendOpen(false)}>취소</Button>
                <Button variant="outline" className="flex-1" disabled={!canProceed} onClick={() => setSendStep("preview")}>
                  미리보기
                </Button>
                <Button className="flex-[1.5]" disabled={!canProceed} onClick={handleSend}>발송</Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="flex-1" onClick={() => setSendStep("form")}>이전</Button>
                <Button className="flex-[1.5]" onClick={handleSend}>발송</Button>
              </>
            )}
          </div>
        </Modal>
      )}

      {/* 새 템플릿 등록 / 수정 모달 */}
      {tmplOpen && (
        <Modal title={editingTmplId ? "템플릿 수정" : "새 템플릿 등록"} onClose={() => setTmplOpen(false)} wide>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <ModalField label="템플릿 이름">
                <input
                  value={tmplName}
                  onChange={(e) => setTmplName(e.target.value)}
                  placeholder="예: 렌탈 서비스 이용 약정서"
                  className={fieldClass}
                />
              </ModalField>
              <ModalField label="계약 유형">
                <select
                  value={tmplType}
                  onChange={(e) => setTmplType(e.target.value as ContractType)}
                  className={fieldClass}
                >
                  {CONTRACT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </ModalField>
            </div>
            <ModalField label="설명">
              <input
                value={tmplDesc}
                onChange={(e) => setTmplDesc(e.target.value)}
                placeholder="간단한 설명을 입력하세요"
                className={fieldClass}
              />
            </ModalField>
            <div className="grid grid-cols-2 gap-3">
              <ModalField label="모두싸인 템플릿 ID">
                <input
                  value={tmplModusignId}
                  onChange={(e) => setTmplModusignId(e.target.value)}
                  placeholder="예: template_xxx_001"
                  className={cn(fieldClass, "font-mono")}
                />
              </ModalField>
              <ModalField label="서명자 역할명">
                <input
                  value={tmplSignerRole}
                  onChange={(e) => setTmplSignerRole(e.target.value)}
                  placeholder="예: 임차인"
                  className={fieldClass}
                />
              </ModalField>
            </div>

            <ModalField label="필드 매핑 정보">
              <div className="border border-border overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-muted">
                    <tr className="text-left text-[10px] text-muted-foreground whitespace-nowrap">
                      <th className="px-2 py-1.5">계약서 필드명</th>
                      <th className="px-2 py-1.5">모두싸인 필드 키</th>
                      <th className="px-2 py-1.5">우리 서비스 데이터</th>
                      <th className="px-2 py-1.5 text-center">필수 여부</th>
                      <th className="px-2 py-1.5 w-8"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {tmplMappings.map((m, i) => (
                      <tr key={i}>
                        <td className="p-1">
                          <input
                            value={m.docField}
                            onChange={(e) => updateMapping(i, "docField", e.target.value)}
                            className="w-full h-7 border border-border px-1.5 text-[11px] bg-background outline-none focus:border-sage-ink"
                          />
                        </td>
                        <td className="p-1">
                          <input
                            value={m.modusignKey}
                            onChange={(e) => updateMapping(i, "modusignKey", e.target.value)}
                            className="w-full h-7 border border-border px-1.5 text-[11px] font-mono bg-background outline-none focus:border-sage-ink"
                          />
                        </td>
                        <td className="p-1">
                          <input
                            value={m.ourData}
                            onChange={(e) => updateMapping(i, "ourData", e.target.value)}
                            className="w-full h-7 border border-border px-1.5 text-[11px] bg-background outline-none focus:border-sage-ink"
                          />
                        </td>
                        <td className="p-1 text-center">
                          <button
                            type="button"
                            onClick={() => updateMapping(i, "required", !m.required)}
                            className={cn(
                              "w-5 h-5 border inline-flex items-center justify-center text-[10px]",
                              m.required ? "border-sage-ink bg-sage-ink text-background" : "border-border"
                            )}
                          >
                            {m.required && "✓"}
                          </button>
                        </td>
                        <td className="p-1 text-center">
                          <button type="button" onClick={() => removeMappingRow(i)} className="text-muted-foreground hover:text-red-500">
                            <X size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button type="button" onClick={addMappingRow} className="mt-1.5 text-[11px] text-sage-ink hover:underline">
                + 필드 추가
              </button>
            </ModalField>

            <ModalField label="사용 여부">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTmplActive(true)}
                  className={cn(
                    "px-3 h-8 text-xs border transition-colors",
                    tmplActive ? "border-sage-ink bg-sage-ink text-background" : "border-border hover:bg-muted"
                  )}
                >
                  사용중
                </button>
                <button
                  type="button"
                  onClick={() => setTmplActive(false)}
                  className={cn(
                    "px-3 h-8 text-xs border transition-colors",
                    !tmplActive ? "border-foreground bg-foreground text-background" : "border-border hover:bg-muted"
                  )}
                >
                  비활성
                </button>
              </div>
            </ModalField>

            <ModalField label="PDF 파일 업로드 (선택)">
              <div className="border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                PDF 파일을 선택하세요
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5">
                PDF 파일은 내부 미리보기용으로 사용됩니다. 실제 전자서명 발송은 연결된 모두싸인 템플릿을 기준으로 진행됩니다.
              </p>
            </ModalField>
          </div>
          <div className="flex gap-2 mt-6 pt-4 border-t border-border">
            <Button variant="outline" className="flex-1" onClick={() => setTmplOpen(false)}>취소</Button>
            <Button className="flex-1" disabled={!tmplName} onClick={handleSaveTemplate}>
              {editingTmplId ? "저장" : "등록"}
            </Button>
          </div>
        </Modal>
      )}

      {/* 템플릿 미리보기 모달 */}
      {previewTemplate && (
        <Modal title={`${previewTemplate.name} 미리보기`} onClose={() => setPreviewTemplate(null)} wide>
          <div className="border border-border bg-white p-6 space-y-4 font-serif text-sm leading-loose text-gray-800 max-h-[60vh] overflow-y-auto">
            <div className="text-center space-y-1 pb-3 border-b border-gray-200">
              <div className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">Fullty Inc.</div>
              <div className="text-base font-bold tracking-tight">{previewTemplate.name}</div>
            </div>
            {(CONTRACT_BODY[previewTemplate.id] ?? []).map((p, i) => (
              <p key={i} className="leading-relaxed">{p}</p>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-2 font-sans text-xs">
              {previewTemplate.fields.map((f) => (
                <div key={f.id} className="flex justify-between gap-3">
                  <span className="text-gray-500">{f.label}</span>
                  <span className="text-gray-300">{`{${f.id}}`}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button variant="outline" onClick={() => setPreviewTemplate(null)}>닫기</Button>
          </div>
        </Modal>
      )}

      {/* 계약 취소 확인 모달 */}
      {cancelTarget && (
        <Modal title="계약 취소" onClose={() => setCancelTarget(null)}>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">{cancelTarget.memberName}</span>에게 발송된{" "}
            <span className="font-semibold text-foreground">&quot;{cancelTarget.name}&quot;</span> 계약을 취소합니다.
            취소된 계약은 상대방이 서명할 수 없습니다.
          </p>
          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setCancelTarget(null)}>돌아가기</Button>
            <Button className="flex-1 bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600" onClick={() => handleCancel(cancelTarget.id)}>
              취소 확정
            </Button>
          </div>
        </Modal>
      )}

      {/* 계약 삭제 확인 모달 */}
      {deleteTarget && (
        <Modal title="계약 삭제" onClose={() => setDeleteTarget(null)}>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">&quot;{deleteTarget.name}&quot;</span> 계약을 삭제합니다.
            작성중인 계약만 삭제할 수 있으며, 삭제 후 복구할 수 없습니다.
          </p>
          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setDeleteTarget(null)}>취소</Button>
            <Button className="flex-1 bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600" onClick={() => handleDelete(deleteTarget.id)}>
              삭제
            </Button>
          </div>
        </Modal>
      )}

      {/* 템플릿 비활성화/활성화 확인 모달 */}
      {deactivateTarget && (
        <Modal
          title={deactivateTarget.active ? "템플릿 비활성화" : "템플릿 활성화"}
          onClose={() => setDeactivateTarget(null)}
        >
          {deactivateTarget.active ? (
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">&quot;{deactivateTarget.name}&quot;</span> 템플릿을 비활성화합니다.
              비활성화된 템플릿은 새 계약 발송 시 선택할 수 없습니다. 계약에 사용된 템플릿은 삭제 대신 비활성화로 관리되며,
              기존에 발송된 계약은 그대로 유지됩니다.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">&quot;{deactivateTarget.name}&quot;</span> 템플릿을 다시 활성화합니다.
              활성화 후에는 계약 발송 시 이 템플릿을 선택할 수 있습니다.
            </p>
          )}
          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setDeactivateTarget(null)}>돌아가기</Button>
            <Button className="flex-1" onClick={() => handleToggleActive(deactivateTarget.id)}>
              {deactivateTarget.active ? "비활성화" : "활성화"}
            </Button>
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

function InfoChip({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="border border-border px-2.5 py-1.5">
      <div className="text-[10px] text-muted-foreground">{label}</div>
      <div className={cn("text-[11px] mt-0.5 truncate", mono && "font-mono text-sage-ink")}>{value}</div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] font-semibold text-sage-ink tracking-wide">{children}</div>;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground font-medium">{value}</dd>
    </div>
  );
}

function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={cn("relative bg-background border border-border w-full p-6 z-10 max-h-[90vh] overflow-y-auto", wide ? "max-w-2xl" : "max-w-md")}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">{title}</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ModalField({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <div className="text-[11px] text-muted-foreground mb-1">{label}</div>
      {children}
    </div>
  );
}
