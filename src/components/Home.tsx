import React from "react";
import { Book, ChevronRight, Clock, Target, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <Target className="text-green-600 dark:text-green-400 mb-2" size={20} />
            <h3 className="font-semibold mb-1 dark:text-white">Streak</h3>
            <p className="text-2xl font-bold dark:text-white">7 days</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
            <Zap className="text-yellow-600 dark:text-yellow-400 mb-2" size={20} />
            <h3 className="font-semibold mb-1 dark:text-white">Mastered</h3>
            <p className="text-2xl font-bold dark:text-white">42</p>
          </div>
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