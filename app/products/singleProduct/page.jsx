"use client";

import { Suspense, useState, useEffect, useContext } from "react";
import { getCookie } from "@/actions/auth";
import Image from "next/image";
import { ShopContext } from "@/context/show-context";
import { useSearchParams } from "next/navigation";
import { oneProduct } from "@/actions/product";
import ModernToast from "@/components/ModernToast";
import { allReviews } from "@/actions/review";
import { allOrders } from "@/actions/order";
import ReviewModal from "@/components/ReviewModal";
import RatingStats from "@/components/RatingStats";
import { calculateAverageRating, isIdInProducts } from "@/util";

const SingleProductContent = () => {
  const searchParams = useSearchParams();
  const [productId] = useState(searchParams.get("productId"));
  const [imageIndex, setImageIndex] = useState(0);
  const [allData, setAllData] = useState();
  const [allReview, setAllReview] = useState();
  const [itemCount, setItemCount] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [showReviewModel, setShowReviewModel] = useState(false);
  const [allOrdered, setAllOrdered] = useState();
  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState(true);

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const { addToCart, updateCartItemCount, getItemCountById } =
    useContext(ShopContext);

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  useEffect(() => {
    fetchData();
    fetchReviews();
    handleOrderedProducts();
    setItemCount(getItemCountById(productId));
  }, [refresh]);

  const fetchData = async () => {
    setLoading(true);
    await oneProduct(productId)
      .then((data) => {
        if (data.status && data.status == "success") {
          setAllData(data.doc);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const fetchReviews = async () => {
    let data = { productId: productId };
    await allReviews(data)
      .then((data) => {
        if (data.status && data.status == "success") {
          setAllReview(data.doc);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOrderedProducts = async () => {
    let userId;
    if (localStorage.getItem("user")) {
      userId = JSON.parse(localStorage.getItem("user"))._id;
      setUserID(userId);
    } else {
      return;
    }

    let params = { userId, limit: 10, page: 1 };
    let token = getCookie("token_user");

    await allOrders(params)
      .then((data) => {
        if (data.status && data.status == "success") {
          setAllOrdered(data.doc);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToCart = () => {
    updateCartItemCount(
      allData._id,
      Number(itemCount),
      allData.price,
      allData.title,
      allData.images[0],
    );
    setAlert({
      message: "Product added to cart!",
      success: true,
      error: false,
      loading: false,
    });
    setTimeout(() => resetAlert(), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-700 rounded-full animate-spin border-t-orange-500"></div>
            <div className="w-16 h-16 border-4 border-gray-600 rounded-full animate-spin border-t-red-500 absolute top-2 left-2 animation-delay-300"></div>
            <div className="w-12 h-12 border-4 border-gray-500 rounded-full animate-spin border-t-pink-500 absolute top-4 left-4 animation-delay-600"></div>
          </div>
          <p className="text-gray-400 mt-8 text-lg font-medium">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      {alert && alert?.message && (
        <ModernToast alert={alert} setAlert={resetAlert} />
      )}
      {showReviewModel && (
        <ReviewModal
          setShowReview={setShowReviewModel}
          productId={productId}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-12 animate-fade-in">
          <nav className="flex items-center gap-3 text-sm mb-8">
            <a
              href="/"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              🏠 Home
            </a>
            <span className="text-gray-600">→</span>
            <a
              href="/products/allProducts"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              📱 Products
            </a>
            <span className="text-gray-600">→</span>
            <span className="text-orange-400 flex items-center gap-1">
              🔍 Product Details
            </span>
          </nav>

          <div className="text-center mb-8">
            <div className="inline-block">
              <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6 rounded-full"></div>
              <h1 className="text-4xl lg:text-5xl font-extralight mb-4 leading-tight">
                Product{" "}
                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent font-medium">
                  Details
                </span>
              </h1>
              <p className="text-gray-300 text-lg">
                Everything you need to know about this amazing product
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8 animate-fade-in-up">
            <div className="relative group">
              <div className="aspect-square bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm rounded-3xl overflow-hidden border-2 border-gray-700/50 shadow-2xl hover:border-orange-500/50 transition-all duration-500">
                <div className="relative w-full h-full p-8 bg-white/5 backdrop-blur-sm">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/products/image/${allData?.images[imageIndex]}`}
                    alt={allData?.title}
                    width={800}
                    height={800}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 filter drop-shadow-2xl"
                    priority
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute top-6 left-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                    ✨ HD Quality
                  </div>
                </div>
              </div>

              {allData?.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setImageIndex(
                        imageIndex > 0
                          ? imageIndex - 1
                          : allData.images.length - 1,
                      )
                    }
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-xl"
                  >
                    <svg
                      className="w-6 h-6"
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
                  </button>

                  <button
                    onClick={() =>
                      setImageIndex(
                        imageIndex < allData.images.length - 1
                          ? imageIndex + 1
                          : 0,
                      )
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-xl"
                  >
                    <svg
                      className="w-6 h-6"
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
                </>
              )}

              <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium shadow-lg">
                {imageIndex + 1} / {allData?.images.length}
              </div>
              <div className="absolute top-6 right-6 bg-black/70 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Click to zoom
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Product Gallery
                </h3>
                <span className="text-gray-400 text-sm">
                  ({allData?.images.length} photos)
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {allData?.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setImageIndex(index)}
                    className={`group relative aspect-square bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg ${
                      imageIndex === index
                        ? "border-orange-500 shadow-xl shadow-orange-500/30 ring-2 ring-orange-500/50"
                        : "border-gray-700/50 hover:border-orange-400/60 hover:shadow-xl"
                    }`}
                  >
                    <div className="relative w-full h-full p-3 bg-white/5">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/products/image/${image}`}
                        alt={`${allData?.title} - Image ${index + 1}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {imageIndex === index && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-orange-500/10"></div>
                        <div className="absolute top-2 right-2 w-3 h-3 bg-orange-500 rounded-full shadow-lg animate-pulse"></div>
                      </>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {index + 1}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-center gap-2 pt-4">
                {allData?.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      imageIndex === index
                        ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-lg"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/40 hover:to-indigo-500/40 text-blue-400 hover:text-blue-300 rounded-xl transition-all duration-300 border border-blue-500/30 backdrop-blur-sm font-medium flex items-center justify-center gap-2">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Full View
                </button>

                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/40 hover:to-pink-500/40 text-purple-400 hover:text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/30 backdrop-blur-sm font-medium flex items-center justify-center gap-2">
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
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-10 animate-fade-in-up animation-delay-300">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                  <span className="text-orange-400 font-medium uppercase tracking-wider text-sm">
                    Premium Product
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  {allData?.brandName}
                  <span className="block text-3xl lg:text-4xl text-orange-400 font-light mt-2">
                    {allData?.model}
                  </span>
                </h1>
              </div>

              <div className="flex items-center gap-6 p-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="flex text-orange-400 text-xl">
                    {allReview &&
                      [
                        ...Array(Math.round(calculateAverageRating(allReview))),
                      ].map((_, i) => <span key={i}>★</span>)}
                  </div>
                  <span className="text-2xl font-bold text-white">
                    {calculateAverageRating(allReview) || "0.0"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
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
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h6l4-4v4z"
                    />
                  </svg>
                  <span>({allReview?.length || 0} reviews)</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Pricing</h3>
                </div>

                <div className="flex flex-wrap items-end gap-4">
                  <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    Rs. {allData?.price?.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xl text-gray-500 line-through">
                      Rs. {(allData?.price * 1.2)?.toLocaleString()}
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 rounded-full text-sm font-bold flex items-center gap-2">
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
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      Save 20%
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Best price guarantee</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
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
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Key Specifications
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm block">
                      Processor
                    </span>
                    <span className="text-white font-semibold">
                      {allData?.processor}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm block">
                      Memory (RAM)
                    </span>
                    <span className="text-white font-semibold">
                      {allData?.ram}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💾</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm block">Storage</span>
                    <span className="text-white font-semibold">
                      {allData?.storage}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎮</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm block">
                      Graphics
                    </span>
                    <span className="text-white font-semibold">
                      {allData?.graphics}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Product Description
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                {allData?.description}
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-orange-400 text-xl">⚡</span>
                      <span className="font-bold text-white">Stock Alert</span>
                    </div>
                    <p className="text-gray-300">
                      Only{" "}
                      <span className="text-orange-400 font-bold text-xl">
                        {allData?.quantity}
                      </span>{" "}
                      items left in stock!
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl mb-1">📦</div>
                  <div className="text-xs text-gray-400">Limited Stock</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
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
                        d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 3v10a1 1 0 001 1h8a1 1 0 001-1V7M6 7h12l-1 10H7L6 7z"
                      />
                    </svg>
                  </div>
                  <label className="text-lg font-bold text-white">
                    Select Quantity
                  </label>
                </div>

                <div className="flex items-center justify-center bg-gray-800/50 rounded-xl w-fit mx-auto border border-gray-600/50">
                  <button
                    onClick={() => setItemCount(Math.max(1, itemCount - 1))}
                    className="px-6 py-4 text-white hover:text-orange-500 hover:bg-gray-700/50 transition-all duration-300 rounded-l-xl font-bold text-xl"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={itemCount}
                    onChange={(e) =>
                      setItemCount(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-20 text-center bg-transparent text-white text-xl font-bold border-0 focus:ring-0 py-4"
                    min="1"
                  />
                  <button
                    onClick={() => setItemCount(itemCount + 1)}
                    className="px-6 py-4 text-white hover:text-orange-500 hover:bg-gray-700/50 transition-all duration-300 rounded-r-xl font-bold text-xl"
                  >
                    +
                  </button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-gray-400 text-sm">
                    Total:{" "}
                    <span className="text-white font-bold text-lg">
                      Rs. {(allData?.price * itemCount)?.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="group w-full py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl hover:from-orange-600 hover:to-red-600 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-500/50 border-2 border-transparent hover:border-orange-400/50"
                >
                  <span className="flex items-center justify-center gap-3">
                    <svg
                      className="w-6 h-6 group-hover:scale-110 transition-transform"
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
                    Add to Cart - Rs.{" "}
                    {(allData?.price * itemCount)?.toLocaleString()}
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 py-3 bg-gray-800/50 hover:bg-gray-700/80 text-white font-medium rounded-xl transition-all duration-300 border border-gray-600/50 hover:border-gray-500">
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
                    Wishlist
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-gray-800/50 hover:bg-gray-700/80 text-white font-medium rounded-xl transition-all duration-300 border border-gray-600/50 hover:border-gray-500">
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
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {allReview && allOrdered && (
          <div className="mt-24">
            <div className="text-center mb-12 animate-fade-in">
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6 rounded-full"></div>
              <h2 className="text-4xl lg:text-5xl font-extralight mb-4 leading-tight">
                Customer{" "}
                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent font-medium">
                  Reviews
                </span>
              </h2>
              <p className="text-gray-300 text-lg">
                What our customers are saying about this product
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl animate-fade-in-up">
              <div className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
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
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Reviews & Ratings
                  </h3>
                </div>

                <div className="flex items-center gap-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/50">
                  <div className="flex items-center gap-3">
                    <div className="flex text-orange-400 text-2xl">
                      {[
                        ...Array(Math.round(calculateAverageRating(allReview))),
                      ].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <span className="text-3xl font-bold text-white">
                      {calculateAverageRating(allReview)}
                    </span>
                  </div>
                  <div className="text-gray-300">
                    <div className="text-sm text-gray-400">Based on</div>
                    <div className="font-semibold">
                      {allReview.length} reviews
                    </div>
                  </div>
                </div>
              </div>

              <RatingStats
                data={allReview}
                setShowReviewModel={setShowReviewModel}
                isIdInProducts={isIdInProducts}
                allOrdered={allOrdered}
                userID={userID}
                productID={productId}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function SingleProduct() {
  return (
    <Suspense fallback={null}>
      <SingleProductContent />
    </Suspense>
  );
}
