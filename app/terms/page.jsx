export default function Terms() {
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-thin mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Terms of Service
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Acceptance of Terms
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                By accessing and using TechStore's website and services, you
                accept and agree to be bound by these Terms of Service. If you
                do not agree to these terms, please do not use our services.
              </p>
              <p>
                We reserve the right to modify these terms at any time. Changes
                will be effective immediately upon posting on our website.
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Products and Services
              </h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>
                • All products are genuine and come with manufacturer warranties
              </p>
              <p>• Product availability is subject to stock levels</p>
              <p>• Prices are subject to change without notice</p>
              <p>• Product specifications may vary from images shown</p>
              <p>• We reserve the right to limit quantities purchased</p>
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Orders and Payment
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong>Order Processing:</strong> Orders are processed within
                1-2 business days. We reserve the right to cancel orders for any
                reason.
              </p>
              <p>
                <strong>Payment:</strong> Full payment is required before
                shipping. We accept cash, bank transfers, and credit/debit
                cards.
              </p>
              <p>
                <strong>Pricing Errors:</strong> In case of pricing errors, we
                reserve the right to cancel the order and refund the payment.
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
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Shipping and Delivery
              </h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>• Delivery within Colombo: 1-2 business days</p>
              <p>• Island-wide delivery: 3-5 business days</p>
              <p>• Free delivery for orders above Rs. 50,000</p>
              <p>• Customer must be present to receive delivery</p>
              <p>• Risk of loss transfers to customer upon delivery</p>
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
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Returns and Refunds
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong>Return Period:</strong> 7 days from delivery date for
                unopened items in original packaging.
              </p>
              <p>
                <strong>Condition:</strong> Items must be unused, undamaged, and
                in original condition with all accessories.
              </p>
              <p>
                <strong>Refund Process:</strong> Refunds processed within 7-10
                business days after return approval.
              </p>
              <p>
                <strong>Exclusions:</strong> Software, opened consumables, and
                customized products are non-returnable.
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
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Warranty and Support
              </h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>• Manufacturer warranty applies to all products</p>
              <p>
                • Warranty claims must be processed through authorized service
                centers
              </p>
              <p>
                • We provide technical support for products purchased from us
              </p>
              <p>
                • Warranty void if product is damaged due to misuse or
                unauthorized repairs
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-orange-500">
                User Conduct
              </h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>• Provide accurate information when placing orders</p>
              <p>• Do not use our services for illegal activities</p>
              <p>• Respect intellectual property rights</p>
              <p>• Do not attempt to hack or disrupt our systems</p>
              <p>• Maintain confidentiality of your account credentials</p>
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Limitation of Liability
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                TechStore's liability is limited to the purchase price of the
                product. We are not liable for:
              </p>
              <p>• Indirect, incidental, or consequential damages</p>
              <p>• Data loss or business interruption</p>
              <p>• Damages caused by third-party products or services</p>
              <p>• Force majeure events beyond our control</p>
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
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Governing Law
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                These terms are governed by the laws of Sri Lanka. Any disputes
                will be resolved in the courts of Colombo, Sri Lanka.
              </p>
              <p>
                If any provision of these terms is found to be unenforceable,
                the remaining provisions will continue in full force.
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
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-orange-500">
                Contact Information
              </h2>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>For questions about these Terms of Service:</p>
              <p>
                <strong>Email:</strong> legal@techstore.lk
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
