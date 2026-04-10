export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white pt-2 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-thin mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-400">Last updated: January 2025</p>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-900 rounded-2xl p-8 hover:bg-gray-800 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Information We Collect
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong>Personal Information:</strong> Name, email address,
                phone number, billing address when you make purchases or create
                an account.
              </p>
              <p>
                <strong>Technical Information:</strong> IP address, browser
                type, device information, and usage data to improve our
                services.
              </p>
              <p>
                <strong>Purchase History:</strong> Details of products
                purchased, payment information (encrypted), and delivery
                preferences.
              </p>
            </div>
          </section>

          <section className="bg-gray-900 rounded-2xl p-8 hover:bg-gray-800 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-orange-500">
                How We Use Your Information
              </h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>• Process and fulfill your orders</p>
              <p>• Provide customer support and technical assistance</p>
              <p>• Send order confirmations and shipping updates</p>
              <p>• Improve our website and services</p>
              <p>• Send promotional offers (with your consent)</p>
              <p>• Comply with legal obligations</p>
            </div>
          </section>

          <section className="bg-gray-900 rounded-2xl p-8 hover:bg-gray-800 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Information Sharing
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong>We DO NOT sell your personal information.</strong>
              </p>
              <p>
                <strong>Service Providers:</strong> We share information with
                trusted partners for payment processing, shipping, and customer
                support.
              </p>
              <p>
                <strong>Legal Requirements:</strong> We may disclose information
                when required by law or to protect our rights and safety.
              </p>
            </div>
          </section>

          <section className="bg-gray-900 rounded-2xl p-8 hover:bg-gray-800 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Data Security
              </h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>• SSL encryption for all data transmission</p>
              <p>• Secure payment processing through certified providers</p>
              <p>• Regular security audits and updates</p>
              <p>
                • Limited access to personal information by authorized personnel
                only
              </p>
            </div>
          </section>

          <section className="bg-gray-900 rounded-2xl p-8 hover:bg-gray-800 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Your Rights
              </h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>• Access your personal information</p>
              <p>• Correct inaccurate information</p>
              <p>• Delete your account and data</p>
              <p>• Opt-out of marketing communications</p>
              <p>• Data portability upon request</p>
            </div>
          </section>

          <section className="bg-gray-900 rounded-2xl p-8 hover:bg-gray-800 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Cookies and Tracking
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong>Essential Cookies:</strong> Required for website
                functionality and security.
              </p>
              <p>
                <strong>Analytics Cookies:</strong> Help us understand how
                visitors use our website.
              </p>
              <p>
                <strong>Marketing Cookies:</strong> Used to show relevant
                advertisements (with your consent).
              </p>
              <p>You can manage cookie preferences in your browser settings.</p>
            </div>
          </section>

          <section className="bg-gray-900 rounded-2xl p-8 hover:bg-gray-800 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Contact Us
              </h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>For privacy-related questions or requests:</p>
              <p>
                <strong>Email:</strong> privacy@techstore.lk
              </p>
              <p>
                <strong>Phone:</strong> +94 11 234 5678
              </p>
              <p>
                <strong>Address:</strong> 123 Galle Road, Colombo 03, Sri Lanka
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
