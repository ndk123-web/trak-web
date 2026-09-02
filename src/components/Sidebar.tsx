"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Layers,
  Terminal,
  BookOpen,
  PlaySquare,
  Flame,
  PanelLeftClose,
  PanelLeft,
  ChevronRight,
  ExternalLink,
  Code2,
  HardDrive,
  Cpu,
} from "lucide-react";
import { CATEGORIES, TRACKS } from "@/data/tracks";
import { TrakLogo } from "./TrakLogo";
import { CategoryIcon } from "./CategoryIcon";

interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }> | (() => React.ReactNode);
  badge?: string;
  isCode?: boolean;
  isNew?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export function Sidebar({
  isOpenMobile,
  onCloseMobile,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navSections: NavSection[] = [
    {
      title: "Overview",
      items: [
        { name: "Introduction", href: "/", icon: Sparkles },
        { name: "Quickstart Guide", href: "/quickstart", icon: Flame },
      ],
    },
    {
      title: "Learning Tracks",
      items: [
        { name: "All Blueprints", href: "/tracks", icon: Layers, badge: `${TRACKS.length}` },
        ...CATEGORIES.map((cat) => {
          const count = TRACKS.filter((t) => t.category === cat.id).length;
          return {
            name: cat.title,
            href: `/tracks/${cat.id}`,
            icon: () => <CategoryIcon category={cat.id} className="w-4 h-4" />,
            badge: `${count}`,
          };
        }),
      ],
    },
    {
      title: "CLI Commands",
      items: [
        { name: "Commands Matrix", href: "/cli", icon: Terminal },
        { name: "trak init", href: "/cli/init", icon: Terminal, isCode: true },
        { name: "trak list", href: "/cli/list", icon: Terminal, isCode: true },
        { name: "trak version", href: "/cli/version", icon: Terminal, isCode: true },
      ],
    },
    {
      title: "Registry & GitOps",
      items: [
        { name: "Registry Guide", href: "/registry", icon: BookOpen },
      ],
    },
    {
      title: "Interactive & Tools",
      items: [
        { name: "Blueprint Studio", href: "/studio", icon: Code2, isNew: true },
        { name: "Command Playground", href: "/playground", icon: PlaySquare },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-[#090b10] border-r border-white/[0.07] flex flex-col transition-all duration-300 ease-in-out ${
          // Mobile state
          isOpenMobile
            ? "translate-x-0 w-72"
            : "-translate-x-full lg:translate-x-0"
        } ${
          // Desktop collapsed vs expanded
          isCollapsed ? "lg:w-18" : "lg:w-68"
        }`}
      >
        {/* Header Branding */}
        <div className="h-16 px-4 border-b border-white/[0.07] flex items-center justify-between">
          <Link
            href="/"
            onClick={onCloseMobile}
            className={`flex items-center gap-3 group min-w-0 ${
              isCollapsed ? "justify-center w-full" : ""
            }`}
            title="Trak - Developer Workspace Generator"
          >
            <TrakLogo size={28} className="group-hover:scale-105" />

            {!isCollapsed && (
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  trak
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  v1.1.0
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle Button */}
          {!isCollapsed && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Collapse sidebar (Cmd+B)"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-none">
          {navSections.map((section, sIdx) => (
            <div key={sIdx}>
              {!isCollapsed && (
                <div className="px-3 mb-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold select-none">
                  {section.title}
                </div>
              )}

              <div className="space-y-0.5">
                {section.items.map((item, iIdx) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={iIdx}
                      href={item.href}
                      onClick={onCloseMobile}
                      title={isCollapsed ? item.name : undefined}
                      className={`flex items-center rounded-xl text-xs transition-all group ${
                        isCollapsed
                          ? "justify-center p-2.5"
                          : "justify-between px-3 py-2"
                      } ${
                        active
                          ? "bg-white/[0.08] text-white font-semibold shadow-sm border border-white/[0.08]"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-4 h-4 flex items-center justify-center shrink-0 ${
                            active
                              ? "text-emerald-400"
                              : "text-slate-500 group-hover:text-slate-300"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        {!isCollapsed && (
                          <span
                            className={`truncate ${
                              item.isCode ? "font-mono font-medium" : ""
                            }`}
                          >
                            {item.name}
                          </span>
                        )}
                      </div>

                      {!isCollapsed && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.badge && (
                            <span
                              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                                active
                                  ? "bg-emerald-500/20 text-emerald-300 font-bold"
                                  : "bg-white/5 text-slate-500 group-hover:text-slate-300"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                          {item.isNew && (
                            <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[9px] font-mono font-bold">
                              NEW
                            </span>
                          )}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/[0.07] bg-[#07080d]">
          {isCollapsed ? (
            <button
              onClick={onToggleCollapse}
              className="w-full flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Expand sidebar"
            >
              <PanelLeft className="w-4 h-4 text-emerald-400" />
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/[0.06] text-[11px] space-y-1.5">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-mono text-slate-300 font-medium">ndk123-web/trak</span>
                <a
                  href="https://github.com/ndk123-web/trak"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="text-[10px] text-slate-500 flex items-center justify-between">
                <span>MIT License</span>
                <span className="font-mono text-emerald-400">v1.1.0</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
