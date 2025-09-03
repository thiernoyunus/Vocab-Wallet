import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Play, BookOpen } from "lucide-react";

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

export function LessonDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const lesson = lessonData[id];

  if (!lesson) {
    return <div className="dark:text-white">Lesson not found</div>;
  }

  return (
    <div className="h-full w-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate("/")}
              className="mr-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Back to lessons"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-semibold dark:text-white">{lesson.title}</h1>
          </div>
          <button
            onClick={() => navigate(`/review?lesson=${id}`)}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors mb-3"
          >
            <Play size={20} />
            <span>Start Review</span>
          </button>
          <button
            onClick={() => navigate(`/lesson/${id}/content`)}
            className="w-full bg-green-600 text-white p-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-green-700 transition-colors"
          >
            <BookOpen size={20} />
            <span>Study Content</span>
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
            {lesson.words.map((word, index) => (
              <div key={index} className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700">
                <span className="text-gray-900 dark:text-white">{word.english}</span>
                <span className="text-gray-600 dark:text-gray-400 text-right rtl">
                  {word.arabic}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}