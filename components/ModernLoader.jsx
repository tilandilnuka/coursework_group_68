"use client";

const ModernLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center glass">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="text-4xl font-bold animate-pulse">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Laptop.LK
            </span>
          </div>
        </div>
        
        {/* Modern Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-transparent border-t-pink-500 rounded-full animate-spin animation-delay-150"></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-white/80 text-lg font-medium">
          Loading premium products...
        </p>
        
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-400"></div>
        </div>
      </div>
    </div>
  );
};

export default ModernLoader;