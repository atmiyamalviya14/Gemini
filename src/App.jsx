import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Landing from './components/Landing';
import {
  saveMessagesToLocalStorage,
  loadMessagesFromLocalStorage,
} from '../utils/LocalsStorage';

const App = () => {
  const [messages, setMessages] = useState([]);

  // ✅ Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = loadMessagesFromLocalStorage();
    if (savedMessages && savedMessages.length > 0) {
      setMessages(savedMessages);
    }
  }, []);

  // ✅ Save messages to localStorage whenever they change
  useEffect(() => {
    saveMessagesToLocalStorage(messages);
  }, [messages]);

  // 🧠 Log messages when they change
  useEffect(() => {
    messages.forEach((msg, i) => {
      console.log(` ${msg.sender.toUpperCase()}: ${msg.text}`);
    });
  }, [messages]);

  return (
    <>
      <Sidebar messages={messages} />
      <Landing messages={messages} setMessages={setMessages} />
    </>
  );
};

export default App;
