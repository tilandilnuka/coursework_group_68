"use client";

import { useEffect, useState } from "react";

const ModernToast = ({ alert, setAlert }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (alert?.message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setAlert(), 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert, setAlert]);

  if (!alert?.message) return null;

  const getIcon = () => {
    if (alert.success) return "✅";
    if (alert.error) return "❌";
    if (alert.loading) return "⏳";
    return "ℹ️";
  };

  const getColorClasses = () => {
    if (alert.success)
      return "from-green-500 to-emerald-500 border-green-400/30";
    if (alert.error) return "from-red-500 to-rose-500 border-red-400/30";
    if (alert.loading) return "from-blue-500 to-cyan-500 border-blue-400/30";
    return "from-gray-500 to-slate-500 border-gray-400/30";
  };

  return (
    <div
      className={`fixed top-24 right-6 z-50 transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`glass border rounded-2xl p-4 max-w-sm shadow-2xl ${getColorClasses()}`}
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">{getIcon()}</div>
          <div className="flex-1">
            <p className="text-white font-medium">{alert.message}</p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => setAlert(), 300);
            }}
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            ✕
          </button>
        </div>

        {alert.loading && (
          <div className="mt-3 w-full bg-white/20 rounded-full h-1">
            <div className="bg-white h-1 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernToast;
