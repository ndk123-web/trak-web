"use client";

import React from "react";
import Link from "next/link";
import { Heart, Sparkles, ExternalLink, Code2, Cpu, Cloud, Database, Wrench, BookOpen, Terminal, Flame } from "lucide-react";
import { TrakConfig } from "@/shared/config";
import { TrakLogo } from "./TrakLogo";
import { CategoryIcon } from "./CategoryIcon";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#07090e] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <TrakLogo size={26} />
              <span className="font-bold text-base text-white font-mono">trak</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                {TrakConfig.version}
              </span>
            </div>

            <p className="text-slate-400 max-w-md leading-relaxed text-xs font-sans">
              A local-first developer CLI that materializes production-grade, multi-module learning labs and system curriculums directly onto your local filesystem with pure GitOps.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://github.com/ndk123-web/trak"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors text-xs font-mono"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>CLI Repo</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href="https://github.com/ndk123-web/trak-registry"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors text-xs font-mono"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>Registry Repo</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Curriculum Tracks */}
          <div>
            <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider mb-4">
              Disciplines
            </h4>
            <ul className="space-y-2.5 font-sans">
              <li>
                <Link href="/tracks/lang" className="hover:text-white transition-colors flex items-center gap-2">
                  <CategoryIcon category="lang" className="w-3.5 h-3.5 text-slate-400" />
                  <span>Programming Languages</span>
                </Link>
              </li>
              <li>
                <Link href="/tracks/os" className="hover:text-white transition-colors flex items-center gap-2">
                  <CategoryIcon category="os" className="w-3.5 h-3.5 text-slate-400" />
                  <span>Operating Systems & Kernels</span>
                </Link>
              </li>
              <li>
                <Link href="/tracks/cloud" className="hover:text-white transition-colors flex items-center gap-2">
                  <CategoryIcon category="cloud" className="w-3.5 h-3.5 text-slate-400" />
                  <span>Cloud Infrastructure</span>
                </Link>
              </li>
              <li>
                <Link href="/tracks/db" className="hover:text-white transition-colors flex items-center gap-2">
                  <CategoryIcon category="db" className="w-3.5 h-3.5 text-slate-400" />
                  <span>Databases & Storage</span>
                </Link>
              </li>
              <li>
                <Link href="/tracks/tool" className="hover:text-white transition-colors flex items-center gap-2">
                  <CategoryIcon category="tool" className="w-3.5 h-3.5 text-slate-400" />
                  <span>DevOps & Developer Tools</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Open Source */}
          <div>
            <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 font-sans">
              <li>
                <Link href="/quickstart" className="hover:text-white transition-colors">
                  Quickstart Guide
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-white transition-colors">
                  Blueprint Studio IDE
                </Link>
              </li>
              <li>
                <Link href="/registry" className="hover:text-white transition-colors">
                  GitOps Registry Guide
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/ndk123-web/trak/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Releases & Changelog ({TrakConfig.version})
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ndk123-web/trak/blob/main/LICENSE"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-mono">
          <div>
            © {new Date().getFullYear()} Trak CLI • Built by{" "}
            <a
              href="https://github.com/ndk123-web"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Navnath Kadam
            </a>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Offline, Local-First & 100% Open Source</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
