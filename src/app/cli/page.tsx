import Link from "next/link";
import { Terminal, ArrowRight, BookOpen, Layers, CheckCircle2, ShieldCheck } from "lucide-react";
import { CliReference } from "@/components/CliReference";

export const metadata = {
  title: "CLI Command Reference • Trak CLI",
  description: "Complete command-line manual, flags, and examples for trak init, trak list, and trak version.",
};

export default function CliPage() {
  const commandCards = [
    {
      name: "trak init",
      slug: "init",
      description: "Resolves official or community blueprints from the registry and materializes the workspace on local disk.",
      syntax: "trak init [<author>/]<category>/<tool>[@<version>] [--path <dir>]",
      flags: ["-p, --path <string>", "-h, --help"],
    },
    {
      name: "trak list",
      slug: "list",
      description: "Visualizes the catalog as a formatted ASCII tree graph with module counts and descriptions.",
      syntax: "trak list [category] [-a, --all]",
      flags: ["-c, --category <name>", "-a, --all", "-h, --help"],
    },
    {
      name: "trak version",
      slug: "version",
      description: "Displays CLI version, Go compiler runtime, OS/architecture, and connected registry source.",
      syntax: "trak version",
      flags: ["-h, --help"],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-slate-400 text-xs font-mono font-medium mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>CLI Reference</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-normal text-white tracking-tight">
          Command Line Interface Manual
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed font-sans">
          POSIX-standard commands, Cobra flags, deterministic GitHub Raw blueprint resolution, and local workspace generation.
        </p>
      </div>

      {/* Commands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {commandCards.map((cmd) => (
          <Link
            key={cmd.slug}
            href={`/cli/${cmd.slug}`}
            className="p-5 rounded-xl bg-[#0d0f15] border border-white/[0.08] hover:border-white/[0.18] transition-colors flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white font-mono group-hover:text-slate-200 transition-colors">
                  {cmd.name}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-slate-400 border border-white/[0.06]">
                  Command
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                {cmd.description}
              </p>

              <div className="p-2 rounded-lg bg-black/50 border border-white/[0.06] font-mono text-[11px] text-slate-200 truncate">
                $ {cmd.syntax}
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                  Flags:
                </span>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {cmd.flags.map((f, fIdx) => (
                    <span
                      key={fIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-slate-400 border border-white/[0.06]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs text-slate-300 font-mono font-medium">
              <span>View documentation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Embedded Interactive Reference */}
      <CliReference />
    </div>
  );
}
