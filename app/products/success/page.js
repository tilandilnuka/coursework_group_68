"use client";

import { useContext, useEffect } from "react";
import { ShopContext } from "@/context/show-context";
import Link from "next/link";

const SuccessPage = () => {
  const { checkout } = useContext(ShopContext);

  useEffect(() => {
    checkout();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
        <div className="flex flex-col items-center space-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-green-500 w-24 h-24 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-5xl font-extrabold text-gray-800">Thank You!</h1>
          <p className="text-gray-600 text-lg">
            Your order has been successfully placed. Check your email for the
            receipt and further details.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 text-white bg-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span className="text-lg font-medium">Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
