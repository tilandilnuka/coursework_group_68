"use client";

import { allProducts, searchProducts } from "@/actions/product";
import { Suspense, useState, useEffect, useContext } from "react";
import { ShopContext } from "@/context/show-context";
import ModernToast from "@/components/ModernToast";
import { brands, storefrontCategories } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const AllProductsContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToCart } = useContext(ShopContext);
  const [allData, setAllData] = useState([]);
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const [filterValues, setFilterValues] = useState({
    category: searchParams.get("category") || "",
    brand: "",
    price: "",
    sort: "",
  });

  const [searchValues, setSearchValues] = useState({
    search: "",
  });

  const { search } = searchValues;
  const { category, brand, price, sort } = filterValues;

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setFilterValues({ ...filterValues, [name]: e.target.value });
  };

  const handleSearch = (name) => (e) => {
    e.preventDefault();
    setSearchValues({ ...searchValues, [name]: e.target.value });
  };

  const resetFilter = () => {
    setFilterValues({ category: "", brand: "", price: "", sort: "" });
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

  async function handleSearchSubmit() {
    setLoading(true);
    await searchProducts({ search: search })
      .then((data) => {
        if (data.status && data.status == "success") {
          setAllData(data.data);
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });
          setTimeout(() => resetAlert(), 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  async function handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    setLoading(true);

    let params = {
      limit,
      page,
    };

    if (filterValues?.brand) {
      params.brandname = filterValues.brand;
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

    await allProducts(params)
      .then((data) => {
        if (data.status && data.status == "success") {
          setAllData(data.doc);
          let totalCount = data.totalCount;
          setTotalPages(Math.ceil(totalCount / limit));
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
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    queueMicrotask(() => {
      if (search.length == 0) {
        handleSubmit();
      } else {
        handleSearchSubmit();
      }
    });
  }, [search]);

  useEffect(() => {
    queueMicrotask(() => {
      handleSubmit();
    });
  }, [page, filterValues]);

  const handleAddToCart = (product) => {
    addToCart(product._id, product.price, product.title, product.images[0]);
    setAlert({
      message: "Product added to cart!",
      success: true,
      error: false,
      loading: false,
    });
    setTimeout(() => resetAlert(), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {alert && alert?.message && (
        <ModernToast alert={alert} setAlert={resetAlert} />
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6">
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8 rounded-full"></div>
            <h1 className="text-6xl lg:text-7xl font-extralight mb-6 leading-tight">
              Discover Our <br />
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent font-medium">
                Premium Collection
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Explore premium mobile phones, tablets, and accessories chosen
              for work, play, and daily life
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">500+</div>
              <div className="text-sm text-gray-400">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">50+</div>
              <div className="text-sm text-gray-400">Brands</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">99%</div>
              <div className="text-sm text-gray-400">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 mb-16 border border-gray-700/50 shadow-2xl">
          <div className="relative mb-8">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search for your perfect device..."
                className="w-full px-6 py-5 pl-14 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-2xl text-white placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:bg-gray-800/80 transition-all duration-300 text-lg"
                value={search}
                onChange={handleSearch("search")}
              />
              <svg
                className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-orange-400 transition-colors"
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
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white">
                Smart Filters
              </h3>
            </div>
            <button
              className="px-6 py-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500 hover:to-red-500 text-orange-400 hover:text-white rounded-xl transition-all duration-300 border border-orange-500/30 hover:border-transparent backdrop-blur-sm font-medium"
              onClick={resetFilter}
            >
              ✨ Reset All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="relative group">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                className="w-full px-4 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 appearance-none cursor-pointer"
                value={category}
                onChange={handleChange("category")}
              >
                <option value="">All Categories</option>
                {storefrontCategories.map((item) => (
                  <option value={item.name} key={item.name}>
                    {item.displayName}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-12 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Brand
              </label>
              <select
                className="w-full px-4 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 appearance-none cursor-pointer"
                value={brand}
                onChange={handleChange("brand")}
              >
                <option value="">All Brands</option>
                {brands.map((brand, index) => (
                  <option value={brand} key={index} className="capitalize">
                    {brand}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-12 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Price Range
              </label>
              <select
                className="w-full px-4 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 appearance-none cursor-pointer"
                value={price}
                onChange={handleChange("price")}
              >
                <option value="">💰 Any Price Range</option>
                <option value="50000">💵 Under Rs. 50,000</option>
                <option value="100000">💴 Under Rs. 100,000</option>
                <option value="200000">💶 Under Rs. 200,000</option>
                <option value="500000">💷 Under Rs. 500,000</option>
              </select>
              <svg
                className="absolute right-3 top-12 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div className="relative group">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sort By
              </label>
              <select
                className="w-full px-4 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 appearance-none cursor-pointer"
                value={sort}
                onChange={handleChange("sort")}
              >
                <option value="">📊 Sort by Price</option>
                <option value="price">📈 Price: Low to High</option>
                <option value="-price">📉 Price: High to Low</option>
              </select>
              <svg
                className="absolute right-3 top-12 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex flex-col justify-center items-center py-32">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-gray-700 rounded-full animate-spin border-t-orange-500"></div>
              <div className="w-16 h-16 border-4 border-gray-600 rounded-full animate-spin border-t-red-500 absolute top-2 left-2 animation-delay-300"></div>
              <div className="w-12 h-12 border-4 border-gray-500 rounded-full animate-spin border-t-pink-500 absolute top-4 left-4 animation-delay-600"></div>
            </div>
            <p className="text-gray-400 mt-6 text-lg">
              Loading the latest mobile gear for you...
            </p>
          </div>
        )}

        {!loading && allData && allData.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold text-white">
                Found <span className="text-orange-400">{allData.length}</span>{" "}
                products
              </h2>
              <div className="flex gap-2">
                <div className="px-4 py-2 bg-gray-800/50 rounded-lg text-sm text-gray-300">
                  Page {page} of {totalPages}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
              {allData.map((product, index) => (
                <div
                  key={product._id}
                  className="group bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl p-6 hover:from-gray-800/90 hover:to-gray-700/90 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-700/30 hover:border-orange-500/50 shadow-xl hover:shadow-2xl hover:shadow-orange-500/25"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <div className="aspect-square bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl overflow-hidden relative group-hover:bg-gradient-to-br group-hover:from-gray-700/50 group-hover:to-gray-600/50 transition-all duration-500">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/products/image/${product.images[0]}`}
                        alt={product.title}
                        width={400}
                        height={400}
                        className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 group-hover:rotate-2"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                        ✨ New
                      </span>
                      {index % 3 === 0 && (
                        <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                          🔥 Hot
                        </span>
                      )}
                    </div>

                    <button className="absolute top-3 left-3 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-500/20 transition-all duration-300 opacity-0 group-hover:opacity-100">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-orange-300 transition-colors duration-300 leading-snug">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex text-orange-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-lg">
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm font-medium">
                        (4.8) • 127 reviews
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                          Rs. {product.price?.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-sm line-through">
                            Rs. {(product.price * 1.2)?.toLocaleString()}
                          </span>
                          <span className="text-green-400 text-sm font-semibold">
                            Save{" "}
                            {Math.round(
                              ((product.price * 0.2) / (product.price * 1.2)) *
                                100,
                            )}
                            %
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="w-2 h-2 bg-green-400 rounded-full mb-1"></div>
                        <span className="text-xs text-gray-400">In Stock</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        router.push(
                          `/products/singleProduct?productId=${product._id}`,
                        )
                      }
                      className="flex-1 py-3 px-4 bg-gray-800/50 hover:bg-gray-700/80 text-white rounded-xl transition-all duration-300 font-medium border border-gray-600/50 hover:border-gray-500 backdrop-blur-sm group-hover:transform group-hover:scale-105"
                    >
                      <span className="flex items-center justify-center gap-2">
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View Details
                      </span>
                    </button>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/50 group-hover:transform group-hover:scale-105 font-medium"
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
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0L17 18M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
          </>
        ) : (
          !loading && (
            <div className="text-center py-32">
              <div className="mb-12">
                <div className="relative mx-auto w-32 h-32 mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-xl"></div>
                  <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-full w-full h-full flex items-center justify-center border border-gray-700/50">
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-6">
                No Products Found
              </h2>
              <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed mb-8">
                We could not find any phones, tablets, or accessories matching
                your search criteria. Try adjusting your filters or search
                terms.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={resetFilter}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={() => setSearchValues({ search: "" })}
                  className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 font-medium border border-gray-700"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )
        )}

        {!loading && totalPages > 1 && (
          <div className="flex justify-center mb-16">
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50 shadow-xl">
              <div className="flex items-center gap-2">
                <button
                  onClick={prevPage}
                  className="px-6 py-3 bg-gray-800/50 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 border border-gray-600/50 hover:border-gray-500 backdrop-blur-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={page === 1}
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous
                </button>

                <div className="flex gap-1 mx-2">
                  {[...Array(Math.min(totalPages, 7))].map((_, index) => {
                    let pageNumber;
                    if (totalPages <= 7) {
                      pageNumber = index + 1;
                    } else if (page <= 4) {
                      pageNumber = index + 1;
                    } else if (page > totalPages - 4) {
                      pageNumber = totalPages - 6 + index;
                    } else {
                      pageNumber = page - 3 + index;
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => setPage(pageNumber)}
                        className={`w-12 h-12 rounded-xl transition-all duration-300 font-medium ${
                          page === pageNumber
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-110"
                            : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-gray-600/50"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={nextPage}
                  className="px-6 py-3 bg-gray-800/50 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 border border-gray-600/50 hover:border-gray-500 backdrop-blur-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={page === totalPages}
                >
                  Next
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              <div className="text-center mt-4">
                <span className="text-sm text-gray-400">
                  Showing page{" "}
                  <span className="text-orange-400 font-semibold">{page}</span>{" "}
                  of{" "}
                  <span className="text-orange-400 font-semibold">
                    {totalPages}
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function AllProducts() {
  return (
    <Suspense fallback={null}>
      <AllProductsContent />
    </Suspense>
  );
}

