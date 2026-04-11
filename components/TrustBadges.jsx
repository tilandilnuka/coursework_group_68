"use client";

import Image from "next/image";
import {
  FiTruck,
  FiShield,
  FiRefreshCcw,
  FiCheckCircle,
  FiHeadphones,
  FiZap,
  FiLock,
  FiCreditCard,
} from "react-icons/fi";

const TrustBadges = () => {
  const badges = [
    {
      icon: <FiTruck />,
      title: "Free Shipping",
      description: "On orders over Rs. 50,000",
    },
    {
      icon: <FiLock />,
      title: "Secure Payment",
      description: "256-bit SSL encryption",
    },
    {
      icon: <FiRefreshCcw />,
      title: "30-Day Returns",
      description: "On eligible items",
    },
    {
      icon: <FiShield />,
      title: "Warranty Support",
      description: "On genuine devices",
    },
    {
      icon: <FiHeadphones />,
      title: "24/7 Support",
      description: "Expert product help",
    },
    {
      icon: <FiZap />,
      title: "Same Day Delivery",
      description: "In Colombo area",
    },
  ];

  const partners = [
    {
      name: "Apple",
      logo: (
        <Image
          src="/logos/Apple.svg"
          alt="Apple"
          width={48}
          height={48}
          className="object-contain transition-all duration-300"
        />
      ),
    },
    {
      name: "Samsung",
      logo: (
        <Image
          src="/logos/Samsung.svg"
          alt="Samsung"
          width={48}
          height={48}
          className="object-contain transition-all duration-300"
        />
      ),
    },
    {
      name: "Google",
      logo: (
        <Image
          src="/logos/Google.svg"
          alt="Google"
          width={48}
          height={48}
          className="object-contain transition-all duration-300"
        />
      ),
    },
    {
      name: "Xiaomi",
      logo: (
        <Image
          src="/logos/Xiaomi.svg"
          alt="Xiaomi"
          width={48}
          height={48}
          className="object-contain transition-all duration-300"
        />
      ),
    },
    {
      name: "Anker",
      logo: (
        <Image
          src="/logos/Anker.svg"
          alt="Anker"
          width={48}
          height={48}
          className="object-contain transition-all duration-300"
        />
      ),
    },
    {
      name: "JBL",
      logo: (
        <Image
          src="/logos/JBL.svg"
          alt="JBL"
          width={48}
          height={48}
          className="object-contain transition-all duration-300"
        />
      ),
    },
  ];

  return (
    <section className="relative py-24 bg-white border-t border-gray-100 overflow-hidden text-gray-900">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gray-50/80 to-transparent pointer-events-none"></div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest text-orange-500 uppercase mb-3">
            Why Choose Us
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Premium Service. Verified Quality.
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-24">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="group flex flex-col items-center bg-gray-50/50 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 text-center hover:bg-white hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white text-orange-500 text-2xl shadow-sm border border-gray-100 mb-5 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-red-600 group-hover:text-white group-hover:border-transparent transition-all duration-300">
                {badge.icon}
              </div>
              <h4 className="font-semibold text-gray-900 mb-1.5 text-sm md:text-base">
                {badge.title}
              </h4>
              <p className="text-xs md:text-sm text-gray-500">
                {badge.description}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-b border-gray-100 py-16 mb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 text-xs md:text-sm font-medium text-gray-400 tracking-wide uppercase">
            Authorized Partner
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-20 hover:transition-duration-500">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center transform hover:scale-105 transition-transform duration-300"
                title={partner.name}
              >
                {partner.logo}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white border border-gray-100 rounded-3xl px-6 md:px-12 py-6 shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="flex items-center space-x-3 text-gray-600">
              <FiLock className="text-xl text-orange-500" />
              <span className="text-sm font-medium">SSL Secured Checkout</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-gray-200"></div>
            <div className="flex items-center space-x-3 text-gray-600">
              <FiCreditCard className="text-xl text-orange-500" />
              <span className="text-sm font-medium">PCI Compliant</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-gray-200"></div>
            <div className="flex items-center space-x-3 text-gray-600">
              <FiCheckCircle className="text-xl text-orange-500" />
              <span className="text-sm font-medium">Verified Enterprise</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
