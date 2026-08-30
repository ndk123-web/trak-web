"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { AppHeader } from "./AppHeader";
import { Footer } from "./Footer";

interface AppLayoutShellProps {
  children: React.ReactNode;
}

export function AppLayoutShell({ children }: AppLayoutShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load persistence and keyboard shortcut
  useEffect(() => {
    setIsMounted(true);
    const savedState = localStorage.getItem("trak_sidebar_collapsed");
    if (savedState !== null) {
      setIsSidebarCollapsed(savedState === "true");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle sidebar with Cmd+B / Ctrl+B
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setIsSidebarCollapsed((prev) => {
          const next = !prev;
          localStorage.setItem("trak_sidebar_collapsed", String(next));
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("trak_sidebar_collapsed", String(next));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex">
      {/* Left Sidebar */}
      <Sidebar
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "lg:pl-18" : "lg:pl-68"
        }`}
      >
        <AppHeader
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebarCollapse={handleToggleCollapse}
        />

        <main className="flex-1 bg-radial-grid min-h-[calc(100vh-4rem)]">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
