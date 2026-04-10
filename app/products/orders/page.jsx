"use client";

import { useState, useEffect } from "react";
import { getCookie } from "@/actions/auth";
import SideBar from "@/components/SideBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { allOrders, deleteOrder, searchOrders } from "@/actions/order";
import Modal from "@/components/Modal";
import { FaClipboardList } from "react-icons/fa";

const Orders = () => {
  const router = useRouter();
  const [allData, setAllData] = useState();
  const [show, setShow] = useState(false);
  const [limit, setLimit] = useState(9);
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
            setAlert({
              ...alert,
              loading: false,
              message: "Order deleted successfully..",
              error: false,
              success: true,
            });
            setDeleted(!deleted);
            setTimeout(() => {
              resetAlert();
            }, 2000);
          })
          .catch((err) => {
            setAlert({
              ...alert,
              loading: false,
              message: "There was a error deleting product...",
              error: false,
              success: true,
            });
            setDeleted(!deleted);
            setTimeout(() => {
              resetAlert();
            }, 2000);
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
  }, [page, filterValues, deleted]);

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    let params;
    setAlert({ ...alert, loading: true });

    params = {
      limit,
      page,
    };

    if (filterValues?.sort) {
      params.sort = filterValues.sort;
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
        <div className="min-h-screen bg-black text-white pt-32 pb-20">
          <div className="text-center mb-12">
            <FaClipboardList className="text-6xl text-orange-500 mb-4 mx-auto" />
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Orders
              </span>
            </h1>
            <p className="text-gray-400">Manage all customer orders</p>
          </div>
          {alert && alert?.message && (
            <Modal alert={alert} setAlert={resetAlert} />
          )}
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-gray-900 rounded-3xl p-8">
              <div className="p-4">
                <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold mb-4">Filter Orders</h2>
                  <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="sort"
                        className="block text-sm font-medium"
                      >
                        Sort By
                      </label>
                      <select
                        id="sort"
                        value={filterValues.sort}
                        onChange={handleChange("sort")}
                        className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium"
                      >
                        Price Range
                      </label>
                      <input
                        type="text"
                        id="price"
                        value={filterValues.price}
                        onChange={handleChange("price")}
                        placeholder="e.g., 10-50"
                        className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        value={filterValues.status}
                        onChange={handleChange("status")}
                        className="mt-1 block w-full rounded-md bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="col-span-1 md:col-span-3 flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={resetFilter}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Apply
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <table className="w-full table-auto">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr className="text-xs text-left text-gray-500 border-b border-gray-200 dark:border-gray-800">
                    <th className="flex items-center py-3 pl-6 font-medium dark:text-gray-400">
                      <span>OrderID</span>
                    </th>
                    <th className="px-6 py-3 font-medium dark:text-gray-400">
                      SubTotal
                    </th>
                    <th className="px-6 py-3 font-medium dark:text-gray-400">
                      Status
                    </th>

                    <th className="px-6 py-3 font-medium dark:text-gray-400">
                      Ordered Date
                    </th>

                    <th className="px-6 py-3 font-medium dark:text-gray-400">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allData?.map((product, index) => {
                    return (
                      <tr
                        className="border-b border-gray-200 dark:border-gray-800"
                        key={index}
                      >
                        <td className="flex items-center px-6 py-3 text-sm font-medium">
                          <Link
                            href={`/products/orderDetails?orderId=${product._id}`}
                          >
                            <p className="dark:text-gray-400">{product._id}</p>
                          </Link>
                        </td>
                        <td className="px-6 text-sm font-medium dark:text-gray-400">
                          {product.subTotal}
                        </td>
                        <td className="px-6 text-sm font-medium dark:text-gray-400 capitalize">
                          {product.status}
                        </td>
                        <td className="px-6 text-sm font-medium dark:text-gray-400">
                          {product.createdAt.split("T")[0]}
                        </td>

                        <td className="px-6 text-sm font-medium dark:text-gray-400">
                          <span
                            className="inline-block px-2 py-1 text-red-700 bg-red-100 rounded-md dark:bg-gray-800 dark:text-gray-400 cursor-pointer"
                            onClick={() => handleDelete(product._id)}
                          >
                            Delete
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex flex-wrap items-center justify-between px-6 py-3">
                <p className="mb-4 text-xs lg:mb-0 dark:text-gray-400">
                  Showing 1 to 10 of 13 entries
                </p>
                <nav aria-label="page-navigation ">
                  <ul className="flex mb-4 list-style-none lg:mb-0">
                    <li className="page-item  ">
                      <a
                        href="#"
                        className="relative block px-3 py-1 mr-1 text-xs text-gray-700 transition-all duration-300 rounded-md  dark:text-gray-400  hover:bg-blue-100"
                        onClick={prevPage}
                      >
                        Previous
                      </a>
                    </li>
                    {[...Array(totalPages)].map((val, index) => {
                      return (
                        <li
                          key={index}
                          className="page-item "
                          onClick={() => setPage(index + 1)}
                        >
                          <a
                            href="#"
                            className="relative block px-3 py-1 mr-1 text-xs text-gray-100 transition-all duration-300 bg-blue-600 rounded-md hover:text-blue-700 hover:bg-blue-200 dark:hover:text-gray-400 dark:hover:bg-gray-700"
                          >
                            {index + 1}
                          </a>
                        </li>
                      );
                    })}

                    <li className="page-item ">
                      <a
                        href="#"
                        className="relative block px-3 py-1 text-xs text-gray-700 transition-all duration-300 rounded-md dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 "
                        onClick={nextPage}
                      >
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </SideBar>
    </>
  );
};

export default Orders;
