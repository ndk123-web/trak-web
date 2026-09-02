"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Terminal, Copy, Check, ChevronDown, ArrowRight } from "lucide-react";

function FAQItem({ q, children }: { q: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left cursor-pointer group"
      >
        <span className="text-[13px] font-medium text-slate-200 group-hover:text-white transition-colors leading-snug">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-500 shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-4 text-xs text-slate-400 leading-relaxed font-sans -mt-1 pr-8">
          {children}
        </div>
      )}
    </div>
  );
}

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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-slate-400 text-xs font-mono font-medium mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Registry Documentation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-normal text-white tracking-tight">
          Community Registry &amp; Publishing Guide
        </h1>
        <p className="text-slate-400 text-sm mt-2 leading-relaxed font-sans max-w-2xl">
          Everything you need to know about publishing your own learning tracks to the Trak Registry. No accounts, no servers — just a GitHub Pull Request.
        </p>
      </div>

      {/* ── How CLI Resolves Blueprints ── */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-slate-500" />
          How the CLI resolves blueprints
        </h2>
        <p className="text-xs text-slate-400 font-sans leading-relaxed">
          When you run <code className="text-slate-200 font-mono">trak init</code>, the CLI determines whether you want an official or community track based on the path format, then fetches the JSON blueprint from the registry via a raw GitHub URL.
        </p>

        <div className="overflow-x-auto rounded-lg border border-white/[0.08]">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="px-4 py-2.5 text-slate-500 font-normal border-b border-white/[0.06]">You type</th>
                <th className="px-4 py-2.5 text-slate-500 font-normal border-b border-white/[0.06]">Type</th>
                <th className="px-4 py-2.5 text-slate-500 font-normal border-b border-white/[0.06]">File resolved in registry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr>
                <td className="px-4 py-2.5 text-white">trak init lang/go</td>
                <td className="px-4 py-2.5 text-slate-400">Official</td>
                <td className="px-4 py-2.5 text-slate-300">templates/lang/go.json</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-white">trak init trak/lang/go</td>
                <td className="px-4 py-2.5 text-slate-400">Official (explicit)</td>
                <td className="px-4 py-2.5 text-slate-300">templates/lang/go.json</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-white">{`trak init alice/db/postgres`}</td>
                <td className="px-4 py-2.5 text-slate-400">Community</td>
                <td className="px-4 py-2.5 text-slate-300">users/alice/db/postgres.json</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-white">{`trak init alice/db/postgres@v2.0.0`}</td>
                <td className="px-4 py-2.5 text-slate-400">Community (versioned)</td>
                <td className="px-4 py-2.5 text-slate-300">users/alice/db/postgres@v2.0.0.json</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Publishing Guide ── */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold text-white">Publishing a community track</h2>
        <p className="text-xs text-slate-400 font-sans leading-relaxed">
          The entire publishing flow is a standard GitHub Pull Request. No accounts, API keys, or dashboards. Once your PR is merged, your track is instantly available to anyone via the CLI.
        </p>

        <div className="space-y-px rounded-lg border border-white/[0.08] overflow-hidden">
          {[
            {
              step: "1",
              title: "Create your blueprint",
              desc: <>Use <Link href="/studio" className="text-white underline">Blueprint Studio</Link> to visually scaffold directories and files, or write the JSON by hand. Export a valid AST JSON file when done.</>,
            },
            {
              step: "2",
              title: "Fork & commit",
              desc: <>Fork <a href="https://github.com/ndk123-web/trak-registry" target="_blank" rel="noopener noreferrer" className="text-white underline">ndk123-web/trak-registry</a> on GitHub. Place your file at:<br /><code className="text-slate-200 font-mono text-[11px]">users/&lt;your-github-username&gt;/&lt;category&gt;/&lt;track-name&gt;.json</code><br /><span className="text-slate-500 text-[11px]">For versioned releases: <code className="text-slate-300 font-mono">track-name@v1.0.0.json</code></span></>,
            },
            {
              step: "3",
              title: "Open a Pull Request",
              desc: "GitHub Actions automatically runs the CI validator on your PR. It checks your identity, file path, schema structure, and security rules. If everything passes, a maintainer merges it.",
            },
            {
              step: "4",
              title: "Your track is live",
              desc: <>Once merged, anyone can immediately run:<br /><code className="text-slate-200 font-mono text-[11px]">$ trak init &lt;your-username&gt;/&lt;category&gt;/&lt;track-name&gt;</code></>,
            },
          ].map((s) => (
            <div key={s.step} className="flex gap-4 items-start p-4 bg-[#0d0f15] border-b border-white/[0.04] last:border-b-0">
              <span className="text-xs font-mono font-bold text-slate-500 bg-white/[0.04] rounded px-2 py-0.5 shrink-0">{s.step}</span>
              <div className="space-y-1">
                <div className="text-[13px] font-medium text-white">{s.title}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CI Validation Rules ── */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold text-white">CI validation rules</h2>
        <p className="text-xs text-slate-400 font-sans leading-relaxed">
          Every Pull Request triggers a GitHub Actions workflow that runs <code className="text-slate-200 font-mono">scripts/validate.go</code>. It performs two passes: a security check on changed files, then a schema validation on every blueprint in the repo.
        </p>

        {/* Pass 1 */}
        <div className="rounded-lg border border-white/[0.08] overflow-hidden">
          <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06]">
            <span className="text-xs font-mono font-bold text-slate-300">Pass 1 — PR author &amp; file security</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Only runs on pull_request events. Uses git diff to detect which files changed.</p>
          </div>
          <div className="p-4 space-y-2.5 text-xs">
            {[
              { rule: "Cannot touch CI infrastructure", detail: <>Files under <code className="text-slate-300 font-mono">scripts/</code> or <code className="text-slate-300 font-mono">.github/</code> are blocked.</> },
              { rule: "Cannot modify official templates", detail: <>Anything under <code className="text-slate-300 font-mono">templates/</code> is reserved for the repo owner.</> },
              { rule: "Cannot modify another user's namespace", detail: <>You can only touch <code className="text-slate-300 font-mono">users/&lt;your-username&gt;/</code>. If your GitHub username is <code className="text-slate-300 font-mono">alice</code>, you can&apos;t modify <code className="text-slate-300 font-mono">users/bob/</code>.</> },
              { rule: "Cannot modify root repository files", detail: <>Files like <code className="text-slate-300 font-mono">README.md</code> or <code className="text-slate-300 font-mono">LICENSE</code> at the repo root are blocked.</> },
              { rule: "Path must be exactly 4 segments", detail: <><code className="text-slate-300 font-mono">users/&lt;you&gt;/&lt;category&gt;/&lt;file&gt;.json</code> — no deeper, no shallower.</> },
              { rule: "Must use a valid category", detail: <>Allowed: <code className="text-slate-300 font-mono">lang</code>, <code className="text-slate-300 font-mono">os</code>, <code className="text-slate-300 font-mono">cloud</code>, <code className="text-slate-300 font-mono">db</code>, <code className="text-slate-300 font-mono">tool</code>.</> },
              { rule: "File must end in .json", detail: "Only .json files are accepted inside user namespaces." },
            ].map((r, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-slate-600 shrink-0 mt-px">•</span>
                <div>
                  <span className="text-slate-200 font-medium">{r.rule}</span>
                  <span className="text-slate-500"> — </span>
                  <span className="text-slate-400">{r.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pass 2 */}
        <div className="rounded-lg border border-white/[0.08] overflow-hidden">
          <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06]">
            <span className="text-xs font-mono font-bold text-slate-300">Pass 2 — Blueprint schema &amp; safety</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Runs on every push and PR. Walks the entire repository and validates every .json blueprint.</p>
          </div>
          <div className="p-4 space-y-2.5 text-xs">
            {[
              { rule: "Valid JSON with required fields", detail: <><code className="text-slate-300 font-mono">id</code>, <code className="text-slate-300 font-mono">name</code>, <code className="text-slate-300 font-mono">version</code>, and <code className="text-slate-300 font-mono">root</code> are mandatory.</> },
              { rule: "Root must be a directory node", detail: <><code className="text-slate-300 font-mono">root.type</code> must be <code className="text-slate-300 font-mono">&quot;directory&quot;</code> with a non-empty <code className="text-slate-300 font-mono">name</code>.</> },
              { rule: "Max file size: 5 MB", detail: "Blueprint JSON files exceeding 5 MB are rejected." },
              { rule: "No executable binaries", detail: <> Nodes ending in <code className="text-slate-300 font-mono">.exe</code>, <code className="text-slate-300 font-mono">.dll</code>, <code className="text-slate-300 font-mono">.so</code>, or <code className="text-slate-300 font-mono">.dylib</code> are rejected.</> },
              { rule: "No path traversal", detail: <>Node names cannot contain <code className="text-slate-300 font-mono">/</code>, <code className="text-slate-300 font-mono">\</code>, <code className="text-slate-300 font-mono">:</code>, null bytes, or be <code className="text-slate-300 font-mono">..</code>.</> },
              { rule: "Every node must have a valid type", detail: <> Must be <code className="text-slate-300 font-mono">&quot;file&quot;</code> or <code className="text-slate-300 font-mono">&quot;directory&quot;</code>. File nodes cannot have children.</> },
            ].map((r, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-slate-600 shrink-0 mt-px">•</span>
                <div>
                  <span className="text-slate-200 font-medium">{r.rule}</span>
                  <span className="text-slate-500"> — </span>
                  <span className="text-slate-400">{r.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[11px] text-slate-500 font-sans">
          The repo owner (<code className="text-slate-400 font-mono">ndk123-web</code>) bypasses all Pass 1 security rules and can modify any file.
        </p>
      </section>

      {/* ── Multi-Version Releases ── */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold text-white">Multi-version releases</h2>
        <p className="text-xs text-slate-400 font-sans leading-relaxed">
          You can publish multiple versions of the same track side by side. Append <code className="text-slate-200 font-mono">@version</code> to the filename. Useful for major upgrades, difficulty levels, or LTS releases.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-lg bg-[#0d0f15] border border-white/[0.08] space-y-2">
            <div className="text-xs font-mono text-slate-400">File layout</div>
            <pre className="text-[11px] font-mono text-slate-300 leading-relaxed">{`users/alice/db/
├── postgres.json          # default
├── postgres@v1.0.0.json   # stable LTS
└── postgres@v2.0.0.json   # latest major`}</pre>
          </div>
          <div className="p-4 rounded-lg bg-[#0d0f15] border border-white/[0.08] space-y-2.5">
            <div className="text-xs font-mono text-slate-400">CLI usage</div>
            <div className="space-y-1.5 text-[11px] font-mono">
              <div className="px-3 py-1.5 rounded bg-black/40 border border-white/[0.04] text-slate-300">
                $ trak init alice/db/postgres
                <span className="text-slate-600 block">→ resolves postgres.json</span>
              </div>
              <div className="px-3 py-1.5 rounded bg-black/40 border border-white/[0.04] text-slate-300">
                $ trak init alice/db/postgres@v1.0.0
                <span className="text-slate-600 block">→ resolves postgres@v1.0.0.json</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Blueprint Schema Spec ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Blueprint schema specification</h2>
          <button
            onClick={copySchemaCode}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/[0.06]"
          >
            {copiedSchema ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSchema ? "Copied" : "Copy"}</span>
          </button>
        </div>
        <p className="text-xs text-slate-400 font-sans leading-relaxed">
          Blueprints are recursive file-system AST trees. Each node has a <code className="text-slate-200 font-mono">type</code> of <code className="text-slate-200 font-mono">&quot;file&quot;</code> or <code className="text-slate-200 font-mono">&quot;directory&quot;</code>, a <code className="text-slate-200 font-mono">name</code>, and optionally <code className="text-slate-200 font-mono">content</code> (for files) or <code className="text-slate-200 font-mono">children</code> (for directories).
        </p>
        <div className="rounded-lg bg-[#080a0f] border border-white/[0.08] overflow-hidden">
          <div className="px-4 py-2 border-b border-white/[0.06] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="text-[11px] font-mono text-slate-500 ml-1">example-blueprint.json</span>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-300 whitespace-pre overflow-x-auto">{sampleSchema}</pre>
        </div>

        <div className="overflow-x-auto rounded-lg border border-white/[0.08]">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-white/[0.02]">
                <th className="px-4 py-2 text-slate-500 font-normal border-b border-white/[0.06]">Field</th>
                <th className="px-4 py-2 text-slate-500 font-normal border-b border-white/[0.06]">Type</th>
                <th className="px-4 py-2 text-slate-500 font-normal border-b border-white/[0.06]">Required</th>
                <th className="px-4 py-2 text-slate-500 font-normal border-b border-white/[0.06]">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              <tr><td className="px-4 py-2 text-slate-200">id</td><td className="px-4 py-2 text-slate-400">string</td><td className="px-4 py-2 text-slate-300">yes</td><td className="px-4 py-2 text-slate-400 font-sans">Unique identifier, e.g. &quot;lang/go&quot;</td></tr>
              <tr><td className="px-4 py-2 text-slate-200">name</td><td className="px-4 py-2 text-slate-400">string</td><td className="px-4 py-2 text-slate-300">yes</td><td className="px-4 py-2 text-slate-400 font-sans">Human-readable track name</td></tr>
              <tr><td className="px-4 py-2 text-slate-200">version</td><td className="px-4 py-2 text-slate-400">string</td><td className="px-4 py-2 text-slate-300">yes</td><td className="px-4 py-2 text-slate-400 font-sans">Semver string, e.g. &quot;1.2.0&quot;</td></tr>
              <tr><td className="px-4 py-2 text-slate-200">description</td><td className="px-4 py-2 text-slate-400">string</td><td className="px-4 py-2 text-slate-500">no</td><td className="px-4 py-2 text-slate-400 font-sans">Short summary of the curriculum</td></tr>
              <tr><td className="px-4 py-2 text-slate-200">root</td><td className="px-4 py-2 text-slate-400">Node</td><td className="px-4 py-2 text-slate-300">yes</td><td className="px-4 py-2 text-slate-400 font-sans">Root directory node of the AST tree</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-white">Frequently asked questions</h2>
        <div className="rounded-lg border border-white/[0.08] px-4 bg-[#0d0f15]">
          <FAQItem q="Do I need any account or API key to publish?">
            No. Your GitHub identity is your account. The CI reads <code className="text-slate-300 font-mono">GITHUB_ACTOR</code> from the PR and compares it against the folder path. If your GitHub username is <code className="text-slate-300 font-mono">alice</code>, you can only modify files under <code className="text-slate-300 font-mono">users/alice/</code>. No signups, tokens, or dashboards.
          </FAQItem>
          <FAQItem q="What happens if I put my file in the wrong folder?">
            The CI rejects your PR with a clear error. For example, if your username is <code className="text-slate-300 font-mono">alice</code> but you place a file under <code className="text-slate-300 font-mono">users/bob/</code>, you&apos;ll see: <code className="text-slate-300 font-mono">&quot;PR author @alice cannot modify namespace of another user users/bob/&quot;</code>. Fix the path and push again.
          </FAQItem>
          <FAQItem q="Can I edit official templates like templates/lang/go.json?">
            No. Official templates are maintained by the repo owner. If you try to modify anything under <code className="text-slate-300 font-mono">templates/</code>, the CI rejects with: <code className="text-slate-300 font-mono">&quot;cannot modify official templates/&quot;</code>. Create your own version under <code className="text-slate-300 font-mono">users/alice/lang/go.json</code> instead.
          </FAQItem>
          <FAQItem q="What categories can I use?">
            Five: <code className="text-slate-300 font-mono">lang</code> (programming languages), <code className="text-slate-300 font-mono">os</code> (operating systems), <code className="text-slate-300 font-mono">cloud</code> (cloud platforms), <code className="text-slate-300 font-mono">db</code> (databases), and <code className="text-slate-300 font-mono">tool</code> (devtools &amp; frameworks). Using anything else fails validation.
          </FAQItem>
          <FAQItem q="How do I publish multiple versions of the same track?">
            Add <code className="text-slate-300 font-mono">@version</code> to the filename. <code className="text-slate-300 font-mono">postgres.json</code> is the default, <code className="text-slate-300 font-mono">postgres@v1.0.0.json</code> is v1, <code className="text-slate-300 font-mono">postgres@v2.0.0.json</code> is v2. Users choose with <code className="text-slate-300 font-mono">trak init alice/db/postgres@v1.0.0</code>.
          </FAQItem>
          <FAQItem q="Do I need to edit registry.json or any index file?">
            No. Community blueprints are resolved via deterministic GitHub raw URLs based on the file path. No central index to update — multiple contributors can submit PRs at the same time with zero merge conflicts.
          </FAQItem>
          <FAQItem q="What is the maximum file size?">
            5 MB per JSON file. Most blueprints are well under 500 KB.
          </FAQItem>
          <FAQItem q="Can I include binary files inside my blueprint?">
            No. The validator rejects any file node whose name ends in <code className="text-slate-300 font-mono">.exe</code>, <code className="text-slate-300 font-mono">.dll</code>, <code className="text-slate-300 font-mono">.so</code>, or <code className="text-slate-300 font-mono">.dylib</code>. Blueprints should only contain source code and text.
          </FAQItem>
        </div>
      </section>
    </div>
  );
}
