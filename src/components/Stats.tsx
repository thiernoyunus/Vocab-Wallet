import React, { useEffect, useMemo, useState } from "react";
import {
  Award,
  Calendar,
  Flame,
  Sparkles,
  Target,
  Trophy,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatsState, defaultStats } from "../utils/updateStats";
import {
  MILESTONES,
  STREAK_LEVELS,
  calculateMilestoneProgress,
  getStreakStatus
} from "../utils/gamification";
import { triggerHaptic } from "../utils/haptics";

export function Stats() {
  const [stats, setStats] = useState<StatsState>(defaultStats);
  const navigate = useNavigate();

  useEffect(() => {
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

  const dailyGoal = 20;
  const todayProgress = Math.min((stats.cardsReviewedToday / dailyGoal) * 100, 100);
  const avgDuration = stats.totalSessions ? stats.totalDuration / stats.totalSessions : 0;

  const milestoneProgress = useMemo(
    () => calculateMilestoneProgress(stats),
    [stats]
  );
  const streakStatus = useMemo(() => getStreakStatus(stats), [stats]);

  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/90 px-5 py-6 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
          <button
            onClick={() => {
              triggerHaptic(15);
              navigate("/");
            }}
            className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/80 transition hover:bg-white/15"
          >
            Back
          </button>
          <div className="flex items-center gap-2 text-sm text-sky-100/70">
            <Sparkles size={18} className="text-sky-300" />
            Leveling towards mastery
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto px-5 pb-24">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 py-8">
          <section className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur">
            <h1 className="text-3xl font-bold">Your journey</h1>
            <p className="mt-1 text-sm text-sky-100/70">
              Track your streaks, crowns and XP from every quest you complete.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-black/30 p-5">
                <div className="flex items-center gap-2 text-sm text-sky-200">
                  <Flame size={18} className="text-orange-300" />
                  Current streak
                </div>
                <p className="mt-2 text-3xl font-bold">{stats.currentStreak}d</p>
                <p className="text-xs text-sky-100/70">
                  Longest run {stats.longestStreak}d
                </p>
              </div>
              <div className="rounded-2xl bg-black/30 p-5">
                <div className="flex items-center gap-2 text-sm text-sky-200">
                  <Zap size={18} className="text-yellow-200" />
                  Lifetime XP
                </div>
                <p className="mt-2 text-3xl font-bold">{stats.points}</p>
                <p className="text-xs text-sky-100/70">10 XP per answer</p>
              </div>
              <div className="rounded-2xl bg-black/30 p-5">
                <div className="flex items-center gap-2 text-sm text-sky-200">
                  <Calendar size={18} className="text-emerald-200" />
                  Today
                </div>
                <p className="mt-2 text-3xl font-bold">{stats.cardsReviewedToday}</p>
                <p className="text-xs text-sky-100/70">Cards reviewed</p>
                <div className="mt-3 h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-300"
                    style={{ width: `${todayProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Milestone badges</h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-sky-100/70">
                    Cards conquered
                  </p>
                </div>
                <Award size={28} className="text-amber-200" />
              </div>
              <p className="mt-4 text-sm text-sky-100/80">
                {milestoneProgress.next
                  ? `${milestoneProgress.cardsToGo} more cards to unlock ${milestoneProgress.next.title}`
                  : "Every milestone unlocked—legendary!"}
              </p>
              <div className="mt-4 h-3 rounded-full bg-black/40">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-300"
                  style={{ width: `${milestoneProgress.progress}%` }}
                />
              </div>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {MILESTONES.map(milestone => {
                  const unlocked = stats.totalCardsReviewed >= milestone.threshold;
                  return (
                    <div
                      key={milestone.threshold}
                      className={`rounded-2xl border p-4 transition-all ${
                        unlocked
                          ? "border-emerald-400/60 bg-emerald-500/15"
                          : "border-white/10 bg-black/20"
                      }`}
                    >
                      <p className="text-sm font-semibold">{milestone.title}</p>
                      <p className="mt-1 text-xs text-sky-100/70">{milestone.description}</p>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-100/60">
                        {milestone.threshold} cards
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Streak crowns</h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-sky-100/70">
                    Days in a row
                  </p>
                </div>
                <Trophy size={28} className="text-yellow-200" />
              </div>
              <p className="mt-4 text-sm text-sky-100/80">
                {streakStatus.nextLevel
                  ? `${streakStatus.daysToNext} more day${streakStatus.daysToNext === 1 ? "" : "s"} to earn ${streakStatus.nextLevel.title}`
                  : "Every crown collected—keep the blaze alive!"}
              </p>
              <div className="mt-4 h-3 rounded-full bg-black/40">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300"
                  style={{ width: `${streakStatus.progress}%` }}
                />
              </div>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {STREAK_LEVELS.map(level => {
                  const unlocked = streakStatus.unlockedLevels.some(item => item.days === level.days);
                  const isNext = streakStatus.nextLevel?.days === level.days;

                  return (
                    <div
                      key={level.days}
                      className={`rounded-2xl border p-4 transition-all ${
                        unlocked
                          ? "border-amber-300/60 bg-amber-400/15"
                          : isNext
                          ? "border-sky-400/60 bg-sky-500/15"
                          : "border-white/10 bg-black/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">{level.title}</p>
                        <Target size={18} className={unlocked ? "text-amber-200" : "text-sky-200"} />
                      </div>
                      <p className="mt-1 text-xs text-sky-100/70">{level.description}</p>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-sky-100/60">
                        {level.days} days
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold">Session insights</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-black/30 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-100/70">Sessions</p>
                <p className="mt-2 text-2xl font-semibold">{stats.totalSessions}</p>
              </div>
              <div className="rounded-2xl bg-black/30 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-100/70">Average length</p>
                <p className="mt-2 text-2xl font-semibold">{avgDuration.toFixed(1)}m</p>
              </div>
              <div className="rounded-2xl bg-black/30 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-100/70">Cards total</p>
                <p className="mt-2 text-2xl font-semibold">{stats.totalCardsReviewed}</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
