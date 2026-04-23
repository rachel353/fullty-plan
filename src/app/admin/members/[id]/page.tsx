"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const MEMBER_DATA = [
  {
    id: "m001",
    name: "김풀티",
    email: "kimfullty@gmail.com",
    phone: "010-1234-5678",
    joined: "2025-08-12",
    lastLogin: "2026-04-22",
    grade: "S",
    status: "정상" as const,
    memo: "",
    orders: [
      { id: "o001", product: "Herman Miller Aeron Chair", amount: 1280000, date: "2026-04-08", status: "배송 중" },
      { id: "o002", product: "Fritz Hansen Egg Chair (렌탈)", amount: 850000, date: "2026-03-15", status: "배송 완료" },
    ],
    gets: { total: 3, completed: 1 },
    sells: { total: 1, completed: 0 },
  },
  {
    id: "m002",
    name: "이가구",
    email: "leeg@kakao.com",
    phone: "010-9876-5432",
    joined: "2025-12-04",
    lastLogin: "2026-04-20",
    grade: "BRONZE",
    status: "정상" as const,
    memo: "",
    orders: [
      { id: "o003", product: "Carl Hansen CH24 Wishbone", amount: 980000, date: "2026-02-28", status: "구매 확정" },
    ],
    gets: { total: 1, completed: 1 },
    sells: { total: 0, completed: 0 },
  },
  {
    id: "m003",
    name: "박빈티",
    email: "park@gmail.com",
    phone: "010-5555-1234",
    joined: "2026-02-19",
    lastLogin: "2026-04-18",
    grade: "WELCOME",
    status: "정상" as const,
    memo: "",
    orders: [],
    gets: { total: 0, completed: 0 },
    sells: { total: 1, completed: 0 },
  },
  {
    id: "m004",
    name: "최라운지",
    email: "choi@gmail.com",
    phone: "010-7777-8888",
    joined: "2026-04-01",
    lastLogin: "2026-04-02",
    grade: "WELCOME",
    status: "휴면 예정" as const,
    memo: "90일 이상 미접속 예정",
    orders: [],
    gets: { total: 0, completed: 0 },
    sells: { total: 0, completed: 0 },
  },
];

function SuspendModal({ name, onConfirm, onClose }: { name: string; onConfirm: () => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-background border border-border w-full max-w-sm p-6 space-y-5 z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">이용 정지</h3>
          <button onClick={onClose}><X size={16} className="text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">{name}</span> 회원을 이용 정지 처리합니다.<br />
          정지 시 로그인이 차단되며 알림이 발송됩니다.
        </p>
        <select className="w-full h-10 border border-border px-3 text-sm bg-background">
          <option>사유 선택</option>
          <option>허위 정보 등록</option>
          <option>거래 사기 의심</option>
          <option>운영 정책 위반</option>
          <option>기타</option>
        </select>
        <div className="flex gap-2 pt-1">
          <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
          <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={onConfirm}>이용 정지</Button>
        </div>
      </div>
    </div>
  );
}

export default function MemberDetailPage() {
  const { id } = useParams<{ id: string }>();
  const member = MEMBER_DATA.find((m) => m.id === id);
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [suspended, setSuspended] = useState(false);

  if (!member) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        회원을 찾을 수 없습니다.
        <Link href="/admin/members" className="block mt-3 text-sage-ink underline">목록으로</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="border-b border-border pb-4">
        <Link href="/admin/members" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-sage-ink mb-3 transition-colors">
          <ChevronLeft size={13} /> 일반 회원
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold">{member.name}</h2>
            <p className="text-[11px] text-muted-foreground mt-1">{member.id} · 가입 {member.joined}</p>
          </div>
          <Badge variant={suspended || member.status !== "정상" ? "muted" : "default"}>
            {suspended ? "이용 정지" : member.status}
          </Badge>
        </div>
      </div>

      {/* 기본 정보 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">기본 정보</div>
        <div className="border border-border divide-y divide-border text-sm">
          <Row label="이메일" value={member.email} />
          <Row label="전화번호" value={member.phone} />
          <Row label="가입일" value={member.joined} />
          <Row label="최근 접속" value={member.lastLogin} />
          <Row label="등급" value={<Badge variant="outline">{member.grade}</Badge>} />
          {member.memo && <Row label="메모" value={<span className="text-amber-600">{member.memo}</span>} />}
        </div>
      </section>

      {/* 활동 요약 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">활동 요약</div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <StatBox label="주문" value={`${member.orders.length}건`} />
          <StatBox label="GET" value={`${member.gets.total}건 (완료 ${member.gets.completed})`} />
          <StatBox label="SELL" value={`${member.sells.total}건 (완료 ${member.sells.completed})`} />
        </div>
      </section>

      {/* 최근 주문 */}
      {member.orders.length > 0 && (
        <section className="space-y-3">
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">최근 주문</div>
          <div className="border border-border divide-y divide-border text-sm">
            {member.orders.map((o) => (
              <div key={o.id} className="px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{o.product}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{o.date} · {o.id}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{o.amount.toLocaleString()}원</div>
                  <Badge variant="outline" className="text-[10px] mt-1">{o.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 계정 조치 */}
      <section className="space-y-3">
        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">계정 조치</div>
        <div className="border border-border px-5 py-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">이용 정지</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">로그인 차단 및 서비스 이용 불가 처리</div>
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={suspended}
            onClick={() => setSuspendOpen(true)}
            className={cn(suspended && "text-muted-foreground")}
          >
            {suspended ? "정지 완료" : "이용 정지"}
          </Button>
        </div>
      </section>

      <div className="border-t border-border pt-6 flex justify-end">
        <Link href="/admin/members"><Button variant="outline">목록으로</Button></Link>
      </div>

      {suspendOpen && (
        <SuspendModal
          name={member.name}
          onConfirm={() => { setSuspendOpen(false); setSuspended(true); }}
          onClose={() => setSuspendOpen(false)}
        />
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="px-4 py-3 flex items-center justify-between gap-4">
      <span className="text-muted-foreground text-[11px] w-24 flex-shrink-0">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border px-4 py-3">
      <div className="text-[10px] text-muted-foreground mb-1">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
