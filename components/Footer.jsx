import Link from "next/link";

const PhoneLogo = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zm5 13h.01"
    />
  </svg>
);

export default function Footer() {
  const navGroups = [
    {
      title: "Shop",
      links: [
        { href: "/products/allProducts", label: "All Products" },
        { href: "/categories", label: "Categories" },
        { href: "/products/orders", label: "Track Orders" },
        { href: "/products/cart", label: "Cart" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "/support", label: "Technical Support" },
        { href: "/customer-service", label: "Customer Service" },
        { href: "/warranty", label: "Warranty" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About" },
        { href: "/careers", label: "Careers" },
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
      ],
    },
  ];

  const socialLinks = [
    {
      href: "#",
      label: "Facebook",
      icon: (
        <svg
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M24 12.073C24 5.403 18.627 0 12 0S0 5.403 0 12.073C0 18.099 4.388 23.094 10.125 24v-8.438H7.078v-3.489h3.047V9.414c0-3.005 1.792-4.667 4.533-4.667 1.313 0 2.686.235 2.686.235v2.953H15.83c-1.49 0-1.956.927-1.956 1.877v2.261h3.328l-.532 3.489h-2.796V24C19.611 23.094 24 18.099 24 12.073z" />
        </svg>
      ),
    },
    {
      href: "#",
      label: "Instagram",
      icon: (
        <svg
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm8.5 1.5h-8.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25z" />
          <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM17.4 6.2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z" />
        </svg>
      ),
    },
    {
      href: "#",
      label: "X",
      icon: (
        <svg
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18.244 2H21l-6.61 7.55L22 22h-5.956l-4.668-6.104L6.03 22H3.27l7.067-8.078L2 2h6.108l4.22 5.557L18.244 2zm-1.044 18.2h1.651L7.211 3.705H5.44L17.2 20.2z" />
        </svg>
      ),
    },
    {
      href: "#",
      label: "YouTube",
      icon: (
        <svg
          className="h-4 w-4"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M23.5 6.2a3.05 3.05 0 0 0-2.14-2.16C19.43 3.5 12 3.5 12 3.5s-7.43 0-9.36.54A3.05 3.05 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3.05 3.05 0 0 0 2.14 2.16c1.93.54 9.36.54 9.36.54s7.43 0 9.36-.54a3.05 3.05 0 0 0 2.14-2.16A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6 3.5-6 3.5z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#080808] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(249,115,22,0.16),transparent_38%),radial-gradient(circle_at_88%_0%,rgba(255,255,255,0.06),transparent_34%),linear-gradient(180deg,#080808_0%,#070707_100%)]" />

      <div className="relative mx-auto max-w-[1440px] px-6 pb-8 pt-16 sm:px-10 lg:px-12">
        <section className="grid gap-8 rounded-2xl border border-white/[0.1] bg-white/[0.04] p-6 shadow-xl shadow-black/40 backdrop-blur-sm lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-10 lg:p-10">
          <div className="space-y-4">
            <span
              className="inline-flex rounded-full border border-orange-500/35 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Premium Updates
            </span>
            <h2
              className="text-2xl leading-tight text-white sm:text-3xl"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
              }}
            >
              Early access to launches, curated drops, and member-only pricing.
            </h2>
            <p
              className="max-w-xl text-sm text-white/60 sm:text-base"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Join the TechStore list for product alerts and verified deal
              windows, delivered with a low-volume signal-first approach.
            </p>
          </div>

          <form
            className="grid gap-3 sm:grid-cols-[1fr_auto]"
            aria-label="Newsletter subscription"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              placeholder="Enter your email"
              className="h-12 w-full rounded-xl border border-white/[0.1] bg-white/[0.06] px-4 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:border-orange-500/60 focus:bg-white/[0.09]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            />
            <button
              type="submit"
              className="h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 px-6 text-sm font-semibold text-white transition-all duration-200 hover:from-orange-400 hover:to-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Subscribe
            </button>
          </form>
        </section>

        <section className="grid gap-12 py-14 lg:grid-cols-[1.15fr_1.85fr]">
          <div className="space-y-7">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-600/30">
                <PhoneLogo />
              </span>
              <span
                className="text-lg font-bold tracking-tight text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Tech<span className="text-orange-500">Store</span>
              </span>
            </Link>

            <p
              className="max-w-md text-[15px] leading-7 text-white/60"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Trusted electronics retail for discerning buyers who value
              authentic devices, transparent pricing, and reliable after-sales
              support.
            </p>

            <div
              className="grid gap-3 text-sm text-white/70"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              <a
                href="mailto:contact@techstore.lk"
                className="inline-flex items-center gap-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] px-3 py-2 transition-all duration-200 hover:border-orange-500/45 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                contact@techstore.lk
              </a>
              <a
                href="tel:+94112345678"
                className="inline-flex items-center gap-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] px-3 py-2 transition-all duration-200 hover:border-orange-500/45 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                +94 11 234 5678
              </a>
            </div>

            <div
              className="space-y-3"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                Follow
              </p>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/60 transition-all duration-200 hover:border-orange-500/45 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {navGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <h4
                  className="text-sm font-semibold uppercase tracking-[0.16em] text-white"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {group.title}
                </h4>
                <ul
                  className="space-y-2.5"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center text-[15px] text-white/60 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/45"
                      >
                        <span className="mr-2 h-1 w-1 rounded-full bg-orange-500/0 transition-all duration-200 group-hover:bg-orange-500/80" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          className="mb-10 grid gap-3 rounded-xl border border-white/[0.1] bg-white/[0.02] px-4 py-4 text-sm text-white/65 sm:grid-cols-3 sm:px-6"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Authorized products with invoice-backed warranty
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Secure checkout with SSL and PCI-compliant gateways
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Islandwide delivery with insured handling
          </div>
        </section>

        <section
          className="border-t border-white/[0.08] pt-6"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          <div className="flex flex-col gap-4 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
            <p>© 2026 TechStore. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                className="transition-colors duration-200 hover:text-white"
                href="/privacy"
              >
                Privacy Policy
              </Link>
              <Link
                className="transition-colors duration-200 hover:text-white"
                href="/terms"
              >
                Terms of Service
              </Link>
              <Link
                className="transition-colors duration-200 hover:text-white"
                href="/contact"
              >
                Contact
              </Link>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
