"use client";

import React, { useState, useMemo } from "react";
import { Terminal, Copy, Check, FolderTree, Play, Sparkles, Layers, RefreshCw } from "lucide-react";
import { TRACKS, CATEGORIES, TrackItem } from "@/data/tracks";
import { CategoryIcon } from "@/components/CategoryIcon";

export default function PlaygroundPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("lang");
  const [selectedTrackId, setSelectedTrackId] = useState<string>("lang/go");
  const [customPath, setCustomPath] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const availableTracks = useMemo(() => {
    return TRACKS.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  const activeTrack = useMemo(() => {
    return TRACKS.find((t) => t.id === selectedTrackId) || availableTracks[0] || TRACKS[0];
  }, [selectedTrackId, availableTracks]);

  // Compute generated command
  const generatedCommand = useMemo(() => {
    const trimmedPath = customPath.trim();
    if (!trimmedPath) {
      return `trak init ${activeTrack.id}`;
    }
    return `trak init ${activeTrack.id} --path ${trimmedPath}`;
  }, [activeTrack, customPath]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const firstTrackInCat = TRACKS.find((t) => t.category === cat);
    if (firstTrackInCat) {
      setSelectedTrackId(firstTrackInCat.id);
    }
  };

  const targetDirDisplay = customPath.trim() || `./learn-${activeTrack.slug}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>Interactive Generator Playground</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Command Builder & Workspace Simulator
        </h1>
        <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl leading-relaxed">
          Customize your target workspace, configure paths, and preview the generated file hierarchy before executing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Options */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Step 1: Select Category */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                1. Select Engineering Category:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`p-2.5 rounded-xl text-xs font-medium transition-all text-left flex items-center gap-2 cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                        : "bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/5"
                    }`}
                  >
                    <CategoryIcon category={cat.id} className="w-3.5 h-3.5" />
                    <span className="truncate">{cat.title.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Track */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                2. Choose Blueprint Track:
              </label>
              <select
                value={activeTrack.id}
                onChange={(e) => setSelectedTrackId(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
              >
                {availableTracks.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.modulesCount} Modules)
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Custom Path Input */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                3. Destination Directory (Optional --path):
              </label>
              <input
                type="text"
                value={customPath}
                onChange={(e) => setCustomPath(e.target.value)}
                placeholder={`./learn-${activeTrack.slug} (Default)`}
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-emerald-500 placeholder:text-slate-600"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Leave blank to default to <code className="text-emerald-400 font-mono">./learn-{activeTrack.slug}</code> in the current folder.
              </span>
            </div>

            {/* Track Highlights Card */}
            <div className="p-4 rounded-xl bg-[#060910] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white font-bold">{activeTrack.name}</span>
                <span className="text-emerald-400 font-semibold">{activeTrack.modulesCount} Modules</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {activeTrack.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Form: Live Generated Command & File Tree Simulator */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Command Banner */}
          <div className="glass-panel rounded-2xl p-6 border border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Generated Terminal Command</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Ready to run
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between gap-4 font-mono text-sm">
              <div className="text-emerald-400 font-bold overflow-x-auto select-all">
                $ {generatedCommand}
              </div>
              <button
                onClick={handleCopy}
                className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Workspace File Tree Simulator */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                <FolderTree className="w-4 h-4 text-emerald-400" />
                <span>Materialized Workspace Tree Preview</span>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                {targetDirDisplay}
              </span>
            </div>

            {/* Tree Box */}
            <div className="p-5 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto max-h-[420px]">
              <div className="text-emerald-400 font-bold">{targetDirDisplay}/</div>
              <div className="text-slate-400 pl-4">├── README.md <span className="text-slate-600">(Master Track Guide)</span></div>
              <div className="text-emerald-400 pl-4">├── trak.json <span className="text-slate-600">(Workspace Manifest & Version)</span></div>

              {activeTrack.modules.slice(0, 8).map((mod, idx) => (
                <div key={idx} className="text-slate-300 pl-4">
                  ├── {mod.number}-{mod.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}/
                  <div className="pl-6 text-slate-500">├── README.md</div>
                  <div className="pl-6 text-slate-500">└── main.*</div>
                </div>
              ))}

              {activeTrack.modules.length > 8 && (
                <div className="text-slate-500 pl-4 italic">
                  ... +{activeTrack.modules.length - 8} more modules
                </div>
              )}

              <div className="text-slate-300 pl-4">
                └── 📁 {activeTrack.modules[activeTrack.modules.length - 1].number}-{activeTrack.modules[activeTrack.modules.length - 1].title.toLowerCase().replace(/[^a-z0-9]/g, "-")}/
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
