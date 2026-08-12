import type { ButtonHTMLAttributes } from "react";

export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-[#dfe1dc] bg-white px-3 text-[13px] font-medium shadow-[0_1px_1px_rgba(0,0,0,.03)] transition hover:bg-[#f7f7f5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#174b3e] ${className}`} {...props} />;
}
