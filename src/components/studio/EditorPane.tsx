"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
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

// Dynamic import Monaco Editor for SSR compatibility in Next.js
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#18181b] text-slate-500 font-mono text-xs">
      Loading VS Code engine...
    </div>
  ),
});

interface EditorPaneProps {
  filePath: string | null;
  content: string;
  onChangeContent: (newContent: string) => void;
}

// Map file extensions to official Monaco language identifiers
function getMonacoLanguage(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  const name = filename.toLowerCase();

  if (name === "dockerfile" || name.startsWith("docker-compose")) return "dockerfile";
  if (name === "pyproject.toml" || ext === "toml") return "ini";
  if (ext === "go" || name === "go.mod") return "go";
  if (ext === "py") return "python";
  if (ext === "rs" || name === "cargo.toml") return "rust";
  if (ext === "ts" || ext === "tsx") return "typescript";
  if (ext === "js" || ext === "jsx" || ext === "mjs") return "javascript";
  if (ext === "json") return "json";
  if (ext === "sql") return "sql";
  if (ext === "yml" || ext === "yaml") return "yaml";
  if (ext === "md" || ext === "markdown") return "markdown";
  if (ext === "sh" || ext === "bash" || ext === "ps1" || ext === "zsh") return "shell";
  if (ext === "c" || ext === "h") return "c";
  if (ext === "cpp" || ext === "hpp" || ext === "cc") return "cpp";
  if (ext === "java") return "java";
  if (ext === "html" || ext === "htm") return "html";
  if (ext === "css") return "css";

  return "plaintext";
}

// ----------------------------------------------------
// Rich Markdown Document Renderer with GFM Table Support
// ----------------------------------------------------

function isTableDelimiterRow(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.includes("|")) return false;
  let content = trimmed;
  if (content.startsWith("|")) content = content.slice(1);
  if (content.endsWith("|")) content = content.slice(0, -1);
  const cells = content.split("|");
  if (cells.length === 0) return false;
  return cells.every((cell) => {
    const c = cell.trim();
    return /^:?-+:?$/.test(c);
  });
}

function parseTableCells(line: string): string[] {
  let trimmed = line.trim();
  if (trimmed.startsWith("|")) trimmed = trimmed.slice(1);
  if (trimmed.endsWith("|")) trimmed = trimmed.slice(0, -1);
  return trimmed.split("|").map((c) => c.trim());
}

function getColumnAlign(delimiterCell: string): "left" | "center" | "right" {
  const c = delimiterCell.trim();
  const startsWithColon = c.startsWith(":");
  const endsWithColon = c.endsWith(":");
  if (startsWithColon && endsWithColon) return "center";
  if (endsWithColon) return "right";
  return "left";
}

function renderMarkdownDocument(mdText: string) {
  const lines = mdText.split("\n");
  let inCodeBlock = false;
  let codeBlockLang = "";
  let codeBlockLines: string[] = [];

  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fenced Code Block
    if (line.trim().startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLang = line.trim().slice(3).trim();
        codeBlockLines = [];
        continue;
      } else {
        inCodeBlock = false;
        elements.push(
          <div
            key={`code-${i}`}
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
        continue;
      }
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Markdown Table Detection (Header line followed by delimiter line)
    if (
      line.includes("|") &&
      i + 1 < lines.length &&
      isTableDelimiterRow(lines[i + 1])
    ) {
      const headers = parseTableCells(line);
      const delimiterCells = parseTableCells(lines[i + 1]);
      const alignments = headers.map((_, colIdx) => {
        return colIdx < delimiterCells.length
          ? getColumnAlign(delimiterCells[colIdx])
          : "left";
      });

      const tableStartIdx = i;
      i += 2; // Skip header and delimiter lines
      const rows: string[][] = [];

      while (
        i < lines.length &&
        lines[i].trim().includes("|") &&
        lines[i].trim() !== ""
      ) {
        rows.push(parseTableCells(lines[i]));
        i++;
      }
      i--; // Step back one line as loop will increment

      elements.push(
        <div
          key={`table-${tableStartIdx}`}
          className="my-4 overflow-x-auto rounded-lg border border-white/[0.08] bg-[#12141a]"
        >
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#181a22] border-b border-white/[0.08]">
              <tr>
                {headers.map((header, hIdx) => {
                  const align = alignments[hIdx] || "left";
                  return (
                    <th
                      key={hIdx}
                      className={`px-3.5 py-2.5 text-[11px] font-mono font-semibold text-slate-200 uppercase tracking-wider ${
                        align === "center"
                          ? "text-center"
                          : align === "right"
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {formatInlineMarkdown(header)}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {rows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  {headers.map((_, colIdx) => {
                    const cellText = row[colIdx] || "";
                    const align = alignments[colIdx] || "left";
                    return (
                      <td
                        key={colIdx}
                        className={`px-3.5 py-2.5 text-slate-300 leading-relaxed font-sans ${
                          align === "center"
                            ? "text-center"
                            : align === "right"
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        {formatInlineMarkdown(cellText)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Headings
    if (line.startsWith("# ")) {
      elements.push(
        <h1
          key={`h1-${i}`}
          className="font-serif text-xl sm:text-2xl font-normal text-white mt-4 mb-2 pb-1.5 border-b border-white/10"
        >
          {line.slice(2)}
        </h1>
      );
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="font-serif text-lg font-normal text-slate-100 mt-4 mb-2 pb-1 border-b border-white/[0.06]"
        >
          {line.slice(3)}
        </h2>
      );
      continue;
    }
    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="font-serif text-sm font-semibold text-emerald-400 mt-3 mb-1"
        >
          {line.slice(4)}
        </h3>
      );
      continue;
    }

    // Task Checklist items: - [ ] or - [x]
    if (line.trim().startsWith("- [ ]") || line.trim().startsWith("- [x]")) {
      const isChecked = line.trim().startsWith("- [x]");
      const taskText = line.trim().slice(5).trim();
      elements.push(
        <div
          key={`task-${i}`}
          className="flex items-center gap-2 py-0.5 text-xs text-slate-300"
        >
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
      continue;
    }

    // Bullet list: - item or * item
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      elements.push(
        <li
          key={`li-${i}`}
          className="ml-4 list-disc text-xs text-slate-300 py-0.5 leading-relaxed"
        >
          {formatInlineMarkdown(line.trim().slice(2))}
        </li>
      );
      continue;
    }

    // Blockquotes: > quote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="pl-3 my-2 border-l-2 border-emerald-500 text-slate-400 italic text-xs leading-relaxed"
        >
          {formatInlineMarkdown(line.slice(2))}
        </blockquote>
      );
      continue;
    }

    // Horizontal Rule: ---
    if (line.trim() === "---" || line.trim() === "***") {
      elements.push(<hr key={`hr-${i}`} className="my-4 border-white/[0.08]" />);
      continue;
    }

    // Empty line
    if (!line.trim()) {
      elements.push(<div key={`empty-${i}`} className="h-2" />);
      continue;
    }

    // Standard paragraph
    elements.push(
      <p key={`p-${i}`} className="text-xs text-slate-300 leading-relaxed">
        {formatInlineMarkdown(line)}
      </p>
    );
  }

  return <div className="space-y-1">{elements}</div>;
}

// Inline Markdown formatter (**bold**, `code`, *italic*, [link](url))
function formatInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;

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
    } else if (token.startsWith("[") && token.includes("](") && token.endsWith(")")) {
      const linkMatch = token.match(/^\[(.*)\]\((.*)\)$/);
      if (linkMatch) {
        parts.push(
          <a
            key={match.index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline underline-offset-2"
          >
            {linkMatch[1]}
          </a>
        );
      }
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

// ----------------------------------------------------
// Main EditorPane Component
// ----------------------------------------------------

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
  const monacoLang = getMonacoLanguage(fileName);
  const lineCount = content.split("\n").length;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
                className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
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
                className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
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
        <div className="flex-1 w-full h-full overflow-hidden bg-[#1e1e1e]">
          {/* Authentic VS Code Monaco Editor with full Syntax Highlighting */}
          <MonacoEditor
            height="100%"
            language={monacoLang}
            value={content}
            theme="vs-dark"
            onChange={(val) => onChangeContent(val || "")}
            options={{
              fontSize: 12.5,
              fontFamily: "'Cascadia Code', 'Fira Code', 'JetBrains Mono', Consolas, monospace",
              fontLigatures: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              automaticLayout: true,
              tabSize: 2,
              renderLineHighlight: "all",
              lineNumbers: "on",
              lineNumbersMinChars: 3,
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: "on",
              bracketPairColorization: { enabled: true },
              padding: { top: 12, bottom: 12 },
              scrollbar: {
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
                useShadows: false,
              },
            }}
          />
        </div>
      )}

      {/* Editor Status Bar */}
      <div className="px-3 py-1 bg-[#121215] border-t border-white/[0.04] text-[10px] font-mono text-slate-500 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <span>{lineCount} lines</span>
          <span>{content.length} chars</span>
          <span className="uppercase text-emerald-400 font-bold">{monacoLang}</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Monaco Core Engine</span>
        </div>
      </div>
    </div>
  );
}
