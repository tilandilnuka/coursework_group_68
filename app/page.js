"use client";

import { allProducts, searchProducts } from "@/actions/product";
import { useState, useEffect } from "react";
import { getCookie } from "@/actions/auth";
import ModernToast from "@/components/ModernToast";
import ProductCard from "@/components/ProductCard";
import WowHero from "@/components/WowHero";
import Categories from "@/components/Categories";
import TrustBadges from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import LiveChat from "@/components/LiveChat";
import { brands } from "@/constants";

export default function Home({ searchParams }) {
  const [filterValues, setFilterValues] = useState({
    category: "",
    brand: "",
    price: "",
    sort: "",
  });

  const [searchValues, setSearchValues] = useState({
    search: "",
  });

  const { search } = searchValues;
  const { category, brand, price, sort } = filterValues;
  const [allData, setAllData] = useState();
  const [show, setShow] = useState(false);
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [searchClean, setSearchClean] = useState(false);

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const initialSet = () => {
    setAllData(data);
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setFilterValues({ ...filterValues, [name]: e.target.value });
  };

  const handleSearch = (name) => (e) => {
    e.preventDefault();
    setSearchValues({ ...searchValues, [name]: e.target.value });
  };

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > totalPages) {
        nextPage = 1;
      }

      return nextPage;
    });
  };

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage <= 1) {
        prevPage = totalPages;
      }

      return prevPage;
    });
  };

  useEffect(() => {
    if (search.length == 0) {
      setSearchClean(true);
      handleSubmit();
      setSearchClean(false);
    } else {
      handleSearchSubmit();
    }
  }, [searchValues]);

  const handleSearchSubmit = async () => {
    await searchProducts({ search: search })
      .then((data) => {
        console.log(data);
        if (data.status && data.status == "success") {
          if (data.results == 0) {
            setAlert({
              ...alert,
              loading: false,
              message: data.message,
              error: false,
              success: true,
            });

            window.setTimeout(() => {
              resetAlert();
            }, 1000);
          } else {
            setAllData(data.data);
            setShow(false);
          }
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            resetAlert();
          }, 1000);
        }

        console.log(allData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("page changed...", page);

    handleSubmit();
  }, [page, filterValues]);

  const resetFilter = () => {
    setFilterValues({ category: "", brand: "", price: "", sort: "" });
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    let params;
    if (searchClean == false) {
      setAlert({ ...alert, loading: true, message: "Loading..." });
    }

    params = {
      limit,
      page,
    };

    if (filterValues?.brand) {
      params.brand = filterValues.brand;
    }
    if (filterValues?.category) {
      params.category = filterValues.category;
    }
    if (filterValues?.price) {
      params.price = filterValues.price;
    }
    if (filterValues?.sort) {
      params.sort = filterValues.sort;
    }
    let token = getCookie("token_user");

    await allProducts(params)
      .then((data) => {
        console.log(data);
        if (data.status && data.status == "success") {
          if (data.results == 0) {
            setAllData(data.doc);
          } else {
            setAllData(data.doc);
            console.log(data.totalCount);
            let totalCount = data.totalCount;
            setTotalPages(Math.ceil(totalCount / limit));
            setShow(false);
          }
          if (searchClean == false) {
          }

          window.setTimeout(() => {
            resetAlert();
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);

        setAlert({
          ...alert,
          loading: false,
          message: err.message,
          error: true,
          success: false,
        });
      });
  };

  console.log(allData, "is there data...");

  return (
    <main className="overflow-hidden min-h-screen bg-black">
      {alert && alert?.message && (
        <ModernToast alert={alert} setAlert={resetAlert} />
      )}

      <WowHero />
      <TrustBadges />
      <Categories />

      <div className="padding-x padding-y max-width bg-white" id="discover">
        <div className="home__filters relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 rounded-3xl"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-xl opacity-30"></div>

          <div className="relative w-full bg-white/80 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl">
            <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-red-500/10 to-pink-500/10 rounded-full blur-xl"></div>

            <div className="relative group mb-10">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl blur-sm group-focus-within:blur-md transition-all duration-300"></div>
              <div className="relative">
                <div className="absolute flex items-center ml-5 h-full z-20">
                  <svg
                    className="w-6 h-6 text-orange-500 transition-colors duration-300"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 
                      0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  placeholder="🔍 Search for premium laptops and desktops..."
                  className="relative pl-16 pr-6 py-5 w-full rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-transparent text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:bg-white focus:shadow-xl focus:shadow-orange-500/20 transition-all duration-500 text-lg font-medium outline-none"
                  value={search}
                  onChange={handleSearch("search")}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Smart Filters
                </h3>
              </div>

              <button
                className="group px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 active:scale-95"
                onClick={() => resetFilter()}
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Reset All
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50/80 backdrop-blur-sm border-2 border-gray-200/60 text-gray-900 focus:border-orange-500 focus:bg-white focus:shadow-lg focus:shadow-orange-500/10 transition-all duration-300 font-medium outline-none appearance-none cursor-pointer"
                  value={category}
                  onChange={handleChange("category")}
                >
                  <option value="">All Categories</option>
                  <option value="laptop">💻 Laptops</option>
                  <option value="desktop">🖥️ Desktops</option>
                </select>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Brand
                </label>
                <select
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50/80 backdrop-blur-sm border-2 border-gray-200/60 text-gray-900 focus:border-orange-500 focus:bg-white focus:shadow-lg focus:shadow-orange-500/10 transition-all duration-300 font-medium outline-none appearance-none cursor-pointer"
                  value={brand}
                  onChange={handleChange("brand")}
                >
                  <option value="">All Brands</option>
                  {brands.map((brand, index) => {
                    return (
                      <option value={brand} key={index} className="capitalize">
                        {brand}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50/80 backdrop-blur-sm border-2 border-gray-200/60 text-gray-900 focus:border-orange-500 focus:bg-white focus:shadow-lg focus:shadow-orange-500/10 transition-all duration-300 font-medium outline-none appearance-none cursor-pointer"
                  value={price}
                  onChange={handleChange("price")}
                >
                  <option value="">Any Price Range</option>
                  <option value="50000">💰 Under Rs. 50,000</option>
                  <option value="100000">💳 Under Rs. 100,000</option>
                  <option value="200000">💎 Under Rs. 200,000</option>
                  <option value="500000">👑 Under Rs. 500,000</option>
                </select>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50/80 backdrop-blur-sm border-2 border-gray-200/60 text-gray-900 focus:border-orange-500 focus:bg-white focus:shadow-lg focus:shadow-orange-500/10 transition-all duration-300 font-medium outline-none appearance-none cursor-pointer"
                  value={sort}
                  onChange={handleChange("sort")}
                >
                  <option value="">Sort by Price</option>
                  <option value="price">📈 Price: Low to High</option>
                  <option value="-price">📉 Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {allData && allData.length > 0 ? (
          <section className="relative mt-20">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/2 to-transparent rounded-3xl"></div>

            <div className="relative text-center mb-16">
              <div className="inline-block mb-6">
                <span className="px-6 py-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-full text-orange-600 text-sm font-semibold backdrop-blur-sm">
                  ✨ Premium Collection
                </span>
              </div>
              <h2 className="text-6xl md:text-7xl font-extralight text-black mb-6 leading-tight">
                Our{" "}
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent font-bold">
                  Products
                </span>
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full shadow-lg shadow-orange-500/25"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed">
                Discover premium technology crafted for excellence
              </p>
            </div>

            <div className="home__cars-wrapper relative">
              <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-white/50 pointer-events-none rounded-2xl"></div>
              {allData?.map((product, index) => (
                <div
                  key={product._id || index}
                  className="transform transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.8s ease-out forwards",
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="home__error-container animate-fadeIn">
            <div className="max-w-2xl mx-auto bg-white border border-gray-200 p-12 rounded-3xl text-center shadow-xl">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              </div>

              <h2 className="text-black text-3xl font-bold mb-4">
                {search ? `No results for "${search}"` : "No Products Found"}
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                We couldn't find any laptops matching your search criteria. Try
                adjusting your filters or search terms.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={resetFilter}
                  className="px-8 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold flex items-center gap-2 justify-center"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Clear All Filters
                </button>

                <a
                  href="/categories"
                  className="px-8 py-3 border-2 border-orange-500 text-orange-500 rounded-xl hover:bg-orange-50 transition-colors font-semibold flex items-center gap-2 justify-center"
                >
                  <svg
                    className="w-4 h-4"
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
                  Browse Categories
                </a>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 justify-center">
                  <svg
                    className="w-5 h-5 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  Search Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                  {[
                    "Try different keywords (e.g., 'gaming laptop', 'ultrabook')",
                    "Check your spelling",
                    "Use broader terms like brand names",
                    "Remove some filters to see more results",
                  ].map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-gray-600"
                    >
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    "Gaming Laptops",
                    "MacBook",
                    "Dell XPS",
                    "ThinkPad",
                    "Budget Laptops",
                  ].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchValues({ search: term })}
                      className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:border-orange-500 hover:text-orange-600 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        aria-label="Page navigation"
        className="relative flex justify-center my-20 bg-transparent"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent rounded-3xl"></div>
        <div className="relative bg-white/80 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl">
          <ul className="inline-flex gap-3">
            <li>
              <button
                onClick={prevPage}
                className="group px-8 py-4 text-gray-700 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 transform hover:scale-110 transition-all duration-300 font-semibold shadow-lg hover:shadow-orange-500/20 active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous
                </span>
              </button>
            </li>
            {[...Array(totalPages)].map((val, index) => {
              return (
                <li key={index}>
                  <button
                    onClick={() => setPage(index + 1)}
                    className={`px-5 py-4 font-bold rounded-2xl transform hover:scale-110 transition-all duration-300 shadow-lg active:scale-95 ${
                      page === index + 1
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-500/30 hover:shadow-orange-500/40"
                        : "text-gray-700 bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 hover:shadow-orange-500/20"
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              );
            })}
            <li>
              <button
                onClick={nextPage}
                className="group px-8 py-4 text-gray-700 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600 transform hover:scale-110 transition-all duration-300 font-semibold shadow-lg hover:shadow-orange-500/20 active:scale-95"
              >
                <span className="flex items-center gap-2">
                  Next
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <Testimonials />
      <FAQ />
      <LiveChat />
    </main>
  );
}
