"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, GitBranch, Terminal, Copy, Check, Sparkles, FolderTree, ArrowRight, ExternalLink } from "lucide-react";

export default function RegistryPage() {
  const [copiedSchema, setCopiedSchema] = useState(false);

  const sampleSchema = `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "id": "lang/go",
  "name": "Go (Golang)",
  "version": "1.2.0",
  "description": "Comprehensive Go fundamentals and concurrency",
  "root": {
    "name": "root",
    "type": "directory",
    "children": [
      {
        "name": "go.mod",
        "type": "file",
        "content": "module learn-go\\n\\ngo 1.22\\n"
      },
      {
        "name": "00-setup-and-toolchain",
        "type": "directory",
        "children": [
          {
            "name": "README.md",
            "type": "file",
            "content": "# Module 00: Go Toolchain\\n..."
          }
        ]
      }
    ]
  }
}`;

  const copySchemaCode = () => {
    navigator.clipboard.writeText(sampleSchema);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Registry Architecture & Blueprint Spec</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Decoupled Registry Specification
        </h1>
        <p className="text-slate-400 text-base sm:text-lg mt-3 leading-relaxed">
          How Trak resolves and streams curriculum blueprints from GitHub without updating the CLI binary.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 space-y-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
            <GitBranch className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-white">Decoupled Architecture</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            The CLI binary is lightweight and communicates with the public <code className="text-emerald-400 font-mono">trak-registry</code> repository over raw HTTPS endpoints. New templates are immediately available globally upon pushing to GitHub.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 space-y-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-white">Deterministic Stamping</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every initialized workspace receives a stamped <code className="text-cyan-400 font-mono">trak.json</code> manifest recording the exact template ID, version tag, and UTC timestamp for reproducibility.
          </p>
        </div>
      </div>

      {/* JSON Blueprint Schema */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white font-mono">Template Schema (JSON AST)</h3>
          <button
            onClick={copySchemaCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSchema ? "Copied" : "Copy JSON"}</span>
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Blueprints are represented as recursive file-system AST nodes with explicit <code className="text-emerald-400 font-mono">type: &quot;directory&quot; | &quot;file&quot;</code> and encoded UTF-8 contents.
        </p>

        <pre className="p-4 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
          {sampleSchema}
        </pre>
      </div>

      {/* Step by Step: Contributing a New Track */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-white">How to Contribute a New Track</h3>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-emerald-500 text-slate-950 font-mono font-bold flex items-center justify-center shrink-0">1</span>
            <div>
              <strong className="text-white">Fork & Clone</strong>: Fork <a href="https://github.com/ndk123-web/trak-registry" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">ndk123-web/trak-registry</a>.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-emerald-500 text-slate-950 font-mono font-bold flex items-center justify-center shrink-0">2</span>
            <div>
              <strong className="text-white">Create Blueprint JSON</strong>: Add your template under <code className="text-cyan-400 font-mono">templates/&lt;category&gt;/&lt;tool&gt;.json</code>.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-emerald-500 text-slate-950 font-mono font-bold flex items-center justify-center shrink-0">3</span>
            <div>
              <strong className="text-white">Register in Catalog</strong>: Update <code className="text-cyan-400 font-mono">registry.json</code> with the track name, description, and version.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-emerald-500 text-slate-950 font-mono font-bold flex items-center justify-center shrink-0">4</span>
            <div>
              <strong className="text-white">Submit Pull Request</strong>: Create a PR to the <code className="text-emerald-400 font-mono">main</code> branch!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
