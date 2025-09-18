import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  Heart,
  PartyPopper,
  Shield,
  Sparkles,
  Trophy,
  Zap
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { StatsState, defaultStats, updateStats } from "../utils/updateStats";
import { lessonContent, lessons } from "../utils/lessons";
import { triggerHaptic } from "../utils/haptics";

interface QuizCard {
  id: string;
  prompt: string;
  options: string[];
  correct: string;
  askForArabic: boolean;
  reference: {
    english: string;
    arabic: string;
  };
}

const HEARTS_MAX = 5;

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function buildOptions(correct: string, pool: string[]): string[] {
  const uniquePool = [...new Set(pool.filter(option => option !== correct))];
  const distractors = shuffle(uniquePool).slice(0, 3);
  return shuffle([correct, ...distractors]);
}

export function Review() {
  const [cards, setCards] = useState<QuizCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [hearts, setHearts] = useState(HEARTS_MAX);
  const [lessonTitle, setLessonTitle] = useState("Review Session");
  const sessionStartRef = useRef(Date.now());
  const navigate = useNavigate();
  const location = useLocation();

  const progress = useMemo(() => {
    if (cards.length === 0) return 0;
    return Math.round((currentIndex / cards.length) * 100);
  }, [cards.length, currentIndex]);

  const currentCard = cards[currentIndex];

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const lessonIdParam = searchParams.get("lesson");
    const defaultLessonId = lessons.find(lesson => lesson.status !== "locked")?.id ?? 1;
    const lessonId = lessonIdParam ? Number(lessonIdParam) : defaultLessonId;
    const words = lessonContent[lessonId];
    const lessonMeta = lessons.find(item => item.id === lessonId);
    if (!words || words.length === 0 || !lessonMeta) {
      setCards([]);
      return;
    }

    setLessonTitle(`${lessonMeta.title} Quiz`);

    const quizCards: QuizCard[] = words.map(word => {
      const askForArabic = Math.random() > 0.5;
      const correctAnswer = askForArabic ? word.arabic : word.english;
      const optionPool = askForArabic
        ? words.map(item => item.arabic)
        : words.map(item => item.english);
      const options = buildOptions(correctAnswer, optionPool);
      return {
        id: `${word.english}-${Math.random().toString(36).slice(2, 6)}`,
        prompt: askForArabic
          ? `Tap the Arabic for "${word.english}"`
          : `Tap the English for "${word.arabic}"`,
        options,
        correct: correctAnswer,
        askForArabic,
        reference: word
      };
    });

    setCards(shuffle(quizCards));
    setCurrentIndex(0);
    setSelectedOption(null);
    setCorrectCount(0);
    setHearts(HEARTS_MAX);
    setShowSummary(false);
    setIsCorrect(null);
  }, [location.search]);

  useEffect(() => {
    if (hearts <= 0 && cards.length > 0) {
      setTimeout(() => setShowSummary(true), 600);
    }
  }, [hearts, cards.length]);

  const saveStats = (cardsReviewed: number) => {
    let stats: StatsState = { ...defaultStats };
    try {
      const stored = localStorage.getItem("stats");
      if (stored) {
        stats = { ...stats, ...(JSON.parse(stored) as Partial<StatsState>) };
      }
    } catch (err) {
      console.error("Failed to read stats from localStorage", err);
    }

    const updated = updateStats(stats, cardsReviewed, sessionStartRef.current);

    try {
      localStorage.setItem("stats", JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save stats to localStorage", err);
    }
  };

  const handleSelect = (option: string) => {
    if (!currentCard || selectedOption) return;

    const correctAnswer = option === currentCard.correct;
    setSelectedOption(option);
    setIsCorrect(correctAnswer);

    if (correctAnswer) {
      triggerHaptic(25);
      setCorrectCount(prev => prev + 1);
    } else {
      triggerHaptic([40, 30, 40]);
      setHearts(prev => Math.max(0, prev - 1));
    }

    const nextIndex = currentIndex + 1;
    const finished = nextIndex >= cards.length;

    setTimeout(() => {
      if (finished || hearts - (correctAnswer ? 0 : 1) <= 0) {
        saveStats(cards.length);
        setShowSummary(true);
        triggerHaptic([20, 20, 60]);
      } else {
        setCurrentIndex(nextIndex);
        setSelectedOption(null);
        setIsCorrect(null);
      }
    }, 1000);
  };

  if (cards.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-950 text-white">
        Loading lesson...
      </div>
    );
  }

  if (showSummary) {
    const xpEarned = correctCount * 10;
    const perfectRun = correctCount === cards.length && hearts > 0;

    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white px-6">
        <div className="w-full max-w-md rounded-3xl bg-white/10 p-8 text-center backdrop-blur-xl shadow-2xl shadow-sky-900/40">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-500/30">
            {perfectRun ? <Trophy size={36} className="text-yellow-200" /> : <Sparkles size={36} className="text-sky-200" />}
          </div>
          <h2 className="mt-6 text-3xl font-bold">{perfectRun ? "Legendary!" : "Great Effort!"}</h2>
          <p className="mt-2 text-sm text-sky-100/80">
            You answered {correctCount} out of {cards.length} correctly.
          </p>
          <div className="mt-6 flex items-center justify-around rounded-2xl bg-black/30 p-4 text-sm">
            <div className="flex flex-col items-center gap-1">
              <Zap className="text-yellow-200" size={22} />
              <span className="text-xs uppercase tracking-[0.3em] text-sky-100/70">XP</span>
              <p className="text-xl font-semibold">+{xpEarned}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Heart className="text-rose-300" size={22} />
              <span className="text-xs uppercase tracking-[0.3em] text-sky-100/70">Hearts</span>
              <p className="text-xl font-semibold">{hearts}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <BadgeCheck className="text-emerald-300" size={22} />
              <span className="text-xs uppercase tracking-[0.3em] text-sky-100/70">Accuracy</span>
              <p className="text-xl font-semibold">{Math.round((correctCount / cards.length) * 100)}%</p>
            </div>
          </div>

          <button
            onClick={() => {
              triggerHaptic(20);
              navigate("/");
            }}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-300 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-sky-500/30 transition-transform duration-150 hover:-translate-y-1"
          >
            Return to map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <header className="px-5 pt-8">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3">
          <button
            onClick={() => {
              triggerHaptic(10);
              navigate("/");
            }}
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur transition hover:bg-white/15"
          >
            <ArrowLeft size={18} />
            Exit
          </button>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <div className="flex items-center gap-2 rounded-full bg-black/30 px-4 py-2">
              <Heart size={18} className="text-rose-300" />
              {hearts}/{HEARTS_MAX}
            </div>
            <div className="flex items-center gap-2 rounded-full bg-black/30 px-4 py-2">
              <BookOpen size={18} className="text-sky-300" />
              {currentIndex + 1}/{cards.length}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-5 h-2 w-full max-w-3xl rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-300 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="flex-1 px-5 py-8">
        <div className="mx-auto flex h-full w-full max-w-3xl flex-col gap-8">
          <div className="rounded-3xl bg-white/5 p-8 text-center shadow-lg shadow-sky-900/40 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.4em] text-sky-200/80">{lessonTitle}</p>
            <h2 className="mt-3 text-3xl font-bold text-white drop-shadow-sm">{currentCard.prompt}</h2>
            <p className="mt-2 text-sm text-sky-100/70">
              {currentCard.askForArabic
                ? `You are matching "${currentCard.reference.english}"`
                : `You are matching "${currentCard.reference.arabic}"`}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {currentCard.options.map(option => {
              const isSelected = selectedOption === option;
              const isAnswer = isCorrect !== null && option === currentCard.correct;

              return (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  disabled={Boolean(selectedOption)}
                  className={`rounded-2xl border border-white/10 bg-white/10 p-5 text-left text-lg font-semibold text-white backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:bg-sky-500/15 focus:outline-none focus:ring-2 focus:ring-sky-300/60 ${
                    selectedOption
                      ? isAnswer
                        ? "border-emerald-400 bg-emerald-500/20"
                        : isSelected
                        ? "border-rose-400 bg-rose-500/20"
                        : "opacity-60"
                      : ""
                  } ${currentCard.askForArabic ? "rtl text-xl" : ""}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {isCorrect !== null && (
            <div
              className={`flex items-center justify-between rounded-2xl border px-6 py-4 text-sm font-semibold shadow-lg ${
                isCorrect
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-100"
                  : "border-rose-400 bg-rose-500/20 text-rose-100"
              }`}
            >
              <div className="flex items-center gap-3">
                {isCorrect ? <PartyPopper size={20} /> : <Shield size={20} />}
                <div>
                  <p>{isCorrect ? "Nice!" : "Almost!"}</p>
                  <p className="text-xs text-white/80">
                    {isCorrect
                      ? "Keep the streak going."
                      : `Correct answer: ${currentCard.correct}`}
                  </p>
                </div>
              </div>
              <span className="text-xs uppercase tracking-[0.4em] text-white/70">
                {currentIndex + 1}/{cards.length}
              </span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
