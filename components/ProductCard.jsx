"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShopContext } from "@/context/show-context";
import { resolveCatalogImage } from "@/data/productCatalog";

const StarRating = ({ rating = 4.8, max = 5, size = 14 }) => {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of ${max} stars`}
    >
      {[...Array(max)].map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {half ? (
              <>
                <defs>
                  <linearGradient id={`half-${i}`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="50%" stopColor="#4b5563" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={`url(#half-${i})`}
                />
              </>
            ) : (
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={filled ? "#f97316" : "#374151"}
              />
            )}
          </svg>
        );
      })}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const { addToCart } = useContext(ShopContext);

  const handleImageError = () => setImageError(true);

  const goTo = (link) => {
    setIsLoading(true);
    router.push(link);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(
      product._id,
      product.price,
      product.title,
      resolveCatalogImage(product?.images?.[0]),
    );
  };

  const discountPrice = product.price * 1.15;
  const discountPercentage = Math.round(
    ((discountPrice - product.price) / discountPrice) * 100,
  );

  const specs = [
    { label: "Processor", value: product.processor },
    { label: "RAM", value: product.ram },
    { label: "Storage", value: product.storage },
    { label: "Graphics", value: product.graphics },
    { label: "Display", value: product.display },
  ].filter((spec) => spec.value);

  const primaryImage = imageError
    ? null
    : resolveCatalogImage(product?.images?.[0]);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-700/40 bg-gradient-to-b from-gray-800/80 to-gray-900/90 backdrop-blur-lg shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10">
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute left-3 top-3 z-20 flex flex-col gap-1.5">
        <span className="rounded-lg bg-gradient-to-r from-green-500/90 to-emerald-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-sm">
          {product.category === "accessories" ? "Essential" : "Top Pick"}
        </span>
        {discountPercentage > 0 && (
          <span className="rounded-lg bg-gradient-to-r from-red-500/90 to-pink-500/90 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white shadow-md backdrop-blur-sm">
            -{discountPercentage}% OFF
          </span>
        )}
      </div>

      <div className="absolute right-3 top-3 z-20 flex flex-col gap-2 transition-all duration-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWishlist((v) => !v);
          }}
          className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 ${
            wishlist
              ? "bg-red-500 text-white scale-110"
              : "bg-black/50 text-gray-300 hover:bg-red-500/80 hover:text-white hover:scale-110"
          }`}
          title="Wishlist"
          aria-label="Toggle wishlist"
        >
          <svg
            className="h-4 w-4"
            fill={wishlist ? "currentColor" : "none"}
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowSpecs((v) => !v);
          }}
          className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 ${
            showSpecs
              ? "bg-orange-500 text-white scale-110"
              : "bg-black/50 text-gray-300 hover:bg-orange-500/80 hover:text-white hover:scale-110"
          }`}
          title="Specifications"
          aria-label="View specifications"
        >
          <svg
            className="h-4 w-4"
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
        </button>
      </div>

      <div className="relative mx-4 mt-4 overflow-hidden rounded-xl bg-white">
        <div className="aspect-square w-full">
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={product.title}
              fill
              className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              onError={handleImageError}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg
                className="h-16 w-16 text-gray-300"
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
        </div>

        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-transparent to-transparent pb-4 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              goTo(`/products/singleProduct?productId=${product._id}`);
            }}
            className="rounded-xl bg-white/90 px-5 py-2 text-sm font-bold text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white hover:scale-105"
          >
            Quick View
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <span className="w-fit rounded-full border border-gray-600/50 bg-gray-700/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          {product.category || "Product"}
        </span>
        <h2 className="line-clamp-2 text-sm font-bold leading-snug text-white transition-colors duration-300 group-hover:text-orange-300">
          {product?.title ||
            product?.name ||
            product?.brandName ||
            "Untitled Product"}
        </h2>

        <div className="flex items-center gap-2">
          <StarRating rating={4.8} />
          <span className="text-xs font-medium text-gray-400">
            4.8 <span className="text-gray-600">(127)</span>
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-white">
            Rs.&nbsp;{product.price?.toLocaleString()}
          </span>
          {discountPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              Rs.&nbsp;{Math.round(discountPrice)?.toLocaleString()}
            </span>
          )}
          <span className="ml-auto text-xs font-semibold text-green-400">
            Save {discountPercentage}%
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <svg
            className="h-3.5 w-3.5 text-blue-400"
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
          <span>Free shipping</span>
          <span className="ml-auto flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400"></span>
            In Stock
          </span>
        </div>

        {showSpecs && (
          <div className="rounded-xl border border-gray-600/40 bg-gray-800/60 p-3 backdrop-blur-sm">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-orange-400">
              Specifications
            </p>
            <div className="space-y-1.5">
              {specs.slice(0, 3).map((spec, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-gray-400">{spec.label}</span>
                  <span className="font-semibold text-white">{spec.value}</span>
                </div>
              ))}
              {specs.length > 3 && (
                <p className="pt-1 text-[10px] text-gray-500">
                  +{specs.length - 3} more specs on details page
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto flex gap-2 pt-1">
          <button
            onClick={() =>
              goTo(`/products/singleProduct?productId=${product._id}`)
            }
            disabled={isLoading}
            id={`view-${product._id}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gray-600/50 bg-gray-700/50 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-gray-500 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-1.5">
                <svg
                  className="h-3.5 w-3.5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Loading
              </span>
            ) : (
              <>
                <svg
                  className="h-3.5 w-3.5"
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
                Details
              </>
            )}
          </button>

          <button
            onClick={handleAddToCart}
            id={`cart-${product._id}`}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:from-orange-600 hover:to-red-600 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/30"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.5 5M7 13l2.5 5m0 0L17 18M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
