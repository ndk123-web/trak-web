"use client";

import React from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { AmbientVideo } from "@/components/AmbientVideo";
import { CategoryIcon } from "@/components/CategoryIcon";
import { TRACKS, CATEGORIES } from "@/data/tracks";
import {
  Terminal,
  FolderTree,
  BookOpen,
  Layers,
  Cpu,
  HardDrive,
  ShieldCheck,
  GitBranch,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-10 pb-20">
      {/* 1. Hero Showcase */}
      <Hero />

      {/* Ambient Video Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-white/[0.08] bg-[#090b10] p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="text-xs font-mono text-slate-400 ml-2">trak-terminal-demo.mp4</span>
            </div>
          </div>

          <AmbientVideo src="https://github.com/user-attachments/assets/9156fea7-4da7-4431-9039-4db4a1ed0b4a" />
        </div>
      </section>

      {/* 2. High-Level 5-Pillar Tracks Overview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#f5f4ef] tracking-tight">
              Curriculum Tracks & Disciplines
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 font-sans">
              19 structured blueprints covering systems programming, kernel internals, databases, and cloud architecture.
            </p>
          </div>

          <Link
            href="/tracks"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white text-zinc-950 text-xs font-mono font-bold hover:bg-slate-200 transition-colors shrink-0 w-fit"
          >
            <span>Browse All 19 Blueprints</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 5-Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => {
            const tracksInCat = TRACKS.filter((t) => t.category === cat.id);
            const totalModules = tracksInCat.reduce((acc, t) => acc + t.modulesCount, 0);

            return (
              <Link
                key={cat.id}
                href={`/tracks/${cat.id}`}
                className="p-5 rounded-xl bg-[#0d0f15] border border-white/[0.08] hover:border-white/[0.18] transition-colors group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                        <CategoryIcon category={cat.id} className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-white group-hover:text-slate-200 transition-colors">
                          {cat.title}
                        </h3>
                        <p className="text-[11px] font-mono text-slate-500">
                          {tracksInCat.length} Blueprints • {totalModules} Modules
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                {/* Track Tags in this Category */}
                <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {tracksInCat.slice(0, 4).map((t) => (
                      <span
                        key={t.slug}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/40 text-slate-400 border border-white/[0.04]"
                      >
                        {t.name.split(" ")[0]}
                      </span>
                    ))}
                    {tracksInCat.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                        +{tracksInCat.length - 4} more
                      </span>
                    )}
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors shrink-0 ml-2" />
                </div>
              </Link>
            );
          })}

          {/* Quickstart Callout Box */}
          <Link
            href="/quickstart"
            className="p-5 rounded-xl bg-[#0d0f15] border border-white/[0.08] hover:border-white/[0.18] transition-colors group flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-300 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] w-fit inline-block">
                CLI Quickstart
              </span>
              <h3 className="font-bold text-sm text-white group-hover:text-slate-200 transition-colors">
                1-Minute Setup Guide
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Install the standalone Trak binary via PowerShell or Bash, then generate your first learning laboratory.
              </p>
            </div>
            <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-slate-300 font-semibold">
              <span>View Quickstart Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Visual Blueprint Studio Spotlight */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-7 rounded-xl bg-[#0d0f15] border border-white/[0.08] relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.08] text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-slate-400" />
              <span>Blueprint Studio • In-Browser Template IDE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Design, Customize & Contribute Track Templates
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Want to add a new curriculum track or customize templates for your team? Blueprint Studio provides an in-browser workspace to scaffold files, write code in Monaco Editor, and export valid AST JSON.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <span>• Zero manual JSON writing</span>
              <span>• Monaco Code Editor</span>
              <span>• 1-Click AST Export for PRs</span>
            </div>
          </div>

          <Link
            href="/studio"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-zinc-950 font-bold text-xs font-mono hover:bg-slate-200 transition-colors shrink-0 cursor-pointer"
          >
            <span>Open Blueprint Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 4. Technical Architecture & Execution Pipeline */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="pb-4 border-b border-white/[0.08]">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#f5f4ef] tracking-tight">
            Architecture & Execution Model
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 font-sans">
            How Trak resolves remote templates and builds local workspaces deterministically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-[#0d0f15] border border-white/[0.08] hover:border-emerald-500/20 transition-colors space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-400">
              01 / Remote AST Resolution
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Queries the remote GitHub registry for <code className="text-emerald-300 font-mono">templates/&lt;category&gt;/&lt;tool&gt;.json</code> without requiring binary updates.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0d0f15] border border-white/[0.08] hover:border-emerald-500/20 transition-colors space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-400">
              02 / Recursive File Generation
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Traverses the node tree and creates directories, code files, and build manifests (<code className="text-slate-200 font-mono">go.mod</code>, <code className="text-slate-200 font-mono">Cargo.toml</code>, <code className="text-slate-200 font-mono">compose.yml</code>).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0d0f15] border border-white/[0.08] hover:border-emerald-500/20 transition-colors space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-400">
              03 / Metadata Stamping
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stamps an immutable <code className="text-emerald-300 font-mono">trak.json</code> manifest locally to track the template version and creation timestamp.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Core Design Guarantees */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="pb-4 border-b border-white/[0.08]">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#f5f4ef] tracking-tight">
            Design Guarantees
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-[#0d0f15] border border-white/[0.08] hover:border-emerald-500/20 transition-colors space-y-2">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Local-First &amp; Offline</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              No cloud accounts, telemetry, or browser sandbox constraints. Workspaces exist natively on your disk and work 100% offline with your preferred IDE (VS Code, GoLand, Neovim).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0d0f15] border border-white/[0.08] hover:border-emerald-500/20 transition-colors space-y-2">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Production Internals Depth</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curriculums focus on production mechanics: memory pointer semantics, PostgreSQL MVCC visibility maps, Rust Tokio async runtime, and Linux kernel process signals.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions (FAQ) */}
      <HomeFAQ />
    </div>
  );
}

function HomeFAQItem({ q, children }: { q: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left cursor-pointer group"
      >
        <span className="text-[13px] font-medium text-slate-200 group-hover:text-emerald-400 transition-colors leading-snug">
          {q}
        </span>
        <svg
          className={`w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pb-4 text-xs text-slate-400 leading-relaxed font-sans -mt-1 pr-8">
          {children}
        </div>
      )}
    </div>
  );
}

function HomeFAQ() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="pb-4 border-b border-white/[0.08]">
        <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#f5f4ef] tracking-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
        {/* Column 1 */}
        <div className="rounded-lg border border-white/[0.08] px-4 bg-[#0d0f15]">
          <HomeFAQItem q="How does Trak work offline?">
            When you run <code className="text-emerald-400 font-mono bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/20">trak init</code>, Trak fetches the blueprint JSON once, then writes every directory, source file, and build manifest directly to your local disk. After that initial fetch, your entire workspace is yours — no servers, no telemetry, no browser sandbox. Open it in VS Code, GoLand, or Neovim and work completely offline.
          </HomeFAQItem>
          <HomeFAQItem q="What is the difference between Official and Community tracks?">
            <strong className="text-white">Official tracks</strong> (e.g. <code className="text-emerald-400 font-mono">trak init lang/go</code>) are curated by the Trak maintainers and live under <code className="text-slate-300 font-mono">templates/</code> in the registry. <strong className="text-white">Community tracks</strong> (e.g. <code className="text-emerald-300 font-mono">trak init alice/lang/go</code>) are authored by developers worldwide and live under <code className="text-slate-300 font-mono">users/alice/</code>. Both go through the same CI validation.
          </HomeFAQItem>
          <HomeFAQItem q="Can I customize where Trak creates the workspace?">
            Yes. By default, Trak creates a <code className="text-slate-300 font-mono">./learn-&lt;tool&gt;</code> folder. Use the <code className="text-emerald-400 font-mono">--path</code> flag to pick any location: <code className="text-slate-300 font-mono">trak init lang/rust --path ./my-rust-lab</code>.
          </HomeFAQItem>
        </div>

        {/* Column 2 */}
        <div className="rounded-lg border border-white/[0.08] px-4 bg-[#0d0f15]">
          <HomeFAQItem q="How do I publish a custom track for my team or students?">
            Build your curriculum in <Link href="/studio" className="text-emerald-400 hover:underline">Blueprint Studio</Link>, export the AST JSON, fork the <a href="https://github.com/ndk123-web/trak-registry" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">trak-registry</a> repo, place your file at <code className="text-slate-300 font-mono">users/&lt;your-username&gt;/&lt;category&gt;/&lt;track&gt;.json</code>, and submit a PR. See the <Link href="/registry" className="text-emerald-400 hover:underline">full publishing guide</Link> for details.
          </HomeFAQItem>
          <HomeFAQItem q="Can I publish multiple versions of the same track?">
            Yes. Append <code className="text-emerald-400 font-mono bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/20">@version</code> to the filename (e.g. <code className="text-slate-300 font-mono">postgres@v1.1.0.json</code>). Users install a specific version with <code className="text-slate-300 font-mono">trak init alice/db/postgres@v1.1.0</code>. The default (no version) resolves to <code className="text-slate-300 font-mono">postgres.json</code>.
          </HomeFAQItem>
          <HomeFAQItem q="What languages and tools are supported?">
            Trak currently ships 19 official tracks across 5 pillars: programming languages (Go, Rust, Python, C, C++, Java, JavaScript), databases (PostgreSQL, Redis, SQL), operating systems (Linux), cloud platforms (AWS, Docker, Kubernetes, Terraform, Ansible), and devtools (Git, GitHub Actions, Nginx). Community contributors can add any topic.
          </HomeFAQItem>
          <HomeFAQItem q="Which tracks support automated testing with 'trak verify'?">
            Native automated test verification is available across <strong className="text-white">7 programming language tracks</strong>: Go (<code className="text-emerald-300 font-mono">go test</code>), Python (<code className="text-emerald-300 font-mono">unittest</code>), Rust (<code className="text-emerald-300 font-mono">cargo test</code>), JavaScript (<code className="text-emerald-300 font-mono">node --test</code>), TypeScript (<code className="text-emerald-300 font-mono">node --test</code>), C (<code className="text-emerald-300 font-mono">gcc/clang</code>), and C++ (<code className="text-emerald-300 font-mono">g++/clang++</code>). Trak detects compiler binaries directly in your PATH as defined in <code className="text-slate-300 font-mono">internal/shared/runtimes.go</code>. Run <code className="text-emerald-400 font-mono">trak verify allowlists</code> to audit your toolchain readiness. The remaining 12 tracks (OS, Cloud, DB, DevOps) are hands-on labs verified with <code className="text-white font-mono">trak done &lt;module&gt;</code>.
          </HomeFAQItem>
        </div>
      </div>
    </section>
  );
}
