"use client";

import React, { useState } from "react";
import { Terminal, Sparkles, Copy, Check } from "lucide-react";
import { TrakConfig } from "@/shared/config";

export function Navbar() {
  const [copied, setCopied] = useState(false);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText("irm https://raw.githubusercontent.com/ndk123-web/trak/main/scripts/install.ps1 | iex");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#07090e]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <Terminal className="w-4.5 h-4.5 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                Trak
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                {TrakConfig.version}
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#catalog" className="hover:text-emerald-400 transition-colors">
            Catalog & Tracks
          </a>
          <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">
            How It Works
          </a>
          <a href="#cli-reference" className="hover:text-emerald-400 transition-colors">
            CLI Commands
          </a>
          <a
            href="https://github.com/ndk123-web/trak-registry"
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Registry
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyInstall}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Copy installation command"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-400" />
            )}
            <span>irm trak/install.ps1 | iex</span>
          </button>

          <a
            href="https://github.com/ndk123-web/trak"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-all shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
