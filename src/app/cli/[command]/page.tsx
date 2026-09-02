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
