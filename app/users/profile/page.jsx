"use client";

import { Suspense, useEffect, useState } from "react";
import { getCookie } from "@/actions/auth";
import { getProfile, updateProfile, updateUserPassword } from "@/actions/user";
import { useSearchParams } from "next/navigation";
import SideBar from "@/components/SideBar";

const ProfileContent = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    country: "",
    streetAddress: "",
    city: "",
    region: "",
    postalCode: "",
    description: "",
    formData: "",
  });

  const [userId, setUserId] = useState();
  const searchParams = useSearchParams();
  const [refresh, setRefresh] = useState(false);

  const [authValues, setAuthValues] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

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
    username,
    email,
    country,
    streetAddress,
    city,
    postalCode,
    region,
    description,
    formData,
  } = values;

  useEffect(() => {
    setAlert({ ...alert, loading: true });

    initialProfileData();
  }, [refresh]);

  const initialProfileData = async () => {
    let token = getCookie("token_user");
    let userIdTemp;
    if (localStorage.getItem("user")) {
      userIdTemp = JSON.parse(localStorage.getItem("user"))._id;
    }
    console.log(userIdTemp);
    setUserId(userIdTemp);

    await getProfile(userIdTemp, token)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data);
          setValues({
            username: data.doc.username,
            email: data.doc.email,
            formData: new FormData(),
            images: data.doc.images,
            country: data.doc.country,
            streetAddress: data.doc.streetAddress,
            city: data.doc.city,
            region: data.doc.region,
            postalCode: data.doc.postalCode,
            description: data.doc.description,
          });

          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);

        setAlert({
          ...alert,
          loading: false,
          message: data.message,
          error: true,
          success: false,
        });
      });
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    let value = name == "images" ? e.target.files[0] : e.target.value;

    if (name == "images") {
      console.log(name, value, "workin..");
      formData.append(name, value);
      setValues({ ...values, [name]: value, formData });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });
    let token = getCookie("token_user");

    let data = {
      username,
      email,
      country,
      streetAddress,

      postalCode,
      region,
      description,
    };

    for (const key in data) {
      formData.append(key, data[key]);
      setValues({ ...values, formData });
    }

    console.log(userId, "from update submit");

    await updateProfile(userId, values.formData, token)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data);
          setRefresh(!refresh);

          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
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

  const { currentPassword, password, confirmPassword } = authValues;

  const handleAuthChange = (name) => (e) => {
    e.preventDefault();
    setAuthValues({ ...authValues, [name]: e.target.value });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });

    let token = getCookie("token_user");

    let data = {
      passwordCurrent: currentPassword,
      password,
      passwordConfirm: confirmPassword,
    };

    await updateUserPassword(userId, data, token)
      .then((data) => {
        if (data.status && data.status == "success") {
          setAuthValues({
            ...authValues,
            confirmPassword: "",
            currentPassword: "",
            password: "",
          });
          console.log(data);
          setRefresh(!refresh);
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
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

  return (
    <>
      <SideBar>
        <div className="min-h-screen bg-black text-white py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6 mt-8 relative z-10">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h1 className="text-5xl font-thin mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                My Profile
              </h1>
              <p className="text-gray-400">Manage your account settings</p>
            </div>

            <div className="bg-gray-900 rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-500/20 rounded-xl">
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-thin text-orange-500">
                  Update Profile
                </h2>
              </div>
              <form action="#">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2 mb-6">
                    <label className="text-sm font-medium text-gray-300 mb-3 block">
                      Profile Image
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-2xl border-2 border-gray-700 overflow-hidden bg-gray-800">
                        {values && values?.images && (
                          <img
                            className="w-full h-full object-cover"
                            src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/users/image/${values?.images[0]}`}
                            alt="Avatar Upload"
                          />
                        )}
                      </div>
                      <label className="cursor-pointer">
                        <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-all">
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
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Upload Image
                        </span>
                        <input
                          type="file"
                          name="images"
                          accept="image/*"
                          onChange={handleChange("images")}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={username}
                      onChange={handleChange("username")}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full p-3 placeholder-gray-500 transition-all"
                      placeholder="Enter your username"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={handleChange("email")}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full p-3 placeholder-gray-500 transition-all"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={country}
                      onChange={handleChange("country")}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full p-3 transition-all"
                    >
                      <option className="bg-gray-800">United States</option>
                      <option className="bg-gray-800">Canada</option>
                      <option className="bg-gray-800">Mexico</option>
                      <option className="bg-gray-800">Sri lanka</option>
                      <option className="bg-gray-800">india</option>
                      <option className="bg-gray-800">Belize</option>
                      <option className="bg-gray-800">China</option>
                      <option className="bg-gray-800">Finland</option>
                      <option className="bg-gray-800">Greece</option>
                      <option className="bg-gray-800">Japan</option>
                      <option className="bg-gray-800">Korea</option>
                      <option className="bg-gray-800">Latvia</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      id="street-address"
                      value={streetAddress}
                      onChange={handleChange("streetAddress")}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full p-3 placeholder-gray-500 transition-all"
                      placeholder="Enter street address"
                    />
                  </div>

                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={city}
                      onChange={handleChange("city")}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full p-3 placeholder-gray-500 transition-all"
                      placeholder="Enter city"
                    />
                  </div>

                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="region"
                      id="region"
                      value={region}
                      onChange={handleChange("region")}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full p-3 placeholder-gray-500 transition-all"
                      placeholder="Enter state/province"
                    />
                  </div>

                  <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      id="postal-code"
                      value={postalCode}
                      onChange={handleChange("postalCode")}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full p-3 placeholder-gray-500 transition-all"
                      placeholder="Enter postal code"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows="6"
                      value={description}
                      onChange={handleChange("description")}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full p-3 placeholder-gray-500 transition-all resize-none"
                      placeholder="Tell us about yourself..."
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 px-6 py-3 mt-6 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-orange-500/50"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Update Profile
                </button>
              </form>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-gray-900 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-500/20 rounded-xl">
                  <svg
                    className="w-6 h-6 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-thin text-orange-500">
                  Update Password
                </h2>
              </div>
              <form action="#">
                <div className="grid gap-6 sm:grid-cols-1">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      value={currentPassword}
                      onChange={handleAuthChange("currentPassword")}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full p-3 placeholder-gray-500 transition-all"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={handleAuthChange("password")}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full p-3 placeholder-gray-500 transition-all"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={handleAuthChange("confirmPassword")}
                      className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 block w-full p-3 placeholder-gray-500 transition-all"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={handleAuthSubmit}
                  className="inline-flex items-center gap-2 px-6 py-3 mt-6 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-orange-500/50"
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </SideBar>
    </>
  );
};

export default function Profile() {
  return (
    <Suspense fallback={null}>
      <ProfileContent />
    </Suspense>
  );
}
