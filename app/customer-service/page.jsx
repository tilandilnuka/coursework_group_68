"use client";

import { useState } from "react";

export default function CustomerService() {
  const [activeTab, setActiveTab] = useState("contact");
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "medium",
    category: "general",
    message: "",
  });

  const tabs = [
    { id: "contact", label: "Contact Us", icon: "📞" },
    { id: "faq", label: "FAQs", icon: "❓" },
    { id: "support", label: "Support Ticket", icon: "🎫" },
    { id: "locations", label: "Locations", icon: "📍" },
  ];

  const faqs = [
    {
      question: "How long is the warranty period?",
      answer:
        "Eligible phones, tablets, and selected accessories come with manufacturer warranty ranging from 1-2 years depending on the brand. We also offer extended protection options on selected devices.",
    },
    {
      question: "Do you provide home delivery?",
      answer:
        "Yes, we provide island-wide delivery. Colombo area delivery is within 24 hours, other areas within 2-3 business days.",
    },
    {
      question: "Can I return a product if I'm not satisfied?",
      answer:
        "Yes, we offer a 14-day return policy for eligible unopened items in original packaging. Device activation status and hygiene-sensitive accessories may affect return eligibility.",
    },
    {
      question: "Do you offer installment plans?",
      answer:
        "Yes, we partner with major banks and finance companies to offer flexible payment options from 6-36 months.",
    },
    {
      question: "Is technical support available after purchase?",
      answer:
        "Absolutely! We provide lifetime technical support for all products purchased from us, including software installation and troubleshooting.",
    },
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    console.log("Support ticket submitted:", ticketForm);
    alert(
      "Support ticket submitted successfully! We'll get back to you within 24 hours.",
    );
    setTicketForm({
      name: "",
      email: "",
      subject: "",
      priority: "medium",
      category: "general",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-2 pb-20 px-4 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 mt-32">
          <div className="inline-block p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6 animate-pulse-glow">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-thin mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Customer Service
          </h1>
          <p className="text-xl text-gray-400">
            Dedicated Support for Your Mobile Shopping Needs
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="glass-card rounded-2xl p-2 inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="animate-slideIn">
          {activeTab === "contact" && (
            <div>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 mb-16 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  24/7 Customer Support Available
                </h2>
                <p className="text-xl text-white/90 mb-6">
                  Our expert team is ready to assist you with any questions or
                  concerns
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+94112345678"
                    className="btn-primary bg-white text-black hover:bg-gray-100"
                  >
                    📞 +94 11 234 5678
                  </a>
                  <a
                    href="mailto:support@techstore.lk"
                    className="btn-secondary border-white text-white hover:bg-white hover:text-black"
                  >
                    ✉️ support@techstore.lk
                  </a>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-card rounded-3xl p-8">
                  <h2 className="text-3xl font-thin mb-6 text-orange-500">
                    Contact Methods
                  </h2>
                  <div className="space-y-6">
                    <div className="hover:bg-gray-800 p-4 rounded-xl transition-colors">
                      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        📞 Phone Support
                      </h3>
                      <p className="text-gray-400 mb-2">
                        Hotline: +94 11 234 5678
                      </p>
                      <p className="text-gray-400 mb-2">
                        Mobile: +94 77 123 4567
                      </p>
                      <p className="text-orange-400 text-sm">
                        Available 24/7 for urgent issues
                      </p>
                    </div>
                    <div className="hover:bg-gray-800 p-4 rounded-xl transition-colors">
                      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        ✉️ Email Support
                      </h3>
                      <p className="text-gray-400 mb-2">
                        General: info@techstore.lk
                      </p>
                      <p className="text-gray-400 mb-2">
                        Sales: sales@techstore.lk
                      </p>
                      <p className="text-gray-400 mb-2">
                        Technical: support@techstore.lk
                      </p>
                      <p className="text-orange-400 text-sm">
                        Response within 24 hours
                      </p>
                    </div>
                    <div className="hover:bg-gray-800 p-4 rounded-xl transition-colors">
                      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        💬 Live Chat
                      </h3>
                      <p className="text-gray-400 mb-2">
                        Instant messaging support
                      </p>
                      <p className="text-orange-400 text-sm">
                        Available 24/7 on our website
                      </p>
                    </div>
                    <div className="hover:bg-gray-800 p-4 rounded-xl transition-colors">
                      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        📱 WhatsApp Business
                      </h3>
                      <p className="text-gray-400 mb-2">+94 77 123 4567</p>
                      <p className="text-orange-400 text-sm">
                        Quick responses for urgent queries
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-3xl p-8">
                  <h2 className="text-3xl font-thin mb-6 text-orange-500">
                    Service Hours
                  </h2>
                  <div className="space-y-4">
                    {[
                      { service: "Phone Support", hours: "24/7" },
                      { service: "Live Chat", hours: "24/7" },
                      { service: "Email Response", hours: "Within 24 hours" },
                      { service: "Showroom", hours: "Mon-Sat 9AM-8PM" },
                      { service: "Service Center", hours: "Mon-Sat 9AM-6PM" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between border-b border-gray-800 pb-3 hover:bg-gray-800 p-2 rounded transition-colors"
                      >
                        <span className="text-gray-400">{item.service}</span>
                        <span className="font-semibold text-orange-400">
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "faq" && (
            <div className="space-y-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-gray-400">
                  Find quick answers to common questions
                </p>
              </div>

              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 hover:bg-gray-800 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold mb-3 text-orange-400 flex items-start gap-3">
                    <span className="text-2xl">❓</span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 leading-relaxed pl-11">
                    {faq.answer}
                  </p>
                </div>
              ))}

              <div className="text-center mt-12">
                <p className="text-gray-400 mb-4">
                  Did not find what you&apos;re looking for?
                </p>
                <button
                  onClick={() => setActiveTab("support")}
                  className="btn-primary"
                >
                  Submit a Support Ticket
                </button>
              </div>
            </div>
          )}

          {activeTab === "support" && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Submit Support Ticket
                </h2>
                <p className="text-xl text-gray-400">
                  We will get back to you within 24 hours
                </p>
              </div>

              <form
                onSubmit={handleTicketSubmit}
                className="glass-card rounded-3xl p-8 space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketForm.name}
                      onChange={(e) =>
                        setTicketForm({ ...ticketForm, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={ticketForm.email}
                      onChange={(e) =>
                        setTicketForm({ ...ticketForm, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={ticketForm.subject}
                    onChange={(e) =>
                      setTicketForm({ ...ticketForm, subject: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white transition-colors"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Priority
                    </label>
                    <select
                      value={ticketForm.priority}
                      onChange={(e) =>
                        setTicketForm({
                          ...ticketForm,
                          priority: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white transition-colors"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={ticketForm.category}
                      onChange={(e) =>
                        setTicketForm({
                          ...ticketForm,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white transition-colors"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing & Payment</option>
                      <option value="warranty">Warranty Claim</option>
                      <option value="return">Return & Exchange</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={ticketForm.message}
                    onChange={(e) =>
                      setTicketForm({ ...ticketForm, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-white transition-colors resize-none"
                    placeholder="Please describe your issue in detail..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary text-lg py-4"
                >
                  Submit Support Ticket
                </button>
              </form>
            </div>
          )}

          {activeTab === "locations" && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Visit Our Locations
                </h2>
                <p className="text-xl text-gray-400">
                  Find a store near you for hands-on experience
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Colombo Showroom",
                    address: "123 Galle Road, Colombo 03",
                    phone: "+94 11 234 5678",
                    hours: "Mon-Sat: 9AM-8PM",
                    sunday: "Sunday: 10AM-6PM",
                    features: [
                      "Full Product Range",
                      "Demo Zone",
                      "Expert Consultation",
                    ],
                  },
                  {
                    name: "Kandy Branch",
                    address: "456 Peradeniya Road, Kandy",
                    phone: "+94 81 234 5678",
                    hours: "Mon-Sat: 9AM-7PM",
                    sunday: "Sunday: Closed",
                    features: ["Service Center", "Repairs", "Warranty Support"],
                  },
                  {
                    name: "Galle Store",
                    address: "789 Main Street, Galle",
                    phone: "+94 91 234 5678",
                    hours: "Mon-Sat: 9AM-7PM",
                    sunday: "Sunday: Closed",
                    features: [
                      "Sales & Support",
                      "Home Delivery",
                      "Installation",
                    ],
                  },
                ].map((location, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-3xl p-8 hover:scale-105 transition-transform duration-300"
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📍</span>
                      </div>
                      <h3 className="text-2xl font-bold text-orange-400 mb-2">
                        {location.name}
                      </h3>
                    </div>

                    <div className="space-y-4 text-center">
                      <div>
                        <p className="text-gray-300 mb-2">{location.address}</p>
                        <a
                          href={`tel:${location.phone}`}
                          className="text-orange-400 hover:text-orange-300 transition-colors"
                        >
                          {location.phone}
                        </a>
                      </div>

                      <div className="border-t border-gray-700 pt-4">
                        <p className="text-gray-300 mb-1">{location.hours}</p>
                        <p className="text-gray-400 text-sm">
                          {location.sunday}
                        </p>
                      </div>

                      <div className="border-t border-gray-700 pt-4">
                        <h4 className="font-semibold text-white mb-2">
                          Services
                        </h4>
                        <div className="space-y-1">
                          {location.features.map((feature, idx) => (
                            <p key={idx} className="text-sm text-gray-400">
                              ✓ {feature}
                            </p>
                          ))}
                        </div>
                      </div>

                      <button className="w-full mt-4 btn-secondary">
                        Get Directions
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card rounded-3xl p-8 mt-12">
                <h3 className="text-3xl font-thin mb-6 text-orange-500 text-center">
                  Our Services
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: "🛒",
                      title: "Pre-Sales Support",
                      services: [
                        "Product recommendations",
                        "Specification comparisons",
                        "Price quotations",
                        "Customization options",
                        "Bulk order inquiries",
                      ],
                    },
                    {
                      icon: "📦",
                      title: "Order Support",
                      services: [
                        "Order tracking",
                        "Delivery updates",
                        "Order modifications",
                        "Payment assistance",
                        "Invoice requests",
                      ],
                    },
                    {
                      icon: "🔧",
                      title: "After-Sales Support",
                      services: [
                        "Technical troubleshooting",
                        "Warranty claims",
                        "Returns & exchanges",
                        "Repair services",
                        "Upgrade consultations",
                      ],
                    },
                  ].map((service, index) => (
                    <div
                      key={index}
                      className="bg-black rounded-2xl p-6 hover:bg-gray-800 transition-colors"
                    >
                      <div className="text-4xl mb-4 text-center">
                        {service.icon}
                      </div>
                      <h4 className="text-xl font-semibold mb-4 text-center text-orange-400">
                        {service.title}
                      </h4>
                      <ul className="text-gray-400 space-y-2 text-sm">
                        {service.services.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-orange-500">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-3xl p-8 mt-12">
                <h3 className="text-3xl font-thin mb-6 text-orange-500 text-center">
                  Customer Satisfaction Guarantee
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold mb-6 text-center text-orange-400">
                      Our Commitment
                    </h4>
                    <ul className="text-gray-300 space-y-3">
                      {[
                        "100% genuine products from authorized distributors",
                        "Transparent pricing with no hidden charges",
                        "Professional and courteous service",
                        "Fast response times to all inquiries",
                        "Expert technical knowledge and guidance",
                        "Hassle-free returns and exchanges",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <span className="text-green-400 text-xl">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-6 text-center text-orange-400">
                      Quality Assurance
                    </h4>
                    <ul className="text-gray-300 space-y-3">
                      {[
                        "All products tested before delivery",
                        "Secure packaging for safe transport",
                        "Comprehensive warranty coverage",
                        "Free setup assistance available",
                        "Regular follow-up after purchase",
                        "Lifetime technical support",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <span className="text-green-400 text-xl">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
