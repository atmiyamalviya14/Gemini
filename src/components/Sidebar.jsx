import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'

const Sidebar = ({ chats, activeIndex, onNewChat, onSelectChat }) => {
  const [expand, setExpand] = useState(false)
  const [showText, setShowText] = useState(false)

  const handleTransitionEnd = () => {
    if (expand) {
      setShowText(true)
    }
  }

  return (
    <div
      onMouseEnter={() => setExpand(true)}
      onMouseLeave={() => {
        setExpand(false)
        setShowText(false)
      }}
      onTransitionEnd={handleTransitionEnd}
      className={`Sidebar transition-all duration-300 ease-in-out ${
        expand ? 'w-[20%]' : 'w-[5%]'
      } min-h-screen flex flex-col justify-between px-4 py-6 bg-[#282A2C]`}
    >
      <div className="top">
        <i className="ri-menu-line text-white block ml-[5px]"></i>
        <div
          onClick={onNewChat}
          className="new-chat mt-10 inline-flex items-start justify-end gap-2 px-1 py-1 rounded-4xl text-gray-400 cursor-pointer"
        >
          <i className="ri-add-fill"></i>
          {showText && <p>New Chat</p>}
        </div>
        {showText && (
          <div className="recent flex flex-col">
            <p className="recent title mt-5 mb-3">Recent</p>
            {chats.map((chat, index) => (
              <div
                key={chat.id}
                className={`recent-entry flex items-start gap-2 px-4 py-3 rounded-3xl text-gray-400 cursor-pointer hover:bg-[#323537] ${
                  index === activeIndex ? 'bg-[#323537]' : ''
                }`}
                onClick={() => onSelectChat(index)}
              >
                <i className="ri-chat-4-line"></i>
                <p className="truncate w-full">
                  {chat.messages[0]?.text || "New Chat"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom flex flex-col">
        <div className="recent-entry flex items-start gap-2 px-2 py-3 rounded-3xl text-gray-400 cursor-pointer hover:bg-[#323537]">
          <i className="ri-question-line"></i>
          {showText && <p>Help</p>}
        </div>
        <div className="recent-entry flex items-start gap-2 px-2 py-3 rounded-3xl text-gray-400 cursor-pointer hover:bg-[#323537]">
          <i className="ri-settings-3-line"></i>
          {showText && <p>Settings</p>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
