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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Category Header */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{categoryInfo.icon}</span>
              <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 border border-white/10 text-emerald-400 font-bold">
                {categoryInfo.id} / pillar
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
              {categoryInfo.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              {categoryInfo.description}
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
              {tracks.length} Blueprints
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-mono text-xs">
              {totalModules} Total Modules
            </span>
          </div>
        </div>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-slate-400">
                  {track.id}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  {track.modulesCount} Modules
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mt-4 group-hover:text-emerald-400 transition-colors">
                {track.name}
              </h3>

              <div className="mt-1.5 text-xs text-emerald-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3 shrink-0" />
                <span>{track.highlight}</span>
              </div>

              <p className="mt-3 text-xs text-slate-400 leading-relaxed line-clamp-3">
                {track.description}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {track.tags.slice(0, 4).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900/90 text-slate-400 border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
              <Link
                href={`/tracks/${track.category}/${track.slug}`}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all"
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
