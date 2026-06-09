"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SignaturePadProps {
  onChange?: (dataUrl: string | null) => void;
  className?: string;
}

export function SignaturePad({ onChange, className }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const [isEmpty, setIsEmpty] = useState(true);

  function getPos(e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function startDrawing(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    isDrawing.current = true;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e.nativeEvent, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    e.preventDefault();
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1c2b1e";
    const pos = getPos(e.nativeEvent, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setIsEmpty(false);
    onChange?.(canvas.toDataURL());
    e.preventDefault();
  }

  function stopDrawing() {
    isDrawing.current = false;
  }

  function clear() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
    onChange?.(null);
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative border border-border bg-white overflow-hidden">
        <canvas
          ref={canvasRef}
          width={700}
          height={180}
          className="w-full touch-none cursor-crosshair block"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {isEmpty && (
          <div className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none">
            <span className="text-[11px] text-muted-foreground/40 select-none tracking-wide">
              이곳에 서명하세요
            </span>
          </div>
        )}
        {/* 서명 기준선 */}
        <div className="absolute left-6 right-6 border-b border-border/50" style={{ bottom: 28 }} />
      </div>
      <button
        type="button"
        onClick={clear}
        className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
      >
        지우기
      </button>
    </div>
  );
}
