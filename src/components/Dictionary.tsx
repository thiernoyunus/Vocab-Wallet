import React, { useMemo, useState } from "react";
import { Search, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

interface Word {
  english: string;
  arabic: string;
  lessons: number[];
}

export function Dictionary() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const wordIndex = useMemo(() => {
    const index: { [key: string]: Word } = {};
    Object.entries(lessonData).forEach(([lessonId, lesson]) => {
      lesson.words.forEach(word => {
        const key = `${word.english.toLowerCase()}_${word.arabic}`;
        if (!index[key]) {
          index[key] = {
            english: word.english,
            arabic: word.arabic,
            lessons: [parseInt(lessonId)]
          };
        } else {
          if (!index[key].lessons.includes(parseInt(lessonId))) {
            index[key].lessons.push(parseInt(lessonId));
          }
        }
      });
    });
    return index;
  }, []);

  const filteredWords = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase();
    return Object.values(wordIndex).filter(word =>
      word.english.toLowerCase().includes(searchTermLower) || word.arabic.includes(searchTerm)
    );
  }, [searchTerm, wordIndex]);

  const handleLessonClick = (lessonId: number) => {
    navigate(`/lesson/${lessonId}`);
  };

  return (
    <div className="h-full w-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Dictionary</h1>
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search words in English or Arabic..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {searchTerm ? (
          <div className="space-y-4">
            {filteredWords.map((word, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-lg font-medium dark:text-white">{word.english}</span>
                  <span className="text-lg text-gray-600 dark:text-gray-400 text-right rtl">
                    {word.arabic}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {word.lessons.map(lessonId => (
                    <button
                      key={lessonId}
                      onClick={() => handleLessonClick(lessonId)}
                      className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      <Book size={16} className="mr-1" />
                      Lesson {lessonId}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(lessonData).map(([lessonId, lesson]) => (
              <div key={lessonId}>
                <div
                  className="flex items-center space-x-2 mb-3 cursor-pointer"
                  onClick={() => handleLessonClick(parseInt(lessonId))}
                >
                  <Book size={20} className="text-blue-600 dark:text-blue-400" />
                  <h2 className="text-lg font-semibold dark:text-white">{lesson.title}</h2>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  {lesson.words.map((word, index) => (
                    <div key={index} className="p-4 flex justify-between items-center border-b last:border-b-0 border-gray-100 dark:border-gray-700">
                      <span className="text-gray-900 dark:text-white">{word.english}</span>
                      <span className="text-gray-600 dark:text-gray-400 text-right rtl">
                        {word.arabic}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}