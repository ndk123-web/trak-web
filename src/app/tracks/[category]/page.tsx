import { notFound } from "next/navigation";
import Link from "next/link";
import { getTracksByCategory, getCategoryInfo, CATEGORIES } from "@/data/tracks";
import { ArrowRight, Terminal, BookOpen, Sparkles, Layers } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.id,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryInfo = getCategoryInfo(category);

  if (!categoryInfo) {
    notFound();
  }

  const tracks = getTracksByCategory(category);
  const totalModules = tracks.reduce((acc, curr) => acc + curr.modulesCount, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Category Header */}
      <div className="rounded-xl p-6 sm:p-8 bg-[#0d0f15] border border-white/[0.08] relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{categoryInfo.icon}</span>
              <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                {categoryInfo.id} / pillar
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-normal text-white tracking-tight">
              {categoryInfo.title}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed font-sans">
              {categoryInfo.description}
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
              {tracks.length} Blueprints
            </span>
            <span className="px-3 py-1 rounded-lg bg-white/[0.02] border border-white/[0.06] text-slate-400 font-mono text-xs">
              {totalModules} Total Modules
            </span>
          </div>
        </div>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="rounded-xl p-5 bg-[#0d0f15] border border-white/[0.08] hover:border-emerald-500/20 transition-colors flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-semibold">
                  {track.id}
                </span>
                <span className="text-[10px] font-mono text-slate-300 font-medium">
                  {track.modulesCount} Modules
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {track.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  {track.highlight}
                </p>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 font-sans">
                {track.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {track.tags.slice(0, 4).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/40 text-slate-400 border border-white/[0.04]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-white/[0.04]">
              <Link
                href={`/tracks/${track.category}/${track.slug}`}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white text-zinc-950 hover:bg-slate-200 font-bold text-xs font-mono transition-colors"
              >
                <span>View Full Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
