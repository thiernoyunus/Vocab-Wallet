import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Clock,
  Zap,
  Award,
  Trophy,
  Flag,
  Flame,
  Target,
} from "lucide-react";
import { StatsState, defaultStats } from "../utils/updateStats";
import {
  MILESTONES,
  STREAK_LEVELS,
  calculateMilestoneProgress,
  getStreakStatus,
} from "../utils/gamification";

export function Stats() {
  const [stats, setStats] = useState<StatsState>(defaultStats);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("stats");
      if (stored) {
        const parsed: Partial<StatsState> = JSON.parse(stored);
        setStats(prev => ({ ...prev, ...parsed }));
      }
    } catch (err) {
      console.error("Failed to load stats from localStorage", err);
    }
  }, []);

  const dailyGoal = 20;
  const todayProgress = Math.min(
    (stats.cardsReviewedToday / dailyGoal) * 100,
    100
  );
  const avgDuration = stats.totalSessions
    ? stats.totalDuration / stats.totalSessions
    : 0;

  const milestoneProgress = useMemo(
    () => calculateMilestoneProgress(stats),
    [stats]
  );
  const streakStatus = useMemo(() => getStreakStatus(stats), [stats]);

  return (
    <div className="h-full w-full bg-gray-50 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Your Progress</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <Calendar className="text-purple-600 dark:text-purple-400 mb-2" size={20} />
          <h3 className="font-semibold mb-1 dark:text-white">Today</h3>
          <p className="text-2xl font-bold dark:text-white">{stats.cardsReviewedToday}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">cards reviewed</p>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-purple-600 rounded-full transition-all"
              style={{ width: `${todayProgress}%` }}
            />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <Clock className="text-blue-600 dark:text-blue-400 mb-2" size={20} />
          <h3 className="font-semibold mb-1 dark:text-white">Average Session</h3>
          <p className="text-2xl font-bold dark:text-white">{avgDuration.toFixed(1)}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">min/session</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <Zap className="text-yellow-600 dark:text-yellow-400 mb-2" size={20} />
          <h3 className="font-semibold mb-1 dark:text-white">Streak</h3>
          <p className="text-2xl font-bold dark:text-white">{stats.currentStreak} days</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Longest {stats.longestStreak}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <Award className="text-green-600 dark:text-green-400 mb-2" size={20} />
          <h3 className="font-semibold mb-1 dark:text-white">Total Reviewed</h3>
          <p className="text-2xl font-bold dark:text-white">{stats.totalCardsReviewed}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">cards</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <Trophy className="text-pink-600 dark:text-pink-400 mb-2" size={20} />
          <h3 className="font-semibold mb-1 dark:text-white">Points</h3>
          <p className="text-2xl font-bold dark:text-white">{stats.points}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold dark:text-white">
              Milestone Journey
            </h2>
            <Flag className="text-green-600 dark:text-green-400" size={20} />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {milestoneProgress.next
              ? `${milestoneProgress.cardsToGo} card${
                  milestoneProgress.cardsToGo === 1 ? "" : "s"
                } to reach ${milestoneProgress.next.title}`
              : "You've reached every milestone—time to set your own!"}
          </p>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${milestoneProgress.progress}%` }}
            />
          </div>
          {milestoneProgress.current && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Latest badge: {milestoneProgress.current.title}
            </p>
          )}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MILESTONES.map(milestone => {
              const unlocked = stats.totalCardsReviewed >= milestone.threshold;
              return (
                <div
                  key={milestone.threshold}
                  className={`rounded-xl border p-3 transition-all ${
                    unlocked
                      ? "bg-green-50 dark:bg-green-900/40 border-green-200 dark:border-green-700"
                      : "bg-gray-50 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <p className="text-sm font-semibold dark:text-white">
                    {milestone.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {milestone.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 font-medium">
                    {milestone.threshold} cards
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold dark:text-white">
              Streak Badges
            </h2>
            <Flame className="text-orange-500 dark:text-orange-300" size={20} />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {streakStatus.nextLevel
              ? `${streakStatus.daysToNext} day${
                  streakStatus.daysToNext === 1 ? "" : "s"
                } to unlock ${streakStatus.nextLevel.title}`
              : "You've unlocked every streak badge—keep the fire burning!"}
          </p>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-orange-500 dark:bg-orange-300 rounded-full transition-all"
              style={{ width: `${streakStatus.progress}%` }}
            />
          </div>
          {streakStatus.currentLevel && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Current badge: {streakStatus.currentLevel.title}
            </p>
          )}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {STREAK_LEVELS.map(level => {
              const unlocked = streakStatus.unlockedLevels.some(
                unlockedLevel => unlockedLevel.days === level.days
              );
              const isNext = streakStatus.nextLevel?.days === level.days;

              return (
                <div
                  key={level.days}
                  className={`rounded-xl border p-3 transition-all ${
                    unlocked
                      ? "bg-orange-50 dark:bg-orange-900/40 border-orange-200 dark:border-orange-700"
                      : isNext
                      ? "bg-blue-50 dark:bg-blue-900/40 border-blue-200 dark:border-blue-700"
                      : "bg-gray-50 dark:bg-gray-900/40 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold dark:text-white">
                      {level.title}
                    </p>
                    {unlocked ? (
                      <Zap
                        size={16}
                        className="text-orange-500 dark:text-orange-300"
                      />
                    ) : (
                      <Target
                        size={16}
                        className="text-blue-500 dark:text-blue-300"
                      />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {level.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 font-medium">
                    {level.days} day streak
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}