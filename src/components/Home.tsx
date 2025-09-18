import React, { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  BadgeCheck,
  BookOpen,
  ChevronRight,
  Flame,
  Heart,
  Lock,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Swords,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StatsState, defaultStats } from "../utils/updateStats";
import {
  calculateMilestoneProgress,
  getStreakStatus
} from "../utils/gamification";
import { lessons, type LessonStatus } from "../utils/lessons";
import { triggerHaptic } from "../utils/haptics";

const statusStyles: Record<LessonStatus, string> = {
  completed: "from-emerald-500 via-emerald-400 to-green-400 shadow-emerald-500/30",
  current: "from-sky-500 via-sky-400 to-cyan-400 shadow-sky-500/30",
  unlocked: "from-purple-500 via-indigo-400 to-blue-400 shadow-purple-500/30",
  locked: "from-gray-400 via-gray-500 to-slate-600 shadow-gray-500/20"
};

const statusIcons: Record<LessonStatus, LucideIcon> = {
  completed: BadgeCheck,
  current: Sparkles,
  unlocked: Zap,
  locked: Lock
};

export function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<StatsState>(defaultStats);
  const [lockedMessage, setLockedMessage] = useState<string | null>(null);

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

  const handleLessonSelect = (lessonId: number, status: LessonStatus) => {
    if (status === "locked") {
      triggerHaptic([15, 30, 15]);
      setLockedMessage("Complete the previous quest to unlock this stage!");
      setTimeout(() => setLockedMessage(null), 1800);
      return;
    }

    triggerHaptic(30);
    navigate(`/lesson/${lessonId}`);
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-sky-900 via-slate-900 to-slate-950 overflow-auto text-white">
      <div className="max-w-3xl mx-auto px-5 pb-24 pt-10 relative">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-sky-600/60 to-transparent blur-3xl" />
        <div className="relative flex items-center justify-between gap-3">
          <button
            className="flex items-center gap-2 rounded-full bg-sky-500/20 px-4 py-2 text-sm font-semibold backdrop-blur"
            onClick={() => {
              triggerHaptic(20);
              navigate("/stats");
            }}
          >
            <Sparkles size={18} />
            Daily Streak
            <ChevronRight size={16} className="opacity-70" />
          </button>
          <div className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-semibold">
            <Zap size={18} className="text-yellow-300" />
            {stats.points} XP
          </div>
        </div>

        <section className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur shadow-lg shadow-sky-900/20">
            <div className="flex items-center gap-2 text-sm font-medium text-sky-200">
              <Flame size={18} />
              Streak
            </div>
            <p className="mt-2 text-3xl font-bold">{stats.currentStreak}d</p>
            <p className="text-xs text-sky-100/70">
              {streakStatus.nextLevel
                ? `${streakStatus.daysToNext} more day${
                    streakStatus.daysToNext === 1 ? "" : "s"
                  } to reach ${streakStatus.nextLevel.title}`
                : "You are unstoppable!"}
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur shadow-lg shadow-violet-900/20">
            <div className="flex items-center gap-2 text-sm font-medium text-violet-200">
              <Heart size={18} />
              Hearts
            </div>
            <p className="mt-2 text-3xl font-bold">5</p>
            <p className="text-xs text-violet-100/70">Keep them by answering correctly!</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur shadow-lg shadow-emerald-900/20 sm:col-span-1">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-200">
              <Award size={18} />
              Milestone
            </div>
            <p className="mt-2 text-3xl font-bold">{milestoneProgress.current?.title ?? "New"}</p>
            <div className="mt-3 h-2 rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-300"
                style={{ width: `${milestoneProgress.progress}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-emerald-100/70">
              {milestoneProgress.next
                ? `${milestoneProgress.cardsToGo} cards until ${milestoneProgress.next.title}`
                : "Every milestone unlocked!"}
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-3xl bg-black/40 p-6 backdrop-blur-xl shadow-2xl shadow-sky-900/30 border border-white/5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest text-sky-200/80">Daily quest</p>
              <h2 className="mt-1 text-2xl font-bold text-white">Review 10 words to earn bonus XP</h2>
            </div>
            <button
              onClick={() => {
                triggerHaptic(25);
                navigate("/review?lesson=2");
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-300 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-sky-500/30 transition-transform duration-150 hover:-translate-y-0.5"
            >
              Start +15 XP
              <PartyPopper size={18} className="transition-transform group-hover:rotate-12" />
            </button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-sky-100/80">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-300" />
              Mastery boost active
            </div>
            <div className="flex items-center gap-2">
              <Swords size={18} className="text-rose-300" />
              Duel friends after finishing!
            </div>
          </div>
        </section>

        <section className="relative mt-14">
          <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-sky-200/70">Quest path</h2>
          <p className="mt-1 text-sm text-sky-100/70">Complete lessons to light up the trail</p>

          <div className="relative mt-10 pb-16">
            <div className="absolute inset-x-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-sky-500/40 via-sky-400/30 to-transparent" />
            <div className="space-y-16">
              {lessons.map((lesson, index) => {
                const Icon = statusIcons[lesson.status];
                const alignment = index % 2 === 0 ? "items-start" : "items-end";
                const isLocked = lesson.status === "locked";

                return (
                  <div key={lesson.id} className={`relative flex ${alignment}`}>
                    <div
                      className={`absolute left-1/2 top-12 h-16 w-16 -translate-x-1/2 rounded-full border border-white/20 bg-black/60 backdrop-blur`}
                    >
                      <div className="flex h-full items-center justify-center">
                        <span className="text-sm font-semibold text-sky-100">{lesson.milestone}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleLessonSelect(lesson.id, lesson.status)}
                      className={`group relative w-full max-w-[260px] rounded-3xl bg-gradient-to-br p-5 text-left shadow-xl transition-all duration-200 hover:-translate-y-2 ${
                        statusStyles[lesson.status]
                      } ${isLocked ? "opacity-70" : ""}`}
                    >
                      <span className="absolute -top-3 left-5 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/80">
                        {lesson.status === "completed"
                          ? "Completed"
                          : lesson.status === "current"
                          ? "Current"
                          : lesson.status === "unlocked"
                          ? "Ready"
                          : "Locked"}
                      </span>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-bold text-white drop-shadow-sm">{lesson.title}</h3>
                          <p className="mt-1 text-sm text-white/80">
                            {lesson.description}
                          </p>
                        </div>
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white ${
                            isLocked ? "opacity-70" : ""
                          }`}
                        >
                          <Icon size={26} />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm font-semibold text-white/80">
                        <span className="flex items-center gap-2">
                          <BookOpen size={16} />
                          {lesson.wordCount} words
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap size={16} className="text-yellow-200" />
                          {lesson.xp} XP
                        </span>
                      </div>
                      {lesson.status === "current" && (
                        <div className="mt-4 rounded-2xl bg-white/15 p-3 text-sm text-white/90">
                          <p className="font-semibold">Next reward:</p>
                          <p className="mt-1 text-xs uppercase tracking-widest text-white/70">
                            Unlock lightning review & 30 bonus XP
                          </p>
                        </div>
                      )}
                      {isLocked && (
                        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-black/30 p-3 text-xs font-medium text-white/70">
                          <Lock size={16} />
                          Win the previous challenge to unlock
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {lockedMessage && (
          <div className="fixed inset-x-0 bottom-20 mx-auto w-full max-w-sm rounded-2xl bg-black/80 px-5 py-3 text-center text-sm font-semibold text-white backdrop-blur">
            {lockedMessage}
          </div>
        )}
      </div>
    </div>
  );
}
