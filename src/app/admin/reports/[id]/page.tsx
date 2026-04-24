"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type ReportStatus = "접수" | "조사 중" | "조치 완료" | "반려";
type ActionType = "경고" | "일시 정지" | "영구 정지" | "콘텐츠 삭제" | "기타";

type Report = {
  id: string;
  target: string;
  targetType: "셀러" | "GET 제안" | "리뷰" | "상품" | "회원";
  targetId: string;
  reason: string;
  detail: string;
  reporter: string;
  reporterType: "구매자" | "셀러" | "운영자";
  date: string;
  status: ReportStatus;
  actionType?: ActionType;
  actionNote?: string;
  actionDate?: string;
  actionBy?: string;
};

const REPORTS: Report[] = [
  {
    id: "rp001",
    target: "셀러: 무료가구",
    targetType: "셀러",
    targetId: "seller_muryogagu",
    reason: "허위 등급 의심",
    detail: "상품 설명에 'SS등급'으로 표기되어 있으나 실제 수령 시 B등급 이하 상태였음. 상품 사진과 실물 상태가 다름. 이전에도 유사한 민원이 있었던 것으로 보임.",
    reporter: "kimfullty@gmail.com",
    reporterType: "구매자",
    date: "2026-04-09",
    status: "조사 중",
  },
  {
    id: "rp002",
    target: "GET g005",
    targetType: "GET 제안",
    targetId: "g005",
    reason: "악의적 가격 입력",
    detail: "정상 시장가 대비 10배 이상의 가격을 제안하여 시스템을 악용. 동일 계정에서 반복적으로 이상 가격 제안이 발생함.",
    reporter: "park@gmail.com",
    reporterType: "셀러",
    date: "2026-04-07",
    status: "조치 완료",
    actionType: "경고",
    actionNote: "최초 위반으로 경고 조치. 재발 시 계정 정지 예정.",
    actionDate: "2026-04-08",
    actionBy: "admin@fullty.co.kr",
  },
  {
    id: "rp003",
    target: "리뷰 rv023",
    targetType: "리뷰",
    targetId: "rv023",
    reason: "광고성 내용",
    detail: "리뷰 내용이 특정 외부 브랜드 및 쇼핑몰을 홍보하는 광고성 글로 확인됨. 실제 구매 이력 없이 작성된 것으로 추정.",
    reporter: "lee@kakao.com",
    reporterType: "구매자",
    date: "2026-04-04",
    status: "반려",
    actionNote: "실제 구매 이력 확인 결과 정상 구매 후 작성된 리뷰로 판단. 광고성 내용에 해당하지 않음.",
    actionDate: "2026-04-05",
    actionBy: "admin@fullty.co.kr",
  },
];

const STATUS_VARIANT: Record<ReportStatus, "default" | "outline" | "muted"> = {
  "접수": "outline",
  "조사 중": "outline",
  "조치 완료": "default",
  "반려": "muted",
};

function ActionModal({
  onConfirm,
  onClose,
}: {
  onConfirm: (type: ActionType, note: string) => void;
  onClose: () => void;
}) {
  const [actionType, setActionType] = useState<ActionType | "">("");
  const [note, setNote] = useState("");
  const canConfirm = !!actionType && note.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">조치 완료 처리</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[11px] text-muted-foreground">조치 유형</label>
            <select
              value={actionType}
              onChange={(e) => setActionType(e.target.value as ActionType)}
              className="w-full h-10 border border-border px-3 text-sm bg-background"
            >
              <option value="">선택</option>
              <option>경고</option>
              <option>일시 정지</option>
              <option>영구 정지</option>
              <option>콘텐츠 삭제</option>
              <option>기타</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] text-muted-foreground">조치 내용</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="조치 내용 및 사유를 입력하세요"
              className="w-full border border-border px-3 py-2 text-sm bg-background resize-none h-24 outline-none focus:border-sage-ink"
            />
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1" disabled={!canConfirm} onClick={() => onConfirm(actionType as ActionType, note)}>
            조치 완료
          </Button>
        </div>
      </div>
    </div>
  );
}

function RejectModal({
  onConfirm,
  onClose,
}: {
  onConfirm: (note: string) => void;
  onClose: () => void;
}) {
  const [note, setNote] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">신고 반려</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground">신고 내용을 검토한 결과 처리 불필요로 판단 시 반려합니다.</p>
        <div className="space-y-1.5">
          <label className="text-[11px] text-muted-foreground">반려 사유</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="반려 사유를 입력하세요"
            className="w-full border border-border px-3 py-2 text-sm bg-background resize-none h-20 outline-none focus:border-sage-ink"
          />
        </div>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button variant="outline" className="flex-1 text-amber-600 border-amber-200 hover:bg-amber-50" disabled={!note.trim()} onClick={() => onConfirm(note)}>
            반려 확정
          </Button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="px-4 py-3 flex items-start justify-between gap-4">
      <span className="text-muted-foreground text-[11px] w-24 flex-shrink-0 mt-0.5">{label}</span>
      <span className="font-medium text-right text-sm">{value}</span>
    </div>
  );
}

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const report = REPORTS.find((r) => r.id === id);

  const [status, setStatus] = useState<ReportStatus | null>(null);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const [actionNote, setActionNote] = useState("");
  const [actionModal, setActionModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  if (!report) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        신고 내역을 찾을 수 없습니다.
        <Link href="/admin/reports" className="block mt-3 text-sage-ink underline">목록으로</Link>
      </div>
    );
  }

  const currentStatus = status ?? report.status;
  const isPending = currentStatus === "접수" || currentStatus === "조사 중";
  const displayActionType = actionType ?? report.actionType;
  const displayActionNote = actionNote || report.actionNote;

  return (
    <div className="space-y-8 max-w-2xl">
      {/* 헤더 */}
      <div className="border-b border-border pb-4">
        <Link href="/admin/reports" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 신고 관리
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{report.reason}</h2>
            <p className="text-[11px] text-muted-foreground mt-1">{report.id} · {report.date}</p>
          </div>
          <Badge variant={STATUS_VARIANT[currentStatus]}>{currentStatus}</Badge>
        </div>
      </div>

      {/* 조치 완료 배너 */}
      {currentStatus === "조치 완료" && (
        <div className="border border-sage-deep/30 bg-sage-soft/10 px-5 py-4 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-sage-deep flex items-center justify-center text-[10px] text-background">✓</div>
            <span className="text-sm font-semibold">조치 완료</span>
            {displayActionType && <Badge variant="outline" className="text-[10px]">{displayActionType}</Badge>}
          </div>
          {displayActionNote && (
            <p className="text-[11px] text-muted-foreground pl-7 leading-relaxed">{displayActionNote}</p>
          )}
          {(report.actionDate || report.actionBy) && (
            <p className="text-[11px] text-muted-foreground pl-7">
              {report.actionDate} · {report.actionBy}
            </p>
          )}
        </div>
      )}

      {/* 반려 배너 */}
      {currentStatus === "반려" && (
        <div className="border border-amber-200 bg-amber-50 px-5 py-4 space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-amber-400 flex items-center justify-center text-[10px] text-amber-600">!</div>
            <span className="text-sm font-semibold text-amber-800">반려 처리됨</span>
          </div>
          {displayActionNote && (
            <p className="text-[11px] text-amber-700 pl-7 leading-relaxed">{displayActionNote}</p>
          )}
          {(report.actionDate || report.actionBy) && (
            <p className="text-[11px] text-amber-600 pl-7">
              {report.actionDate} · {report.actionBy}
            </p>
          )}
        </div>
      )}

      {/* 신고 정보 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">신고 정보</div>
        <div className="border border-border divide-y divide-border">
          <Row label="신고 대상" value={
            <div className="flex items-center gap-2">
              <Badge variant="outline">{report.targetType}</Badge>
              <span>{report.target}</span>
            </div>
          } />
          <Row label="신고 사유" value={report.reason} />
          <Row label="신고자" value={
            <div>
              <div>{report.reporter}</div>
              <Badge variant="outline" className="text-[10px] mt-0.5">{report.reporterType}</Badge>
            </div>
          } />
          <Row label="신고일" value={report.date} />
        </div>
      </section>

      {/* 신고 상세 내용 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">신고 내용</div>
        <div className="border border-border px-5 py-4 text-sm text-muted-foreground leading-relaxed">
          {report.detail}
        </div>
      </section>

      {/* 조사 중 전환 버튼 */}
      {currentStatus === "접수" && (
        <section className="border border-border px-5 py-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">조사 시작</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">신고 내용 검토를 시작합니다</div>
          </div>
          <Button size="sm" onClick={() => setStatus("조사 중")}>조사 시작</Button>
        </section>
      )}

      {/* 처리 액션 */}
      {isPending && currentStatus === "조사 중" && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">신고 처리</div>
          <div className="border border-border divide-y divide-border">
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">조치 완료</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">경고 / 정지 / 삭제 등 조치 후 완료 처리</div>
              </div>
              <Button size="sm" onClick={() => setActionModal(true)}>조치 완료</Button>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-amber-700">신고 반려</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">처리 불필요 판단 시 반려</div>
              </div>
              <Button size="sm" variant="outline" className="text-amber-600 border-amber-200 hover:bg-amber-50" onClick={() => setRejectModal(true)}>
                반려
              </Button>
            </div>
          </div>
        </section>
      )}

      <div className="border-t border-border pt-6 flex justify-end">
        <Link href="/admin/reports"><Button variant="outline">목록으로</Button></Link>
      </div>

      {actionModal && (
        <ActionModal
          onConfirm={(type, note) => {
            setActionModal(false);
            setStatus("조치 완료");
            setActionType(type);
            setActionNote(note);
          }}
          onClose={() => setActionModal(false)}
        />
      )}
      {rejectModal && (
        <RejectModal
          onConfirm={(note) => {
            setRejectModal(false);
            setStatus("반려");
            setActionNote(note);
          }}
          onClose={() => setRejectModal(false)}
        />
      )}
    </div>
  );
}
