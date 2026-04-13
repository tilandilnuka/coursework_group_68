const termsSections = [
  {
    title: "Acceptance of Terms",
    paragraphs: [
      "By accessing or using TechStore services, you agree to these Terms of Service and all applicable laws.",
      "If you do not agree, you should stop using the website and related services.",
      "We may update these terms from time to time, and updated terms become effective when posted.",
    ],
  },
  {
    title: "Products and Services",
    intro:
      "All products and services are offered subject to availability and operational constraints.",
    bullets: [
      "Products are supplied as genuine items with applicable manufacturer warranties.",
      "Product specifications, colors, and packaging may vary from displayed images.",
      "Published prices and availability may change without prior notice.",
      "TechStore may limit quantities, refuse orders, or discontinue products.",
    ],
  },
  {
    title: "Orders and Payment",
    bullets: [
      "Orders are usually processed within one to two business days.",
      "Full payment is required before shipment or dispatch.",
      "Accepted payment methods include cash, bank transfer, and credit or debit cards.",
      "If a pricing or listing error occurs, we may cancel the order and issue a full refund.",
    ],
  },
  {
    title: "Shipping and Delivery",
    bullets: [
      "Delivery in Colombo: one to two business days.",
      "Island-wide delivery: three to five business days.",
      "Free delivery may apply to eligible orders above Rs. 50,000.",
      "A recipient should be available to accept delivery at the provided address.",
      "Risk of loss transfers to the customer upon successful delivery.",
    ],
  },
  {
    title: "Returns and Refunds",
    bullets: [
      "Return requests must be raised within seven days of delivery for unopened items.",
      "Items must be unused, undamaged, and returned with original accessories and packaging.",
      "Approved refunds are generally processed within seven to ten business days.",
      "Software, opened consumables, and custom items are non-returnable unless required by law.",
    ],
  },
  {
    title: "Warranty and Support",
    bullets: [
      "Manufacturer warranty terms apply to eligible products.",
      "Warranty claims may require service through authorized service centers.",
      "Technical support is available for products purchased through TechStore.",
      "Warranty coverage may be void for misuse, unauthorized repair, or accidental damage.",
    ],
  },
  {
    title: "User Conduct",
    bullets: [
      "Provide accurate and complete information for account and order activities.",
      "Do not use the platform for illegal, abusive, or fraudulent activity.",
      "Do not interfere with platform security, performance, or availability.",
      "You are responsible for safeguarding account credentials and access.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, TechStore liability is limited to the amount paid for the affected product or service.",
    ],
    bullets: [
      "Indirect, incidental, special, or consequential losses.",
      "Data loss, profit loss, or business interruption.",
      "Third-party service failures or delays outside our control.",
      "Force majeure events, including natural disasters and network outages.",
    ],
  },
  {
    title: "Governing Law",
    paragraphs: [
      "These terms are governed by the laws of Sri Lanka.",
      "Disputes are subject to the exclusive jurisdiction of competent courts in Colombo, Sri Lanka.",
      "If any clause is held unenforceable, the remaining clauses remain in full effect.",
    ],
  },
  {
    title: "Contact Information",
    bullets: [
      "Email: legal@techstore.lk",
      "Phone: +94 11 234 5678",
      "Address: 123 Galle Road, Colombo 03, Sri Lanka",
    ],
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-black text-white pt-6 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto mt-24">
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-sm tracking-wide uppercase mb-5">
            Legal Document
          </div>
          <h1 className="text-4xl sm:text-5xl font-light mb-3 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            Last updated: January 2025
          </p>
        </header>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-gray-900 to-black shadow-2xl overflow-hidden">
          <div className="border-b border-white/10 bg-white/[0.03] px-6 sm:px-10 py-6">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              This document outlines the rights, obligations, and limitations
              that apply when you access, purchase from, or otherwise use
              TechStore services.
            </p>
          </div>

          <div className="px-6 sm:px-10 py-8 sm:py-10 space-y-9">
            {termsSections.map((section, index) => (
              <section
                key={section.title}
                className="pb-8 border-b border-white/10 last:border-none last:pb-0"
              >
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-sm sm:text-base font-semibold text-orange-400 min-w-[2.5rem]">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                    {section.title}
                  </h2>
                </div>

                {section.intro && (
                  <p className="text-gray-300 leading-relaxed ml-0 sm:ml-14 mb-4">
                    {section.intro}
                  </p>
                )}

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-gray-300 leading-relaxed ml-0 sm:ml-14 mb-3"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="ml-0 sm:ml-14 mt-4 space-y-2 text-gray-200 marker:text-orange-400 list-disc list-outside pl-5">
                    {section.bullets.map((item) => (
                      <li key={item} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
