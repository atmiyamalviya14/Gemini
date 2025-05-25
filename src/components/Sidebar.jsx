import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'

const Sidebar = ({ messages }) => {
  const [expand, setExpand] = useState(false)
  const [showText, setShowText] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const userMessages = [...messages].filter(msg => msg.sender === 'user').reverse()

  const handleTransitionEnd = () => {
    if (expand) {
      setShowText(true)
    }
  }

  const firstFiveMessages = userMessages.slice(0, 5)
  const remainingMessages = userMessages.slice(5)

  return (
    <div
  onMouseEnter={() => setExpand(true)}
  onMouseLeave={() => {
    setExpand(false);
    setShowText(false);
    setShowAll(false);
  }}
  onTransitionEnd={handleTransitionEnd}
  className={`transition-all duration-300 ease-in-out ${
    expand ? 'w-[20%]' : 'w-[5%]'
  } min-h-screen flex flex-col justify-between px-4 py-6 bg-[#282A2C]`}
>
  {/* TOP SECTION */}
  <div className="top">
    <i className="ri-menu-line text-white block ml-[5px]"></i>

    <div className="new-chat mt-10 inline-flex items-start justify-end gap-2 px-1 py-1 rounded-4xl text-gray-400 cursor-pointer">
      <i className="ri-add-fill"></i>
      {showText && <p>New Chat</p>}
    </div>

    {showText && (
      <div className="recent mt-5">
        <p className="mb-3">Recent</p>

        <div className="sidebar-scroll flex flex-col gap-1 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#4A4A4A] scrollbar-track-transparent">
          {/* First 5 messages */}
          {userMessages.slice(0, 5).map((msg, index) => (
            <div
              key={index}
              className="recent-entry flex items-start gap-2 px-4 py-1 text-sm rounded-3xl text-gray-400 cursor-pointer hover:bg-[#323537]"
            >
              <i className="ri-chat-4-line"></i>
              <p className="line-clamp-1 max-w-[150px]">{msg.text}</p>
            </div>
          ))}

          {/* Show More / Less */}
          {userMessages.length > 5 && (
            <>
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-sm text-[#A2A7AC] mt-1 ml-4 text-left"
              >
                {showAll ? 'Show less' : 'Show more'}
              </button>

              {showAll &&
                userMessages.slice(5).map((msg, index) => (
                  <div
                    key={index + 5}
                    className="recent-entry flex items-start gap-2 px-4 py-3 rounded-3xl text-gray-400 cursor-pointer hover:bg-[#323537]"
                  >
                    <i className="ri-chat-4-line"></i>
                    <p className="line-clamp-1 max-w-[150px]">{msg.text}</p>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    )}
  </div>

  {/* BOTTOM SECTION */}
  <div className="bottom flex flex-col">
    <div
      onClick={() =>
        window.open(
          'https://support.google.com/gemini/answer/13594961?visit_id=638837510039794993-1270095603&p=privacy_help&rd=1',
          '_blank'
        )
      }
      className="bottom-item recent-entry flex items-start gap-2 px-2 py-3 rounded-3xl text-gray-400 cursor-pointer hover:bg-[#323537]"
    >
      <i className="ri-question-line"></i>
      {showText && <p>Help</p>}
    </div>
    <div className="bottom-item recent-entry flex items-start gap-2 px-2 py-3 rounded-3xl text-gray-400 cursor-pointer hover:bg-[#323537]">
      <i className="ri-settings-3-line"></i>
      {showText && <p>Settings</p>}
    </div>
  </div>
</div>

  )
}

export default Sidebar
