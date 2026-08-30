"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  Copy,
  Check,
  ArrowRight,
  FolderTree,
  Layers,
  Code2,
} from "lucide-react";

export function Hero() {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [installMethod, setInstallMethod] = useState<"powershell" | "cmd" | "bash" | "go">("powershell");
  const [activeTab, setActiveTab] = useState<"list" | "init-go" | "init-postgres" | "init-k8s">("list");

  const installCommands = {
    powershell: "irm https://raw.githubusercontent.com/ndk123-web/trak/main/scripts/install.ps1 | iex",
    cmd: 'powershell -ExecutionPolicy Bypass -Command "iwr -useb https://raw.githubusercontent.com/ndk123-web/trak/main/scripts/install.ps1 | iex"',
    bash: "curl -fsSL https://raw.githubusercontent.com/ndk123-web/trak/main/scripts/install.sh | bash",
    go: "go install github.com/ndk123-web/trak@latest",
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <section className="relative pt-8 pb-14 lg:pt-12 lg:pb-20 border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Monospaced Version Tag */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
          <span className="text-emerald-400 font-bold">$</span>
          <span>trak --version</span>
          <span className="text-slate-600">→</span>
          <span className="text-slate-300">v1.0.0 (darwin, linux, windows)</span>
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            The CLI workspace generator for hands-on technical learning.
          </h1>
          <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
            Scaffold complete, multi-module engineering labs with working source code, build configs, and structured documentation directly on your local filesystem with a single command.
          </p>
        </div>

        {/* Installation Bar */}
        <div className="mt-8 max-w-3xl space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 font-medium">Installation:</span>
            <div className="flex items-center gap-1 text-[11px] font-mono">
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
              <span className="select-all">{installCommands[installMethod]}</span>
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

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Restart terminal after running to reload PATH</span>
            <Link href="/quickstart" className="text-emerald-400 hover:underline">
              View Quickstart Guide →
            </Link>
          </div>
        </div>

        {/* Real Terminal Output Preview */}
        <div className="mt-10 max-w-4xl">
          <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#080b11] shadow-2xl">
            {/* Terminal Window Header */}
            <div className="px-4 py-2.5 bg-[#0c101a] border-b border-white/[0.06] flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-xs font-mono text-slate-400">
                  terminal — trak
                </span>
              </div>

              {/* Command Tabs */}
              <div className="flex items-center gap-1 text-[11px] font-mono">
                <button
                  onClick={() => setActiveTab("list")}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    activeTab === "list"
                      ? "bg-white/[0.1] text-white font-medium"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  trak list
                </button>
                <button
                  onClick={() => setActiveTab("init-go")}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    activeTab === "init-go"
                      ? "bg-white/[0.1] text-white font-medium"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  init lang/go
                </button>
                <button
                  onClick={() => setActiveTab("init-postgres")}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    activeTab === "init-postgres"
                      ? "bg-white/[0.1] text-white font-medium"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  init db/postgres
                </button>
                <button
                  onClick={() => setActiveTab("init-k8s")}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    activeTab === "init-k8s"
                      ? "bg-white/[0.1] text-white font-medium"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  init tool/k8s
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto text-slate-300 bg-[#06080e] min-h-[260px]">
              {activeTab === "list" && (
                <div className="space-y-1">
                  <div className="text-slate-400 flex items-center gap-2">
                    <span className="text-emerald-400">~/workspace</span>
                    <span className="text-cyan-400">$</span>
                    <span className="text-white font-bold">trak list</span>
                  </div>
                  <div className="pt-2 text-emerald-400 font-bold">🌳 Trak Learning Catalog (v1.0.0)</div>
                  <div className="text-slate-500">├── 📦 <span className="text-slate-200 font-semibold">Programming Languages (lang)</span></div>
                  <div className="text-slate-500 pl-4">│   ├── <span className="text-cyan-400 font-semibold">go</span>          <span className="text-slate-400">Goroutines, channels, memory pointers & microservices</span></div>
                  <div className="text-slate-500 pl-4">│   ├── <span className="text-cyan-400 font-semibold">rust</span>        <span className="text-slate-400">Ownership, lifetimes, Tokio async runtime & Axum</span></div>
                  <div className="text-slate-500 pl-4">│   ├── <span className="text-cyan-400 font-semibold">typescript</span>  <span className="text-slate-400">Strict tsconfig, discriminated unions, infer & Zod</span></div>
                  <div className="text-slate-500 pl-4">│   └── <span className="text-cyan-400 font-semibold">python</span>      <span className="text-slate-400">CPython internals, GIL, Asyncio & FastAPI</span></div>
                  <div className="text-slate-500">├── 🐧 <span className="text-slate-200 font-semibold">Operating Systems & Kernels (os)</span></div>
                  <div className="text-slate-500 pl-4">│   ├── <span className="text-emerald-400 font-semibold">linux</span>       <span className="text-slate-400">Kernel architecture, systemd, permissions & Bash</span></div>
                  <div className="text-slate-500 pl-4">│   └── <span className="text-emerald-400 font-semibold">macos</span>       <span className="text-slate-400">Darwin XNU, APFS snapshots, launchd & Homebrew</span></div>
                  <div className="text-slate-500">├── ☁️ <span className="text-slate-200 font-semibold">Cloud Infrastructure (cloud)</span></div>
                  <div className="text-slate-500 pl-4">│   └── <span className="text-amber-400 font-semibold">aws</span>         <span className="text-slate-400">IAM zero-trust, VPC networking, EC2/ALB & Aurora</span></div>
                  <div className="text-slate-500">├── 🗄️ <span className="text-slate-200 font-semibold">Databases & Storage (db)</span></div>
                  <div className="text-slate-500 pl-4">│   ├── <span className="text-indigo-400 font-semibold">postgres</span>    <span className="text-slate-400">MVCC, JSONB, GIN/BRIN indexes & Autovacuum</span></div>
                  <div className="text-slate-500 pl-4">│   └── <span className="text-indigo-400 font-semibold">redis</span>       <span className="text-slate-400">Event loop, Streams, RDB/AOF & Sentinel HA</span></div>
                  <div className="text-slate-500">└── 🛠️ <span className="text-slate-200 font-semibold">DevOps & Developer Tools (tool)</span></div>
                  <div className="text-slate-500 pl-4">    ├── <span className="text-rose-400 font-semibold">docker</span>      <span className="text-slate-400">Namespaces, cgroups, Multi-stage builds & BuildKit</span></div>
                  <div className="text-slate-500 pl-4">    ├── <span className="text-rose-400 font-semibold">k8s</span>         <span className="text-slate-400">CKA/CKAD syllabus, Control plane, Pods & Helm</span></div>
                  <div className="text-slate-500 pl-4">    └── <span className="text-rose-400 font-semibold">terraform</span>   <span className="text-slate-400">HCL syntax, S3 remote state locking & modules</span></div>
                </div>
              )}

              {activeTab === "init-go" && (
                <div className="space-y-1">
                  <div className="text-slate-400 flex items-center gap-2">
                    <span className="text-emerald-400">~/workspace</span>
                    <span className="text-cyan-400">$</span>
                    <span className="text-white font-bold">trak init lang/go</span>
                  </div>
                  <div className="text-emerald-400">✔ Found Template: Go (Golang) (v1.2.0)</div>
                  <div className="text-blue-400">➜ Target Workspace: ./learn-go</div>
                  <div className="text-slate-400">✔ Created File: ./learn-go/go.mod</div>
                  <div className="text-slate-400">✔ Created File: ./learn-go/README.md</div>
                  <div className="text-slate-400">✔ Created Directory: ./learn-go/00-setup-and-toolchain</div>
                  <div className="text-slate-400">✔ Created Directory: ./learn-go/10-goroutines-and-scheduler</div>
                  <div className="text-slate-400">✔ Created Directory: ./learn-go/11-channels-and-communication</div>
                  <div className="text-slate-400">✔ Created Directory: ./learn-go/19-interview-questions</div>
                  <div className="text-emerald-400">✔ Stamped Metadata: ./learn-go/trak.json</div>
                  <div className="pt-2 text-emerald-300 font-bold">✔ Successfully initialized Go workspace with 42 resources!</div>
                  <div className="pt-1 text-slate-400">Next steps:</div>
                  <div className="pl-4 text-cyan-300">1. cd ./learn-go</div>
                  <div className="pl-4 text-cyan-300">2. code .</div>
                </div>
              )}

              {activeTab === "init-postgres" && (
                <div className="space-y-1">
                  <div className="text-slate-400 flex items-center gap-2">
                    <span className="text-emerald-400">~/workspace</span>
                    <span className="text-cyan-400">$</span>
                    <span className="text-white font-bold">trak init db/postgres -p ./postgres-lab</span>
                  </div>
                  <div className="text-emerald-400">✔ Found Template: PostgreSQL & DBA Architecture (v1.0.0)</div>
                  <div className="text-blue-400">➜ Target Workspace: ./postgres-lab</div>
                  <div className="text-slate-400">✔ Created File: ./postgres-lab/docker-compose.yml</div>
                  <div className="text-slate-400">✔ Created File: ./postgres-lab/init.sql</div>
                  <div className="text-slate-400">✔ Created Directory: ./postgres-lab/02-mvcc-and-isolation</div>
                  <div className="text-slate-400">✔ Created Directory: ./postgres-lab/05-gin-brin-indexing</div>
                  <div className="text-slate-400">✔ Created Directory: ./postgres-lab/10-pgbouncer-pooling</div>
                  <div className="text-emerald-400">✔ Stamped Metadata: ./postgres-lab/trak.json</div>
                  <div className="pt-2 text-emerald-300 font-bold">✔ Successfully initialized PostgreSQL workspace with 38 resources!</div>
                </div>
              )}

              {activeTab === "init-k8s" && (
                <div className="space-y-1">
                  <div className="text-slate-400 flex items-center gap-2">
                    <span className="text-emerald-400">~/workspace</span>
                    <span className="text-cyan-400">$</span>
                    <span className="text-white font-bold">trak init tool/k8s</span>
                  </div>
                  <div className="text-emerald-400">✔ Found Template: Kubernetes & Cloud-Native (CKA/CKAD) (v1.0.0)</div>
                  <div className="text-blue-400">➜ Target Workspace: ./learn-k8s</div>
                  <div className="text-slate-400">✔ Created File: ./learn-k8s/cluster.yaml</div>
                  <div className="text-slate-400">✔ Created Directory: ./learn-k8s/00-control-plane-etcd</div>
                  <div className="text-slate-400">✔ Created Directory: ./learn-k8s/07-statefulsets-and-headless</div>
                  <div className="text-slate-400">✔ Created Directory: ./learn-k8s/12-helm-package-manager</div>
                  <div className="text-emerald-400">✔ Stamped Metadata: ./learn-k8s/trak.json</div>
                  <div className="pt-2 text-emerald-300 font-bold">✔ Successfully initialized Kubernetes CKA workspace with 40 resources!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
