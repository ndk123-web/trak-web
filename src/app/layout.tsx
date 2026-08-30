import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppLayoutShell } from "@/components/AppLayoutShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html
      lang="en"
      className={`dark scroll-smooth ${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#07090e] text-[#ededed] font-sans antialiased min-h-screen selection:bg-emerald-500/30 selection:text-emerald-300">
        <AppLayoutShell>{children}</AppLayoutShell>
      </body>
    </html>
  );
}
