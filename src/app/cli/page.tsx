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
      description: "Resolves blueprint from registry and materializes full workspace on local disk.",
      syntax: "trak init <category>/<template> [--path <dir>]",
      flags: ["-p, --path <string>", "-h, --help"],
    },
    {
      name: "trak list",
      slug: "list",
      description: "Visualizes the catalog as an interactive ASCII tree graph with colored tags.",
      syntax: "trak list [category] [-a, --all]",
      flags: ["-c, --category <name>", "-a, --all", "-h, --help"],
    },
    {
      name: "trak version",
      slug: "version",
      description: "Displays CLI version, Go runtime, host architecture, and registry Git branch.",
      syntax: "trak version",
      flags: ["-h, --help"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>CLI Reference</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Command Line Interface Manual
        </h1>
        <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl leading-relaxed">
          Trak is built with standard POSIX conventions, Cobra flags, and clear feedback loops.
        </p>
      </div>

      {/* Commands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {commandCards.map((cmd) => (
          <Link
            key={cmd.slug}
            href={`/cli/${cmd.slug}`}
            className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white font-mono group-hover:text-emerald-400 transition-colors">
                  {cmd.name}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-mono text-slate-400">
                  Command
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                {cmd.description}
              </p>

              <div className="mt-4 p-2.5 rounded-lg bg-slate-950 border border-white/5 font-mono text-[11px] text-emerald-400 truncate">
                $ {cmd.syntax}
              </div>

              <div className="mt-4 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                  Key Flags:
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cmd.flags.map((f, fIdx) => (
                    <span
                      key={fIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/5"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-emerald-400 font-mono font-semibold">
              <span>Inspect docs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Embedded Interactive Reference */}
      <CliReference />
    </div>
  );
}
