import React from "react";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Review } from "./components/Review";
import { Stats } from "./components/Stats";
import { Settings } from "./components/Settings";
import { Navigation } from "./components/Navigation";
import { LessonDetail } from "./components/LessonDetail";
import { Dictionary } from "./components/Dictionary";
export function App() {
  return <Router>
      <div className="h-screen w-full bg-white flex flex-col">
        <main className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lesson/:id" element={<LessonDetail />} />
            <Route path="/review" element={<Review />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/dictionary" element={<Dictionary />} />
          </Routes>
        </main>
        <Navigation />
      </div>
    </Router>;
}