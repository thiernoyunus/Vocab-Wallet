import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BookOpen, Home, Settings, Trophy, BarChart2 } from "lucide-react";
import { triggerHaptic } from "../utils/haptics";

const navItems = [
  { label: "Map", icon: Home, path: "/" },
  { label: "Dictionary", icon: BookOpen, path: "/dictionary" },
  { label: "Stats", icon: BarChart2, path: "/stats" },
  { label: "Rank", icon: Trophy, path: "/leaderboard" },
  { label: "Settings", icon: Settings, path: "/settings" }
];

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="border-t border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-3xl items-center justify-around px-4">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => {
                triggerHaptic(15);
                navigate(item.path);
              }}
              className={`flex h-14 w-14 flex-col items-center justify-center rounded-2xl transition-all duration-150 ${
                active
                  ? "bg-gradient-to-br from-sky-500 via-sky-400 to-cyan-400 text-slate-900 shadow-lg shadow-sky-500/30"
                  : "text-sky-100/70 hover:text-white"
              }`}
            >
              <Icon size={22} />
              <span className="mt-1 text-xs font-semibold uppercase tracking-widest">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
