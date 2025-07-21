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
  MoreVertical,
} from "lucide-react"

import { useState } from "react"

// หน้า get start
const BotnaiGPTIcon = () => (
  <div className="w-20 h-20 rounded-full bg-gradient-to-b from-white to-cyan-100 shadow-lg flex items-center justify-center">
    <div className="w-12 h-12 bg-white rounded-full overflow-hidden">
      <img src="/botnoi_logo.jpg" alt="Botnoi Logo" className="w-full h-full object-cover" />
    </div>
  </div>
)
interface Message {
  id: number
  text: string
  sender: "user" | "bot"
}

interface Chat {
  id: string
  name: string
  messages: Message[]
}

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [isChatPanelOpen, setIsChatPanelOpen] = useState(true)
  const [currentView, setCurrentView] = useState<"landing" | "chat" | "profile" | "folder" | "History">("landing")
  const [messages, setMessages] = useState<{ id: number, text: string, sender: "user" | "bot" }[]>([])
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

  // เพิ่ม State สำหรับควบคุมไมโครโฟนและปุ่มแนบไฟล์
  const [isRecording, setIsRecording] = useState(false)
  const [showAttachOptions, setShowAttachOptions] = useState(false)

  // เพิ่ม State สำหรับจัดการ Chat
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null)

  // เพิ่มฟังก์ชันจัดการแชท
  const handleNewChat = () => {
  const newChat: { id: string, name: string, messages: { id: number, text: string, sender: "user" | "bot" }[] } = {
  id: Date.now().toString(),
  name: "New Chat",
  messages: [],
}
  setChats((prev) => [newChat, ...prev])
  setSelectedChatId(newChat.id)
  setCurrentView("landing")  // กลับไปหน้า landing
  setIsNewChat(true)         // ระบุว่าเริ่มแชทใหม่
}

const handleRename = (id: string) => {
  const newName = prompt("Enter new chat name:")
  if (newName) {
    setChats((prev) =>
      prev.map((chat) => (chat.id === id ? { ...chat, name: newName } : chat))
    )
  }
  setDropdownOpenId(null)
}

const handleDelete = (id: string) => {
  setChats((prev) => prev.filter((chat) => chat.id !== id))
  if (selectedChatId === id) setSelectedChatId(null)
  setDropdownOpenId(null)
}

const handlePin = (id: string) => {
  const pinned = chats.find((c) => c.id === id)
  if (!pinned) return
  const rest = chats.filter((c) => c.id !== id)
  setChats([pinned, ...rest])
  setDropdownOpenId(null)
}

const handleSaveToFolder = (id: string) => {
  alert("Save to folder: " + id)
  setDropdownOpenId(null)
}

// สำหรับหน้า Folder
const [folders, setFolders] = useState<string[]>(["Work", "Personal"])
const [folderSearch, setFolderSearch] = useState("")
const handleAddFolder = () => {
  const name = prompt("Enter new folder name:")
  if (name && !folders.includes(name)) {
    setFolders((prev) => [...prev, name])
  }
}
// ตรวจสอบว่าแชทที่เลือกคือ new chat
const [isNewChat, setIsNewChat] = useState(false)
  // ส่งข้อความและตอบกลับ***จำลอง***
  const handleSendMessage = () => {
  if (newMessage.trim()) {
    const id = messages.length + 1
    setMessages([
      ...messages,
      { id, text: newMessage, sender: "user" },
      { id: id + 1, text: "🤖 ตอบกลับจากบอท (จำลอง)", sender: "bot" },
    ])
    setNewMessage("")
  }
}

// แนบไฟล์
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (file) {
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, text: `📎 แนบไฟล์: ${file.name}`, sender: "user" },
    ])
  }
  setShowAttachOptions(false)
}

// สำหรับพูด/หยุดพูด
const handleToggleMic = () => {
  if (!isRecording) {
    setIsRecording(true)
    alert("🎙️ เริ่มบันทึกเสียงแล้ว")
  } else {
    setIsRecording(false)
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, text: "🗣️ ข้อความจากเสียง (จำลอง)", sender: "user" },
      { id: prev.length + 2, text: "🤖 ตอบกลับจากเสียง (จำลอง)", sender: "bot" },
    ])
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
              <div className="w-12 h-12 bg-white rounded-full overflow-hidden">
                <img src="/botnoi_logo.jpg" alt="Botnoi Logo" className="w-full h-full object-cover" />
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
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-full overflow-hidden">
            <img src="/botnoi_logo.jpg" alt="Botnoi Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-base font-medium text-gray-900">Botnoi GPT</span>
        </div>

        {/* เมนูจุด 3 จุด */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpenId(dropdownOpenId === "chat-menu" ? null : "chat-menu")}
            className="p-1 rounded hover:bg-gray-100"
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>

          {dropdownOpenId === "chat-menu" && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow z-10">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Archive</button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => setCurrentView("History")}
              >
                History
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => alert("Link copied!")}
              >
                Share
              </button>
            </div>
          )}
        </div>
      </div>

      {/* แสดงสถานะจุด */}
      <div className="flex space-x-2 px-4 py-1">
        <div className="w-4 h-4 border border-gray-300 rounded"></div>
        <div className="w-4 h-4 border border-gray-300 rounded"></div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
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
          <div className="relative">
            <button onClick={() => setShowAttachOptions(!showAttachOptions)}>
              <Plus className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
            </button>
            {showAttachOptions && (
              <div className="absolute bottom-10 left-0 w-36 bg-white border rounded shadow-md z-10">
                <label className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  📎 แนบไฟล์
                  <input type="file" className="hidden" onChange={handleFileUpload} />
                </label>
                <label className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  🖼️ แนบรูปภาพ
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>
            )}
          </div>

          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="พิมพ์ข้อความ..."
            className="flex-1 px-3 py-2 bg-transparent border-none outline-none"
          />

          <button onClick={handleToggleMic}>
            <Mic className={`w-5 h-5 ${isRecording ? "text-red-500" : "text-gray-500"}`} />
          </button>

          <button onClick={handleSendMessage}>
            <Send className="w-5 h-5 text-cyan-500 cursor-pointer hover:text-cyan-600" />
          </button>
        </div>
      </div>
    </div>
  )
  const ChatLanding = () => (
  <div className="flex-1 bg-white flex flex-col">
    {/* Header */}
    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-white rounded-full overflow-hidden">
          <img src="/botnoi_logo.jpg" alt="Botnoi Logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-base font-medium text-gray-900">Botnoi GPT</span>
      </div>
      <MoreVertical className="w-5 h-5 text-gray-400" />
    </div>

    {/* Main Chat Content */}
    <div className="flex-1 flex flex-col items-center justify-center space-y-6 p-8">
      <div className="w-24 h-24 rounded-full shadow-lg overflow-hidden">
        <img src="/botnoi_logo.jpg" alt="Botnoi Logo" className="w-full h-full object-cover" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">Botnoi GPT</h1>
      <div className="w-16 h-1 bg-cyan-500 rounded-full"></div>

      {/* แสดงข้อความเมื่อเริ่ม New Chat */}
      {isNewChat && (
        <p className="text-gray-500 text-sm mt-4">
          เริ่มต้นการแชทใหม่กับ Botnoi GPT
        </p>
      )}
    </div>

    {/* Input Area */}
    <div className="p-4 border-t border-gray-100">
      <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-3">
        <div className="relative">
          <button onClick={() => setShowAttachOptions(!showAttachOptions)}>
            <Plus className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
          </button>
          {showAttachOptions && (
            <div className="absolute bottom-10 left-0 w-36 bg-white border rounded shadow-md z-10">
              <label className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                📎 แนบไฟล์
                <input type="file" className="hidden" onChange={handleFileUpload} />
              </label>
              <label className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                🖼️ แนบรูปภาพ
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
          )}
        </div>

        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="พิมพ์ข้อความ..."
          className="flex-1 px-3 py-2 bg-transparent border-none outline-none"
        />

        <button onClick={handleToggleMic}>
          <Mic className={`w-5 h-5 ${isRecording ? "text-red-500" : "text-gray-500"}`} />
        </button>

        <button onClick={handleSendMessage}>
          <Send className="w-5 h-5 text-cyan-500 cursor-pointer hover:text-cyan-600" />
        </button>
      </div>
    </div>
  </div>
)

  // Sidebar หน้า Profile
  if (currentView === "profile") {
    return (
      <div className="h-screen bg-gray-50 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-[58px] bg-gradient-to-b from-cyan-400 to-blue-500 flex flex-col items-center py-4 space-y-4">
          {/* Chat */}
          <div className="flex flex-col items-center cursor-pointer">
            <button
              onClick={() => setCurrentView("landing")}
              className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </button>
            <span className="text-xs text-white mt-1 select-none">Chat</span>
          </div>

          {/* Folder */}
          <div className="flex flex-col items-center cursor-pointer">
            <button
              onClick={() => setCurrentView("folder")}
              className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Folder className="w-5 h-5 text-white" />
            </button>
            <span className="text-xs text-white mt-1 select-none">Folder</span>
          </div>

          {/* Settings */}
          <div className="flex flex-col items-center cursor-pointer">
            <button
              onClick={() => setShowSettings(true)}
              className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
            <span className="text-xs text-white mt-1 select-none">Setting</span>
          </div>

          {/* Profile */}
          <div className="flex flex-col items-center space-y-1 mt-auto cursor-pointer">
            <button
              onClick={() => setCurrentView("profile")}
              className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center hover:bg-white/40 transition-colors"
            >
              <span className="text-sm font-bold text-white">
                {profileData.displayName ? profileData.displayName[0].toUpperCase() : "U"}
              </span>
            </button>
            <span className="text-xs text-white truncate max-w-[48px] text-center select-none">
              {profileData.displayName || "User"}
            </span>
          </div>

          {/* Logout */}
          <div className="flex flex-col items-center cursor-pointer" title="Logout">
            <button
              onClick={handleLogout}
              className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>
            <span className="text-xs text-white mt-1 select-none">Logout</span>
          </div>
        </div>
        
        {/* เนื้อหาในหน้า Profile */}
        {/* Profile Form */}
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
                  {profileData.displayName ? profileData.displayName[0].toUpperCase() : "U"}
                </div>
              </div>

              {/* Display Name */}
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

              {/* Profession */}
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

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  placeholder="Enter Contact No. Here"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <button className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <SettingsModal />
      </div>
    )
  }


  // หน้า chat ตรง Sidebar
  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
    {/* Sidebar */}
    <div className="w-[58px] bg-gradient-to-b from-cyan-400 to-blue-500 flex flex-col items-center py-4 space-y-4">
      {/* Chat Icon */}
      <div className="flex flex-col items-center cursor-pointer" title={isChatPanelOpen ? "Hide chat panel" : "Show chat panel"}>
        <button
          onClick={() => setIsChatPanelOpen(!isChatPanelOpen)}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            isChatPanelOpen ? "bg-white/30" : "bg-white/20"
          } hover:bg-white/30`}
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </button>
        <span className="text-xs text-white mt-1 select-none">Chat</span>
      </div>

      {/* Folder */}
      <div className="flex flex-col items-center cursor-pointer">
        <button
          onClick={() => setCurrentView("folder")}
          className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
          title="Folder"
        >
          <Folder className="w-5 h-5 text-white" />
        </button>
        <span className="text-xs text-white mt-1 select-none">Folder</span>
      </div>

      {/* Settings */}
      <div className="flex flex-col items-center cursor-pointer">
        <button
          onClick={() => setShowSettings(true)}
          className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <Settings className="w-5 h-5 text-white" />
        </button>
        <span className="text-xs text-white mt-1 select-none">Setting</span>
      </div>


      {/* Profile */}
      <div className="flex flex-col items-center space-y-1 mt-auto cursor-pointer" title="Profile">
        <button
          onClick={() => setCurrentView("profile")}
          className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <span className="text-sm font-bold text-white">
            {profileData.displayName ? profileData.displayName[0].toUpperCase() : "E"}
          </span>
        </button>
        <span className="text-xs text-white truncate max-w-[48px] text-center select-none">
          {profileData.displayName || "User"}
        </span>
      </div>

      {/* Logout */}
      <div className="flex flex-col items-center cursor-pointer" title="Logout">
        <button
          onClick={handleLogout}
          className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 text-white" />
        </button>
        <span className="text-xs text-white mt-1 select-none">Logout</span>
      </div>
    </div>

      {/* Chat List Panel */}

      {isChatPanelOpen && (
        <div className="w-[185px] bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out">
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-900">Chat</h2>
              <button
                onClick={handleNewChat}
                className="flex flex-col items-center text-gray-500 hover:text-cyan-500"
                title="New Chat"
              >
                <Plus className="w-4 h-4" />
                <span className="text-[10px] mt-1">New Chat</span>
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search chat name"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
          </div>

          {/* Chat list */}
          <div className="flex-1 overflow-y-auto">
            {chats
              .filter((chat) =>
                chat.name.toLowerCase().includes(message.toLowerCase())
              )
              .map((chat) => (
                <div
                  key={chat.id}
                  className="group flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  // ฟังก์ชันเลือกแชท
                  onClick={() => {
                    setSelectedChatId(chat.id)
                    setCurrentView("chat")
                    setMessages(chat.messages) // โหลดข้อความของแชทนั้น
                  }}

                >
                  <div className="text-sm text-gray-800 truncate">{chat.name}</div>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDropdownOpenId(dropdownOpenId === chat.id ? null : chat.id);
                      }}
                      className="p-1 rounded hover:bg-gray-200"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                    {dropdownOpenId === chat.id && (
                      <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-300 rounded shadow-md z-10">
                        <button
                          onClick={() => handleRename(chat.id)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          ✏️Change name
                        </button>
                        <button
                          onClick={() => handleDelete(chat.id)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          🗑️Delete
                        </button>
                        <button
                          onClick={() => handlePin(chat.id)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          📌Pin
                        </button>
                        <button
                          onClick={() => handleSaveToFolder(chat.id)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          📁Save in folder
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      {currentView === "landing" && <ChatLanding />}
      {currentView === "chat" && <ChatView />}
      {/* View ของ Folder */}
      {currentView === "folder" && (
        <div className="flex-1 p-6 bg-white overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Folders</h2>
            <button
              onClick={handleAddFolder}
              className="px-3 py-1 bg-cyan-500 text-white text-sm rounded hover:bg-cyan-600"
            >
              + Add Folder
            </button>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search folders..."
              value={folderSearch}
              onChange={(e) => setFolderSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Folder list */}
          <ul className="space-y-2">
            {folders
              .filter((f) => f.toLowerCase().includes(folderSearch.toLowerCase()))
              .map((folder, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                >
                  📁 {folder}
                </li>
              ))}
          </ul>
        </div>
      )}

      <SettingsModal />
    </div> 
  )
}

