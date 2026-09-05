"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Terminal, Check, BookOpen, Layers, ArrowRight, ShieldCheck, CheckCircle2, Info, ChevronDown, ChevronUp, Wrench } from "lucide-react";
import { TRACKS, CATEGORIES, TrackItem, VERIFY_RUNTIMES, isVerifySupported } from "@/data/tracks";
import { SyllabusModal } from "./SyllabusModal";
import { CategoryIcon } from "./CategoryIcon";

export function CatalogExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [verifyFilter, setVerifyFilter] = useState<"all" | "verify" | "done">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedTrackId, setCopiedTrackId] = useState<string | null>(null);
  const [activeModalTrack, setActiveModalTrack] = useState<TrackItem | null>(null);
  const [showRuntimesGuide, setShowRuntimesGuide] = useState<boolean>(false);

  const filteredTracks = useMemo(() => {
    return TRACKS.filter((track) => {
      const matchesCategory =
        selectedCategory === "all" || track.category === selectedCategory;

      if (!matchesCategory) return false;

      const isAutomated = isVerifySupported(track.id);
      if (verifyFilter === "verify" && !isAutomated) return false;
      if (verifyFilter === "done" && isAutomated) return false;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;

      const matchesSearch =
        track.name.toLowerCase().includes(query) ||
        track.id.toLowerCase().includes(query) ||
        track.description.toLowerCase().includes(query) ||
        track.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        track.modules.some((m) =>
          m.title.toLowerCase().includes(query) ||
          m.topics.some((t) => t.toLowerCase().includes(query))
        );

      return matchesSearch;
    });
  }, [selectedCategory, verifyFilter, searchQuery]);

  const handleCopyCommand = (track: TrackItem, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(track.initCommand);
    setCopiedTrackId(track.id);
    setTimeout(() => setCopiedTrackId(null), 2000);
  };

  return (
    <section id="catalog" className="w-full relative pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-normal text-[#f5f4ef] tracking-tight">
            All 19 Engineering Blueprints
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed">
            Each track contains 17 to 24 in-depth modules with starter code, exercises, test suites, and documentation.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="space-y-4">
          {/* Category Tabs - Clean High-Contrast Wrap */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-2 ${
                selectedCategory === "all"
                  ? "bg-white text-zinc-950 font-bold"
                  : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.06]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Tracks</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] ${selectedCategory === "all" ? "bg-zinc-200 text-zinc-900" : "bg-black/40 text-slate-400"}`}>
                {TRACKS.length}
              </span>
            </button>

            {CATEGORIES.map((cat) => {
              const count = TRACKS.filter((t) => t.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? "bg-white text-zinc-950 font-bold"
                      : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.06]"
                  }`}
                >
                  <CategoryIcon category={cat.id} className="w-3.5 h-3.5" />
                  <span>{cat.title}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] ${isSelected ? "bg-zinc-200 text-zinc-900" : "bg-black/40 text-slate-400"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Verification Mode Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto pt-1">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Verification:</span>
            <button
              onClick={() => setVerifyFilter("all")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                verifyFilter === "all"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                  : "bg-black/30 text-slate-400 hover:text-slate-200 border border-white/[0.04]"
              }`}
            >
              All Blueprints (19)
            </button>
            <button
              onClick={() => setVerifyFilter("verify")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                verifyFilter === "verify"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                  : "bg-black/30 text-slate-400 hover:text-slate-200 border border-white/[0.04]"
              }`}
            >
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Automated verify (7)</span>
            </button>
            <button
              onClick={() => setVerifyFilter("done")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                verifyFilter === "done"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                  : "bg-black/30 text-slate-400 hover:text-slate-200 border border-white/[0.04]"
              }`}
            >
              <Terminal className="w-3 h-3 text-slate-500" />
              <span>Architectural done (12)</span>
            </button>
            <button
              onClick={() => setShowRuntimesGuide(!showRuntimesGuide)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                showRuntimesGuide
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                  : "bg-black/30 text-slate-400 hover:text-slate-200 border border-white/[0.04]"
              }`}
              title="Toggle CLI Verification Runtimes Guide"
            >
              <Wrench className="w-3 h-3 text-cyan-400" />
              <span>Runtimes Matrix</span>
              {showRuntimesGuide ? (
                <ChevronUp className="w-3 h-3 text-cyan-400" />
              ) : (
                <ChevronDown className="w-3 h-3 text-slate-500" />
              )}
            </button>
          </div>

          {/* Search Input Box */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, tag, or topic..."
              className="w-full pl-9 pr-16 py-2 rounded-lg bg-[#090b10] border border-white/10 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/40 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-white/5"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Verification Runtimes Matrix Card (Shows when filtered to verify or toggled) */}
        {(showRuntimesGuide || verifyFilter === "verify") && (
          <div className="rounded-xl p-5 bg-[#0d0f15] border border-emerald-500/30 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Automated Verification Toolchains (7 of 19 Blueprints)
                </h3>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <span className="text-slate-400">System Audit:</span>
                <code className="text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  trak verify allowlists
                </code>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Trak CLI features native automated exercise verification for 7 programming languages via toolchains configured in <code className="text-emerald-400 font-mono">internal/shared/runtimes.go</code>. When you run <code className="text-slate-200 font-mono">trak verify</code> inside any of these workspaces, Trak resolves your PATH compiler, executes the test suite, and marks the module complete.
            </p>

            <div className="overflow-x-auto rounded-lg border border-white/[0.06] bg-black/40">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/[0.06] text-slate-400">
                    <th className="px-3 py-2">Track</th>
                    <th className="px-3 py-2">Track ID</th>
                    <th className="px-3 py-2">Automated Test Runner</th>
                    <th className="px-3 py-2">Toolchain Lookups</th>
                    <th className="px-3 py-2">Verification Command</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-3 py-2 font-bold text-white">Go</td>
                    <td className="px-3 py-2 text-emerald-400">lang/go</td>
                    <td className="px-3 py-2 text-slate-300">go test -v ./...</td>
                    <td className="px-3 py-2 text-cyan-300">go</td>
                    <td className="px-3 py-2 text-slate-400"><code className="text-slate-200">trak verify [module]</code></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-3 py-2 font-bold text-white">Python</td>
                    <td className="px-3 py-2 text-emerald-400">lang/python</td>
                    <td className="px-3 py-2 text-slate-300">python -m unittest discover</td>
                    <td className="px-3 py-2 text-cyan-300">python, python3</td>
                    <td className="px-3 py-2 text-slate-400"><code className="text-slate-200">trak verify [module]</code></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-3 py-2 font-bold text-white">Rust</td>
                    <td className="px-3 py-2 text-emerald-400">lang/rust</td>
                    <td className="px-3 py-2 text-slate-300">cargo test</td>
                    <td className="px-3 py-2 text-cyan-300">cargo</td>
                    <td className="px-3 py-2 text-slate-400"><code className="text-slate-200">trak verify [module]</code></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-3 py-2 font-bold text-white">JavaScript</td>
                    <td className="px-3 py-2 text-emerald-400">lang/javascript</td>
                    <td className="px-3 py-2 text-slate-300">node --test</td>
                    <td className="px-3 py-2 text-cyan-300">node, bun</td>
                    <td className="px-3 py-2 text-slate-400"><code className="text-slate-200">trak verify [module]</code></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-3 py-2 font-bold text-white">TypeScript</td>
                    <td className="px-3 py-2 text-emerald-400">lang/typescript</td>
                    <td className="px-3 py-2 text-slate-300">node --test</td>
                    <td className="px-3 py-2 text-cyan-300">node, bun</td>
                    <td className="px-3 py-2 text-slate-400"><code className="text-slate-200">trak verify [module]</code></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-3 py-2 font-bold text-white">C Systems</td>
                    <td className="px-3 py-2 text-emerald-400">lang/c</td>
                    <td className="px-3 py-2 text-slate-300">gcc / clang (-std=c11 -lm)</td>
                    <td className="px-3 py-2 text-cyan-300">gcc, clang</td>
                    <td className="px-3 py-2 text-slate-400"><code className="text-slate-200">trak verify [module]</code></td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="px-3 py-2 font-bold text-white">Modern C++</td>
                    <td className="px-3 py-2 text-emerald-400">lang/cpp</td>
                    <td className="px-3 py-2 text-slate-300">g++ / clang++ (-std=c++17)</td>
                    <td className="px-3 py-2 text-cyan-300">g++, clang++</td>
                    <td className="px-3 py-2 text-slate-400"><code className="text-slate-200">trak verify [module]</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400">
              <div>
                <span className="text-slate-300 font-bold">Remaining 12 Tracks: </span>
                <span>Linux, Docker, Kubernetes, AWS, Terraform, Ansible, PostgreSQL, Redis, SQL, Git, GitHub Actions, Nginx are hands-on architectural labs verified via <code className="text-white">trak done &lt;module&gt;</code>.</span>
              </div>
              <Link
                href="/cli/verify"
                className="text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 shrink-0 font-bold"
              >
                <span>Full CLI verify documentation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono pb-2 border-b border-white/[0.06]">
          <span>
            Showing <strong className="text-white">{filteredTracks.length}</strong> of {TRACKS.length} blueprints
          </span>
          <span className="hidden sm:inline text-slate-400">
            <span className="text-emerald-400 font-bold">$ </span>trak init &lt;category&gt;/&lt;track&gt;
          </span>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTracks.map((track) => {
            const isCopied = copiedTrackId === track.id;
            const hasVerify = isVerifySupported(track.id);

            return (
              <div
                key={track.id}
                onClick={() => setActiveModalTrack(track)}
                className="rounded-xl p-5 flex flex-col justify-between cursor-pointer group bg-[#0d0f15] border border-white/[0.08] hover:border-emerald-500/20 transition-colors"
              >
                <div className="space-y-2.5">
                  {/* Top Category & Version */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                      <span>{track.categoryName}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      v{track.version}
                    </span>
                  </div>

                  {/* Title & Modules Count */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {track.name}
                    </h3>
                    <span className="shrink-0 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-slate-300 text-[10px] font-mono font-medium">
                      {track.modulesCount} Modules
                    </span>
                  </div>

                  {/* Verification Mode Pill */}
                  {hasVerify ? (
                    <div className="flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono">
                      <div className="flex items-center gap-1 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>trak verify</span>
                      </div>
                      <span className="text-slate-400 truncate max-w-[170px]">
                        {VERIFY_RUNTIMES[track.id].testRunner}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded bg-black/40 border border-white/[0.04] text-[10px] font-mono text-slate-400">
                      <div className="flex items-center gap-1 text-slate-300">
                        <Terminal className="w-3 h-3 text-slate-500 shrink-0" />
                        <span>trak done</span>
                      </div>
                      <span className="text-slate-500 truncate">
                        Architectural lab
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 font-sans">
                    {track.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {track.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-black/40 text-slate-400 border border-white/[0.04]"
                      >
                        #{tag}
                      </span>
                    ))}
                    {track.tags.length > 4 && (
                      <span className="px-1 py-0.2 text-[10px] font-mono text-slate-500">
                        +{track.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => handleCopyCommand(track, e)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#141720] hover:bg-[#1c202d] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Copy CLI command"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="truncate">trak init {track.id}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalTrack(track);
                    }}
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors border border-white/[0.06]"
                    title="View Full Syllabus"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredTracks.length === 0 && (
          <div className="text-center py-16 bg-[#0d0f15] border border-white/[0.06] rounded-xl space-y-3">
            <p className="text-base text-slate-300 font-medium">
              No matching tracks found for &quot;{searchQuery}&quot;
            </p>
            <p className="text-xs text-slate-500">
              Try searching by general topic, such as &quot;concurrency&quot;, &quot;kernel&quot;, &quot;postgres&quot;, or &quot;kubernetes&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white transition-colors font-mono"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Community Blueprints Callout */}
        <div className="p-5 rounded-xl bg-[#0d0f15] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
              <span>Looking for community or versioned tracks?</span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Initialize tracks from any creator with <code className="text-slate-300 font-mono">trak init &lt;username&gt;/&lt;category&gt;/&lt;tool&gt;[@version]</code>, or publish your own via GitOps.
            </p>
          </div>
          <Link
            href="/registry"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-colors border border-white/[0.06] shrink-0 w-fit"
          >
            <span>Publishing Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Syllabus Modal */}
      <SyllabusModal
        track={activeModalTrack}
        onClose={() => setActiveModalTrack(null)}
      />
    </section>
  );
}
