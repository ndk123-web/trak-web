"use client";

import React from "react";
import { Search, FolderGit2, CheckCircle2, Terminal, ArrowRight, Laptop } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Discover Blueprints",
      description: "Browse 19 battle-tested curriculum tracks directly from the web or via the CLI tree visualizer.",
      code: "trak list",
      badge: "Discovery",
      icon: Search,
    },
    {
      number: "02",
      title: "Materialize on Disk",
      description: "Trak streams the JSON template from the remote registry and builds a complete workspace with code and configs.",
      code: "trak init lang/go --path ./learn-go",
      badge: "Generation",
      icon: FolderGit2,
    },
    {
      number: "03",
      title: "Master Hands-On",
      description: "Open in VS Code or your preferred editor. Follow numbered modules from 00 to 20 with real working code.",
      code: "code ./learn-go && go run main.go",
      badge: "Mastery",
      icon: Laptop,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#07090e] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Seamless Developer Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            How Trak Works
          </h2>
          <p className="text-slate-400 mt-3 text-base sm:text-lg">
            From empty directory to production-grade hands-on laboratory in less than two seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-8 flex flex-col justify-between relative group hover:border-emerald-500/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black font-mono text-emerald-500/40 group-hover:text-emerald-400 transition-colors">
                      {step.number}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
                      {step.badge}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {step.title}
                    </h3>
                  </div>

                  <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5">
                  <div className="p-3 rounded-xl bg-[#07090e] border border-white/5 font-mono text-xs text-slate-300 flex items-center gap-2 overflow-x-auto">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-emerald-400 font-bold">$</span>
                    <span className="select-all">{step.code}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
