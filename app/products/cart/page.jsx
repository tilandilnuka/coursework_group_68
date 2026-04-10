"use client";

import { ShopContext } from "@/context/show-context";
import { useContext, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

const Cart = () => {
  let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

  if (process.env.NEXT_PUBLIC_PRODUCTION == true) {
    API = process.env.NEXT_PUBLIC_API_PRODUCTION;
  }

  const {
    addToCart,
    removeFromCart,
    updateCartItemCount,
    cartItems,
    removeEntireItem,
    getTotalCartAmount,
  } = useContext(ShopContext);

  const router = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
          "pk_test_51H1PjSIzYcTJzt02z5GaR7ntXS7SzKPSg1qSNRkeP55DoPFWyHwQ5MhuzBer27U1YSt1poEhuSHTntS9lvf6em3400mftYOTgG",
      );

      const headers = {
        "Content-Type": "application/json",
      };

      let tempUserId;

      if (localStorage.getItem("user")) {
        tempUserId = JSON.parse(localStorage.getItem("user"))._id;
      }

      const data = {
        products: Object.values(cartItems),
        subTotal: getTotalCartAmount(),
        userId: tempUserId,
      };

      const response = await fetch(`${API}/products/create-checkout-session`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-8">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-2">🏠 Home</span>
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
                <span className="flex items-center gap-2">🛍️ Products</span>
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
                <span className="flex items-center gap-2 text-orange-400 font-medium">
                  🛒 Shopping Cart
                </span>
              </div>

              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8 rounded-full"></div>
              <h1 className="text-6xl lg:text-7xl font-extralight mb-6 leading-tight">
                🛒 Your Shopping
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent font-medium">
                  Cart
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Review your selected items and proceed to secure checkout
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-lg mx-auto mt-12">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
                <div className="text-2xl mb-2">📦</div>
                <div className="text-2xl font-bold text-orange-400">
                  {Object.values(cartItems).length}
                </div>
                <div className="text-sm text-gray-400">Items</div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
                <div className="text-2xl mb-2">💰</div>
                <div className="text-2xl font-bold text-orange-400">
                  Rs. {getTotalCartAmount().toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Total</div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 md:col-span-1 col-span-2">
                <div className="text-2xl mb-2">🚚</div>
                <div className="text-2xl font-bold text-green-400">FREE</div>
                <div className="text-sm text-gray-400">Shipping</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              {Object.values(cartItems).length === 0 ? (
                <div className="text-center py-20">
                  <div className="mb-8">
                    <div className="w-32 h-32 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
                      <span className="text-6xl">🛒</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Your cart is empty
                    </h2>
                    <p className="text-gray-400 text-lg mb-8">
                      Add some amazing products to get started!
                    </p>
                    <button
                      onClick={() => router.push("/products/allProducts")}
                      className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300"
                    >
                      🛍️ Start Shopping
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                      📋 Cart Items
                      <span className="text-orange-400">
                        ({Object.values(cartItems).length})
                      </span>
                    </h2>
                    <div className="text-gray-400 text-sm">
                      🔄 Last updated: Just now
                    </div>
                  </div>

                  <div className="space-y-6">
                    {Object.values(cartItems).map((item, index) => {
                      return (
                        <div
                          key={item.itemId}
                          className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl hover:shadow-orange-500/20"
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animation: "fadeInUp 0.6s ease-out forwards",
                          }}
                        >
                          <div className="flex flex-col md:flex-row gap-8">
                            <div className="relative group">
                              <div className="w-full md:w-40 h-40 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-600/50 p-4">
                                <img
                                  src={`${API}/products/image/${item.itemimages}`}
                                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                  alt={item.itemtitle}
                                />
                              </div>
                              <div className="absolute -top-2 -right-2">
                                <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs font-bold rounded-full shadow-lg">
                                  ✨ Premium
                                </span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors">
                                  💻 {item.itemtitle}
                                </h3>
                                <div className="flex items-center gap-4 mb-4">
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-orange-400">
                                      Rs. {item.itemprice.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-gray-400">
                                      per item
                                    </span>
                                  </div>
                                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                  <div className="text-sm text-gray-400">
                                    SKU: #{String(item.itemId).slice(-6)}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 mb-6">
                                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                  <span className="text-green-400 text-sm font-medium">
                                    ✅ In Stock
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                <div className="flex items-center bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-600/50 p-1">
                                  <button
                                    onClick={() => removeFromCart(item.itemId)}
                                    className="w-12 h-12 flex items-center justify-center text-white hover:text-red-400 hover:bg-red-500/20 rounded-xl transition-all duration-300"
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
                                        d="M20 12H4"
                                      />
                                    </svg>
                                  </button>
                                  <input
                                    type="number"
                                    value={cartItems[item.itemId]?.count}
                                    onChange={(e) =>
                                      updateCartItemCount(
                                        item.itemId,
                                        Number(e.target.value),
                                        item.itemprice,
                                        item.itemtitle,
                                        item.itemimages,
                                      )
                                    }
                                    className="w-20 text-center bg-transparent text-white border-0 focus:ring-0 text-lg font-semibold"
                                    min="1"
                                  />
                                  <button
                                    onClick={() =>
                                      addToCart(
                                        item.itemId,
                                        Number(cartItems[item.itemId]?.count),
                                        item.itemprice,
                                        item.itemtitle,
                                        item.itemimages,
                                      )
                                    }
                                    className="w-12 h-12 flex items-center justify-center text-white hover:text-green-400 hover:bg-green-500/20 rounded-xl transition-all duration-300"
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
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                      />
                                    </svg>
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeEntireItem(item.itemId)}
                                  className="flex items-center gap-2 px-6 py-3 text-red-400 hover:text-white hover:bg-red-500/20 border border-red-500/30 hover:border-red-500 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm"
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
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                  Remove Item
                                </button>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
                                <p className="text-sm text-gray-300 mb-2 flex items-center justify-end gap-2">
                                  🏷️ Item Total
                                </p>
                                <p className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                  Rs.{" "}
                                  {(
                                    item.itemprice * item.count
                                  ).toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                  {item.count} × Rs.{" "}
                                  {item.itemprice.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <div className="lg:w-96">
              <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 sticky top-24 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    📊 Order Summary
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Review your order details
                  </p>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
                    <div className="flex justify-between items-center text-gray-300 mb-3">
                      <span className="flex items-center gap-2">
                        🛍️ Subtotal ({Object.values(cartItems).length} items)
                      </span>
                      <span className="text-white font-bold text-lg">
                        Rs. {getTotalCartAmount().toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-gray-300 mb-3">
                      <span className="flex items-center gap-2">
                        🚚 Shipping
                      </span>
                      <span className="text-green-400 font-bold">FREE</span>
                    </div>

                    <div className="flex justify-between items-center text-gray-300 mb-3">
                      <span className="flex items-center gap-2">
                        🛡️ Insurance
                      </span>
                      <span className="text-green-400 font-bold">Included</span>
                    </div>

                    <div className="border-t border-gray-600/50 pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-bold text-xl flex items-center gap-2">
                          💰 Total
                        </span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                          Rs. {getTotalCartAmount().toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 text-right mt-1">
                        Including all taxes
                      </div>
                    </div>
                  </div>
                </div>

                {Object.values(cartItems).length > 0 && (
                  <>
                    <button
                      onClick={makePayment}
                      className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-500/50 mb-6"
                    >
                      <span className="flex items-center justify-center gap-3 text-lg">
                        💳 Proceed to Checkout
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
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                    </button>

                    <button
                      onClick={() => router.push("/products/allProducts")}
                      className="w-full py-3 bg-gray-800/50 hover:bg-gray-700/80 text-white font-semibold rounded-2xl transition-all duration-300 border border-gray-600/50 hover:border-gray-500 backdrop-blur-sm mb-6"
                    >
                      <span className="flex items-center justify-center gap-2">
                        🛍️ Continue Shopping
                      </span>
                    </button>
                  </>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🛡️ Your Benefits
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300 text-sm">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-4 h-4 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>🔒 256-bit SSL secure checkout</span>
                    </div>

                    <div className="flex items-center text-gray-300 text-sm">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-4 h-4 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>🚚 Free shipping over Rs. 100,000</span>
                    </div>

                    <div className="flex items-center text-gray-300 text-sm">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-4 h-4 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>🔄 30-day return policy</span>
                    </div>

                    <div className="flex items-center text-gray-300 text-sm">
                      <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-4 h-4 text-orange-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>🎯 Price match guarantee</span>
                    </div>

                    <div className="flex items-center text-gray-300 text-sm">
                      <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-4 h-4 text-teal-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>📞 24/7 customer support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
