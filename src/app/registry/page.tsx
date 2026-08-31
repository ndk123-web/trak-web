"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, GitBranch, Terminal, Copy, Check, Sparkles, FolderTree, ArrowRight, ExternalLink, ShieldCheck, HelpCircle } from "lucide-react";

export default function RegistryPage() {
  const [copiedSchema, setCopiedSchema] = useState(false);

  const sampleSchema = `{
  "id": "lang/go",
  "name": "Go (Golang) Comprehensive Mastery Track",
  "version": "1.2.0",
  "description": "Complete Go curriculum from basics to production concurrency",
  "root": {
    "name": "go-workspace",
    "type": "directory",
    "children": [
      {
        "name": "go.mod",
        "type": "file",
        "content": "module go-workspace\\n\\ngo 1.22\\n"
      },
      {
        "name": "00-setup-and-prerequisites",
        "type": "directory",
        "children": [
          {
            "name": "README.md",
            "type": "file",
            "content": "# 00 - Setup & Toolchain\\n..."
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
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-mono font-medium mb-3">
          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
          <span>Registry Architecture v1.1.0</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-normal text-white tracking-tight">
          Decoupled GitOps Registry & Community Publishing
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed font-sans">
          How Trak resolves remote blueprints and lets anyone publish custom tracks with pure GitOps — zero signups, zero servers.
        </p>
      </div>

      {/* CLI Command Resolution Matrix */}
      <div className="rounded-xl p-5 bg-[#0d0f15] border border-white/[0.08] space-y-4">
        <h2 className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-400" />
          <span>CLI Blueprint Resolution Syntax</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400">
                <th className="pb-2 font-normal">Command Format</th>
                <th className="pb-2 font-normal">Type</th>
                <th className="pb-2 font-normal">Resolved Source Path</th>
                <th className="pb-2 font-normal">Author in trak.json</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-slate-300">
              <tr>
                <td className="py-2.5 text-emerald-400 font-bold">trak init lang/go</td>
                <td className="py-2.5 text-slate-400">Official (Short)</td>
                <td className="py-2.5 text-slate-300">templates/lang/go.json</td>
                <td className="py-2.5 text-white">Trak</td>
              </tr>
              <tr>
                <td className="py-2.5 text-emerald-400 font-bold">trak init trak/lang/go</td>
                <td className="py-2.5 text-slate-400">Official (Explicit)</td>
                <td className="py-2.5 text-slate-300">templates/lang/go.json</td>
                <td className="py-2.5 text-white">Trak</td>
              </tr>
              <tr>
                <td className="py-2.5 text-cyan-400 font-bold">trak init &lt;username&gt;/lang/go</td>
                <td className="py-2.5 text-slate-400">Community Track</td>
                <td className="py-2.5 text-slate-300">users/&lt;username&gt;/lang/go.json</td>
                <td className="py-2.5 text-cyan-400 font-bold">&lt;username&gt;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Step-by-Step Community GitOps Contribution Guide */}
      <div className="rounded-xl p-6 bg-[#0d0f15] border border-white/[0.08] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
          <div>
            <h2 className="text-base font-bold text-white">
              How to Publish a Community Track (4 Simple Steps)
            </h2>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              100% Pull Request based. No custom developer accounts or passwords needed.
            </p>
          </div>
          <Link
            href="/studio"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-zinc-950 text-xs font-mono font-bold hover:bg-slate-200 transition-colors shrink-0"
          >
            <span>Open Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-4 rounded-lg bg-[#080a0f] border border-white/[0.06] space-y-1.5">
            <div className="text-white font-bold">1. Design & Export in Studio</div>
            <p className="text-slate-400 font-sans text-xs">
              Open <Link href="/studio" className="text-white underline">Blueprint Studio</Link>, scaffold your directories, write code in Monaco Editor, and click <strong>Download AST JSON</strong>.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#080a0f] border border-white/[0.06] space-y-1.5">
            <div className="text-white font-bold">2. Fork the Registry Repo</div>
            <p className="text-slate-400 font-sans text-xs">
              Go to <a href="https://github.com/ndk123-web/trak-registry" target="_blank" rel="noopener noreferrer" className="text-white underline">github.com/ndk123-web/trak-registry</a> and click <strong>Fork</strong>.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#080a0f] border border-white/[0.06] space-y-1.5">
            <div className="text-white font-bold">3. Save in Your User Namespace</div>
            <p className="text-slate-400 font-sans text-xs">
              Place your file at: <br />
              <code className="text-slate-200 bg-white/5 px-1 py-0.5 rounded text-[11px]">users/&lt;your-github-username&gt;/&lt;category&gt;/&lt;tool&gt;.json</code>
              <br />
              <span className="text-slate-500 text-[11px]">Categories: <code className="text-slate-400">lang</code>, <code className="text-slate-400">os</code>, <code className="text-slate-400">cloud</code>, <code className="text-slate-400">db</code>, <code className="text-slate-400">tool</code></span>
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#080a0f] border border-white/[0.06] space-y-1.5">
            <div className="text-white font-bold">4. Submit PR & Go Live</div>
            <p className="text-slate-400 font-sans text-xs">
              Submit a Pull Request. GitHub Actions CI verifies your schema and actor identity. Once merged, anyone can immediately run:
            </p>
            <div className="p-1.5 rounded bg-black text-[11px] text-slate-300">
              $ trak init &lt;username&gt;/&lt;category&gt;/&lt;tool&gt;
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="rounded-xl p-5 sm:p-6 bg-[#0d0f15] border border-white/[0.08] space-y-4">
        <h2 className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="space-y-3 text-xs font-sans">
          <div className="p-3.5 rounded-lg bg-[#080a0f] border border-white/[0.06] space-y-1">
            <h3 className="font-bold text-white font-mono">
              Q: What if I write a folder name different from my GitHub username? (e.g. `users/ndk/` instead of `users/ndk123-web/`)
            </h3>
            <p className="text-slate-400 leading-relaxed">
              GitHub Actions CI will <strong>automatically reject the PR</strong> with a security error: <code className="text-rose-400 font-mono">"PR author @ndk123-web cannot modify namespace users/ndk/"</code>. This guarantees that nobody can impersonate or overwrite another creator&apos;s blueprints!
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-[#080a0f] border border-white/[0.06] space-y-1">
            <h3 className="font-bold text-white font-mono">
              Q: Do I need to edit `registry.json` when adding a community blueprint?
            </h3>
            <p className="text-slate-400 leading-relaxed">
              No! Community blueprints are resolved directly via deterministic GitHub Raw URLs (<code className="text-slate-200 font-mono">users/&lt;username&gt;/&lt;category&gt;/&lt;tool&gt;.json</code>). This means hundreds of contributors can submit PRs simultaneously with <strong>zero Git merge conflicts</strong>!
            </p>
          </div>
        </div>
      </div>

      {/* JSON Blueprint Schema */}
      <div className="rounded-xl p-5 sm:p-6 bg-[#0d0f15] border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white font-mono">Blueprint AST Schema Specification</h3>
          <button
            onClick={copySchemaCode}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/[0.06]"
          >
            {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copiedSchema ? "Copied" : "Copy JSON"}</span>
          </button>
        </div>

        <p className="text-xs text-slate-400 font-sans">
          Blueprints are represented as recursive file-system AST nodes with explicit <code className="text-slate-200 font-mono">type: &quot;directory&quot; | &quot;file&quot;</code> and encoded UTF-8 contents.
        </p>

        <div className="p-4 rounded-lg bg-[#080a0f] border border-white/[0.08] overflow-x-auto text-xs font-mono text-slate-300">
          <pre className="whitespace-pre">{sampleSchema}</pre>
        </div>
      </div>
    </div>
  );
}
