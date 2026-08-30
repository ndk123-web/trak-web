"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Copy, Check, ArrowRight, BookOpen, Layers, Sparkles, CheckCircle2 } from "lucide-react";

interface CliCommandClientProps {
  data: {
    name: string;
    command: string;
    syntax: string;
    overview: string;
    details: string;
    flags: { flag: string; type: string; defaultVal: string; description: string }[];
    lifecycle: string[];
    examples: { cmd: string; title: string; explanation: string }[];
  };
}

export function CliCommandClient({ data }: CliCommandClientProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyCommand = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header Banner */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Link
            href="/cli"
            className="text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
          >
            CLI Commands
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            {data.command}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
          {data.name}
        </h1>

        <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
          {data.overview}
        </p>

        {/* Syntax Box */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-white/10 font-mono text-sm text-emerald-400">
          $ {data.syntax}
        </div>
      </div>

      {/* Deep-Dive Overview */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white">Command Overview</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          {data.details}
        </p>
      </div>

      {/* Execution Lifecycle */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white">Execution Lifecycle</h3>
        <div className="space-y-3">
          {data.lifecycle.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
              <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </div>
              <span className="leading-relaxed mt-0.5">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Flags Reference Table */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white">Available Flags</h3>
        <div className="space-y-3">
          {data.flags.map((f, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-cyan-400 font-bold text-xs">
                  {f.flag}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  Type: <span className="text-slate-300">{f.type}</span> • Default:{" "}
                  <span className="text-slate-300">{f.defaultVal}</span>
                </span>
              </div>
              <p className="text-xs text-slate-300">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Real-World Examples */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-white">Usage Examples</h3>
        <div className="space-y-4">
          {data.examples.map((ex, idx) => {
            const isCopied = copiedIdx === idx;
            return (
              <div key={idx} className="space-y-2">
                <div className="text-xs font-bold text-slate-300">
                  {ex.title}
                </div>
                <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs">
                  <div className="flex items-center gap-2 overflow-x-auto text-slate-200">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span className="select-all">{ex.cmd}</span>
                  </div>
                  <button
                    onClick={() => copyCommand(ex.cmd, idx)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy command"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">{ex.explanation}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
