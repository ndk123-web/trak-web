"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TrackItem } from "@/data/tracks";
import {
  Terminal,
  BookOpen,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  FolderTree,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

interface TrackDetailClientProps {
  track: TrackItem;
  relatedTracks: TrackItem[];
}

export function TrackDetailClient({ track, relatedTracks }: TrackDetailClientProps) {
  const [copied, setCopied] = useState(false);
  const [selectedModuleIdx, setSelectedModuleIdx] = useState<number>(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(track.initCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedModule = track.modules[selectedModuleIdx] || track.modules[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Track Hero Banner */}
      <div className="rounded-xl p-6 sm:p-8 bg-[#0d0f15] border border-white/[0.08] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <Link
                href={`/tracks/${track.category}`}
                className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold hover:bg-emerald-500/20 transition-colors"
              >
                {track.categoryName}
              </Link>
              <span className="text-xs font-mono text-slate-500">
                v{track.version}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-normal text-white tracking-tight">
              {track.name}
            </h1>

            <p className="text-xs font-mono text-emerald-400 font-medium">
              {track.highlight}
            </p>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
              {track.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {track.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/40 text-slate-400 border border-white/[0.04]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick CLI Box */}
          <div className="lg:w-80 shrink-0 space-y-3">
            <div className="p-4 rounded-xl bg-[#080a0f] border border-white/[0.08] space-y-2.5">
              <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Initialize Workspace</span>
              </div>

              <div className="p-2.5 rounded-lg bg-black/60 border border-white/[0.06] font-mono text-xs text-slate-200 select-all">
                <span className="text-emerald-400 font-bold">$ </span>{track.initCommand}
              </div>

              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white text-zinc-950 hover:bg-slate-200 font-bold text-xs font-mono transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied Command</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Command</span>
                  </>
                )}
              </button>

              <div className="text-[10px] text-slate-500 text-center font-mono">
                Creates ./learn-{track.slug} in current directory
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Curriculum Modules Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Module List Navigator */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Curriculum Modules ({track.modules.length})</span>
            </div>
          </div>

          <div className="max-h-[600px] overflow-y-auto space-y-1.5 pr-1">
            {track.modules.map((mod, idx) => {
              const isSelected = selectedModuleIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedModuleIdx(idx)}
                  className={`w-full text-left p-3 rounded-lg transition-colors border flex items-start gap-2.5 cursor-pointer ${
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                      : "bg-[#0d0f15] hover:bg-white/[0.04] border-white/[0.06] text-slate-300"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[11px] font-bold shrink-0 ${
                      isSelected
                        ? "bg-emerald-500 text-slate-950 font-bold"
                        : "bg-white/[0.06] text-slate-400"
                    }`}
                  >
                    {mod.number}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold truncate">
                      {mod.title}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5 font-sans">
                      {mod.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Module Deep-Dive Inspector */}
        <div className="lg:col-span-7">
          <div className="rounded-xl p-6 bg-[#0d0f15] border border-white/[0.08] space-y-5 sticky top-24">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs font-bold">
                Module {selectedModule.number}
              </span>
              <span className="text-xs font-mono text-slate-500">
                {selectedModuleIdx + 1} of {track.modules.length}
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-white">
                {selectedModule.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {selectedModule.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Topics in this Module:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedModule.topics.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#080a0f] text-emerald-300 border border-white/[0.06]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-[#080a0f] border border-white/[0.06] text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-300 font-bold font-mono text-[11px]">
                <FolderTree className="w-3.5 h-3.5 text-emerald-400" />
                <span>Generated File Structure:</span>
              </div>
              <div className="font-mono text-slate-400 text-[11px] pl-4 space-y-0.5">
                <div>├── {selectedModule.number}-{selectedModule.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}</div>
                <div className="pl-4 text-emerald-400">├── README.md (Comprehensive Guide &amp; Architecture)</div>
                <div className="pl-4 text-cyan-400">└── main (Hands-on Source Code Exercises)</div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <button
                onClick={() =>
                  setSelectedModuleIdx((prev) => Math.max(0, prev - 1))
                }
                disabled={selectedModuleIdx === 0}
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border border-white/[0.06] cursor-pointer"
              >
                ← Previous
              </button>

              <button
                onClick={() =>
                  setSelectedModuleIdx((prev) =>
                    Math.min(track.modules.length - 1, prev + 1)
                  )
                }
                disabled={selectedModuleIdx === track.modules.length - 1}
                className="px-3 py-1.5 rounded-lg bg-white text-zinc-950 hover:bg-slate-200 text-xs font-mono font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tracks */}
      {relatedTracks.length > 0 && (
        <div className="pt-6 border-t border-white/[0.06] space-y-4">
          <h3 className="text-base font-bold text-white">
            More in {track.categoryName}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedTracks.map((rel) => (
              <Link
                key={rel.id}
                href={`/tracks/${rel.category}/${rel.slug}`}
                className="p-4 rounded-xl bg-[#0d0f15] border border-white/[0.08] hover:border-emerald-500/20 flex items-center justify-between group transition-colors"
              >
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1 font-sans">
                    {rel.highlight}
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
