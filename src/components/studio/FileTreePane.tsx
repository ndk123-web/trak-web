"use client";

import React, { useState } from "react";
import {
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Check,
  X,
  FilePlus,
  FolderPlus,
  Edit2,
  Trash2,
  PanelLeftClose,
} from "lucide-react";
import { TemplateNode, getFileBadge } from "@/types/studio";

interface FileTreePaneProps {
  root: TemplateNode;
  activeFilePath: string | null;
  onSelectFile: (path: string, content: string) => void;
  onAddNode: (parentPath: string, name: string, type: "file" | "directory") => void;
  onRenameNode: (nodePath: string, newName: string) => void;
  onDeleteNode: (nodePath: string) => void;
  onCollapse?: () => void;
}

export function FileTreePane({
  root,
  activeFilePath,
  onSelectFile,
  onAddNode,
  onRenameNode,
  onDeleteNode,
  onCollapse,
}: FileTreePaneProps) {
  // Set of expanded folder paths
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set([root.id])
  );

  // Creating state: { parentPath: string, type: "file" | "directory" } | null
  const [creatingIn, setCreatingIn] = useState<{
    parentPath: string;
    type: "file" | "directory";
  } | null>(null);
  const [newItemName, setNewItemName] = useState("");

  // Renaming state: { path: string, currentName: string } | null
  const [renamingPath, setRenamingPath] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const toggleFolder = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const handleStartCreate = (
    parentPath: string,
    type: "file" | "directory",
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setExpandedFolders((prev) => new Set(prev).add(parentPath));
    setCreatingIn({ parentPath, type });
    setNewItemName(type === "file" ? "main.go" : "00-setup");
  };

  const handleConfirmCreate = () => {
    if (!creatingIn || !newItemName.trim()) {
      setCreatingIn(null);
      return;
    }
    onAddNode(creatingIn.parentPath, newItemName.trim(), creatingIn.type);
    setCreatingIn(null);
    setNewItemName("");
  };

  const handleStartRename = (
    path: string,
    currentName: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setRenamingPath(path);
    setRenameValue(currentName);
  };

  const handleConfirmRename = () => {
    if (!renamingPath || !renameValue.trim()) {
      setRenamingPath(null);
      return;
    }
    onRenameNode(renamingPath, renameValue.trim());
    setRenamingPath(null);
    setRenameValue("");
  };

  // Recursive Tree Node Renderer
  const renderNode = (node: TemplateNode, depth: number = 0) => {
    const isDir = node.type === "directory";
    const isExpanded = expandedFolders.has(node.id);
    const isSelected = activeFilePath === node.id;
    const isRenaming = renamingPath === node.id;
    const isCreatingHere = creatingIn?.parentPath === node.id;

    const badge = !isDir ? getFileBadge(node.name) : null;

    return (
      <div key={node.id} className="select-none text-xs">
        {/* Node Row */}
        <div
          onClick={(e) => {
            if (isDir) {
              toggleFolder(node.id, e);
            } else {
              onSelectFile(node.id, node.content || "");
            }
          }}
          style={{ paddingLeft: `${depth * 14 + 10}px` }}
          className={`group flex items-center justify-between py-1.5 pr-2 rounded-md cursor-pointer transition-colors ${
            isSelected
              ? "bg-[#04395e] text-white font-medium shadow-sm"
              : "text-slate-300 hover:bg-white/[0.04] hover:text-white"
          }`}
        >
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            {/* Folder Chevron */}
            {isDir ? (
              <span
                onClick={(e) => toggleFolder(node.id, e)}
                className="p-0.5 text-slate-500 hover:text-slate-300 rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </span>
            ) : (
              <span className="w-3.5 shrink-0" />
            )}

            {/* Folder / File Badge Icon */}
            {isDir ? (
              isExpanded ? (
                <FolderOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              ) : (
                <Folder className="w-3.5 h-3.5 text-amber-500/90 shrink-0" />
              )
            ) : badge ? (
              <span
                className={`text-[9px] font-mono font-black px-1 py-0.2 rounded border shrink-0 leading-none ${badge.bgColor} ${badge.color} ${badge.borderColor}`}
              >
                {badge.label}
              </span>
            ) : null}

            {/* Name / Rename Input */}
            {isRenaming ? (
              <div
                className="flex items-center gap-1 flex-1 mr-1"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleConfirmRename();
                    if (e.key === "Escape") setRenamingPath(null);
                  }}
                  autoFocus
                  className="w-full px-1.5 py-0.5 bg-[#18181b] border border-cyan-500 rounded text-xs text-white font-mono outline-none"
                />
                <button
                  onClick={handleConfirmRename}
                  className="p-0.5 hover:bg-white/10 rounded text-emerald-400"
                >
                  <Check className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setRenamingPath(null)}
                  className="p-0.5 hover:bg-white/10 rounded text-slate-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <span className="truncate font-mono text-[11.5px] leading-tight">
                {node.name}
              </span>
            )}
          </div>

          {/* Action Buttons (Hover) */}
          {!isRenaming && (
            <div className="hidden group-hover:flex items-center gap-0.5 shrink-0 opacity-80 hover:opacity-100">
              {isDir && (
                <>
                  <button
                    onClick={(e) => handleStartCreate(node.id, "file", e)}
                    title="New File"
                    className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    <FilePlus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => handleStartCreate(node.id, "directory", e)}
                    title="New Directory"
                    className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <FolderPlus className="w-3 h-3" />
                  </button>
                </>
              )}
              {node.id !== root.id && (
                <>
                  <button
                    onClick={(e) => handleStartRename(node.id, node.name, e)}
                    title="Rename"
                    className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete '${node.name}'?`)) {
                        onDeleteNode(node.id);
                      }
                    }}
                    title="Delete"
                    className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Inline Input when creating a node inside this directory */}
        {isDir && isExpanded && isCreatingHere && (
          <div
            style={{ paddingLeft: `${(depth + 1) * 14 + 10}px` }}
            className="flex items-center gap-1.5 py-1 pr-2 my-0.5 bg-white/[0.02] rounded"
          >
            {creatingIn.type === "directory" ? (
              <Folder className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            ) : (
              <span className="text-[9px] font-mono font-bold px-1 bg-white/10 text-slate-300 rounded border border-white/20">
                +
              </span>
            )}
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleConfirmCreate();
                if (e.key === "Escape") setCreatingIn(null);
              }}
              placeholder={
                creatingIn.type === "directory" ? "folder-name" : "file.ext"
              }
              autoFocus
              className="flex-1 px-1.5 py-0.5 bg-[#18181b] border border-cyan-500 rounded text-xs text-white font-mono outline-none"
            />
            <button
              onClick={handleConfirmCreate}
              className="p-1 hover:bg-white/10 rounded text-emerald-400"
            >
              <Check className="w-3 h-3" />
            </button>
            <button
              onClick={() => setCreatingIn(null)}
              className="p-1 hover:bg-white/10 rounded text-slate-400"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Child Nodes */}
        {isDir &&
          isExpanded &&
          node.children &&
          node.children.map((child) => renderNode(child, depth + 1))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#11131a] select-none">
      {/* Explorer Header */}
      <div className="px-3 py-2 bg-[#181a20] border-b border-white/[0.06] flex items-center justify-between">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
          Files
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => handleStartCreate(root.id, "file", e)}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-emerald-400 transition-colors"
            title="New File at Root"
          >
            <FilePlus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => handleStartCreate(root.id, "directory", e)}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-cyan-400 transition-colors"
            title="New Folder at Root"
          >
            <FolderPlus className="w-3.5 h-3.5" />
          </button>
          {onCollapse && (
            <button
              onClick={onCollapse}
              className="p-1 rounded hover:bg-white/10 text-slate-500 hover:text-slate-300 transition-colors ml-1"
              title="Collapse Explorer Pane"
            >
              <PanelLeftClose className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Tree Content */}
      <div className="flex-1 overflow-y-auto p-1 space-y-0.5 scrollbar-thin">
        {(!root.children || root.children.length === 0) ? (
          <div className="p-4 text-center text-slate-500 font-mono text-xs space-y-2">
            <p>Empty workspace</p>
            <p className="text-[11px] text-slate-600">
              Click <span className="text-emerald-400">+ File</span> or <span className="text-cyan-400">+ Folder</span> above to create nodes.
            </p>
          </div>
        ) : (
          renderNode(root, 0)
        )}
      </div>

      {/* Explorer Footer summary */}
      <div className="px-3 py-1.5 bg-[#0d0f14] border-t border-white/[0.04] text-[10px] font-mono text-slate-500 flex items-center justify-between">
        <span>Virtual Workspace</span>
        <span>AST v1.0.0</span>
      </div>
    </div>
  );
}
