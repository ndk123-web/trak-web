"use client";

import React, { useState } from "react";
import {
  FileCode,
  Eye,
  Edit3,
  Copy,
  Check,
  Code2,
} from "lucide-react";
import { getFileIconDetails } from "@/types/studio";

interface EditorPaneProps {
  filePath: string | null;
  content: string;
  onChangeContent: (newContent: string) => void;
}

export function EditorPane({
  filePath,
  content,
  onChangeContent,
}: EditorPaneProps) {
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState<"edit" | "preview">("edit");

  if (!filePath) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#06080e] text-slate-500 font-mono text-xs space-y-3 p-8 select-none">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-400">
          <FileCode className="w-6 h-6" />
        </div>
        <p className="text-slate-400 font-medium">No File Selected</p>
        <p className="text-slate-600 text-[11px] max-w-xs text-center">
          Click any file in the Explorer on the left to edit its code or markdown, or click + to create a new file.
        </p>
      </div>
    );
  }

  const fileName = filePath.split("/").pop() || filePath;
  const isMarkdown = fileName.endsWith(".md") || fileName.endsWith(".markdown");
  const fileMeta = getFileIconDetails(fileName);

  const lines = content.split("\n");
  const lineCount = lines.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Insert 2 spaces
      const updated =
        content.substring(0, start) + "  " + content.substring(end);
      onChangeContent(updated);

      // Restore cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#06080e] border-r border-white/[0.08]">
      {/* Editor Tab Bar */}
      <div className="px-3 py-2 bg-[#0c101a] border-b border-white/[0.06] flex items-center justify-between gap-2 select-none">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm">{fileMeta.icon}</span>
          <span className="font-mono text-xs font-semibold text-slate-200 truncate">
            {fileName}
          </span>
          <span className="text-[10px] font-mono text-slate-500 truncate hidden sm:inline">
            {filePath}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {isMarkdown && (
            <div className="flex items-center bg-white/[0.04] p-0.5 rounded-md text-[11px] font-mono border border-white/[0.06]">
              <button
                onClick={() => setPreviewMode("edit")}
                className={`px-2 py-0.5 rounded transition-colors ${
                  previewMode === "edit"
                    ? "bg-emerald-500/20 text-emerald-400 font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Edit3 className="w-3 h-3 inline mr-1" />
                Edit
              </button>
              <button
                onClick={() => setPreviewMode("preview")}
                className={`px-2 py-0.5 rounded transition-colors ${
                  previewMode === "preview"
                    ? "bg-emerald-500/20 text-emerald-400 font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Eye className="w-3 h-3 inline mr-1" />
                Preview
              </button>
            </div>
          )}

          <button
            onClick={handleCopy}
            title="Copy File Content"
            className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/[0.06]"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {previewMode === "preview" && isMarkdown ? (
        <div className="flex-1 overflow-y-auto p-5 prose prose-invert max-w-none text-xs font-sans leading-relaxed">
          <div className="whitespace-pre-wrap font-sans text-slate-300">
            {content || <span className="italic text-slate-600">Empty markdown document...</span>}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden font-mono text-xs leading-relaxed">
          {/* Line Numbers */}
          <div className="py-4 pl-3 pr-2 select-none text-slate-600 text-right bg-[#05070c] border-r border-white/[0.04] shrink-0 font-mono text-[11px]">
            {Array.from({ length: lineCount }).map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Textarea Code Input */}
          <textarea
            value={content}
            onChange={(e) => onChangeContent(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="flex-1 p-4 bg-transparent text-slate-200 outline-none resize-none overflow-y-auto font-mono text-xs leading-relaxed scrollbar-thin selection:bg-emerald-500/30"
            placeholder="// Write code or markdown content here..."
          />
        </div>
      )}

      {/* Editor Status Bar */}
      <div className="px-3 py-1.5 bg-[#07090e] border-t border-white/[0.04] text-[10px] font-mono text-slate-500 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span>{lineCount} lines</span>
          <span>{content.length} characters</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Synced to AST</span>
        </div>
      </div>
    </div>
  );
}
