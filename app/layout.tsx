import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Harbor — Financial clarity, forward",
  description: "A personal financial operating system for understanding what you own, owe, and can do next.",
  icons: { icon: "/branding/harbor-favicon.svg", shortcut: "/branding/harbor-favicon.svg", apple:"/branding/harbor-app-icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><meta name="theme-color" content="#0F2134"/><script dangerouslySetInnerHTML={{__html:`try{var p=localStorage.getItem('harbor-theme')||'system';var d=p==='dark'||(p==='system'&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.dataset.theme=d?'dark':'light'}catch(e){}`}}/></head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
