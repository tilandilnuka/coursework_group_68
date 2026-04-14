"use client";

import { Suspense, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShopContext } from "@/context/show-context";
import { useSearchParams } from "next/navigation";
import ModernToast from "@/components/ModernToast";
import { calculateAverageRating } from "@/util";
import { getProductById, resolveCatalogImage } from "@/data/productCatalog";

const SingleProductView = ({ productId }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const { updateCartItemCount, getItemCountById } = useContext(ShopContext);
  const product = getProductById(productId);
  const [itemCount, setItemCount] = useState(() =>
    Math.max(1, getItemCountById(productId) || 1),
  );

  const reviews = product?.reviews || [];
  const averageRating = Number(calculateAverageRating(reviews) || 0);
  const ratingBreakdown = [5, 4, 3, 2, 1].map((rating) => {
    const ratingCount = reviews.filter(
      (review) => Number(review.ratings) === rating,
    ).length;

    return {
      rating,
      percentage: reviews.length ? (ratingCount / reviews.length) * 100 : 0,
    };
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    updateCartItemCount(
      product._id,
      Number(itemCount),
      product.price,
      product.title,
      resolveCatalogImage(product.images?.[0]),
    );
    setAlert({
      message: "Product added to cart!",
      success: true,
      error: false,
      loading: false,
    });
    setTimeout(() => resetAlert(), 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center px-6">
        <div className="max-w-xl text-center bg-gray-900/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-700/50 shadow-2xl">
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8 rounded-full"></div>
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-300 mb-8 leading-relaxed">
            This product is not part of the current frontend sample catalog. Try
            returning to the main collection and picking another item.
          </p>
          <Link
            href="/products/allProducts"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl font-semibold text-white"
          >
            Browse Products
          </Link>
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

      {alert?.message && <ModernToast alert={alert} setAlert={resetAlert} />}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-12 animate-fade-in">
          <nav className="flex items-center gap-3 text-sm mb-8">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <Link
              href="/products/allProducts"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              Products
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-orange-400 flex items-center gap-1">
              Product Details
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
                Frontend sample product data with remote image links powered by
                `next/image`
              </p>
            </div>
          </div>
        </div>

        {lightboxOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Product image zoom"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
              aria-label="Close zoom view"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {product.images.length > 1 && (
              <>
                <button
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageIndex(
                      imageIndex > 0
                        ? imageIndex - 1
                        : product.images.length - 1,
                    );
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-orange-500 rounded-full flex items-center justify-center text-white transition-all duration-300"
                >
                  <svg
                    className="w-7 h-7"
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
                  aria-label="Next image"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageIndex(
                      imageIndex < product.images.length - 1
                        ? imageIndex + 1
                        : 0,
                    );
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-orange-500 rounded-full flex items-center justify-center text-white transition-all duration-300"
                >
                  <svg
                    className="w-7 h-7"
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

            <div
              className="relative w-[90vw] max-w-3xl h-[80vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={resolveCatalogImage(product.images?.[imageIndex])}
                alt={`${product.title} – zoomed view`}
                fill
                sizes="90vw"
                className="object-contain p-4"
                priority
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-1.5 rounded-full backdrop-blur-sm">
                {imageIndex + 1} / {product.images.length}
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-5 animate-fade-in-up">
            <div className="relative">
              <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200/20">
                <Image
                  src={resolveCatalogImage(product.images?.[imageIndex])}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-6 transition-all duration-500"
                />

                <div className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  Sample Catalog
                </div>
                <button
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Zoom image"
                  className="absolute top-4 right-4 w-10 h-10 bg-black/60 hover:bg-orange-500 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg"
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </button>

                {product.images.length > 1 && (
                  <>
                    <button
                      aria-label="Previous image"
                      onClick={() =>
                        setImageIndex(
                          imageIndex > 0
                            ? imageIndex - 1
                            : product.images.length - 1,
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/50 hover:bg-orange-500 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-xl hover:scale-110"
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
                          strokeWidth={2.5}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      aria-label="Next image"
                      onClick={() =>
                        setImageIndex(
                          imageIndex < product.images.length - 1
                            ? imageIndex + 1
                            : 0,
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/50 hover:bg-orange-500 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-xl hover:scale-110"
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
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {product.images.map((_, idx) => (
                    <button
                      key={idx}
                      aria-label={`Go to image ${idx + 1}`}
                      onClick={() => setImageIndex(idx)}
                      className={`rounded-full transition-all duration-300 ${
                        idx === imageIndex
                          ? "w-8 h-2.5 bg-orange-500"
                          : "w-2.5 h-2.5 bg-gray-600 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-300">
                    All Photos
                  </span>
                  <span className="text-xs text-gray-500">
                    ({product.images.length})
                  </span>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={image}
                      aria-label={`View image ${index + 1}`}
                      onClick={() => setImageIndex(index)}
                      className={`relative flex-shrink-0 w-24 h-24 bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                        imageIndex === index
                          ? "border-orange-500 shadow-lg shadow-orange-500/40 ring-2 ring-orange-400/40"
                          : "border-gray-700/40 hover:border-orange-400/60"
                      }`}
                    >
                      <Image
                        src={resolveCatalogImage(image)}
                        alt={`${product.title} view ${index + 1}`}
                        fill
                        sizes="96px"
                        className="object-contain p-2"
                      />
                      {imageIndex === index && (
                        <div className="absolute inset-0 bg-orange-500/10 rounded-xl" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-10 animate-fade-in-up animation-delay-300">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                  <span className="text-orange-400 font-medium uppercase tracking-wider text-sm">
                    {product.category}
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  {product.brandName}
                  <span className="block text-3xl lg:text-4xl text-orange-400 font-light mt-2">
                    {product.model}
                  </span>
                </h1>
              </div>

              <div className="flex items-center gap-6 p-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="flex text-orange-400 text-xl">
                    {[...Array(Math.round(averageRating || 0))].map((_, i) => (
                      <span key={i}>*</span>
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-white">
                    {averageRating.toFixed(1)}
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
                  <span>({reviews.length} sample reviews)</span>
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
                    Rs. {product.price.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xl text-gray-500 line-through">
                      Rs. {(product.price * 1.2).toLocaleString()}
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 rounded-full text-sm font-bold">
                      Save 20%
                    </span>
                  </div>
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
                {[
                  { label: "Processor", value: product.processor },
                  { label: "Memory (RAM)", value: product.ram },
                  { label: "Storage", value: product.storage },
                  { label: "Graphics", value: product.graphics },
                  { label: "Display", value: product.display },
                  { label: "Brand", value: product.brandName },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {spec.label[0]}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm block">
                        {spec.label}
                      </span>
                      <span className="text-white font-semibold">
                        {spec.value}
                      </span>
                    </div>
                  </div>
                ))}
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
                {product.description}
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
                      <span className="font-bold text-white">Stock Alert</span>
                    </div>
                    <p className="text-gray-300">
                      Only{" "}
                      <span className="text-orange-400 font-bold text-xl">
                        {product.quantity}
                      </span>{" "}
                      items left in stock.
                    </p>
                  </div>
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
                    -
                  </button>
                  <input
                    type="number"
                    value={itemCount}
                    onChange={(e) =>
                      setItemCount(
                        Math.max(1, parseInt(e.target.value, 10) || 1),
                      )
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
                      Rs. {(product.price * itemCount).toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="group w-full py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl hover:from-orange-600 hover:to-red-600 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-500/50 border-2 border-transparent hover:border-orange-400/50"
              >
                <span className="flex items-center justify-center gap-3">
                  Add to Cart - Rs.{" "}
                  {(product.price * itemCount).toLocaleString()}
                </span>
              </button>
            </div>
          </div>
        </div>

        {reviews.length > 0 && (
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
                Sample review data bundled with the frontend catalog
              </p>
            </div>

            <div className="grid lg:grid-cols-[320px,1fr] gap-8">
              <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
                <div className="text-5xl font-bold text-white mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="text-gray-400 mb-6">
                  Based on {reviews.length} sample reviews
                </div>

                <div className="space-y-4">
                  {ratingBreakdown.map(({ rating, percentage }) => (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="w-8 text-sm text-gray-300">
                        {rating}
                      </span>
                      <div className="flex-1 h-2 rounded-full bg-gray-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="w-10 text-xs text-gray-400 text-right">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {reviews.map((review, index) => (
                  <div
                    key={`${review.name}-${index}`}
                    className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50 shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {review.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Verified sample review
                        </p>
                      </div>
                      <div className="text-orange-400 font-semibold">
                        {review.ratings}/5
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SingleProductContent = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  return (
    <SingleProductView
      key={productId || "missing-product"}
      productId={productId}
    />
  );
};

export default function SingleProduct() {
  return (
    <Suspense fallback={null}>
      <SingleProductContent />
    </Suspense>
  );
}
