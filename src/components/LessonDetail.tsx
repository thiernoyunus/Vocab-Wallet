import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Flame, Play, Sparkles, Star, Zap } from "lucide-react";
import { lessons, lessonContent } from "../utils/lessons";
import { triggerHaptic } from "../utils/haptics";

export function LessonDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const numericId = Number(id);
  const lesson = lessons.find(item => item.id === numericId);
  const words = lessonContent[numericId];

  if (!lesson || !words) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-950 text-white">
        Lesson not found
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <header className="relative px-5 pt-12 pb-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600/70 via-sky-500/50 to-cyan-400/30 blur-3xl" />
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                triggerHaptic(15);
                navigate("/");
              }}
              className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/15"
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <div className="flex items-center gap-3 rounded-full bg-black/30 px-4 py-2 text-sm font-semibold">
              <Sparkles size={18} className="text-yellow-200" />
              Milestone {lesson.milestone}
            </div>
          </div>

          <div className="rounded-3xl bg-black/30 p-7 shadow-2xl shadow-sky-900/40 backdrop-blur-xl">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-sky-200/80">Lesson {lesson.id}</p>
                <h1 className="mt-2 text-3xl font-bold drop-shadow-sm sm:text-4xl">{lesson.title}</h1>
                <p className="mt-2 max-w-xl text-sm text-sky-100/70">{lesson.description}</p>
              </div>
              <div className="flex gap-3 text-sm">
                <div className="rounded-2xl bg-sky-500/20 px-4 py-3 text-center">
                  <p className="text-xs uppercase text-sky-100/80">Words</p>
                  <p className="mt-1 text-2xl font-bold text-white">{lesson.wordCount}</p>
                </div>
                <div className="rounded-2xl bg-emerald-500/20 px-4 py-3 text-center">
                  <p className="text-xs uppercase text-emerald-100/80">XP</p>
                  <p className="mt-1 text-2xl font-bold text-white">{lesson.xp}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-sky-100/70">
              <span className="flex items-center gap-2">
                <Flame size={16} className="text-orange-200" />
                Earn bonus streak progress
              </span>
              <span className="flex items-center gap-2">
                <Star size={16} className="text-amber-200" />
                Perfect run unlocks a crown
              </span>
            </div>

            <button
              onClick={() => {
                triggerHaptic([20, 40, 20]);
                navigate(`/review?lesson=${lesson.id}`);
              }}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-200 px-7 py-3 text-lg font-semibold text-slate-900 shadow-lg shadow-amber-500/30 transition-transform duration-150 hover:-translate-y-1"
            >
              <Play size={20} />
              Start adventure
              <Zap size={18} className="text-slate-800" />
            </button>
          </div>
        </div>
      </header>

      <main className="relative flex-1 overflow-auto px-5 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_60%)]" />
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-4">
          {words.map((word, index) => (
            <div
              key={`${word.english}-${index}`}
              className="group flex items-center justify-between gap-4 rounded-3xl border border-white/5 bg-white/5 p-5 text-white backdrop-blur transition hover:border-sky-400/60 hover:bg-sky-500/10"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-sky-100/60">English</p>
                <p className="mt-1 text-xl font-semibold text-white">{word.english}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.4em] text-sky-100/60">Arabic</p>
                <p className="mt-1 text-2xl font-semibold text-white rtl">{word.arabic}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
