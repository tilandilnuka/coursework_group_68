"use client";

import { useState } from "react";

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const faqs = [
    {
      category: "Warranty & Support",
      icon: "🛡️",
      question: "What warranty do you provide on laptops?",
      answer:
        "We provide comprehensive warranty coverage ranging from 1-3 years depending on the product. All laptops come with manufacturer warranty plus our extended service guarantee. We also offer on-site repair services for premium models.",
      tags: ["warranty", "support", "repair"],
    },
    {
      category: "Payment & Financing",
      icon: "💳",
      question: "Do you offer financing options?",
      answer:
        "Yes! We offer flexible financing options including 0% interest for 12 months, installment plans, and corporate leasing programs. You can apply online and get instant approval for qualified customers.",
      tags: ["financing", "payment", "installments"],
    },
    {
      category: "Customization",
      icon: "⚙️",
      question: "Can I customize my laptop configuration?",
      answer:
        "Absolutely! We offer extensive customization options including RAM upgrades, storage expansion, graphics card selection, and display options. Our experts will help you build the perfect machine for your needs.",
      tags: ["custom", "configuration", "upgrade"],
    },
    {
      category: "Returns & Refunds",
      icon: "↩️",
      question: "What's your return policy?",
      answer:
        "We offer a 30-day hassle-free return policy. If you're not completely satisfied, return your laptop in original condition for a full refund. We also provide free return shipping for defective products.",
      tags: ["return", "refund", "policy"],
    },
    {
      category: "Technical Support",
      icon: "🔧",
      question: "Do you provide technical support?",
      answer:
        "Yes, we provide 24/7 technical support through phone, chat, and email. Our certified technicians can help with setup, troubleshooting, and maintenance. Premium customers get priority support with dedicated account managers.",
      tags: ["support", "technical", "help"],
    },
    {
      category: "Shipping & Delivery",
      icon: "🚚",
      question: "How fast is your delivery?",
      answer:
        "We offer same-day delivery in Colombo and next-day delivery island-wide. Express shipping is available for urgent orders. All products are carefully packaged and insured during transit.",
      tags: ["delivery", "shipping", "fast"],
    },
    {
      category: "Service & Repair",
      icon: "🔧",
      question: "Do you service other brands?",
      answer:
        "Yes, our certified service center handles repairs and maintenance for all major laptop brands including Apple, Dell, HP, Lenovo, ASUS, and more. We use genuine parts and provide service warranties.",
      tags: ["service", "repair", "brands"],
    },
    {
      category: "Trade-in",
      icon: "🔄",
      question: "Can I trade in my old laptop?",
      answer:
        "Absolutely! We offer competitive trade-in values for your old laptops. Get instant quotes online or visit our showroom for evaluation. Trade-in credits can be applied toward your new purchase.",
      tags: ["trade-in", "old laptop", "exchange"],
    },
  ];

  // Filter FAQs based on search query
  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <section
      id="faq"
      className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl -translate-x-48 -translate-y-48 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl translate-x-40 translate-y-40 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-green-500/5 to-teal-500/5 rounded-full blur-2xl animate-pulse delay-2000"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">❓</span>
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
            Everything you need to know about our products and services. Can't
            find what you're looking for? Feel free to reach out!
          </p>
        </div>

        {/* Search Bar */}
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
          {searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <p className="text-sm text-gray-400">
                Found {filteredFAQs.length} result
                {filteredFAQs.length !== 1 ? "s" : ""} for "{searchQuery}"
              </p>
            </div>
          )}
        </div>

        {/* FAQ Items */}
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
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-orange-500/50 hover:bg-white/10 transition-all duration-500 transform hover:scale-[1.02]"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                {/* Glow effect */}
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

                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        openFAQ === index
                          ? "bg-orange-500 rotate-45"
                          : "bg-white/10 group-hover:bg-white/20"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            openFAQ === index
                              ? "M6 18L18 6M6 6l12 12"
                              : "M12 4v16m8-8H4"
                          }
                        />
                      </svg>
                    </div>
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
                        {faq.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
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

        {/* Contact CTA */}
        <div className="mt-20">
          <div className="relative bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm rounded-3xl p-10 border border-orange-500/20 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-3xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Still have questions?
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Our expert team is here to help you find the perfect laptop and
                answer any questions you might have.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
                <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-xl group-hover:animate-bounce">
                      📞
                    </span>
                    <span>Call Us Now</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button className="group relative px-8 py-4 border-2 border-white text-white font-bold rounded-2xl overflow-hidden hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-xl group-hover:animate-pulse">
                      💬
                    </span>
                    <span>Live Chat</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400 mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-gray-400">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400 mb-1">
                    &lt;5min
                  </div>
                  <div className="text-sm text-gray-400">Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400 mb-1">
                    100+
                  </div>
                  <div className="text-sm text-gray-400">Experts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
