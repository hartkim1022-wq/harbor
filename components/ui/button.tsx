import type { ButtonHTMLAttributes } from "react";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`inline-flex h-9 items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3 text-[13px] font-medium shadow-[var(--shadow-soft)] hover:bg-[var(--surface-subtle)] disabled:cursor-not-allowed disabled:opacity-60 ${className}`} {...props} />;
}
