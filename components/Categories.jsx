"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategoryStats } from "@/actions/category";
import ModernToast from "./ModernToast";
import { storefrontCategories } from "@/constants";
import { MdOutlinePhoneIphone, MdOutlineTabletMac } from "react-icons/md";
import { BsHeadphones } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";

const categoryIcons = {
  "mobile phones": MdOutlinePhoneIphone,
  tablets: MdOutlineTabletMac,
  accessories: BsHeadphones,
};

const BRAND_ACCENT_FROM = "#f97316";
const BRAND_ACCENT_TO = "#dc2626";

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
              count: backendCategory
                ? `${backendCategory.count}+ Products`
                : "0 Products",
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
      <section className="py-24 bg-[#080808] min-h-[60vh] flex items-center justify-center">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="animate-pulse flex flex-col items-center mb-16 space-y-4">
            <div className="w-48 h-10 bg-white/[0.08] rounded-xl"></div>
            <div className="w-96 h-6 bg-white/[0.06] rounded-xl"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-72 bg-white/[0.03] rounded-2xl animate-pulse border border-white/[0.08]"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#080808] relative antialiased overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 65% 20%, ${BRAND_ACCENT_FROM}1f 0%, transparent 72%)`,
        }}
      />
      {alert?.message && <ModernToast alert={alert} setAlert={resetAlert} />}

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
          <div
            className="inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-[0.18em]"
            style={{
              color: BRAND_ACCENT_FROM,
              borderColor: `${BRAND_ACCENT_FROM}40`,
              background: `${BRAND_ACCENT_FROM}12`,
            }}
          >
            Curated Collections
          </div>
          <h2 className="text-[3rem] md:text-[4rem] lg:text-[4.7rem] font-extralight leading-[1.05] tracking-tight text-white mb-2">
            Explore our Worlds
          </h2>
          <p className="text-lg md:text-xl text-white/55 max-w-2xl leading-relaxed">
            Discover a handpicked selection of premium devices and essential
            accessories tailored for your lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {categories.map((category) => {
            const IconComponent =
              categoryIcons[category.name?.toLowerCase()] ||
              MdOutlinePhoneIphone;

            return (
              <Link
                key={category.id}
                href={`/products/allProducts?category=${category.name}`}
                className="group relative flex flex-col justify-between p-8 md:p-10 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:bg-white/[0.06] hover:border-white/[0.16] transition-all duration-500 overflow-hidden"
              >
                <div
                  className="absolute -inset-[1px] opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 12% 10%, ${BRAND_ACCENT_FROM}1c 0%, transparent 60%)`,
                  }}
                />

                <div className="flex items-start justify-between mb-12 relative z-10">
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/[0.06] border border-white/[0.1] group-hover:scale-105 group-hover:bg-white/[0.08] transition-all duration-500 text-orange-400 shadow-sm">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/60 text-xs font-medium tracking-wide">
                    {category.count}
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-medium text-white mb-3 group-hover:text-white transition-colors duration-300">
                    {category.displayName}
                  </h3>
                  <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 group-hover:text-white/70 transition-colors duration-300">
                    {category.description}
                  </p>

                  <div className="flex items-center text-sm font-medium text-white/65 group-hover:text-white transition-colors duration-300">
                    <span className="mr-2">Browse collection</span>
                    <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            );
          })}
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
              Enjoy up to{" "}
              <span className="font-bold text-yellow-300">30% OFF</span>{" "}
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
    </section>
  );
};

export default Categories;
