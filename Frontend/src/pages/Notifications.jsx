import React, { useState, useEffect } from "react";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  Trash2,
  CheckCheck,
  ArrowLeft,
  Filter,
} from "lucide-react";

const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    type: "alert",
    title: "Mausam Chetavani: Bhaari Barish",
    desc: "Agle 24 ghante mei aapke kshetra mei tej barish ki sambhavna hai. Khet mei pani rukne na dein.",
    date: "Today, 10:30 AM",
    read: false,
    priority: "high",
  },
  {
    id: "n2",
    type: "success",
    title: "PM Kisan installment Credited",
    desc: "Aapke bank khate mei PM-Kisan samman nidhi ki 16vi kisht bhej di gayi hai.",
    date: "Yesterday",
    read: false,
    priority: "medium",
  },
  {
    id: "n3",
    type: "info",
    title: "Mandi Bhaav Update",
    desc: "Aapke nazdiki mandi mei Gehun ka daam ₹2,275/Quintal tak pahunch gaya hai.",
    date: "2 days ago",
    read: true,
    priority: "low",
  },
];

export default function Notifications({ onBack }) {
  const [list, setList] = useState(() => {
    const saved = localStorage.getItem("cropzora_notifications");
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("cropzora_notifications", JSON.stringify(list));
  }, [list]);

  const markAllRead = () => {
    setList((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const toggleRead = (id) => {
    setList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: !item.read } : item))
    );
  };

  const deleteItem = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredList = list.filter((item) => {
    if (filter === "unread") return !item.read;
    if (filter === "high") return item.priority === "high";
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Top Action Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg lg:hidden">
            <ArrowLeft size={20} />
          </button>
          <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
            <Bell size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Notifications & Alerts</h1>
            <p className="text-xs text-gray-500">
              {list.filter((i) => !i.read).length} unread alerts stored locally
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition"
          >
            <CheckCheck size={16} /> Mark all read
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <Filter size={15} className="text-gray-400 ml-1" />
        {["all", "unread", "high"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition ${
              filter === type
                ? "bg-emerald-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Notifications Cards */}
      <div className="space-y-3">
        {filteredList.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 text-gray-400">
            Koi notification nahi mila.
          </div>
        ) : (
          filteredList.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                !item.read
                  ? "bg-white border-emerald-300 shadow-sm ring-1 ring-emerald-100"
                  : "bg-gray-50/70 border-gray-200 opacity-80"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    item.type === "alert"
                      ? "bg-amber-100 text-amber-700"
                      : item.type === "success"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {item.type === "alert" && <AlertTriangle size={20} />}
                  {item.type === "success" && <CheckCircle2 size={20} />}
                  {item.type === "info" && <Info size={20} />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                  <span className="text-[10px] text-gray-400 mt-2 block font-medium">
                    {item.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleRead(item.id)}
                  className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                  title="Toggle Read"
                >
                  <CheckCircle2 size={16} />
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}