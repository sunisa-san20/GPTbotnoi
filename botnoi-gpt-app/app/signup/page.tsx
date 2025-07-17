"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

export default function SignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  })

  const handleSignUp = () => {
    // Simulate signup logic
    router.push("/chat")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Sign Up</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button onClick={handleSignUp} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3">
              Sign up
            </Button>

            <Button variant="outline" className="w-full border-gray-300 text-gray-700 py-3 bg-transparent">
              Continue with Google
            </Button>
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
