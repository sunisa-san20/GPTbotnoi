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

import { useState, useEffect } from "react"

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
  id: string;
  name: string;
  messages: Message[];
  createdAt: number;         // เพิ่ม timestamp
  isPinned?: boolean;        // เพิ่มสถานะ pin
  folder?: string;           // ระบุว่าอยู่ folder ไหน
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
  const timestamp = Date.now();
  const newChat: Chat = {
    id: timestamp.toString(),
    name: "New Chat",
    createdAt: timestamp,
    messages: [],
  };
  setChats((prev) => [newChat, ...prev]);
  setSelectedChatId(newChat.id);
  setMessages([]);
  setCurrentView("chat");
  setIsNewChat(true);
};

// groupChatsByTime
const groupChatsByTime = () => {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = 7 * oneDay;
  const oneMonth = 30 * oneDay;

  const grouped = {
    now: [] as Chat[],
    week: [] as Chat[],
    month: [] as Chat[],
    year: [] as Chat[],
  };

  chats.forEach((chat) => {
    const diff = now - chat.createdAt;

    if (diff < oneDay) grouped.now.push(chat);
    else if (diff < oneWeek) grouped.week.push(chat);
    else if (diff < oneMonth) grouped.month.push(chat);
    else grouped.year.push(chat);
  });

  return grouped;
};

const groupedChats = groupChatsByTime();

// เพิ่ม State ควบคุม Popups
const [showSavePopup, setShowSavePopup] = useState<string | null>(null);
const [showSharePopup, setShowSharePopup] = useState<string | null>(null);
const [sharePrivacy, setSharePrivacy] = useState<'public' | 'private'>('private');
const [renameData, setRenameData] = useState<{ id: string, name: string } | null>(null)

// Rename
const handleRename = (id: string) => {
  const chat = chats.find(c => c.id === id)
  if (chat) setRenameData({ id, name: chat.name })
  setDropdownOpenId(null)
}

const applyRename = () => {
  if (renameData) {
    setChats(prev =>
      prev.map(chat =>
        chat.id === renameData.id ? { ...chat, name: renameData.name } : chat
      )
    )
    setRenameData(null)
  }
}

// State Popup แสดงข้อความพูด
const [showMicPopup, setShowMicPopup] = useState(false);
const [micText, setMicText] = useState("...");

// 🎤 จำลองการพูดแบบ real-time
useEffect(() => {
  if (showMicPopup) {
    const fakeTranscription = ["สวัสดีค่ะ", "ฉันอยากถามว่า...", "Botnoi คืออะไร"];
    let i = 0;
    const interval = setInterval(() => {
      setMicText(fakeTranscription[i % fakeTranscription.length]);
      i++;
    }, 1500);
    return () => clearInterval(interval);
  }
}, [showMicPopup]);

// Save in Folder
const [saveToFolderId, setSaveToFolderId] = useState<string | null>(null)
const [selectedFolder, setSelectedFolder] = useState("")
const [newFolderName, setNewFolderName] = useState("")

const handleApplySaveToFolder = () => {
  const folderToUse = newFolderName.trim() || selectedFolder
  if (!folderToUse) return

  if (!folders.includes(folderToUse)) {
    setFolders((prev) => [...prev, folderToUse])
  }

  setChats((prev) =>
    prev.map((chat) =>
      chat.id === saveToFolderId ? { ...chat, folder: folderToUse } : chat
    )
  )
  setSaveToFolderId(null)
  setSelectedFolder("")
  setNewFolderName("")
}

// Share
const [shareChatId, setShareChatId] = useState<string | null>(null)
const [shareMode, setShareMode] = useState<"public" | "private">("private")

// ยืนยันก่อนลบ
const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

const handleDeleteConfirmed = () => {
  if (!confirmDeleteId) return
  setChats((prev) => prev.filter((chat) => chat.id !== confirmDeleteId))
  if (selectedChatId === confirmDeleteId) {
    setSelectedChatId(null)
    setMessages([])
  }
  setConfirmDeleteId(null)
  setDropdownOpenId(null)
}

const handlePin = (id: string) => {
  setChats((prev) =>
    prev.map((chat) =>
      chat.id === id ? { ...chat, isPinned: !chat.isPinned } : chat
    ).sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)) // ปักไว้ด้านบน
  );
  setDropdownOpenId(null);
};

// Save in Folder
const handleSaveToFolder = (id: string) => {
  setSaveToFolderId(id);         // ใช้ state ที่ modal ใช้อยู่จริง
  setDropdownOpenId(null);       // ปิดเมนู dropdown
}

// สร้าง Modal กลางจอ
const CenteredModal = ({
  title,
  children,
  onClose,
}: {
  title: string
  children: React.ReactNode
  onClose: () => void
}) => (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white rounded-lg w-[360px] max-w-full shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  </div>
)

// สำหรับหน้า Folder
const [folders, setFolders] = useState<string[]>(["Work", "Personal"])
const [folderSearchKeyword, setFolderSearchKeyword] = useState("");
const handleAddFolder = () => {
  setShowAddFolderPopup(true);
};

// หน้า Folders สำหรับ Rename / Delete / Add
const [folderToRename, setFolderToRename] = useState<string | null>(null)
const [newFolderNameTemp, setNewFolderNameTemp] = useState("")
const [folderToDelete, setFolderToDelete] = useState<string | null>(null)
const [showAddFolderPopup, setShowAddFolderPopup] = useState(false)
// const [newFolderName, setNewFolderName] = useState("")
const [historyDeleteId, setHistoryDeleteId] = useState<string | null>(null)
const [removeFromFolderId, setRemoveFromFolderId] = useState<string | null>(null);
const [moveChatId, setMoveChatId] = useState<string | null>(null);
const [moveTargetFolder, setMoveTargetFolder] = useState("");

// ตรวจสอบว่าแชทที่เลือกคือ new chat
const [isNewChat, setIsNewChat] = useState(false)

// ส่งข้อความและตอบกลับ***จำลอง***
const handleSendMessage = () => {
  if (!newMessage.trim()) return;

  const timestamp = Date.now();
  let chatId = selectedChatId;

  // ถ้ายังไม่มีแชท → สร้างแชทใหม่
  if (!chatId) {
    const newChat: Chat = {
      id: timestamp.toString(),
      name: newMessage.slice(0, 30),
      createdAt: timestamp,
      messages: [],
    };
    chatId = newChat.id;
    setChats(prev => [newChat, ...prev]);
    setSelectedChatId(chatId);
    setMessages([]);
  }

  const id = Date.now();
  const userMsg: Message = { id, text: newMessage, sender: "user" };
  const botMsg: Message = { id: id + 1, text: "🤖 ตอบกลับจากบอท", sender: "bot" };

  setChats(prevChats =>
    prevChats.map(chat =>
      chat.id === chatId
        ? { ...chat, messages: [...chat.messages, userMsg, botMsg] }
        : chat
    )
  );

  setMessages(prev => [...prev, userMsg, botMsg]);
  setNewMessage("");
  setTimeout(() => setCurrentView("chat"), 100); // ❗ใส่ delay ให้ไม่เด้ง input
};


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

  // หน้า setting
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

  // หน้า Profile 
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
              name="chat-input"
              autoComplete="off"
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
              name="chat-input"
              autoComplete="off"
              placeholder="Enter Profession Here"
              value={profileData.profession}
              onChange={(e) => setProfileData({ ...profileData, profession: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )

  // หน้า chat bot ส่งข้อความ
  const ChatView = () => (
    <div className="flex-1 bg-white flex flex-col">
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
               ⌛History
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => selectedChatId && setShareChatId(selectedChatId)}
              >
                ➦ Share
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
                  📎Attach file
                  <input type="file" className="hidden" onChange={handleFileUpload} />
                </label>
                <label className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  🖼️ Attach photo
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>
            )}
          </div>

          <input
            type="text"
            name="chat-input"
            autoComplete="off"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 bg-transparent border-none outline-none focus:outline-none"
          />

          <button onClick={() => setShowMicPopup(true)}>
            <Mic className={`w-5 h-5 text-gray-500`} />
          </button>

          <button onClick={handleSendMessage}>
            <Send className="w-5 h-5 text-cyan-500 cursor-pointer hover:text-cyan-600" />
          </button>
        </div>
      </div>
    </div>
  )

  // หน้า ChatLanding
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

      {/* เมนูจุด 3 จุดแบบทำงานได้ */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpenId(dropdownOpenId === "chat-landing-menu" ? null : "chat-landing-menu")}
          className="p-1 rounded hover:bg-gray-100"
        >
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>

        {dropdownOpenId === "chat-landing-menu" && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow z-10">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
              Archive
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setDropdownOpenId(null);
                setCurrentView("History");
              }}
            >
              ⌛ History
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                if (selectedChatId) {
                  setShareChatId(selectedChatId);
                  setDropdownOpenId(null);
                }
              }}
            >
              ➦ Share
            </button>
          </div>
        )}
      </div>
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
          Start a new chat with Botnoi GPT
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
                📎 Attach file
                <input type="file" className="hidden" onChange={handleFileUpload} />
              </label>
              <label className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                🖼️ Attach photo
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
          )}
        </div>

        <input
          type="text"
          name="chat-input"
          autoComplete="off"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 bg-transparent border-none outline-none focus:outline-none"
        />

          <button onClick={() => setShowMicPopup(true)}>
            <Mic className={`w-5 h-5 text-gray-500`} />
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
                  name="chat-input"
                  autoComplete="off"
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
                  name="chat-input"
                  autoComplete="off"
                  placeholder="Enter Profession Here"
                  value={profileData.profession}
                  onChange={(e) => setProfileData({ ...profileData, profession: e.target.value })}
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
                name="chat-input"
                autoComplete="off"
                placeholder="Search chat name"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              />
            </div>
          </div>

          {/* Chat list */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4 text-sm text-gray-800">
            {["now", "week", "month", "year"].map((sectionKey) => {
              const sectionMap = {
                now: "🕒 Now",
                week: "📆 This Week",
                month: "🗓️ This Month",
                year: "📁 Earlier",
              };
              const chatsInSection = groupedChats[sectionKey as keyof typeof groupedChats]
                .filter((chat) => chat.name.toLowerCase().includes(message.toLowerCase()));

              if (chatsInSection.length === 0) return null;

              return (
                <div key={sectionKey}>
                  <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-2">{sectionMap[sectionKey as keyof typeof sectionMap]}</h3>
                  <div className="space-y-1">
                    {chatsInSection.map((chat) => (
                      <div
                        key={chat.id}
                        className="group flex items-center justify-between px-2 py-1 hover:bg-gray-100 cursor-pointer rounded"
                        onClick={() => {
                          setSelectedChatId(chat.id);
                          setMessages(chat.messages);
                          setCurrentView("chat");
                        }}
                      >
                        <div className="truncate">{chat.name} {chat.isPinned && "📌"}</div>
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
                                ✏️ Change name
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(chat.id)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                              >
                                🗑️ Delete
                              </button>
                              <button
                                onClick={() => handlePin(chat.id)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                {chat.isPinned ? "📌 Unpin" : "📌 Pin"}
                              </button>
                              <button
                                onClick={() => handleSaveToFolder(chat.id)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                📁 Save in folder
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
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

          {/* Search folders */}
          <div className="mb-4">
            <input
              type="text"
              name="folder-search"
              autoComplete="off"
              value={folderSearchKeyword}
              onChange={(e) => setFolderSearchKeyword(e.target.value)}
              placeholder="Search folders, chats, or keywords..."
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Folder list */}
          <ul className="space-y-4">
            {folders
              .filter((folderName) => {
                const keyword = folderSearchKeyword.toLowerCase();

                // หาก keyword ตรงกับชื่อ folder
                if (folderName.toLowerCase().includes(keyword)) return true;

                // หากตรงกับชื่อแชทหรือข้อความในแชทภายใน folder นี้
                const hasMatchingChat = chats.some(
                  (chat) =>
                    chat.folder === folderName &&
                    (
                      chat.name.toLowerCase().includes(keyword) ||
                      chat.messages.some((m) => m.text.toLowerCase().includes(keyword))
                    )
                );
                return hasMatchingChat;
              })
              .map((folder, idx) => (
                <li key={idx} className="bg-gray-100 rounded p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold text-gray-800">📁 {folder}</div>
                    <div className="space-x-2">
                      {/* เปลี่ยน Rename */}
                      <button
                        onClick={() => {
                          setFolderToRename(folder)
                          setNewFolderNameTemp(folder)
                        }}
                        className="text-blue-500 text-sm hover:underline"
                      >
                        ✏️ Rename
                      </button>

                      {/* เปลี่ยน Delete */}
                      <button
                        onClick={() => setFolderToDelete(folder)}
                        className="text-red-500 text-sm hover:underline"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>

                  {/* Chats in folder */}
                  <div className="space-y-2">
                    {chats.filter((chat) => chat.folder === folder).length === 0 && (
                      <div className="text-gray-500 text-sm">No chats in this folder</div>
                    )}
                    {chats
                      .filter((chat) => chat.folder === folder)
                      .map((chat) => (
                        <div
                          key={chat.id}
                          onClick={() => {
                            setSelectedChatId(chat.id);
                            setMessages(chat.messages);
                            setCurrentView("chat");
                          }}
                          className="flex justify-between items-center bg-white px-3 py-2 rounded shadow hover:bg-gray-100 cursor-pointer"
                        >
                          <div>
                            <div className="font-medium text-blue-600 hover:underline">{chat.name}</div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // ป้องกันไม่ให้เปิดแชทตอนกด Move
                                setMoveChatId(chat.id);
                                setMoveTargetFolder("");
                              }}
                              className="text-blue-500 text-sm hover:underline"
                            >
                              📁 Move
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // ป้องกันไม่ให้เปิดแชทตอนกด Remove
                                setRemoveFromFolderId(chat.id);
                              }}
                              className="text-red-500 text-sm hover:underline"
                            >
                              🗑️ Remove
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* เพิ่ม History View และแสดง timeline */}
      {currentView === "History" && (
        <div className="flex-1 p-6 bg-white overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Chat History</h2>

          {/* Search */}
          <input
            type="text"
            name="chat-input"
            autoComplete="off"
            placeholder="Search chats or keywords..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Grouped Chat Sections */}
          {["now", "week", "month", "year"].map((sectionKey) => {
            const sectionMap = {
              now: "🕒 Now",
              week: "📆 This Week",
              month: "🗓️ This Month",
              year: "📁 Earlier",
            };

            const chatsInSection = groupedChats[sectionKey as keyof typeof groupedChats].filter((chat) => {
              const keyword = message.toLowerCase();
              return (
                chat.name.toLowerCase().includes(keyword) ||
                chat.messages.some((m) => m.text.toLowerCase().includes(keyword))
              );
            });

            if (chatsInSection.length === 0) return null;

            return (
              <div key={sectionKey} className="mb-6">
                <h3 className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                  {sectionMap[sectionKey as keyof typeof sectionMap]}
                </h3>

                <div className="space-y-2">
                  {chatsInSection.map((chat) => (
                    <div
                      key={chat.id}
                      className="bg-gray-100 p-3 rounded flex justify-between items-center hover:bg-gray-200"
                    >
                      <div className="flex items-center justify-between bg-gray-100 p-3 rounded hover:bg-gray-200 w-full">
                        <div
                          onClick={() => {
                            setSelectedChatId(chat.id);
                            setMessages(chat.messages);
                            setCurrentView("chat");
                          }}
                          className="flex-1 cursor-pointer"
                        >
                          <div className="font-medium truncate text-blue-600 hover:underline">{chat.name}</div>
                          <div className="text-xs text-gray-500 truncate">
                            {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text.slice(0, 50) : ""}
                          </div>
                        </div>

                        <button
                          onClick={() => setHistoryDeleteId(chat.id)}
                          className="ml-auto text-red-500 text-sm hover:underline flex-shrink-0"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {confirmDeleteId && (
        <CenteredModal title="Delete Chat?" onClose={() => setConfirmDeleteId(null)}>
          <p className="text-gray-600 mb-4">Are you sure you want to delete this chat?</p>
          <div className="flex justify-end gap-2">
            <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button onClick={handleDeleteConfirmed} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
          </div>
        </CenteredModal>
      )}

      {renameData && (
        <CenteredModal title="Rename Chat" onClose={() => setRenameData(null)}>
          <input
            type="text"
            name="modal-input"
            autoComplete="off"
            value={renameData?.name || ""}
            onChange={(e) =>
              setRenameData((prev) =>
                prev ? { ...prev, name: e.target.value } : null
              )
            }
            placeholder="Enter new name"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setRenameData(null)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button onClick={applyRename} className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600">Save</button>
          </div>
        </CenteredModal>
      )}

      {/* Save in Folder Popup */}
      {saveToFolderId && (
        <CenteredModal title="Save Chat in Folder" onClose={() => setSaveToFolderId(null)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Select folder</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
            >
              <option value="">-- Select Folder --</option>
              {folders.map((f, i) => (
                <option key={i} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">OR Create New Folder</label>
            <input
              type="text"
              name="chat-input"
              autoComplete="off"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="New folder name"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setSaveToFolderId(null)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const folderToUse = newFolderName.trim() || selectedFolder
                if (!folderToUse) return

                if (!folders.includes(folderToUse)) {
                  setFolders((prev) => [...prev, folderToUse])
                }

                setChats((prev) =>
                  prev.map((chat) =>
                    chat.id === saveToFolderId ? { ...chat, folder: folderToUse } : chat
                  )
                )

                setSaveToFolderId(null)
                setSelectedFolder("")
                setNewFolderName("")
              }}
              className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
            >
              Save
            </button>
          </div>
        </CenteredModal>
      )}

      {/* แชร์ public / private และ copy URL */}
      {shareChatId && (
        <CenteredModal title="Share Chat" onClose={() => setShareChatId(null)}>
          <div className="mb-4 space-y-2">
            <label className="block text-sm font-medium">Visibility:</label>
            <div className="space-x-4">
              <label>
                <input type="radio" checked={shareMode === "public"} onChange={() => setShareMode("public")} /> Public
              </label>
              <label>
                <input type="radio" checked={shareMode === "private"} onChange={() => setShareMode("private")} /> Private
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Share Link</label>
            <div className="flex items-center space-x-2">
              <input
                readOnly
                value={`https://botnoi.app/share/${shareChatId}?mode=${shareMode}`}
                className="flex-1 px-2 py-1 border rounded"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://botnoi.app/share/${shareChatId}?mode=${shareMode}`)
                  alert("Link copied!")
                }}
                className="text-sm px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={() => setShareChatId(null)} className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600">Done</button>
          </div>
        </CenteredModal>
      )}

      {/* Rename Folder */}
      {folderToRename && (
        <CenteredModal title="Rename Folder" onClose={() => setFolderToRename(null)}>
          <input
            type="text"
            name="chat-input"
            autoComplete="off"
            className="w-full px-3 py-2 border rounded mb-4"
            placeholder="New folder name"
            value={newFolderNameTemp}
            onChange={(e) => setNewFolderNameTemp(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setFolderToRename(null)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                if (newFolderNameTemp && folderToRename) {
                  setFolders((prev) => prev.map(f => f === folderToRename ? newFolderNameTemp : f))
                  setChats((prev) => prev.map(chat => chat.folder === folderToRename ? { ...chat, folder: newFolderNameTemp } : chat))
                  setFolderToRename(null)
                  setNewFolderNameTemp("")
                }
              }}
            >
              Save
            </button>
          </div>
        </CenteredModal>
      )}

      {/* Delete Folder */}
      {folderToDelete && (
        <CenteredModal title="Delete Folder" onClose={() => setFolderToDelete(null)}>
          <p className="mb-4 text-gray-700">Are you sure you want to delete folder <strong>{folderToDelete}</strong>?</p>
          <div className="flex justify-end gap-2">
            <button onClick={() => setFolderToDelete(null)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setFolders((prev) => prev.filter(f => f !== folderToDelete))
                setChats((prev) => prev.map(chat => chat.folder === folderToDelete ? { ...chat, folder: undefined } : chat))
                setFolderToDelete(null)
              }}
            >
              Delete
            </button>
          </div>
        </CenteredModal>
      )}

      {/* Add Folder */}
      {showAddFolderPopup && (
        <CenteredModal title="Add New Folder" onClose={() => setShowAddFolderPopup(false)}>
          <input
            type="text"
            name="chat-input"
            autoComplete="off"
            placeholder="Folder name"
            className="w-full px-3 py-2 border rounded mb-4"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowAddFolderPopup(false)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
            <button
              className="bg-cyan-500 text-white px-4 py-2 rounded"
              onClick={() => {
                if (newFolderName && !folders.includes(newFolderName)) {
                  setFolders((prev) => [...prev, newFolderName])
                  setNewFolderName("")
                }
                setShowAddFolderPopup(false)
              }}
            >
              Add
            </button>
          </div>
        </CenteredModal>
      )}

      {/* ยืนยันการลบ */}
      {historyDeleteId && (
        <CenteredModal title="Delete Chat History?" onClose={() => setHistoryDeleteId(null)}>
          <p className="mb-4 text-gray-700">Do you want to delete this chat from history?</p>
          <div className="flex justify-end gap-2">
            <button onClick={() => setHistoryDeleteId(null)} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
            <button
              onClick={() => {
                setChats((prev) => prev.filter((chat) => chat.id !== historyDeleteId))
                if (selectedChatId === historyDeleteId) {
                  setSelectedChatId(null)
                  setMessages([])
                }
                setHistoryDeleteId(null)
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </CenteredModal>
      )}

      {/* Popup กลางจอสำหรับ Remove */}
      {removeFromFolderId && (
        <CenteredModal title="Remove Chat from Folder?" onClose={() => setRemoveFromFolderId(null)}>
          <p className="text-gray-600 mb-4">Are you sure you want to remove this chat from the folder?</p>
          <div className="flex justify-end gap-2">
            <button onClick={() => setRemoveFromFolderId(null)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
            <button
              onClick={() => {
                setChats((prev) =>
                  prev.map((chat) =>
                    chat.id === removeFromFolderId ? { ...chat, folder: undefined } : chat
                  )
                );
                setRemoveFromFolderId(null);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </CenteredModal>
      )}

      {/* move  Folder*/}
      {moveChatId && (
        <CenteredModal title="Move Chat to Folder" onClose={() => setMoveChatId(null)}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Select Folder</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={moveTargetFolder}
              onChange={(e) => setMoveTargetFolder(e.target.value)}
            >
              <option value="">-- Select Folder --</option>
              {folders.map((f, i) => (
                <option key={i} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setMoveChatId(null)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!moveTargetFolder) return;
                setChats(prev =>
                  prev.map(chat =>
                    chat.id === moveChatId ? { ...chat, folder: moveTargetFolder } : chat
                  )
                );
                setMoveChatId(null);
                setMoveTargetFolder("");
              }}
              className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
            >
              Move
            </button>
          </div>
        </CenteredModal>
      )}

      {/* เพิ่ม Popup ไมค์ */}
      {showMicPopup && (
        <CenteredModal title="🎙️ Voice Input" onClose={() => setShowMicPopup(false)}>
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* ไมค์ใหญ่พร้อม effect */}
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 animate-ping rounded-full bg-cyan-300 opacity-50"></div>
              <div className="absolute inset-0 animate-pulse rounded-full bg-cyan-400 opacity-40"></div>
              <div className="relative z-10 flex items-center justify-center w-24 h-24 bg-cyan-500 text-white rounded-full shadow-lg">
                <Mic className="w-10 h-10" />
              </div>
            </div>

            {/* ข้อความที่พูด */}
            <div className="bg-gray-100 text-center px-4 py-2 rounded text-lg text-cyan-700 font-medium min-w-[200px]">
              {micText}
            </div>

            <button
              onClick={() => {
                setMessages((prev) => [
                  ...prev,
                  { id: prev.length + 1, text: micText, sender: "user" },
                  { id: prev.length + 2, text: "🤖 ตอบกลับจากเสียง", sender: "bot" },
                ]);
                setShowMicPopup(false);
              }}
              className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
            >
              Done
            </button>
          </div>
        </CenteredModal>
      )}

      <SettingsModal />
    </div> 
  )
}

