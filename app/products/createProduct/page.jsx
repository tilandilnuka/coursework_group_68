"use client";

import { useState, useEffect } from "react";
import { getCookie } from "@/actions/auth";
import { createProduct } from "@/actions/product";
import SideBar from "@/components/SideBar";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import { subCategoryData, categoryData } from "@/constants";

const CreateProduct = () => {
  const [values, setValues] = useState({
    title: "",
    brandName: "",
    quantity: "",
    category: "",
    subCategory: "",
    price: "",
    discount: "",
    description: "",
    availableColours: "",
    model: "",
    processor: "",
    ram: "",
    storage: "",
    display: "",
    graphics: "",
    weight: "",
    battery: "",
    keyboardBacklight: "",
    yearsOfWarranty: "",
    windows: "",
    formData: "",
  });

  const [refresh, setRefresh] = useState(false);

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const {
    title,
    brandName,
    quantity,
    category,
    subCategory,
    price,
    discount,
    description,
    availableColours,
    model,
    processor,
    ram,
    storage,
    display,
    graphics,
    weight,
    battery,
    keyboardBacklight,
    yearsOfWarranty,
    windows,
    formData,
  } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, []);

  const handleChange = (name) => (e) => {
    e.preventDefault();
    let value = name == "images" ? e.target.files[0] : e.target.value;
    if (name == "images") {
      formData.append(name, value);
      setValues({ ...values, [name]: value, formData });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleFileChange = (name) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setValues({
          ...values,
          [name]: file,
          [`${name}Preview`]: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "title",
      "brandName",
      "quantity",
      "category",
      "subCategory",
      "price",
      "description",
      "featuredPhoto",
    ];

    for (const field of requiredFields) {
      if (!values[field] || values[field].trim() === "") {
        setAlert({
          message: `${field} is required`,
          error: true,
          loading: false,
          success: false,
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setAlert({ ...alert, loading: true, message: "Creating product..." });
    setValues({ ...values, loading: true, error: false });

    const formData = new FormData();
    for (const key in values) {
      if (key !== "featuredPhotoPreview" && key !== "additionalPhotosPreview") {
        formData.append(key, values[key]);
      }
    }

    const token = getCookie("token_user");
    createProduct(formData, token)
      .then((data) => {
        if (data.status && data.status === "success") {
          setAlert({
            message: "Product created successfully.",
            error: false,
            loading: false,
            success: true,
          });
          setValues({
            ...values,
            title: "",
            brandName: "",
            quantity: "",
            category: "",
            subCategory: "",
            price: "",
            description: "",
            featuredPhoto: "",
            additionalPhotos: "",
            featuredPhotoPreview: "",
            additionalPhotosPreview: "",
          });
        } else {
          setAlert({
            message: data.message,
            error: true,
            loading: false,
            success: false,
          });
        }
      })
      .catch((err) => {
        setAlert({
          message: err.message,
          error: true,
          loading: false,
          success: false,
        });
      });
  };

  return (
    <>
      <Navbar />
      <SideBar>
        <section className="bg-black text-white pt-24 min-h-screen">
          {alert.message && <Modal alert={alert} setAlert={resetAlert} />}
          <div className="py-8 px-4 mx-auto max-w-4xl lg:py-16">
            <div className="flex items-center mb-6">
              <svg
                className="w-8 h-8 text-orange-500 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7h18M3 12h18M3 17h18"
                ></path>
              </svg>
              <h2 className="text-3xl font-bold text-white">
                Create a New Product
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={handleChange("category")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  >
                    <option>Select category</option>
                    {categoryData.map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="subCategory"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Sub Category
                  </label>
                  <select
                    id="subCategory"
                    value={subCategory}
                    onChange={handleChange("subCategory")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  >
                    <option>Select Sub-Category</option>
                    {subCategoryData.map((item, index) => {
                      return (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="brand"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    value={brandName}
                    onChange={handleChange("brandName")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Product brand"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="model"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Model
                  </label>
                  <input
                    type="text"
                    name="model"
                    id="model"
                    value={model}
                    onChange={handleChange("model")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Product Model"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="availableColours"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Available Colours
                  </label>
                  <input
                    type="text"
                    name="availableColours"
                    id="availableColours"
                    value={availableColours}
                    onChange={handleChange("availableColours")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Available Colours"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="processor"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Processor
                  </label>
                  <input
                    type="text"
                    name="processor"
                    id="processor"
                    value={processor}
                    onChange={handleChange("processor")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Processor"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="ram"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Ram
                  </label>
                  <input
                    type="text"
                    name="ram"
                    id="ram"
                    value={ram}
                    onChange={handleChange("ram")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Ram"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="storage"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Storage
                  </label>
                  <input
                    type="text"
                    name="storage"
                    id="storage"
                    value={storage}
                    onChange={handleChange("storage")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Storage"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="display"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Display
                  </label>
                  <input
                    type="text"
                    name="display"
                    id="display"
                    value={display}
                    onChange={handleChange("display")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Display"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="graphics"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Graphics
                  </label>
                  <input
                    type="text"
                    name="graphics"
                    id="graphics"
                    value={graphics}
                    onChange={handleChange("graphics")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Graphics"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="weight"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Weight
                  </label>
                  <input
                    type="text"
                    name="weight"
                    id="weight"
                    value={weight}
                    onChange={handleChange("weight")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Weight"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="battery"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Battery
                  </label>
                  <input
                    type="text"
                    name="battery"
                    id="battery"
                    value={battery}
                    onChange={handleChange("battery")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Battery"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="keyboardBacklight"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Keyboard Backlight
                  </label>
                  <input
                    type="text"
                    name="keyboardBacklight"
                    id="keyboardBacklight"
                    value={keyboardBacklight}
                    onChange={handleChange("keyboardBacklight")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Keyboard Backlight"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="yearsOfWarranty"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Years of Warranty
                  </label>
                  <input
                    type="text"
                    name="yearsOfWarranty"
                    id="yearsOfWarranty"
                    value={yearsOfWarranty}
                    onChange={handleChange("yearsOfWarranty")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Years of Warranty"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="windows"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Windows
                  </label>
                  <input
                    type="text"
                    name="windows"
                    id="windows"
                    value={windows}
                    onChange={handleChange("windows")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Windows"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="numberOfItems"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Number of Items
                  </label>
                  <input
                    type="number"
                    name="numberOfItems"
                    id="numberOfItems"
                    value={quantity}
                    onChange={handleChange("quantity")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="9"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={price}
                    onChange={handleChange("price")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Price"
                    required=""
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="discount"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Discount
                  </label>
                  <input
                    type="discount"
                    name="discount"
                    id="discount"
                    value={discount}
                    onChange={handleChange("discount")}
                    className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="2%"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="8"
                    value={description}
                    onChange={handleChange("description")}
                    className="block p-2.5 w-full text-sm text-white bg-gray-800 rounded-lg border border-gray-700 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your description here"
                  ></textarea>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="featured-photo"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Featured Photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleChange("images")}
                            name="images"
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Upload Product Images
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="file"
                        name="featuredPhoto"
                        id="featuredPhoto"
                        onChange={handleFileChange("featuredPhoto")}
                        className="hidden"
                      />
                      <label
                        htmlFor="featuredPhoto"
                        className="border-2 border-dashed border-orange-500 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-900 hover:bg-gray-800 transition cursor-pointer"
                      >
                        <svg
                          className="w-12 h-12 text-gray-400 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16l-4-4m0 0l4-4m-4 4h18"
                          ></path>
                        </svg>
                        <p className="text-sm text-gray-400">
                          Drag and drop or click to upload Featured Photo
                        </p>
                      </label>
                      {values.featuredPhotoPreview && (
                        <img
                          src={values.featuredPhotoPreview}
                          alt="Featured Preview"
                          className="mt-4 w-full h-48 object-cover rounded-lg"
                        />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        name="additionalPhotos"
                        id="additionalPhotos"
                        onChange={handleFileChange("additionalPhotos")}
                        className="hidden"
                      />
                      <label
                        htmlFor="additionalPhotos"
                        className="border-2 border-dashed border-orange-500 rounded-lg p-4 flex flex-col items-center justify-center bg-gray-900 hover:bg-gray-800 transition cursor-pointer"
                      >
                        <svg
                          className="w-12 h-12 text-gray-400 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16l-4-4m0 0l4-4m-4 4h18"
                          ></path>
                        </svg>
                        <p className="text-sm text-gray-400">
                          Drag and drop or click to upload Additional Photos
                        </p>
                      </label>
                      {values.additionalPhotosPreview && (
                        <img
                          src={values.additionalPhotosPreview}
                          alt="Additional Preview"
                          className="mt-4 w-full h-48 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </section>
      </SideBar>
    </>
  );
};

export default CreateProduct;
