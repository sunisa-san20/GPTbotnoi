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
          <h1 className="text-4xl font-bold text-gray-600 mb-8 text-center">Log In</h1>

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

            <Button onClick={handleLogin} 
            className="w-full text-white py-3 hover:brightness-110 transition font-semibold"
            style={{
              background: 'linear-gradient(to right, #46BFFF, #75DEB4)',
            }}
          >
              Log in
            </Button>

            <div className="text-center text-gray-500">or</div>

            <Button
              className="
                w-full py-3
                text-transparent bg-gradient-to-r from-[#46BFFF] to-[#75DEB4]
                bg-clip-text rounded-lg
                gradient-border
                font-semibold
                hover:brightness-110 hover:opacity-90
                transition
              "
            >
              Log in with Google
            </Button>


            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <button onClick={() => router.push("/signup")} 
              className="text-cyan-500 hover:underline font-medium">
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="flex-1 flex items-center justify-center p-8 m-8 rounded-3xl"
            style={{
          background: 'linear-gradient(to top, #43A5DC, #D2FFFF)'
        }}
      >
        <div className="text-center text-white">
          <div className="w-40 h-40 bg-white rounded-full shadow-lg flex items-center justify-center mb-6 mx-auto">
            
             <img 
                src="logo-botnoi-2.png" 
                alt="Botnoi Logo" 
                className="w-55 h-55 object-contain" 
              />
          </div>
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
