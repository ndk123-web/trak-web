"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Download,
  CheckCircle2,
  AlertCircle,
  Settings2,
  FileJson,
  PanelRightClose,
} from "lucide-react";
import { TemplateBlueprint, serializeBlueprintToJSON } from "@/types/studio";

interface JsonPreviewPaneProps {
  blueprint: TemplateBlueprint;
  onOpenMetaModal: () => void;
  onCollapse?: () => void;
}

// Function to render VS Code-style colorized JSON tokens
function renderVSCodeJson(jsonStr: string) {
  // Regex to match JSON tokens: keys, strings, numbers, booleans, null, punctuation
  const jsonTokenRegex =
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|[{}[\],:])/g;

  const lines = jsonStr.split("\n");

  return (
    <div className="font-mono text-[11.5px] leading-[1.6] select-text">
      {lines.map((line, lineIdx) => {
        // Tokenize line
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        // Reset regex
        jsonTokenRegex.lastIndex = 0;

        while ((match = jsonTokenRegex.exec(line)) !== null) {
          // Preceding whitespace/indentation
          if (match.index > lastIndex) {
            parts.push(line.substring(lastIndex, match.index));
          }

          const token = match[0];
          let colorClass = "text-slate-300";

          if (token.endsWith(":")) {
            // Key
            const keyName = token.slice(0, -1);
            parts.push(
              <span key={`${lineIdx}-${match.index}-key`} className="text-[#9cdcfe]">
                {keyName}
              </span>
            );
            parts.push(
              <span key={`${lineIdx}-${match.index}-colon`} className="text-[#d4d4d4]">
                :
              </span>
            );
          } else if (token.startsWith('"')) {
            // String value
            colorClass = "text-[#ce9178]";
            parts.push(
              <span key={`${lineIdx}-${match.index}`} className={colorClass}>
                {token}
              </span>
            );
          } else if (/^-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?$/.test(token)) {
            // Number value
            colorClass = "text-[#b5cea8]";
            parts.push(
              <span key={`${lineIdx}-${match.index}`} className={colorClass}>
                {token}
              </span>
            );
          } else if (token === "true" || token === "false" || token === "null") {
            // Boolean / null value
            colorClass = "text-[#569cd6]";
            parts.push(
              <span key={`${lineIdx}-${match.index}`} className={colorClass}>
                {token}
              </span>
            );
          } else if (token === "{" || token === "}" || token === "[" || token === "]") {
            // Structural braces
            colorClass = "text-[#ffd700]";
            parts.push(
              <span key={`${lineIdx}-${match.index}`} className={colorClass}>
                {token}
              </span>
            );
          } else {
            parts.push(
              <span key={`${lineIdx}-${match.index}`} className="text-[#d4d4d4]">
                {token}
              </span>
            );
          }

          lastIndex = jsonTokenRegex.lastIndex;
        }

        if (lastIndex < line.length) {
          parts.push(line.substring(lastIndex));
        }

        return (
          <div key={lineIdx} className="flex">
            <span className="w-9 pr-3 select-none text-[#71717a] text-right shrink-0 text-[10px]">
              {lineIdx + 1}
            </span>
            <span className="flex-1 whitespace-pre">{parts}</span>
          </div>
        );
      })}
    </div>
  );
}

export function JsonPreviewPane({
  blueprint,
  onOpenMetaModal,
  onCollapse,
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
    Array.isArray(blueprint.root.children);

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

  return (
    <div className="flex flex-col h-full bg-[#18181b]">
      {/* VS Code Pane Header */}
      <div className="px-3 py-1.5 bg-[#121215] border-b border-white/[0.06] flex items-center justify-between gap-2 select-none">
        <div className="flex items-center gap-2">
          <FileJson className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono text-xs font-bold text-slate-200">
            Registry AST JSON
          </span>
          {isValidSchema ? (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono font-medium">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>Valid AST</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-mono font-medium">
              <AlertCircle className="w-2.5 h-2.5" />
              <span>Incomplete</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onOpenMetaModal}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Edit Blueprint Metadata"
          >
            <Settings2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
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
            className="inline-flex items-center gap-1 px-2 py-0.8 rounded bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 text-xs font-mono font-medium transition-colors cursor-pointer border border-white/[0.08]"
            title="Download .json file"
          >
            <Download className="w-3 h-3 text-emerald-400" />
            <span>Export</span>
          </button>
          {onCollapse && (
            <button
              onClick={onCollapse}
              className="p-1 rounded hover:bg-white/10 text-slate-500 hover:text-slate-300 transition-colors ml-1"
              title="Collapse JSON Pane"
            >
              <PanelRightClose className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-3 py-1 bg-[#141416] border-b border-white/[0.04] text-[10px] font-mono text-slate-400 flex items-center justify-between select-none">
        <div className="flex items-center gap-2.5">
          <span>
            ID: <strong className="text-cyan-400">{blueprint.id}</strong>
          </span>
          <span>
            v<strong className="text-slate-200">{blueprint.version}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <span>{stats.dirs} dirs</span>
          <span>{stats.files} files</span>
          <span>{(jsonSizeBytes / 1024).toFixed(1)} KB</span>
        </div>
      </div>

      {/* VS Code Colorized JSON Viewer */}
      <div className="flex-1 overflow-auto py-3 bg-[#18181b] scrollbar-thin">
        {renderVSCodeJson(jsonString)}
      </div>

      {/* Footer Info */}
      <div className="px-3 py-1 bg-[#121215] border-t border-white/[0.04] text-[10px] font-mono text-slate-500 flex items-center justify-between select-none">
        <span>Ready for trak-registry</span>
        <button
          onClick={handleDownload}
          className="text-emerald-400 hover:underline flex items-center gap-1"
        >
          <span>Download {blueprint.id.split("/").pop() || "template"}.json →</span>
        </button>
      </div>
    </div>
  );
}
