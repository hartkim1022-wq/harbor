"use client";
import type { ReactNode } from "react";

export function Dialog({ title, description, children, onClose }: { title: string; description: string; children: ReactNode; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 grid place-items-end p-0 sm:place-items-center sm:p-6">
    <button className="absolute inset-0 h-full w-full bg-[rgba(7,18,28,.56)] backdrop-blur-[2px]" onClick={onClose} aria-label="Close dialog" />
    <div role="dialog" aria-modal="true" aria-labelledby="dialog-title" className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5 shadow-[var(--shadow-soft)] sm:max-w-[560px] sm:rounded-[var(--radius-lg)] sm:p-7">
      <div className="flex items-start justify-between gap-4"><div><h2 id="dialog-title" className="text-[20px] font-semibold tracking-[-.03em]">{title}</h2><p className="mt-1 text-[12px] leading-5 text-[var(--text-muted)]">{description}</p></div><button onClick={onClose} className="grid size-8 shrink-0 place-items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-elevated)] text-[var(--text-muted)]" aria-label="Close">×</button></div>
      <div className="mt-6">{children}</div>
    </div>
  </div>;
}
