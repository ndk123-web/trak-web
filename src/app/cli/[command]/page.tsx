import { notFound } from "next/navigation";
import Link from "next/link";
import { CliCommandClient } from "./CliCommandClient";

interface CommandPageProps {
  params: Promise<{
    command: string;
  }>;
}

interface CommandEntry {
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
}

const COMMAND_DATA: Record<string, CommandEntry> = {
  verify: {
    name: "trak verify",
    command: "verify",
    syntax: "trak verify [module] [-a, --all] [-d, --detail] [-l, --list]",
    aliases: ["test", "check"],
    overview:
      "Executes native language test suites against your local exercise code, validates test assertions, and automatically marks completed modules in trak.json.",
    details:
      "The verify command runs automated test harnesses directly on your system using your installed compilers and runtime toolchains. If all tests for an exercise pass, Trak updates trak.json to mark the module complete, updates your workspace progress percentage, renders the visual progress bar, and recommends your next module. For hands-on laboratory tracks (Docker, Kubernetes, AWS, PostgreSQL, Linux, Git), Trak informs you that these tracks are architectural environments without compilers and guides you to use 'trak done <module>' instead.",
    subcommands: [
      {
        cmd: "trak verify allowlists",
        aliases: ["allowlist", "list", "supported", "runtimes"],
        description:
          "Displays a tabular matrix of all 7 supported programming language tracks, their native test runner commands, and checks your system PATH to report whether each compiler or interpreter is installed and ready.",
        example: "trak verify allowlists",
      },
    ],
    runtimes: [
      {
        name: "Go",
        track: "lang/go",
        testRunner: "go test -v ./...",
        executables: ["go"],
        localNote: "Native Go test runner testing all packages in current module.",
      },
      {
        name: "Python",
        track: "lang/python",
        testRunner: "unittest discover",
        executables: ["python", "python3"],
        localNote: "Zero-dependency test discovery using standard library unittest module.",
      },
      {
        name: "Rust",
        track: "lang/rust",
        testRunner: "cargo test",
        executables: ["cargo"],
        localNote: "Invokes cargo test using the module Cargo.toml manifest.",
      },
      {
        name: "JavaScript",
        track: "lang/javascript (lang/js)",
        testRunner: "node --test",
        executables: ["node", "bun"],
        localNote: "Built-in Node.js native test runner (Node 18+ / 20+), zero npm install needed.",
      },
      {
        name: "TypeScript",
        track: "lang/typescript (lang/ts)",
        testRunner: "node --test",
        executables: ["node", "bun"],
        localNote: "Native Node.js test runner with built-in TypeScript execution support.",
      },
      {
        name: "C",
        track: "lang/c",
        testRunner: "gcc / clang",
        executables: ["gcc", "clang"],
        localNote: "Compiles test harness and implementation using -Wall -Wextra -std=c11 -lm.",
      },
      {
        name: "C++",
        track: "lang/cpp",
        testRunner: "g++ / clang++",
        executables: ["g++", "clang++"],
        localNote: "Compiles test harness and implementation using -Wall -Wextra -std=c++17.",
      },
    ],
    flags: [
      {
        flag: "-a, --all",
        type: "boolean",
        defaultVal: "false",
        description: "Verify all modules sequentially across the workspace and display full summary.",
      },
      {
        flag: "-d, --detail",
        type: "boolean",
        defaultVal: "false",
        description: "Show detailed compiler and test assertion output when tests fail.",
      },
      {
        flag: "-l, --list",
        type: "boolean",
        defaultVal: "false",
        description: "List all 7 supported language verification runtimes and local toolchain readiness.",
      },
      {
        flag: "-h, --help",
        type: "boolean",
        defaultVal: "false",
        description: "Show verify command synopsis, aliases, and usage examples.",
      },
    ],
    lifecycle: [
      "Workspace Verification — Locates trak.json in current directory to confirm active learning workspace context.",
      "Track Type Detection — Parses template ID to determine whether current track is a compiled language track ('lang') or architectural hands-on lab.",
      "Hands-On Track Handling — If track is non-lang (Docker, AWS, PostgreSQL, Linux), explains that architectural labs use 'trak done <module>' instead of compilers.",
      "Toolchain Resolution — Checks system PATH for the required compiler or interpreter (e.g. gcc, cargo, node, python, go). If missing, prompts installation instructions.",
      "Module Target Selection — If argument is omitted, finds first pending module. If argument is provided, resolves by exact name, numeric prefix (e.g. '00', '1'), or keyword (e.g. 'escape'). If --all is passed, queues all modules.",
      "Automated Execution — Runs native test harness directly on local filesystem with real-time CLI spinner.",
      "Progress Synchronization — If tests pass, updates trak.json (module_breakdown = true), recalculates metrics, prints updated progress bar, and suggests next exercise via 'trak next'.",
      "Diagnostics Output — If tests fail, prints failure alert. With --detail flag, streams compiler stderr and test failure assertion messages.",
    ],
    examples: [
      {
        title: "Verify Current Pending Exercise",
        cmd: "trak verify",
        explanation: "Automatically detects and verifies the first incomplete module in your curriculum.",
      },
      {
        title: "Verify Module by Numeric Prefix",
        cmd: "trak verify 00",
        explanation: "Verifies Module 00 using numeric prefix matching.",
      },
      {
        title: "Verify Module with Unpadded Number",
        cmd: "trak verify 2",
        explanation: "Matches and runs tests for Module 02 automatically.",
      },
      {
        title: "Verify by Prefix with Trailing Hyphen",
        cmd: "trak verify 00-",
        explanation: "Matches Module 00 using prefix notation with trailing hyphen.",
      },
      {
        title: "Verify Using Tab-Completed Folder Path",
        cmd: "trak verify .\\00-setup-toolchain-and-first-program\\",
        explanation: "Trak automatically cleans trailing slashes, backslashes, and relative dots from shell autocompletion.",
      },
      {
        title: "Verify by Keyword Substring",
        cmd: "trak verify toolchain",
        explanation: "Matches module containing the keyword 'toolchain' in its directory name.",
      },
      {
        title: "Verify with Detailed Failure Logs",
        cmd: "trak verify 01 --detail",
        explanation: "Displays compiler errors and assertion failure output to diagnose test failures.",
      },
      {
        title: "Verify All Modules Across Workspace",
        cmd: "trak verify --all",
        explanation: "Runs tests on every module in the workspace sequentially and outputs pass/fail statistics.",
      },
      {
        title: "Inspect Supported Runtimes & Toolchains",
        cmd: "trak verify allowlists",
        explanation: "Checks which language compilers and test runners are installed on your machine.",
      },
    ],
    important: [
      {
        title: "Full Folder Names are Never Required (Prefix & Fuzzy Matching)",
        text: "You never need to copy or type full directory names. Trak resolves targets using multi-tier matching: '00', '00-', '1', relative paths with trailing slashes (.\\00-setup*\\), or keyword substrings ('toolchain', 'pointer', 'memory'). This same smart matching works across 'trak verify', 'trak done', and 'trak undo'.",
      },
      {
        title: "Toolchain Availability in System PATH",
        text: "Trak uses your local operating system toolchains rather than downloading massive bundled compilers. To verify Go exercises, install Go; for Rust, install Cargo; for JavaScript/TypeScript, install Node.js; for Python, install Python; and for C/C++, install GCC/Clang or MinGW. Run 'trak verify allowlists' to audit your machine.",
      },
      {
        title: "Zero External Dependencies Design",
        text: "All language test suites are authored using native built-in runners (node --test, standard python unittest, go test, cargo test, and native C/C++ assertion runners). Learners never need to run 'npm install' or configure third-party test frameworks to complete exercises.",
      },
      {
        title: "Compiled Language Tracks vs Hands-On Architectural Labs",
        text: "Automated test verification is designed for programming language tracks (lang/go, lang/rust, lang/python, lang/javascript, lang/typescript, lang/c, lang/cpp). Architectural tracks (tool/docker, db/postgres, cloud/aws, os/linux) are practical environments without compiler test suites; use 'trak done <module>' to mark these completed after following their README instructions.",
      },
      {
        title: "Automatic State Persistence in trak.json",
        text: "When a test succeeds, Trak immediately writes the completed status to trak.json with 2-space indentation. You do not need to manually run 'trak done' on verified code.",
      },
    ],
    faq: [
      {
        question: "How does Trak verify my code?",
        answer: "Trak inspects trak.json in your current directory, detects the language track (e.g. lang/go, lang/c), looks up the required compiler in your PATH, and runs the test harness against your exercise files.",
      },
      {
        question: "What should I do if a test fails?",
        answer: "Run the command with the detail flag: 'trak verify <module> --detail' (or '-d'). Trak will print the compiler error or failed assertion details directly in your terminal, showing exactly which line or test case failed.",
      },
      {
        question: "What happens if a compiler or runtime is not installed on my computer?",
        answer: "Trak will display a clear 'Toolchain Not Found' notice specifying the required binary name and instructing you to install the corresponding language compiler. Run 'trak verify allowlists' at any time to see which runtimes are ready on your machine.",
      },
      {
        question: "Can I test all modules at the same time?",
        answer: "Yes, use 'trak verify --all' (or 'trak verify -a'). Trak will run tests sequentially through every module folder, show pass/fail results for each, update trak.json for passing modules, and print a final summary.",
      },
      {
        question: "How does module matching work?",
        answer: "You do not need to type the full module folder name. Trak supports exact names, padded numeric prefixes ('00', '01'), single digits ('1', '2'), and keyword substrings (e.g. 'trak verify pointers').",
      },
      {
        question: "Can I use trak verify on Docker, AWS, or PostgreSQL tracks?",
        answer: "No. Architectural and infrastructure tracks are hands-on configuration environments that do not have automated code compilers. If you run 'trak verify' on these tracks, Trak reminds you to complete the module steps and use 'trak done <module>' to record completion.",
      },
      {
        question: "Does trak verify modify my code?",
        answer: "No. Trak never modifies your exercise or starter code. It only compiles and executes your code against the module test harness, and updates completion status in trak.json.",
      },
    ],
  },
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
    important: [
      {
        title: "Workspace Context Receipt",
        text: "The initialization process generates a trak.json manifest at the root of the new folder. This receipt is essential for all tracking commands (trak verify, trak next, trak status, trak done).",
      },
      {
        title: "Path Clobber Safety",
        text: "Trak safely writes to target directories and preserves folder structure. Use the --path flag if you want to isolate workspaces in custom locations.",
      },
    ],
    faq: [
      {
        question: "Can I initialize in a custom folder?",
        answer: "Yes, use the --path flag: 'trak init lang/go --path ./custom-folder'.",
      },
      {
        question: "Can I use trak offline?",
        answer: "Initialization requires internet access to fetch blueprints from GitHub Raw. Once materialized, your entire workspace runs 100% locally and offline.",
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
      "Displays colored category tags and track descriptions",
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
    important: [
      {
        title: "Category Pillars",
        text: "The catalog is organized into 5 pillars: lang (Programming Languages), os (Operating Systems), cloud (Cloud Platforms), db (Databases), and tool (DevOps Tools).",
      },
    ],
    faq: [
      {
        question: "How do I see only cloud tracks?",
        answer: "Run 'trak list cloud' or 'trak list -c cloud'.",
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
    important: [
      {
        title: "Editor Launch Compatibility",
        text: "The --open flag launches your editor using the system 'code' command. Ensure VS Code command line tools are installed in your PATH.",
      },
    ],
    faq: [
      {
        question: "What happens when all modules are finished?",
        answer: "Trak congratulates you with a 100% completion card and lets you know the curriculum track is complete.",
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
    important: [
      {
        title: "Workspace Root Context",
        text: "Run 'trak status' from within your initialized track folder (or any of its subdirectories) where trak.json resides.",
      },
    ],
    faq: [
      {
        question: "Where is my progress stored?",
        answer: "Your progress is saved locally inside trak.json in your workspace root folder.",
      },
    ],
  },
  done: {
    name: "trak done",
    command: "done",
    syntax: "trak done <module> [flags]",
    aliases: ["complete", "mark"],
    overview:
      "Marks a curriculum module as completed in trak.json, updates completion metrics, and points to your next exercise.",
    details:
      "Supports smart prefix matching ('trak done 00', 'trak done 1'), keyword search ('trak done runtime'), and full folder names ('trak done 00-setup-and-prerequisites'). Essential for hands-on architectural laboratory tracks (Docker, Kubernetes, AWS, PostgreSQL, Linux, Git) that do not have automated compilers. Aliases include 'trak complete' and 'trak mark'.",
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
        title: "Mark Using Trailing Hyphen Prefix",
        cmd: "trak done 00-",
        explanation: "Marks Module 00 using prefix notation with trailing hyphen.",
      },
      {
        title: "Using Command Alias",
        cmd: "trak complete 02",
        explanation: "Marks Module 02 as complete using the complete alias.",
      },
      {
        title: "Keyword Matching",
        cmd: "trak mark goroutines",
        explanation: "Matches module containing 'goroutines' in its name without typing full path.",
      },
      {
        title: "Using Tab-Completed Folder Path",
        cmd: "trak done .\\00-setup-toolchain-and-first-program\\",
        explanation: "Trak automatically cleans trailing slashes and relative path dots.",
      },
    ],
    important: [
      {
        title: "Shorthand Targeting: Full Folder Name is Not Required",
        text: "You do not need to type the full module folder name. You can pass '00', '00-', '1', a unique keyword (e.g. 'docker', 'runtime'), or tab-complete the relative path (.\\00-setup*\\). Trak normalizes and resolves the target automatically.",
      },
      {
        title: "Essential for Architectural Labs",
        text: "While language tracks can be completed automatically via 'trak verify', architectural tracks (Docker, AWS, PostgreSQL, Linux, Kubernetes) rely on 'trak done <module>' once you finish the hands-on commands in the module README.",
      },
    ],
    faq: [
      {
        question: "What is the difference between trak verify and trak done?",
        answer: "trak verify executes native test runners to validate code correctness before marking completion. trak done allows you to mark completion directly, which is ideal for architecture labs or manual review.",
      },
    ],
  },
  undo: {
    name: "trak undo",
    command: "undo",
    syntax: "trak undo <module> [flags]",
    aliases: ["reset", "unmark"],
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
        title: "Reset by Prefix with Trailing Hyphen",
        cmd: "trak undo 00-",
        explanation: "Reverts Module 00 back to pending status using prefix with hyphen.",
      },
      {
        title: "Using Reset Alias",
        cmd: "trak reset 00",
        explanation: "Resets Module 00 using the reset alias.",
      },
      {
        title: "Using Unmark Alias with Keyword",
        cmd: "trak unmark goroutines",
        explanation: "Resets module containing 'goroutines' using keyword substring.",
      },
      {
        title: "Unmark with Padded Number",
        cmd: "trak unmark 02",
        explanation: "Unmarks Module 02 using the unmark alias.",
      },
    ],
    important: [
      {
        title: "Shorthand Targeting: Full Folder Name is Not Required",
        text: "Like 'verify' and 'done', 'undo' accepts unpadded numbers ('1'), padded numbers ('01'), prefixes with hyphens ('01-'), keywords, or tab-completed paths. You never need to write the complete folder name.",
      },
      {
        title: "Non-Destructive State Reset",
        text: "Running 'trak undo' only updates the boolean flag in trak.json. It never modifies or deletes your source code or exercise files.",
      },
    ],
    faq: [
      {
        question: "Does trak undo delete my code?",
        answer: "No. Your written code remains untouched on disk. Only the completion status in trak.json is reset to pending.",
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
    important: [
      {
        title: "Diagnostics & Support",
        text: "Always include the output of 'trak version' when reporting CLI issues or filing GitHub bug reports.",
      },
    ],
    faq: [
      {
        question: "How do I upgrade Trak to the latest version?",
        answer: "Re-run the one-line installation command from the Quickstart guide, or run 'go install github.com/ndk123-web/trak@latest'.",
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
