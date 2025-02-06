import React from "react";
import { Calendar, Clock, Zap, Award } from "lucide-react";
export function Stats() {
  return <div className="h-full w-full bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6">Your Progress</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <Calendar className="text-purple-600 mb-2" size={20} />
          <h3 className="font-semibold mb-1">Today</h3>
          <p className="text-2xl font-bold">15</p>
          <p className="text-sm text-gray-600">cards reviewed</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <Clock className="text-blue-600 mb-2" size={20} />
          <h3 className="font-semibold mb-1">Average</h3>
          <p className="text-2xl font-bold">8.5</p>
          <p className="text-sm text-gray-600">min/session</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <Zap className="text-yellow-600 mb-2" size={20} />
          <h3 className="font-semibold mb-1">Retention</h3>
          <p className="text-2xl font-bold">85%</p>
          <p className="text-sm text-gray-600">success rate</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <Award className="text-green-600 mb-2" size={20} />
          <h3 className="font-semibold mb-1">Mastered</h3>
          <p className="text-2xl font-bold">42</p>
          <p className="text-sm text-gray-600">cards total</p>
        </div>
      </div>
    </div>;
}