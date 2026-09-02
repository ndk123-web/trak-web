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
      syntax: "trak init [<author>/]<category>/<template>[@<version>] [flags]",
      description:
        "Downloads and materializes the requested official or community blueprint directly onto local disk. If --path is omitted, creates ./learn-<template> in the current directory.",
      flags: [
        { flag: "-p, --path <string>", desc: "Destination folder path (default: ./learn-<template>)" },
        { flag: "-h, --help", desc: "Display detailed help and real-world examples" },
      ],
      examples: [
        { code: "trak init lang/go", desc: "Official Go curriculum in ./learn-go" },
        { code: "trak init alice/db/postgres", desc: "Community track authored by @alice" },
        { code: "trak init alice/db/postgres@v2.0.0", desc: "Pinned v2.0.0 release without breaking existing setups" },
        { code: "trak init db/postgres --path ./postgres-lab", desc: "Materialize in custom directory" },
        { code: "trak init tool/docker", desc: "Docker & container architecture track" },
        { code: "trak init cloud/aws", desc: "AWS Cloud solutions track" },
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
    <section id="cli-reference" className="pt-8 space-y-6">
      <div className="pb-4 border-b border-white/[0.08]">
        <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#f5f4ef] tracking-tight">
          Interactive Command Reference
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-1 font-sans">
          Quick syntax manual, flags, and copyable examples for all subcommands.
        </p>
      </div>

      {/* Command Selector Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          {(["init", "list", "version"] as const).map((cmd) => (
            <button
              key={cmd}
              onClick={() => setActiveCmd(cmd)}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-medium transition-colors cursor-pointer ${
                activeCmd === cmd
                  ? "bg-white text-zinc-950 font-bold"
                  : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-slate-200 border border-white/[0.06]"
              }`}
            >
              trak {cmd}
            </button>
          ))}
        </div>

        {/* Reference Box */}
        <div className="rounded-xl p-5 sm:p-6 bg-[#0d0f15] border border-white/[0.08] space-y-5">
          {/* Command Title & Syntax */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white font-mono">
                {current.title}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Subcommand
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/50 border border-white/[0.06] font-mono text-xs text-slate-200">
              <span className="text-emerald-400 font-bold">$ </span>{current.syntax}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1">
              {current.description}
            </p>
          </div>

          {/* Flags */}
          <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Flags &amp; Options
            </h4>
            <div className="space-y-1.5">
              {current.flags.map((f, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-lg bg-[#080a0f] border border-white/[0.06] text-xs font-mono"
                >
                  <span className="text-emerald-300 font-medium">
                    {f.flag}
                  </span>
                  <span className="text-slate-400 font-sans text-xs">{f.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Examples List */}
          <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Copyable Examples
            </h4>
            <div className="space-y-2">
              {current.examples.map((ex, idx) => {
                const isCopied = copiedIndex === idx;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-[#080a0f] border border-white/[0.06] text-xs font-mono"
                  >
                    <div className="flex items-center gap-2 overflow-x-auto">
                      <span className="text-emerald-400 font-bold">$</span>
                      <span className="text-slate-200 select-all">{ex.code}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden md:inline text-[11px] text-slate-500 font-sans">
                        # {ex.desc}
                      </span>
                      <button
                        onClick={() => copyCommand(ex.code, idx)}
                        className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/[0.06]"
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
    </section>
  );
}
