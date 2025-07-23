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
         <h1 className="text-4xl font-bold text-gray-600 mb-8 text-center">Sign Up</h1>

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
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
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
                  {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <Button onClick={handleSignUp} className="w-full text-white py-3 hover:brightness-110 transition font-semibold"
            style={{
              background: 'linear-gradient(to right, #46BFFF, #75DEB4)',
            }}
          >
              Sign up
            </Button>

            <Button 
            className="w-full py-3
                text-transparent bg-gradient-to-r from-[#46BFFF] to-[#75DEB4]
                bg-clip-text rounded-lg
                gradient-border
                font-semibold
                hover:brightness-110 hover:opacity-90
                transition">
              Continue with Google
            </Button>
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
