"use client";

import { useState, useEffect } from 'react';

const ModernHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Premium Gaming Laptops",
      subtitle: "Unleash your potential with cutting-edge performance",
      emoji: "🎮",
      gradient: "from-purple-600 to-blue-600"
    },
    {
      title: "Professional Workstations", 
      subtitle: "Power through your most demanding projects",
      emoji: "💼",
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      title: "Creative Powerhouses",
      subtitle: "Bring your creative vision to life",
      emoji: "🎨",
      gradient: "from-pink-600 to-purple-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden py-20 mb-16">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Main Content */}
        <div className="mb-12">
          <div className="text-8xl mb-6 animate-bounce">
            {slides[currentSlide].emoji}
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 transition-all duration-1000">
            <span className={`bg-gradient-to-r ${slides[currentSlide].gradient} bg-clip-text text-transparent`}>
              {slides[currentSlide].title}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000">
            {slides[currentSlide].subtitle}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-2xl">
            🛍️ Shop Now
          </button>
          <button className="px-8 py-4 glass border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
            📋 View Catalog
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400 w-8' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="glass p-6 rounded-2xl hover:bg-white/20 transition-all duration-300">
            <div className="text-3xl font-bold text-white mb-2">1000+</div>
            <div className="text-white/70">Premium Products</div>
          </div>
          <div className="glass p-6 rounded-2xl hover:bg-white/20 transition-all duration-300">
            <div className="text-3xl font-bold text-white mb-2">50K+</div>
            <div className="text-white/70">Happy Customers</div>
          </div>
          <div className="glass p-6 rounded-2xl hover:bg-white/20 transition-all duration-300">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/70">Expert Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernHero;