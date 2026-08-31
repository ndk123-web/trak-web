"use client";

import React from "react";
import {
  X,
  Sparkles,
  FolderTree,
  FileCode,
  FileJson,
  CheckCircle2,
  ExternalLink,
  Layers,
  ArrowRight,
} from "lucide-react";

interface StudioGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StudioGuideModal({ isOpen, onClose }: StudioGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div
        className="w-full max-w-2xl bg-[#0e1117] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] bg-[#141822] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                About Blueprint Studio
              </h2>
              <p className="text-[11px] font-mono text-slate-400">
                Visual Curriculum & Template Designer for Trak
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 leading-relaxed font-sans">
          {/* 1. Why Studio Exists */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <span className="text-emerald-400 font-mono">01.</span>
              Why Does Blueprint Studio Exist?
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Trak stores all learning tracks as **Abstract Syntax Tree (AST) JSON files** (e.g. <code className="text-slate-200 font-mono">templates/lang/go.json</code>). Writing hundreds of lines of nested JSON manually with escaped newlines and quotes is difficult and error-prone.
            </p>
            <p className="text-slate-400 leading-relaxed">
              **Blueprint Studio** gives developers a visual VS Code environment directly in the browser to scaffold files, write real code, and instantly export production-ready AST JSON.
            </p>
          </div>

          {/* 2. How to Use It in 4 Steps */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <span className="text-cyan-400 font-mono">02.</span>
              How It Works (4 Simple Steps)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-[11px]">
                  <FolderTree className="w-3.5 h-3.5" />
                  <span>1. Choose or Start Blank</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Select an existing preset (e.g. <code className="text-slate-200">lang/go</code>) to inspect/modify, or start fresh with <code className="text-slate-200">+ Blank Template</code>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-[11px]">
                  <FolderTree className="w-3.5 h-3.5" />
                  <span>2. Scaffold File Tree</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Use the left explorer pane to create folders, add starter files, hints, and tests just like in VS Code.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-400 font-mono font-bold text-[11px]">
                  <FileCode className="w-3.5 h-3.5" />
                  <span>3. Author in Monaco Editor</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Write real code and Markdown in the center pane with authentic VS Code syntax highlighting and tab indentation.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-[11px]">
                  <FileJson className="w-3.5 h-3.5" />
                  <span>4. Export AST JSON</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  The right pane automatically compiles your changes into valid AST JSON. Download or copy it to submit a PR to the Registry!
                </p>
              </div>
            </div>
          </div>

          {/* 3. Who is this for */}
          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/15 space-y-2">
            <h3 className="font-bold text-white text-xs flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Who Is Studio For?
            </h3>
            <ul className="space-y-1.5 text-[11px] text-slate-300">
              <li>• <strong>Open Source Contributors:</strong> Design new tracks (e.g. <code className="text-emerald-300">lang/csharp</code>) and contribute them to the official registry.</li>
              <li>• <strong>Teams & Leads:</strong> Build custom internal engineering onboarding tracks for your company.</li>
              <li>• <strong>Learners:</strong> Inspect the full source code and structure of any curriculum without running CLI commands.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/[0.08] bg-[#141822] flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-500">
            Trak Registry AST Specification v1.0.0
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-colors"
          >
            Got It, Let&apos;s Build!
          </button>
        </div>
      </div>
    </div>
  );
}
