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

// Get file extension icon details
export function getFileIconDetails(filename: string): { icon: string; color: string } {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  const name = filename.toLowerCase();

  if (name === "dockerfile" || name.startsWith("docker-compose")) {
    return { icon: "🐳", color: "text-blue-400" };
  }
  if (name === "makefile") {
    return { icon: "⚙️", color: "text-slate-400" };
  }
  if (name === "pyproject.toml" || ext === "py") {
    return { icon: "🐍", color: "text-yellow-400" };
  }
  if (ext === "go" || name === "go.mod" || name === "go.sum") {
    return { icon: "🐹", color: "text-cyan-400" };
  }
  if (ext === "rs" || name === "cargo.toml") {
    return { icon: "🦀", color: "text-orange-400" };
  }
  if (ext === "ts" || ext === "tsx") {
    return { icon: "🔷", color: "text-blue-400" };
  }
  if (ext === "js" || ext === "jsx" || ext === "mjs") {
    return { icon: "🟨", color: "text-yellow-400" };
  }
  if (ext === "json") {
    return { icon: "{} ", color: "text-amber-400 font-mono font-bold" };
  }
  if (ext === "md" || ext === "markdown") {
    return { icon: "📝", color: "text-emerald-400" };
  }
  if (ext === "yml" || ext === "yaml") {
    return { icon: "📜", color: "text-rose-400" };
  }
  if (ext === "sql") {
    return { icon: "🗄️", color: "text-indigo-400" };
  }
  if (ext === "sh" || ext === "bash" || ext === "ps1") {
    return { icon: "⚡", color: "text-emerald-400" };
  }
  if (ext === "c" || ext === "h") {
    return { icon: "🇨", color: "text-slate-300" };
  }
  if (ext === "cpp" || ext === "hpp" || ext === "cc") {
    return { icon: "➕", color: "text-blue-400" };
  }
  if (ext === "java") {
    return { icon: "☕", color: "text-amber-500" };
  }

  return { icon: "📄", color: "text-slate-400" };
}
