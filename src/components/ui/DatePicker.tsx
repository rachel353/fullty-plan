"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
}

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
const months = [
  "1월", "2월", "3월", "4월", "5월", "6월",
  "7월", "8월", "9월", "10월", "11월", "12월",
];

function formatDate(y: number, m: number, d: number) {
  return `${y}.${String(m + 1).padStart(2, "0")}.${String(d).padStart(2, "0")}`;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function DatePicker({ placeholder = "YYYY.MM.DD", onChange, value, className }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [input, setInput] = useState(value || "");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Auto-format as user types: 20241023 → 2024.10.23
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^\d.]/g, "");
    const digits = raw.replace(/\./g, "").slice(0, 8);
    let formatted = digits;
    if (digits.length > 4) formatted = `${digits.slice(0, 4)}.${digits.slice(4)}`;
    if (digits.length > 6) formatted = `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6)}`;
    setInput(formatted);
    onChange?.(formatted);

    // Sync calendar view when date is complete
    if (digits.length === 8) {
      const y = parseInt(digits.slice(0, 4), 10);
      const m = parseInt(digits.slice(4, 6), 10) - 1;
      if (m >= 0 && m <= 11) {
        setViewYear(y);
        setViewMonth(m);
      }
    }
  }

  function handleSelect(y: number, m: number, d: number) {
    const formatted = formatDate(y, m, d);
    setInput(formatted);
    onChange?.(formatted);
    setOpen(false);
  }

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        className={cn(
          "w-full h-11 flex items-center border border-border bg-background transition-colors",
          open ? "border-sage-ink/60" : "hover:border-sage-ink/40"
        )}
      >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          maxLength={10}
          className="flex-1 h-full px-3 text-sm bg-transparent outline-none text-sage-ink placeholder:text-muted-foreground"
        />
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="px-3 h-full text-muted-foreground hover:text-sage-ink transition-colors"
          aria-label="calendar"
        >
          <Calendar size={16} strokeWidth={1.5} />
        </button>
      </div>

      {open && (
        <div className="absolute z-50 top-[calc(100%+2px)] left-0 w-80 border border-border bg-background shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
            <div className="text-sm font-semibold text-sage-ink">
              {viewYear}년 {months[viewMonth]}
            </div>
            <button
              type="button"
              onClick={nextMonth}
              className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {weekdays.map((w, i) => (
              <div
                key={w}
                className={cn(
                  "h-7 flex items-center justify-center text-[10px] font-medium",
                  i === 0 ? "text-sage-deep" : "text-muted-foreground"
                )}
              >
                {w}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = i + 1;
              const dateStr = formatDate(viewYear, viewMonth, d);
              const isSelected = input === dateStr;
              const isToday = todayStr === dateStr;
              const isSunday = (firstDay + i) % 7 === 0;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => handleSelect(viewYear, viewMonth, d)}
                  className={cn(
                    "h-8 flex items-center justify-center text-xs transition-colors",
                    isSelected
                      ? "bg-sage-ink text-background font-medium"
                      : isToday
                      ? "border border-sage-ink text-sage-ink"
                      : isSunday
                      ? "text-sage-deep hover:bg-muted"
                      : "text-sage-ink hover:bg-muted"
                  )}
                >
                  {d}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <button
              type="button"
              onClick={() => {
                setViewYear(today.getFullYear());
                setViewMonth(today.getMonth());
              }}
              className="text-[11px] text-muted-foreground hover:text-sage-ink"
            >
              오늘로 이동
            </button>
            <button
              type="button"
              onClick={() => {
                setInput("");
                onChange?.("");
                setOpen(false);
              }}
              className="text-[11px] text-muted-foreground hover:text-sage-ink"
            >
              초기화
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
