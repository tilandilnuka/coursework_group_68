"use client";

import { useState, useEffect } from "react";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! How can I help you today?",
      sender: "agent",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const quickReplies = [
    "Product information",
    "Shipping details",
    "Technical support",
    "Return policy",
  ];

  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
      setMessages(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, userMessage]);
      setNewMessage("");

      setIsTyping(true);
      setTimeout(() => {
        const agentResponse = {
          id: messages.length + 2,
          text: "Thanks for your message! Our team will get back to you shortly.",
          sender: "agent",
          time: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, agentResponse]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleQuickReply = (reply) => {
    const userMessage = {
      id: messages.length + 1,
      text: reply,
      sender: "user",
      time: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, userMessage]);
  };

  useEffect(() => {
    const chatBox = document.querySelector(".chat-box");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);

  const clearChatHistory = () => {
    setMessages([]);
    localStorage.removeItem("chatHistory");
  };

  return (
    <>
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isOpen ? "w-96 h-[500px]" : "w-16 h-16"
        }`}
      >
        {isOpen ? (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 h-full flex flex-col">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm">👨‍💻</span>
                </div>
                <div>
                  <h3 className="font-semibold">Live Support</h3>
                  <p className="text-xs opacity-90">
                    Usually replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 chat-box">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        : "bg-gray-100 text-black"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-white/70"
                          : "text-gray-500"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-xs px-4 py-2 rounded-2xl bg-gray-100 text-black">
                    <p className="text-sm">Agent is typing...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-orange-100 hover:text-orange-600 transition-colors duration-200"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:border-orange-500 focus:ring-0 text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </form>
              <button
                onClick={clearChatHistory}
                className="mt-3 text-sm text-red-500 hover:underline"
              >
                Clear Chat History
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center relative"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>

            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </button>
        )}
      </div>

      {!isOpen && (
        <div className="fixed bottom-24 right-6 z-40 bg-black text-white px-4 py-2 rounded-xl text-sm font-medium opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Need help? Chat with us!
        </div>
      )}
    </>
  );
};

export default LiveChat;
