import React from "react";
import { Bell, Moon, Palette, HelpCircle } from "lucide-react";
export function Settings() {
  return <div className="h-full w-full bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-white rounded-xl shadow-sm divide-y">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Bell size={20} className="text-gray-600 mr-3" />
            <span>Notifications</span>
          </div>
          <div className="w-11 h-6 bg-blue-600 rounded-full relative cursor-pointer">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Moon size={20} className="text-gray-600 mr-3" />
            <span>Dark Mode</span>
          </div>
          <div className="w-11 h-6 bg-gray-200 rounded-full relative cursor-pointer">
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Palette size={20} className="text-gray-600 mr-3" />
            <span>Theme</span>
          </div>
          <span className="text-gray-600">Default</span>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <HelpCircle size={20} className="text-gray-600 mr-3" />
            <span>Help & Support</span>
          </div>
        </div>
      </div>
    </div>;
}