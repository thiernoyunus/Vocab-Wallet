import React, { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { StatsState, defaultStats } from "../utils/updateStats";

interface Entry {
  name: string;
  points: number;
}

export function Leaderboard() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const sample: Entry[] = [
      { name: "Aisha", points: 1200 },
      { name: "Omar", points: 900 },
      { name: "Zainab", points: 600 },
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
    const list = [...sample, you].sort((a, b) => b.points - a.points).slice(0, 10);
    setEntries(list);
  }, []);

  return (
    <div className="h-full w-full bg-gray-50 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-6 dark:text-white flex items-center">
        <Trophy className="mr-2" /> Leaderboard
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden">
        {entries.map((e, i) => (
          <div key={i} className="p-4 flex justify-between">
            <span className="font-medium dark:text-white">
              {i + 1}. {e.name}
            </span>
            <span className="dark:text-white">{e.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
