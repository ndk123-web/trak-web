import React from "react";
import { Code2, Cpu, Cloud, Database, Wrench, Layers } from "lucide-react";

interface CategoryIconProps {
  category: "lang" | "os" | "cloud" | "db" | "tool" | "all" | string;
  className?: string;
}

export function CategoryIcon({ category, className = "w-4 h-4" }: CategoryIconProps) {
  switch (category) {
    case "lang":
      return <Code2 className={`${className} text-emerald-400`} />;
    case "os":
      return <Cpu className={`${className} text-emerald-400`} />;
    case "cloud":
      return <Cloud className={`${className} text-emerald-400`} />;
    case "db":
      return <Database className={`${className} text-emerald-400`} />;
    case "tool":
      return <Wrench className={`${className} text-emerald-400`} />;
    case "all":
    default:
      return <Layers className={`${className} text-emerald-400`} />;
  }
}
