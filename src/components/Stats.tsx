import React, { useEffect, useState } from "react";
import { Calendar, Clock, Zap, Award } from "lucide-react";
import { StatsState, defaultStats } from "../utils/updateStats";

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
      </div>
    </div>
  );
}