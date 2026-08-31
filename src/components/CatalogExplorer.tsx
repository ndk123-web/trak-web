"use client";

import React, { useState, useMemo } from "react";
import { Search, Terminal, Copy, Check, BookOpen, Sparkles, Layers, ArrowUpRight } from "lucide-react";
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

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        track.name.toLowerCase().includes(query) ||
        track.id.toLowerCase().includes(query) ||
        track.description.toLowerCase().includes(query) ||
        track.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        track.modules.some((m) =>
          m.title.toLowerCase().includes(query) ||
          m.topics.some((t) => t.toLowerCase().includes(query))
        );

      return matchesCategory && matchesSearch;
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
      {/* Background Radial Tint */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Heading - Centered & Responsive */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Catalog Explorer</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-normal text-[#f5f4ef] tracking-tight">
            All 19 Engineering Blueprints
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-sans leading-relaxed">
            Each track includes 17 to 24 in-depth modules with working starter code, hints, auto-verification tests, and solution guides.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="space-y-4">
          {/* Category Tabs - Natural Centered Wrap (Zero Clipping on All Screens) */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
                selectedCategory === "all"
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Tracks</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/20 text-[10px]">
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
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                      : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5"
                  }`}
                >
                  <CategoryIcon category={cat.id} className="w-3.5 h-3.5" />
                  <span>{cat.title}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-black/20 text-[10px]">
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
              className="w-full pl-9 pr-16 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-all shadow-inner"
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
          <span className="hidden sm:inline text-emerald-400">
            $ trak init &lt;category&gt;/&lt;track&gt;
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
                className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between cursor-pointer group relative overflow-hidden bg-[#080b11] border border-white/[0.08] hover:border-white/[0.18] transition-all"
              >
                {/* Top Subtle Gradient Accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${track.accentGradient}`}
                />

                <div className="space-y-3">
                  {/* Top Category & Version Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                      <span>{track.categoryName}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      v{track.version}
                    </span>
                  </div>

                  {/* Title & Modules Count */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {track.name}
                    </h3>
                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-medium">
                      {track.modulesCount} Modules
                    </span>
                  </div>

                  {/* Highlight sentence */}
                  <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3 shrink-0" />
                    <span className="line-clamp-1">{track.highlight}</span>
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
                        className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-white/5"
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
                    className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
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
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5"
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
          <div className="text-center py-16 bg-[#080b11] border border-white/5 rounded-2xl space-y-3">
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
              className="mt-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white transition-colors font-mono"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Syllabus Modal */}
      <SyllabusModal
        track={activeModalTrack}
        onClose={() => setActiveModalTrack(null)}
      />
    </section>
  );
}
