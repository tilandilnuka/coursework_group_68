"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: "🛒",
      label: "Cart",
      href: "/products/cart",
      color: "from-green-500 to-emerald-500",
    },

    {
      icon: "📦",
      label: "Orders",
      href: "/products/orders",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: "👤",
      label: "Profile",
      href: "/users/profile",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Action Items */}
      <motion.div
        className={`flex flex-col gap-3 mb-4`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        {actions.map((action, index) => (
          <motion.a
            key={action.label}
            href={action.href}
            className={`flex items-center gap-3 glass p-3 rounded-2xl hover:bg-white/30 transform hover:scale-105 transition-all duration-300 group`}
            style={{ animationDelay: `${index * 100}ms` }}
            whileHover={{ scale: 1.1 }}
          >
            <div
              className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}
            >
              {action.icon}
            </div>
            <span className="text-white font-medium pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {action.label}
            </span>
          </motion.a>
        ))}
      </motion.div>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300`}
        animate={{ rotate: isOpen ? 45 : 0 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? "✕" : "⚡"}
      </motion.button>
    </motion.div>
  );
};

export default FloatingActions;
