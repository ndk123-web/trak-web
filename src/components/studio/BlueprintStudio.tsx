"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Wrench,
  PanelLeft,
  PanelRight,
  RotateCcw,
  Sparkles,
  Columns2,
  FileCode,
  FileJson,
  Layers,
  FolderTree,
  HelpCircle,
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
import { StudioGuideModal } from "./StudioGuideModal";

// Pure Blank Template (100% Empty Workspace)
const BLANK_TEMPLATE: TemplateBlueprint = {
  id: "lang/mytrack",
  name: "My Custom Learning Track",
  version: "1.0.0",
  description: "Hands-on engineering curriculum with practical exercises and build manifests.",
  root: {
    id: "learn-mytrack",
    name: "learn-mytrack",
    type: "directory",
    children: [],
  },
};

export function BlueprintStudio() {
  const [selectedPreset, setSelectedPreset] = useState<string>("lang/go");
  const [blueprint, setBlueprint] = useState<TemplateBlueprint>(BLANK_TEMPLATE);
  const [activeFilePath, setActiveFilePath] = useState<string | null>(null);
  const [activeContent, setActiveContent] = useState<string>("");
  const [isMetaModalOpen, setIsMetaModalOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isLoadingPreset, setIsLoadingPreset] = useState<boolean>(false);

  // Resizable Panes Dimensions (in pixels)
  const [leftWidth, setLeftWidth] = useState<number>(250); // Explorer width
  const [rightWidth, setRightWidth] = useState<number>(360); // JSON Preview width
  const [isLeftCollapsed, setIsLeftCollapsed] = useState<boolean>(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState<boolean>(false);

  // Dragging state
  const isDraggingLeft = useRef<boolean>(false);
  const isDraggingRight = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load preset JSON
  const loadPreset = async (presetId: string) => {
    if (presetId === "blank") {
      setBlueprint(BLANK_TEMPLATE);
      setActiveFilePath(null);
      setActiveContent("");
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

  // Mouse drag handlers for resizers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();

      if (isDraggingLeft.current) {
        const newLeft = e.clientX - containerRect.left;
        if (newLeft >= 160 && newLeft <= 480) {
          setLeftWidth(newLeft);
        }
      }

      if (isDraggingRight.current) {
        const newRight = containerRect.right - e.clientX;
        if (newRight >= 220 && newRight <= 650) {
          setRightWidth(newRight);
        }
      }
    };

    const handleMouseUp = () => {
      if (isDraggingLeft.current || isDraggingRight.current) {
        isDraggingLeft.current = false;
        isDraggingRight.current = false;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const startDragLeft = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingLeft.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const startDragRight = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRight.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

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
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#11131a] overflow-hidden select-none">
      {/* Studio Header Toolbar */}
      <header className="px-4 py-2 bg-[#181a20] border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Wrench className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-sm font-semibold text-white">
                Blueprint Studio
              </h1>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-bold">
                AST v1.1.0
              </span>
            </div>
          </div>

          <div className="h-4 w-px bg-white/10 hidden md:block" />

          {/* Preset Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 hidden lg:inline">
              Template:
            </span>
            <select
              value={selectedPreset}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedPreset(val);
                loadPreset(val);
              }}
              className="px-2.5 py-1 bg-[#11131a] border border-white/10 rounded-lg text-xs font-mono text-slate-200 outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="blank">+ Blank Template (100% Empty)</option>
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
          {/* Pane Visibility Toggles */}
          <div className="flex items-center gap-1 bg-[#11131a] p-0.5 rounded-lg border border-white/[0.08] text-xs">
            <button
              onClick={() => setIsLeftCollapsed(!isLeftCollapsed)}
              className={`p-1 rounded transition-colors ${
                !isLeftCollapsed
                  ? "bg-white/10 text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
              title="Toggle File Explorer"
            >
              <PanelLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsRightCollapsed(!isRightCollapsed)}
              className={`p-1 rounded transition-colors ${
                !isRightCollapsed
                  ? "bg-white/10 text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
              title="Toggle JSON AST Preview"
            >
              <PanelRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Guide / How It Works Button */}
          <button
            onClick={() => setIsGuideOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 text-xs font-mono font-medium transition-colors cursor-pointer"
            title="Learn how Blueprint Studio works"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Guide</span>
          </button>

          {/* Metadata pill */}
          <button
            onClick={() => setIsMetaModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-slate-300 border border-white/[0.08] transition-colors cursor-pointer"
          >
            <span className="text-slate-500">ID:</span>
            <span className="text-cyan-400 font-bold">{blueprint.id}</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">v{blueprint.version}</span>
          </button>
        </div>
      </header>

      {/* Main Studio Workspace with Resizable Draggable Sliders */}
      <div ref={containerRef} className="flex-1 flex overflow-hidden relative">
        {/* 1. Left Pane: File Tree Explorer */}
        {!isLeftCollapsed && (
          <div
            style={{ width: `${leftWidth}px` }}
            className="h-full shrink-0 overflow-hidden"
          >
            <FileTreePane
              root={blueprint.root}
              activeFilePath={activeFilePath}
              onSelectFile={handleSelectFile}
              onAddNode={handleAddNode}
              onRenameNode={handleRenameNode}
              onDeleteNode={handleDeleteNode}
              onCollapse={() => setIsLeftCollapsed(true)}
            />
          </div>
        )}

        {/* Left Resizer Handle (Draggable Slider) */}
        {!isLeftCollapsed && (
          <div
            onMouseDown={startDragLeft}
            className="w-1 hover:w-1.5 active:w-1.5 bg-white/[0.06] hover:bg-cyan-500 active:bg-cyan-500 cursor-col-resize shrink-0 transition-colors z-10 select-none"
            title="Drag to resize Explorer width"
          />
        )}

        {/* 2. Center Pane: VS Code Editor */}
        <div className="flex-1 h-full overflow-hidden min-w-[280px]">
          <EditorPane
            filePath={activeFilePath}
            content={activeContent}
            onChangeContent={handleChangeContent}
          />
        </div>

        {/* Right Resizer Handle (Draggable Slider) */}
        {!isRightCollapsed && (
          <div
            onMouseDown={startDragRight}
            className="w-1 hover:w-1.5 active:w-1.5 bg-white/[0.06] hover:bg-emerald-500 active:bg-emerald-500 cursor-col-resize shrink-0 transition-colors z-10 select-none"
            title="Drag to resize JSON preview width"
          />
        )}

        {/* 3. Right Pane: Live VS Code JSON AST Preview */}
        {!isRightCollapsed && (
          <div
            style={{ width: `${rightWidth}px` }}
            className="h-full shrink-0 overflow-hidden"
          >
            <JsonPreviewPane
              blueprint={blueprint}
              onOpenMetaModal={() => setIsMetaModalOpen(true)}
              onCollapse={() => setIsRightCollapsed(true)}
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

      {/* Studio Guide & Explanation Modal */}
      <StudioGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
