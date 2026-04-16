"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCompare } from "@/context/compare-context";
import { resolveCatalogImage } from "@/data/productCatalog";

const FloatingCompareBar = () => {
  const pathname = usePathname();
  const {
    compareProducts,
    removeProductFromCompare,
    maxCompareItems,
    isHydrated,
  } = useCompare();

  if (!isHydrated || compareProducts.length === 0) {
    return null;
  }

  if (pathname === "/products/compare") {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 w-[min(92vw,26rem)] rounded-2xl border border-gray-700/70 bg-gray-950/90 p-4 shadow-2xl backdrop-blur-xl">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-300">
          Compare List ({compareProducts.length}/{maxCompareItems})
        </p>
        <Link
          href="/products/compare"
          className="rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        >
          Compare Now
        </Link>
      </div>

      <div className="space-y-2">
        {compareProducts.map((product) => (
          <div
            key={product._id}
            className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900/80 p-2"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-white">
              <Image
                src={resolveCatalogImage(product.images?.[0])}
                alt={product.title || "Compared product"}
                fill
                sizes="40px"
                className="object-contain p-1"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {product.title}
              </p>
              <p className="text-xs text-gray-400">
                Rs. {product.price?.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => removeProductFromCompare(product._id)}
              className="rounded-md px-2 py-1 text-xs font-semibold text-red-300 transition-colors hover:bg-red-500/10 hover:text-red-200"
              aria-label={`Remove ${product.title} from compare list`}
              title="Remove"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloatingCompareBar;
