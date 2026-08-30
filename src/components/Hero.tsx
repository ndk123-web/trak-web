"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  RotateCcw,
  Clock,
} from "lucide-react";

type DemoType = "init-go" | "init-postgres" | "init-k8s" | "list";

interface LineItem {
  type: "info" | "success" | "file" | "dir" | "accent" | "text" | "step" | "category" | "track" | "footer";
  text?: string;
  name?: string;
  desc?: string;
  catTitle?: string;
  catSlug?: string;
  catIcon?: string;
}

interface DemoScript {
  command: string;
  lines: LineItem[];
}

const DEMOS: Record<DemoType, DemoScript> = {
  "init-go": {
    command: "trak init lang/go",
    lines: [
      { type: "success", text: "✔ Found Template: Go (Golang) (v1.2.0)" },
      { type: "info", text: "➜ Target Workspace: ./learn-go" },
      { type: "file", text: "✔ Created File: ./learn-go/go.mod" },
      { type: "file", text: "✔ Created File: ./learn-go/README.md" },
      { type: "dir", text: "✔ Created Directory: ./learn-go/00-setup-and-toolchain" },
      { type: "dir", text: "✔ Created Directory: ./learn-go/10-goroutines-and-channels" },
      { type: "dir", text: "✔ Created Directory: ./learn-go/11-memory-and-pointers" },
      { type: "dir", text: "✔ Created Directory: ./learn-go/19-interview-questions" },
      { type: "accent", text: "✔ Stamped Metadata: ./learn-go/trak.json" },
      { type: "success", text: "✔ Successfully initialized Go workspace with 42 resources!" },
      { type: "text", text: "Next steps:" },
      { type: "step", text: "1. cd ./learn-go" },
      { type: "step", text: "2. code ." },
    ],
  },
  "init-postgres": {
    command: "trak init db/postgres --path ./postgres-lab",
    lines: [
      { type: "success", text: "✔ Found Template: PostgreSQL & DBA Architecture (v1.0.0)" },
      { type: "info", text: "➜ Target Workspace: ./postgres-lab" },
      { type: "file", text: "✔ Created File: ./postgres-lab/docker-compose.yml" },
      { type: "file", text: "✔ Created File: ./postgres-lab/init.sql" },
      { type: "dir", text: "✔ Created Directory: ./postgres-lab/02-mvcc-and-isolation" },
      { type: "dir", text: "✔ Created Directory: ./postgres-lab/05-gin-brin-indexing" },
      { type: "dir", text: "✔ Created Directory: ./postgres-lab/10-pgbouncer-pooling" },
      { type: "accent", text: "✔ Stamped Metadata: ./postgres-lab/trak.json" },
      { type: "success", text: "✔ Successfully initialized PostgreSQL workspace with 38 resources!" },
      { type: "text", text: "Next steps:" },
      { type: "step", text: "1. cd ./postgres-lab" },
      { type: "step", text: "2. docker compose up -d" },
    ],
  },
  "init-k8s": {
    command: "trak init tool/k8s",
    lines: [
      { type: "success", text: "✔ Found Template: Kubernetes & Cloud-Native CKA (v1.0.0)" },
      { type: "info", text: "➜ Target Workspace: ./learn-k8s" },
      { type: "file", text: "✔ Created File: ./learn-k8s/cluster.yaml" },
      { type: "dir", text: "✔ Created Directory: ./learn-k8s/00-control-plane-etcd" },
      { type: "dir", text: "✔ Created Directory: ./learn-k8s/07-statefulsets-and-headless" },
      { type: "dir", text: "✔ Created Directory: ./learn-k8s/12-helm-package-manager" },
      { type: "accent", text: "✔ Stamped Metadata: ./learn-k8s/trak.json" },
      { type: "success", text: "✔ Successfully initialized Kubernetes CKA workspace with 40 resources!" },
      { type: "text", text: "Next steps:" },
      { type: "step", text: "1. cd ./learn-k8s" },
      { type: "step", text: "2. kubectl apply -f ./00-control-plane-etcd" },
    ],
  },
  list: {
    command: "trak list",
    lines: [
      { type: "accent", text: "Trak Learning Catalog (v1.0.0 • 22 Blueprints)" },
      
      { type: "category", catIcon: "📦", catTitle: "PROGRAMMING LANGUAGES", catSlug: "lang/" },
      { type: "track", name: "go", desc: "Comprehensive Go fundamentals, concurrency, channels & memory" },
      { type: "track", name: "rust", desc: "End-to-end Rust systems programming, ownership & Tokio async" },
      { type: "track", name: "typescript", desc: "TypeScript mastery: strict tsconfig, infer & Zod schemas" },
      { type: "track", name: "python", desc: "Comprehensive Python track: CPython internals, GIL & FastAPI" },

      { type: "category", catIcon: "🐧", catTitle: "OPERATING SYSTEMS & CLOUD", catSlug: "os/ & cloud/" },
      { type: "track", name: "linux", desc: "Linux mastery: Kernel architecture, systemd & Bash" },
      { type: "track", name: "macos", desc: "macOS mastery: Darwin XNU kernel, APFS snapshots & launchd" },
      { type: "track", name: "aws", desc: "Complete AWS: Zero-trust IAM, VPC networking & Aurora" },

      { type: "category", catIcon: "🗄️", catTitle: "DATABASES & STORAGE", catSlug: "db/" },
      { type: "track", name: "postgres", desc: "PostgreSQL mastery: MVCC, JSONB, GIN/BRIN indexes & Autovacuum" },
      { type: "track", name: "redis", desc: "Redis mastery: Event loop, Streams & Sentinel HA" },
      { type: "track", name: "sql", desc: "Comprehensive SQL: Schema design, CTEs & EXPLAIN" },

      { type: "category", catIcon: "🛠️", catTitle: "DEVOPS & DEVELOPER TOOLS", catSlug: "tool/" },
      { type: "track", name: "docker", desc: "Complete Docker: Namespaces, cgroups & multi-stage builds" },
      { type: "track", name: "k8s", desc: "Kubernetes mastery (CKA/CKAD): Control plane & Helm" },
      { type: "track", name: "terraform", desc: "Terraform mastery: HCL syntax, S3 remote state & modules" },
      { type: "track", name: "ansible", desc: "Ansible mastery: Playbooks, Jinja2 templates & Molecule" },

      { type: "footer" },
    ],
  },
};

const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

export function Hero() {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [installMethod, setInstallMethod] = useState<
    "powershell" | "cmd" | "bash" | "go"
  >("powershell");

  // Terminal Animation State
  const [activeDemo, setActiveDemo] = useState<DemoType>("init-go");
  const [typedChars, setTypedChars] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [spinnerFrame, setSpinnerFrame] = useState<number>(0);
  const [revealedLines, setRevealedLines] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const installCommands = {
    powershell:
      "irm https://raw.githubusercontent.com/ndk123-web/trak/main/scripts/install.ps1 | iex",
    cmd: 'powershell -ExecutionPolicy Bypass -Command "iwr -useb https://raw.githubusercontent.com/ndk123-web/trak/main/scripts/install.ps1 | iex"',
    bash: "curl -fsSL https://raw.githubusercontent.com/ndk123-web/trak/main/scripts/install.sh | bash",
    go: "go install github.com/ndk123-web/trak@latest",
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  // Reset animation when changing demo
  const startDemo = (demo: DemoType) => {
    setActiveDemo(demo);
    setTypedChars(0);
    setIsSpinning(false);
    setRevealedLines(0);
    setIsFinished(false);
  };

  // Main Terminal Animation Loop
  useEffect(() => {
    const script = DEMOS[activeDemo];

    // Phase 1: Typing command
    if (typedChars < script.command.length) {
      const timer = setTimeout(() => {
        setTypedChars((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(timer);
    }

    // Phase 2: Spinner (network fetch simulation)
    if (!isSpinning && revealedLines === 0 && !isFinished) {
      setIsSpinning(true);
      return;
    }

    if (isSpinning) {
      const spinnerInterval = setInterval(() => {
        setSpinnerFrame((prev) => (prev + 1) % SPINNER_FRAMES.length);
      }, 70);

      const finishSpinner = setTimeout(() => {
        setIsSpinning(false);
        setRevealedLines(1);
      }, 650);

      return () => {
        clearInterval(spinnerInterval);
        clearTimeout(finishSpinner);
      };
    }

    // Phase 3: Stream lines one-by-one
    if (revealedLines > 0 && revealedLines < script.lines.length) {
      const lineDelay = activeDemo === "list" ? 35 : 70;
      const timer = setTimeout(() => {
        setRevealedLines((prev) => prev + 1);
      }, lineDelay);
      return () => clearTimeout(timer);
    }

    // Phase 4: Finished
    if (revealedLines >= script.lines.length && !isFinished) {
      setIsFinished(true);
    }
  }, [
    activeDemo,
    typedChars,
    isSpinning,
    revealedLines,
    isFinished,
  ]);

  const currentScript = DEMOS[activeDemo];
  const displayedCommand = currentScript.command.slice(0, typedChars);

  return (
    <section className="relative pt-8 pb-14 lg:pt-12 lg:pb-20 border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Calm, Professional Metadata Row (No AI Cliché Badges) */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-400 mb-5">
          <span className="font-semibold text-slate-200">Trak v1.0.0</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">Last updated: August 30, 2026</span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-500 hidden sm:inline">19 Curriculum Tracks</span>
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl space-y-3">
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-[40px] font-normal tracking-[-0.015em] text-[#f5f4ef] leading-[1.2]">
            The CLI workspace generator for{" "}
            <span className="italic font-serif text-emerald-400 font-normal">
              hands-on
            </span>{" "}
            technical learning.
          </h1>
          <p className="text-sm sm:text-base text-slate-400 font-sans leading-relaxed max-w-2xl font-normal">
            Scaffold structured, multi-module engineering laboratories with
            working source code, build manifests, and documentation directly on
            your local filesystem.
          </p>
        </div>

        {/* Installation Bar */}
        <div className="mt-8 max-w-3xl space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono text-slate-400 font-medium">
              Installation:
            </span>
            <div className="flex flex-wrap items-center gap-1 text-[11px] font-mono">
              <button
                onClick={() => setInstallMethod("powershell")}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  installMethod === "powershell"
                    ? "bg-white/[0.1] text-white font-semibold"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                PowerShell
              </button>
              <button
                onClick={() => setInstallMethod("cmd")}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  installMethod === "cmd"
                    ? "bg-white/[0.1] text-white font-semibold"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                CMD
              </button>
              <button
                onClick={() => setInstallMethod("bash")}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  installMethod === "bash"
                    ? "bg-white/[0.1] text-white font-semibold"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Bash / Zsh
              </button>
              <button
                onClick={() => setInstallMethod("go")}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  installMethod === "go"
                    ? "bg-white/[0.1] text-white font-semibold"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Go Install
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950 border border-white/[0.08] text-xs font-mono">
            <div className="flex items-center gap-2 overflow-x-auto text-slate-200">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="select-all whitespace-nowrap">
                {installCommands[installMethod]}
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(installCommands[installMethod])}
              className="shrink-0 p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/[0.06]"
              title="Copy installation command"
            >
              {copiedInstall ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] font-mono text-slate-500">
            <span>Restart terminal after running to reload PATH</span>
            <Link
              href="/quickstart"
              className="text-emerald-400 hover:underline"
            >
              View Quickstart Guide →
            </Link>
          </div>
        </div>

        {/* Real Animated CLI Terminal Simulator */}
        <div className="mt-10 max-w-4xl">
          <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#080b11] shadow-2xl">
            {/* Terminal Window Header */}
            <div className="px-3.5 py-2.5 bg-[#0c101a] border-b border-white/[0.06] flex items-center justify-between gap-2 select-none">
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                  terminal — trak
                </span>
              </div>

              {/* Interactive Demo Switchers */}
              <div className="flex items-center gap-1 text-[11px] font-mono overflow-x-auto scrollbar-none">
                <button
                  onClick={() => startDemo("init-go")}
                  className={`px-2.5 py-0.5 rounded transition-colors cursor-pointer whitespace-nowrap ${
                    activeDemo === "init-go"
                      ? "bg-white/[0.12] text-white font-medium shadow-sm"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  init lang/go
                </button>
                <button
                  onClick={() => startDemo("init-postgres")}
                  className={`px-2.5 py-0.5 rounded transition-colors cursor-pointer whitespace-nowrap ${
                    activeDemo === "init-postgres"
                      ? "bg-white/[0.12] text-white font-medium shadow-sm"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  init db/postgres
                </button>
                <button
                  onClick={() => startDemo("init-k8s")}
                  className={`px-2.5 py-0.5 rounded transition-colors cursor-pointer whitespace-nowrap ${
                    activeDemo === "init-k8s"
                      ? "bg-white/[0.12] text-white font-medium shadow-sm"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  init tool/k8s
                </button>
                <button
                  onClick={() => startDemo("list")}
                  className={`px-2.5 py-0.5 rounded transition-colors cursor-pointer whitespace-nowrap ${
                    activeDemo === "list"
                      ? "bg-white/[0.12] text-white font-medium shadow-sm"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  trak list
                </button>

                {/* Replay Button */}
                <button
                  onClick={() => startDemo(activeDemo)}
                  className="ml-1 p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Replay Execution"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-slate-300 bg-[#06080e] min-h-[310px] flex flex-col justify-between">
              <div className="space-y-1">
                {/* Active Prompt & Simulated Typing */}
                <div className="text-slate-400 flex items-center gap-2">
                  <span className="text-emerald-400">~/workspace</span>
                  <span className="text-cyan-400">$</span>
                  <span className="text-white font-bold">
                    {displayedCommand}
                  </span>
                  {typedChars < currentScript.command.length && (
                    <span className="w-1.5 h-4 bg-emerald-400 animate-pulse inline-block" />
                  )}
                </div>

                {/* Animated Spinner (when resolving remote catalog) */}
                {isSpinning && (
                  <div className="text-cyan-400 flex items-center gap-2 pt-1 font-mono">
                    <span className="font-bold">
                      {SPINNER_FRAMES[spinnerFrame]}
                    </span>
                    <span>Fetching Trak registry catalog...</span>
                  </div>
                )}

                {/* Streamed Output Lines */}
                {revealedLines > 0 &&
                  currentScript.lines.slice(0, revealedLines).map((line, idx) => {
                    // Category Header
                    if (line.type === "category") {
                      return (
                        <div key={idx} className="text-white font-bold flex items-center gap-1.5 pt-2 animate-in fade-in duration-100">
                          <span>{line.catIcon}</span>
                          <span>{line.catTitle}</span>
                          <span className="text-cyan-400 font-mono font-normal">({line.catSlug})</span>
                        </div>
                      );
                    }

                    // Track item (Cyan name + Slate Gray details)
                    if (line.type === "track") {
                      return (
                        <div key={idx} className="flex gap-4 text-[11px] pl-3 animate-in fade-in duration-100">
                          <span className="text-cyan-400 font-semibold w-24 shrink-0">{line.name}</span>
                          <span className="text-slate-400">{line.desc}</span>
                        </div>
                      );
                    }

                    // Footer Tip
                    if (line.type === "footer") {
                      return (
                        <div key={idx} className="pt-3 mt-2 border-t border-white/[0.08] text-[11px] animate-in fade-in duration-100">
                          <div>
                            <span className="text-amber-400 font-bold">💡 Initialize any workspace: </span>
                            <span className="text-emerald-400 font-bold">trak init &lt;category&gt;/&lt;template&gt;</span>
                          </div>
                          <div className="text-slate-500 mt-0.5">
                            example: <span className="text-slate-400">trak init lang/go --path ./learn-go</span>
                          </div>
                        </div>
                      );
                    }

                    // Standard lines (init demos)
                    let colorClass = "text-slate-300";
                    if (line.type === "success") colorClass = "text-emerald-400 font-semibold";
                    if (line.type === "info") colorClass = "text-cyan-400 font-bold";
                    if (line.type === "file") colorClass = "text-slate-400";
                    if (line.type === "dir") colorClass = "text-slate-400";
                    if (line.type === "accent") colorClass = "text-white font-bold";
                    if (line.type === "step") colorClass = "text-cyan-300 pl-3";

                    return (
                      <div key={idx} className={`${colorClass} animate-in fade-in duration-100`}>
                        {line.text}
                      </div>
                    );
                  })}

                {/* Post-Completion prompt */}
                {isFinished && (
                  <div className="text-slate-400 flex items-center gap-2 pt-3">
                    <span className="text-emerald-400">~/workspace</span>
                    <span className="text-cyan-400">$</span>
                    <span className="text-slate-400">
                      {activeDemo === "init-go" && "cd ./learn-go && code ."}
                      {activeDemo === "init-postgres" && "cd ./postgres-lab && docker compose up -d"}
                      {activeDemo === "init-k8s" && "cd ./learn-k8s && kubectl get pods"}
                      {activeDemo === "list" && "trak init lang/go"}
                    </span>
                    <span className="w-1.5 h-4 bg-emerald-400 animate-pulse inline-block" />
                  </div>
                )}
              </div>

              {/* Bottom Simulator Controls */}
              <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span className="text-slate-400">
                  {isFinished
                    ? "Execution Complete"
                    : isSpinning
                    ? "Resolving Remote Blueprint..."
                    : "Streaming Filesystem Nodes..."}
                </span>

                <button
                  onClick={() => startDemo(activeDemo)}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Replay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
