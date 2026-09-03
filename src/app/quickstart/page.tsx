"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Copy, Check, Sparkles, Flame, CheckCircle2, ArrowRight } from "lucide-react";
import { TrakConfig } from "@/shared/config";

export default function QuickstartPage() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [installMethod, setInstallMethod] = useState<"ps" | "cmd" | "bash" | "go">("ps");

  const installCommands = {
    ps: "irm https://raw.githubusercontent.com/ndk123-web/trak/main/scripts/install.ps1 | iex",
    cmd: "powershell -Command \"irm https://raw.githubusercontent.com/ndk123-web/trak/main/scripts/install.ps1 | iex\"",
    bash: "curl -fsSL https://raw.githubusercontent.com/ndk123-web/trak/main/scripts/install.sh | bash",
    go: "go install github.com/ndk123-web/trak@latest",
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(index);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const steps = [
    {
      number: "1",
      title: "Install the Trak CLI",
      description: "Choose your operating system and run the single automated installer one-liner:",
      isInstallStep: true,
      tip: "The installer places trak into your PATH so you can call it anywhere.",
    },
    {
      number: "2",
      title: "Verify the Installation",
      description: "Verify that Trak is installed properly by checking its version information:",
      command: "trak version",
      tip: `You should see the version card (${TrakConfig.version}) with Go runtime and platform specs.`,
    },
    {
      number: "3",
      title: "Explore the Learning Catalog",
      description: "Browse the 19 available learning blueprints across 5 categories in a tree layout:",
      command: "trak list",
      tip: "You can also filter by category: 'trak list lang' or 'trak list os'.",
    },
    {
      number: "4",
      title: "Initialize Your First Learning Workspace",
      description: "Materialize an official or community learning lab on your local disk:",
      command: "trak init lang/go --path ./learn-go",
      tip: "Supports official tracks (lang/go), community tracks (alice/db/postgres), and pinned versions (alice/db/postgres@v2.0.0).",
    },
    {
      number: "5",
      title: "Open and Start Learning Hands-On",
      description: "Navigate into the workspace and open it in VS Code, GoLand, or Neovim:",
      command: "cd ./learn-go && code .",
      tip: "Read README.md and start completing code exercises in Module 00!",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-3">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>Quickstart Guide</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-normal text-white tracking-tight">
          Get Started with Trak in 2 Minutes
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed font-sans">
          Follow these quick steps to install the CLI and materialize your first structured engineering workspace.
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-6">
        {steps.map((s, idx) => {
          const isCopied = copiedStep === idx;
          return (
            <div
              key={idx}
              className="rounded-xl p-5 sm:p-6 bg-[#0d0f15] border border-white/[0.08] hover:border-emerald-500/20 transition-colors space-y-3.5"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {s.number}
                </div>
                <h3 className="text-base font-bold text-white">
                  {s.title}
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {s.description}
              </p>

              {s.isInstallStep ? (
                <div className="space-y-2.5">
                  {/* Tabs */}
                  <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-black/40 border border-white/[0.06] text-xs font-mono w-fit">
                    <button
                      onClick={() => setInstallMethod("ps")}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        installMethod === "ps"
                          ? "bg-white/[0.12] text-white font-semibold"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      PowerShell
                    </button>
                    <button
                      onClick={() => setInstallMethod("cmd")}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        installMethod === "cmd"
                          ? "bg-white/[0.12] text-white font-semibold"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      CMD
                    </button>
                    <button
                      onClick={() => setInstallMethod("bash")}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        installMethod === "bash"
                          ? "bg-white/[0.12] text-white font-semibold"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      Bash / Linux / macOS
                    </button>
                    <button
                      onClick={() => setInstallMethod("go")}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        installMethod === "go"
                          ? "bg-white/[0.12] text-white font-semibold"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      go install
                    </button>
                  </div>

                  {/* Command Box */}
                  <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-[#080a0f] border border-white/[0.08] text-xs font-mono">
                    <div className="flex items-center gap-2 overflow-x-auto text-slate-200">
                      <span className="text-emerald-400 font-bold">$</span>
                      <span className="select-all whitespace-nowrap">
                        {installCommands[installMethod]}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(installCommands[installMethod], idx)}
                      className="shrink-0 p-1.5 rounded bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/[0.06]"
                      title="Copy install command"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-[#080a0f] border border-white/[0.08] text-xs font-mono">
                  <div className="flex items-center gap-2 overflow-x-auto text-slate-200">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span className="select-all whitespace-nowrap">
                      {s.command}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(s.command!, idx)}
                    className="shrink-0 p-1.5 rounded bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/[0.06]"
                    title="Copy command"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                </div>
              )}

              {/* Tip text */}
              <div className="text-[11px] font-mono text-slate-500 pt-1">
                💡 <span className="text-slate-400">{s.tip}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Next Steps */}
      <div className="p-6 rounded-xl bg-[#0d0f15] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-white">
            Ready to explore specific technologies?
          </h4>
          <p className="text-xs text-slate-400 font-sans">
            Browse the full curriculum index with all 19 tracks across Go, Rust, Python, Docker, and Linux.
          </p>
        </div>

        <Link
          href="/tracks"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-zinc-950 text-xs font-mono font-bold hover:bg-slate-200 transition-colors shrink-0"
        >
          <span>Explore All Tracks</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
