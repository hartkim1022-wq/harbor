import type { HTMLAttributes } from "react";

export function Badge({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={`inline-flex items-center rounded-full bg-[#edf3ef] px-2 py-1 text-[11px] font-medium text-[#285b4a] ${className}`} {...props} />;
}
