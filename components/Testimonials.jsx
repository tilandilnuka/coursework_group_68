"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Creative Director",
      company: "Design Studio Pro",
      image: "/svgs/hero.png",
      rating: 5,
      category: "Design",
      avatar: "👩‍🎨",
      verified: true,
      text: "The MacBook Pro M3 has completely transformed my workflow. Rendering times are 3x faster, and the display quality is absolutely stunning. Best investment I've made for my business!",
      highlights: ["3x Faster Rendering", "Stunning Display", "Game Changer"],
    },
    {
      name: "Alex Rodriguez",
      role: "Gaming Streamer",
      company: "TwitchGaming",
      image: "/svgs/hero.png",
      rating: 5,
      category: "Gaming",
      avatar: "🎮",
      verified: true,
      text: "This gaming laptop is an absolute beast! RTX 4090 handles everything I throw at it. Stream quality is crystal clear and I'm getting 240fps on all my favorite games.",
      highlights: ["RTX 4090 Power", "240fps Gaming", "Crystal Clear"],
    },
    {
      name: "Dr. Michael Johnson",
      role: "Data Scientist",
      company: "TechCorp AI",
      image: "/svgs/hero.png",
      rating: 5,
      category: "Data Science",
      avatar: "👨‍💻",
      verified: true,
      text: "Processing large datasets used to take hours. Now it's done in minutes. The performance is incredible and the build quality is top-notch. Highly recommended!",
      highlights: ["Lightning Fast", "Top Quality", "Professional"],
    },
    {
      name: "Emma Thompson",
      role: "Video Editor",
      company: "Creative Films",
      image: "/svgs/hero.png",
      rating: 5,
      category: "Video Production",
      avatar: "🎬",
      verified: true,
      text: "4K video editing is now seamless. The color accuracy is perfect for professional work. Customer service was exceptional too. Will definitely buy again!",
      highlights: ["4K Seamless", "Perfect Colors", "Amazing Support"],
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, testimonials.length]);

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl -translate-x-48 -translate-y-48 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl translate-x-40 translate-y-40 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-green-500/5 to-teal-500/5 rounded-full blur-2xl animate-pulse delay-2000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">💬</span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-thin text-white">
                What Our
                <span className="block bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-bold">
                  Customers Say
                </span>
              </h2>
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mb-6"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who've transformed their work
            and gaming experience with our premium laptops
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative mb-16">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 relative overflow-hidden shadow-2xl">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-3xl"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-t-3xl"></div>

            {/* Auto-play controls */}
            <div className="absolute top-6 right-6 flex items-center gap-3">
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isAutoPlay
                    ? "bg-orange-500 text-white"
                    : "bg-white/20 text-gray-300 hover:bg-white/30"
                }`}
              >
                <span className="text-sm">{isAutoPlay ? "⏸️" : "▶️"}</span>
              </button>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              {/* Enhanced Avatar */}
              <div className="relative group">
                <div className="w-36 h-36 rounded-full bg-gradient-to-r from-orange-500 to-red-500 p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center relative overflow-hidden">
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                      {testimonials[activeTestimonial].avatar}
                    </span>
                  </div>
                </div>

                {/* Verification badge */}
                {testimonials[activeTestimonial].verified && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <span className="text-white text-lg">✓</span>
                  </div>
                )}

                {/* Category badge */}
                <div className="absolute -top-2 -left-2 bg-orange-500 px-3 py-1 rounded-full">
                  <span className="text-white text-xs font-bold">
                    {testimonials[activeTestimonial].category}
                  </span>
                </div>
              </div>

              {/* Enhanced Content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Animated Stars */}
                <div className="flex justify-center lg:justify-start mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map(
                    (_, i) => (
                      <span
                        key={i}
                        className="text-orange-400 text-3xl animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        ★
                      </span>
                    )
                  )}
                </div>

                {/* Quote with enhanced styling */}
                <blockquote className="text-2xl lg:text-3xl text-white mb-6 leading-relaxed italic relative">
                  <span className="text-6xl text-orange-500/30 absolute -top-4 -left-2">
                    “
                  </span>
                  {testimonials[activeTestimonial].text}
                  <span className="text-6xl text-orange-500/30 absolute -bottom-8 -right-2">
                    ”
                  </span>
                </blockquote>

                {/* Highlights */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                  {testimonials[activeTestimonial].highlights.map(
                    (highlight, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-orange-500/20 text-orange-300 text-sm rounded-full border border-orange-500/30"
                      >
                        {highlight}
                      </span>
                    )
                  )}
                </div>

                {/* Enhanced Author */}
                <div className="text-center lg:text-left">
                  <div className="font-bold text-2xl text-white mb-1">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-gray-300 text-lg">
                    {testimonials[activeTestimonial].role} at
                    <span className="text-orange-400 font-semibold">
                      {" "}
                      {testimonials[activeTestimonial].company}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => {
                setActiveTestimonial(index);
                setIsAutoPlay(false);
              }}
              className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                index === activeTestimonial
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-2xl scale-105 border-2 border-orange-400"
                  : "bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white border border-white/20 hover:border-orange-500/50"
              }`}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              {/* Glow effect for active card */}
              {index === activeTestimonial && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/30 to-red-500/30 blur-xl scale-110 opacity-75 animate-pulse"></div>
              )}

              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mr-4 transition-all duration-300 ${
                      index === activeTestimonial
                        ? "bg-white/20"
                        : "bg-white/10 group-hover:bg-white/20"
                    }`}
                  >
                    <span
                      className={`text-2xl transition-transform duration-300 ${
                        hoveredCard === index ? "scale-110" : ""
                      }`}
                    >
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div
                      className={`font-bold text-sm transition-colors duration-300 ${
                        index === activeTestimonial
                          ? "text-white"
                          : "text-white group-hover:text-orange-300"
                      }`}
                    >
                      {testimonial.name}
                    </div>
                    <div
                      className={`text-xs transition-colors duration-300 ${
                        index === activeTestimonial
                          ? "text-white/80"
                          : "text-gray-400 group-hover:text-gray-300"
                      }`}
                    >
                      {testimonial.role}
                    </div>
                  </div>

                  {/* Active indicator */}
                  {index === activeTestimonial && (
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  )}
                </div>

                {/* Category badge */}
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 transition-colors duration-300 ${
                    index === activeTestimonial
                      ? "bg-white/20 text-white"
                      : "bg-orange-500/20 text-orange-300"
                  }`}
                >
                  {testimonial.category}
                </div>

                {/* Animated Stars */}
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-sm transition-colors duration-300 ${
                        index === activeTestimonial
                          ? "text-white"
                          : "text-orange-400 group-hover:text-orange-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p
                  className={`text-sm leading-relaxed transition-colors duration-300 ${
                    index === activeTestimonial
                      ? "text-white/90"
                      : "text-gray-300 group-hover:text-white"
                  }`}
                >
                  {testimonial.text.substring(0, 120)}...
                </p>

                {/* Progress indicator for active testimonial */}
                {index === activeTestimonial && isAutoPlay && (
                  <div className="mt-4 w-full bg-white/20 rounded-full h-1">
                    <div
                      className="bg-white h-1 rounded-full animate-pulse"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Stats */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-2">
              Trusted by Industry Leaders
            </h3>
            <p className="text-gray-300">
              Real results from real customers worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="group text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                50K+
              </div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                Happy Customers
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full mt-3">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full group-hover:animate-pulse"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>

            <div className="group text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                99.9%
              </div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                Satisfaction Rate
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full mt-3">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full group-hover:animate-pulse"
                  style={{ width: "99%" }}
                ></div>
              </div>
            </div>

            <div className="group text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                Expert Support
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full mt-3">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full group-hover:animate-pulse"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>

            <div className="group text-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                1000+
              </div>
              <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                Premium Products
              </div>
              <div className="w-full h-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mt-3">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:animate-pulse"
                  style={{ width: "90%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
