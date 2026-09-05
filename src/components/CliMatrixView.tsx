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

export type CommandId = "init" | "list" | "next" | "verify" | "done" | "undo" | "status" | "version";

interface CommandDetail {
  id: CommandId;
  name: string;
  tagline: string;
  description: string;
  syntax: string;
  aliases?: string[];
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
    id: "next",
    name: "trak next",
    tagline: "Sequential Exercise & Curriculum Navigator",
    description:
      "Inspects trak.json, determines the next sequential incomplete module, and displays its folder path, overview, files, and navigation commands.",
    syntax: "trak next [flags]",
    args: [],
    flags: [
      {
        flag: "-o, --open",
        type: "boolean",
        defaultVal: "false",
        description: "Automatically open the next module directory in VS Code or default editor.",
      },
      {
        flag: "-h, --help",
        type: "boolean",
        defaultVal: "false",
        description: "Display next command help and examples.",
      },
    ],
    examples: [
      {
        cmd: "trak next",
        title: "Identify Next Pending Exercise",
        desc: "Resolves the next module in sorted order and prints starter command.",
      },
      {
        cmd: "trak next --open",
        title: "Launch Directly in VS Code",
        desc: "Opens the next module workspace folder directly in your editor.",
      },
    ],
    lifecycle: [
      "Workspace Verification — Confirms trak.json exists in active working directory",
      "Deterministic Sorting — Sorts module keys alphabetically and numerically",
      "State Scan — Finds the first module where completion status is false",
      "Metadata Extraction — Reads module README overview snippet and file entries",
      "Terminal Card Output — Renders module name, track progress bar, and cd command",
      "Optional Editor Launch — Spawns code editor if --open flag is supplied",
    ],
  },
  {
    id: "verify",
    name: "trak verify",
    tagline: "Automated Native Test Verification & Progress Sync",
    description:
      "Executes native language test suites against your local exercise code, validates test assertions, and automatically marks completed modules in trak.json.",
    syntax: "trak verify [module] [-a, --all] [-d, --detail] [-l, --list]",
    aliases: ["test", "check"],
    args: [
      {
        token: "[module]",
        label: "Target Module",
        desc: "Optional module number ('00', '1'), keyword ('escape'), or full folder name. If omitted, tests the current pending module.",
        optional: true,
      },
    ],
    flags: [
      {
        flag: "-a, --all",
        type: "boolean",
        defaultVal: "false",
        description: "Run automated test suites sequentially across all modules in the workspace.",
      },
      {
        flag: "-d, --detail",
        type: "boolean",
        defaultVal: "false",
        description: "Print full compiler and assertion failure logs when a module fails.",
      },
      {
        flag: "-l, --list",
        type: "boolean",
        defaultVal: "false",
        description: "List all 7 supported language runtimes and local PATH toolchain status.",
      },
      {
        flag: "-h, --help",
        type: "boolean",
        defaultVal: "false",
        description: "Display verify command synopsis, options, and examples.",
      },
    ],
    examples: [
      {
        cmd: "trak verify",
        title: "Verify Current Exercise",
        desc: "Detects and tests the active pending module in the curriculum.",
      },
      {
        cmd: "trak verify 00",
        title: "Verify Module by Number",
        desc: "Runs native tests on Module 00 using numeric prefix matching.",
      },
      {
        cmd: "trak verify 00-",
        title: "Verify with Trailing Hyphen",
        desc: "Matches Module 00 using prefix notation with trailing hyphen.",
      },
      {
        cmd: "trak verify .\\00-setup*\\",
        title: "Verify Tab-Completed Path",
        desc: "Automatically normalizes trailing slashes and relative path separators.",
      },
      {
        cmd: "trak verify 01 --detail",
        title: "Detailed Failure Diagnostics",
        desc: "Outputs compiler stderr and failed test assertions for Module 01.",
      },
      {
        cmd: "trak verify --all",
        title: "Full Workspace Verification",
        desc: "Executes test runner across all modules and prints final progress summary.",
      },
      {
        cmd: "trak verify allowlists",
        title: "Audit System Toolchains",
        desc: "Displays supported runtimes table and checks local compiler readiness in PATH.",
      },
    ],
    lifecycle: [
      "Workspace Verification — Confirms trak.json exists in active working directory",
      "Track Type Detection — Verifies whether track is an automated language track ('lang')",
      "Architectural Track Guard — Directs learners to use 'trak done' for non-compiler labs",
      "Toolchain Resolution — Verifies compiler binary (gcc, cargo, node, etc.) exists in PATH",
      "Native Execution — Executes native test suite (go test, cargo test, node --test, etc.)",
      "State Synchronization — Updates trak.json, recalculates progress %, and recommends next exercise",
    ],
  },
  {
    id: "done",
    name: "trak done",
    tagline: "Curriculum Module Completion Marker",
    description:
      "Marks a specific learning module as completed in trak.json, recalculates progress metrics, and provides rewarding completion feedback.",
    syntax: "trak done <module>",
    aliases: ["complete", "mark"],
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
        cmd: "trak done 00-",
        title: "Mark by Prefix with Hyphen",
        desc: "Marks Module 00 using shorthand prefix with trailing hyphen.",
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
    aliases: ["reset", "unmark"],
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
        cmd: "trak undo 01-",
        title: "Reset by Prefix with Hyphen",
        desc: "Reverts Module 01 using prefix notation with trailing hyphen.",
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
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                {current.name}
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                Core Command
              </span>
              {current.aliases && current.aliases.length > 0 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                  Aliases: {current.aliases.map((a) => `trak ${a}`).join(", ")}
                </span>
              )}
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

        {/* Smart Module Resolution Note (for verify, done, undo) */}
        {["verify", "done", "undo"].includes(current.id) && (
          <div className="p-3.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs space-y-1">
            <div className="flex items-center justify-between text-emerald-400 font-mono font-semibold text-[11px]">
              <span>Smart Module Resolution (Prefix &amp; Fuzzy Matching)</span>
              <span className="text-[10px] text-slate-400">Full name not mandatory</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed font-sans">
              Typing full directory names is completely optional. Trak automatically resolves targets via numeric prefixes (<code className="text-slate-200 font-mono">00</code>, <code className="text-slate-200 font-mono">00-</code>, <code className="text-slate-200 font-mono">1</code>), tab-completed paths with trailing slashes (<code className="text-slate-200 font-mono">.\00-setup*\</code>), or keyword substrings (<code className="text-slate-200 font-mono">toolchain</code>, <code className="text-slate-200 font-mono">pointer</code>).
            </p>
          </div>
        )}

        {/* 7 Supported Verification Runtimes Matrix */}
        {current.id === "verify" && (
          <div className="space-y-3 pt-4 border-t border-white/[0.06]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                Available Automated Test Runtimes (7 Tracks)
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Audit PATH: <code className="text-slate-300">trak verify allowlists</code>
              </span>
            </div>
            <div className="overflow-x-auto rounded-lg border border-white/[0.06]">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/[0.06] text-slate-400">
                    <th className="px-3.5 py-2">Language</th>
                    <th className="px-3.5 py-2">Track Slug</th>
                    <th className="px-3.5 py-2">Test Runner Command</th>
                    <th className="px-3.5 py-2">Required Compiler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  <tr className="hover:bg-white/[0.01]">
                    <td className="px-3.5 py-2.5 font-bold text-white">Go</td>
                    <td className="px-3.5 py-2.5 text-emerald-400">lang/go</td>
                    <td className="px-3.5 py-2.5 text-slate-300">go test -v ./...</td>
                    <td className="px-3.5 py-2.5 text-slate-300">go</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="px-3.5 py-2.5 font-bold text-white">Python</td>
                    <td className="px-3.5 py-2.5 text-emerald-400">lang/python</td>
                    <td className="px-3.5 py-2.5 text-slate-300">python -m unittest discover</td>
                    <td className="px-3.5 py-2.5 text-slate-300">python / python3</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="px-3.5 py-2.5 font-bold text-white">Rust</td>
                    <td className="px-3.5 py-2.5 text-emerald-400">lang/rust</td>
                    <td className="px-3.5 py-2.5 text-slate-300">cargo test</td>
                    <td className="px-3.5 py-2.5 text-slate-300">cargo</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="px-3.5 py-2.5 font-bold text-white">JavaScript</td>
                    <td className="px-3.5 py-2.5 text-emerald-400">lang/javascript (lang/js)</td>
                    <td className="px-3.5 py-2.5 text-slate-300">node --test</td>
                    <td className="px-3.5 py-2.5 text-slate-300">node / bun</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="px-3.5 py-2.5 font-bold text-white">TypeScript</td>
                    <td className="px-3.5 py-2.5 text-emerald-400">lang/typescript (lang/ts)</td>
                    <td className="px-3.5 py-2.5 text-slate-300">node --test</td>
                    <td className="px-3.5 py-2.5 text-slate-300">node / bun</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="px-3.5 py-2.5 font-bold text-white">C</td>
                    <td className="px-3.5 py-2.5 text-emerald-400">lang/c</td>
                    <td className="px-3.5 py-2.5 text-slate-300">gcc / clang (-std=c11 -lm)</td>
                    <td className="px-3.5 py-2.5 text-slate-300">gcc / clang</td>
                  </tr>
                  <tr className="hover:bg-white/[0.01]">
                    <td className="px-3.5 py-2.5 font-bold text-white">C++</td>
                    <td className="px-3.5 py-2.5 text-emerald-400">lang/cpp</td>
                    <td className="px-3.5 py-2.5 text-slate-300">g++ / clang++ (-std=c++17)</td>
                    <td className="px-3.5 py-2.5 text-slate-300">g++ / clang++</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed pt-1">
              Hands-on architectural laboratories (Docker, Kubernetes, AWS, PostgreSQL, Linux, Git) do not have code compilers. Complete exercises according to their README instructions and record progress using <code className="text-emerald-400 font-mono">trak done &lt;module&gt;</code>.
            </p>
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
