"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TRACKS, CATEGORIES, TrackItem } from "@/data/tracks";
import {
  Terminal,
  FolderTree,
  BookOpen,
  Layers,
  Copy,
  Check,
  Search,
  Cpu,
  HardDrive,
  ShieldCheck,
  GitBranch,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function Home() {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [copiedTrack, setCopiedTrack] = useState<string | null>(null);

  const filteredTracks = useMemo(() => {
    return TRACKS.filter((t) => {
      const matchesCat = selectedCat === "all" || t.category === selectedCat;
      const q = search.toLowerCase().trim();
      if (!q) return matchesCat;
      return (
        matchesCat &&
        (t.name.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)))
      );
    });
  }, [selectedCat, search]);

  const copyInitCommand = (trackId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`trak init ${trackId}`);
    setCopiedTrack(trackId);
    setTimeout(() => setCopiedTrack(null), 2000);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Catalog Index Matrix */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Curriculum Catalog
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              19 structured blueprints covering systems programming, operating systems, cloud, and DevOps.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tracks, topics..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-white/[0.08] text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Pillar Filter Tabs */}
        <div className="mt-4 flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none text-xs font-mono">
          <button
            onClick={() => setSelectedCat("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              selectedCat === "all"
                ? "bg-white/[0.1] text-white font-bold"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
            }`}
          >
            All Tracks ({TRACKS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = TRACKS.filter((t) => t.category === cat.id).length;
            const isSelected = selectedCat === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-white/[0.1] text-white font-bold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.title}</span>
                <span className="text-slate-500 font-normal">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Structured Tracks Table / Grid */}
        <div className="mt-4 border border-white/[0.08] rounded-xl overflow-hidden bg-[#080b11]">
          <div className="divide-y divide-white/[0.06]">
            {filteredTracks.map((track) => {
              const isCopied = copiedTrack === track.id;

              return (
                <div
                  key={track.id}
                  className="p-4 hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left: Track ID & Info */}
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {track.id}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 px-1.5 py-0.2 rounded bg-white/[0.04]">
                        {track.modulesCount} modules
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        v{track.version}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-white">
                      <Link
                        href={`/tracks/${track.category}/${track.slug}`}
                        className="hover:text-emerald-400 hover:underline"
                      >
                        {track.name}
                      </Link>
                      <span className="text-slate-400 font-normal text-xs ml-2 hidden sm:inline">
                        — {track.highlight}
                      </span>
                    </div>

                    {/* Topic Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {track.tags.slice(0, 5).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-black/40 text-slate-400 border border-white/[0.04]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Quick Copy Command & Syllabus Link */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      onClick={(e) => copyInitCommand(track.id, e)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Copy init command"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>trak init {track.id}</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={`/tracks/${track.category}/${track.slug}`}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs text-slate-300 hover:text-white transition-colors border border-white/[0.06] flex items-center gap-1"
                    >
                      <span>Syllabus</span>
                      <ArrowRight className="w-3 h-3 text-slate-500" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Technical Architecture & Execution Pipeline */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="pb-4 border-b border-white/[0.08]">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Architecture & Execution Model
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
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
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
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
