"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = () => {
    // Simulate login logic
    router.push("/chat")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Log In</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <Input
                type="email"
                placeholder="Enter Email Here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password Here"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" checked={rememberMe} onCheckedChange={setRememberMe} />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me?
                </label>
              </div>
              <button onClick={() => router.push("/forgot-password")} className="text-sm text-cyan-500 hover:underline">
                Forgot Password?
              </button>
            </div>

            <Button onClick={handleLogin} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3">
              Log in
            </Button>

            <div className="text-center text-gray-500">or</div>

            <Button variant="outline" className="w-full border-gray-300 text-gray-700 py-3 bg-transparent">
              Log in with google
            </Button>

            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <button onClick={() => router.push("/signup")} className="text-cyan-500 hover:underline font-medium">
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="flex-1 bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center p-8">
        <div className="text-center text-white">
          <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center mb-6 mx-auto">
            <div className="text-cyan-500 text-6xl">🤖</div>
          </div>
          <div className="text-cyan-100 font-bold text-lg mb-4">BOTNOI</div>
          <h2 className="text-4xl font-bold mb-4">Botnoi GPT</h2>
          <p className="text-cyan-100 text-lg">Ask Anything. Get Answers. Powered by Botnoi GPT.</p>
          <div className="flex justify-center space-x-2 mt-8">
            <div className="w-8 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-cyan-300 rounded-full"></div>
            <div className="w-2 h-2 bg-cyan-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
