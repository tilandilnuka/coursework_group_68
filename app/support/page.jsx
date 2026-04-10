"use client";

import { useState } from "react";

export default function Support() {
  const [activeService, setActiveService] = useState(null);
  const [repairForm, setRepairForm] = useState({
    name: "",
    email: "",
    phone: "",
    device: "",
    issue: "",
    date: "",
  });
  const [remoteForm, setRemoteForm] = useState({
    name: "",
    email: "",
    phone: "",
    issue: "",
    urgency: "medium",
  });

  const handleRepairSubmit = (e) => {
    e.preventDefault();
    alert(
      "Repair request submitted successfully! We will contact you within 24 hours.",
    );
    setRepairForm({
      name: "",
      email: "",
      phone: "",
      device: "",
      issue: "",
      date: "",
    });
    setActiveService(null);
  };

  const handleRemoteSubmit = (e) => {
    e.preventDefault();
    alert(
      "Remote support request submitted! Our technician will contact you shortly.",
    );
    setRemoteForm({
      name: "",
      email: "",
      phone: "",
      issue: "",
      urgency: "medium",
    });
    setActiveService(null);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-2 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 mt-32">
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-thin mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Technical Support
          </h1>
          <p className="text-xl text-gray-400">Expert Help When You Need It</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-900 rounded-3xl p-8 hover:bg-gray-800 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🔧</div>
              <h2 className="text-3xl font-thin text-orange-500 mb-4">
                Schedule Repair
              </h2>
              <p className="text-gray-400 mb-6">
                Book an appointment for hardware repairs and maintenance
              </p>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>• Free diagnosis and quote</p>
              <p>• Certified technicians</p>
              <p>• Genuine parts warranty</p>
              <p>• Same-day service available</p>
            </div>
            <button
              onClick={() => setActiveService("repair")}
              className="w-full mt-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300"
            >
              Schedule Repair
            </button>
          </div>

          <div className="bg-gray-900 rounded-3xl p-8 hover:bg-gray-800 transition-all duration-300">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">💻</div>
              <h2 className="text-3xl font-thin text-orange-500 mb-4">
                Remote Support
              </h2>
              <p className="text-gray-400 mb-6">
                Get instant help through screen sharing and remote assistance
              </p>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>• Instant troubleshooting</p>
              <p>• Software installation help</p>
              <p>• System optimization</p>
              <p>• 24/7 availability</p>
            </div>
            <button
              onClick={() => setActiveService("remote")}
              className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Request Remote Support
            </button>
          </div>
        </div>

        {activeService === "repair" && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-orange-500">
                  Schedule Repair
                </h3>
                <button
                  onClick={() => setActiveService(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleRepairSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={repairForm.name}
                  onChange={(e) =>
                    setRepairForm({ ...repairForm, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={repairForm.email}
                  onChange={(e) =>
                    setRepairForm({ ...repairForm, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={repairForm.phone}
                  onChange={(e) =>
                    setRepairForm({ ...repairForm, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Device Model"
                  value={repairForm.device}
                  onChange={(e) =>
                    setRepairForm({ ...repairForm, device: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white"
                  required
                />
                <textarea
                  placeholder="Describe the issue"
                  value={repairForm.issue}
                  onChange={(e) =>
                    setRepairForm({ ...repairForm, issue: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white"
                  rows="3"
                  required
                />
                <input
                  type="date"
                  value={repairForm.date}
                  onChange={(e) =>
                    setRepairForm({ ...repairForm, date: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl"
                >
                  Submit Repair Request
                </button>
              </form>
            </div>
          </div>
        )}

        {activeService === "remote" && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-blue-500">
                  Remote Support
                </h3>
                <button
                  onClick={() => setActiveService(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleRemoteSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={remoteForm.name}
                  onChange={(e) =>
                    setRemoteForm({ ...remoteForm, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={remoteForm.email}
                  onChange={(e) =>
                    setRemoteForm({ ...remoteForm, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={remoteForm.phone}
                  onChange={(e) =>
                    setRemoteForm({ ...remoteForm, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white"
                  required
                />
                <textarea
                  placeholder="Describe your technical issue"
                  value={remoteForm.issue}
                  onChange={(e) =>
                    setRemoteForm({ ...remoteForm, issue: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white"
                  rows="4"
                  required
                />
                <select
                  value={remoteForm.urgency}
                  onChange={(e) =>
                    setRemoteForm({ ...remoteForm, urgency: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl"
                >
                  Request Remote Support
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gray-900 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Phone Support
            </h3>
            <p className="text-gray-400 mb-4">
              Speak directly with our technicians
            </p>
            <p className="text-orange-500 font-semibold">+94 11 234 5678</p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-3 text-white">Live Chat</h3>
            <p className="text-gray-400 mb-4">Instant messaging support</p>
            <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl">
              Start Chat
            </button>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Email Support
            </h3>
            <p className="text-gray-400 mb-4">Detailed technical assistance</p>
            <p className="text-orange-500 font-semibold">
              support@techstore.lk
            </p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-3xl p-8">
          <h2 className="text-3xl font-thin mb-8 text-orange-500 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "How long does a typical repair take?",
                a: "Most repairs are completed within 2-3 business days. Complex issues may take up to 7 days.",
              },
              {
                q: "Do you provide warranty on repairs?",
                a: "Yes, all repairs come with a 90-day warranty on parts and labor.",
              },
              {
                q: "Is remote support secure?",
                a: "Absolutely. We use encrypted connections and never store your personal data.",
              },
              {
                q: "What are your support hours?",
                a: "Phone and chat support: Mon-Sat 9AM-8PM. Remote support: 24/7 for urgent issues.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-3">
                  {faq.q}
                </h4>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
