"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCompare } from "@/context/compare-context";
import { resolveCatalogImage } from "@/data/productCatalog";

const specificationRows = [
  { label: "Brand", key: "brandName" },
  { label: "Model", key: "model" },
  { label: "Category", key: "category" },
  { label: "Processor", key: "processor" },
  { label: "RAM", key: "ram" },
  { label: "Storage", key: "storage" },
  { label: "Graphics", key: "graphics" },
  { label: "Display", key: "display" },
  { label: "Stock", key: "quantity" },
];

const extractNumber = (value) => {
  if (value === null || value === undefined) {
    return 0;
  }

  const matched = String(value).match(/\d+(\.\d+)?/);
  return matched ? Number(matched[0]) : 0;
};

const getStorageInGb = (value) => {
  const text = String(value || "").toLowerCase();
  const amount = extractNumber(text);

  if (!amount) {
    return 0;
  }

  if (text.includes("tb")) {
    return amount * 1024;
  }

  return amount;
};

const getProcessorScore = (value) => {
  const text = String(value || "").toLowerCase();

  if (!text) {
    return 0;
  }

  const weightedKeywords = [
    { token: "elite", weight: 7 },
    { token: "pro", weight: 6 },
    { token: "a18", weight: 6 },
    { token: "m2", weight: 6 },
    { token: "snapdragon", weight: 5 },
    { token: "tensor", weight: 4 },
    { token: "dimensity", weight: 3 },
  ];

  return weightedKeywords.reduce((score, item) => {
    if (text.includes(item.token)) {
      return score + item.weight;
    }

    return score;
  }, 0);
};

const getValueScore = (product) => {
  const price = Number(product?.price) || 0;
  if (!price) {
    return 0;
  }

  const ramGb = extractNumber(product?.ram);
  const storageGb = getStorageInGb(product?.storage);
  const displayInches = extractNumber(product?.display);
  const stock = extractNumber(product?.quantity);
  const processorScore = getProcessorScore(product?.processor);

  const capabilityScore =
    ramGb * 2.2 +
    storageGb / 180 +
    displayInches * 0.8 +
    stock * 0.12 +
    processorScore;

  return capabilityScore / Math.sqrt(price / 1000);
};

const getBestChoiceReasons = (bestProduct, allProducts) => {
  if (!bestProduct || !Array.isArray(allProducts) || allProducts.length === 0) {
    return [];
  }

  const bestPrice = Number(bestProduct.price) || 0;
  const bestRam = extractNumber(bestProduct.ram);
  const bestStorage = getStorageInGb(bestProduct.storage);
  const bestDisplay = extractNumber(bestProduct.display);

  const prices = allProducts
    .map((item) => Number(item.price) || 0)
    .filter(Boolean);
  const rams = allProducts.map((item) => extractNumber(item.ram));
  const storages = allProducts.map((item) => getStorageInGb(item.storage));
  const displays = allProducts.map((item) => extractNumber(item.display));

  const reasons = [];

  if (prices.length > 1 && bestPrice === Math.min(...prices)) {
    reasons.push("Lowest price among selected products.");
  }

  if (rams.length > 1 && bestRam === Math.max(...rams) && bestRam > 0) {
    reasons.push(`Top RAM capacity (${bestProduct.ram}).`);
  }

  if (
    storages.length > 1 &&
    bestStorage === Math.max(...storages) &&
    bestStorage > 0
  ) {
    reasons.push(`Highest storage option (${bestProduct.storage}).`);
  }

  if (
    displays.length > 1 &&
    bestDisplay === Math.max(...displays) &&
    bestDisplay > 0
  ) {
    reasons.push(
      `Largest display in this comparison (${bestProduct.display}).`,
    );
  }

  if (reasons.length === 0) {
    reasons.push(
      "Best overall value score based on price, performance specs, display size, and availability.",
    );
  }

  return reasons.slice(0, 3);
};

export default function CompareProductsPage() {
  const {
    compareProducts,
    removeProductFromCompare,
    clearCompare,
    maxCompareItems,
    isHydrated,
  } = useCompare();

  const bestChoiceId = useMemo(() => {
    if (compareProducts.length === 0) {
      return null;
    }

    return compareProducts.reduce((bestId, product, index, allProducts) => {
      if (!bestId) {
        return product._id;
      }

      const bestProduct = allProducts.find((item) => item._id === bestId);
      const currentScore = getValueScore(product);
      const bestScore = getValueScore(bestProduct);

      if (currentScore > bestScore) {
        return product._id;
      }

      return bestId;
    }, null);
  }, [compareProducts]);

  const bestChoiceProduct = useMemo(
    () =>
      compareProducts.find((product) => product._id === bestChoiceId) || null,
    [compareProducts, bestChoiceId],
  );

  const bestChoiceReasons = useMemo(
    () => getBestChoiceReasons(bestChoiceProduct, compareProducts),
    [bestChoiceProduct, compareProducts],
  );

  if (!isHydrated) {
    return <div className="min-h-screen bg-black" />;
  }

  if (compareProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-6 pb-20 pt-32 text-white">
        <div className="mx-auto max-w-2xl rounded-3xl border border-gray-700/50 bg-gray-900/70 p-10 text-center shadow-2xl backdrop-blur-xl">
          <h1 className="mb-4 text-4xl font-semibold">Comparison Empty</h1>
          <p className="mb-8 text-gray-300">
            Add up to {maxCompareItems} products from the catalog to compare key
            specs side-by-side.
          </p>
          <Link
            href="/products/allProducts"
            className="inline-flex items-center rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 font-semibold text-white"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-6 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-orange-300">
              Product Comparison
            </p>
            <h1 className="text-4xl font-semibold">
              Compare {compareProducts.length} Products
            </h1>
          </div>
          <button
            onClick={clearCompare}
            className="rounded-xl border border-red-400/40 px-4 py-2 text-sm font-semibold text-red-200 transition-colors hover:bg-red-500/10"
          >
            Clear All
          </button>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {compareProducts.map((product) => (
            <div
              key={product._id}
              className={`rounded-2xl border bg-gray-900/80 p-4 shadow-xl ${
                product._id === bestChoiceId
                  ? "border-emerald-400/70 ring-2 ring-emerald-400/30"
                  : "border-gray-700/70"
              }`}
            >
              {product._id === bestChoiceId && (
                <div className="mb-3 space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-200">
                    Best Choice
                  </div>
                  {bestChoiceReasons.length > 0 && (
                    <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3 text-xs text-emerald-100">
                      <p className="mb-1 font-semibold">Why this is best:</p>
                      <ul className="list-disc space-y-1 pl-4">
                        {bestChoiceReasons.map((reason) => (
                          <li key={reason}>{reason}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-white">
                <Image
                  src={resolveCatalogImage(product.images?.[0])}
                  alt={product.title || "Compared product"}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-3"
                />
              </div>
              <h2 className="mb-1 line-clamp-2 text-lg font-semibold">
                {product.title}
              </h2>
              <p className="mb-4 text-orange-300">
                Rs. {product.price?.toLocaleString()}
              </p>
              <button
                onClick={() => removeProductFromCompare(product._id)}
                className="rounded-lg border border-red-400/40 px-3 py-1.5 text-sm font-medium text-red-200 transition-colors hover:bg-red-500/10"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-700/70 bg-gray-900/80 shadow-xl">
          <table className="min-w-full table-fixed border-collapse">
            <thead>
              <tr className="border-b border-gray-700/70">
                <th className="w-48 px-4 py-4 text-left text-sm uppercase tracking-wider text-gray-400">
                  Specification
                </th>
                {compareProducts.map((product) => (
                  <th
                    key={product._id}
                    className={`px-4 py-4 text-left text-sm ${
                      product._id === bestChoiceId
                        ? "bg-emerald-500/10 text-emerald-200"
                        : "text-white"
                    }`}
                  >
                    <div className="space-y-1">
                      <div>{product.title}</div>
                      {product._id === bestChoiceId && (
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                          Best Choice
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="px-4 py-3 text-sm font-semibold text-gray-300">
                  Price
                </td>
                {compareProducts.map((product) => (
                  <td
                    key={product._id}
                    className="px-4 py-3 text-sm text-orange-300"
                  >
                    Rs. {product.price?.toLocaleString()}
                  </td>
                ))}
              </tr>
              {specificationRows.map((row) => (
                <tr
                  key={row.key}
                  className="border-b border-gray-800 last:border-b-0"
                >
                  <td className="px-4 py-3 text-sm font-semibold text-gray-300">
                    {row.label}
                  </td>
                  {compareProducts.map((product) => (
                    <td
                      key={`${product._id}-${row.key}`}
                      className="px-4 py-3 text-sm text-gray-200"
                    >
                      {product[row.key] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
