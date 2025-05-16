import React, { useEffect, useRef } from "react";

const Result = ({ messages, isTyping }) => {
const lastMessages = Array.isArray(messages) ? messages.slice(-2) : [];

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Scroll to bottom on new message
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="absolute bg-[#1B1C1D] -top-[19%] h-[450px] w-full overflow-hidden">
      <div
        ref={containerRef}
        className="asked absolute flex flex-col-reverse gap-4 right-0 w-full p-4 overflow-y-auto max-h-full"
        style={{
          maxHeight: "450px",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        {isTyping && (
          <div className="w-full flex justify-start">
            <p className="typing-bubble">
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </p>
          </div>
        )}

       {(Array.isArray(messages) ? messages.slice() : [])
  .reverse()
  .map((msg, index) => (
    <div
      key={index}
      className={`w-full flex ${
        msg.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <p
        className={`text-[16px] py-3 px-4 rounded-2xl text-white max-w-[70%] ${
          msg.sender === "user"
            ? "bg-[#333537] rounded-br-md"
            : "bg-[#2c2c2e] rounded-bl-md"
        }`}
      >
        {msg.text}
      </p>
    </div>
))}

      </div>
    </div>
  );
};

export default Result;
