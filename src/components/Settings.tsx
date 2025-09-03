import React from "react";
import { Bell, Moon, Palette, HelpCircle } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export function Settings() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className="h-full w-full bg-gray-50 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Settings</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Bell size={20} className="text-gray-600 dark:text-gray-400 mr-3" />
            <span className="dark:text-white">Notifications</span>
          </div>
          <div className="w-11 h-6 bg-blue-600 rounded-full relative cursor-pointer">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Moon size={20} className="text-gray-600 dark:text-gray-400 mr-3" />
            <span className="dark:text-white">Dark Mode</span>
          </div>
          <div 
            onClick={toggleDarkMode}
            className={`w-11 h-6 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200'} rounded-full relative cursor-pointer transition-colors`}
            data-testid="dark-mode-toggle"
          >
            <div 
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                isDarkMode ? 'right-1' : 'left-1'
              }`}
            ></div>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Palette size={20} className="text-gray-600 dark:text-gray-400 mr-3" />
            <span className="dark:text-white">Theme</span>
          </div>
          <span className="text-gray-600 dark:text-gray-400">Default</span>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <HelpCircle size={20} className="text-gray-600 dark:text-gray-400 mr-3" />
            <span className="dark:text-white">Help & Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}