"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const handleSubmit = () => {
    // Simulate password reset logic
    alert("Password reset link sent to your email!")
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-gray-600 mb-5 text-center">Forget Your Password?</h1>
          <p className="text-gray-600 mb-12 text-center">Enter your email and we will send you a new password</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
            </div>

            <Button onClick={handleSubmit} 
            className="w-full text-white py-3 mt-6 hover:brightness-110 transition font-semibold text-base "
            style={{
              background: 'linear-gradient(to right, #46BFFF, #75DEB4)',
            }}>
              Submit
            </Button>

            <div className="text-center">
              <button onClick={() => router.push("/login")} className="text-gray-600 hover:underline">
                Back To Log In
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
