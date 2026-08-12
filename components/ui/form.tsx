import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) { return <label className="block"><span className="mb-1.5 flex justify-between text-[11px] font-medium text-[#4f5752]">{label}{hint && <span className="font-normal text-[#969b98]">{hint}</span>}</span>{children}</label>; }
const base = "h-10 w-full rounded-lg border border-[#dfe1dd] bg-white px-3 text-[13px] outline-none transition placeholder:text-[#a7aca8] focus:border-[#6d8d81] focus:ring-2 focus:ring-[#dce8e3]";
export function Input(props: InputHTMLAttributes<HTMLInputElement>) { return <input {...props} className={`${base} ${props.className ?? ""}`} />; }
export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) { return <select {...props} className={`${base} ${props.className ?? ""}`} />; }
export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) { return <textarea {...props} className={`${base} h-20 py-2.5 ${props.className ?? ""}`} />; }
