import type { Metadata } from "next";
import "./globals.css";
import { AppLayoutShell } from "@/components/AppLayoutShell";

export const metadata: Metadata = {
  title: "Trak • Developer Learning Workspace Generator CLI",
  description: "Materialize structured, in-depth learning workspaces with production code, configurations, and cheatsheets directly on your filesystem with a single command.",
  icons: {
    icon: "/trak.png",
    shortcut: "/trak.png",
    apple: "/trak.png",
  },
  keywords: [
    "trak",
    "cli",
    "developer learning",
    "golang",
    "rust",
    "kubernetes",
    "docker",
    "terraform",
    "postgres",
    "curriculum",
    "devops",
  ],
  authors: [{ name: "Navnath Kadam", url: "https://github.com/ndk123-web" }],
  openGraph: {
    title: "Trak - Developer Learning Workspace Generator",
    description: "Materialize 19 production-grade learning blueprints with 350+ hands-on modules directly on your filesystem.",
    url: "https://github.com/ndk123-web/trak",
    siteName: "Trak CLI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#07090e] text-slate-100 antialiased min-h-screen selection:bg-emerald-500/30 selection:text-emerald-300">
        <AppLayoutShell>{children}</AppLayoutShell>
      </body>
    </html>
  );
}
