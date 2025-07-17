"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Robot Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 gap-8 p-8 h-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-cyan-300 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-cyan-300 rounded-full"></div>
                <div className="w-2 h-2 bg-cyan-300 rounded-full ml-1"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center mb-6">
            <div className="text-cyan-500 text-6xl font-bold">
              <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center">
                <div className="text-white text-2xl">🤖</div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-cyan-500 font-bold text-lg mb-2">BOTNOI</div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Botnoi GPT</h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-lg mb-12 text-center max-w-md">
          Ask Anything. Get Answers. Powered by Botnoi GPT.
        </p>

        {/* Get Started Button */}
        <Button
          onClick={() => router.push("/login")}
          className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-medium"
        >
          Get Started
        </Button>

        {/* Progress Dots */}
        <div className="flex space-x-2 mt-12">
          <div className="w-8 h-2 bg-cyan-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
