"use client";

import { ShopContext } from "@/context/show-context";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { resolveCatalogImage } from "@/data/productCatalog";
import { getCookie } from "@/actions/auth";
import { getProfile } from "@/actions/user";

const DELIVERY_OPTIONS = [
  {
    id: "same-day-colombo",
    label: "Same-day Colombo",
    badge: "Fastest",
    description:
      "Available in Colombo for selected items when your delivery city is Colombo.",
    eta: "Arrives today",
  },
  {
    id: "next-day-islandwide",
    label: "Next-day island-wide",
    badge: "Most areas",
    description:
      "Next-day delivery across many areas island-wide with secure packing and tracking.",
    eta: "Arrives tomorrow",
  },
];

const DELIVERY_DETAILS_STORAGE_KEY = "cartDeliveryDetails";

const EMPTY_DELIVERY_DETAILS = {
  deliveryOption: DELIVERY_OPTIONS[0].id,
  fullName: "",
  email: "",
  phone: "",
  streetAddress: "",
  city: "",
  region: "",
  postalCode: "",
  notes: "",
};

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
  const [deliveryDetails, setDeliveryDetails] = useState(EMPTY_DELIVERY_DETAILS);
  const [deliveryError, setDeliveryError] = useState("");
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [hasLoadedDeliveryDetails, setHasLoadedDeliveryDetails] =
    useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const savedDetails = localStorage.getItem(DELIVERY_DETAILS_STORAGE_KEY);

    if (savedDetails) {
      try {
        setDeliveryDetails((current) => ({
          ...current,
          ...JSON.parse(savedDetails),
        }));
      } catch (error) {
        console.error("Failed to parse saved delivery details:", error);
      }
    }

    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);

        setDeliveryDetails((current) => ({
          ...current,
          fullName: current.fullName || parsedUser.username || "",
          email: current.email || parsedUser.email || "",
        }));

        const token = getCookie("token_user");

        if (token && parsedUser?._id) {
          setIsProfileLoading(true);
          getProfile(parsedUser._id, token)
            .then((data) => {
              if (data?.status === "success" && data?.doc) {
                setDeliveryDetails((current) => ({
                  ...current,
                  streetAddress:
                    current.streetAddress || data.doc.streetAddress || "",
                  city: current.city || data.doc.city || "",
                  region: current.region || data.doc.region || "",
                  postalCode: current.postalCode || data.doc.postalCode || "",
                }));
              }
            })
            .catch((error) => {
              console.error("Failed to prefill profile details:", error);
            })
            .finally(() => {
              setIsProfileLoading(false);
            });
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }

    setHasLoadedDeliveryDetails(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !hasLoadedDeliveryDetails) {
      return;
    }

    localStorage.setItem(
      DELIVERY_DETAILS_STORAGE_KEY,
      JSON.stringify(deliveryDetails),
    );
  }, [deliveryDetails, hasLoadedDeliveryDetails]);

  const selectedDeliveryOption =
    DELIVERY_OPTIONS.find(
      (option) => option.id === deliveryDetails.deliveryOption,
    ) || DELIVERY_OPTIONS[0];

  const handleDeliveryFieldChange = (name) => (event) => {
    setDeliveryError("");
    setDeliveryDetails((current) => ({
      ...current,
      [name]: event.target.value,
    }));
  };

  const validateDeliveryDetails = () => {
    const requiredFields = [
      ["fullName", "full name"],
      ["email", "email address"],
      ["phone", "phone number"],
      ["streetAddress", "street address"],
      ["city", "city"],
    ];

    for (const [field, label] of requiredFields) {
      if (!deliveryDetails[field]?.trim()) {
        return `Please enter your ${label} before checkout.`;
      }
    }

    const emailPattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailPattern.test(deliveryDetails.email.trim().toLowerCase())) {
      return "Please enter a valid email address before checkout.";
    }

    const numericPhone = deliveryDetails.phone.replace(/\D/g, "");

    if (numericPhone.length < 9) {
      return "Please enter a valid phone number before checkout.";
    }

    if (
      deliveryDetails.deliveryOption === "same-day-colombo" &&
      !deliveryDetails.city.toLowerCase().includes("colombo")
    ) {
      return "Same-day delivery is currently available only for Colombo addresses. Please update the city or choose next-day delivery.";
    }

    return "";
  };

  const makePayment = async () => {
    const validationMessage = validateDeliveryDetails();

    if (validationMessage) {
      setDeliveryError(validationMessage);
      return;
    }

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
        deliveryDetails: {
          ...deliveryDetails,
          deliveryLabel: selectedDeliveryOption.label,
          deliveryEta: selectedDeliveryOption.eta,
        },
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

  const itemCount = Object.values(cartItems).length;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <nav className="flex items-center justify-center gap-3 text-sm mb-8">
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <span className="text-gray-600">/</span>
                <Link
                  href="/products/allProducts"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Products
                </Link>
                <span className="text-gray-600">/</span>
                <span className="text-orange-400">Shopping Cart</span>
              </nav>

              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8 rounded-full" />
              <h1 className="text-6xl lg:text-7xl font-extralight mb-6 leading-tight">
                Your Shopping
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent font-medium">
                  Cart
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Review your selected items and proceed to secure checkout
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 flex-wrap mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">
                  {itemCount}
                </div>
                <div className="text-sm text-gray-400">Items</div>
              </div>
              <div className="w-px h-8 bg-gray-700" />
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">
                  Rs. {getTotalCartAmount().toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Total</div>
              </div>
              <div className="w-px h-8 bg-gray-700" />
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">FREE</div>
                <div className="text-sm text-gray-400">Shipping</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
              {itemCount === 0 ? (
                <div className="text-center py-24">
                  <div className="relative mx-auto w-32 h-32 mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-xl" />
                    <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-full w-full h-full flex items-center justify-center border border-gray-700/50">
                      <svg
                        className="w-14 h-14 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0L17 18M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm10 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Your cart is empty
                  </h2>
                  <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed mb-8">
                    Browse our premium collection and add products to get
                    started.
                  </p>
                  <button
                    onClick={() => router.push("/products/allProducts")}
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25 inline-flex items-center gap-2"
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
                        d="M5 12h14M12 5l7 7-7 7"
                      />
                    </svg>
                    Browse Products
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                      Cart Items
                      <span className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-orange-400 rounded-full text-sm font-bold">
                        {itemCount}
                      </span>
                    </h2>
                  </div>

                  <div className="space-y-5">
                    {Object.values(cartItems).map((item, index) => {
                      const cartItemId = item.itemId || item.itemid;
                      const cartItemCount = cartItems[cartItemId]?.count || 1;

                      return (
                        <div
                          key={cartItemId}
                          className="group bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/30 hover:border-orange-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/10"
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animation: "fadeInUp 0.6s ease-out forwards",
                          }}
                        >
                          <div className="flex flex-col sm:flex-row gap-6">
                            <div className="relative flex-shrink-0 w-full sm:w-36 h-36 bg-white rounded-2xl overflow-hidden border border-gray-200/10">
                              <Image
                                src={resolveCatalogImage(item.itemimages)}
                                alt={item.itemtitle}
                                fill
                                sizes="144px"
                                className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-orange-300 transition-colors duration-300 line-clamp-2">
                                {item.itemtitle}
                              </h3>

                              <div className="flex flex-wrap items-center gap-4 mb-4">
                                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                                  Rs. {item.itemprice.toLocaleString()}
                                </span>
                                <span className="text-sm text-gray-400">
                                  per item
                                </span>
                                <span className="text-xs text-gray-500">
                                  SKU #{String(cartItemId).slice(-6)}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 mb-5">
                                <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-green-400 text-sm font-medium">
                                  In Stock
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-600/50 overflow-hidden">
                                  <button
                                    onClick={() => removeFromCart(cartItemId)}
                                    aria-label="Decrease quantity"
                                    className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/15 transition-all duration-200"
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
                                        strokeWidth={2.5}
                                        d="M20 12H4"
                                      />
                                    </svg>
                                  </button>
                                  <input
                                    type="number"
                                    value={cartItemCount}
                                    onChange={(e) =>
                                      updateCartItemCount(
                                        cartItemId,
                                        Number(e.target.value),
                                        item.itemprice,
                                        item.itemtitle,
                                        item.itemimages,
                                      )
                                    }
                                    className="w-14 text-center bg-transparent text-white border-x border-gray-600/50 focus:outline-none text-base font-bold py-2"
                                    min="1"
                                    aria-label="Item quantity"
                                    style={{ MozAppearance: "textfield" }}
                                  />
                                  <button
                                    onClick={() =>
                                      addToCart(
                                        cartItemId,
                                        item.itemprice,
                                        item.itemtitle,
                                        item.itemimages,
                                      )
                                    }
                                    aria-label="Increase quantity"
                                    className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-green-500/15 transition-all duration-200"
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
                                        strokeWidth={2.5}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                      />
                                    </svg>
                                  </button>
                                </div>

                                <button
                                  onClick={() => removeEntireItem(cartItemId)}
                                  className="flex items-center gap-2 px-4 py-2.5 text-red-400 hover:text-white hover:bg-red-500/20 border border-red-500/30 hover:border-red-500 rounded-xl text-sm font-medium transition-all duration-300"
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
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                  Remove
                                </button>
                              </div>
                            </div>

                            <div className="flex-shrink-0 sm:text-right">
                              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-4 sm:min-w-[120px]">
                                <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider">
                                  Subtotal
                                </p>
                                <p className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                  Rs.{" "}
                                  {(
                                    item.itemprice * item.count
                                  ).toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
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

                  <div className="mt-8 rounded-3xl border border-gray-700/50 bg-gray-800/40 p-6">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Delivery details
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-gray-400">
                          We offer same-day delivery in Colombo for selected
                          items and next-day delivery across many areas
                          island-wide. Orders are securely packed and tracked
                          from dispatch to the doorstep.
                        </p>
                      </div>
                      {isProfileLoading && (
                        <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300">
                          Loading saved profile
                        </span>
                      )}
                    </div>

                    <div className="mb-5 grid gap-3">
                      {DELIVERY_OPTIONS.map((option) => {
                        const isSelected =
                          option.id === deliveryDetails.deliveryOption;

                        return (
                          <label
                            key={option.id}
                            className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
                              isSelected
                                ? "border-orange-500/60 bg-gradient-to-r from-orange-500/15 to-red-500/10 shadow-lg shadow-orange-500/10"
                                : "border-gray-700/60 bg-gray-900/40 hover:border-gray-500/70"
                            }`}
                          >
                            <input
                              type="radio"
                              name="deliveryOption"
                              value={option.id}
                              checked={isSelected}
                              onChange={handleDeliveryFieldChange(
                                "deliveryOption",
                              )}
                              className="sr-only"
                            />
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-white">
                                    {option.label}
                                  </span>
                                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-300">
                                    {option.badge}
                                  </span>
                                </div>
                                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                                  {option.description}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold text-green-400">
                                  {option.eta}
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                  Free shipping
                                </p>
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="fullName"
                          className="mb-2 block text-sm font-medium text-gray-300"
                        >
                          Full name
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          value={deliveryDetails.fullName}
                          onChange={handleDeliveryFieldChange("fullName")}
                          className="w-full rounded-2xl border border-gray-700 bg-gray-900/60 px-4 py-3 text-sm text-white placeholder-gray-500 transition-all focus:border-orange-500 focus:outline-none"
                          placeholder="Enter the recipient's full name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="deliveryEmail"
                          className="mb-2 block text-sm font-medium text-gray-300"
                        >
                          Email address
                        </label>
                        <input
                          id="deliveryEmail"
                          type="email"
                          value={deliveryDetails.email}
                          onChange={handleDeliveryFieldChange("email")}
                          className="w-full rounded-2xl border border-gray-700 bg-gray-900/60 px-4 py-3 text-sm text-white placeholder-gray-500 transition-all focus:border-orange-500 focus:outline-none"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="deliveryPhone"
                          className="mb-2 block text-sm font-medium text-gray-300"
                        >
                          Phone number
                        </label>
                        <input
                          id="deliveryPhone"
                          type="tel"
                          value={deliveryDetails.phone}
                          onChange={handleDeliveryFieldChange("phone")}
                          className="w-full rounded-2xl border border-gray-700 bg-gray-900/60 px-4 py-3 text-sm text-white placeholder-gray-500 transition-all focus:border-orange-500 focus:outline-none"
                          placeholder="+94 77 123 4567"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="streetAddress"
                          className="mb-2 block text-sm font-medium text-gray-300"
                        >
                          Street address
                        </label>
                        <input
                          id="streetAddress"
                          type="text"
                          value={deliveryDetails.streetAddress}
                          onChange={handleDeliveryFieldChange("streetAddress")}
                          className="w-full rounded-2xl border border-gray-700 bg-gray-900/60 px-4 py-3 text-sm text-white placeholder-gray-500 transition-all focus:border-orange-500 focus:outline-none"
                          placeholder="House number, street, and area"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="deliveryCity"
                          className="mb-2 block text-sm font-medium text-gray-300"
                        >
                          City
                        </label>
                        <input
                          id="deliveryCity"
                          type="text"
                          value={deliveryDetails.city}
                          onChange={handleDeliveryFieldChange("city")}
                          className="w-full rounded-2xl border border-gray-700 bg-gray-900/60 px-4 py-3 text-sm text-white placeholder-gray-500 transition-all focus:border-orange-500 focus:outline-none"
                          placeholder="Colombo"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="deliveryRegion"
                          className="mb-2 block text-sm font-medium text-gray-300"
                        >
                          Province / district
                        </label>
                        <input
                          id="deliveryRegion"
                          type="text"
                          value={deliveryDetails.region}
                          onChange={handleDeliveryFieldChange("region")}
                          className="w-full rounded-2xl border border-gray-700 bg-gray-900/60 px-4 py-3 text-sm text-white placeholder-gray-500 transition-all focus:border-orange-500 focus:outline-none"
                          placeholder="Western Province"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="deliveryPostalCode"
                          className="mb-2 block text-sm font-medium text-gray-300"
                        >
                          Postal code
                        </label>
                        <input
                          id="deliveryPostalCode"
                          type="text"
                          value={deliveryDetails.postalCode}
                          onChange={handleDeliveryFieldChange("postalCode")}
                          className="w-full rounded-2xl border border-gray-700 bg-gray-900/60 px-4 py-3 text-sm text-white placeholder-gray-500 transition-all focus:border-orange-500 focus:outline-none"
                          placeholder="Optional but helpful"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="deliveryNotes"
                          className="mb-2 block text-sm font-medium text-gray-300"
                        >
                          Delivery notes
                        </label>
                        <textarea
                          id="deliveryNotes"
                          rows="3"
                          value={deliveryDetails.notes}
                          onChange={handleDeliveryFieldChange("notes")}
                          className="w-full rounded-2xl border border-gray-700 bg-gray-900/60 px-4 py-3 text-sm text-white placeholder-gray-500 transition-all focus:border-orange-500 focus:outline-none"
                          placeholder="Apartment number, landmark, or preferred contact note"
                        />
                      </div>
                    </div>

                    {deliveryError && (
                      <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                        {deliveryError}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="lg:w-96 flex-shrink-0">
              <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 sticky top-24 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
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
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Order Summary
                  </h2>
                </div>

                <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 mb-8 overflow-hidden">
                  <div className="flex justify-between items-center px-5 py-4 border-b border-gray-700/50">
                    <span className="text-gray-300 text-sm">
                      Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}
                      )
                    </span>
                    <span className="text-white font-bold">
                      Rs. {getTotalCartAmount().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-5 py-4 border-b border-gray-700/50">
                    <span className="text-gray-300 text-sm">Shipping</span>
                    <span className="text-green-400 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between items-center px-5 py-4 border-b border-gray-700/50">
                    <span className="text-gray-300 text-sm">Insurance</span>
                    <span className="text-green-400 font-bold">Included</span>
                  </div>
                  <div className="flex justify-between items-center px-5 py-4 border-b border-gray-700/50">
                    <span className="text-gray-300 text-sm">Delivery</span>
                    <span className="text-white font-semibold">
                      {selectedDeliveryOption.label}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-5 py-4 bg-gradient-to-r from-orange-500/10 to-red-500/10">
                    <span className="text-white font-bold text-lg">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                      Rs. {getTotalCartAmount().toLocaleString()}
                    </span>
                  </div>
                </div>

                {itemCount > 0 && (
                  <>
                    <button
                      onClick={makePayment}
                      className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-xl hover:shadow-2xl hover:shadow-orange-500/40 mb-4 flex items-center justify-center gap-3 text-base"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <rect x="1" y="4" width="22" height="16" rx="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                      Proceed to Checkout
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => router.push("/products/allProducts")}
                      className="w-full py-3 bg-gray-800/50 hover:bg-gray-700/80 text-white font-semibold rounded-2xl transition-all duration-300 border border-gray-600/50 hover:border-gray-500 backdrop-blur-sm mb-8 flex items-center justify-center gap-2"
                    >
                      Continue Shopping
                    </button>
                  </>
                )}

                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Why shop with us
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        iconBg: "bg-green-500/20",
                        iconColor: "text-green-400",
                        label: "256-bit SSL secure checkout",
                      },
                      {
                        iconBg: "bg-blue-500/20",
                        iconColor: "text-blue-400",
                        label: "Free shipping on all orders",
                      },
                      {
                        iconBg: "bg-purple-500/20",
                        iconColor: "text-purple-400",
                        label: "30-day return policy",
                      },
                      {
                        iconBg: "bg-orange-500/20",
                        iconColor: "text-orange-400",
                        label: "Price match guarantee",
                      },
                      {
                        iconBg: "bg-teal-500/20",
                        iconColor: "text-teal-400",
                        label: "24/7 customer support",
                      },
                    ].map(({ iconBg, iconColor, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 text-gray-300 text-sm"
                      >
                        <div
                          className={`w-8 h-8 ${iconBg} rounded-full flex items-center justify-center flex-shrink-0`}
                        >
                          <svg
                            className={`w-4 h-4 ${iconColor}`}
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
                        {label}
                      </div>
                    ))}
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
