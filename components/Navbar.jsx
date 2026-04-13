"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "@/context/show-context";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products/allProducts" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
];

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

const NavBar = ({ transparentAtTop = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user] = useState(() => {
    try {
      if (typeof window === "undefined") {
        return null;
      }

      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const { cartItems } = useContext(ShopContext);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      return undefined;
    }

    const closeMenu = () => setMobileOpen(false);
    window.addEventListener("resize", closeMenu);

    return () => window.removeEventListener("resize", closeMenu);
  }, [mobileOpen]);

  const cartCount = Object.keys(cartItems ?? {}).length;
  const headerClasses =
    transparentAtTop && !scrolled
      ? "bg-transparent border-b border-transparent"
      : "bg-black/80 backdrop-blur-xl border-b border-white/[0.08] shadow-xl shadow-black/40";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClasses}`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 h-[64px] flex items-center gap-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 group mr-2"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-600/30">
            <PhoneLogo />
          </span>
          <span className="text-lg font-bold tracking-tight text-white hidden sm:block">
            Tech<span className="text-orange-500">Store</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/[0.07] transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center flex-1 max-w-[280px] relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-4 pr-4 py-2 text-sm bg-white/[0.06] border border-white/[0.1] rounded-xl text-white placeholder-white/30 focus:border-orange-500/60 focus:bg-white/[0.09] transition-all duration-200 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto md:ml-0 shrink-0">
          <Link
            href="/products/cart"
            className="relative p-2 text-white/60 hover:text-white hover:bg-white/[0.07] rounded-lg transition-all duration-200"
            aria-label="Cart"
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
                strokeWidth={1.8}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.5 5M7 13l2.5 5m0 0L17 18M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <Link
              href="/users/profile"
              className="p-2 text-white/60 hover:text-white hover:bg-white/[0.07] rounded-lg transition-all duration-200"
              aria-label="Profile"
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
                  strokeWidth={1.8}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
          ) : (
            <Link
              href="/users/login"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-xl hover:from-orange-400 hover:to-red-500 transition-all duration-200"
            >
              Sign In
            </Link>
          )}

          <button
            className="md:hidden p-2 text-white/60 hover:text-white hover:bg-white/[0.07] rounded-lg transition-all duration-200"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Toggle menu"
            type="button"
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
                strokeWidth={1.8}
                d={
                  mobileOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/[0.08] px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-sm font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/[0.07] transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default NavBar;
