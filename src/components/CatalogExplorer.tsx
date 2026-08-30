"use client";

import React, { useState, useMemo } from "react";
import { Search, Terminal, Copy, Check, BookOpen, Sparkles, Layers, ArrowUpRight } from "lucide-react";
import { TRACKS, CATEGORIES, TrackItem } from "@/data/tracks";
import { SyllabusModal } from "./SyllabusModal";

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
    <section id="catalog" className="py-20 bg-[#07090e] border-t border-white/5 relative">
      {/* Background Radial Tint */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Catalog Explorer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Browse All 19 Engineering Blueprints
          </h2>
          <p className="text-slate-400 mt-3 text-base sm:text-lg">
            Each track comes with 17 to 24 in-depth modules containing source code, configurations, and structured cheatsheet READMEs.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="mt-12 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                selectedCategory === "all"
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                  : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5"
              }`}
            >
              <span>✨ All Tracks</span>
              <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px]">
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
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                      : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5"
                  }`}
                >
                  <span>{cat.icon} {cat.title}</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-black/20 text-[10px]">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tracks by name, tag, or topic (e.g. concurrency, mvcc, tokio, fastapi)..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 backdrop-blur-md transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-8 flex items-center justify-between text-xs text-slate-400 max-w-7xl mx-auto">
          <span>
            Showing <strong className="text-white">{filteredTracks.length}</strong> of {TRACKS.length} blueprints
          </span>
          <span className="font-mono text-emerald-400">
            $ trak init &lt;category&gt;/&lt;track&gt;
          </span>
        </div>

        {/* Tracks Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track) => {
            const isCopied = copiedTrackId === track.id;

            return (
              <div
                key={track.id}
                onClick={() => setActiveModalTrack(track)}
                className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
              >
                {/* Top Subtle Gradient Accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${track.accentGradient}`}
                />

                <div>
                  {/* Top Category & Version Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
                      <span>{track.categoryName}</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      v{track.version}
                    </span>
                  </div>

                  {/* Title & Modules Count */}
                  <div className="mt-4 flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {track.name}
                    </h3>
                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono font-medium">
                      {track.modulesCount} Modules
                    </span>
                  </div>

                  {/* Highlight sentence */}
                  <div className="mt-1.5 text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3 shrink-0" />
                    <span>{track.highlight}</span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {track.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {track.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/80 text-slate-400 border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                    {track.tags.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                        +{track.tags.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <button
                    onClick={(e) => handleCopyCommand(track, e)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-xs font-mono text-slate-200 transition-all cursor-pointer group/btn"
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
                        <span>trak init {track.id}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveModalTrack(track)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer"
                    title="View complete syllabus"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTracks.length === 0 && (
          <div className="mt-12 text-center py-16 glass-panel rounded-2xl max-w-xl mx-auto">
            <Search className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white mt-3">No matching tracks found</h3>
            <p className="text-xs text-slate-400 mt-1">
              Try searching with another keyword like &quot;concurrency&quot;, &quot;docker&quot;, or &quot;python&quot;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold"
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
