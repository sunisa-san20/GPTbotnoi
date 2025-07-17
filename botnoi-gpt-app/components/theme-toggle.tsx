"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDarkMode = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
      className={`w-12 h-6 rounded-full transition-colors ${
        isDarkMode ? "bg-purple-500" : "bg-green-400"
      }`}
      aria-label="Toggle theme"
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
          isDarkMode ? "translate-x-6" : "translate-x-0.5"
        }`}
      >
        <div className="w-full h-full flex items-center justify-center text-xs">
          {isDarkMode ? (
            <Moon className="w-3 h-3" />
          ) : (
            <Sun className="w-3 h-3" />
          )}
        </div>
      </div>
    </button>
  )
}