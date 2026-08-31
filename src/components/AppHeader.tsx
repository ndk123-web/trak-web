"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  PanelLeft,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { QuickSearchModal } from "./QuickSearchModal";
import { TrakLogo } from "./TrakLogo";

interface AppHeaderProps {
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
  isSidebarCollapsed?: boolean;
  onToggleSidebarCollapse?: () => void;
}

export function AppHeader({
  onMobileMenuToggle,
  isMobileMenuOpen,
  isSidebarCollapsed,
  onToggleSidebarCollapse,
}: AppHeaderProps) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Build clean breadcrumbs
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-16 border-b border-white/[0.07] bg-[#07090e]/85 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Sidebar Toggle & Breadcrumbs */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger button */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 transition-colors cursor-pointer border border-white/[0.06]"
            aria-label="Toggle Navigation Sidebar"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>

          {/* Desktop Sidebar Toggle (when collapsed) */}
          {isSidebarCollapsed && (
            <button
              onClick={onToggleSidebarCollapse}
              className="hidden lg:flex p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/[0.06]"
              title="Expand Sidebar (Cmd+B)"
            >
              <PanelLeft className="w-4 h-4 text-emerald-400" />
            </button>
          )}

          {/* Logo on mobile only (desktop has it in sidebar) */}
          <Link href="/" className="flex lg:hidden items-center gap-2">
            <TrakLogo size={24} />
            <span className="font-extrabold text-base text-white">trak</span>
          </Link>

          {/* Breadcrumbs */}
          <nav className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link
              href="/"
              className="hover:text-emerald-400 transition-colors font-medium"
            >
              trak
            </Link>
            {pathSegments.map((segment, idx) => {
              const href = `/${pathSegments.slice(0, idx + 1).join("/")}`;
              const isLast = idx === pathSegments.length - 1;
              return (
                <React.Fragment key={idx}>
                  <span className="text-slate-600">/</span>
                  {isLast ? (
                    <span className="text-white font-semibold">{segment}</span>
                  ) : (
                    <Link
                      href={href}
                      className="hover:text-slate-200 transition-colors"
                    >
                      {segment}
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>

        {/* Right: Quick Search + Studio + Install Command + GitHub */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Blueprint Studio Link */}
          <Link
            href="/studio"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-medium transition-all"
          >
            <span>Studio</span>
            <span className="px-1 py-0.2 rounded bg-emerald-400 text-slate-950 font-bold text-[9px]">
              NEW
            </span>
          </Link>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-xs text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">Quick Search</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 rounded bg-black/50 text-[10px] font-mono text-slate-400 border border-white/10">
              ⌘K
            </kbd>
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/ndk123-web/trak"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white font-medium text-xs transition-all"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </header>

      {/* Global Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
