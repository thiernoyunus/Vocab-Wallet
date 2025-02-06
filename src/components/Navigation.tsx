import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, BarChart2, Settings, BookOpen } from "lucide-react";
export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return <nav className="border-t border-gray-200 bg-white">
      <div className="flex justify-around items-center h-16">
        <button onClick={() => navigate("/")} className={`flex flex-col items-center justify-center w-full h-full ${isActive("/") ? "text-blue-600" : "text-gray-600"}`}>
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button onClick={() => navigate("/dictionary")} className={`flex flex-col items-center justify-center w-full h-full ${isActive("/dictionary") ? "text-blue-600" : "text-gray-600"}`}>
          <BookOpen size={24} />
          <span className="text-xs mt-1">Dictionary</span>
        </button>
        <button onClick={() => navigate("/stats")} className={`flex flex-col items-center justify-center w-full h-full ${isActive("/stats") ? "text-blue-600" : "text-gray-600"}`}>
          <BarChart2 size={24} />
          <span className="text-xs mt-1">Stats</span>
        </button>
        <button onClick={() => navigate("/settings")} className={`flex flex-col items-center justify-center w-full h-full ${isActive("/settings") ? "text-blue-600" : "text-gray-600"}`}>
          <Settings size={24} />
          <span className="text-xs mt-1">Settings</span>
        </button>
      </div>
    </nav>;
}