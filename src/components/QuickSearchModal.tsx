"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Terminal, BookOpen, Layers, ArrowRight, Sparkles } from "lucide-react";
import { TRACKS } from "@/data/tracks";

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickSearchModal({ isOpen, onClose }: QuickSearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Keyboard shortcut listener (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Toggle search
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTracks = TRACKS.filter((t) => {
    if (!query) return true;
    const q = query.toLowerCase().trim();
    return (
      t.name.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }).slice(0, 8);

  const quickPages = [
    { title: "Overview", href: "/", icon: Sparkles, desc: "Platform overview & quick metrics" },
    { title: "All 19 Tracks", href: "/tracks", icon: Layers, desc: "Browse full learning catalog" },
    { title: "CLI Reference", href: "/cli", icon: Terminal, desc: "trak init, list, version docs" },
    { title: "Registry Specification", href: "/registry", icon: BookOpen, desc: "JSON schema & GitHub sync" },
    { title: "Command Playground", href: "/playground", icon: Terminal, desc: "Interactive command builder" },
  ].filter((p) => {
    if (!query) return true;
    const q = query.toLowerCase().trim();
    return p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0b0f19] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#0e1424]">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tracks, commands, modules (e.g. go, postgres, k8s, init, mvcc)..."
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none font-sans"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 divide-y divide-white/5">
          {/* Quick Pages */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold px-2 mb-2">
              Documentation & Tools
            </div>
            <div className="space-y-1">
              {quickPages.map((page, idx) => {
                const Icon = page.icon;
                return (
                  <Link
                    key={idx}
                    href={page.href}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {page.title}
                        </div>
                        <div className="text-[11px] text-slate-400">{page.desc}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Tracks Results */}
          <div className="pt-3">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold px-2 mb-2">
              Curriculum Tracks ({filteredTracks.length})
            </div>
            <div className="space-y-1">
              {filteredTracks.map((track) => (
                <Link
                  key={track.id}
                  href={`/tracks/${track.category}/${track.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 group transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-xs font-mono font-bold text-cyan-400 shrink-0">
                      {track.modulesCount}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                          {track.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-white/5">
                          {track.id}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {track.highlight}
                      </div>
                    </div>
                  </div>
                  <span className="shrink-0 text-[10px] font-mono text-emerald-400">
                    View Syllabus →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-white/10 bg-[#0c111e] flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 font-mono text-[10px]">
              ↑↓ Enter
            </kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 font-mono text-[10px]">
              Esc to close
            </kbd>
          </div>
          <span className="font-mono text-emerald-400">19 Tracks Available</span>
        </div>
      </div>
    </div>
  );
}
