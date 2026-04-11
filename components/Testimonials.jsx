"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Nadeesha Perera",
    role: "Content Creator",
    company: "Studio South",
    rating: 5,
    category: "Mobile Phones",
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
    verified: true,
    text: "The team helped me choose devices for both work and personal use without overselling. Clear advice, fair pricing, and really solid after-sales support.",
    highlights: ["Helpful Advice", "Fair Pricing", "After-Sales Support"],
  },
];

const AUTOPLAY_DURATION = 5000;

function initials(name) {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <rect x="1" y="1" width="3.5" height="10" rx="1" />
      <rect x="7.5" y="1" width="3.5" height="10" rx="1" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M2 1.5l9 4.5-9 4.5V1.5z" />
    </svg>
  );
}

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isAutoPlay) {
      cancelAnimationFrame(rafRef.current);
      setProgress(0);
      return;
    }

    setProgress(0);
    startTimeRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startTimeRef.current;
      const pct = Math.min((elapsed / AUTOPLAY_DURATION) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setActive((prev) => (prev + 1) % testimonials.length);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isAutoPlay, active]);

  const selectSlide = (index) => {
    setActive(index);
    setIsAutoPlay(false);
    setProgress(0);
  };

  const t = testimonials[active];

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-950 to-black overflow-hidden">
      <div
        className="pointer-events-none absolute -top-64 -left-64 w-[640px] h-[640px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #f97316, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-64 -right-64 w-[560px] h-[560px] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #fb923c, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <div
            className="inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-[0.18em] mb-4"
            style={{
              color: "#f97316",
              borderColor: "#f9731640",
              background: "#f9731612",
            }}
          >
            Customer Stories
          </div>
          <h2 className="text-4xl lg:text-5xl font-semibold text-white leading-tight">
            Trusted by thousands
            <br />
            <span className="text-gray-400 font-light">across Sri Lanka.</span>
          </h2>
        </div>

        <div className="mb-10 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm overflow-hidden">
          <div className="h-[2px] bg-white/10 w-full">
            <div
              className="h-full bg-orange-500 transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-8 lg:p-12 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            <div className="flex-shrink-0 flex flex-col items-center lg:items-start gap-6 lg:w-48">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-orange-400 tracking-tight select-none">
                    {initials(t.name)}
                  </span>
                </div>
                {t.verified && (
                  <div
                    title="Verified purchase"
                    className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center shadow-md shadow-orange-900/40"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2 2 4-4"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div>
                <p className="font-semibold text-white text-base leading-tight">
                  {t.name}
                </p>
                <p className="text-sm text-gray-400 mt-0.5">{t.role}</p>
                <p className="text-xs text-orange-500/80 mt-0.5 font-medium">
                  {t.company}
                </p>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 text-gray-400 bg-white/[0.04]">
                {t.category}
              </span>
              <button
                onClick={() => setIsAutoPlay((v) => !v)}
                aria-label={isAutoPlay ? "Pause autoplay" : "Resume autoplay"}
                className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200 mt-auto"
              >
                <span className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center">
                  {isAutoPlay ? <PauseIcon /> : <PlayIcon />}
                </span>
                <span>{isAutoPlay ? "Pause" : "Play"}</span>
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex gap-0.5 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4 4.3 12.3l.7-4.1-3-2.9 4.2-.7L8 1z"
                      fill="#f97316"
                    />
                  </svg>
                ))}
              </div>

              <blockquote className="text-xl lg:text-2xl text-white font-light leading-relaxed mb-8">
                <span className="text-orange-500/40 text-5xl font-serif leading-none select-none mr-1">
                  &ldquo;
                </span>
                {t.text}
                <span className="text-orange-500/40 text-5xl font-serif leading-none select-none mr-1">
                  &rdquo;
                </span>
              </blockquote>

              <div className="flex flex-wrap gap-2">
                {t.highlights.map((h) => (
                  <span
                    key={h}
                    className="px-3 py-1.5 text-xs font-medium rounded-md bg-orange-500/10 text-orange-300 border border-orange-500/20"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {testimonials.map((testimonial, index) => {
            const isActive = index === active;
            return (
              <button
                key={testimonial.name}
                onClick={() => selectSlide(index)}
                className={[
                  "text-left p-5 rounded-xl border transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60",
                  isActive
                    ? "border-orange-500/40 bg-orange-500/10"
                    : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15",
                ].join(" ")}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={[
                      "w-9 h-9 rounded-lg flex items-center justify-center text-xs font-semibold shrink-0",
                      isActive
                        ? "bg-orange-500/20 text-orange-300"
                        : "bg-white/[0.06] text-gray-400 group-hover:text-gray-300",
                    ].join(" ")}
                  >
                    {initials(testimonial.name)}
                  </div>
                  <div className="min-w-0">
                    <p
                      className={[
                        "text-xs font-semibold truncate leading-tight",
                        isActive ? "text-white" : "text-gray-300",
                      ].join(" ")}
                    >
                      {testimonial.name}
                    </p>
                    <p className="text-[11px] text-gray-500 truncate">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <p
                  className={[
                    "text-xs leading-relaxed line-clamp-3",
                    isActive
                      ? "text-gray-200"
                      : "text-gray-500 group-hover:text-gray-400",
                  ].join(" ")}
                >
                  {testimonial.text}
                </p>

                {isActive && (
                  <div className="mt-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
                    <span className="text-[10px] text-orange-500/70 font-medium">
                      Viewing
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
