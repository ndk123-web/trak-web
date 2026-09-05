"use client";

import React, { useEffect, useState } from "react";
import { X, Copy, Check, Terminal, BookOpen, Layers, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { TrackItem, VERIFY_RUNTIMES, isVerifySupported } from "@/data/tracks";

interface SyllabusModalProps {
  track: TrackItem | null;
  onClose: () => void;
}

export function SyllabusModal({ track, onClose }: SyllabusModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!track) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(track.initCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl bg-[#0b0f19] border border-white/10 shadow-2xl overflow-hidden z-10">
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 bg-[#0e1424]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                  {track.categoryName}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  v{track.version}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mt-2 flex items-center gap-2.5">
                <span>{track.name}</span>
                <span className="text-sm font-normal text-slate-400 font-mono">
                  ({track.modulesCount} Modules)
                </span>
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-xl">
                {track.description}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick CLI Command */}
          <div className="mt-5 flex items-center justify-between gap-3 p-3 rounded-xl bg-[#07090e] border border-white/5 font-mono text-xs">
            <div className="flex items-center gap-2 text-emerald-400 overflow-x-auto">
              <Terminal className="w-4 h-4 shrink-0" />
              <span className="text-slate-200 font-bold">$ {track.initCommand}</span>
            </div>
            <button
              onClick={handleCopy}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Command"}</span>
            </button>
          </div>

          {/* Verification Method Box */}
          <div className="mt-2.5 p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs">
            {isVerifySupported(track.id) ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Automated Verification: trak verify</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Runner: <code className="text-emerald-300 font-mono">{VERIFY_RUNTIMES[track.id].testRunner}</code> • Toolchain: <span className="text-cyan-300 font-mono">{VERIFY_RUNTIMES[track.id].toolchain}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-400">
                <div className="flex items-center gap-2 text-slate-300">
                  <Terminal className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Architectural Laboratory Track</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Mark exercises via: <code className="text-emerald-400 font-mono font-bold">trak done &lt;module&gt;</code>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Body: Syllabus Modules List */}
        <div className="p-6 overflow-y-auto space-y-3 divide-y divide-white/5">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2 pb-1">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Complete Modular Curriculum Breakdown</span>
          </div>

          {track.modules.map((mod, idx) => (
            <div key={idx} className="pt-3.5 first:pt-0 flex items-start gap-4 group">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center font-mono text-xs font-bold text-emerald-400 shrink-0 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors">
                {mod.number}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  {mod.title}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  {mod.description}
                </p>

                {/* Topics Tag Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {mod.topics.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0c111e] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Materializes full folder tree, code files & READMEs</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
