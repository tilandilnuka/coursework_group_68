"use client";

import { useState } from "react";
import Link from "next/link";

export default function Careers() {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showBenefits, setShowBenefits] = useState(false);

  const openings = [
    {
      title: "Sales Executive",
      location: "Colombo",
      type: "Full-time",
      experience: "1-2 years",
      department: "sales",
      salary: "Rs. 45,000 - 65,000",
      description: "Drive sales growth and build customer relationships",
      requirements: [
        "Bachelor's degree",
        "Sales experience",
        "Excellent communication",
      ],
    },
    {
      title: "Technical Support Engineer",
      location: "Colombo",
      type: "Full-time",
      experience: "2-3 years",
      department: "technical",
      salary: "Rs. 55,000 - 75,000",
      description: "Provide technical support and troubleshooting",
      requirements: [
        "IT degree",
        "Hardware knowledge",
        "Problem-solving skills",
      ],
    },
    {
      title: "Digital Marketing Specialist",
      location: "Remote",
      type: "Full-time",
      experience: "2-4 years",
      department: "marketing",
      salary: "Rs. 50,000 - 70,000",
      description: "Manage digital campaigns and social media",
      requirements: [
        "Marketing degree",
        "Digital marketing experience",
        "Creative thinking",
      ],
    },
    {
      title: "Warehouse Manager",
      location: "Colombo",
      type: "Full-time",
      experience: "3-5 years",
      department: "operations",
      salary: "Rs. 60,000 - 80,000",
      description: "Oversee inventory and logistics operations",
      requirements: [
        "Management experience",
        "Inventory systems",
        "Leadership skills",
      ],
    },
    {
      title: "Customer Service Representative",
      location: "Kandy",
      type: "Full-time",
      experience: "0-1 years",
      department: "support",
      salary: "Rs. 35,000 - 45,000",
      description: "Provide excellent customer service and support",
      requirements: [
        "Good communication",
        "Customer focus",
        "Basic computer skills",
      ],
    },
    {
      title: "Laptop Repair Technician",
      location: "Colombo",
      type: "Full-time",
      experience: "2-4 years",
      department: "technical",
      salary: "Rs. 50,000 - 65,000",
      description: "Diagnose and repair laptop hardware issues",
      requirements: [
        "Technical certification",
        "Repair experience",
        "Attention to detail",
      ],
    },
    {
      title: "UI/UX Designer",
      location: "Colombo",
      type: "Full-time",
      experience: "2-3 years",
      department: "design",
      salary: "Rs. 55,000 - 75,000",
      description: "Design user interfaces and improve user experience",
      requirements: ["Design degree", "Portfolio", "Figma/Adobe skills"],
    },
    {
      title: "Data Analyst",
      location: "Remote",
      type: "Full-time",
      experience: "1-3 years",
      department: "analytics",
      salary: "Rs. 60,000 - 85,000",
      description: "Analyze business data and provide insights",
      requirements: [
        "Statistics background",
        "SQL knowledge",
        "Excel/Python skills",
      ],
    },
  ];

  const departments = [
    { id: "all", name: "All Positions", count: openings.length, icon: "💼" },
    {
      id: "sales",
      name: "Sales",
      count: openings.filter((job) => job.department === "sales").length,
      icon: "💰",
    },
    {
      id: "technical",
      name: "Technical",
      count: openings.filter((job) => job.department === "technical").length,
      icon: "🔧",
    },
    {
      id: "marketing",
      name: "Marketing",
      count: openings.filter((job) => job.department === "marketing").length,
      icon: "📢",
    },
    {
      id: "operations",
      name: "Operations",
      count: openings.filter((job) => job.department === "operations").length,
      icon: "📦",
    },
    {
      id: "support",
      name: "Support",
      count: openings.filter((job) => job.department === "support").length,
      icon: "🎆",
    },
    {
      id: "design",
      name: "Design",
      count: openings.filter((job) => job.department === "design").length,
      icon: "🎨",
    },
    {
      id: "analytics",
      name: "Analytics",
      count: openings.filter((job) => job.department === "analytics").length,
      icon: "📈",
    },
  ];

  const filteredJobs =
    selectedDepartment === "all"
      ? openings
      : openings.filter((job) => job.department === selectedDepartment);

  const benefits = [
    {
      icon: "💰",
      title: "Competitive Salary",
      desc: "Above market rates with annual increments",
    },
    {
      icon: "🏥",
      title: "Health Insurance",
      desc: "Comprehensive medical coverage for family",
    },
    {
      icon: "🏝️",
      title: "Paid Time Off",
      desc: "25 days annual leave + public holidays",
    },
    {
      icon: "📚",
      title: "Learning Budget",
      desc: "Rs. 50,000 annual training allowance",
    },
    {
      icon: "🏆",
      title: "Performance Bonus",
      desc: "Quarterly and annual performance rewards",
    },
    {
      icon: "🚀",
      title: "Career Growth",
      desc: "Clear promotion paths and mentorship",
    },
    { icon: "🍽️", title: "Free Meals", desc: "Complimentary lunch and snacks" },
    { icon: "🚗", title: "Transport", desc: "Company transport or allowance" },
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-6xl font-thin mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Join Our Team
          </h1>
          <p className="text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Build Your Career with Sri Lanka's Leading Tech Retailer - Where
            Innovation Meets Opportunity
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowBenefits(!showBenefits)}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300"
            >
              🎁 View Benefits
            </button>
            <a
              href="#openings"
              className="px-8 py-3 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold rounded-xl transition-all duration-300"
            >
              🔍 Browse Jobs
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 mb-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">Why Work at TechStore?</h2>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
              Join a dynamic team of tech enthusiasts dedicated to delivering
              exceptional customer experiences. We offer competitive salaries,
              comprehensive benefits, and opportunities for growth in Sri
              Lanka's most innovative tech company.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="text-xl font-semibold mb-2">Innovation First</h3>
                <p className="text-white/80">
                  Work with cutting-edge technology and innovative solutions
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl mb-3">🎆</div>
                <h3 className="text-xl font-semibold mb-2">Team Spirit</h3>
                <p className="text-white/80">
                  Collaborative environment with supportive colleagues
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="text-xl font-semibold mb-2">Recognition</h3>
                <p className="text-white/80">
                  Your contributions are valued and rewarded
                </p>
              </div>
            </div>
          </div>
        </div>

        {showBenefits && (
          <div className="mb-16 bg-gray-900 rounded-3xl p-8">
            <h2 className="text-3xl font-thin mb-8 text-orange-500 text-center">
              Employee Benefits & Perks
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-2xl p-6 text-center hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-3 text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-12" id="openings">
          <h2 className="text-3xl font-thin mb-8 text-center text-white">
            Open Positions by Department
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedDepartment === dept.id
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <span>{dept.icon}</span>
                <span>{dept.name}</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {dept.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-3xl p-8 border border-gray-800 hover:border-orange-500 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 mb-6 lg:mb-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-orange-500/20 rounded-lg">
                        <span className="text-orange-500">
                          {
                            departments.find((d) => d.id === job.department)
                              ?.icon
                          }
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-white">
                          {job.title}
                        </h3>
                        <p className="text-orange-500 font-medium">
                          {job.salary}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 text-lg">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <span>📍</span> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>⏰</span> {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>💼</span> {job.experience}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, reqIndex) => (
                        <span
                          key={reqIndex}
                          className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link
                      href={`/careers/apply?job=${encodeURIComponent(job.title)}`}
                      className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-center transform hover:scale-105"
                    >
                      Apply Now
                    </Link>
                    <button className="px-8 py-3 border-2 border-gray-600 text-gray-300 hover:border-orange-500 hover:text-orange-500 font-semibold rounded-xl transition-all duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                No positions available
              </h3>
              <p className="text-gray-400">
                Check back soon for new opportunities in this department
              </p>
            </div>
          )}
        </div>

        <div className="bg-gray-900 rounded-3xl p-8 mb-16">
          <h2 className="text-3xl font-thin mb-8 text-orange-500 text-center">
            Application Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Apply Online",
                desc: "Submit your application through our portal",
                icon: "📝",
              },
              {
                step: "2",
                title: "Initial Review",
                desc: "HR team reviews your application within 3 days",
                icon: "🔍",
              },
              {
                step: "3",
                title: "Interview",
                desc: "Technical and HR interviews (virtual/in-person)",
                icon: "💬",
              },
              {
                step: "4",
                title: "Welcome!",
                desc: "Onboarding and orientation program",
                icon: "🎉",
              },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  {process.step}
                </div>
                <div className="text-3xl mb-3">{process.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {process.title}
                </h3>
                <p className="text-gray-400 text-sm">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-thin mb-6 text-orange-500">
                Get in Touch
              </h2>
              <div className="space-y-4 text-gray-300">
                <p className="flex items-center gap-3">
                  <span className="text-2xl">📧</span>
                  <span>
                    Email:{" "}
                    <span className="text-orange-500">
                      careers@techstore.lk
                    </span>
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-2xl">📞</span>
                  <span>
                    Phone:{" "}
                    <span className="text-orange-500">+94 11 234 5678</span>
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <span>Address: 123 Galle Road, Colombo 03</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-2xl">⏰</span>
                  <span>HR Hours: Mon-Fri 9AM-5PM</span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">
                Quick Tips for Applicants
              </h3>
              <div className="space-y-3">
                {[
                  "Tailor your CV to the specific role",
                  "Include relevant certifications and skills",
                  "Write a compelling cover letter",
                  "Prepare for technical questions",
                  "Research our company culture",
                  "Ask thoughtful questions during interviews",
                ].map((tip, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      ✓
                    </div>
                    <span className="text-gray-300">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
