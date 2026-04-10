"use client";

import { useState } from "react";

const faqs = [
  {
    category: "Warranty & Support",
    icon: "🛡️",
    question: "What warranty do you provide on phones and tablets?",
    answer:
      "We provide manufacturer-backed warranty coverage that typically ranges from 1 to 2 years depending on the brand and device. Eligible accessories also include warranty support where offered by the manufacturer.",
    tags: ["warranty", "support", "repair"],
  },
  {
    category: "Payment & Financing",
    icon: "💳",
    question: "Do you offer financing options?",
    answer:
      "Yes. We support flexible installment plans, selected bank offers, and seasonal zero-interest promotions for qualifying purchases.",
    tags: ["financing", "payment", "installments"],
  },
  {
    category: "Accessories",
    icon: "🎧",
    question: "Can I bundle accessories with my device purchase?",
    answer:
      "Absolutely. You can pair phones and tablets with chargers, earbuds, power banks, cases, and screen protectors, and we regularly run bundle discounts on popular combinations.",
    tags: ["bundle", "accessories", "offers"],
  },
  {
    category: "Returns & Refunds",
    icon: "↩️",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return window for eligible items in original condition. If there is a verified fault or shipping issue, we will help with replacement or refund support as quickly as possible.",
    tags: ["return", "refund", "policy"],
  },
  {
    category: "Technical Support",
    icon: "🔧",
    question: "Do you provide setup and technical help?",
    answer:
      "Yes. Our team can help with device setup, data transfer guidance, accessory pairing, software troubleshooting, and warranty support through phone, chat, and email.",
    tags: ["support", "technical", "help"],
  },
  {
    category: "Shipping & Delivery",
    icon: "🚚",
    question: "How fast is your delivery?",
    answer:
      "We offer same-day delivery in Colombo for selected items and next-day delivery across many areas island-wide. Orders are securely packed and tracked from dispatch to doorstep.",
    tags: ["delivery", "shipping", "fast"],
  },
  {
    category: "Brands",
    icon: "📦",
    question: "Which brands do you stock?",
    answer:
      "We focus on trusted mobile and accessory brands including Apple, Samsung, Google, Xiaomi, OnePlus, JBL, Belkin, Anker, and more, subject to current availability.",
    tags: ["brands", "devices", "stock"],
  },
  {
    category: "Trade-in",
    icon: "🔄",
    question: "Can I trade in my old phone or tablet?",
    answer:
      "Yes. We accept selected trade-ins for eligible phones and tablets. Device condition, age, and model affect valuation, and credits can be applied toward your next purchase.",
    tags: ["trade-in", "exchange", "upgrade"],
  },
];

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
      className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl -translate-x-48 -translate-y-48 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl translate-x-40 translate-y-40 animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">?</span>
              </div>
              <h2 className="text-5xl lg:text-6xl font-thin text-white">
                Frequently Asked
                <span className="block bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-bold">
                  Questions
                </span>
              </h2>
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mb-6"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about shopping phones, tablets, and
            accessories with TechStore.
          </p>
        </div>

        <div className="relative mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all duration-300 text-lg"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl text-white mb-2">No results found</h3>
              <p className="text-gray-400">Try adjusting your search terms</p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <div
                key={faq.question}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-orange-500/50 hover:bg-white/10 transition-all duration-500 transform hover:scale-[1.02]"
              >
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 transition-opacity duration-500 ${
                    hoveredIndex === index ? "opacity-100" : ""
                  }`}
                ></div>

                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                  className="relative z-10 w-full p-8 text-left flex items-start gap-4 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        openFAQ === index
                          ? "bg-gradient-to-r from-orange-500 to-red-500 scale-110"
                          : "bg-white/10"
                      }`}
                    >
                      <span className="text-2xl">{faq.icon}</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors duration-300 ${
                          openFAQ === index
                            ? "bg-orange-500/20 text-orange-300"
                            : "bg-white/10 text-gray-400"
                        }`}
                      >
                        {faq.category}
                      </span>
                    </div>
                    <h3
                      className={`text-xl font-semibold transition-colors duration-300 ${
                        openFAQ === index
                          ? "text-orange-400"
                          : "text-white group-hover:text-orange-300"
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>
                </button>

                <div
                  className={`relative z-10 overflow-hidden transition-all duration-500 ease-in-out ${
                    openFAQ === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-8 pb-8">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {faq.answer}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {faq.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-20">
          <div className="relative bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm rounded-3xl p-10 border border-orange-500/20 overflow-hidden">
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Our team is here to help you choose the right phone, tablet, or
                accessory for your needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
                <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Call Us Now
                </button>

                <button className="group relative px-8 py-4 border-2 border-white text-white font-bold rounded-2xl overflow-hidden hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                  Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
