"use client";

import { Modal } from "./ui/Modal";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";

const qTypes = [
  "상품 정보",
  "재고 / 입고",
  "옵션 / 사이즈",
  "배송",
  "렌탈",
  "검수 / 등급",
  "기타",
];

const USER_PROFILE = {
  name: "full***123",
  phone: "010-1234-5678",
};

export function QnAModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Q&A 작성">
      <form className="p-6 space-y-5">
        <Field label="작성자" required>
          <div className="relative">
            <input
              readOnly
              value={USER_PROFILE.name}
              className="w-full h-11 px-3 pr-20 text-sm border border-border bg-muted/40 text-muted-foreground cursor-default"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-sage-ink bg-sage-soft/60 px-1.5 py-0.5">
              자동완성
            </span>
          </div>
        </Field>

        <Field label="연락처" required>
          <div className="relative">
            <input
              defaultValue={USER_PROFILE.phone}
              className="w-full h-11 px-3 pr-20 text-sm border border-border bg-background"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-sage-ink bg-sage-soft/60 px-1.5 py-0.5">
              자동완성
            </span>
          </div>
          <label className="flex items-center gap-2 mt-2 text-xs text-muted-foreground cursor-pointer">
            <input type="checkbox" className="accent-sage-ink" defaultChecked />
            답변 알림 받기
          </label>
        </Field>

        <Field label="문의 유형" required>
          <Select placeholder="유형 선택" options={qTypes} />
        </Field>

        <Field label="문의 내용" required>
          <textarea
            rows={5}
            placeholder="문의 내용을 입력해 주세요"
            className="w-full p-3 text-sm border border-border bg-background resize-none"
          />
          <label className="flex items-center gap-2 mt-2 text-xs text-muted-foreground cursor-pointer">
            <input type="checkbox" className="accent-sage-ink" />
            비공개
          </label>
        </Field>

        <div className="border border-border p-3 bg-muted/40">
          <div className="text-[11px] font-semibold text-sage-ink mb-2">Q&A 작성 시 유의 사항</div>
          <ul className="space-y-1 text-[11px] text-muted-foreground leading-relaxed">
            <li>
              · 상품 및 상품 구매 과정과 관련 없는 비방, 욕설, 명예훼손성 게시글 및 상품과 관련
              없는 광고글 등 부적절한 게시글 등록 시 글쓰기 제한 및 게시글이 삭제 조치 될 수
              있습니다.
            </li>
            <li>
              · 전화번호, 이메일 등 개인 정보가 포함된 글 작성이 필요한 경우 판매자만 볼 수 있도록
              비밀글로 문의해 주시기 바랍니다.
            </li>
          </ul>
        </div>
      </form>

      <footer className="border-t border-border p-4 grid grid-cols-2 gap-2 bg-background">
        <Button variant="outline" onClick={onClose}>취소</Button>
        <Button variant="sage" onClick={onClose}>등록하기</Button>
      </footer>
    </Modal>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-sage-ink mb-1.5">
        {label}
        {required && <span className="text-sage-deep ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
