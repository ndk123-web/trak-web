import { notFound } from "next/navigation";
import Link from "next/link";
import { Terminal, Copy, Check, ArrowRight, BookOpen, Layers, Sparkles } from "lucide-react";
import { CliCommandClient } from "./CliCommandClient";

interface CommandPageProps {
  params: Promise<{
    command: string;
  }>;
}

const COMMAND_DATA: Record<
  string,
  {
    name: string;
    command: string;
    syntax: string;
    overview: string;
    details: string;
    flags: { flag: string; type: string; defaultVal: string; description: string }[];
    lifecycle: string[];
    examples: { cmd: string; title: string; explanation: string }[];
  }
> = {
  init: {
    name: "trak init",
    command: "init",
    syntax: "trak init [<author>/]<category>/<template>[@<version>] [flags]",
    overview:
      "Fetches official or community blueprints from trak-registry and recursively materializes the entire workspace directory tree on disk.",
    details:
      "Supports official templates (e.g. 'trak init lang/go'), explicit namespace ('trak init trak/lang/go'), community author tracks ('trak init <username>/<category>/<tool>'), and pinned version releases ('trak init <username>/<category>/<tool>@<version>'). If --path is omitted, it defaults to './learn-<template>' in the current working directory.",
    flags: [
      {
        flag: "-p, --path",
        type: "string",
        defaultVal: "./learn-<template>",
        description: "Target directory path where the workspace will be materialized.",
      },
      {
        flag: "-h, --help",
        type: "boolean",
        defaultVal: "false",
        description: "Show help message and command examples.",
      },
    ],
    lifecycle: [
      "Resolves blueprint URL (official: templates/<category>/<tool>.json, community: users/<username>/<category>/<tool>[@<version>].json)",
      "Parses recursive JSON AST node hierarchy (directories, files, and build manifests)",
      "Creates target directory and recursively writes all files with UTF-8 encoding",
      "Stamps immutable trak.json manifest containing author attribution, version, and UTC timestamp",
      "Prints success banner with total resource count and recommended next steps",
    ],
    examples: [
      {
        title: "Official Blueprint Initialization",
        cmd: "trak init lang/go",
        explanation: "Generates the official Go workspace in ./learn-go in your current folder.",
      },
      {
        title: "Community Author Track",
        cmd: "trak init alice/db/postgres",
        explanation: "Fetches community track from users/alice/db/postgres.json in the registry.",
      },
      {
        title: "Version-Pinned Release",
        cmd: "trak init alice/db/postgres@v2.0.0",
        explanation: "Pulls tagged release postgres@v2.0.0.json, preserving stability for learners.",
      },
      {
        title: "Custom Workspace Path",
        cmd: "trak init lang/rust --path ./my-rust-lab",
        explanation: "Materializes the Rust workspace inside custom ./my-rust-lab directory.",
      },
    ],
  },
  list: {
    name: "trak list",
    command: "list",
    syntax: "trak list [category] [flags]",
    overview:
      "Visualizes all available learning tracks in a clean ASCII tree graph with colored tags, module counts, and version numbers.",
    details:
      "Allows developers to discover tracks directly from the command line without opening a browser. Supports filtering by category name (e.g. 'trak list os') or passing flags.",
    flags: [
      {
        flag: "-c, --category",
        type: "string",
        defaultVal: "all",
        description: "Filter catalog by specific category (lang, os, cloud, db, tool).",
      },
      {
        flag: "-a, --all",
        type: "boolean",
        defaultVal: "false",
        description: "Display the entire catalog tree with all branches.",
      },
      {
        flag: "-h, --help",
        type: "boolean",
        defaultVal: "false",
        description: "Show list command help and usage examples.",
      },
    ],
    lifecycle: [
      "Downloads master catalog manifest: registry.json from GitHub",
      "Filters categories based on arguments and flags",
      "Draws formatted Unicode tree graph with branches (├──, └──, │)",
      "Displays colored category icons (📦, 🐧, ☁️, 🗄️, 🛠️) and track descriptions",
      "Outputs interactive tips for initializing discovered tracks",
    ],
    examples: [
      {
        title: "List Full Catalog Tree",
        cmd: "trak list",
        explanation: "Renders all 19 tracks organized under their 5 parent categories.",
      },
      {
        title: "Filter by Category Positional Argument",
        cmd: "trak list lang",
        explanation: "Shows only programming language tracks (Go, Rust, Python, TS, etc.).",
      },
      {
        title: "Filter by Category Flag",
        cmd: "trak list -c db",
        explanation: "Shows only database tracks (PostgreSQL, Redis, SQL).",
      },
    ],
  },
  version: {
    name: "trak version",
    command: "version",
    syntax: "trak version",
    overview:
      "Displays active CLI build version, compilation timestamp, Go runtime, and connected registry source.",
    details:
      "Useful for diagnosing environment issues, checking for updates, and verifying compatibility.",
    flags: [
      {
        flag: "-h, --help",
        type: "boolean",
        defaultVal: "false",
        description: "Show version command help.",
      },
    ],
    lifecycle: [
      "Reads embedded compile-time variables (Version, BuildDate, GitCommit)",
      "Queries runtime.Version() for Go compiler specifications",
      "Detects host runtime.GOOS and runtime.GOARCH (e.g. windows/amd64, darwin/arm64)",
      "Renders styled ASCII version card to stdout",
    ],
    examples: [
      {
        title: "Display Version Information",
        cmd: "trak version",
        explanation: "Prints version card with runtime and registry info.",
      },
    ],
  },
  next: {
    name: "trak next",
    command: "next",
    syntax: "trak next [flags]",
    overview:
      "Inspects trak.json, determines the next sequential incomplete module, and displays its folder path, overview, files, and navigation commands.",
    details:
      "Sorts all curriculum modules in deterministic order to find the next incomplete exercise. Reads the module README snippet, lists workspace files, and provides direct copyable shell commands. Use --open to automatically launch the module in VS Code.",
    flags: [
      {
        flag: "-o, --open",
        type: "boolean",
        defaultVal: "false",
        description: "Open the next module workspace folder directly in VS Code or default editor.",
      },
      {
        flag: "-h, --help",
        type: "boolean",
        defaultVal: "false",
        description: "Show next command help and examples.",
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
    examples: [
      {
        title: "Find Next Exercise",
        cmd: "trak next",
        explanation: "Resolves the next incomplete module and displays directory and starter tips.",
      },
      {
        title: "Launch Directly in VS Code",
        cmd: "trak next --open",
        explanation: "Finds the next pending module and opens its directory in VS Code immediately.",
      },
    ],
  },
  status: {
    name: "trak status",
    command: "status",
    syntax: "trak status",
    overview:
      "Inspects the current workspace for trak.json, calculates module completion metrics, and renders a visual progress dashboard.",
    details:
      "Scans the current working directory for trak.json manifest. Displays track metadata, formatted creation date, ASCII progress bar with exact completion percentages, and a status checklist of all curriculum modules.",
    flags: [
      {
        flag: "-h, --help",
        type: "boolean",
        defaultVal: "false",
        description: "Show status command help.",
      },
    ],
    lifecycle: [
      "Workspace Discovery — Searches current directory for trak.json manifest",
      "State Deserialization — Parses module_breakdown completion map",
      "Progress Calculation — Computes completed vs total modules and percentage",
      "Dashboard Output — Renders track info, ASCII progress bar, and module breakdown",
      "Next Step Guidance — Suggests the next pending module to work on",
    ],
    examples: [
      {
        title: "Inspect Workspace Progress",
        cmd: "trak status",
        explanation: "Displays visual progress dashboard and status of all modules in current workspace.",
      },
    ],
  },
  done: {
    name: "trak done",
    command: "done",
    syntax: "trak done <module> [flags]",
    overview:
      "Marks a curriculum module as completed in trak.json, updates completion metrics, and points to your next exercise.",
    details:
      "Supports smart prefix matching ('trak done 00', 'trak done 1'), keyword search ('trak done runtime'), and full folder names ('trak done 00-setup-and-prerequisites'). Aliases include 'trak complete' and 'trak mark'.",
    flags: [
      {
        flag: "-h, --help",
        type: "boolean",
        defaultVal: "false",
        description: "Show done command help.",
      },
    ],
    lifecycle: [
      "Manifest Inspection — Verifies workspace context by locating trak.json",
      "Smart Resolution — Matches module by exact key, numeric prefix, or keyword substring",
      "State Mutation — Flips module completion to true and formats trak.json with 2-space indentation",
      "Metric Recalculation — Computes updated completion count and progress percentage",
      "Rewarding Feedback — Prints completion confirmation, updated progress bar, and next exercise tip",
    ],
    examples: [
      {
        title: "Mark by Module Number",
        cmd: "trak done 00",
        explanation: "Marks Module 00 as complete using numeric prefix.",
      },
      {
        title: "Padded Number Matching",
        cmd: "trak done 1",
        explanation: "Automatically matches 01-runtime-and-escape-analysis.",
      },
      {
        title: "Using Command Alias",
        cmd: "trak complete 02",
        explanation: "Marks Module 02 as complete using the complete alias.",
      },
      {
        title: "Keyword Matching",
        cmd: "trak mark goroutines",
        explanation: "Matches module containing 'goroutines' in its name.",
      },
    ],
  },
  undo: {
    name: "trak undo",
    command: "undo",
    syntax: "trak undo <module> [flags]",
    overview:
      "Reverts a previously completed curriculum module back to pending in trak.json.",
    details:
      "Allows developers to reset exercises for revision or practice. Recalculates workspace completion metrics automatically. Supports aliases 'trak reset' and 'trak unmark'.",
    flags: [
      {
        flag: "-h, --help",
        type: "boolean",
        defaultVal: "false",
        description: "Show undo command help.",
      },
    ],
    lifecycle: [
      "Workspace Discovery — Locates trak.json in current directory",
      "Module Resolution — Resolves target module using exact name or fuzzy prefix matching",
      "State Rollback — Reverts module status to false in trak.json",
      "Progress Recalculation — Recalculates workspace metrics and writes indented JSON",
      "Confirmation Output — Prints clean reset confirmation with updated completion percentage",
    ],
    examples: [
      {
        title: "Reset Module by Number",
        cmd: "trak undo 01",
        explanation: "Reverts Module 01 back to pending status.",
      },
      {
        title: "Using Reset Alias",
        cmd: "trak reset 00",
        explanation: "Resets Module 00 using the reset alias.",
      },
      {
        title: "Using Unmark Alias",
        cmd: "trak unmark 02",
        explanation: "Unmarks Module 02 using the unmark alias.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(COMMAND_DATA).map((command) => ({
    command,
  }));
}

export default async function CommandDetailPage({ params }: CommandPageProps) {
  const { command } = await params;
  const data = COMMAND_DATA[command];

  if (!data) {
    notFound();
  }

  return <CliCommandClient data={data} />;
}
