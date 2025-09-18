import React, { useContext } from "react";
import { Bell, HelpCircle, Moon, Palette, Sparkles } from "lucide-react";
import { ThemeContext } from "../contexts/ThemeContext";
import { triggerHaptic } from "../utils/haptics";

export function Settings() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      <header className="px-5 pt-10">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-sky-100/80">
            <Sparkles size={18} className="text-sky-300" />
            Personalize your adventure
          </div>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>
      </header>

      <main className="flex-1 overflow-auto px-5 pb-24">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 py-8">
          <div className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">Experience</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-black/30 p-4">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-yellow-200" />
                  <div>
                    <p className="text-sm font-semibold">Notifications</p>
                    <p className="text-xs text-sky-100/70">Stay on track with daily reminders</p>
                  </div>
                </div>
                <div className="h-7 w-12 rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 p-1">
                  <div className="h-full w-5 rounded-full bg-white" />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-black/30 p-4">
                <div className="flex items-center gap-3">
                  <Moon size={20} className="text-purple-200" />
                  <div>
                    <p className="text-sm font-semibold">Dark mode</p>
                    <p className="text-xs text-sky-100/70">Match your device theme</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    triggerHaptic(15);
                    toggleDarkMode();
                  }}
                  data-testid="dark-mode-toggle"
                  className={`flex h-7 w-14 items-center rounded-full border border-white/20 p-1 transition ${
                    isDarkMode ? "bg-sky-400/40" : "bg-black/40"
                  }`}
                >
                  <span
                    className={`h-5 w-5 rounded-full bg-white transition-transform ${
                      isDarkMode ? "translate-x-7" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-black/30 p-4">
                <div className="flex items-center gap-3">
                  <Palette size={20} className="text-emerald-200" />
                  <div>
                    <p className="text-sm font-semibold">Theme</p>
                    <p className="text-xs text-sky-100/70">Skyline gradients</p>
                  </div>
                </div>
                <span className="rounded-full bg-sky-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-100/80">
                  Default
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">Support</h2>
            <button className="mt-4 flex w-full items-center justify-between rounded-2xl bg-black/30 p-4 text-left transition hover:bg-sky-500/10">
              <div className="flex items-center gap-3">
                <HelpCircle size={20} className="text-sky-200" />
                <div>
                  <p className="text-sm font-semibold">Help & Support</p>
                  <p className="text-xs text-sky-100/70">Read tips or contact our team</p>
                </div>
              </div>
              <span className="text-xs uppercase tracking-[0.4em] text-sky-100/70">Coming soon</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
