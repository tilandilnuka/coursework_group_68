"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategoryStats } from "@/actions/category";
import ModernToast from "@/components/ModernToast";
import { storefrontCategories } from "@/constants";

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
              count: backendCategory ? backendCategory.count : 0,
            };
          });

          setCategories(mergedCategories);
          return;
        }

        setCategories(
          storefrontCategories.map((category) => ({
            ...category,
            id: category.name,
            count: 0,
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
            count: 0,
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
      {alert?.message && <ModernToast alert={alert} setAlert={resetAlert} />}

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
                d="M4 6h16M4 12h16M4 18h16"
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
            Discover our focused collection of mobile phones, tablets, and
            accessories.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => (
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
              Featured Device Deals
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Save up to{" "}
              <span className="font-bold text-yellow-300">30% OFF</span>{" "}
              selected phone, tablet, and accessory bundles.
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
