"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { allCategories, getCategoryStats } from "@/actions/category";
import ModernToast from "./ModernToast";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const defaultCategories = [
    {
      name: "laptop",
      displayName: "Gaming Laptops",
      description: "High-performance machines for gamers",
      color: "from-red-500 to-orange-500",
      icon: "🎮",
    },
    {
      name: "desktop",
      displayName: "Desktop PCs",
      description: "Powerful desktop solutions",
      color: "from-indigo-500 to-purple-500",
      icon: "🖥️",
    },
    {
      name: "accessories",
      displayName: "Accessories",
      description: "Complete your setup",
      color: "from-orange-500 to-red-500",
      icon: "⚡",
    },
    {
      name: "business",
      displayName: "Business Laptops",
      description: "Professional workstations",
      color: "from-blue-500 to-cyan-500",
      icon: "💼",
    },
    {
      name: "creative",
      displayName: "Creative Workstations",
      description: "For designers and creators",
      color: "from-purple-500 to-pink-500",
      icon: "🎨",
    },
    {
      name: "budget",
      displayName: "Budget Friendly",
      description: "Quality at affordable prices",
      color: "from-green-500 to-teal-500",
      icon: "💰",
    },
  ];

  const pendingCategories = ["accessories", "business", "creative"];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategoryStats();

      if (response && response.status === "success") {
        const mergedCategories = defaultCategories.map((defaultCat) => {
          const backendCat = response.data?.find(
            (cat) => cat._id?.toLowerCase() === defaultCat.name.toLowerCase(),
          );

          const totalGamingLaptops =
            backendCat && defaultCat.name === "laptop"
              ? backendCat.products.reduce(
                  (total, product) => total + product.count,
                  0,
                )
              : null;

          return {
            ...defaultCat,
            count: backendCat
              ? defaultCat.name === "laptop"
                ? `${totalGamingLaptops} Gaming Laptops`
                : `${backendCat.count}+ Products`
              : pendingCategories.includes(defaultCat.name)
                ? "Pending Launch"
                : "0 Products",
            id: defaultCat.name,
          };
        });

        setCategories(mergedCategories);
      } else {
        setCategories(
          defaultCategories.map((cat) => ({
            ...cat,
            id: cat.name,
            count: pendingCategories.includes(cat.name)
              ? "Pending Launch"
              : "0 Products",
          })),
        );
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setAlert({
        message: "Failed to load categories",
        error: true,
        loading: false,
        success: false,
      });

      setCategories(
        defaultCategories.map((cat) => ({
          ...cat,
          id: cat.name,
          count: pendingCategories.includes(cat.name)
            ? "Pending Launch"
            : "0 Products",
        })),
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className="w-40 h-9 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full animate-pulse shadow-lg"></div>
            </div>
            <div className="w-full max-w-2xl h-20 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-3xl mx-auto mb-8 animate-pulse shadow-2xl"></div>
            <div className="w-full max-w-xl h-7 bg-gradient-to-r from-gray-700 to-gray-600 rounded-2xl mx-auto animate-pulse shadow-lg"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 animate-pulse shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-600 rounded-2xl mb-6 shadow-xl"></div>
                <div className="h-9 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl mb-4 shadow-lg"></div>
                <div className="h-6 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg mb-3 shadow-md"></div>
                <div className="h-6 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg w-3/4 mb-8 shadow-md"></div>
                <div className="flex justify-between items-center">
                  <div className="w-28 h-7 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full shadow-lg"></div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full shadow-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {alert && alert?.message && (
        <ModernToast alert={alert} setAlert={resetAlert} />
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium">
              ✨ Premium Collections
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-extralight text-white mb-8 leading-tight">
            Shop by{" "}
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent font-bold">
              Category
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Discover our curated collections designed for every need and budget
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products/allProducts?category=${category.name}`}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-orange-500/50 transition-all duration-700 transform hover:scale-[1.02] hover:-translate-y-2"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: "fadeInUp 0.8s ease-out forwards",
              }}
            >
              {/* Animated Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-all duration-700`}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Glow Effect */}
              <div
                className={`absolute -inset-1 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-700`}
              ></div>

              {/* Content */}
              <div className="relative p-8 h-full flex flex-col">
                {/* Icon with Animation */}
                <div className="text-5xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {category.icon}
                </div>

                {/* Category Info */}
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 group-hover:bg-clip-text transition-all duration-500">
                    {category.displayName}
                  </h3>
                  <p className="text-gray-400 mb-4 group-hover:text-gray-200 transition-colors duration-500 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Bottom Section */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-semibold">
                    {category.count}
                  </span>

                  {/* Animated Arrow */}
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-45 transition-all duration-500">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          ))}
        </div>

        {/* Special Offers Banner */}
        <div className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-bounce"></div>
            <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl animate-pulse"></div>
          </div>

          <div className="relative z-10">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-medium">
                🎯 Exclusive Deals
              </span>
            </div>
            <h3 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              🔥 Limited Time
              <br />
              <span className="text-yellow-300">Mega Sale</span>
            </h3>
            <p className="text-xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed">
              Get up to{" "}
              <span className="font-bold text-yellow-300">30% OFF</span> on
              selected categories +{" "}
              <span className="font-bold">FREE shipping</span> on orders over
              Rs. 100,000
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/products/allProducts?deals=true"
                className="group px-10 py-4 bg-white text-black font-bold rounded-2xl hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  Shop Deals Now
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
              <Link
                href="#newsletter"
                className="group px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-black font-bold rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  🔔 Get Notified
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Categories;
