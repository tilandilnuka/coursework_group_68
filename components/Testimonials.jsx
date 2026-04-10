"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Nadeesha Perera",
    role: "Content Creator",
    company: "Studio South",
    rating: 5,
    category: "Mobile Phones",
    avatar: "📱",
    verified: true,
    text: "My new flagship phone handles filming, editing, and posting in one place. The camera quality is excellent, the battery lasts all day, and delivery was faster than expected.",
    highlights: ["Excellent Camera", "All-Day Battery", "Fast Delivery"],
  },
  {
    name: "Amal Fernando",
    role: "University Student",
    company: "Colombo Campus",
    rating: 5,
    category: "Tablets",
    avatar: "📲",
    verified: true,
    text: "The tablet I bought from TechStore is perfect for notes, reading, and streaming. It is light enough to carry everywhere and powerful enough for my daily workload.",
    highlights: ["Lightweight", "Great for Notes", "Smooth Performance"],
  },
  {
    name: "Sajini Wickramasinghe",
    role: "Marketing Manager",
    company: "Pulse Media",
    rating: 5,
    category: "Accessories",
    avatar: "🎧",
    verified: true,
    text: "I added a fast charger and wireless earbuds to my order and both have been brilliant. Everything feels genuine, well packed, and ready to use right away.",
    highlights: ["Genuine Products", "Well Packed", "Great Value"],
  },
  {
    name: "Yusuf Rahman",
    role: "Small Business Owner",
    company: "Rahman Retail",
    rating: 5,
    category: "Mobile Upgrade",
    avatar: "⚡",
    verified: true,
    text: "The team helped me choose devices for both work and personal use without overselling. Clear advice, fair pricing, and really solid after-sales support.",
    highlights: ["Helpful Advice", "Fair Pricing", "After-Sales Support"],
  },
];

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    if (!isAutoPlay) {
      return;
    }

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl -translate-x-48 -translate-y-48 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl translate-x-40 translate-y-40 animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
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
            From flagship phones to daily essentials, customers trust us for
            genuine devices, fast delivery, and dependable support.
          </p>
        </div>

        <div className="relative mb-16">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-3xl"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-t-3xl"></div>

            <div className="absolute top-6 right-6 flex items-center gap-3">
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  isAutoPlay
                    ? "bg-orange-500 text-white"
                    : "bg-white/20 text-gray-300 hover:bg-white/30"
                }`}
              >
                <span className="text-sm">{isAutoPlay ? "Pause" : "Play"}</span>
              </button>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              <div className="relative group">
                <div className="w-36 h-36 rounded-full bg-gradient-to-r from-orange-500 to-red-500 p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center relative overflow-hidden">
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                      {testimonials[activeTestimonial].avatar}
                    </span>
                  </div>
                </div>

                {testimonials[activeTestimonial].verified && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <span className="text-white text-lg">✓</span>
                  </div>
                )}

                <div className="absolute -top-2 -left-2 bg-orange-500 px-3 py-1 rounded-full">
                  <span className="text-white text-xs font-bold">
                    {testimonials[activeTestimonial].category}
                  </span>
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <div className="flex justify-center lg:justify-start mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <span
                      key={i}
                      className="text-orange-400 text-3xl animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <blockquote className="text-2xl lg:text-3xl text-white mb-6 leading-relaxed italic relative">
                  <span className="text-6xl text-orange-500/30 absolute -top-4 -left-2">
                    &ldquo;
                  </span>
                  {testimonials[activeTestimonial].text}
                  <span className="text-6xl text-orange-500/30 absolute -bottom-8 -right-2">
                    &rdquo;
                  </span>
                </blockquote>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                  {testimonials[activeTestimonial].highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-4 py-2 bg-orange-500/20 text-orange-300 text-sm rounded-full border border-orange-500/30"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
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
                </div>

                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 transition-colors duration-300 ${
                    index === activeTestimonial
                      ? "bg-white/20 text-white"
                      : "bg-orange-500/20 text-orange-300"
                  }`}
                >
                  {testimonial.category}
                </div>

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
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-2">
              Built on Trust
            </h3>
            <p className="text-gray-300">
              Real feedback from customers shopping our mobile-first catalog.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-white/5">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                99.9%
              </div>
              <div className="text-gray-300">Satisfaction Rate</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-gray-300">Expert Support</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                1000+
              </div>
              <div className="text-gray-300">Premium Products</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
