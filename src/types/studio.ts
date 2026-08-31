import React from "react";

export interface TemplateNode {
  id: string; // Unique internal UI ID (e.g. "path/to/node")
  name: string;
  type: "directory" | "file";
  content?: string;
  children?: TemplateNode[];
}

export interface TemplateBlueprint {
  id: string;
  name: string;
  version: string;
  description: string;
  category?: "lang" | "os" | "cloud" | "db" | "tool";
  root: TemplateNode;
}

// Convert JSON AST Node into internal UI Node (with unique IDs)
export function sanitizeNode(node: any, currentPath: string = ""): TemplateNode {
  const nodePath = currentPath ? `${currentPath}/${node.name}` : node.name || "root";
  const isDir = node.type === "directory";

  return {
    id: nodePath,
    name: node.name || "untitled",
    type: isDir ? "directory" : "file",
    content: isDir ? undefined : node.content || "",
    children: isDir && Array.isArray(node.children)
      ? node.children.map((child: any) => sanitizeNode(child, nodePath))
      : isDir ? [] : undefined,
  };
}

// Convert internal UI Node back into standard clean JSON AST without UI ids
export function serializeNodeToAST(node: TemplateNode): any {
  if (node.type === "directory") {
    return {
      name: node.name,
      type: "directory",
      children: (node.children || []).map((c) => serializeNodeToAST(c)),
    };
  }

  return {
    name: node.name,
    type: "file",
    content: node.content || "",
  };
}

export function serializeBlueprintToJSON(blueprint: TemplateBlueprint): string {
  const cleanAST = {
    id: blueprint.id,
    name: blueprint.name,
    version: blueprint.version,
    description: blueprint.description,
    root: serializeNodeToAST(blueprint.root),
  };

  return JSON.stringify(cleanAST, null, 2);
}

// Authentic VS Code-style File Badge Definition
export interface FileBadge {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export function getFileBadge(filename: string): FileBadge {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  const name = filename.toLowerCase();

  // Docker
  if (name === "dockerfile" || name.startsWith("docker-compose")) {
    return { label: "DK", color: "text-[#38bdf8]", bgColor: "bg-[#0284c7]/20", borderColor: "border-[#0284c7]/40" };
  }
  // Python
  if (name === "pyproject.toml" || ext === "py") {
    return { label: "PY", color: "text-[#fbbf24]", bgColor: "bg-[#3776AB]/20", borderColor: "border-[#3776AB]/40" };
  }
  // Go
  if (ext === "go" || name === "go.mod" || name === "go.sum") {
    return { label: "GO", color: "text-[#00ADD8]", bgColor: "bg-[#00ADD8]/20", borderColor: "border-[#00ADD8]/40" };
  }
  // Rust
  if (ext === "rs" || name === "cargo.toml") {
    return { label: "RS", color: "text-[#DEA584]", bgColor: "bg-[#DEA584]/20", borderColor: "border-[#DEA584]/40" };
  }
  // TypeScript
  if (ext === "ts" || ext === "tsx") {
    return { label: "TS", color: "text-[#60a5fa]", bgColor: "bg-[#3178C6]/20", borderColor: "border-[#3178C6]/40" };
  }
  // JavaScript
  if (ext === "js" || ext === "jsx" || ext === "mjs") {
    return { label: "JS", color: "text-[#fde047]", bgColor: "bg-[#F7DF1E]/20", borderColor: "border-[#F7DF1E]/40" };
  }
  // JSON
  if (ext === "json") {
    return { label: "{}", color: "text-[#f59e0b]", bgColor: "bg-[#f59e0b]/20", borderColor: "border-[#f59e0b]/40" };
  }
  // Markdown
  if (ext === "md" || ext === "markdown") {
    return { label: "MD", color: "text-[#34d399]", bgColor: "bg-[#10b981]/20", borderColor: "border-[#10b981]/40" };
  }
  // YAML / YML
  if (ext === "yml" || ext === "yaml") {
    return { label: "YM", color: "text-[#f43f5e]", bgColor: "bg-[#f43f5e]/20", borderColor: "border-[#f43f5e]/40" };
  }
  // SQL
  if (ext === "sql") {
    return { label: "SQL", color: "text-[#a78bfa]", bgColor: "bg-[#818cf8]/20", borderColor: "border-[#818cf8]/40" };
  }
  // Shell / Scripts
  if (ext === "sh" || ext === "bash" || ext === "ps1") {
    return { label: "SH", color: "text-[#2dd4bf]", bgColor: "bg-[#14b8a6]/20", borderColor: "border-[#14b8a6]/40" };
  }
  // C / H
  if (ext === "c" || ext === "h") {
    return { label: "C", color: "text-[#93c5fd]", bgColor: "bg-[#60a5fa]/20", borderColor: "border-[#60a5fa]/40" };
  }
  // C++ / CC
  if (ext === "cpp" || ext === "hpp" || ext === "cc") {
    return { label: "C++", color: "text-[#60a5fa]", bgColor: "bg-[#00599C]/20", borderColor: "border-[#00599C]/40" };
  }
  // Java
  if (ext === "java") {
    return { label: "JV", color: "text-[#f97316]", bgColor: "bg-[#ED8B00]/20", borderColor: "border-[#ED8B00]/40" };
  }
  // TOML
  if (ext === "toml") {
    return { label: "TO", color: "text-[#e2e8f0]", bgColor: "bg-[#64748b]/20", borderColor: "border-[#64748b]/40" };
  }

  // Default file
  return { label: "FILE", color: "text-slate-400", bgColor: "bg-white/[0.05]", borderColor: "border-white/[0.1]" };
}
