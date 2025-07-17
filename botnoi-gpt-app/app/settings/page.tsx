"use client"

import { ThemeToggle } from "../../components/theme-toggle"
import { Settings, ArrowLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function SettingsPage() {
  const [language, setLanguage] = useState("Auto detect")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/chat" 
            className="mr-4 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </Link>
          <div className="flex items-center space-x-3">
            <Settings className="w-8 h-8 text-cyan-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              การตั้งค่า
            </h1>
          </div>
        </div>
        
        {/* Settings Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="space-y-8">
            {/* Theme Setting */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  ธีม
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  เปลี่ยนระหว่างโหมดสว่างและโหมดมืด เพื่อประสบการณ์การใช้งานที่ดีขึ้น
                </p>
              </div>
              <div className="ml-4">
                <ThemeToggle />
              </div>
            </div>
            
            {/* Divider */}
            <hr className="border-gray-200 dark:border-gray-600" />
            
            {/* Language Setting */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  ภาษา
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  เลือกภาษาที่ต้องการใช้งานในแอปพลิเคชัน
                </p>
              </div>
              <div className="ml-4">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors min-w-[140px]"
                >
                  <option value="Auto detect">Auto detect</option>
                  <option value="English">English</option>
                  <option value="ไทย">ไทย</option>
                </select>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200 dark:border-gray-600" />

            {/* Additional Settings Placeholder */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  การแจ้งเตือน
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  จัดการการแจ้งเตือนและเสียงแจ้งเตือน
                </p>
              </div>
              <div className="ml-4">
                <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  ตั้งค่า
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="text-white text-xs">ℹ️</div>
            </div>
            <div>
              <h4 className="font-medium text-cyan-900 dark:text-cyan-100 mb-1">
                เกี่ยวกับ GPT Botnoi
              </h4>
              <p className="text-sm text-cyan-700 dark:text-cyan-200">
                แอปพลิเคชัน AI Chat ที่ช่วยให้คุณสนทนากับ AI ได้อย่างสะดวกและรวดเร็ว
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}