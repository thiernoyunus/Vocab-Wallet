import { useCallback, useEffect, useMemo, useState } from "react";
import {
  calculateMilestoneProgress,
  getStreakStatus,
  type MilestoneProgress,
  type StreakStatus
} from "../utils/gamification";
import { StatsState, defaultStats } from "../utils/updateStats";

interface UseStatsDataResult {
  stats: StatsState;
  milestoneProgress: MilestoneProgress;
  streakStatus: StreakStatus;
  refresh: () => void;
}

export function useStatsData(): UseStatsDataResult {
  const [stats, setStats] = useState<StatsState>(defaultStats);

  const loadStats = useCallback(() => {
    try {
      const stored = localStorage.getItem("stats");
      if (stored) {
        const parsed: Partial<StatsState> = JSON.parse(stored);
        setStats(prev => ({ ...prev, ...parsed }));
      }
    } catch (error) {
      console.error("Failed to load stats from localStorage", error);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const milestoneProgress = useMemo(
    () => calculateMilestoneProgress(stats),
    [stats]
  );

  const streakStatus = useMemo(() => getStreakStatus(stats), [stats]);

  return {
    stats,
    milestoneProgress,
    streakStatus,
    refresh: loadStats
  };
}
