import React, { useMemo, useState } from "react";
import { Search, BookOpen, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { lessons, lessonContent } from "../utils/lessons";
import { triggerHaptic } from "../utils/haptics";

interface WordIndexItem {
  english: string;
  arabic: string;
  lessons: number[];
}

export function Dictionary() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const wordIndex = useMemo(() => {
    const index = new Map<string, WordIndexItem>();
    lessons.forEach(lesson => {
      const entries = lessonContent[lesson.id] ?? [];
      entries.forEach(word => {
        const key = `${word.english.toLowerCase()}|${word.arabic}`;
        if (!index.has(key)) {
          index.set(key, { english: word.english, arabic: word.arabic, lessons: [lesson.id] });
        } else {
          const current = index.get(key)!;
          if (!current.lessons.includes(lesson.id)) {
            current.lessons.push(lesson.id);
          }
        }
      });
    });
    return Array.from(index.values()).sort((a, b) => a.english.localeCompare(b.english));
  }, []);

  const filteredWords = useMemo(() => {
    const needle = searchTerm.trim().toLowerCase();
    if (!needle) return wordIndex;
    return wordIndex.filter(word =>
      word.english.toLowerCase().includes(needle) || word.arabic.toLowerCase().includes(needle)
    );
  }, [searchTerm, wordIndex]);

  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/90 px-5 py-6 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                triggerHaptic(15);
                navigate("/");
              }}
              className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/80 transition hover:bg-white/15"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <div className="flex items-center gap-2 text-sm text-sky-100/70">
              <BookOpen size={18} className="text-sky-300" />
              {filteredWords.length} entries
            </div>
          </div>
          <div className="relative">
            <Search size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sky-200/60" />
            <input
              type="text"
              placeholder="Search English or Arabic vocabulary"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/10 py-3 pl-12 pr-4 text-sm text-white shadow-inner shadow-slate-900 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto px-5 pb-24">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 py-6">
          {filteredWords.map(word => (
            <div
              key={`${word.english}-${word.arabic}`}
              className="rounded-3xl border border-white/5 bg-white/5 p-5 text-white backdrop-blur transition hover:border-sky-400/60 hover:bg-sky-500/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-sky-100/70">English</p>
                  <p className="mt-2 text-xl font-semibold">{word.english}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.4em] text-sky-100/70">Arabic</p>
                  <p className="mt-2 text-2xl font-semibold rtl">{word.arabic}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-100/80">
                {word.lessons.map(lessonId => {
                  const lesson = lessons.find(item => item.id === lessonId);
                  if (!lesson) return null;
                  return (
                    <button
                      key={`${word.english}-${lessonId}`}
                      onClick={() => {
                        triggerHaptic(10);
                        navigate(`/lesson/${lessonId}`);
                      }}
                      className="rounded-full border border-sky-400/50 bg-sky-500/10 px-4 py-2 text-sky-100 transition hover:bg-sky-400/20"
                    >
                      {lesson.title}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
