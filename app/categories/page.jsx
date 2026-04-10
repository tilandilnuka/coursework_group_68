"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCategoryStats } from "@/actions/category";
import ModernToast from "@/components/ModernToast";

export default function CategoriesPage() {
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
      description: "High-performance machines for gamers and professionals",
      color: "from-red-500 to-orange-500",
      icon: "🎮",
      image:
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&h=300&fit=crop",
    },
    {
      name: "desktop",
      displayName: "Desktop PCs",
      description: "Powerful desktop solutions for work and gaming",
      color: "from-blue-500 to-purple-500",
      icon: "🖥️",
      image:
        "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&h=300&fit=crop",
    },
    {
      name: "accessories",
      displayName: "Accessories",
      description: "Complete your setup with premium accessories",
      color: "from-green-500 to-teal-500",
      icon: "⚡",
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
    },
    {
      name: "business",
      displayName: "Business Laptops",
      description: "Professional workstations for enterprise",
      color: "from-indigo-500 to-blue-500",
      icon: "💼",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    },
  ];

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

          return {
            ...defaultCat,
            count: backendCat ? backendCat.count : 0,
            id: defaultCat.name,
          };
        });

        setCategories(mergedCategories);
      } else {
        setCategories(
          defaultCategories.map((cat) => ({
            ...cat,
            id: cat.name,
            count: 0,
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
          count: 0,
        })),
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading Categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      {alert && alert?.message && (
        <ModernToast alert={alert} setAlert={resetAlert} />
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h1 className="text-6xl font-thin mb-6">
            Shop by{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Category
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover our premium collection of laptops, desktops, and
            accessories
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products/allProducts?category=${category.name}`}
              className="group relative overflow-hidden rounded-3xl bg-gray-900 hover:bg-gray-800 transition-all duration-500 transform hover:scale-105"
            >
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.displayName}
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              </div>

              <div className="relative p-8 h-80 flex flex-col justify-end">
                <div className="mb-4">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                    {category.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 group-hover:bg-clip-text transition-all duration-500">
                    {category.displayName}
                  </h3>
                  <p className="text-gray-400 mb-4 group-hover:text-gray-200 transition-colors duration-500">
                    {category.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-orange-400 font-semibold">
                    {category.count}+ Products
                  </span>

                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-45 transition-all duration-500">
                    <svg
                      className="w-6 h-6 text-white"
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
            </Link>
          ))}
        </div>

        <div className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6">
              🔥 Special Offers
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Get up to{" "}
              <span className="font-bold text-yellow-300">30% OFF</span> on
              selected categories
            </p>
            <Link
              href="/products/allProducts"
              className="inline-flex items-center px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-yellow-300 hover:scale-105 transition-all duration-300"
            >
              Shop All Products
              <svg
                className="ml-2 w-5 h-5"
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
