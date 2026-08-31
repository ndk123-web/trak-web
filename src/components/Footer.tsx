"use client";

import React from "react";
import { Heart, Sparkles, ExternalLink } from "lucide-react";
import { TrakLogo } from "./TrakLogo";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#05070a] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <TrakLogo size={28} />
              <span className="font-bold text-lg text-white">Trak</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                v1.0.0
              </span>
            </div>

            <p className="text-slate-400 max-w-md leading-relaxed text-xs">
              A local-first developer CLI tool that resolves, streams, and materializes structured, multi-module learning workspaces and production curriculum directly onto your filesystem.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/ndk123-web/trak"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors"
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Registry Repo</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider mb-4">
              Pillars & Tracks
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#catalog" className="hover:text-emerald-400 transition-colors">
                  📦 Languages (Go, Rust, Python, TS...)
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-emerald-400 transition-colors">
                  🐧 Operating Systems (Linux, macOS, Windows)
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-emerald-400 transition-colors">
                  ☁️ Cloud (AWS Architecture)
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-emerald-400 transition-colors">
                  🗄️ Databases (Postgres, Redis, SQL)
                </a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-emerald-400 transition-colors">
                  🛠️ DevOps (Docker, K8s, Terraform, Git...)
                </a>
              </li>
            </ul>
          </div>

          {/* Developer & License */}
          <div>
            <h4 className="font-bold text-white font-mono text-xs uppercase tracking-wider mb-4">
              Open Source
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://github.com/ndk123-web/trak/blob/main/LICENSE"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  MIT License
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ndk123-web/trak/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Releases & Changelog (v1.0.0)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ndk123-web/trak/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Report Issue / Request Track
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Trak CLI • Created by{" "}
            <a
              href="https://github.com/ndk123-web"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-emerald-400 font-medium transition-colors"
            >
              Navnath Kadam
            </a>
          </div>

          <div className="flex items-center gap-1">
            <span>Built for developers with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
            <span>and Go</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
