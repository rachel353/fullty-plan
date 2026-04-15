"use client";

import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { AddressSearch } from "./ui/AddressSearch";

export function AddressFormModal({
  open,
  onClose,
  title = "배송지 추가",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
}) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <form className="p-6 space-y-5">
        <Field label="배송지 이름" required>
          <input
            placeholder="예) 자택, 사무실"
            className="w-full h-11 px-3 text-sm border border-border bg-background"
          />
        </Field>

        <Field label="받는 사람" required>
          <input
            placeholder="홍길동"
            className="w-full h-11 px-3 text-sm border border-border bg-background"
          />
        </Field>

        <Field label="연락처" required>
          <input
            placeholder="010-0000-0000"
            className="w-full h-11 px-3 text-sm border border-border bg-background"
          />
        </Field>

        <Field label="주소" required>
          <AddressSearch placeholder="주소 검색 버튼을 눌러 주소를 입력해 주세요" />
        </Field>

        <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
          <input type="checkbox" className="accent-sage-ink" />
          기본 배송지로 설정
        </label>
      </form>

      <footer className="border-t border-border p-4 grid grid-cols-2 gap-2 bg-background">
        <Button variant="outline" onClick={onClose}>
          취소
        </Button>
        <Button variant="sage" onClick={onClose}>
          저장
        </Button>
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
