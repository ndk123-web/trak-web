"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TrakConfig } from "@/shared/config";
import {
  Terminal,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  BookOpen,
  Code2,
  ExternalLink,
} from "lucide-react";

export type CommandId = "init" | "list" | "status" | "done" | "undo" | "version";

interface CommandDetail {
  id: CommandId;
  name: string;
  tagline: string;
  description: string;
  syntax: string;
  args: { token: string; label: string; desc: string; optional?: boolean }[];
  flags: { flag: string; type: string; defaultVal: string; description: string }[];
  examples: { cmd: string; title: string; desc: string }[];
  lifecycle: string[];
}

const COMMANDS: CommandDetail[] = [
  {
    id: "init",
    name: "trak init",
    tagline: "Workspace Scaffolding & Materialization",
    description:
      "Fetches official or community blueprints from the registry and deterministically materializes the full curriculum directory tree and exercises on local disk.",
    syntax: "trak init [<author>/]<category>/<tool>[@<version>] [--path <dir>]",
    args: [
      {
        token: "[<author>/]",
        label: "Author Namespace",
        desc: "Optional GitHub username for community tracks (e.g. 'alice/db/postgres'). Omit for official tracks.",
        optional: true,
      },
      {
        token: "<category>",
        label: "Category Pillar",
        desc: "One of the 5 pillars: lang, os, cloud, db, or tool.",
      },
      {
        token: "<tool>",
        label: "Blueprint Identifier",
        desc: "Target tool slug (e.g. go, rust, postgres, docker, aws, linux).",
      },
      {
        token: "[@<version>]",
        label: "Version Pin",
        desc: "Optional tagged release (e.g. @v1.1.0, @v2.0.0). Defaults to latest.",
        optional: true,
      },
      {
        token: "[--path <dir>]",
        label: "Target Path",
        desc: "Custom output directory. Defaults to './learn-<tool>'.",
        optional: true,
      },
    ],
    flags: [
      {
        flag: "-p, --path <string>",
        type: "string",
        defaultVal: "./learn-<tool>",
        description: "Destination folder on your local disk where files will be created.",
      },
      {
        flag: "-h, --help",
        type: "boolean",
        defaultVal: "false",
        description: "Display command synopsis, available arguments, and usage tips.",
      },
    ],
    examples: [
      {
        cmd: "trak init lang/go",
        title: "Official Blueprint Initialization",
        desc: "Generates the official Go curriculum inside ./learn-go in the current folder.",
      },
      {
        cmd: "trak init alice/db/postgres",
        title: "Community Author Track",
        desc: "Fetches community blueprint from users/alice/db/postgres.json in the registry.",
      },
      {
        cmd: "trak init alice/db/postgres@v1.1.0",
        title: "Version-Pinned Release",
        desc: "Pulls stable tagged release postgres@v1.1.0.json, preventing breaking changes.",
      },
      {
        cmd: "trak init lang/rust --path ./my-rust-lab",
        title: "Custom Workspace Path",
        desc: "Materializes the Rust workspace into the custom directory ./my-rust-lab.",
      },
    ],
    lifecycle: [
      "URL Resolution — Resolves official (templates/) or community (users/<author>/) raw URL",
      "AST Validation — Checks JSON schema, max 5MB size limit, and node types",
      "Directory Creation — Recursively creates directory tree on host filesystem",
      "Source Materialization — Writes READMEs, build manifests, code, and exercises (UTF-8)",
      "Metadata Stamping — Records immutable trak.json receipt with version & timestamp",
    ],
  },
  {
    id: "list",
    name: "trak list",
    tagline: "Interactive Catalog Discovery",
    description:
      "Visualizes all 19 official blueprints across 5 categories in a formatted terminal ASCII tree graph with module counts and descriptions.",
    syntax: "trak list [category] [-c, --category <name>] [-a, --all]",
    args: [
      {
        token: "[category]",
        label: "Category Filter",
        desc: "Optional positional argument: lang, os, cloud, db, or tool.",
        optional: true,
      },
    ],
    flags: [
      {
        flag: "-c, --category <name>",
        type: "string",
        defaultVal: "all",
        description: "Filter catalog to a specific pillar (lang, os, cloud, db, tool).",
      },
      {
        flag: "-a, --all",
        type: "boolean",
        defaultVal: "false",
        description: "Display full tree graph with all module branches.",
      },
      {
        flag: "-h, --help",
        type: "boolean",
        defaultVal: "false",
        description: "Display help text and filter usage examples.",
      },
    ],
    examples: [
      {
        cmd: "trak list",
        title: "Discover Full Catalog",
        desc: "Renders summary tree of all 19 blueprints across all 5 engineering categories.",
      },
      {
        cmd: "trak list lang",
        title: "Filter by Positional Argument",
        desc: "Filters output to only programming language tracks (Go, Rust, Python, etc.).",
      },
      {
        cmd: "trak list -c db",
        title: "Filter by Category Flag",
        desc: "Shows only database blueprints (PostgreSQL, Redis, SQL).",
      },
      {
        cmd: "trak list --all",
        title: "Expanded Catalog View",
        desc: "Prints all blueprints with extended metadata and descriptions.",
      },
    ],
    lifecycle: [
      "Catalog Fetch — Queries registry index manifest from GitHub Raw",
      "Filter Evaluation — Applies positional and flag category constraints",
      "Tree Rendering — Draws formatted Unicode branch hierarchy (├──, └──, │)",
      "Module Counts — Displays total module count and difficulty indicator per track",
    ],
  },
  {
    id: "version",
    name: "trak version",
    tagline: "Build Diagnostics & Environment Specs",
    description:
      "Displays active CLI build version, compilation timestamp, Go runtime compiler, host OS/architecture, Git commit hash, and connected registry source.",
    syntax: "trak version",
    args: [],
    flags: [
      {
        flag: "-h, --help",
        type: "boolean",
        defaultVal: "false",
        description: "Display version command help.",
      },
    ],
    examples: [
      {
        cmd: "trak version",
        title: "Print Environment Card",
        desc: `Prints styled ASCII card with version ${TrakConfig.version}, Go runtime, and system architecture.`,
      },
    ],
    lifecycle: [
      "Binary Inspection — Reads embedded compile-time metadata (Version, BuildDate, GitCommit)",
      "Runtime Detection — Queries Go runtime.Version(), host GOOS, and GOARCH",
      "Registry Verification — Confirms active GitHub Raw registry endpoint",
      "Card Output — Formats and prints styled terminal info card to stdout",
    ],
  },
  {
    id: "status",
    name: "trak status",
    tagline: "Workspace Progress & State Inspector",
    description:
      "Inspects the current workspace for trak.json, calculates curriculum progress metrics, renders an ASCII progress bar, and displays detailed module completion states.",
    syntax: "trak status",
    args: [],
    flags: [
      {
        flag: "-h, --help",
        type: "boolean",
        defaultVal: "false",
        description: "Display status command help and options.",
      },
    ],
    examples: [
      {
        cmd: "trak status",
        title: "Inspect Workspace Progress",
        desc: "Displays visual progress dashboard and status checklist of all curriculum modules.",
      },
    ],
    lifecycle: [
      "Workspace Discovery — Searches current working directory for trak.json manifest",
      "State Deserialization — Parses module_breakdown completion map",
      "Progress Calculation — Computes completed vs total modules and exact percentage",
      "Dashboard Output — Renders track metadata, ASCII progress bar, and checklist",
      "Next Step Guidance — Suggests the next pending module to work on",
    ],
  },
  {
    id: "done",
    name: "trak done",
    tagline: "Curriculum Module Completion Marker",
    description:
      "Marks a specific learning module as completed in trak.json, recalculates progress metrics, and provides rewarding completion feedback.",
    syntax: "trak done <module>",
    args: [
      {
        token: "<module>",
        label: "Module Number or Name",
        desc: "Module number (e.g. '00', '1'), keyword (e.g. 'runtime'), or exact folder name.",
      },
    ],
    flags: [
      {
        flag: "-h, --help",
        type: "boolean",
        defaultVal: "false",
        description: "Display done command help.",
      },
    ],
    examples: [
      {
        cmd: "trak done 00",
        title: "Mark by Module Number",
        desc: "Marks Module 00 as complete using numeric prefix.",
      },
      {
        cmd: "trak done 1",
        title: "Padded Prefix Matching",
        desc: "Automatically matches 01-runtime-and-escape-analysis.",
      },
      {
        cmd: "trak complete 02",
        title: "Using Command Alias",
        desc: "Marks Module 02 as complete using the complete alias.",
      },
      {
        cmd: "trak mark goroutines",
        title: "Keyword Matching",
        desc: "Matches module containing 'goroutines' in its folder name.",
      },
    ],
    lifecycle: [
      "Manifest Inspection — Verifies workspace context by locating trak.json",
      "Smart Resolution — Matches module by exact key, numeric prefix, or keyword substring",
      "State Mutation — Flips module completion to true and formats trak.json with 2-space indentation",
      "Metric Recalculation — Computes updated completion count and progress percentage",
      "Rewarding Feedback — Prints completion confirmation, updated progress bar, and next exercise tip",
    ],
  },
  {
    id: "undo",
    name: "trak undo",
    tagline: "Curriculum Module State Reset",
    description:
      "Reverts a previously completed curriculum module back to pending in trak.json, allowing learners to redo exercises or reset progress.",
    syntax: "trak undo <module>",
    args: [
      {
        token: "<module>",
        label: "Module Number or Name",
        desc: "Module number (e.g. '00', '1'), keyword, or exact folder name.",
      },
    ],
    flags: [
      {
        flag: "-h, --help",
        type: "boolean",
        defaultVal: "false",
        description: "Display undo command help.",
      },
    ],
    examples: [
      {
        cmd: "trak undo 01",
        title: "Reset Module by Number",
        desc: "Reverts Module 01 back to pending status.",
      },
      {
        cmd: "trak reset 00",
        title: "Using Reset Alias",
        desc: "Resets Module 00 using the reset alias.",
      },
      {
        cmd: "trak unmark 02",
        title: "Using Unmark Alias",
        desc: "Unmarks Module 02 using the unmark alias.",
      },
    ],
    lifecycle: [
      "Workspace Discovery — Locates trak.json in current directory",
      "Module Resolution — Resolves target module using exact name or fuzzy prefix matching",
      "State Rollback — Reverts module status to false in trak.json",
      "Progress Recalculation — Recalculates workspace metrics and writes indented JSON",
      "Confirmation Output — Prints clean reset confirmation with updated completion percentage",
    ],
  },
];

export function CliMatrixView() {
  const [activeTab, setActiveTab] = useState<CommandId>("init");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const current = COMMANDS.find((c) => c.id === activeTab) || COMMANDS[0];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-10">
      {/* 1. Command Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#0d0f15] border border-white/[0.08] w-fit">
        {COMMANDS.map((cmd) => {
          const isActive = activeTab === cmd.id;
          return (
            <button
              key={cmd.id}
              onClick={() => setActiveTab(cmd.id)}
              className={`px-4 py-2 rounded-lg font-mono text-xs transition-all cursor-pointer flex items-center gap-2 ${
                isActive
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold shadow-sm"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Terminal className={`w-3.5 h-3.5 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
              <span>{cmd.name}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Active Command Header & Syntax Banner */}
      <div className="rounded-xl p-6 sm:p-7 bg-[#0d0f15] border border-white/[0.08] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                {current.name}
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                Core Command
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              {current.tagline}
            </p>
          </div>

          <Link
            href={`/cli/${current.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors w-fit shrink-0"
          >
            <span>Full Manual Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {current.description}
        </p>

        {/* Syntax Box with Copy */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
            Command Syntax
          </div>
          <div className="flex items-center justify-between gap-3 p-3.5 rounded-lg bg-black/50 border border-white/[0.08] font-mono text-xs">
            <div className="flex items-center gap-2 overflow-x-auto text-slate-200">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="select-all">{current.syntax}</span>
            </div>
            <button
              onClick={() => handleCopy(current.syntax, "syntax")}
              className="p-1.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/[0.06] shrink-0"
              title="Copy syntax"
            >
              {copiedKey === "syntax" ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Argument Breakdown (if any) */}
        {current.args.length > 0 && (
          <div className="space-y-2.5 pt-2">
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
              Parameter Breakdown
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {current.args.map((arg, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#080a0f] border border-white/[0.04] space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <code className="text-emerald-400 font-mono font-bold text-[11px]">
                      {arg.token}
                    </code>
                    {arg.optional && (
                      <span className="text-[9px] font-mono text-slate-500 uppercase">
                        optional
                      </span>
                    )}
                  </div>
                  <div className="text-slate-200 font-medium text-[11px]">
                    {arg.label}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug font-sans">
                    {arg.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Flags Reference Table */}
      <div className="rounded-xl p-6 bg-[#0d0f15] border border-white/[0.08] space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>Flags &amp; Options</span>
        </h3>

        <div className="overflow-x-auto rounded-lg border border-white/[0.06]">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/[0.06]">
                <th className="px-4 py-2.5 text-slate-400 font-normal">Flag</th>
                <th className="px-4 py-2.5 text-slate-400 font-normal">Type</th>
                <th className="px-4 py-2.5 text-slate-400 font-normal">Default</th>
                <th className="px-4 py-2.5 text-slate-400 font-normal">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {current.flags.map((f, idx) => (
                <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                  <td className="px-4 py-3 text-emerald-300 font-bold whitespace-nowrap">
                    {f.flag}
                  </td>
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                    {f.type}
                  </td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                    {f.defaultVal}
                  </td>
                  <td className="px-4 py-3 text-slate-300 font-sans leading-relaxed">
                    {f.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Real-World Practical Examples */}
      <div className="rounded-xl p-6 bg-[#0d0f15] border border-white/[0.08] space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span>Practical Examples</span>
        </h3>

        <div className="space-y-3">
          {current.examples.map((ex, idx) => {
            const isCopied = copiedKey === `ex-${idx}`;
            return (
              <div
                key={idx}
                className="p-4 rounded-lg bg-[#080a0f] border border-white/[0.06] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    {ex.title}
                  </span>
                  <button
                    onClick={() => handleCopy(ex.cmd, `ex-${idx}`)}
                    className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/[0.06] text-xs font-mono flex items-center gap-1.5"
                    title="Copy command"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-2.5 rounded bg-black/50 border border-white/[0.04] font-mono text-xs text-slate-200">
                  <span className="text-emerald-400 font-bold">$ </span>
                  {ex.cmd}
                </div>

                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  {ex.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Internal Execution Lifecycle */}
      <div className="rounded-xl p-6 bg-[#0d0f15] border border-white/[0.08] space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Execution Lifecycle (Under the Hood)</span>
        </h3>

        <div className="space-y-2">
          {current.lifecycle.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-2.5 rounded-lg bg-[#080a0f] border border-white/[0.04] text-xs text-slate-300"
            >
              <div className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <span className="leading-relaxed font-sans">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
