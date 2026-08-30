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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Track Hero Banner */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <Link
                href={`/tracks/${track.category}`}
                className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 border border-white/10 text-emerald-400 font-bold hover:bg-white/10 transition-colors"
              >
                {track.categoryName}
              </Link>
              <span className="text-xs font-mono text-slate-400">
                v{track.version}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {track.name}
            </h1>

            <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>{track.highlight}</span>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {track.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {track.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 text-slate-300 border border-white/5"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick CLI Box */}
          <div className="lg:w-80 shrink-0 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
              <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Initialize Workspace</span>
              </div>

              <div className="p-3 rounded-xl bg-[#07090e] border border-white/5 font-mono text-xs text-emerald-400 select-all">
                $ {track.initCommand}
              </div>

              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Init Command</span>
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Module List Navigator */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Curriculum Modules ({track.modules.length})</span>
            </div>
          </div>

          <div className="max-h-[600px] overflow-y-auto space-y-2 pr-2">
            {track.modules.map((mod, idx) => {
              const isSelected = selectedModuleIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedModuleIdx(idx)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all border flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? "bg-emerald-500/15 border-emerald-500/30 text-white shadow-sm"
                      : "bg-slate-900/60 hover:bg-slate-900 border-white/5 text-slate-300"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                      isSelected
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-white/5 text-slate-400"
                    }`}
                  >
                    {mod.number}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold truncate">
                      {mod.title}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">
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
          <div className="glass-panel rounded-2xl p-8 border border-white/10 space-y-6 sticky top-24">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs font-bold">
                Module {selectedModule.number}
              </span>
              <span className="text-xs font-mono text-slate-500">
                {selectedModuleIdx + 1} of {track.modules.length}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">
                {selectedModule.title}
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                {selectedModule.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Topics Covered in this Module:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedModule.topics.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 text-slate-200 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-slate-300 font-bold font-mono">
                <FolderTree className="w-3.5 h-3.5 text-emerald-400" />
                <span>Generated File Structure:</span>
              </div>
              <div className="font-mono text-slate-400 text-[11px] pl-5 space-y-1">
                <div>├── {selectedModule.number}-{selectedModule.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}</div>
                <div className="pl-4 text-emerald-400">├── README.md (Comprehensive Guide & Cheatsheet)</div>
                <div className="pl-4 text-cyan-400">└── main (Hands-on Source Code Exercises)</div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() =>
                  setSelectedModuleIdx((prev) => Math.max(0, prev - 1))
                }
                disabled={selectedModuleIdx === 0}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Previous Module
              </button>

              <button
                onClick={() =>
                  setSelectedModuleIdx((prev) =>
                    Math.min(track.modules.length - 1, prev + 1)
                  )
                }
                disabled={selectedModuleIdx === track.modules.length - 1}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next Module →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tracks */}
      {relatedTracks.length > 0 && (
        <div className="pt-8 border-t border-white/5 space-y-6">
          <h3 className="text-xl font-bold text-white">
            More in {track.categoryName}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedTracks.map((rel) => (
              <Link
                key={rel.id}
                href={`/tracks/${rel.category}/${rel.slug}`}
                className="glass-panel glass-panel-hover rounded-2xl p-6 flex items-center justify-between group"
              >
                <div>
                  <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                    {rel.highlight}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
