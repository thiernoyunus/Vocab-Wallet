import React, { useEffect, useMemo, useState } from "react";
import { Book, ChevronRight, Clock, Target, Zap, Flame, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatsState, defaultStats } from "../utils/updateStats";
import {
  calculateMilestoneProgress,
  getStreakStatus,
} from "../utils/gamification";

const lessons = [{
  id: 1,
  title: "Lesson 1: Salutation التحية",
  color: "blue",
  wordCount: 12
}, {
  id: 2,
  title: "Lesson 2: Getting to know one another - التعارف",
  color: "green",
  wordCount: 15
}, {
  id: 3,
  title: "Lesson 3: Family الأسرة",
  color: "orange",
  wordCount: 18
}, {
  id: 4,
  title: "Lesson 4: The residence - السكن",
  color: "purple",
  wordCount: 14
}, {
  id: 5,
  title: "Lesson 5: Self introduction- التَّعْرِيفْ بِالنَّفْس",
  color: "blue",
  wordCount: 16
}];

const colorVariants = {
  blue: "bg-blue-50 dark:bg-blue-900/50 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-100",
  green: "bg-green-50 dark:bg-green-900/50 border-green-200 dark:border-green-800 text-green-800 dark:text-green-100",
  orange: "bg-orange-50 dark:bg-orange-900/50 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-100",
  purple: "bg-purple-50 dark:bg-purple-900/50 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-100"
};

export function Home() {
  const navigate = useNavigate();
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

  const milestoneProgress = useMemo(
    () => calculateMilestoneProgress(stats),
    [stats]
  );

  const streakStatus = useMemo(() => getStreakStatus(stats), [stats]);

  return (
    <div className="h-full w-full bg-gray-50 dark:bg-gray-900 overflow-auto">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Welcome back!</h1>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold dark:text-white">Today's Review</h2>
            <Clock className="text-blue-600 dark:text-blue-400" size={20} />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Cards due</p>
              <p className="text-2xl font-bold dark:text-white">15</p>
            </div>
            <button onClick={() => navigate("/review")} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Start Review
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <Flame className="text-orange-500 dark:text-orange-300 mb-2" size={20} />
            <h3 className="font-semibold mb-1 dark:text-white">Current Streak</h3>
            <p className="text-2xl font-bold dark:text-white">
              {stats.currentStreak} {stats.currentStreak === 1 ? "day" : "days"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Longest run: {stats.longestStreak} days
            </p>
            <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-full bg-orange-500 dark:bg-orange-300 rounded-full transition-all"
                style={{ width: `${streakStatus.progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {streakStatus.nextLevel
                ? `${streakStatus.daysToNext} day${
                    streakStatus.daysToNext === 1 ? "" : "s"
                  } until ${streakStatus.nextLevel.title}`
                : "Streak legend! You've unlocked every badge."}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <Star className="text-yellow-500 dark:text-yellow-300 mb-2" size={20} />
            <h3 className="font-semibold mb-1 dark:text-white">Points Earned</h3>
            <p className="text-2xl font-bold dark:text-white">{stats.points}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              +10 for every card you review
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <Zap className="text-purple-500 dark:text-purple-300 mb-2" size={20} />
            <h3 className="font-semibold mb-1 dark:text-white">Cards Reviewed</h3>
            <p className="text-2xl font-bold dark:text-white">{stats.totalCardsReviewed}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Keep going to unlock more milestones
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold dark:text-white">Milestone Journey</h3>
            <Target className="text-green-600 dark:text-green-400" size={20} />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {milestoneProgress.next
              ? `${milestoneProgress.cardsToGo} card${
                  milestoneProgress.cardsToGo === 1 ? "" : "s"
                } to reach ${milestoneProgress.next.title}`
              : "You've conquered every milestone—amazing work!"}
          </p>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${milestoneProgress.progress}%` }}
            />
          </div>
          {milestoneProgress.current && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Last milestone: {milestoneProgress.current.title}
            </p>
          )}
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-xl font-bold mb-2 dark:text-white">Arabic Course</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Select a lesson to start learning
          </p>
          <div className="space-y-3">
            {lessons.map(lesson => (
              <button
                key={lesson.id}
                onClick={() => navigate(`/lesson/${lesson.id}`)}
                className={`w-full p-4 rounded-xl border ${colorVariants[lesson.color]} text-left transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Book className="shrink-0" size={20} />
                    <div>
                      <h2 className="font-semibold">{lesson.title}</h2>
                      <p className="text-sm opacity-75">
                        {lesson.wordCount} words to learn
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}