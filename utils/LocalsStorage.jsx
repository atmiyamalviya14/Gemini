// utils/LocalStorage.js

export const saveMessagesToLocalStorage = (messages) => {
  if (!messages || messages.length === 0) {
    console.log("⚠️ No messages to save.");
    return;
  }
  localStorage.setItem("chatMessages", JSON.stringify(messages));
  console.log("✅ Messages saved to localStorage");
};

export const loadMessagesFromLocalStorage = () => {
  const saved = localStorage.getItem("chatMessages");
  return saved ? JSON.parse(saved) : [];
};
