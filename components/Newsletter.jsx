"use client";

import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-5xl font-thin text-black mb-6">
            Stay <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Updated</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get the latest deals, new arrivals, and tech news delivered to your inbox
          </p>
        </div>

        {/* Newsletter Form */}
        <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Benefits */}
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-black mb-6">
                Join 50,000+ Tech Enthusiasts
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Exclusive deals and early access</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Latest tech news and reviews</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-purple-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Product launch notifications</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-orange-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">No spam, unsubscribe anytime</span>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div>
              {!subscribed ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 rounded-2xl border border-gray-300 focus:border-orange-500 focus:ring-0 transition-all duration-300 text-lg"
                      required
                    />
                    <div className="absolute right-2 top-2">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    By subscribing, you agree to our Privacy Policy and Terms of Service
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 text-2xl">✓</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-black mb-2">Welcome aboard! 🎉</h3>
                  <p className="text-gray-600">Check your email for a special welcome offer</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-black mb-2">50K+</div>
            <div className="text-gray-600">Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black mb-2">4.9★</div>
            <div className="text-gray-600">Newsletter Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black mb-2">Weekly</div>
            <div className="text-gray-600">Updates</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-black mb-2">0%</div>
            <div className="text-gray-600">Spam</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;