import React from "react";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Review } from "./components/Review";
import { Stats } from "./components/Stats";
import { Settings } from "./components/Settings";
import { Navigation } from "./components/Navigation";
import { LessonDetail } from "./components/LessonDetail";
import { LessonContent } from "./components/LessonContent";
import { Dictionary } from "./components/Dictionary";
import { Leaderboard } from "./components/Leaderboard";
import { ThemeProvider } from "./contexts/ThemeContext";

export function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="h-screen w-full bg-white dark:bg-gray-900 flex flex-col">
          <main className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lesson/:id" element={<LessonDetail />} />
              <Route path="/lesson/:id/content" element={<LessonContent />} />
              <Route path="/review" element={<Review />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </main>
          <Navigation />
        </div>
      </Router>
    </ThemeProvider>
  );
}