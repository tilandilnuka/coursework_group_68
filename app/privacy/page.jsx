const privacySections = [
  {
    title: "Information We Collect",
    bullets: [
      "Personal information such as name, email, phone number, and billing or delivery address when you place orders or register an account.",
      "Technical data including IP address, browser type, device details, and usage analytics to maintain and improve service quality.",
      "Transaction history such as purchased items, payment metadata, and shipping preferences.",
    ],
  },
  {
    title: "How We Use Information",
    intro:
      "Collected information is used only for legitimate business, operational, and legal purposes.",
    bullets: [
      "Process orders, coordinate delivery, and provide after-sales support.",
      "Respond to customer inquiries and technical requests.",
      "Send transactional communications including receipts, order updates, and account notices.",
      "Improve platform performance, security, and user experience.",
      "Send promotional communications where legally permitted or with your consent.",
      "Comply with regulatory, accounting, and legal obligations.",
    ],
  },
  {
    title: "Information Sharing",
    paragraphs: [
      "We do not sell personal data to third parties.",
      "Information may be shared only when necessary to deliver services or satisfy legal requirements.",
    ],
    bullets: [
      "Service providers supporting payments, logistics, hosting, fraud prevention, and customer support.",
      "Professional advisers and auditors under confidentiality obligations.",
      "Government or law enforcement authorities where disclosure is legally required.",
    ],
  },
  {
    title: "Data Security",
    bullets: [
      "Encryption and secure transport protocols are used for sensitive transmissions.",
      "Payment flows are processed through trusted, compliant providers.",
      "Access controls limit personal data handling to authorized personnel.",
      "Systems are monitored and reviewed to detect and mitigate security risks.",
    ],
  },
  {
    title: "Your Rights",
    intro:
      "Subject to applicable law, you may request to exercise the following rights:",
    bullets: [
      "Access a copy of personal information we hold about you.",
      "Correct inaccurate or incomplete personal data.",
      "Request deletion or restriction of processing in eligible circumstances.",
      "Object to certain processing, including direct marketing.",
      "Request portable export of data you provided to us.",
    ],
  },
  {
    title: "Cookies and Tracking",
    bullets: [
      "Essential cookies required for site functionality, authentication, and security.",
      "Analytics cookies used to understand usage patterns and improve performance.",
      "Marketing cookies used for relevant promotions where consent is required.",
      "Cookie controls can be adjusted in your browser or device settings.",
    ],
  },
  {
    title: "Data Retention",
    paragraphs: [
      "We retain personal data only as long as needed for the purpose collected, including legal, tax, accounting, and dispute-resolution obligations.",
      "When retention is no longer required, data is deleted or anonymized using reasonable safeguards.",
    ],
  },
  {
    title: "Contact Us",
    bullets: [
      "Email: privacy@techstore.lk",
      "Phone: +94 11 234 5678",
      "Address: 123 Galle Road, Colombo 03, Sri Lanka",
    ],
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white pt-6 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto mt-24">
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-sm tracking-wide uppercase mb-5">
            Legal Document
          </div>
          <h1 className="text-4xl sm:text-5xl font-light mb-3 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            Last updated: January 2025
          </p>
        </header>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-gray-900 to-black shadow-2xl overflow-hidden">
          <div className="border-b border-white/10 bg-white/[0.03] px-6 sm:px-10 py-6">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              This policy describes how TechStore collects, uses, stores, and
              protects personal information when you interact with our website
              and services.
            </p>
          </div>

          <div className="px-6 sm:px-10 py-8 sm:py-10 space-y-9">
            {privacySections.map((section, index) => (
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
