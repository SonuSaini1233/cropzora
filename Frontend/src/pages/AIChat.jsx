import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";

const DEFAULT_MESSAGES = [
  {
    id: 1,
    sender: "bot",
    text: "Namaste! Main Aapka CropZora AI Assistant hoon. Aap Mujhse Fasal, Mitti, Weather ya Insecticides ke baare mei pooch sakte hain.",
    time: "Just now",
  },
];

const SUGGESTIONS = [
  "Gehun me Urea ki Sahi Dose kya hai?",
  "Tamatar ke patte peele ho rahe hain?",
  "Aane wale 3 din ka mausam kaisa rahega?",
  "PM Kisan Yojna ke liye kaise apply kare?",
];

export default function AIChat({ onBack }) {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("cropzora_chat_history");
    return saved ? JSON.parse(saved) : DEFAULT_MESSAGES;
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("cropzora_chat_history", JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let botReply = "Aapke sawaal ke aadhar par: Khet mei nami banaye rakhein aur recommended doses ke mutabiq hi urvarak (fertilizers) ka istemaal karein.";

      const qLower = query.toLowerCase();
      if (qLower.includes("urea") || qLower.includes("gehun")) {
        botReply = "Gehun ki fasal mei per acre 45kg Urea 2-3 installments mei dena chahiye. Pehli irrigation ke waqt Zinc ke saath mix karke dena behter hota hai.";
      } else if (qLower.includes("peele") || qLower.includes("tamatar")) {
        botReply = "Patte peele hona Nitrogen ki kami ya Fungus ka sankraman ho sakta hai. NPK 19:19:19 ka spray karein ya Neem Oil 5ml/Litre spray karein.";
      } else if (qLower.includes("mausam") || qLower.includes("weather")) {
        botReply = "Agle 48 ghante mei halki barish ke aasaar hain. Khet mei extra pani ka nikas tayyar rakhein aur abhi koi spray na karein.";
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleClearChat = () => {
    localStorage.removeItem("cropzora_chat_history");
    setMessages(DEFAULT_MESSAGES);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-5xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-emerald-700 text-white">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-emerald-600 rounded-lg lg:hidden">
            <ArrowLeft size={20} />
          </button>
          <div className="p-2.5 bg-emerald-600 rounded-xl">
            <Bot size={22} />
          </div>
          <div>
            <h2 className="font-bold text-base">CropZora AI Krishi Assistant</h2>
            <p className="text-xs text-emerald-100">Always active • Hindi & English</p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-800 hover:bg-emerald-900 rounded-lg text-emerald-100 transition"
          title="Clear History"
        >
          <RotateCcw size={14} /> Clear Chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[82%] ${
              msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === "user" ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
            </div>

            <div>
              <div
                className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === "user"
                    ? "bg-emerald-600 text-white rounded-tr-none"
                    : "bg-white text-gray-800 border border-gray-200/80 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 block px-1">
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 items-center text-gray-400 text-xs bg-white border border-gray-200 px-4 py-2.5 rounded-full w-max">
            <Sparkles size={14} className="animate-spin text-emerald-600" />
            AI assistant soch raha hai...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestions */}
      <div className="px-4 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto no-scrollbar">
        {SUGGESTIONS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(item)}
            className="whitespace-nowrap text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium px-3 py-1.5 rounded-full border border-emerald-200/60 transition"
          >
            ✨ {item}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Sawaal poochein (e.g. Fasal bimari, khad, mausam)..."
            className="flex-1 bg-gray-50 border border-gray-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white p-3 rounded-xl transition shadow-sm"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}