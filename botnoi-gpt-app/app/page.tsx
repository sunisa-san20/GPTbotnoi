"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"

// Configs
const LOGO_CONFIG = {
  src: "/images/1dc29870acb62356406d35d17d8377bd.png",
  alt: "iBOTNOI - AI Chatbot Assistant Logo",
  width: 160,
  height: 160,
}

const BACKGROUND_CONFIG = {
  src: "/images/freepik__create-a-pattern-with-multiple-small-robot-icons-s__43908.png",
  alt: "Robot pattern background",
}

export default function LandingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleGetStarted = async () => {
    setIsLoading(true)
    try {
      await router.push("/login")
    } catch (error) {
      console.error("Navigation error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden">
      
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full opacity 100"
          style={{
            backgroundImage: `
              linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(230,230,255,0.85)),
              url("${BACKGROUND_CONFIG.src}")
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "400px 300px",
            backgroundPosition: "center",
            animation: "slowMove 60s linear infinite",
          }}
          role="img"
          aria-label={BACKGROUND_CONFIG.alt}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-10 sm:px-6 lg:px-8">
        <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 md:p-12 max-w-4xl w-full flex flex-col-reverse lg:flex-row items-center gap-10">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-44 h-44 rounded-full shadow-xl flex items-center justify-center bg-white overflow-hidden ring-4 ring-cyan-200/30 hover:ring-cyan-400 transition-all">
              <Image
                src={LOGO_CONFIG.src}
                alt={LOGO_CONFIG.alt}
                width={LOGO_CONFIG.width}
                height={LOGO_CONFIG.height}
                className="object-contain hover:scale-105 transition-transform duration-200"
                priority
              />
            </div>
          </div>

          {/* Text and button */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Botnoi GPT
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-8 max-w-md">
              Ask Anything. Get Answers. Powered by Botnoi GPT.
            </p>

            <Button
              onClick={handleGetStarted}
              disabled={isLoading}
              className="bg-black hover:bg-gray-800 disabled:bg-gray-500 text-white px-8 py-3 rounded-lg text-base font-semibold shadow-md transition-all focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              {isLoading ? "Loading..." : "Get Started"}
            </Button>

            {/* Progress dots */}
            <div className="flex space-x-2 mt-6 justify-center lg:justify-start" aria-label="Progress indicator">
              <div className="w-10 h-2 bg-cyan-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation CSS */}
      <style jsx global>{`
        @keyframes slowMove {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 1000px 1000px;
          }
        }
      `}</style>
    </div>
  )
}
