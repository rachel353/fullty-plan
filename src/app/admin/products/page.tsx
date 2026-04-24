"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { products as mockProducts } from "@/lib/mock";
import { formatPrice } from "@/lib/utils";

const TABS = ["전체", "검수 대기", "판매중", "렌탈중", "품절", "반려"] as const;
type Tab = typeof TABS[number];

const REJECT_REASONS = [
  "상품 사진 불충분 (추가 촬영 필요)",
  "사진과 실물 상태 불일치",
  "등급 기준 미달",
  "가격 기준 초과 (S등급 신품 최저가 초과)",
  "상품 정보 미비",
  "기타 (직접 입력)",
];

type AdminProduct = {
  id: string;
  brand: string;
  name: string;
  option: string;
  seller: string;
  grade: string;
  price: number;
  tab: Tab;
  availability?: string;
  rejectedAt?: string;
  rejectReason?: string;
  approvedAt?: string;
};

// IDs managed as admin-specific "검수 대기" — excluded from mock status filters
const PENDING_IDS = new Set(["p008", "p017", "p018"]);

const ALL_PRODUCTS: AdminProduct[] = [
  // 검수 대기 (admin-managed)
  { id: "p008", brand: "Knoll", name: "Saarinen Tulip Table", option: "Round 120 / Marble", seller: "미드센추리", grade: "A", price: 4200000, tab: "검수 대기" },
  { id: "p017", brand: "Muuto", name: "E27 Pendant", option: "White", seller: "노르딕홈", grade: "S", price: 380000, tab: "검수 대기" },
  { id: "p018", brand: "HAY", name: "About A Chair AAC22", option: "Soft Black", seller: "빈티지 웍스", grade: "A+", price: 290000, tab: "검수 대기" },
  // 판매중
  ...mockProducts.filter((p) => p.status === "판매중" && !PENDING_IDS.has(p.id)).map((p) => ({
    id: p.id, brand: p.brand, name: p.name, option: p.option, seller: p.seller,
    grade: p.grade, price: p.price, tab: "판매중" as Tab,
    availability: p.availability === "both" ? "판매 · 렌탈" : p.availability === "rent" ? "렌탈 전용" : "판매 전용",
  })),
  // 렌탈중
  ...mockProducts.filter((p) => p.status === "렌탈중" && !PENDING_IDS.has(p.id)).map((p) => ({
    id: p.id, brand: p.brand, name: p.name, option: p.option, seller: p.seller,
    grade: p.grade, price: p.price, tab: "렌탈중" as Tab,
  })),
  // 품절
  { id: "p022", brand: "String", name: "String System", option: "3×3 / Pure White", seller: "모듈러 코리아", grade: "A+", price: 980000, tab: "품절" },
  // 반려
  { id: "p019", brand: "Cassina", name: "LC2 Armchair", option: "2-seater / Black Leather", seller: "이태리에디션", grade: "A", price: 2800000, tab: "반려", rejectedAt: "2026-04-10", rejectReason: "상품 사진과 실물 상태 불일치" },
  { id: "p020", brand: "Vitra", name: "DSW Chair", option: "White / Maple", seller: "오브제 스튜디오", grade: "B", price: 450000, tab: "반려", rejectedAt: "2026-04-08", rejectReason: "등급 기준 미달" },
  { id: "p021", brand: "Artek", name: "A110 Hand Grenade", option: "Brass", seller: "노르딕홈", grade: "A+", price: 620000, tab: "반려", rejectedAt: "2026-04-05", rejectReason: "상품 정보 미비" },
];

function ApproveModal({ product, onConfirm, onClose }: {
  product: AdminProduct;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">상품 승인</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <div className="border border-border px-4 py-3 text-sm space-y-1">
          <div className="text-[11px] text-muted-foreground">{product.brand}</div>
          <div className="font-semibold">{product.name}</div>
          <div className="text-[11px] text-muted-foreground">{product.option}</div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          승인 즉시 플랫폼에 상품이 노출됩니다.<br />
          셀러에게 승인 알림이 발송됩니다.
        </p>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" onClick={onConfirm}>승인 확정</Button>
        </div>
      </div>
    </div>
  );
}

function RejectModal({ product, onConfirm, onClose }: {
  product: AdminProduct;
  onConfirm: (reason: string) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState("");
  const [custom, setCustom] = useState("");
  const isCustom = selected === "기타 (직접 입력)";
  const reason = isCustom ? custom : selected;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">상품 반려</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <div className="border border-border px-4 py-3 text-sm space-y-1">
          <div className="text-[11px] text-muted-foreground">{product.brand}</div>
          <div className="font-semibold">{product.name}</div>
          <div className="text-[11px] text-muted-foreground">{product.option}</div>
        </div>
        <div className="space-y-2">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">반려 사유</div>
          {REJECT_REASONS.map((r) => (
            <button
              key={r}
              onClick={() => setSelected(r)}
              className={cn(
                "w-full text-left px-3 py-2 border text-xs transition-colors",
                selected === r ? "border-sage-ink bg-sage-soft/20 text-sage-ink" : "border-border hover:bg-muted"
              )}
            >
              {r}
            </button>
          ))}
          {isCustom && (
            <textarea
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="반려 사유를 직접 입력하세요"
              className="w-full border border-border px-3 py-2 text-sm bg-transparent resize-none h-20 outline-none focus:border-sage-ink"
            />
          )}
        </div>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button
            className="flex-1 bg-red-500 hover:bg-red-600"
            disabled={!reason.trim()}
            onClick={() => onConfirm(reason)}
          >
            반려 확정
          </Button>
        </div>
      </div>
    </div>
  );
}

function SuspendModal({ name, onConfirm, onClose }: {
  name: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">판매 중단</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">{name}</span>의 판매를 중단합니다.<br />
          중단 즉시 플랫폼 노출이 해제됩니다.
        </p>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full h-10 border border-border px-3 text-sm bg-background"
        >
          <option value="">중단 사유 선택</option>
          <option>셀러 요청</option>
          <option>상품 상태 이슈</option>
          <option>가격 정책 위반</option>
          <option>기타</option>
        </select>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button
            className="flex-1 bg-red-500 hover:bg-red-600"
            disabled={!reason}
            onClick={onConfirm}
          >
            판매 중단
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("검수 대기");
  const [approveTarget, setApproveTarget] = useState<AdminProduct | null>(null);
  const [rejectTarget, setRejectTarget] = useState<AdminProduct | null>(null);
  const [suspendTarget, setSuspendTarget] = useState<AdminProduct | null>(null);
  const [processed, setProcessed] = useState<Record<string, { result: "승인" | "반려"; reason?: string }>>({});
  const [suspended, setSuspended] = useState<Set<string>>(new Set());

  const filtered = activeTab === "전체"
    ? ALL_PRODUCTS.filter((p) => !processed[p.id] || processed[p.id].result === p.tab)
    : ALL_PRODUCTS.filter((p) => {
        if (suspended.has(p.id)) return false;
        if (processed[p.id]) return processed[p.id].result === activeTab;
        return p.tab === activeTab;
      });

  const pendingCount = ALL_PRODUCTS.filter((p) => p.tab === "검수 대기" && !processed[p.id]).length;

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold">상품 관리</h2>
        <p className="text-sm text-muted-foreground mt-1">
          셀러 등록 상품의 사전 검수 / 승인 / 반려 관리
        </p>
      </div>

      {/* 탭 */}
      <div className="flex items-center gap-2 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 h-9 text-xs font-medium border transition-colors relative",
              activeTab === tab
                ? "border-foreground bg-foreground text-background"
                : "border-border hover:bg-muted"
            )}
          >
            {tab}
            {tab === "검수 대기" && pendingCount > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-background text-[9px] font-bold">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 검수 대기 */}
      {activeTab === "전체" && <SectionHeader label="검수 대기" />}
      {(activeTab === "검수 대기" || activeTab === "전체") && (
        <ProductTable
          products={ALL_PRODUCTS.filter((p) => p.tab === "검수 대기")}
          processed={processed}
          columns={["상품", "셀러", "등급", "판매가"]}
          renderAction={(p) => {
            const state = processed[p.id];
            if (state) return (
              <div className="flex justify-end gap-2">
                <Badge variant={state.result === "승인" ? "default" : "muted"}>{state.result}</Badge>
              </div>
            );
            return (
              <div className="flex justify-end gap-2">
                <Link href={`/admin/products/${p.id}`}>
                  <Button size="sm" variant="ghost">상세</Button>
                </Link>
                <Button size="sm" variant="outline" onClick={() => setRejectTarget(p)}>반려</Button>
                <Button size="sm" onClick={() => setApproveTarget(p)}>승인</Button>
              </div>
            );
          }}
        />
      )}

      {/* 판매중 */}
      {activeTab === "전체" && <SectionHeader label="판매중" />}
      {(activeTab === "판매중" || activeTab === "전체") && (
        <ProductTable
          products={activeTab === "전체"
            ? ALL_PRODUCTS.filter((p) => p.tab === "판매중" && !suspended.has(p.id))
            : filtered}
          processed={processed}
          columns={["상품", "셀러", "등급", "판매가", "유형"]}
          renderAction={(p) => (
            <div className="flex justify-end gap-2">
              <Link href={`/admin/products/${p.id}`}>
                <Button size="sm" variant="ghost">상세</Button>
              </Link>
              <Button size="sm" variant="outline" onClick={() => setSuspendTarget(p)}>판매 중단</Button>
            </div>
          )}
        />
      )}

      {/* 렌탈중 */}
      {activeTab === "전체" && <SectionHeader label="렌탈중" />}
      {(activeTab === "렌탈중" || activeTab === "전체") && (
        <ProductTable
          products={activeTab === "전체"
            ? ALL_PRODUCTS.filter((p) => p.tab === "렌탈중")
            : filtered}
          processed={processed}
          columns={["상품", "셀러", "등급", "렌탈가"]}
          renderAction={(p) => (
            <Link href={`/admin/products/${p.id}`}>
              <Button size="sm" variant="ghost">상세</Button>
            </Link>
          )}
        />
      )}

      {/* 품절 */}
      {activeTab === "전체" && <SectionHeader label="품절" />}
      {(activeTab === "품절" || activeTab === "전체") && (
        <ProductTable
          products={activeTab === "전체"
            ? ALL_PRODUCTS.filter((p) => p.tab === "품절")
            : filtered}
          processed={processed}
          columns={["상품", "셀러", "등급", "판매가"]}
          renderAction={(p) => (
            <Link href={`/admin/products/${p.id}`}>
              <Button size="sm" variant="ghost">상세</Button>
            </Link>
          )}
        />
      )}

      {/* 반려 */}
      {activeTab === "전체" && <SectionHeader label="반려" />}
      {(activeTab === "반려" || activeTab === "전체") && (
        <ProductTable
          products={activeTab === "전체"
            ? ALL_PRODUCTS.filter((p) => p.tab === "반려")
            : filtered}
          processed={processed}
          columns={["상품", "셀러", "등급", "반려일", "반려 사유"]}
          renderAction={(p) => (
            <Link href={`/admin/products/${p.id}`}>
              <Button size="sm" variant="ghost">상세</Button>
            </Link>
          )}
        />
      )}

      {filtered.length === 0 && activeTab !== "전체" && (
        <div className="border border-border py-16 text-center text-sm text-muted-foreground">
          해당 상태의 상품이 없습니다.
        </div>
      )}

      {approveTarget && (
        <ApproveModal
          product={approveTarget}
          onConfirm={() => {
            setProcessed((prev) => ({ ...prev, [approveTarget.id]: { result: "승인" } }));
            setApproveTarget(null);
          }}
          onClose={() => setApproveTarget(null)}
        />
      )}

      {rejectTarget && (
        <RejectModal
          product={rejectTarget}
          onConfirm={(reason) => {
            setProcessed((prev) => ({ ...prev, [rejectTarget.id]: { result: "반려", reason } }));
            setRejectTarget(null);
          }}
          onClose={() => setRejectTarget(null)}
        />
      )}

      {suspendTarget && (
        <SuspendModal
          name={suspendTarget.name}
          onConfirm={() => {
            setSuspended((prev) => new Set([...prev, suspendTarget.id]));
            setSuspendTarget(null);
          }}
          onClose={() => setSuspendTarget(null)}
        />
      )}
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return <div className="text-[10px] text-muted-foreground tracking-widest uppercase pt-2">{label}</div>;
}

function ProductTable({
  products,
  processed,
  columns,
  renderAction,
}: {
  products: AdminProduct[];
  processed: Record<string, { result: "승인" | "반려"; reason?: string }>;
  columns: string[];
  renderAction: (p: AdminProduct) => React.ReactNode;
}) {
  if (products.length === 0) return null;
  return (
    <div className="border border-border">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted">
          <tr className="text-left text-xs font-medium text-muted-foreground">
            <th className="px-4 py-3">ID</th>
            {columns.map((c) => <th key={c} className="px-4 py-3">{c}</th>)}
            <th className="px-4 py-3 text-right">작업</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 text-[11px] text-muted-foreground">{p.id}</td>

              {columns.includes("상품") && (
                <td className="px-4 py-3">
                  <div className="text-[11px] text-muted-foreground">{p.brand}</div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-[10px] text-muted-foreground">{p.option}</div>
                </td>
              )}
              {columns.includes("셀러") && (
                <td className="px-4 py-3 text-muted-foreground">{p.seller}</td>
              )}
              {columns.includes("등급") && (
                <td className="px-4 py-3"><Badge variant="default">{p.grade}</Badge></td>
              )}
              {(columns.includes("판매가") || columns.includes("렌탈가")) && (
                <td className="px-4 py-3">{formatPrice(p.price)}</td>
              )}
              {columns.includes("유형") && (
                <td className="px-4 py-3">
                  <Badge variant="outline">{p.availability ?? "판매 전용"}</Badge>
                </td>
              )}
              {columns.includes("반려일") && (
                <td className="px-4 py-3 text-muted-foreground text-[11px]">{p.rejectedAt ?? "-"}</td>
              )}
              {columns.includes("반려 사유") && (
                <td className="px-4 py-3 text-[11px] text-muted-foreground max-w-[200px]">
                  {processed[p.id]?.reason ?? p.rejectReason ?? "-"}
                </td>
              )}

              <td className="px-4 py-3 text-right">{renderAction(p)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
