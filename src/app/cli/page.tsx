import Link from "next/link";
import { Terminal, ShieldCheck, Cpu, HardDrive } from "lucide-react";
import { CliMatrixView } from "@/components/CliMatrixView";

export const metadata = {
  title: "CLI Commands Matrix • Trak CLI",
  description: "Complete command-line manual, POSIX flags, and examples for trak init, trak verify, trak next, trak status, and trak done.",
};

export default function CliPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-3">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>CLI Commands Matrix</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-normal text-white tracking-tight">
          Command Line Interface Reference
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed font-sans">
          POSIX-standard commands, automated test verification, native compiler toolchain detection, and deterministic local workspace generation.
        </p>
      </div>

      {/* Unified Command Matrix */}
      <CliMatrixView />

      {/* Global Flags & Shell Conventions */}
      <div className="rounded-xl p-6 bg-[#0d0f15] border border-white/[0.08] space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Global Flags &amp; Design Guarantees</span>
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed font-sans">
          The following standard flags and behaviors apply uniformly across all Trak subcommands:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-lg bg-[#080a0f] border border-white/[0.04] space-y-1 text-xs">
            <div className="text-emerald-300 font-mono font-bold">-h, --help</div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Prints contextual synopsis, available flags, and real-world examples for any command.
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-[#080a0f] border border-white/[0.04] space-y-1 text-xs">
            <div className="text-emerald-300 font-mono font-bold">trak verify</div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Executes native test suites across 7 languages and automatically syncs progress in trak.json.
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-[#080a0f] border border-white/[0.04] space-y-1 text-xs">
            <div className="text-emerald-300 font-mono font-bold">Exit Codes</div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              Returns <code className="text-slate-300 font-mono">0</code> on success and non-zero on test, validation, or network failures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
