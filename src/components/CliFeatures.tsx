"use client";

import React from "react";
import { Cpu, HardDrive, Zap, ShieldCheck, GitBranch, Terminal } from "lucide-react";

export function CliFeatures() {
  const features = [
    {
      icon: Cpu,
      title: "Production-Grade Depth",
      description:
        "No hello-world toys. Dive deep into CPython GIL, MVCC visibility maps, Rust Tokio concurrency, and Kubernetes CKA control plane architectures.",
      badge: "In-Depth",
    },
    {
      icon: HardDrive,
      title: "Local-First & Offline",
      description:
        "Once materialized, everything lives as pure files and directories on your local drive. Work completely offline with zero web dependencies.",
      badge: "No Lock-in",
    },
    {
      icon: Zap,
      title: "Instant Workspace Generation",
      description:
        "Generates multi-module folders, working source code, build configs (Cargo.toml, go.mod, docker-compose.yml), and cheatsheet READMEs in under 2 seconds.",
      badge: "Blazing Fast",
    },
    {
      icon: ShieldCheck,
      title: "Immutable Metadata Stamping",
      description:
        "Every created workspace is stamped with a lightweight trak.json metadata record, ensuring track versioning and traceability.",
      badge: "Traceability",
    },
    {
      icon: GitBranch,
      title: "Decoupled GitHub Registry",
      description:
        "The CLI fetches up-to-date blueprints from a separate public registry repo, allowing new tracks to be added without upgrading the CLI binary.",
      badge: "Extensible",
    },
    {
      icon: Terminal,
      title: "Rich Terminal Experience",
      description:
        "Equipped with real-time spinners, ASCII tree browsers, intuitive default current-directory paths, and copy-pasteable next step guides.",
      badge: "Dev UX",
    },
  ];

  return (
    <section className="py-20 bg-[#080b12] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built for Engineers Who Learn by Building
          </h2>
          <p className="text-slate-400 mt-3 text-base sm:text-lg">
            Why Trak is different from video tutorials and static cheatsheets.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mt-5 group-hover:text-emerald-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
