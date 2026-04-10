"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategoryStats } from "@/actions/category";
import ModernToast from "./ModernToast";
import { storefrontCategories } from "@/constants";

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getCategoryStats();

        if (response?.status === "success") {
          const mergedCategories = storefrontCategories.map((category) => {
            const backendCategory = response.data?.find(
              (item) => item._id?.toLowerCase() === category.name.toLowerCase(),
            );

            return {
              ...category,
              id: category.name,
              count: backendCategory ? `${backendCategory.count}+ Products` : "0 Products",
            };
          });

          setCategories(mergedCategories);
          return;
        }

        setCategories(
          storefrontCategories.map((category) => ({
            ...category,
            id: category.name,
            count: "0 Products",
          })),
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
        setAlert({
          message: "Failed to load categories",
          error: true,
          loading: false,
          success: false,
        });
        setCategories(
          storefrontCategories.map((category) => ({
            ...category,
            id: category.name,
            count: "0 Products",
          })),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="w-40 h-9 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full mx-auto mb-6 animate-pulse"></div>
            <div className="w-full max-w-2xl h-20 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-3xl mx-auto mb-8 animate-pulse"></div>
            <div className="w-full max-w-xl h-7 bg-gradient-to-r from-gray-700 to-gray-600 rounded-2xl mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 rounded-3xl p-8 animate-pulse"
              >
                <div className="w-16 h-16 bg-gray-700 rounded-2xl mb-6"></div>
                <div className="h-8 bg-gray-700 rounded-xl mb-4"></div>
                <div className="h-5 bg-gray-700 rounded-lg mb-3"></div>
                <div className="h-5 bg-gray-700 rounded-lg w-3/4 mb-8"></div>
                <div className="w-28 h-7 bg-gray-700 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {alert?.message && <ModernToast alert={alert} setAlert={resetAlert} />}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium">
              Focused Catalog
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-extralight text-white mb-8 leading-tight">
            Shop by{" "}
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent font-bold">
              Category
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Browse a curated range of mobile phones, tablets, and must-have
            accessories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products/allProducts?category=${category.name}`}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-orange-500/50 transition-all duration-700 transform hover:scale-[1.02] hover:-translate-y-2"
              style={{
                animationDelay: `${index * 120}ms`,
                animation: "fadeInUp 0.8s ease-out forwards",
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-all duration-700`}
              ></div>
              <div
                className={`absolute -inset-1 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-700`}
              ></div>

              <div className="relative p-8 h-full flex flex-col">
                <div className="text-5xl mb-6 transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                  {category.icon}
                </div>

                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 group-hover:bg-clip-text transition-all duration-500">
                    {category.displayName}
                  </h3>
                  <p className="text-gray-400 mb-4 group-hover:text-gray-200 transition-colors duration-500 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-semibold">
                    {category.count}
                  </span>
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
            </Link>
          ))}
        </div>

        <div className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>

          <div className="relative z-10">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-medium">
                Limited-Time Offers
              </span>
            </div>
            <h3 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Save on
              <br />
              <span className="text-yellow-300">Top Devices</span>
            </h3>
            <p className="text-xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed">
              Enjoy up to <span className="font-bold text-yellow-300">30% OFF</span>{" "}
              selected mobile phones, tablets, and daily-carry accessories.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/products/allProducts?deals=true"
                className="group px-10 py-4 bg-white text-black font-bold rounded-2xl hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  Shop Deals
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
                href="/categories"
                className="group px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-black font-bold rounded-2xl transition-all duration-300 hover:scale-105"
              >
                Explore Categories
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
