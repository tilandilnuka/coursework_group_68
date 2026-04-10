"use client";

import { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaComments,
} from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white pt-10 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6 mt-24">
            <FaComments className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-gray-400">We'd love to hear from you!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-orange-500">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-2xl p-6">
                <div className="flex items-start">
                  <FaPhoneAlt className="text-orange-500 w-8 h-8 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Phone</h3>
                    <p className="text-gray-400">Hotline: +94 11 234 5678</p>
                    <p className="text-gray-400">Mobile: +94 77 123 4567</p>
                    <p className="text-gray-400 text-sm mt-2">
                      Mon-Sat: 9AM-8PM | Sun: 10AM-6PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-2xl p-6">
                <div className="flex items-start">
                  <FaEnvelope className="text-orange-500 w-8 h-8 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email</h3>
                    <p className="text-gray-400">General: info@techstore.lk</p>
                    <p className="text-gray-400">Sales: sales@techstore.lk</p>
                    <p className="text-gray-400">
                      Support: support@techstore.lk
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-2xl p-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-orange-500 w-8 h-8 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Main Showroom
                    </h3>
                    <p className="text-gray-400">123 Galle Road</p>
                    <p className="text-gray-400">Colombo 03, Sri Lanka</p>
                    <p className="text-gray-400 text-sm mt-2">
                      Free parking available
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-2xl p-6">
                <div className="flex items-start">
                  <FaComments className="text-orange-500 w-8 h-8 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                    <p className="text-gray-400">
                      Chat with our experts in real-time
                    </p>
                    <button className="mt-3 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                      Start Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-orange-500">
              Send us a Message
            </h2>
            {submitted && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <h2 className="text-2xl font-bold text-green-600 mb-4">
                    Thank You!
                  </h2>
                  <p className="text-gray-700">
                    Your message has been sent successfully. We will get back to
                    you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-orange-500 focus:ring-0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-orange-500 focus:ring-0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-orange-500 focus:ring-0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:border-orange-500 focus:ring-0"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Visit Our Showroom</h2>
          <p className="text-xl text-white/90 mb-6">
            Experience our products firsthand and get expert advice from our
            team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300">
              Get Directions
            </button>
            <button
              onClick={() =>
                window.open("https://meet.google.com/new", "_blank")
              }
              className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black font-semibold rounded-xl transition-all duration-300"
            >
              Schedule Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
