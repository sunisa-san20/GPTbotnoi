"use client"

import {
  MessageCircle,
  Settings,
  LogOut,
  Folder,
  Search,
  Mic,
  Plus,
  Send,
  MoreHorizontal,
  Paperclip,
  X,
  Edit,
} from "lucide-react"
import { useState } from "react"

const BotnaiGPTIcon = () => (
  <div className="w-20 h-20 rounded-full bg-gradient-to-b from-white to-cyan-100 shadow-lg flex items-center justify-center">
    <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center">
      <div className="text-white text-2xl">🤖</div>
    </div>
  </div>
)

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [isChatPanelOpen, setIsChatPanelOpen] = useState(true)
  const [currentView, setCurrentView] = useState<"landing" | "chat" | "profile">("landing")
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

  const handleLogout = () => {
    window.location.href = "/"
  }

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
                <X size={20} />
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
            <input
              type="text"
              placeholder="Enter Display Here"
              value={profileData.displayName}
              onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
            <input
              type="text"
              placeholder="Enter Profession Here"
              value={profileData.profession}
              onChange={(e) => setProfileData({ ...profileData, profession: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone#</label>
            <input
              type="text"
              placeholder="Enter Contact No. Here"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter Email Here"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Edit size={16} />
              </button>
            </div>
          </div>

          <button className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )

  const ChatView = () => (
    <div className="flex-1 bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-base font-semibold text-gray-900">Botnoi GPT</h2>
          <div className="flex space-x-2">
            <div className="w-4 h-4 border border-gray-300 rounded"></div>
            <div className="w-4 h-4 border border-gray-300 rounded"></div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <MoreHorizontal className="w-5 h-5 text-gray-400" />
        </div>
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
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-3">
          <Paperclip className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
          <input
            type="text"
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
          />
          <Mic className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
          <Send className="w-5 h-5 text-cyan-500 cursor-pointer hover:text-cyan-600" onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  )

  const ChatLanding = () => (
    <div className="flex-1 bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
            <div className="text-white text-sm">🤖</div>
          </div>
          <span className="text-base font-medium text-gray-900">Botnoi GPT</span>
        </div>
        <div className="text-sm text-gray-400">•••</div>
      </div>

      {/* Main Chat Content */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-6 p-8">
        <BotnaiGPTIcon />
        <h1 className="text-3xl font-bold text-gray-900">Botnoi GPT</h1>
        <div className="w-16 h-1 bg-cyan-500 rounded-full"></div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-3">
          <Plus className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
          <input
            type="text"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
          />
          <Mic className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
          <Send className="w-5 h-5 text-cyan-500 cursor-pointer hover:text-cyan-600" />
        </div>
      </div>
    </div>
  )

  if (currentView === "profile") {
    return (
      <div className="h-screen bg-gray-50 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-[58px] bg-gradient-to-b from-cyan-400 to-blue-500 flex flex-col items-center py-4 space-y-4">
          <div className="relative">
            <button
              onClick={() => setIsChatPanelOpen(!isChatPanelOpen)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                isChatPanelOpen ? "bg-white/30" : "bg-white/20"
              } hover:bg-white/30`}
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </button>
          </div>

          <button
            onClick={() => setShowSettings(true)}
            className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>

          <div className="flex flex-col items-center space-y-1 mt-auto">
            <button
              onClick={() => setCurrentView("profile")}
              className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/40 transition-colors"
            >
              <span className="text-sm font-bold text-white">E</span>
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>

        <ProfileView />
        <SettingsModal />
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-[58px] bg-gradient-to-b from-cyan-400 to-blue-500 flex flex-col items-center py-4 space-y-4">
        {/* Chat Icon */}
        <div className="relative">
          <button
            onClick={() => setIsChatPanelOpen(!isChatPanelOpen)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
              isChatPanelOpen ? "bg-white/30" : "bg-white/20"
            } hover:bg-white/30`}
            title={isChatPanelOpen ? "Hide chat panel" : "Show chat panel"}
          >
            <MessageCircle className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Settings */}
        <button
          onClick={() => setShowSettings(true)}
          className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors"
        >
          <Settings className="w-5 h-5 text-white" />
        </button>

        {/* Profile */}
        <div className="flex flex-col items-center space-y-1 mt-auto">
          <button
            onClick={() => setCurrentView("profile")}
            className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
          >
            <span className="text-sm font-bold text-white">E</span>
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-white/10 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Chat List Panel */}
      {isChatPanelOpen && (
        <div className="w-[185px] bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out">
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-900">Chat</h2>
              <div className="flex items-center space-x-2">
                <button
                  className="w-4 h-4 text-gray-500 hover:text-cyan-500 transition-colors cursor-pointer"
                  title="Create folder"
                >
                  <Folder className="w-4 h-4" />
                </button>
                <button
                  className="w-4 h-4 text-gray-500 hover:text-cyan-500 transition-colors cursor-pointer"
                  title="Start new chat"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
          </div>

          {/* Chat Item */}
          <div className="p-3">
            <div
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => setCurrentView("chat")}
            >
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="text-white text-sm">🤖</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">Botnoi GPT</div>
                <div className="text-xs text-gray-500 truncate">How are you doing?</div>
              </div>
              <div className="text-xs text-gray-400">•••</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      {currentView === "landing" && <ChatLanding />}
      {currentView === "chat" && <ChatView />}

      <SettingsModal />
    </div>
  )
}
