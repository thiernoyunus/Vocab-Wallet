import React, { useEffect, useState, useRef } from "react";
import { ChevronLeft, RotateCcw, Circle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { StatsState, defaultStats, updateStats } from "../utils/updateStats";

const lessonData = {
  1: {
    title: "Lesson 1: Salutation التحية",
    words: [{
      english: "Salutation",
      arabic: "تَحِيَّة/تَحِيَّات"
    }, {
      english: "Lesson",
      arabic: "دَرْس/دُرُوس"
    }, {
      english: "First",
      arabic: "أَوَّل/أَوَّلُون"
    }, {
      english: "Brother",
      arabic: "أَخ/إِخْوَة"
    }, {
      english: "Sister",
      arabic: "أُخْت/أَخَوات"
    }, {
      english: "Mosque",
      arabic: "مَسْجِد/مَسَاجِد"
    }, {
      english: "House",
      arabic: "بَيْت/بُيُوت"
    }, {
      english: "You (dual)",
      arabic: "أَنْتُما"
    }, {
      english: "They (dual)",
      arabic: "هُما"
    }, {
      english: "How are you?",
      arabic: "كَيْف حالُك؟"
    }, {
      english: "All praise be to Allah",
      arabic: "الحَمْدُ لِلَّه أَنا بِخَيْر"
    }, {
      english: "Thank you I am fine as well",
      arabic: "شُكْرًا أَنا بِخَيْرٍ أَيْضًا"
    }]
  }
};

export function Review() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const sessionStartRef = useRef(Date.now());

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


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const lessonId = searchParams.get("lesson");
    if (lessonId && lessonData[lessonId]) {
      const lessonWords = lessonData[lessonId].words;
      const reviewCards = lessonWords.map(word => ({
        id: Math.random().toString(36).substr(2, 9),
        question: word.english,
        answer: word.arabic
      }));
      setCards(reviewCards);
    }
  }, [location.search]);

  if (cards.length === 0) {
    return <div className="dark:text-white">Loading...</div>;
  }

  const currentCard = cards[currentCardIndex];
  const cardsRemaining = cards.length - currentCardIndex;
  const progress = (currentCardIndex / cards.length) * 100;

  const handleRating = () => {
    setIsAnswered(true);
    setTimeout(() => {
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(prev => prev + 1);
        setIsFlipped(false);
        setIsAnswered(false);
      } else {
        saveStats(cards.length);
        navigate("/", { replace: true });
      }
    }, 300);
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigate("/")}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex items-center space-x-2">
                {cards.map((_, idx) => (
                  <Circle
                    key={idx}
                    size={8}
                    className={`${
                      idx === currentCardIndex
                        ? "fill-blue-600 text-blue-600"
                        : idx < currentCardIndex
                        ? "fill-gray-300 text-gray-300"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold dark:text-white">Review Session</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {cardsRemaining} remaining
              </p>
            </div>
          </div>
          <div className="h-1 bg-gray-100 dark:bg-gray-700">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>
      <div className="flex-1 p-4 flex flex-col max-w-3xl mx-auto w-full">
        <div
          className={`flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:shadow-md ${
            isFlipped ? "bg-blue-50 dark:bg-blue-900/50" : ""
          }`}
          onClick={() => !isAnswered && setIsFlipped(!isFlipped)}
        >
          <div className="text-center max-w-md">
            {!isFlipped ? (
              <div className="space-y-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">ENGLISH</p>
                <p className="text-2xl font-medium text-gray-900 dark:text-white">
                  {currentCard.question}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tap to reveal answer</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">ARABIC</p>
                <p className="text-2xl font-medium text-gray-900 dark:text-white rtl">
                  {currentCard.answer}
                </p>
                <button
                  className="text-gray-600 dark:text-gray-400 flex items-center text-sm justify-center hover:text-gray-900 dark:hover:text-white transition-colors"
                  onClick={e => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                >
                  <RotateCcw size={16} className="mr-1" />
                  Show English
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-3">
          <button
            onClick={handleRating}
            disabled={!isFlipped || isAnswered}
            className={`p-4 rounded-xl font-medium transition-all duration-200 
              ${
                !isFlipped || isAnswered
                  ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700 text-gray-400"
                  : "bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/70 active:scale-95"
              }`}
          >
            Again
          </button>
          <button
            onClick={handleRating}
            disabled={!isFlipped || isAnswered}
            className={`p-4 rounded-xl font-medium transition-all duration-200
              ${
                !isFlipped || isAnswered
                  ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700 text-gray-400"
                  : "bg-orange-50 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 hover:bg-orange-100  dark:hover:bg-orange-900/70 active:scale-95"
              }`}
          >
            Hard
          </button>
          <button
            onClick={handleRating}
            disabled={!isFlipped || isAnswered}
            className={`p-4 rounded-xl font-medium transition-all duration-200
              ${
                !isFlipped || isAnswered
                  ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700 text-gray-400"
                  : "bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/70 active:scale-95"
              }`}
          >
            Good
          </button>
          <button
            onClick={handleRating}
            disabled={!isFlipped || isAnswered}
            className={`p-4 rounded-xl font-medium transition-all duration-200
              ${
                !isFlipped || isAnswered
                  ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700 text-gray-400"
                  : "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/70 active:scale-95"
              }`}
          >
            Easy
          </button>
        </div>
      </div>
    </div>
  );
}