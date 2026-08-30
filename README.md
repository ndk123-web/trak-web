<p align="center">
  <img src="public/trak.png" width="120" alt="Trak Web Logo" style="border-radius: 20px;" />
</p>

<h1 align="center">Trak Web</h1>

<p align="center">
  <strong>The Official Documentation & Interactive Blueprint Portal for Trak CLI</strong>
</p>

<p align="center">
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15.3+-black?style=flat-square&logo=next.js" alt="Next.js" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript" alt="TypeScript" /></a>
  <a href="https://github.com/ndk123-web/trak"><img src="https://img.shields.io/badge/CLI-v1.0.0-emerald?style=flat-square" alt="CLI Release" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat-square" alt="License" /></a>
</p>

---

## ⚡ Overview

**Trak Web** is the official web application and documentation platform for [Trak CLI](https://github.com/ndk123-web/trak). It provides an interactive catalog explorer, multi-module syllabus inspector, and real-time command generator for all 19 learning tracks across 5 engineering pillars.

---

## ✨ Features

- 🌳 **Interactive Catalog Matrix**: Search and filter 19 engineering blueprints across 5 categories (`lang`, `os`, `cloud`, `db`, `tool`) with 350+ hands-on modules.
- 📖 **Deep-Dive Syllabus Explorer**: Module-by-module breakdown with topic chips, file structure previews, and starter code walkthroughs.
- 💻 **Real-Time Terminal Simulator**: Tabbed CLI outputs simulating `trak list` and `trak init` materialization.
- 🎛️ **Collapsible Left Sidebar**: Desktop collapse/expand toggle with keyboard shortcut (`Cmd+B` / `Ctrl+B`) and `localStorage` persistence.
- 🔍 **Spotlight Quick Search (`Cmd+K` / `Ctrl+K`)**: Instant modal search across all tracks, commands, and documentation pages.
- 🎮 **Interactive Command Playground**: Customize `--path` destination and preview the materialized workspace file tree live.
- ⚡ **Multi-Platform 1-Liner Switcher**: 1-click copy for PowerShell, Windows CMD, Linux/macOS Bash, and `go install`.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Static Site Generation)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: System & Geist Monospace

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure [Node.js 18+](https://nodejs.org/) is installed on your machine.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```text
trak-web/
├── public/
│   └── trak.png                     # Official Logo & Favicon
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root App Shell (Sidebar + Header + Footer)
│   │   ├── page.tsx                 # Master Overview & Catalog Matrix
│   │   ├── quickstart/page.tsx      # 2-Minute CLI Quickstart Guide
│   │   ├── tracks/
│   │   │   ├── page.tsx             # Master Tracks Catalog
│   │   │   ├── [category]/page.tsx  # Pillar Filter Views
│   │   │   └── [category]/[slug]/   # Deep-Dive Track Syllabus Pages
│   │   ├── cli/
│   │   │   ├── page.tsx             # CLI Commands Reference Matrix
│   │   │   └── [command]/page.tsx   # Subcommand Docs (init, list, version)
│   │   ├── registry/page.tsx        # Registry Architecture & JSON AST Spec
│   │   └── playground/page.tsx      # Interactive Command Builder & Simulator
│   ├── components/
│   │   ├── AppHeader.tsx            # Header with breadcrumbs & 1-click install
│   │   ├── Sidebar.tsx              # Collapsible Navigation Sidebar
│   │   ├── Hero.tsx                 # Terminal simulator & install switcher
│   │   ├── CatalogExplorer.tsx      # Filterable tracks explorer
│   │   ├── QuickSearchModal.tsx     # Cmd+K Global Spotlight Search
│   │   └── Footer.tsx               # Open source credits & links
│   └── data/
│       └── tracks.ts                # Master dataset of all 19 tracks & 350+ modules
└── package.json
```

---

## 🔗 Related Repositories

- ⚡ **[Trak CLI](https://github.com/ndk123-web/trak)**: The core local-first Go binary that materializes learning workspaces.
- 🌐 **[Trak Registry](https://github.com/ndk123-web/trak-registry)**: The public JSON template catalog hosting all learning blueprints.

---

## 📄 License

This project is open-source under the **MIT License**. Copyright (c) 2026 Navnath Kadam.
