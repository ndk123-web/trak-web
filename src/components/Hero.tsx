"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import { TrakConfig } from "@/shared/config";

export function Hero() {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [installMethod, setInstallMethod] = useState<
    "powershell" | "cmd" | "bash" | "go"
  >("powershell");

  const installCommands = {
    powershell:
      "irm https://raw.githubusercontent.com/ndk123-web/trak/main/scripts/install.ps1 | iex",
    cmd: 'powershell -ExecutionPolicy Bypass -Command "iwr -useb https://raw.githubusercontent.com/ndk123-web/trak/main/scripts/install.ps1 | iex"',
    bash: "curl -fsSL https://raw.githubusercontent.com/ndk123-web/trak/main/scripts/install.sh | bash",
    go: "go install github.com/ndk123-web/trak@latest",
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <section className="relative pt-8 pb-2 lg:pt-12 lg:pb-4 border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean, Minimalist Text Row */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-400 mb-5 select-none">
          <span className="text-slate-200 font-semibold">Trak {TrakConfig.version}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">19 Curated Blueprints + Community GitOps</span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">Offline & Filesystem Based</span>
        </div>

        {/* Main Headline & Simple Value Proposition */}
        <div className="max-w-3xl space-y-3">
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-[40px] font-normal tracking-[-0.015em] text-[#f5f4ef] leading-[1.2]">
            Generate hands-on learning workspaces{" "}
            <span className="italic font-serif text-emerald-400 font-normal">
              in your terminal.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed max-w-2xl font-normal">
            A developer CLI tool that scaffolds structured, multi-module project folders directly onto your computer—complete with runnable code examples, exercises, and reference notes.
          </p>
        </div>

        {/* Installation Bar */}
        <div className="mt-8 max-w-3xl space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono text-slate-400 font-medium">
              Installation:
            </span>
            <div className="flex flex-wrap items-center gap-1 text-[11px] font-mono">
              <button
                onClick={() => setInstallMethod("powershell")}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  installMethod === "powershell"
                    ? "bg-white/[0.1] text-white font-semibold"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                PowerShell
              </button>
              <button
                onClick={() => setInstallMethod("cmd")}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  installMethod === "cmd"
                    ? "bg-white/[0.1] text-white font-semibold"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                CMD
              </button>
              <button
                onClick={() => setInstallMethod("bash")}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  installMethod === "bash"
                    ? "bg-white/[0.1] text-white font-semibold"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Bash / Zsh
              </button>
              <button
                onClick={() => setInstallMethod("go")}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  installMethod === "go"
                    ? "bg-white/[0.1] text-white font-semibold"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Go Install
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950 border border-white/[0.08] text-xs font-mono">
            <div className="flex items-center gap-2 overflow-x-auto text-slate-200">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="select-all whitespace-nowrap">
                {installCommands[installMethod]}
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(installCommands[installMethod])}
              className="shrink-0 p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/[0.06]"
              title="Copy installation command"
            >
              {copiedInstall ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] font-mono text-slate-500">
            <span>Restart terminal after running to reload PATH</span>
            <Link
              href="/quickstart"
              className="text-emerald-400 hover:underline"
            >
              View Quickstart Guide →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
