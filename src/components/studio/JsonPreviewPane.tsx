"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Download,
  GitPullRequest,
  CheckCircle2,
  AlertCircle,
  Settings2,
  FileJson,
} from "lucide-react";
import { TemplateBlueprint, serializeBlueprintToJSON } from "@/types/studio";

interface JsonPreviewPaneProps {
  blueprint: TemplateBlueprint;
  onOpenMetaModal: () => void;
}

export function JsonPreviewPane({
  blueprint,
  onOpenMetaModal,
}: JsonPreviewPaneProps) {
  const [copied, setCopied] = useState(false);

  const jsonString = serializeBlueprintToJSON(blueprint);

  // Calculate statistics
  const countNodes = (node: any): { files: number; dirs: number } => {
    let files = 0;
    let dirs = 0;
    if (node.type === "directory") {
      dirs++;
      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          const res = countNodes(child);
          files += res.files;
          dirs += res.dirs;
        }
      }
    } else {
      files++;
    }
    return { files, dirs };
  };

  const stats = countNodes(blueprint.root);
  const jsonSizeBytes = new Blob([jsonString]).size;

  // Schema Validation Check
  const isValidId = /^[a-z0-9-_]+\/[a-z0-9-_]+$/.test(blueprint.id);
  const isValidName = blueprint.name.trim().length > 0;
  const isValidVersion = /^\d+\.\d+\.\d+$/.test(blueprint.version);
  const isValidRoot =
    blueprint.root.type === "directory" &&
    Array.isArray(blueprint.root.children) &&
    blueprint.root.children.length > 0;

  const isValidSchema =
    isValidId && isValidName && isValidVersion && isValidRoot;

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const slug = blueprint.id.split("/").pop() || "template";
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleOpenPR = () => {
    const parts = blueprint.id.split("/");
    const category = parts[0] || "lang";
    const slug = parts[1] || "template";
    // GitHub new file URL in trak-registry repo
    const prUrl = `https://github.com/ndk123-web/trak-registry/new/main?filename=templates/${category}/${slug}.json`;
    window.open(prUrl, "_blank");
  };

  return (
    <div className="flex flex-col h-full bg-[#06080e]">
      {/* Pane Header */}
      <div className="px-3 py-2 bg-[#0c101a] border-b border-white/[0.06] flex items-center justify-between gap-2 select-none">
        <div className="flex items-center gap-2">
          <FileJson className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-xs font-bold text-slate-200">
            Registry AST JSON
          </span>
          {isValidSchema ? (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>Valid Schema</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono">
              <AlertCircle className="w-2.5 h-2.5" />
              <span>Config Incomplete</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onOpenMetaModal}
            className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/[0.06]"
            title="Edit Blueprint Metadata"
          >
            <Settings2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/[0.06]"
            title="Copy AST JSON"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={handleDownload}
            className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/[0.06]"
            title="Download .json file"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleOpenPR}
            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-semibold transition-colors cursor-pointer ml-1"
            title="Submit PR to trak-registry on GitHub"
          >
            <GitPullRequest className="w-3 h-3" />
            <span>PR to Registry</span>
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-3 py-1.5 bg-[#080b11] border-b border-white/[0.04] text-[11px] font-mono text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span>
            ID: <strong className="text-cyan-400">{blueprint.id}</strong>
          </span>
          <span>
            Version: <strong className="text-slate-200">v{blueprint.version}</strong>
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-slate-500">
          <span>{stats.dirs} dirs</span>
          <span>{stats.files} files</span>
          <span>{(jsonSizeBytes / 1024).toFixed(1)} KB</span>
        </div>
      </div>

      {/* JSON Code Viewer */}
      <div className="flex-1 overflow-auto p-4 bg-[#05070c] font-mono text-xs text-slate-300 leading-relaxed scrollbar-thin">
        <pre className="text-slate-300 selection:bg-emerald-500/30 whitespace-pre-wrap break-all">
          {jsonString}
        </pre>
      </div>

      {/* Footer Info */}
      <div className="px-3 py-2 bg-[#07090e] border-t border-white/[0.04] text-[11px] font-mono text-slate-500 flex items-center justify-between">
        <span>Ready to push to GitHub</span>
        <button
          onClick={handleOpenPR}
          className="text-emerald-400 hover:underline flex items-center gap-1"
        >
          <span>Open trak-registry PR helper →</span>
        </button>
      </div>
    </div>
  );
}
