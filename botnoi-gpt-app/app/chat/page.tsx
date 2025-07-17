"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MessageCircle, Settings, LogOut, MoreHorizontal, Paperclip, Send, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ChatPage() {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<"landing" | "chat" | "settings" | "profile">("landing")
  const [messages, setMessages] = useState([
    { id: 1, text: "How are you doing?", sender: "user" },
    { id: 2, text: "Hi, I'm doing well !", sender: "bot" },
    { id: 3, text: "How are you? All OK !?", sender: "user" },
    { id: 4, text: "All OK !!!!!", sender: "bot" },
    { id: 5, text: "Hi, How are you?", sender: "user" },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [language, setLanguage] = useState("Auto detect")
  const [showSettings, setShowSettings] = useState(false)
  const [profileData, setProfileData] = useState({
    displayName: "",
    profession: "",
    phone: "",
    email: "",
  })

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: newMessage,
          sender: "user",
        },
      ])
      setNewMessage("")
    }
  }

  const Sidebar = () => (
    <div className="w-16 bg-gradient-to-b from-cyan-400 to-blue-500 flex flex-col items-center py-4 space-y-6">
      <button
        onClick={() => setCurrentView("chat")}
        className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-white hover:bg-opacity-30 transition-all"
      >
        <MessageCircle size={20} />
      </button>

      <button
        onClick={() => setShowSettings(true)}
        className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-white hover:bg-opacity-30 transition-all"
      >
        <Settings size={20} />
      </button>

      <button
        onClick={() => setCurrentView("profile")}
        className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-white hover:bg-opacity-30 transition-all font-bold"
      >
        E
      </button>

      <div className="flex-1"></div>

      <button
        onClick={() => router.push("/")}
        className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-white hover:bg-opacity-30 transition-all"
      >
        <LogOut size={20} />
      </button>
      <div className="text-white text-xs">Logout</div>
    </div>
  )

  const ChatLanding = () => (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-24 h-24 bg-cyan-500 rounded-full flex items-center justify-center mb-6 mx-auto">
          <div className="text-white text-3xl">🤖</div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Botnoi GPT</h1>
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-8 h-2 bg-cyan-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      <div className="absolute bottom-4 left-20 right-4 flex items-center space-x-2">
        <Paperclip className="text-gray-400" size={20} />
        <Input
          placeholder="Type your message here..."
          className="flex-1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">
          <Send size={16} />
        </Button>
        <Button size="sm" variant="outline">
          <Mic size={16} />
        </Button>
      </div>
    </div>
  )

  const ChatView = () => (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold">Chat</h2>
          <div className="flex space-x-2">
            <div className="w-6 h-6 border border-gray-300 rounded"></div>
            <div className="w-6 h-6 border border-gray-300 rounded"></div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
              <div className="text-white text-sm">🤖</div>
            </div>
            <span className="font-medium">Botnoi GPT</span>
          </div>
          <MoreHorizontal className="text-gray-400" size={20} />
        </div>
      </div>

      {/* Search */}
      <div className="px-6 py-3 bg-gray-50 border-b">
        <Input placeholder="Search" className="w-full" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === "user" ? "bg-cyan-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white flex items-center space-x-2">
        <Paperclip className="text-gray-400" size={20} />
        <Input
          placeholder="Type your message here..."
          className="flex-1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">
          <Send size={16} />
        </Button>
        <Button size="sm" variant="outline">
          <Mic size={16} />
        </Button>
      </div>
    </div>
  )

  const ProfileView = () => (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-md">
        <div className="flex items-center mb-6">
          <button onClick={() => setCurrentView("landing")} className="mr-4 text-gray-600 hover:text-gray-800">
            ←
          </button>
          <h2 className="text-xl font-semibold">Profile</h2>
        </div>

        <div className="bg-white rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              E
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Display name</label>
            <Input
              placeholder="Enter Display Here"
              value={profileData.displayName}
              onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
            <Input
              placeholder="Enter Profession Here"
              value={profileData.profession}
              onChange={(e) => setProfileData({ ...profileData, profession: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone#</label>
            <Input
              placeholder="Enter Contact No. Here"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Input
                placeholder="Enter Email Here"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">✏️</button>
            </div>
          </div>

          <Button className="w-full bg-black hover:bg-gray-800 text-white">Save Changes</Button>
        </div>
      </div>
    </div>
  )

  const SettingsModal = () =>
    showSettings && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                <div className="text-white text-sm">🤖</div>
              </div>
              <span className="font-medium">Botnoi</span>
            </div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">Setting</h3>
              <Settings size={20} />
              <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-medium">Theme</span>
              <div className="relative">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`w-12 h-6 rounded-full transition-colors ${isDarkMode ? "bg-purple-500" : "bg-green-400"}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      isDarkMode ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center text-xs">
                      {isDarkMode ? "🌙" : "☀️"}
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">Language</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1"
              >
                <option>Auto detect</option>
                <option>English</option>
                <option>ไทย</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    )

  return (
    <div className="h-screen flex">
      <Sidebar />
      {currentView === "landing" && <ChatLanding />}
      {currentView === "chat" && <ChatView />}
      {currentView === "profile" && <ProfileView />}
      <SettingsModal />
    </div>
  )
}
