"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShopContext } from "@/context/show-context";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const { addToCart } = useContext(ShopContext);

  const handleImageError = () => {
    setImageError(true);
  };

  const goTo = (link) => {
    setIsLoading(true);
    router.push(link);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product._id);
    // Show success feedback
  };

  const discountPrice = product.price * 1.15;
  const discountPercentage = Math.round(
    ((discountPrice - product.price) / discountPrice) * 100
  );

  // Product specs for display
  const specs = [
    { label: "Processor", value: product.processor },
    { label: "RAM", value: product.ram },
    { label: "Storage", value: product.storage },
    { label: "Graphics", value: product.graphics },
    { label: "Display", value: product.display },
  ].filter((spec) => spec.value); // Only show specs that have values

  return (
    <div className="car-card group relative overflow-hidden transform transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl hover:shadow-orange-500/20 bg-white/90 backdrop-blur-xl border border-white/20 rounded-3xl">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-6 w-12 h-12 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-4 right-4 z-30">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg backdrop-blur-sm">
            <span className="flex items-center gap-1">
              🔥 -{discountPercentage}%
            </span>
          </div>
        </div>
      )}

      {/* New/Featured Badge */}
      <div className="absolute top-4 left-4 z-30">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-lg backdrop-blur-sm">
          {product.category === "laptop" ? "🔥 Hot" : "✨ New"}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="absolute top-20 right-6 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
        <div className="flex flex-col gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowSpecs(!showSpecs);
            }}
            className="p-3 bg-black/80 backdrop-blur-sm text-white rounded-2xl hover:bg-orange-500 hover:scale-110 transition-all duration-300 shadow-lg"
            title="View Specifications"
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
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button
            className="p-3 bg-black/80 backdrop-blur-sm text-white rounded-2xl hover:bg-red-500 hover:scale-110 transition-all duration-300 shadow-lg"
            title="Add to Wishlist"
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative p-4">
        {/* Product Image */}
        <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50/80 to-gray-100/80 backdrop-blur-sm group-hover:shadow-xl group-hover:shadow-orange-500/10 transition-all duration-700 border border-gray-200/50">
          {!imageError && product?.images && product.images.length > 0 ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/products/image/${product.images[0]}`}
              alt={product.title}
              fill
              className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200/80 to-gray-300/80 backdrop-blur-sm">
              <svg
                className="w-20 h-20 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* Overlay with quick actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                goTo(`/products/singleProduct?productId=${product._id}`);
              }}
              className="px-6 py-3 bg-white/90 backdrop-blur-sm text-gray-800 font-bold rounded-2xl hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              ⚡ Quick View
            </button>
          </div>
        </div>

        {/* Product Title and Details */}
        <div className="px-2">
          <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
            {product?.title ||
              product?.name ||
              product?.brandName ||
              "Untitled Product"}
          </h2>

          {/* Category Badge */}
          <div className="mb-3">
            <span className="text-xs text-gray-500 bg-gray-100/80 backdrop-blur-sm px-2 py-1 rounded-full font-medium border border-gray-200/50">
              {product.category?.toUpperCase() || "PRODUCT"}
            </span>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-yellow-400 text-sm">{"★".repeat(5)}</div>
            <span className="text-gray-600 text-sm font-medium">(4.8)</span>
          </div>

          {/* Price Section */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-gray-800">
                Rs. {product.price?.toLocaleString()}
              </span>
              {discountPrice > product.price && (
                <span className="text-gray-400 text-sm line-through">
                  Rs. {discountPrice?.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              Free shipping
            </span>
          </div>
        </div>

        {/* Specifications Panel */}
        {showSpecs && (
          <div className="mb-6 p-5 bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg animate-fadeIn">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
              <span className="text-xl">🔧</span>
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Specifications
              </span>
            </h4>
            <div className="space-y-3">
              {specs.slice(0, 3).map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 rounded-xl hover:bg-white/50 transition-colors duration-200"
                >
                  <span className="text-gray-600 font-medium">
                    {spec.label}:
                  </span>
                  <span className="font-bold text-gray-800 text-right">
                    {spec.value}
                  </span>
                </div>
              ))}
              {specs.length > 3 && (
                <div className="text-sm text-gray-500 mt-3 p-2 bg-orange-50 rounded-xl border border-orange-100">
                  ✨ +{specs.length - 3} more specifications available
                </div>
              )}
            </div>
          </div>
        )}

        {/* Key Features */}
        <div className="px-2 mb-4">
          <div className="flex flex-wrap gap-1.5">
            {specs.slice(0, 2).map((spec, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gradient-to-r from-orange-50 to-red-50 text-gray-700 rounded-full text-xs font-medium border border-orange-200/50 backdrop-blur-sm hover:from-orange-100 hover:to-red-100 transition-all duration-300"
              >
                {spec.value}
              </span>
            ))}
            {specs.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                +{specs.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-2 space-y-2">
          <button
            onClick={() =>
              goTo(`/products/singleProduct?productId=${product._id}`)
            }
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-gray-800 to-black text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-900 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>👁️ View Details</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
              </>
            )}
          </button>

          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center justify-center gap-2 shadow-md text-sm"
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
              />
            </svg>
            <span>🛒 Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
