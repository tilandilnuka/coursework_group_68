"use client";

import { useState, useEffect } from "react";
import { getCookie } from "@/actions/auth";
import SideBar from "@/components/SideBar";
import Link from "next/link";
import { allOrders, deleteOrder } from "@/actions/order";
import ModernToast from "@/components/ModernToast";
import { FaClipboardList } from "react-icons/fa";

const Orders = () => {
  const [allData, setAllData] = useState();
  const [limit] = useState(9);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [deleted, setDeleted] = useState(false);

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const [filterValues, setFilterValues] = useState({
    sort: "",
    price: "",
    status: "",
  });

  const [searchValues, setSearchValues] = useState({
    search: "",
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const handleDelete = async (id) => {
    if (getCookie("token_user")) {
      const token = getCookie("token_user");
      const clicked = confirm(`You are about to delete ${id}`);

      if (clicked) {
        await deleteOrder(id, token)
          .then(() => {
            setAlert({
              ...alert,
              loading: false,
              message: "Order deleted successfully.",
              error: false,
              success: true,
            });
            setDeleted((prev) => !prev);
            setTimeout(resetAlert, 2000);
          })
          .catch(() => {
            setAlert({
              ...alert,
              loading: false,
              message: "There was an error deleting the order.",
              error: true,
              success: false,
            });
            setTimeout(resetAlert, 2000);
          });
      }
    } else {
      window.alert("You don't have the permission to perform this action.");
    }
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setFilterValues({ ...filterValues, [name]: e.target.value });
  };

  const resetFilter = () => {
    setFilterValues({ sort: "", price: "", status: "" });
  };

  const nextPage = () => {
    setPage((oldPage) => {
      const next = oldPage + 1;
      return next > totalPages ? 1 : next;
    });
  };

  const prevPage = () => {
    setPage((oldPage) => {
      const prev = oldPage - 1;
      return prev <= 0 ? totalPages : prev;
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    setAlert((prev) => ({ ...prev, loading: true }));

    const params = { limit, page };
    if (filterValues.sort) params.sort = filterValues.sort;
    if (filterValues.price) params.price = filterValues.price;
    if (filterValues.status) params.status = filterValues.status;
    if (searchValues.search) params.orderId = searchValues.search;

    try {
      const data = await allOrders(params);
      if (data.status && data.status === "success") {
        setAllData(data.doc);
        setTotalPages(Math.ceil(data.totalCount / limit));
        setAlert({
          loading: false,
          message: data.message,
          error: false,
          success: true,
        });
        window.setTimeout(resetAlert, 1000);
      } else {
        setAlert({
          loading: false,
          message: data.message || "Failed to load orders.",
          error: true,
          success: false,
        });
      }
    } catch (err) {
      setAlert({
        loading: false,
        message: err.message,
        error: true,
        success: false,
      });
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [page, filterValues, deleted]);

  const statusBadge = (value) => {
    if (value === "completed") {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-500/15 border border-green-500/30 text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          Completed
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/15 border border-orange-500/30 text-orange-400">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse inline-block" />
        Pending
      </span>
    );
  };

  return (
    <>
      <SideBar>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          {alert?.message && (
            <ModernToast alert={alert} setAlert={resetAlert} />
          )}

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-8 rounded-full" />
                <h1 className="text-5xl lg:text-6xl font-extralight mb-4 leading-tight">
                  All{" "}
                  <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent font-medium">
                    Orders
                  </span>
                </h1>
                <p className="text-gray-400 text-lg">
                  Manage and track all customer orders
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 mb-10 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
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
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-white">
                    Filter Orders
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={resetFilter}
                  className="px-5 py-2.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500 hover:to-red-500 text-orange-400 hover:text-white rounded-xl transition-all duration-300 border border-orange-500/30 hover:border-transparent text-sm font-medium"
                >
                  Reset Filters
                </button>
              </div>

              <form
                className="grid grid-cols-1 md:grid-cols-3 gap-5"
                onSubmit={handleSubmit}
              >
                <div className="relative">
                  <label
                    htmlFor="sort"
                    className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
                  >
                    Sort By
                  </label>
                  <select
                    id="sort"
                    value={filterValues.sort}
                    onChange={handleChange("sort")}
                    className="w-full px-4 py-3.5 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 appearance-none cursor-pointer text-sm"
                  >
                    <option value="">Default</option>
                    <option value="asc">Date: Oldest First</option>
                    <option value="desc">Date: Newest First</option>
                  </select>
                  <svg
                    className="absolute right-3 top-[2.6rem] w-4 h-4 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
                  >
                    Price Range
                  </label>
                  <input
                    type="text"
                    id="price"
                    value={filterValues.price}
                    onChange={handleChange("price")}
                    placeholder="e.g. 10-50"
                    className="w-full px-4 py-3.5 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-sm"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="status"
                    className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    value={filterValues.status}
                    onChange={handleChange("status")}
                    className="w-full px-4 py-3.5 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 appearance-none cursor-pointer text-sm"
                  >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                  <svg
                    className="absolute right-3 top-[2.6rem] w-4 h-4 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                <div className="col-span-1 md:col-span-3 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25 flex items-center gap-2"
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Apply Filters
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl border border-gray-700/30 shadow-2xl overflow-hidden">
              {alert?.loading && (
                <div className="flex items-center justify-center py-16">
                  <div className="w-10 h-10 border-4 border-gray-700 rounded-full animate-spin border-t-orange-500" />
                </div>
              )}

              {!alert?.loading && (!allData || allData.length === 0) && (
                <div className="text-center py-24 px-6">
                  <div className="relative mx-auto w-24 h-24 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-xl" />
                    <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-full w-full h-full flex items-center justify-center border border-gray-700/50">
                      <FaClipboardList className="text-gray-400 text-3xl" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">
                    No Orders Found
                  </h2>
                  <p className="text-gray-400">
                    No orders match your current filters.
                  </p>
                </div>
              )}

              {!alert?.loading && allData && allData.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700/50">
                        <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Sub Total
                        </th>
                        <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="text-left px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allData.map((order, index) => (
                        <tr
                          key={order._id ?? index}
                          className="border-b border-gray-700/30 hover:bg-white/[0.03] transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <Link
                              href={`/products/orderDetails?orderId=${order._id}`}
                              className="text-orange-400 hover:text-orange-300 text-sm font-mono transition-colors duration-200 underline-offset-2 hover:underline"
                            >
                              {order._id}
                            </Link>
                          </td>

                          <td className="px-6 py-4">
                            <span className="text-white font-bold text-sm">
                              Rs. {Number(order.subTotal).toLocaleString()}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            {statusBadge(order.status)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400">
                            {order.createdAt.split("T")[0]}
                          </td>

                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDelete(order._id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-red-400 hover:text-white hover:bg-red-500/20 border border-red-500/30 hover:border-red-500 rounded-lg text-xs font-semibold transition-all duration-200"
                            >
                              <svg
                                className="w-3.5 h-3.5"
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
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-between px-6 py-5 border-t border-gray-700/30">
                  <p className="text-xs text-gray-400 mb-3 lg:mb-0">
                    Page{" "}
                    <span className="text-orange-400 font-semibold">
                      {page}
                    </span>{" "}
                    of{" "}
                    <span className="text-orange-400 font-semibold">
                      {totalPages}
                    </span>
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevPage}
                      disabled={page === 1}
                      className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 border border-gray-600/50 hover:border-gray-500 text-sm font-medium flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <svg
                        className="w-3.5 h-3.5"
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
                      Prev
                    </button>

                    <div className="flex gap-1">
                      {[...Array(Math.min(totalPages, 7))].map((_, index) => {
                        let pageNumber;
                        if (totalPages <= 7) {
                          pageNumber = index + 1;
                        } else if (page <= 4) {
                          pageNumber = index + 1;
                        } else if (page > totalPages - 4) {
                          pageNumber = totalPages - 6 + index;
                        } else {
                          pageNumber = page - 3 + index;
                        }
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => setPage(pageNumber)}
                            className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-200 ${
                              page === pageNumber
                                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 scale-105"
                                : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-gray-600/50"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={nextPage}
                      disabled={page === totalPages}
                      className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 border border-gray-600/50 hover:border-gray-500 text-sm font-medium flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next
                      <svg
                        className="w-3.5 h-3.5"
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
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SideBar>
    </>
  );
};

export default Orders;
