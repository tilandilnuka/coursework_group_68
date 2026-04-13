"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORIES = [
  {
    eyebrow: "Just Arrived",
    headline: "Galaxy S26 Ultra",
    subhead: "Big-screen power that still fits in your pocket.",
    body: "A flagship camera, all-day battery life, and a vivid AMOLED display make this the kind of phone that handles work, gaming, and content creation without compromise.",
    tag: "Starting from Rs. 360,000",
    cta: {
      label: "Shop Flagship Phones",
      href: "/products/allProducts?category=mobile%20phones",
    },
    image:
      "https://images.unsplash.com/photo-1772182137994-4158ac33bddd?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    accentFrom: "#f97316",
    accentTo: "#dc2626",
    specs: ["200 MP Camera", "120 Hz AMOLED", "5000 mAh Battery"],
  },
  {
    eyebrow: "For Productivity",
    headline: "iPad Air M3",
    subhead: "Sketch, stream, study, and ship work anywhere.",
    body: "Pair a responsive tablet display with stylus support and a lightweight body, and you have a daily driver built for notes, meetings, and creative work on the move.",
    tag: "Starting from Rs. 199,900",
    cta: {
      label: "Explore Tablets",
      href: "/products/allProducts?category=tablets",
    },
    image:
      "https://images.unsplash.com/photo-1607452258545-943d7243463c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    accentFrom: "#f97316",
    accentTo: "#dc2626",
    specs: ["11-inch Display", "Stylus Ready", "Wi-Fi + Cellular"],
  },
  {
    eyebrow: "Audio Essentials",
    headline: "Wireless Earbuds",
    subhead: "Pocket-sized sound with everyday convenience.",
    body: "Noise cancellation, long battery life, and a compact charging case make these the go-to accessory for commuting, workouts, and calls on the go.",
    tag: "Starting from Rs. 24,900",
    cta: {
      label: "View Accessories",
      href: "/products/allProducts?category=accessories",
    },
    image:
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=900&h=700&fit=crop",
    accentFrom: "#f97316",
    accentTo: "#dc2626",
    specs: ["ANC Audio", "24-hour Playback", "USB-C Charging"],
  },
  {
    eyebrow: "Power On",
    headline: "Fast Chargers",
    subhead: "Reliable power for every device in your bag.",
    body: "From GaN wall adapters to travel-ready power banks, our accessory lineup keeps phones and tablets charged at home, at work, and on the move.",
    tag: "Starting from Rs. 8,900",
    cta: {
      label: "Discover Chargers",
      href: "/products/allProducts?category=accessories",
    },
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=900&h=700&fit=crop",
    accentFrom: "#f97316",
    accentTo: "#dc2626",
    specs: ["65 W Fast Charge", "Travel Ready", "USB-C Compatible"],
  },
];

const STATS = [
  { value: "10K+", label: "Customers" },
  { value: "3", label: "Core Categories" },
  { value: "99%", label: "Satisfaction" },
  { value: "24/7", label: "Support" },
];

const PhoneLogo = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zm5 13h.01"
    />
  </svg>
);

const WowHero = () => {
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStory((current) => (current + 1) % STORIES.length);
    }, 6000);

    return () => clearInterval(id);
  }, []);

  const story = STORIES[activeStory];

  return (
    <div className="relative min-h-screen bg-[#080808] overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 65% 40%, ${story.accentFrom}18 0%, transparent 70%)`,
        }}
      />

      <main className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 max-w-[1440px] mx-auto w-full px-6 sm:px-10 pt-[96px] pb-12 flex flex-col lg:grid lg:grid-cols-[1fr_1fr] lg:gap-10 items-stretch">
          <div className="flex flex-col justify-center order-2 lg:order-1 mt-8 lg:mt-0">
            <div className="inline-flex items-center gap-2 mb-6 self-start">
              <span
                className="px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full border"
                style={{
                  color: story.accentFrom,
                  borderColor: `${story.accentFrom}40`,
                  background: `${story.accentFrom}12`,
                }}
              >
                {story.eyebrow}
              </span>
            </div>

            <h1 className="text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] font-extralight leading-[1.05] tracking-tight text-white mb-4">
              {story.headline}
            </h1>

            <p className="text-xl sm:text-2xl font-light text-white/60 mb-5 leading-snug">
              {story.subhead}
            </p>

            <p className="text-base text-white/45 leading-relaxed max-w-[480px] mb-8">
              {story.body}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {story.specs.map((spec) => (
                <span
                  key={spec}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 bg-white/[0.06] border border-white/[0.08]"
                >
                  {spec}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href={story.cta.href}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-xl transition-all duration-200"
                style={{ boxShadow: `0 8px 32px ${story.accentFrom}30` }}
              >
                {story.cta.label}
              </Link>
              <Link
                href="#discover"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium text-white/50 border border-white/[0.1] hover:text-white hover:border-white/25 hover:bg-white/[0.05] transition-all duration-300"
              >
                Browse all products
              </Link>
            </div>

            <p className="mt-5 text-xs text-white/25 font-medium tracking-wide">
              {story.tag}
            </p>
          </div>

          <div className="relative flex items-center justify-center order-1 lg:order-2 w-full min-h-[420px] lg:min-h-0">
            <div
              className="absolute inset-[-2px] rounded-3xl transition-all duration-1000 blur-2xl opacity-40"
              style={{
                background: `radial-gradient(ellipse at 50% 60%, ${story.accentFrom}55 0%, ${story.accentTo}22 55%, transparent 80%)`,
              }}
            />

            <div
              className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: `linear-gradient(145deg, ${story.accentFrom}14, #111 60%, ${story.accentTo}0a)`,
                border: `1px solid ${story.accentFrom}30`,
                boxShadow: `0 0 0 1px ${story.accentFrom}10, 0 32px 80px -20px ${story.accentFrom}35, inset 0 1px 0 ${story.accentFrom}20`,
                minHeight: "460px",
              }}
            >
              {STORIES.map((s, i) => (
                <img
                  key={s.headline}
                  src={s.image}
                  alt={s.headline}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-opacity duration-700"
                  style={{ opacity: i === activeStory ? 1 : 0 }}
                />
              ))}

              <div
                className="absolute bottom-0 inset-x-0 px-6 py-5 flex items-end justify-between gap-4"
                style={{
                  background: `linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)`,
                  backdropFilter: "blur(2px)",
                }}
              >
                <div>
                  <p
                    className="text-[11px] font-semibold tracking-widest uppercase mb-1"
                    style={{ color: story.accentFrom }}
                  >
                    {story.eyebrow}
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {story.tag}
                  </p>
                </div>
                <Link
                  href={story.cta.href}
                  className="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 transition-all duration-200"
                  style={{ boxShadow: `0 4px 16px ${story.accentFrom}40` }}
                >
                  {story.cta.label}
                </Link>
                <div className="absolute bottom-20 left-4 hidden sm:flex items-center gap-3 bg-black/40 backdrop-blur-xl border border-white/[0.12] rounded-2xl px-4 py-3 shadow-2xl z-10">
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-xl shrink-0"
                    style={{ background: `${story.accentFrom}22` }}
                  >
                    <PhoneLogo className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-white">
                      Free Delivery
                    </div>
                    <div className="text-[11px] text-white/50">
                      Orders above Rs. 50,000
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto w-full px-6 sm:px-10 pb-16 flex flex-col gap-10">
          <div className="flex items-center gap-3 flex-wrap">
            {STORIES.map((item, index) => (
              <button
                key={item.headline}
                onClick={() => setActiveStory(index)}
                aria-label={`View story: ${item.headline}`}
                className="group flex items-center gap-3 transition-all duration-300"
              >
                <span
                  className="relative h-[2px] rounded-full overflow-hidden bg-white/[0.12] transition-all duration-300"
                  style={{ width: index === activeStory ? 48 : 16 }}
                >
                  {index === activeStory && (
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{ background: story.accentFrom }}
                    />
                  )}
                </span>
                <span
                  className={`hidden sm:block text-xs font-medium transition-colors duration-300 ${
                    index === activeStory
                      ? "text-white"
                      : "text-white/25 group-hover:text-white/50"
                  }`}
                >
                  {item.headline}
                </span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center py-6 px-4 bg-[#080808] hover:bg-white/[0.03] transition-colors duration-300"
              >
                <span
                  className="text-2xl sm:text-3xl font-bold tracking-tight"
                  style={{ color: story.accentFrom }}
                >
                  {value}
                </span>
                <span className="text-xs text-white/35 font-medium mt-1">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WowHero;
