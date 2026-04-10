"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ApplyJobContent() {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get("job") || "Position";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    coverLetter: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application submitted:", formData);
    alert("Application submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-black text-white pt-2 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 mb-8 transition-all"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Careers
        </Link>

        <div className="text-center mb-12 mt-32">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-thin mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Apply for {jobTitle}
          </h1>
          <p className="text-gray-400">
            Fill out the form below to submit your application
          </p>
        </div>

        <div className="bg-gray-900 rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full p-3 placeholder-gray-500 transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full p-3 placeholder-gray-500 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full p-3 placeholder-gray-500 transition-all"
                  placeholder="+94 77 123 4567"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full p-3 placeholder-gray-500 transition-all"
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Years of Experience *
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full p-3 transition-all"
              >
                <option value="" className="bg-gray-800">
                  Select experience level
                </option>
                <option value="0-1" className="bg-gray-800">
                  0-1 years
                </option>
                <option value="1-2" className="bg-gray-800">
                  1-2 years
                </option>
                <option value="2-3" className="bg-gray-800">
                  2-3 years
                </option>
                <option value="3-5" className="bg-gray-800">
                  3-5 years
                </option>
                <option value="5+" className="bg-gray-800">
                  5+ years
                </option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Upload Resume/CV *
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="resume"
                  onChange={handleChange}
                  required
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="flex items-center justify-center gap-2 bg-gray-800 border-2 border-dashed border-gray-700 text-gray-400 rounded-xl p-6 cursor-pointer hover:border-orange-500 hover:text-orange-500 transition-all"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  {formData.resume
                    ? formData.resume.name
                    : "Click to upload PDF, DOC, or DOCX"}
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Cover Letter *
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                required
                rows="6"
                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full p-3 placeholder-gray-500 transition-all resize-none"
                placeholder="Tell us why you're a great fit for this position..."
              ></textarea>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-orange-500/50"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Submit Application
              </button>
              <Link
                href="/careers"
                className="px-6 py-3 text-sm font-medium text-gray-300 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ApplyJob() {
  return (
    <Suspense fallback={null}>
      <ApplyJobContent />
    </Suspense>
  );
}
