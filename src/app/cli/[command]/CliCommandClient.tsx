"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  Copy,
  Check,
  ArrowRight,
  BookOpen,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Cpu,
  ShieldCheck,
  Code2,
  Sparkles,
} from "lucide-react";

interface CliCommandClientProps {
  data: {
    name: string;
    command: string;
    syntax: string;
    aliases?: string[];
    overview: string;
    details: string;
    subcommands?: {
      cmd: string;
      aliases?: string[];
      description: string;
      example: string;
    }[];
    runtimes?: {
      name: string;
      track: string;
      testRunner: string;
      executables: string[];
      localNote: string;
    }[];
    flags: { flag: string; type: string; defaultVal: string; description: string }[];
    lifecycle: string[];
    examples: { cmd: string; title: string; explanation: string }[];
    important?: { title: string; text: string }[];
    faq?: { question: string; answer: string }[];
  };
}

export function CliCommandClient({ data }: CliCommandClientProps) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedSubIdx, setCopiedSubIdx] = useState<number | null>(null);

  const copyCommand = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const copySubCommand = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedSubIdx(idx);
    setTimeout(() => setCopiedSubIdx(null), 2000);
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

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
            {data.name}
          </h1>
          {data.aliases && data.aliases.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[11px] font-mono text-slate-500">Aliases:</span>
              {data.aliases.map((al, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold"
                >
                  trak {al}
                </span>
              ))}
            </div>
          )}
        </div>

        <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
          {data.overview}
        </p>

        {/* Syntax Box */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-white/10 font-mono text-sm text-emerald-400 flex items-center justify-between gap-3">
          <div className="overflow-x-auto select-all">
            $ {data.syntax}
          </div>
        </div>
      </div>

      {/* Deep-Dive Overview */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <span>Command Overview</span>
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          {data.details}
        </p>
      </div>

      {/* Smart Module Resolution Feature Card (verify, done, undo) */}
      {["verify", "done", "undo"].includes(data.command) && (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-5 border-emerald-500/20 bg-emerald-500/[0.03]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>Smart Module Resolution (No Full Names Required)</span>
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium w-fit">
              Prefix &amp; Fuzzy Matching
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Typing or copying full folder names like <code className="text-white font-mono bg-white/5 px-1.5 py-0.5 rounded text-xs">00-setup-toolchain-and-first-program</code> is completely optional. Trak CLI automatically resolves module targets through 4 multi-tier matching rules:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400">
                01. Numeric Prefix
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Type unpadded numbers or numeric prefixes. Trak normalizes leading zeros and trailing hyphens.
              </p>
              <div className="font-mono text-xs text-slate-300 bg-black/50 p-2.5 rounded-lg border border-white/5 space-y-1">
                <div><span className="text-emerald-400 font-bold">$</span> trak {data.command} 00</div>
                <div><span className="text-emerald-400 font-bold">$</span> trak {data.command} 00-</div>
                <div><span className="text-emerald-400 font-bold">$</span> trak {data.command} 1</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400">
                02. Shell Tab-Completion
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Terminal tab-completion with relative paths and trailing slashes (<code className="text-slate-300">.\</code> or <code className="text-slate-300">/</code>) is cleanly sanitized.
              </p>
              <div className="font-mono text-xs text-slate-300 bg-black/50 p-2.5 rounded-lg border border-white/5 space-y-1">
                <div><span className="text-emerald-400 font-bold">$</span> trak {data.command} .\00-setup*\</div>
                <div><span className="text-emerald-400 font-bold">$</span> trak {data.command} 01-var*/</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400">
                03. Keyword Search
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Type any distinct keyword or topic from the module name. Case-insensitive substring matching.
              </p>
              <div className="font-mono text-xs text-slate-300 bg-black/50 p-2.5 rounded-lg border border-white/5 space-y-1">
                <div><span className="text-emerald-400 font-bold">$</span> trak {data.command} toolchain</div>
                <div><span className="text-emerald-400 font-bold">$</span> trak {data.command} pointer</div>
                <div><span className="text-emerald-400 font-bold">$</span> trak {data.command} memory</div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 text-xs text-slate-400 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-200">Ambiguity Guard:</strong> If a keyword matches multiple modules (for example, typing a generic query like <code className="text-slate-300 font-mono">test</code>), Trak stops execution safely, displays all matching module candidates in your terminal, and prompts you to specify.
            </span>
          </div>
        </div>
      )}

      {/* Supported Runtimes (if present, e.g. for verify) */}
      {data.runtimes && data.runtimes.length > 0 && (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <span>Supported Language Verification Runtimes</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {data.runtimes.length} Automated Tracks
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Trak automatically detects the required toolchains in your system PATH and executes native test harnesses with zero external configuration.
          </p>

          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/10 text-slate-400">
                  <th className="px-4 py-3 font-semibold">Language</th>
                  <th className="px-4 py-3 font-semibold">Track Pattern</th>
                  <th className="px-4 py-3 font-semibold">Required Binary</th>
                  <th className="px-4 py-3 font-semibold">Test Runner</th>
                  <th className="px-4 py-3 font-semibold">Architecture Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {data.runtimes.map((rt, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 text-white font-bold whitespace-nowrap">
                      {rt.name}
                    </td>
                    <td className="px-4 py-3 text-emerald-400 whitespace-nowrap">
                      {rt.track}
                    </td>
                    <td className="px-4 py-3 text-slate-300 whitespace-nowrap">
                      {rt.executables.join(" / ")}
                    </td>
                    <td className="px-4 py-3 text-slate-200 whitespace-nowrap">
                      <code className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-emerald-300">
                        {rt.testRunner}
                      </code>
                    </td>
                    <td className="px-4 py-3 text-slate-400 font-sans leading-relaxed text-[11px]">
                      {rt.localNote}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subcommands (if present, e.g. verify allowlists) */}
      {data.subcommands && data.subcommands.length > 0 && (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <span>Subcommands</span>
          </h3>
          <div className="space-y-4">
            {data.subcommands.map((sub, idx) => {
              const isCopied = copiedSubIdx === idx;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-950 border border-white/10 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <code className="text-emerald-400 font-mono font-bold text-sm">
                      {sub.cmd}
                    </code>
                    {sub.aliases && sub.aliases.length > 0 && (
                      <span className="text-[11px] font-mono text-slate-400">
                        Aliases:{" "}
                        <span className="text-slate-300">
                          {sub.aliases.join(", ")}
                        </span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {sub.description}
                  </p>
                  <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-xs">
                    <div className="flex items-center gap-2 overflow-x-auto text-slate-200">
                      <span className="text-emerald-400 font-bold">$</span>
                      <span className="select-all">{sub.example}</span>
                    </div>
                    <button
                      onClick={() => copySubCommand(sub.example, idx)}
                      className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                      title="Copy subcommand"
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
      )}

      {/* Execution Lifecycle */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-400" />
          <span>Execution Lifecycle</span>
        </h3>
        <div className="space-y-3">
          {data.lifecycle.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
              <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </div>
              <span className="leading-relaxed mt-0.5 font-sans">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Flags Reference Table */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <span>Available Flags</span>
        </h3>
        <div className="space-y-3">
          {data.flags.map((f, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-emerald-400 font-bold text-xs">
                  {f.flag}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  Type: <span className="text-slate-300">{f.type}</span> • Default:{" "}
                  <span className="text-slate-300">{f.defaultVal}</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Real-World Examples */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-emerald-400" />
          <span>Usage Examples</span>
        </h3>
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
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{ex.explanation}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Important Technical Notices */}
      {data.important && data.important.length > 0 && (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4 border-white/10 bg-white/[0.02]">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-emerald-400" />
            <span>Important Technical Guidelines</span>
          </h3>
          <div className="grid grid-cols-1 gap-4 pt-1">
            {data.important.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-1.5"
              >
                <div className="text-xs font-bold text-white font-mono">
                  {item.title}
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Frequently Asked Questions (FAQ) */}
      {data.faq && data.faq.length > 0 && (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <span>Frequently Asked Questions (FAQ)</span>
          </h3>
          <div className="space-y-4">
            {data.faq.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-950 border border-white/5 space-y-2"
              >
                <div className="text-xs sm:text-sm font-bold text-white font-sans flex items-start gap-2">
                  <span className="text-emerald-400 font-mono font-bold shrink-0">
                    Q:
                  </span>
                  <span>{item.question}</span>
                </div>
                <div className="text-xs text-slate-300 font-sans leading-relaxed pl-5">
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
