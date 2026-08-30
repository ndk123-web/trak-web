"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Copy, Check, ArrowRight, Flame, Sparkles, CheckCircle2 } from "lucide-react";

export default function QuickstartPage() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [installMethod, setInstallMethod] = useState<"ps" | "cmd" | "bash" | "go">("ps");

  const copyCode = (code: string, step: number) => {
    navigator.clipboard.writeText(code);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const installCommands = {
    ps: "irm https://raw.githubusercontent.com/ndk123-web/trak/main/scripts/install.ps1 | iex",
    cmd: "powershell -ExecutionPolicy Bypass -Command \"iwr -useb https://raw.githubusercontent.com/ndk123-web/trak/main/scripts/install.ps1 | iex\"",
    bash: "curl -fsSL https://raw.githubusercontent.com/ndk123-web/trak/main/scripts/install.sh | bash",
    go: "go install github.com/ndk123-web/trak@latest",
  };

  const steps = [
    {
      number: "1",
      title: "Install the Trak CLI",
      description: "Choose your preferred installation method below to install the single standalone binary:",
      isInstallStep: true,
      tip: "💡 Tip for Developers: If 'trak' is not recognized immediately in other open terminal tabs, restart your terminal or open a new window so the updated PATH is loaded.",
    },
    {
      number: "2",
      title: "Verify the Installation",
      description: "Verify that Trak is installed properly by checking its version information:",
      command: "trak version",
      tip: "You should see the version card (v1.0.0) with Go runtime and platform specs.",
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
      description: "Materialize a complete, multi-module learning lab on your local disk:",
      command: "trak init lang/go --path ./learn-go",
      tip: "If you omit --path, Trak will default to creating ./learn-go in your current folder.",
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-3">
          <Flame className="w-3.5 h-3.5" />
          <span>Quickstart Guide</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Get Started with Trak in 2 Minutes
        </h1>
        <p className="text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
          Follow these quick steps to install the CLI and materialize your first structured engineering workspace.
        </p>
      </div>

      {/* Video Walkthrough Card */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#080b11] p-4 sm:p-6 space-y-3 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
          <span className="text-xs font-mono font-bold text-white">1-Minute Video Walkthrough (v1.0.0)</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">HD Demo</span>
        </div>
        <div className="rounded-xl overflow-hidden bg-black aspect-video border border-white/[0.06]">
          <video
            src="https://github.com/user-attachments/assets/4210baaf-ef0d-469b-9a8a-f0e244d9b9a3"
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-8">
        {steps.map((s, idx) => {
          const isCopied = copiedStep === idx;
          return (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-6 sm:p-8 relative border border-white/10 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-mono font-black text-sm flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
                  {s.number}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {s.title}
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {s.description}
              </p>

              {s.isInstallStep ? (
                <div className="space-y-3">
                  {/* Tabs */}
                  <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-950 border border-white/[0.06] text-xs font-mono w-fit">
                    <button
                      onClick={() => setInstallMethod("ps")}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        installMethod === "ps"
                          ? "bg-white/[0.1] text-white font-semibold shadow-sm"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      🪟 PowerShell
                    </button>
                    <button
                      onClick={() => setInstallMethod("cmd")}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        installMethod === "cmd"
                          ? "bg-white/[0.1] text-white font-semibold shadow-sm"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      💻 CMD
                    </button>
                    <button
                      onClick={() => setInstallMethod("bash")}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        installMethod === "bash"
                          ? "bg-white/[0.1] text-white font-semibold shadow-sm"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      🐧 🍎 Bash
                    </button>
                    <button
                      onClick={() => setInstallMethod("go")}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        installMethod === "go"
                          ? "bg-white/[0.1] text-white font-semibold shadow-sm"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      🐹 go install
                    </button>
                  </div>

                  {/* Command Box */}
                  <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono">
                    <div className="flex items-center gap-2 overflow-x-auto text-slate-200">
                      <span className="text-emerald-400 font-bold">$</span>
                      <span className="select-all">{installCommands[installMethod]}</span>
                    </div>
                    <button
                      onClick={() => copyCode(installCommands[installMethod], idx)}
                      className="shrink-0 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Copy command"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* Standard Step Code Box */
                <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono">
                  <div className="flex items-center gap-2 overflow-x-auto text-slate-200">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span className="select-all">{s.command}</span>
                  </div>
                  <button
                    onClick={() => copyCode(s.command!, idx)}
                    className="shrink-0 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy command"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}

              {s.tip && (
                <div className="flex items-start gap-2 text-xs text-slate-400 bg-white/5 p-3 rounded-lg border border-white/5">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{s.tip}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Next Steps Banner */}
      <div className="glass-panel rounded-2xl p-8 border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold text-white">
            Explore All 19 Blueprints
          </h4>
          <p className="text-xs text-slate-400 mt-1 max-w-md">
            Check out complete track syllabi for Rust, Python, TypeScript, Linux, AWS, PostgreSQL, Redis, Kubernetes, and more.
          </p>
        </div>

        <Link
          href="/tracks"
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2 shrink-0"
        >
          <span>Browse Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
