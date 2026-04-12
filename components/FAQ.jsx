"use client";

import { useState } from "react";
import Link from "next/link";

const BRAND_ACCENT = "#f97316";

function IconShield() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconCreditCard() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}
function IconPackage() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect x="1" y="3" width="22" height="5" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  );
}
function IconRefresh() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-3.5" />
    </svg>
  );
}
function IconTool() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
function IconTruck() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}
function IconGrid() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function IconArrowSwap() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function IconChevron({ open }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 350ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function IconMessageCircle() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

const faqs = [
  {
    category: "Warranty & Support",
    Icon: IconShield,
    question: "What warranty do you provide on phones and tablets?",
    answer:
      "We provide manufacturer-backed warranty coverage that typically ranges from 1 to 2 years depending on the brand and device. Eligible accessories also include warranty support where offered by the manufacturer.",
    tags: ["warranty", "support", "repair"],
  },
  {
    category: "Payment & Financing",
    Icon: IconCreditCard,
    question: "Do you offer financing options?",
    answer:
      "Yes. We support flexible installment plans, selected bank offers, and seasonal zero-interest promotions for qualifying purchases.",
    tags: ["financing", "payment", "installments"],
  },
  {
    category: "Accessories",
    Icon: IconPackage,
    question: "Can I bundle accessories with my device purchase?",
    answer:
      "Absolutely. You can pair phones and tablets with chargers, earbuds, power banks, cases, and screen protectors, and we regularly run bundle discounts on popular combinations.",
    tags: ["bundle", "accessories", "offers"],
  },
  {
    category: "Returns & Refunds",
    Icon: IconRefresh,
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return window for eligible items in original condition. If there is a verified fault or shipping issue, we will help with replacement or refund support as quickly as possible.",
    tags: ["return", "refund", "policy"],
  },
  {
    category: "Technical Support",
    Icon: IconTool,
    question: "Do you provide setup and technical help?",
    answer:
      "Yes. Our team can help with device setup, data transfer guidance, accessory pairing, software troubleshooting, and warranty support through phone, chat, and email.",
    tags: ["support", "technical", "help"],
  },
  {
    category: "Shipping & Delivery",
    Icon: IconTruck,
    question: "How fast is your delivery?",
    answer:
      "We offer same-day delivery in Colombo for selected items and next-day delivery across many areas island-wide. Orders are securely packed and tracked from dispatch to doorstep.",
    tags: ["delivery", "shipping", "fast"],
  },
  {
    category: "Brands",
    Icon: IconGrid,
    question: "Which brands do you stock?",
    answer:
      "We focus on trusted mobile and accessory brands including Apple, Samsung, Google, Xiaomi, OnePlus, JBL, Belkin, Anker, and more, subject to current availability.",
    tags: ["brands", "devices", "stock"],
  },
  {
    category: "Trade-in",
    Icon: IconArrowSwap,
    question: "Can I trade in my old phone or tablet?",
    answer:
      "Yes. We accept selected trade-ins for eligible phones and tablets. Device condition, age, and model affect valuation, and credits can be applied toward your next purchase.",
    tags: ["trade-in", "exchange", "upgrade"],
  },
];

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <section
      id="faq"
      className="relative py-24 bg-gradient-to-b from-gray-950 to-black overflow-hidden antialiased"
    >
      <div
        className="pointer-events-none absolute -top-64 -right-48 w-[560px] h-[560px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #f97316, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #f97316, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="flex flex-col items-center text-center space-y-5 mb-14">
          <div
            className="inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-[0.18em]"
            style={{
              color: BRAND_ACCENT,
              borderColor: `${BRAND_ACCENT}40`,
              background: `${BRAND_ACCENT}12`,
            }}
          >
            Support Centre
          </div>

          <h2 className="text-4xl lg:text-5xl font-extralight leading-[1.1] tracking-tight text-white">
            Frequently asked
            <br />
            <span className="font-semibold text-white">questions</span>
          </h2>

          <p className="text-base text-white/50 max-w-xl leading-relaxed">
            Everything you need to know about shopping phones, tablets, and
            accessories with TechStore.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto mb-10">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none">
            <IconSearch />
          </div>
          <input
            id="faq-search"
            type="text"
            placeholder="Search questions…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-5 py-3.5 bg-white/[0.04] border border-white/[0.10] rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.06] transition-all duration-250"
          />
        </div>

        <div className="space-y-2">
          {filteredFAQs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-4 text-white/25">
                <IconSearch />
              </div>
              <p className="text-white/50 text-sm">
                No results for &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-white/30 text-xs mt-1">
                Try a different keyword
              </p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => {
              const isOpen = openFAQ === index;
              const { Icon } = faq;

              return (
                <div
                  key={faq.question}
                  className={[
                    "rounded-2xl border transition-all duration-300",
                    isOpen
                      ? "bg-white/[0.05] border-white/[0.14]"
                      : "bg-white/[0.025] border-white/[0.07] hover:bg-white/[0.04] hover:border-white/[0.11]",
                  ].join(" ")}
                >
                  <button
                    id={`faq-item-${index}`}
                    aria-expanded={isOpen}
                    onClick={() => setOpenFAQ(isOpen ? -1 : index)}
                    className="w-full flex items-center gap-4 px-5 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 rounded-2xl"
                  >
                    <div
                      className={[
                        "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300",
                        isOpen
                          ? "bg-orange-500/15 border-orange-500/30 text-orange-400"
                          : "bg-white/[0.05] border-white/[0.09] text-white/35 group-hover:text-white/55",
                      ].join(" ")}
                    >
                      <Icon />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span
                        className={[
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.14em] mb-1.5 transition-colors duration-300",
                          isOpen
                            ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                            : "bg-white/[0.05] text-white/35 border border-white/[0.08]",
                        ].join(" ")}
                      >
                        {faq.category}
                      </span>

                      <p
                        className={[
                          "text-base font-medium leading-snug transition-colors duration-300",
                          isOpen ? "text-white" : "text-white/75",
                        ].join(" ")}
                      >
                        {faq.question}
                      </p>
                    </div>

                    <div
                      className={[
                        "flex-shrink-0 transition-colors duration-300",
                        isOpen ? "text-orange-400" : "text-white/25",
                      ].join(" ")}
                    >
                      <IconChevron open={isOpen} />
                    </div>
                  </button>

                  <div
                    className="overflow-hidden"
                    style={{
                      maxHeight: isOpen ? "500px" : "0px",
                      opacity: isOpen ? 1 : 0,
                      transition:
                        "max-height 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease",
                    }}
                  >
                    <div className="mx-5 h-px bg-white/[0.07]" />

                    <div className="px-5 pt-5 pb-6">
                      <p className="text-white/60 text-sm leading-relaxed mb-4">
                        {faq.answer}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {faq.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-orange-500/10 text-orange-300/80 border border-orange-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-16 rounded-2xl border border-white/[0.08] bg-white/[0.025] overflow-hidden">
          <div
            className="h-px w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${BRAND_ACCENT}55, transparent)`,
            }}
          />

          <div className="px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <div
              className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border"
              style={{
                background: `${BRAND_ACCENT}14`,
                borderColor: `${BRAND_ACCENT}30`,
                color: BRAND_ACCENT,
              }}
            >
              <IconMessageCircle />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white text-lg font-semibold mb-1">
                Still have questions?
              </p>
              <p className="text-white/45 text-sm leading-relaxed">
                Our team is available via phone, chat, and email to help you
                find the right device.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                id="faq-cta-shop"
                href="/support"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-xl transition-all duration-200"
                style={{ boxShadow: "0 8px 32px #f9731630" }}
              >
                <IconPhone />
                Call Us
              </Link>
              <Link
                id="faq-cta-support"
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium text-white/50 border border-white/[0.1] hover:text-white hover:border-white/25 hover:bg-white/[0.05] transition-all duration-300"
              >
                <IconMail />
                Send a message
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
