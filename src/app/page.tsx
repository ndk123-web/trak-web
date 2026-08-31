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
  ExternalLink,
  Sparkles
} from "lucide-react";

export default function Home() {

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Section */}
      <Hero />

      {/* 1.5 Ambient Showcase Terminal Video */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/[0.08] bg-[#080b11] overflow-hidden shadow-2xl">
          {/* Ambient Window Header */}
          <div className="px-4 py-2.5 bg-[#0c101a] border-b border-white/[0.06] flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-2 text-[11px] font-mono text-slate-500">
                trak — live materialization
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              v1.0.0
            </span>
          </div>

          <div className="bg-black aspect-video flex items-center justify-center">
            <AmbientVideo src="https://github.com/user-attachments/assets/4210baaf-ef0d-469b-9a8a-f0e244d9b9a3" />
          </div>
        </div>
      </section>

      {/* 2. High-Level 5-Pillar Tracks Overview (Clean & Uncluttered) */}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-mono font-bold transition-all shadow-md shadow-emerald-500/20 shrink-0 w-fit"
          >
            <span>Explore All 19 Blueprints</span>
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
                className="p-5 rounded-2xl bg-[#080b11] border border-white/[0.08] hover:border-white/[0.18] transition-all group flex flex-col justify-between space-y-4 hover:-translate-y-0.5 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06] group-hover:scale-105 transition-transform">
                        <CategoryIcon category={cat.id} className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
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
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-slate-300 border border-white/[0.06]"
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
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </div>
              </Link>
            );
          })}

          {/* Quickstart Callout Box */}
          <Link
            href="/quickstart"
            className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-[#080b11] to-transparent border border-emerald-500/25 hover:border-emerald-500/40 transition-all group flex flex-col justify-between space-y-4 hover:-translate-y-0.5"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/25 w-fit inline-block">
                CLI Quickstart
              </span>
              <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                1-Minute Setup Guide
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Install the single standalone Trak binary via PowerShell or Bash, then generate your first learning laboratory.
              </p>
            </div>
            <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-emerald-400 font-semibold">
              <span>View Quickstart Guide</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Visual Blueprint Studio Spotlight (For Creators & Customizers) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c121e] via-[#080b11] to-[#0a101d] border border-emerald-500/25 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Blueprint Studio • In-Browser Template IDE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Design, Customize & Contribute Track Templates
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Want to add a new curriculum track or customize templates for your team? Blueprint Studio provides a full in-browser VS Code workspace to scaffold files, write starter code in Monaco Editor, and export valid AST JSON with 1 click.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-1">
              <span className="flex items-center gap-1.5 text-emerald-400">
                • Zero manual JSON writing
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                • Real Monaco Code Editor
              </span>
              <span className="flex items-center gap-1.5 text-indigo-400">
                • 1-Click AST Export for PRs
              </span>
            </div>
          </div>

          <Link
            href="/studio"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-lg shadow-emerald-500/20 shrink-0 cursor-pointer"
          >
            <span>Open Blueprint Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. Technical Architecture & Execution Pipeline */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="pb-4 border-b border-white/[0.08]">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#f5f4ef] tracking-tight">
            Architecture & Execution Model
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 font-sans">
            How Trak resolves remote templates and builds local workspaces deterministically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-[#080b11] border border-white/[0.08] space-y-2.5">
            <div className="text-xs font-mono font-bold text-emerald-400">
              01 / Remote AST Resolution
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Queries the remote GitHub registry for <code className="text-slate-200 font-mono">templates/&lt;category&gt;/&lt;tool&gt;.json</code> without requiring binary updates.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#080b11] border border-white/[0.08] space-y-2.5">
            <div className="text-xs font-mono font-bold text-cyan-400">
              02 / Recursive File Generation
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Traverses the node tree and creates directories, code files, and build manifests (<code className="text-slate-200 font-mono">go.mod</code>, <code className="text-slate-200 font-mono">Cargo.toml</code>, <code className="text-slate-200 font-mono">compose.yml</code>).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#080b11] border border-white/[0.08] space-y-2.5">
            <div className="text-xs font-mono font-bold text-indigo-400">
              03 / Metadata Stamping
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Stamps an immutable <code className="text-slate-200 font-mono">trak.json</code> manifest locally to track the template version and creation timestamp.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Core Design Guarantees */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="pb-4 border-b border-white/[0.08]">
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#f5f4ef] tracking-tight">
            Design Guarantees
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-xl bg-[#080b11] border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Local-First & Offline</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              No cloud accounts, telemetry, or browser sandbox constraints. Workspaces exist natively on your disk and work 100% offline with your preferred IDE (VS Code, GoLand, Neovim).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#080b11] border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Production Internals Depth</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curriculums focus on production mechanics: memory pointer semantics, PostgreSQL MVCC visibility maps, Rust Tokio async runtime, and Linux kernel process signals.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
