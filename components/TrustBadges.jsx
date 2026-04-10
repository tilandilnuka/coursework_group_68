"use client";

const TrustBadges = () => {
  const badges = [
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "On orders over Rs. 100,000",
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      description: "256-bit SSL encryption",
    },
    {
      icon: "↩️",
      title: "30-Day Returns",
      description: "Hassle-free returns",
    },
    {
      icon: "🛡️",
      title: "Warranty",
      description: "Up to 3 years coverage",
    },
    {
      icon: "📞",
      title: "24/7 Support",
      description: "Expert technical help",
    },
    {
      icon: "⚡",
      title: "Same Day Delivery",
      description: "In Colombo area",
    },
  ];

  const partners = [
    { name: "Apple", logo: "🍎" },
    { name: "Dell", logo: "💻" },
    { name: "HP", logo: "🖥️" },
    { name: "ASUS", logo: "⚡" },
    { name: "Lenovo", logo: "🔧" },
    { name: "MSI", logo: "🎮" },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 border-t border-gray-200 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-orange-200/30 to-red-200/30 rounded-full blur-3xl -translate-x-32 -translate-y-32 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl translate-x-32 translate-y-32 animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="group relative bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/80 hover:border-orange-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            >
              {/* Gradient hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-red-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="text-5xl mb-4 group-hover:scale-110 group-hover:animate-bounce transition-transform duration-300">
                  {badge.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors duration-300 text-lg">
                  {badge.title}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {badge.description}
                </p>
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </div>
          ))}
        </div>

        {/* Partners */}
        <div className="text-center mb-20">
          <div className="inline-block mb-12">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent mb-4">
              Authorized Partner of Leading Brands
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/30">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center space-y-3 p-4 rounded-xl hover:bg-white/60 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-4xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                    {partner.logo}
                  </div>
                  <span className="text-lg font-bold text-gray-700 group-hover:text-orange-600 transition-colors duration-300">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Badges */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-wrap justify-center items-center gap-12">
              <div className="group flex items-center space-x-3 text-white hover:text-orange-400 transition-colors duration-300">
                <div className="text-3xl group-hover:animate-pulse">🔐</div>
                <span className="text-lg font-semibold">SSL Secured</span>
              </div>
              <div className="group flex items-center space-x-3 text-white hover:text-orange-400 transition-colors duration-300">
                <div className="text-3xl group-hover:animate-pulse">💳</div>
                <span className="text-lg font-semibold">PCI Compliant</span>
              </div>
              <div className="group flex items-center space-x-3 text-white hover:text-orange-400 transition-colors duration-300">
                <div className="text-3xl group-hover:animate-pulse">✅</div>
                <span className="text-lg font-semibold">Verified Business</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
