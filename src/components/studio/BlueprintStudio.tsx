"use client";

import React, { useState, useEffect } from "react";
import {
  Wrench,
  Plus,
  RotateCcw,
  Sparkles,
  Columns2,
  FileCode,
  FileJson,
  Layers,
  CheckCircle2,
  FolderTree,
} from "lucide-react";
import {
  TemplateBlueprint,
  TemplateNode,
  sanitizeNode,
  serializeBlueprintToJSON,
} from "@/types/studio";
import { FileTreePane } from "./FileTreePane";
import { EditorPane } from "./EditorPane";
import { JsonPreviewPane } from "./JsonPreviewPane";
import { MetadataModal } from "./MetadataModal";
import { TRACKS } from "@/data/tracks";

const BLANK_TEMPLATE: TemplateBlueprint = {
  id: "lang/mytrack",
  name: "My Custom Learning Track",
  version: "1.0.0",
  description: "Hands-on engineering curriculum with practical exercises and build manifests.",
  root: {
    id: "learn-mytrack",
    name: "learn-mytrack",
    type: "directory",
    children: [
      {
        id: "learn-mytrack/README.md",
        name: "README.md",
        type: "file",
        content: `# My Custom Learning Track\n\nWelcome to your hands-on engineering lab!\n\n## Curriculum Roadmap\n- [ ] **00 - Setup & Toolchain**\n- [ ] **01 - Fundamentals**\n- [ ] **02 - Concurrency & Internals**\n`,
      },
      {
        id: "learn-mytrack/00-setup-and-toolchain",
        name: "00-setup-and-toolchain",
        type: "directory",
        children: [
          {
            id: "learn-mytrack/00-setup-and-toolchain/README.md",
            name: "README.md",
            type: "file",
            content: `# 00 - Setup & Toolchain\n\nInstall the compiler and configure your environment.\n`,
          },
          {
            id: "learn-mytrack/00-setup-and-toolchain/main.go",
            name: "main.go",
            type: "file",
            content: `package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello from Module 00!")\n}\n`,
          },
        ],
      },
    ],
  },
};

export function BlueprintStudio() {
  const [selectedPreset, setSelectedPreset] = useState<string>("lang/go");
  const [blueprint, setBlueprint] = useState<TemplateBlueprint>(BLANK_TEMPLATE);
  const [activeFilePath, setActiveFilePath] = useState<string | null>(null);
  const [activeContent, setActiveContent] = useState<string>("");
  const [isMetaModalOpen, setIsMetaModalOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"split" | "editor" | "json">("split");
  const [isLoadingPreset, setIsLoadingPreset] = useState<boolean>(false);

  // Load preset JSON on initial mount or preset change
  const loadPreset = async (presetId: string) => {
    if (presetId === "blank") {
      setBlueprint(BLANK_TEMPLATE);
      setActiveFilePath("learn-mytrack/README.md");
      setActiveContent(BLANK_TEMPLATE.root.children?.[0]?.content || "");
      return;
    }

    setIsLoadingPreset(true);
    try {
      const parts = presetId.split("/");
      const category = parts[0];
      const slug = parts[1];
      const res = await fetch(`/templates/${category}/${slug}.json`);
      if (res.ok) {
        const rawJson = await res.json();
        const sanitizedRoot = sanitizeNode(rawJson.root);
        const newBlueprint: TemplateBlueprint = {
          id: rawJson.id || presetId,
          name: rawJson.name || slug,
          version: rawJson.version || "1.0.0",
          description: rawJson.description || "",
          root: sanitizedRoot,
        };
        setBlueprint(newBlueprint);

        // Auto-select first file
        const firstFile = findFirstFile(sanitizedRoot);
        if (firstFile) {
          setActiveFilePath(firstFile.id);
          setActiveContent(firstFile.content || "");
        } else {
          setActiveFilePath(null);
          setActiveContent("");
        }
      }
    } catch (e) {
      console.error("Failed to load preset:", e);
    } finally {
      setIsLoadingPreset(false);
    }
  };

  useEffect(() => {
    loadPreset("lang/go");
  }, []);

  // Helper to find first file in tree
  const findFirstFile = (node: TemplateNode): TemplateNode | null => {
    if (node.type === "file") return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findFirstFile(child);
        if (found) return found;
      }
    }
    return null;
  };

  // Helper: Update file content in recursive tree
  const updateTreeContent = (
    current: TemplateNode,
    targetPath: string,
    newContent: string
  ): TemplateNode => {
    if (current.id === targetPath) {
      return { ...current, content: newContent };
    }
    if (current.children) {
      return {
        ...current,
        children: current.children.map((c) =>
          updateTreeContent(c, targetPath, newContent)
        ),
      };
    }
    return current;
  };

  // Helper: Add node to recursive tree
  const addNodeToTree = (
    current: TemplateNode,
    parentPath: string,
    name: string,
    type: "file" | "directory"
  ): TemplateNode => {
    if (current.id === parentPath && current.type === "directory") {
      const newPath = `${parentPath}/${name}`;
      const newNode: TemplateNode = {
        id: newPath,
        name,
        type,
        content: type === "file" ? `// ${name}\n` : undefined,
        children: type === "directory" ? [] : undefined,
      };
      return {
        ...current,
        children: [...(current.children || []), newNode],
      };
    }
    if (current.children) {
      return {
        ...current,
        children: current.children.map((c) =>
          addNodeToTree(c, parentPath, name, type)
        ),
      };
    }
    return current;
  };

  // Helper: Rename node in recursive tree
  const renameNodeInTree = (
    current: TemplateNode,
    targetPath: string,
    newName: string
  ): TemplateNode => {
    if (current.id === targetPath) {
      const parentDir = targetPath.substring(0, targetPath.lastIndexOf("/"));
      const newId = parentDir ? `${parentDir}/${newName}` : newName;
      return {
        ...current,
        id: newId,
        name: newName,
      };
    }
    if (current.children) {
      return {
        ...current,
        children: current.children.map((c) =>
          renameNodeInTree(c, targetPath, newName)
        ),
      };
    }
    return current;
  };

  // Helper: Delete node from recursive tree
  const deleteNodeFromTree = (
    current: TemplateNode,
    targetPath: string
  ): TemplateNode => {
    if (current.children) {
      return {
        ...current,
        children: current.children
          .filter((c) => c.id !== targetPath)
          .map((c) => deleteNodeFromTree(c, targetPath)),
      };
    }
    return current;
  };

  // Handlers
  const handleSelectFile = (path: string, content: string) => {
    setActiveFilePath(path);
    setActiveContent(content);
  };

  const handleChangeContent = (newContent: string) => {
    setActiveContent(newContent);
    if (activeFilePath) {
      setBlueprint((prev) => ({
        ...prev,
        root: updateTreeContent(prev.root, activeFilePath, newContent),
      }));
    }
  };

  const handleAddNode = (
    parentPath: string,
    name: string,
    type: "file" | "directory"
  ) => {
    setBlueprint((prev) => {
      const updatedRoot = addNodeToTree(prev.root, parentPath, name, type);
      if (type === "file") {
        const newFilePath = `${parentPath}/${name}`;
        setActiveFilePath(newFilePath);
        setActiveContent(`// ${name}\n`);
      }
      return { ...prev, root: updatedRoot };
    });
  };

  const handleRenameNode = (targetPath: string, newName: string) => {
    setBlueprint((prev) => ({
      ...prev,
      root: renameNodeInTree(prev.root, targetPath, newName),
    }));
    if (activeFilePath === targetPath) {
      const parentDir = targetPath.substring(0, targetPath.lastIndexOf("/"));
      setActiveFilePath(parentDir ? `${parentDir}/${newName}` : newName);
    }
  };

  const handleDeleteNode = (targetPath: string) => {
    setBlueprint((prev) => ({
      ...prev,
      root: deleteNodeFromTree(prev.root, targetPath),
    }));
    if (activeFilePath === targetPath) {
      setActiveFilePath(null);
      setActiveContent("");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#07090e] overflow-hidden">
      {/* Studio Header Toolbar */}
      <header className="px-4 py-2.5 bg-[#090b10] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-sm sm:text-base font-normal text-white">
                  Blueprint Studio
                </h1>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold">
                  v1.0.0 AST
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans hidden sm:block">
                Visual template designer & registry AST generator
              </p>
            </div>
          </div>

          <div className="h-4 w-px bg-white/10 hidden md:block" />

          {/* Preset Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 hidden lg:inline">
              Load Blueprint:
            </span>
            <select
              value={selectedPreset}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedPreset(val);
                loadPreset(val);
              }}
              className="px-2.5 py-1.5 bg-[#0e131f] border border-white/10 rounded-lg text-xs font-mono text-slate-200 outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="blank">+ Blank Template (Scratch)</option>
              <optgroup label="Programming Languages">
                <option value="lang/go">lang/go (Go Mastery)</option>
                <option value="lang/rust">lang/rust (Rust Systems)</option>
                <option value="lang/python">lang/python (Python)</option>
                <option value="lang/typescript">lang/typescript (TypeScript)</option>
                <option value="lang/javascript">lang/javascript (JavaScript)</option>
                <option value="lang/cpp">lang/cpp (Modern C++)</option>
                <option value="lang/c">lang/c (C Systems)</option>
                <option value="lang/java">lang/java (Java 21)</option>
              </optgroup>
              <optgroup label="Databases & Storage">
                <option value="db/postgres">db/postgres (PostgreSQL)</option>
                <option value="db/redis">db/redis (Redis)</option>
                <option value="db/sql">db/sql (SQL & Relational)</option>
              </optgroup>
              <optgroup label="Operating Systems & Cloud">
                <option value="os/linux">os/linux (Linux Administration)</option>
                <option value="os/macos">os/macos (macOS Darwin)</option>
                <option value="os/windows">os/windows (Windows & PowerShell)</option>
                <option value="cloud/aws">cloud/aws (AWS Cloud)</option>
              </optgroup>
              <optgroup label="DevOps & Tools">
                <option value="tool/docker">tool/docker (Docker)</option>
                <option value="tool/k8s">tool/k8s (Kubernetes CKA)</option>
                <option value="tool/terraform">tool/terraform (Terraform)</option>
                <option value="tool/ansible">tool/ansible (Ansible)</option>
                <option value="tool/git">tool/git (Git)</option>
                <option value="tool/jenkins">tool/jenkins (Jenkins)</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Right Toolbar Controls */}
        <div className="flex items-center gap-2">
          {/* Metadata pill */}
          <button
            onClick={() => setIsMetaModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-slate-300 border border-white/[0.08] transition-colors cursor-pointer"
          >
            <span className="text-slate-500">ID:</span>
            <span className="text-cyan-400 font-bold">{blueprint.id}</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400">v{blueprint.version}</span>
          </button>

          {/* View Mode Switcher (Split vs Tabs) */}
          <div className="hidden sm:flex items-center bg-white/[0.04] p-0.5 rounded-lg border border-white/[0.06] text-xs font-mono">
            <button
              onClick={() => setViewMode("split")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "split"
                  ? "bg-white/10 text-white font-semibold"
                  : "text-slate-500 hover:text-slate-300"
              }`}
              title="Split View (Editor + JSON)"
            >
              <Columns2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("editor")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "editor"
                  ? "bg-white/10 text-white font-semibold"
                  : "text-slate-500 hover:text-slate-300"
              }`}
              title="Editor Only"
            >
              <FileCode className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("json")}
              className={`p-1.5 rounded transition-colors ${
                viewMode === "json"
                  ? "bg-white/10 text-white font-semibold"
                  : "text-slate-500 hover:text-slate-300"
              }`}
              title="JSON AST Only"
            >
              <FileJson className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Workspace Grid */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        {/* Left Column: VS Code File Tree Explorer (3 cols) */}
        <div className="col-span-12 sm:col-span-4 lg:col-span-3 h-full overflow-hidden">
          <FileTreePane
            root={blueprint.root}
            activeFilePath={activeFilePath}
            onSelectFile={handleSelectFile}
            onAddNode={handleAddNode}
            onRenameNode={handleRenameNode}
            onDeleteNode={handleDeleteNode}
          />
        </div>

        {/* Center & Right Column: Editor and JSON Preview */}
        {viewMode === "split" ? (
          <>
            {/* Center: File Content Editor (5 cols) */}
            <div className="hidden sm:block sm:col-span-8 lg:col-span-5 h-full overflow-hidden">
              <EditorPane
                filePath={activeFilePath}
                content={activeContent}
                onChangeContent={handleChangeContent}
              />
            </div>

            {/* Right: Live JSON AST Preview (4 cols) */}
            <div className="hidden lg:block lg:col-span-4 h-full overflow-hidden">
              <JsonPreviewPane
                blueprint={blueprint}
                onOpenMetaModal={() => setIsMetaModalOpen(true)}
              />
            </div>
          </>
        ) : viewMode === "editor" ? (
          <div className="col-span-12 sm:col-span-8 lg:col-span-9 h-full overflow-hidden">
            <EditorPane
              filePath={activeFilePath}
              content={activeContent}
              onChangeContent={handleChangeContent}
            />
          </div>
        ) : (
          <div className="col-span-12 sm:col-span-8 lg:col-span-9 h-full overflow-hidden">
            <JsonPreviewPane
              blueprint={blueprint}
              onOpenMetaModal={() => setIsMetaModalOpen(true)}
            />
          </div>
        )}
      </div>

      {/* Metadata Configuration Modal */}
      <MetadataModal
        blueprint={blueprint}
        isOpen={isMetaModalOpen}
        onClose={() => setIsMetaModalOpen(false)}
        onSave={(updated) => setBlueprint((prev) => ({ ...prev, ...updated }))}
      />
    </div>
  );
}
