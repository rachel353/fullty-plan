"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type Inquiry = {
  id: string;
  category: string;
  title: string;
  body: string;
  createdAt: string;
  status: "답변 대기" | "답변 완료";
  reply?: { body: string; repliedAt: string };
};

export const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: "iq001",
    category: "주문 / 결제",
    title: "주문 취소 요청드립니다",
    body: "어제 주문한 Aeron Chair 취소가 가능한지 확인 부탁드립니다. 주문번호는 ord-2026-0421입니다.",
    createdAt: "2026-04-21",
    status: "답변 완료",
    reply: {
      body: "안녕하세요, 풀티 고객센터입니다.\n해당 주문은 이미 배송 준비 단계에 진입하여 취소가 어렵습니다.\n상품 수령 후 반품 신청을 이용해 주시기 바랍니다.\n불편을 드려 죄송합니다.",
      repliedAt: "2026-04-22",
    },
  },
  {
    id: "iq002",
    category: "렌탈",
    title: "렌탈 기간 연장 방법 문의",
    body: "현재 렌탈 중인 상품의 기간을 연장하고 싶은데 어떻게 하면 되나요?",
    createdAt: "2026-04-18",
    status: "답변 완료",
    reply: {
      body: "안녕하세요!\n렌탈 기간 연장은 마이페이지 > 렌탈 중인 상품 > 상세 페이지에서 '기간 연장' 버튼을 통해 신청하실 수 있습니다.\n추가 문의사항이 있으시면 언제든지 남겨주세요.",
      repliedAt: "2026-04-19",
    },
  },
  {
    id: "iq003",
    category: "상품 / 검수",
    title: "상품 상태 등급 기준이 궁금합니다",
    body: "SS, S, A+ 등 등급 기준이 어떻게 되나요? 구매 전에 참고하고 싶습니다.",
    createdAt: "2026-04-25",
    status: "답변 대기",
  },
];

const CATEGORIES = ["전체", "주문 / 결제", "렌탈", "상품 / 검수", "계정", "기타"];

export default function InquiriesPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">1:1 문의</h2>
          <p className="text-sm text-muted-foreground mt-1">총 {MOCK_INQUIRIES.length}건</p>
        </div>
        <Link href="/mypage/inquiries/new">
          <Button size="sm">문의하기</Button>
        </Link>
      </div>

      <div className="divide-y divide-border border border-border">
        {MOCK_INQUIRIES.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">
            문의 내역이 없습니다.
          </div>
        ) : MOCK_INQUIRIES.map((q) => (
          <Link key={q.id} href={`/mypage/inquiries/${q.id}`} className="block px-5 py-4 hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground">{q.category}</span>
                  <Badge variant={q.status === "답변 완료" ? "sage" : "default"}>
                    {q.status}
                  </Badge>
                </div>
                <div className="font-medium text-sm truncate">{q.title}</div>
                <div className="text-[11px] text-muted-foreground">{q.createdAt}</div>
              </div>
              <span className="text-muted-foreground text-xs shrink-0 mt-1">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
