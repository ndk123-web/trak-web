"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Terminal, Check, BookOpen, Layers, ArrowRight } from "lucide-react";
import { TRACKS, CATEGORIES, TrackItem } from "@/data/tracks";
import { SyllabusModal } from "./SyllabusModal";
import { CategoryIcon } from "./CategoryIcon";

export function CatalogExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedTrackId, setCopiedTrackId] = useState<string | null>(null);
  const [activeModalTrack, setActiveModalTrack] = useState<TrackItem | null>(null);

  const filteredTracks = useMemo(() => {
    return TRACKS.filter((track) => {
      const matchesCategory =
        selectedCategory === "all" || track.category === selectedCategory;

      if (!matchesCategory) return false;

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
  }, [selectedCategory, searchQuery]);

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
