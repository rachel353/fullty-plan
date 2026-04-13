"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label?: string;
  accept?: string;
  className?: string;
}

export function FileUpload({ label, accept = "image/*,.pdf", className }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    if (f.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  }

  function handleRemove() {
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  }

  if (file) {
    return (
      <div className={cn("border border-border bg-background", className)}>
        <div className="flex items-center gap-3 p-3">
          {preview ? (
            <img src={preview} alt="" className="w-16 h-16 object-cover flex-shrink-0" />
          ) : (
            <div className="w-16 h-16 bg-muted flex items-center justify-center flex-shrink-0">
              <FileText size={20} className="text-muted-foreground" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{file.name}</div>
            <div className="text-[11px] text-muted-foreground mt-0.5">
              {formatSize(file.size)} · {file.type.split("/")[1]?.toUpperCase()}
            </div>
            <div className="flex items-center gap-1 mt-1.5">
              <div className="h-1 flex-1 bg-sage-deep" />
              <span className="text-[10px] text-sage-deep font-medium">완료</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="p-1.5 hover:bg-muted transition-colors flex-shrink-0"
          >
            <X size={14} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="border border-dashed border-border hover:border-sage-ink/40 h-24 flex flex-col items-center justify-center gap-2 transition-colors bg-background">
        <Upload size={16} className="text-muted-foreground" />
        <div className="text-[11px] text-muted-foreground">
          {label || "클릭하여 파일 업로드"} <span className="text-sage-deep">찾아보기</span>
        </div>
        <div className="text-[10px] text-muted-foreground">
          PDF / JPG / PNG · 최대 10MB
        </div>
      </div>
    </div>
  );
}
