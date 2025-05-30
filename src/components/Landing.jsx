import React, { useRef, useState } from "react";
import vegetaImg from "../assets/vegeta.png";
import Result from "./Result";
import { useEffect } from "react";
import { generateGeminiResponse } from "../gemini";
import { saveMessagesToLocalStorage } from "../../utils/LocalsStorage";


const Landing = ({ messages, setMessages }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [hello, setHello] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [iconChange, setIconChange] = useState(false);
  const textareaRef = useRef(null);
  const [justSent, setJustSent] = useState(false);





 

const sendClicked = async () => {
  if (inputValue.trim() === "") return;

  const userMessage = inputValue;
  const updatedMessages = [
    ...messages,
    { sender: "user", text: userMessage },
  ];
  setMessages(updatedMessages);
  saveMessagesToLocalStorage(updatedMessages); // ✅ Save user message

  setInputValue("");
  setIconChange(false);
  setJustSent(true);
  setShowResult(true);
  setIsTyping(true);
  setHello(false);

  try {
    const botReply = await generateGeminiResponse(userMessage);

    const finalMessages = [
      ...updatedMessages,
      { sender: "bot", text: botReply },
    ];
    setMessages(finalMessages);
    saveMessagesToLocalStorage(finalMessages); // ✅ Save after bot reply
  } catch (error) {
    const errorMessages = [
      ...updatedMessages,
      { sender: "bot", text: "Sorry, something went wrong." },
    ];
    setMessages(errorMessages);
    saveMessagesToLocalStorage(errorMessages); // ✅ Save error message
  } finally {
    setIsTyping(false);
  }
};

  useEffect(() => {
    if (justSent && textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      setJustSent(false); // Reset the flag
    }
  }, [justSent]);

 


  return (
    <>
      <div className="landing bg-[#1B1C1D] w-screen relative">
        <div className="nav flex items-center justify-between p-5 text-[1.375rem]">
          <p>Gemini</p>
          <a href="https://gemini.google/about/" target="_blank" className="text-[15px] text-[#A9A2B0]">About Gemini</a>
        </div>
      </div>

      <div className="main-container mt-18 h-[500px] ml-5  absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col w-[750px] m-auto">
        {hello && (
          <div className="greet mt-[30px] text-[46px]">
            <p>
              <span>Meet Gemini,</span>
            </p>
            <p>your personal AI assistant</p>
          </div>
        )}
        {showResult && <Result messages={messages} isTyping={isTyping} />}
      </div>
      <div className="mainBottom absolute bottom-0 gap-1 mt-4 w-full px-0  ml-5 overflow-x-hidden flex flex-col items-center justify-center left-1/2 -translate-x-1/2">
        <div className=" searchBox flex items-center w-[750px] justify-between border-[1px] flex-col border-[#4A5050] gap-4 px-5 py-4 rounded-2xl">

          <textarea
            ref={textareaRef}
            rows={1}
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value;
              setInputValue(value);
              setIconChange(value !== "");

              e.target.style.height = "auto";

              e.target.style.height = `${Math.min(
                e.target.scrollHeight,
                175
              )}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevent newline
                sendClicked(); // Send message
              }
            }}
            className="gemini-scrollbar bg-transparent border-none outline-none p-[2px] text-md w-full resize-none overflow-y-auto max-h-[175px]"
            placeholder="Ask Gemini"
          />

          <div className="flex gap-1.5 text-[#A2A9B0] w-full justify-between">
            <i className="ri-upload-cloud-line cursor-pointer w-[24px]"></i>
            <div className="icon-wrapper transition-all duration-300 ease-in-out">
              <div className="relative w-[24px] h-[24px]">
                <i
                 
                  className={`ri-mic-fill absolute top-0 left-0 w-[24px] h-[24px] cursor-pointer transition-all duration-300 ease-in-out ${
                    iconChange ? "opacity-0 scale-90" : "opacity-100 scale-100"
                  }`}
                />
                <i
                  onClick={sendClicked}
                  className={`ri-send-plane-2-fill text-white absolute top-0 left-0 w-[24px] h-[24px] cursor-pointer transition-all duration-300 ease-in-out ${
                    iconChange ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      <p className="text-sm text-[#A9A2B0]">Gemini can make mistakes, so double-check it</p>
      </div>
    </>
  );
};

export default Landing;
