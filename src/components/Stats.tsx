import React from "react";
import { Calendar, Clock, Zap, Award } from "lucide-react";

export function Stats() {
  return (
    <div className="h-full w-full bg-gray-50 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Your Progress</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <Calendar className="text-purple-600 dark:text-purple-400 mb-2" size={20} />
          <h3 className="font-semibold mb-1 dark:text-white">Today</h3>
          <p className="text-2xl font-bold dark:text-white">15</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">cards reviewed</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <Clock className="text-blue-600 dark:text-blue-400 mb-2" size={20} />
          <h3 className="font-semibold mb-1 dark:text-white">Average</h3>
          <p className="text-2xl font-bold dark:text-white">8.5</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">min/session</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <Zap className="text-yellow-600 dark:text-yellow-400 mb-2" size={20} />
          <h3 className="font-semibold mb-1 dark:text-white">Retention</h3>
          <p className="text-2xl font-bold dark:text-white">85%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">success rate</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <Award className="text-green-600 dark:text-green-400 mb-2" size={20} />
          <h3 className="font-semibold mb-1 dark:text-white">Mastered</h3>
          <p className="text-2xl font-bold dark:text-white">42</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">cards total</p>
        </div>
      </div>
    </div>
  );
}