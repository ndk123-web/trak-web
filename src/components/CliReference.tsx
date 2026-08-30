"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, Code, BookMarked, HelpCircle } from "lucide-react";

export function CliReference() {
  const [activeCmd, setActiveCmd] = useState<"init" | "list" | "version">("init");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCommand = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const commands = {
    init: {
      title: "trak init",
      syntax: "trak init <category>/<template> [flags]",
      description:
        "Downloads and materializes the requested curriculum blueprint directly on disk. If --path is omitted, creates ./learn-<template> in the current directory.",
      flags: [
        { flag: "-p, --path <string>", desc: "Destination folder path (default: ./learn-<template>)" },
        { flag: "-h, --help", desc: "Display detailed help and real-world examples" },
      ],
      examples: [
        { code: "trak init lang/go", desc: "Materialize Go workspace in ./learn-go" },
        { code: "trak init db/postgres --path ./postgres-lab", desc: "Materialize in custom directory" },
        { code: "trak init tool/docker", desc: "Materialize Docker & container architecture track" },
        { code: "trak init cloud/aws", desc: "Materialize AWS Cloud solutions track" },
        { code: "trak init os/linux", desc: "Materialize Linux systems administration track" },
      ],
    },
    list: {
      title: "trak list",
      syntax: "trak list [category] [flags]",
      description:
        "Renders a formatted ASCII tree visualization of all available tracks or drills down into a specific category.",
      flags: [
        { flag: "-c, --category <string>", desc: "Filter by category (lang, os, cloud, db, tool)" },
        { flag: "-a, --all", desc: "Display the entire catalog tree" },
        { flag: "-h, --help", desc: "Display list command usage instructions" },
      ],
      examples: [
        { code: "trak list", desc: "Display the full interactive catalog tree" },
        { code: "trak list lang", desc: "List only programming language tracks" },
        { code: "trak list os", desc: "List Operating System tracks (Linux, macOS, Windows)" },
        { code: "trak list db", desc: "List Database tracks (PostgreSQL, Redis, SQL)" },
        { code: "trak list tool", desc: "List DevOps tools (Docker, K8s, Git, Terraform, etc.)" },
      ],
    },
    version: {
      title: "trak version",
      syntax: "trak version",
      description:
        "Displays the active CLI version, build timestamp, Go runtime version, host OS/architecture, and connected registry source.",
      flags: [{ flag: "-h, --help", desc: "Display version command help" }],
      examples: [
        { code: "trak version", desc: "Inspect CLI build and runtime specifications" },
      ],
    },
  };

  const current = commands[activeCmd];

  return (
    <section id="cli-reference" className="py-20 bg-[#07090e] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Developer CLI Reference</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Command Line Manual
          </h2>
          <p className="text-slate-400 mt-3 text-base sm:text-lg">
            Quick reference for all available subcommands and flags.
          </p>
        </div>

        {/* Command Selector Tabs */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            {(["init", "list", "version"] as const).map((cmd) => (
              <button
                key={cmd}
                onClick={() => setActiveCmd(cmd)}
                className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  activeCmd === cmd
                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5"
                }`}
              >
                trak {cmd}
              </button>
            ))}
          </div>

          {/* Reference Box */}
          <div className="mt-8 glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
            {/* Command Title & Syntax */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white font-mono">
                  {current.title}
                </span>
                <span className="text-xs font-mono text-emerald-400">
                  Subcommand
                </span>
              </div>
              <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-white/5 font-mono text-xs text-emerald-400">
                $ {current.syntax}
              </div>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Flags */}
            <div className="pt-4 border-t border-white/5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                Flags & Options
              </h4>
              <div className="space-y-2">
                {current.flags.map((f, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs"
                  >
                    <span className="font-mono text-cyan-400 font-semibold">
                      {f.flag}
                    </span>
                    <span className="text-slate-400">{f.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Examples List */}
            <div className="pt-4 border-t border-white/5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                Examples
              </h4>
              <div className="space-y-2.5">
                {current.examples.map((ex, idx) => {
                  const isCopied = copiedIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-950 border border-white/5 text-xs font-mono"
                    >
                      <div className="flex items-center gap-2 overflow-x-auto">
                        <span className="text-emerald-400 font-bold">$</span>
                        <span className="text-slate-200 select-all">{ex.code}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="hidden md:inline text-[11px] text-slate-500">
                          # {ex.desc}
                        </span>
                        <button
                          onClick={() => copyCommand(ex.code, idx)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                          title="Copy example"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
