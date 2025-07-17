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
import { ThemeToggle } from "../../components/theme-toggle"

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
  const [language, setLanguage] = useState("Auto detect")

  // Translation function
  const translations = {
    "Auto detect": {
      theme: "Theme",
      themeDesc: "Switch between light and dark mode",
      language: "Language", 
      languageDesc: "Select your preferred language",
      setting: "Setting"
    },
    "English": {
      theme: "Theme",
      themeDesc: "Switch between light and dark mode",
      language: "Language",
      languageDesc: "Select your preferred language",
      setting: "Settings"
    },
    "ไทย": {
      theme: "ธีม",
      themeDesc: "เปลี่ยนระหว่างโหมดสว่างและโหมดมืด",
      language: "ภาษา",
      languageDesc: "เลือกภาษาที่ต้องการใช้งาน",
      setting: "การตั้งค่า"
    }
  }

  const t = translations[language] || translations["Auto detect"]
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
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                <div className="text-white text-sm">🤖</div>
              </div>
              <span className="font-medium text-gray-900 dark:text-white">Botnoi</span>
            </div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.setting}</h3>
              <Settings size={20} className="text-gray-600 dark:text-gray-300" />
              <button 
                onClick={() => setShowSettings(false)} 
                className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">{t.theme}</span>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.themeDesc}</p>
              </div>
              <ThemeToggle />
            </div>

            <hr className="border-gray-200 dark:border-gray-600" />

            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">{t.language}</span>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.languageDesc}</p>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
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
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
      <div className="max-w-md">
        <div className="flex items-center mb-6">
          <button onClick={() => setCurrentView("landing")} className="mr-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
            ←
          </button>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile</h2>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              E
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Display name</label>
            <input
              type="text"
              placeholder="Enter Display Here"
              value={profileData.displayName}
              onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profession</label>
            <input
              type="text"
              placeholder="Enter Profession Here"
              value={profileData.profession}
              onChange={(e) => setProfileData({ ...profileData, profession: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone#</label>
            <input
              type="text"
              placeholder="Enter Contact No. Here"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter Email Here"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <Edit size={16} />
              </button>
            </div>
          </div>

          <button className="w-full bg-black dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )

  const ChatView = () => (
    <div className="flex-1 bg-white dark:bg-gray-900 flex flex-col transition-colors">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Botnoi GPT</h2>
          <div className="flex space-x-2">
            <div className="w-4 h-4 border border-gray-300 dark:border-gray-600 rounded"></div>
            <div className="w-4 h-4 border border-gray-300 dark:border-gray-600 rounded"></div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <MoreHorizontal className="w-5 h-5 text-gray-400 dark:text-gray-300" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === "user" 
                  ? "bg-cyan-500 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3">
          <Paperclip className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300" />
          <input
            type="text"
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <Mic className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300" />
          <Send className="w-5 h-5 text-cyan-500 cursor-pointer hover:text-cyan-600" onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  )

  const ChatLanding = () => (
    <div className="flex-1 bg-white dark:bg-gray-900 flex flex-col transition-colors">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
            <div className="text-white text-sm">🤖</div>
          </div>
          <span className="text-base font-medium text-gray-900 dark:text-white">Botnoi GPT</span>
        </div>
        <div className="text-sm text-gray-400 dark:text-gray-500">•••</div>
      </div>

      {/* Main Chat Content */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-6 p-8">
        <BotnaiGPTIcon />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Botnoi GPT</h1>
        <div className="w-16 h-1 bg-cyan-500 rounded-full"></div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3">
          <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300" />
          <input
            type="text"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <Mic className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300" />
          <Send className="w-5 h-5 text-cyan-500 cursor-pointer hover:text-cyan-600" />
        </div>
      </div>
    </div>
  )

  if (currentView === "profile") {
    return (
      <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden transition-colors">
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
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden transition-colors">
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
        <div className="w-[185px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out">
          <div className="p-3 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">Chat</h2>
              <div className="flex items-center space-x-2">
                <button
                  className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-cyan-500 transition-colors cursor-pointer"
                  title="Create folder"
                >
                  <Folder className="w-4 h-4" />
                </button>
                <button
                  className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-cyan-500 transition-colors cursor-pointer"
                  title="Start new chat"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
          </div>

          {/* Chat Item */}
          <div className="p-3">
            <div
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              onClick={() => setCurrentView("chat")}
            >
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="text-white text-sm">🤖</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">Botnoi GPT</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">How are you doing?</div>
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500">•••</div>
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
