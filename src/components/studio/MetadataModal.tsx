"use client";

import React, { useState } from "react";
import { X, Check, Settings2, Info } from "lucide-react";
import { TemplateBlueprint } from "@/types/studio";

interface MetadataModalProps {
  blueprint: TemplateBlueprint;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Partial<TemplateBlueprint>) => void;
}

export function MetadataModal({
  blueprint,
  isOpen,
  onClose,
  onSave,
}: MetadataModalProps) {
  const parts = blueprint.id.split("/");
  const initialCategory = parts[0] || "lang";
  const initialSlug = parts[1] || "template";

  const [category, setCategory] = useState(initialCategory);
  const [slug, setSlug] = useState(initialSlug);
  const [name, setName] = useState(blueprint.name);
  const [version, setVersion] = useState(blueprint.version);
  const [description, setDescription] = useState(blueprint.description);
  const [rootName, setRootName] = useState(blueprint.root.name);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedId = `${category.trim().toLowerCase()}/${slug.trim().toLowerCase()}`;

    onSave({
      id: updatedId,
      name: name.trim(),
      version: version.trim(),
      description: description.trim(),
      root: {
        ...blueprint.root,
        name: rootName.trim() || `learn-${slug.trim()}`,
      },
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#0c101a] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-serif text-lg font-normal text-white">
              Blueprint Metadata Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
          {/* Category & Slug Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-slate-200 focus:border-emerald-500 outline-none"
              >
                <option value="lang">lang (Languages)</option>
                <option value="os">os (Operating Systems)</option>
                <option value="cloud">cloud (Cloud Providers)</option>
                <option value="db">db (Databases)</option>
                <option value="tool">tool (DevOps Tools)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                Slug (ID)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. zig, postgres"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-slate-200 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Generated ID Badge */}
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Registry Template ID:</span>
            <span className="text-cyan-400 font-bold">
              {category}/{slug || "..."}
            </span>
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-slate-400 mb-1 font-medium">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Zig Systems Programming & Memory"
              required
              className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-slate-200 focus:border-emerald-500 outline-none"
            />
          </div>

          {/* Version & Root Directory Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                Version (SemVer)
              </label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="1.0.0"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-slate-200 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">
                Root Workspace Directory
              </label>
              <input
                type="text"
                value={rootName}
                onChange={(e) => setRootName(e.target.value)}
                placeholder={`learn-${slug || "tool"}`}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-slate-200 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-400 mb-1 font-medium">
              Description / Learning Outcomes
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Comprehensive curriculum covering memory safety, comptime, and systems programming..."
              className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-lg text-slate-200 focus:border-emerald-500 outline-none resize-none font-sans text-xs leading-relaxed"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <Check className="w-4 h-4" />
              <span>Save Metadata</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
