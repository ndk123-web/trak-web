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
  GitBranch,
  ArrowRight,
  ShieldCheck,
  Globe,
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
        className="w-full max-w-2xl bg-[#0d0f15] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] bg-[#11141d] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white">
              <Sparkles className="w-4 h-4 text-slate-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Blueprint Studio & Community Publishing Guide
              </h2>
              <p className="text-[11px] font-mono text-slate-400">
                Trak v1.1.0 • Pure GitOps Registry Architecture
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
              <span className="text-slate-400 font-mono">01.</span>
              Why Does Blueprint Studio Exist?
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Trak stores curriculums as **Abstract Syntax Tree (AST) JSON files** (e.g. <code className="text-slate-200 font-mono">templates/lang/go.json</code>). Writing hundreds of lines of nested JSON manually with escaped newlines and quotes is tedious and error-prone.
            </p>
            <p className="text-slate-400 leading-relaxed">
              **Blueprint Studio** provides a visual VS Code environment directly in your browser to scaffold folders, author code in Monaco Editor, and export valid AST JSON with 1 click.
            </p>
          </div>

          {/* 2. Community GitOps Publishing Workflow */}
          <div className="p-4 rounded-xl bg-[#090b10] border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <span className="text-slate-400 font-mono">02.</span>
                Publish Your Community Track in 4 Steps (100% GitOps)
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                Zero Sign-Up Required
              </span>
            </div>

            <p className="text-xs text-slate-400">
              No developer account registration or passwords required. Trak uses a 100% pure GitHub GitOps pipeline:
            </p>

            <div className="space-y-2.5 pt-1 font-mono text-[11px]">
              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] space-y-1">
                <div className="text-slate-200 font-bold flex items-center gap-2">
                  <span className="text-white">1. Design & Export</span>
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  Create your workspace tree in Studio, write starter code, and click <strong>Download AST JSON</strong>.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] space-y-1">
                <div className="text-slate-200 font-bold flex items-center gap-2">
                  <span className="text-white">2. Fork the Registry</span>
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  Fork <a href="https://github.com/ndk123-web/trak-registry" target="_blank" rel="noopener noreferrer" className="text-slate-200 underline font-mono">github.com/ndk123-web/trak-registry</a> to your GitHub account.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] space-y-1">
                <div className="text-slate-200 font-bold flex items-center gap-2">
                  <span className="text-white">3. Place in Your User Namespace</span>
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  Add your JSON file under: <code className="text-slate-200 bg-white/5 px-1 py-0.5 rounded">users/&lt;your-github-username&gt;/&lt;category&gt;/&lt;tool&gt;.json</code>
                  <br />
                  <span className="text-slate-500 text-[11px]">(Allowed categories: <code className="text-slate-400">lang</code>, <code className="text-slate-400">os</code>, <code className="text-slate-400">cloud</code>, <code className="text-slate-400">db</code>, <code className="text-slate-400">tool</code>)</span>
                </p>
              </div>

              <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] space-y-1">
                <div className="text-slate-200 font-bold flex items-center gap-2">
                  <span className="text-white">4. Open Pull Request (PR)</span>
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  Submit a PR. GitHub Actions automatically verifies your AST schema and identity. Once merged, anyone can immediately run:
                </p>
                <div className="p-2 rounded bg-[#07090e] border border-white/[0.06] text-slate-200 text-xs">
                  $ trak init &lt;your-username&gt;/&lt;category&gt;/&lt;tool&gt;
                </div>
              </div>
            </div>
          </div>

          {/* 3. Security & Guarantees */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <h3 className="font-bold text-white text-xs flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              Automated Safety & Creator Isolation
            </h3>
            <ul className="space-y-1 text-[11px] text-slate-400">
              <li>• <strong>Actor Isolation:</strong> Contributors can only modify their own <code className="text-slate-300">users/&lt;username&gt;/</code> namespace.</li>
              <li>• <strong>Binary Prohibition:</strong> AST validator rejects executable binaries (<code className="text-slate-300">.exe</code>, <code className="text-slate-300">.dll</code>, <code className="text-slate-300">.so</code>).</li>
              <li>• <strong>Instant Distribution:</strong> No manual server deployments or database sync needed.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-white/[0.08] bg-[#11141d] flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-500">
            Trak Registry Specification v1.1.0
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white text-zinc-950 font-bold text-xs font-mono hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Start Designing Blueprints
          </button>
        </div>
      </div>
    </div>
  );
}
