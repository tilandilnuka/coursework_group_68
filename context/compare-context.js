"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "compareProducts";
const MAX_COMPARE_ITEMS = 3;

const CompareContext = createContext(null);

const normalizeProduct = (product) => ({
  _id: product?._id,
  title: product?.title,
  brandName: product?.brandName,
  category: product?.category,
  model: product?.model,
  price: product?.price,
  processor: product?.processor,
  ram: product?.ram,
  storage: product?.storage,
  graphics: product?.graphics,
  display: product?.display,
  quantity: product?.quantity,
  images: Array.isArray(product?.images) ? product.images : [],
});

export const CompareContextProvider = ({ children }) => {
  const [compareProducts, setCompareProducts] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(STORAGE_KEY);
      const parsedProducts = storedValue ? JSON.parse(storedValue) : [];

      if (Array.isArray(parsedProducts)) {
        setCompareProducts(parsedProducts.slice(0, MAX_COMPARE_ITEMS));
      }
    } catch (error) {
      console.error("Failed to read compare products:", error);
      setCompareProducts([]);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(compareProducts));
  }, [compareProducts, isHydrated]);

  const isInCompare = (productId) =>
    compareProducts.some((item) => item._id === productId);

  const addProductToCompare = (product) => {
    if (!product?._id) {
      return { ok: false, reason: "invalid" };
    }

    if (isInCompare(product._id)) {
      return { ok: false, reason: "already-added" };
    }

    if (compareProducts.length >= MAX_COMPARE_ITEMS) {
      return { ok: false, reason: "limit-reached" };
    }

    setCompareProducts((prev) => [...prev, normalizeProduct(product)]);
    return { ok: true, reason: "added" };
  };

  const removeProductFromCompare = (productId) => {
    setCompareProducts((prev) => prev.filter((item) => item._id !== productId));
  };

  const clearCompare = () => {
    setCompareProducts([]);
  };

  const contextValue = {
    compareProducts,
    isHydrated,
    isInCompare,
    addProductToCompare,
    removeProductFromCompare,
    clearCompare,
    maxCompareItems: MAX_COMPARE_ITEMS,
  };

  return (
    <CompareContext.Provider value={contextValue}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);

  if (!context) {
    throw new Error("useCompare must be used within CompareContextProvider");
  }

  return context;
};
