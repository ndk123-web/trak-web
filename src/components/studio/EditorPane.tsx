"use client";

import React, { useState } from "react";
import {
  FileCode,
  Eye,
  Edit3,
  Copy,
  Check,
  CheckSquare,
  Square,
} from "lucide-react";
import { FileIconSvg } from "./FileIconSvg";

interface EditorPaneProps {
  filePath: string | null;
  content: string;
  onChangeContent: (newContent: string) => void;
}

// Rich Markdown Live Renderer
function renderMarkdownDocument(mdText: string) {
  const lines = mdText.split("\n");
  let inCodeBlock = false;
  let codeBlockLang = "";
  let codeBlockLines: string[] = [];

  const elements: React.ReactNode[] = [];

  lines.forEach((line, idx) => {
    // Fenced Code Block
    if (line.trim().startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLang = line.trim().slice(3).trim();
        codeBlockLines = [];
        return;
      } else {
        inCodeBlock = false;
        elements.push(
          <div
            key={`code-${idx}`}
            className="my-3 rounded-lg overflow-hidden border border-white/[0.08] bg-[#12141a] font-mono text-[11.5px]"
          >
            {codeBlockLang && (
              <div className="px-3 py-1 bg-[#181a22] border-b border-white/[0.06] text-[10px] text-slate-400 font-mono flex items-center justify-between">
                <span>{codeBlockLang}</span>
              </div>
            )}
            <pre className="p-3 overflow-x-auto text-[#9cdcfe] leading-relaxed">
              {codeBlockLines.join("\n")}
            </pre>
          </div>
        );
        return;
      }
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      return;
    }

    // Headings
    if (line.startsWith("# ")) {
      elements.push(
        <h1
          key={idx}
          className="font-serif text-xl sm:text-2xl font-normal text-white mt-4 mb-2 pb-1.5 border-b border-white/10"
        >
          {line.slice(2)}
        </h1>
      );
      return;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={idx}
          className="font-serif text-lg font-normal text-slate-100 mt-4 mb-2 pb-1 border-b border-white/[0.06]"
        >
          {line.slice(3)}
        </h2>
      );
      return;
    }
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={idx} className="font-serif text-sm font-semibold text-emerald-400 mt-3 mb-1">
          {line.slice(4)}
        </h3>
      );
      return;
    }

    // Task Checklist items: - [ ] or - [x]
    if (line.trim().startsWith("- [ ]") || line.trim().startsWith("- [x]")) {
      const isChecked = line.trim().startsWith("- [x]");
      const taskText = line.trim().slice(5).trim();
      elements.push(
        <div key={idx} className="flex items-center gap-2 py-0.5 text-xs text-slate-300">
          {isChecked ? (
            <CheckSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          ) : (
            <Square className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          )}
          <span className={isChecked ? "line-through text-slate-500" : ""}>
            {formatInlineMarkdown(taskText)}
          </span>
        </div>
      );
      return;
    }

    // Bullet list: - item or * item
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      elements.push(
        <li key={idx} className="ml-4 list-disc text-xs text-slate-300 py-0.5 leading-relaxed">
          {formatInlineMarkdown(line.trim().slice(2))}
        </li>
      );
      return;
    }

    // Blockquotes: > quote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={idx}
          className="pl-3 my-2 border-l-2 border-emerald-500 text-slate-400 italic text-xs leading-relaxed"
        >
          {formatInlineMarkdown(line.slice(2))}
        </blockquote>
      );
      return;
    }

    // Horizontal Rule: ---
    if (line.trim() === "---" || line.trim() === "***") {
      elements.push(<hr key={idx} className="my-4 border-white/[0.08]" />);
      return;
    }

    // Empty line
    if (!line.trim()) {
      elements.push(<div key={idx} className="h-2" />);
      return;
    }

    // Standard paragraph
    elements.push(
      <p key={idx} className="text-xs text-slate-300 leading-relaxed">
        {formatInlineMarkdown(line)}
      </p>
    );
  });

  return <div className="space-y-1">{elements}</div>;
}

// Inline Markdown formatter (**bold**, `code`, *italic*)
function formatInlineMarkdown(text: string): React.ReactNode {
  // Simple token parser for `code` and **bold**
  const parts: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;

  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.substring(lastIdx, match.index));
    }

    const token = match[0];
    if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-[#101218] border border-white/10 text-emerald-400 font-mono text-[11px]"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong key={match.index} className="text-white font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("*") && token.endsWith("*")) {
      parts.push(
        <em key={match.index} className="text-slate-200 italic">
          {token.slice(1, -1)}
        </em>
      );
    }

    lastIdx = regex.lastIndex;
  }

  if (lastIdx < text.length) {
    parts.push(text.substring(lastIdx));
  }

  return parts.length > 0 ? parts : text;
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
      <div className="flex flex-col items-center justify-center h-full bg-[#18181b] text-slate-500 font-mono text-xs space-y-3 p-8 select-none">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-400">
          <FileCode className="w-6 h-6" />
        </div>
        <p className="text-slate-300 font-medium">No File Open</p>
        <p className="text-slate-500 text-[11px] max-w-xs text-center">
          Select a file from the explorer on the left, or click <span className="text-emerald-400">+ File</span> to start editing.
        </p>
      </div>
    );
  }

  const fileName = filePath.split("/").pop() || filePath;
  const isMarkdown = fileName.endsWith(".md") || fileName.endsWith(".markdown");

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
    <div className="flex flex-col h-full bg-[#18181b]">
      {/* VS Code Active Tab Bar */}
      <div className="px-3 py-1.5 bg-[#121215] border-b border-white/[0.06] flex items-center justify-between gap-2 select-none">
        <div className="flex items-center gap-2 min-w-0 bg-[#18181b] px-3 py-1 rounded-t-md border-t-2 border-emerald-500 border-x border-white/[0.06]">
          <FileIconSvg filename={fileName} className="w-3.5 h-3.5" />
          <span className="font-mono text-xs font-semibold text-slate-200 truncate">
            {fileName}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {isMarkdown && (
            <div className="flex items-center bg-white/[0.04] p-0.5 rounded-md text-[11px] font-mono border border-white/[0.06]">
              <button
                onClick={() => setPreviewMode("edit")}
                className={`px-2 py-0.5 rounded transition-colors ${
                  previewMode === "edit"
                    ? "bg-white/10 text-emerald-400 font-semibold"
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
                    ? "bg-white/10 text-emerald-400 font-semibold"
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
        <div className="flex-1 overflow-y-auto p-6 bg-[#18181b] text-slate-200 leading-relaxed font-sans scrollbar-thin">
          <div className="max-w-3xl">
            {content ? (
              renderMarkdownDocument(content)
            ) : (
              <span className="italic text-slate-600 font-mono text-xs">Empty markdown document...</span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden font-mono text-xs leading-relaxed bg-[#18181b]">
          {/* Line Numbers Gutter */}
          <div className="py-4 pl-3 pr-3 select-none text-[#71717a] text-right bg-[#141416] border-r border-white/[0.04] shrink-0 font-mono text-[11px]">
            {Array.from({ length: lineCount }).map((_, i) => (
              <div key={i} className="leading-[1.6]">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Textarea Code Input */}
          <textarea
            value={content}
            onChange={(e) => onChangeContent(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="flex-1 p-4 bg-transparent text-[#e4e4e7] outline-none resize-none overflow-y-auto font-mono text-xs leading-[1.6] scrollbar-thin selection:bg-[#264f78]"
            placeholder="// Write code or markdown content here..."
          />
        </div>
      )}

      {/* Editor Status Bar */}
      <div className="px-3 py-1 bg-[#121215] border-t border-white/[0.04] text-[10px] font-mono text-slate-500 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <span>{lineCount} lines</span>
          <span>{content.length} chars</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>AST Synchronized</span>
        </div>
      </div>
    </div>
  );
}
