"use client";

import { useState, useEffect } from "react";
import { getCookie } from "@/actions/auth";
import SideBar from "@/components/SideBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { allOrders, deleteOrder, searchOrders } from "@/actions/order";
import { FaSearch, FaTrashAlt, FaBoxOpen } from "react-icons/fa";

const MyOrders = () => {
  const router = useRouter();
  const [allData, setAllData] = useState();
  const [show, setShow] = useState(false);
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

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

  const { search } = searchValues;
  const { sort, price, status } = filterValues;

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const initialSet = () => {
    setAllData(data);
  };

  const handleDelete = async (id) => {
    let token;

    if (getCookie("token_user")) {
      token = getCookie("token_user");
      let clicked = confirm(`You are about to delete ${id} `);

      if (clicked) {
        await deleteOrder(id, token)
          .then((data) => {
            console.log(data);
            router.refresh();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      alert("You dont't have the permission to perform this action...");
      return;
    }
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setFilterValues({ ...filterValues, [name]: e.target.value });
  };

  const handleSearch = (name) => (e) => {
    e.preventDefault();
    setSearchValues({ ...searchValues, [name]: e.target.value });
  };

  const resetFilter = () => {
    setFilterValues({ sort: "", price: "", status: "" });
  };

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > totalPages) {
        nextPage = 1;
      }
      return nextPage;
    });
  };

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage <= 1) {
        prevPage = totalPages;
      }
      return prevPage;
    });
  };

  useEffect(() => {
    console.log("page changed...", page);

    handleSubmit();
  }, [page, filterValues]);

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    let params;
    setAlert({ ...alert, loading: true });

    let userId;
    if (localStorage.getItem("user")) {
      userId = JSON.parse(localStorage.getItem("user"))._id;
    }

    params = {
      userId,
      limit,
      page,
    };

    if (filterValues?.sort) {
      params.sort = filterValues.sort.split("T")[0];
    }
    if (filterValues?.price) {
      params.price = filterValues.price;
    }
    if (filterValues?.status) {
      params.status = filterValues.status;
    }
    if (searchValues?.search) {
      params.orderId = searchValues.search;
    }

    let token = getCookie("token_user");

    await allOrders(params)
      .then((data) => {
        console.log(data);
        if (data.status && data.status == "success") {
          setAllData(data.doc);
          console.log(data.totalCount);
          let totalCount = data.totalCount;
          setTotalPages(Math.ceil(totalCount / limit));
          setShow(false);

          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            resetAlert();
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);

        setAlert({
          ...alert,
          loading: false,
          message: err.message,
          error: true,
          success: false,
        });
      });
  };

  console.log(allData, "is there data...");

  return (
    <>
      <SideBar>
        <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-20 sm:ml-64 flex flex-col items-center justify-center">
          <div className="p-6 w-full max-w-7xl mx-auto">
            <div className="bg-gray-900/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-800/50">
              <div className="mb-8 text-center">
                <h2 className="text-4xl font-extrabold text-white mb-4">
                  My <span className="text-orange-500">Orders</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Manage and track your orders easily.
                </p>
              </div>

              <div className="mb-6 bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search by Order ID"
                    className="w-full px-4 py-3 pl-12 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    value={search}
                    onChange={handleSearch("search")}
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <button
                    onClick={handleSubmit}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Search
                  </button>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-300">Filters</h3>
                  <button
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-medium rounded-lg transition-colors"
                    onClick={() => resetFilter()}
                  >
                    Reset Filters
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    value={sort}
                    onChange={handleChange("sort")}
                  >
                    <option value="">Sort by Date</option>
                    <option value="createdAt">Earliest to Newest</option>
                    <option value="-createdAt">Newest to Earliest</option>
                  </select>

                  <select
                    className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    value={status}
                    onChange={handleChange("status")}
                  >
                    <option value="">All Status</option>
                    <option value="processing">Processing</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="received">Received</option>
                  </select>

                  <select
                    className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    value={price}
                    onChange={handleChange("price")}
                  >
                    <option value="">Any Price</option>
                    <option value="50000">Less than 50,000</option>
                    <option value="100000">Less than 100,000</option>
                    <option value="200000">Less than 200,000</option>
                    <option value="500000">Less than 500,000</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center w-full">
                <div className="overflow-x-auto w-full max-w-6xl">
                  <table className="w-full text-center text-sm text-gray-300 mx-auto">
                    <thead className="bg-gray-800 text-gray-400">
                      <tr>
                        <th className="px-6 py-4">Order ID</th>
                        <th className="px-6 py-4">Subtotal</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Order Date</th>
                        <th className="px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {allData?.length > 0 ? (
                        allData.map((product, index) => (
                          <tr key={index} className="hover:bg-gray-800">
                            <td className="px-6 py-4">
                              <Link
                                href={`/products/orderDetails?orderId=${product._id}`}
                                className="text-orange-500 hover:underline"
                              >
                                {product._id.slice(-8)}
                              </Link>
                            </td>
                            <td className="px-6 py-4">
                              Rs. {product.subTotal}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  {
                                    processing:
                                      "bg-yellow-500/10 text-yellow-400",
                                    dispatched: "bg-blue-500/10 text-blue-400",
                                    received: "bg-green-500/10 text-green-400",
                                  }[product.status]
                                }`}
                              >
                                {product.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {new Date(product.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                className="text-red-500 hover:text-red-700 flex items-center space-x-1"
                                onClick={() => handleDelete(product._id)}
                              >
                                <FaTrashAlt />
                                <span>Delete</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="px-6 py-4 text-center text-gray-500"
                          >
                            <FaBoxOpen className="mx-auto text-4xl mb-2" />
                            No orders found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-400">
                  Showing {allData?.length || 0} orders
                </p>
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={prevPage}
                    className="px-3 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setPage(index + 1)}
                      className={`px-3 py-2 rounded-lg ${
                        {
                          true: "bg-orange-500 text-white",
                          false:
                            "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white",
                        }[page === index + 1]
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={nextPage}
                    className="px-3 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </section>
      </SideBar>
    </>
  );
};

export default MyOrders;
