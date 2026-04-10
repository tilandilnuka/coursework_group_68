"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function About() {
  const [activeTab, setActiveTab] = useState("story");
  const router = useRouter();

  const teamMembers = [
    {
      name: "Rajesh Patel",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "15+ years in tech industry",
    },
    {
      name: "Priya Silva",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Expert in enterprise solutions",
    },
    {
      name: "Kumar Fernando",
      role: "Head of Sales",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Customer satisfaction specialist",
    },
    {
      name: "Anjali Perera",
      role: "Marketing Director",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Digital marketing innovator",
    },
  ];

  const milestones = [
    { year: "2015", event: "Founded TechStore in Colombo", icon: "🏢" },
    { year: "2017", event: "Opened second branch in Kandy", icon: "🏪" },
    { year: "2019", event: "Launched online platform", icon: "💻" },
    { year: "2021", event: "Reached 25,000 customers", icon: "🎉" },
    { year: "2023", event: "Expanded to Galle & Negombo", icon: "🌟" },
    { year: "2024", event: "50,000+ satisfied customers", icon: "🚀" },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-2 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 mt-32">
          <div className="inline-block p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6">
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h1 className="text-6xl font-thin mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            About TechStore
          </h1>
          <p className="text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Sri Lanka's Premier Technology Destination - Empowering Innovation
            Since 2015
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="bg-gray-900 rounded-2xl p-2 border border-gray-800">
            {["story", "mission", "team", "timeline"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                {tab === "story"
                  ? "📖 Our Story"
                  : tab === "mission"
                    ? "🎯 Mission & Vision"
                    : tab === "team"
                      ? "👥 Our Team"
                      : "📅 Timeline"}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "story" && (
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-900 rounded-3xl p-8 hover:bg-gray-800 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <span className="text-3xl">🏢</span>
                </div>
                <h2 className="text-3xl font-thin text-orange-500">
                  Our Beginning
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Founded in 2015 by tech enthusiast Rajesh Patel, TechStore began
                with a simple mission: to provide Sri Lankans with access to the
                world's best laptops and desktops at competitive prices. What
                started as a small 500 sq ft shop in Colombo Fort has grown into
                the nation's most trusted technology retailer.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our journey from a single store to a nationwide network of 8
                branches reflects our commitment to bringing cutting-edge
                technology closer to every Sri Lankan.
              </p>
            </div>

            <div className="bg-gray-900 rounded-3xl p-8 hover:bg-gray-800 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <span className="text-3xl">🌟</span>
                </div>
                <h2 className="text-3xl font-thin text-orange-500">
                  Today's Success
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Today, we proudly serve over 50,000 satisfied customers across
                Sri Lanka, offering an extensive range of laptops, desktops, and
                accessories from leading global brands including Apple, Dell,
                HP, ASUS, Lenovo, MSI, and many more.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our success is built on three pillars: genuine products,
                competitive pricing, and exceptional customer service that goes
                beyond the sale.
              </p>
            </div>
          </div>
        )}

        {activeTab === "mission" && (
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl p-8 border border-orange-500/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-orange-500 rounded-xl">
                    <span className="text-3xl text-white">🎯</span>
                  </div>
                  <h2 className="text-3xl font-thin text-white">Our Mission</h2>
                </div>
                <p className="text-gray-200 leading-relaxed text-lg">
                  To democratize access to cutting-edge technology by providing
                  authentic, high-quality computing solutions at competitive
                  prices, backed by expert guidance and exceptional customer
                  service.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-8 border border-blue-500/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-500 rounded-xl">
                    <span className="text-3xl text-white">🔮</span>
                  </div>
                  <h2 className="text-3xl font-thin text-white">Our Vision</h2>
                </div>
                <p className="text-gray-200 leading-relaxed text-lg">
                  To be Sri Lanka's most trusted technology partner, empowering
                  individuals and businesses to achieve their digital
                  aspirations through innovative computing solutions.
                </p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-3xl p-8">
              <h3 className="text-2xl font-semibold text-center mb-8 text-orange-500">
                Our Core Values
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    icon: "🤝",
                    title: "Trust",
                    desc: "Building lasting relationships through transparency and reliability",
                  },
                  {
                    icon: "⚡",
                    title: "Innovation",
                    desc: "Staying ahead with the latest technology trends and solutions",
                  },
                  {
                    icon: "🎯",
                    title: "Excellence",
                    desc: "Delivering superior quality in products and services",
                  },
                  {
                    icon: "❤️",
                    title: "Customer First",
                    desc: "Putting customer satisfaction at the heart of everything we do",
                  },
                ].map((value, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-gray-800 rounded-2xl hover:bg-gray-700 transition-all duration-300"
                  >
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h4 className="text-xl font-semibold mb-3 text-white">
                      {value.title}
                    </h4>
                    <p className="text-gray-400 text-sm">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-thin mb-4 text-white">
                Meet Our Leadership Team
              </h2>
              <p className="text-xl text-gray-400">
                The passionate individuals driving TechStore's success
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-3xl p-6 text-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-800">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-orange-500 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-center mt-16">
              <h3 className="text-3xl font-bold text-white mb-4">
                Join Our Growing Team
              </h3>
              <p className="text-xl text-white/90 mb-6">
                We're always looking for passionate individuals to join our
                mission
              </p>
              <button
                onClick={() => router.push("/careers")}
                className="px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                View Open Positions
              </button>
            </div>
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-thin mb-4 text-white">
                Our Journey
              </h2>
              <p className="text-xl text-gray-400">
                Key milestones in TechStore's evolution
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}
                  >
                    <div className="bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{milestone.icon}</span>
                        <span className="text-2xl font-bold text-orange-500">
                          {milestone.year}
                        </span>
                      </div>
                      <p className="text-gray-300 text-lg">{milestone.event}</p>
                    </div>
                  </div>

                  <div className="w-2/12 flex justify-center">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full border-4 border-black z-10"></div>
                  </div>

                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 mb-16 mt-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Why Choose TechStore?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="text-5xl mb-4 group-hover:animate-bounce">🏆</div>
              <h3 className="text-xl font-semibold mb-3">Authorized Dealer</h3>
              <p className="text-white/90">
                Official partner of all major laptop brands with genuine
                products and warranties
              </p>
            </div>
            <div className="text-center group">
              <div className="text-5xl mb-4 group-hover:animate-bounce">💰</div>
              <h3 className="text-xl font-semibold mb-3">Best Prices</h3>
              <p className="text-white/90">
                Competitive pricing with flexible payment options and 0%
                interest financing
              </p>
            </div>
            <div className="text-center group">
              <div className="text-5xl mb-4 group-hover:animate-bounce">🛠️</div>
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p className="text-white/90">
                24/7 technical support and certified service center for all
                repairs
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { number: "50K+", label: "Happy Customers", icon: "😊" },
            { number: "1000+", label: "Products Available", icon: "💻" },
            { number: "15+", label: "Global Brands", icon: "🌍" },
            { number: "9 Years", label: "In Business", icon: "🎂" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-2xl p-6 text-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-4xl font-bold text-orange-500 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-3xl p-8">
          <h2 className="text-3xl font-thin mb-8 text-orange-500 text-center">
            Our Locations
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Colombo Showroom",
                address: "123 Galle Road, Colombo 03",
                hours: "Mon-Sat 9AM-8PM",
                phone: "+94 11 234 5678",
                type: "Flagship Store",
              },
              {
                name: "Kandy Branch",
                address: "456 Peradeniya Road, Kandy",
                hours: "Mon-Sat 9AM-7PM",
                phone: "+94 81 234 5678",
                type: "Full Service",
              },
              {
                name: "Galle Store",
                address: "789 Main Street, Galle",
                hours: "Mon-Sat 9AM-7PM",
                phone: "+94 91 234 5678",
                type: "Sales & Support",
              },
            ].map((location, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <span className="text-orange-500">📍</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {location.name}
                    </h3>
                    <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                      {location.type}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-gray-400">
                  <p className="flex items-center gap-2">
                    <span>🏢</span> {location.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <span>🕒</span> {location.hours}
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📞</span> {location.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8">
          <h2 className="text-3xl font-thin mb-8 text-orange-500 text-center">
            Awards & Certifications
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                title: "Best Tech Retailer 2023",
                org: "Sri Lanka IT Awards",
                icon: "🏆",
              },
              {
                title: "Customer Choice Award",
                org: "Consumer Reports LK",
                icon: "⭐",
              },
              {
                title: "ISO 9001:2015 Certified",
                org: "Quality Management",
                icon: "✅",
              },
              {
                title: "Authorized Service Center",
                org: "Multiple Brands",
                icon: "🔧",
              },
            ].map((award, index) => (
              <div
                key={index}
                className="text-center p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{award.icon}</div>
                <h4 className="font-semibold text-white mb-2">{award.title}</h4>
                <p className="text-gray-400 text-sm">{award.org}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
