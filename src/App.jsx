import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Landing from './components/Landing'

const App = () => {
  const [chats, setChats] = useState([{ id: Date.now(), messages: [] }]);

  const [activeChatIndex, setActiveChatIndex] = useState(0);

  const updateMessages = (newMessages) => {
    setChats((prev) =>
      prev.map((chat, i) =>
        i === activeChatIndex ? { ...chat, messages: newMessages } : chat
      )
    );
  };

  const handleNewChat = () => {
    const newChat = { id: Date.now(), messages: [] };
    setChats([...chats, newChat]);
    setActiveChatIndex(chats.length);
  };

  const handleChatSelect = (index) => {
    setActiveChatIndex(index);
  };

  return (
    <>
      <Sidebar
        chats={chats}
        activeIndex={activeChatIndex}
        onNewChat={handleNewChat}
        onSelectChat={handleChatSelect}
      />
      <Landing
  messages={Array.isArray(chats[activeChatIndex]?.messages) ? chats[activeChatIndex].messages : []}
  setMessages={updateMessages}
/>


    </>
  );
};

export default App;
