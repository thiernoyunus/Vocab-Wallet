import React, { useEffect, useMemo, useState } from "react";
import { Crown, Sparkles, Trophy } from "lucide-react";
import { StatsState, defaultStats } from "../utils/updateStats";

interface Entry {
  name: string;
  points: number;
}

interface RankedEntry extends Entry {
  rank: number;
}

export function Leaderboard() {
  const [entries, setEntries] = useState<RankedEntry[]>([]);

  useEffect(() => {
    const sample: Entry[] = [
      { name: "Aisha", points: 1200 },
      { name: "Omar", points: 900 },
      { name: "Zainab", points: 600 }
    ];

    let stats: StatsState = defaultStats;
    try {
      const stored = localStorage.getItem("stats");
      if (stored) {
        stats = { ...stats, ...(JSON.parse(stored) as Partial<StatsState>) };
      }
    } catch {
      // ignore
    }

    const you: Entry = { name: "You", points: stats.points };
    const list: RankedEntry[] = [...sample, you]
      .sort((a, b) => b.points - a.points)
      .map((entry, index) => ({ ...entry, rank: index + 1 }))
      .slice(0, 10);
    setEntries(list);
  }, []);

  const topThree = useMemo(() => entries.slice(0, 3), [entries]);

  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <header className="px-5 pt-10">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/80">
            <Sparkles size={18} className="text-yellow-200" />
            League standings
          </div>
          <h1 className="mt-4 text-3xl font-bold">Sky League</h1>
          <p className="mt-2 text-sm text-sky-100/80">
            Earn XP to climb above fellow adventurers this week.
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-auto px-5 pb-24">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 py-10">
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {topThree.map(entry => (
              <div
                key={entry.name}
                className={`relative flex flex-col items-center rounded-3xl border border-white/10 bg-white/10 p-6 text-center backdrop-blur ${
                  entry.rank === 1
                    ? "shadow-[0_0_40px_rgba(250,204,21,0.35)]"
                    : "shadow-[0_0_30px_rgba(125,211,252,0.25)]"
                }`}
              >
                <div className="absolute -top-5 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-200 text-slate-900">
                  {entry.rank}
                </div>
                <Crown
                  size={36}
                  className={entry.rank === 1 ? "text-yellow-200" : entry.rank === 2 ? "text-sky-200" : "text-emerald-200"}
                />
                <p className="mt-4 text-lg font-semibold">{entry.name}</p>
                <p className="mt-1 text-sm text-sky-100/80">{entry.points} XP</p>
              </div>
            ))}
          </section>

          <section className="rounded-3xl border border-white/5 bg-white/5 p-4 backdrop-blur">
            <div className="flex items-center gap-2 px-2 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-sky-100/70">
              <Trophy size={18} className="text-yellow-200" />
              All challengers
            </div>
            <div className="divide-y divide-white/5">
              {entries.map(entry => (
                <div key={entry.name} className="flex items-center justify-between px-4 py-4 text-sm">
                  <span className="font-semibold">
                    {entry.rank}. {entry.name}
                  </span>
                  <span className="text-sky-100/80">{entry.points} XP</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
