import type { HTMLAttributes } from "react";

export function Badge({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={`inline-flex items-center rounded-full bg-[var(--surface-glacier)] px-2 py-1 text-[11px] font-medium text-[var(--text-accent)] ${className}`} {...props} />;
}
