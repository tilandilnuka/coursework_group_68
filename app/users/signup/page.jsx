"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "@/actions/auth";
import Modal from "@/components/Modal";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { useEffect } from "react";

const SignUp = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    error: "",
    loading: false,
    message: "",
  });

  const [tempError, setTempError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [focusedField, setFocusedField] = useState(null);
  const [isAnimated, setIsAnimated] = useState(false);

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
    password,
    passwordConfirm,
    error,
    loading,
    message,
  } = values;

  useEffect(() => {
    const calculateStrength = (pass) => {
      let strength = 0;
      if (pass.length >= 8) strength += 25;
      if (/[a-z]/.test(pass)) strength += 25;
      if (/[A-Z]/.test(pass)) strength += 25;
      if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) strength += 25;
      return strength;
    };
    setPasswordStrength(calculateStrength(password));
  }, [password]);

  useEffect(() => {
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.username || values.username <= 0) {
      setTempError(true);
      return;
    }
    if (
      !values.email ||
      values.email.length <= 0 ||
      !values.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      setTempError(true);
      return;
    }
    if (!values.password || values.password.length <= 0) {
      setTempError(true);
      return;
    }
    if (!values.passwordConfirm || values.passwordConfirm.length <= 0) {
      setTempError(true);
      return;
    }
    if (values?.password != values?.passwordConfirm) {
      setTempError(true);
      return;
    }

    setAlert({ ...alert, loading: true });
    setValues({ ...values, loading: true, error: false });

    const user = {
      username,
      email,
      password,
      passwordConfirm,
    };

    signup(user)
      .then((data) => {
        if (data.status && data.status == "success") {
          setValues({
            ...values,
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
            error: "",
            loading: false,
            message: data.statusText,
          });
          setTempError(false);
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

          router.push(`/users/login`);
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: "Check your credentials..",
            error: true,
            success: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: "Check your credentials...",
          error: true,
          success: false,
        });
      });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  let showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  let showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  let showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  return (
    <>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center py-12 px-4">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-600/5 to-red-600/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-500/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
        {alert && alert?.message && (
          <Modal alert={alert} setAlert={resetAlert} />
        )}
        <div
          className={`max-w-md w-full relative z-10 transform transition-all duration-700 ${
            isAnimated ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div
            className={`text-center mb-8 transform transition-all duration-700 delay-200 ${
              isAnimated
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300 shadow-lg">
              <FaUser className="text-orange-500 text-2xl" />
            </div>
            <h1 className="text-5xl font-extrabold text-white mb-4">
              Create{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Account
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Join us and start your amazing journey
            </p>
          </div>

          <div
            className={`relative bg-gray-900/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-800/50 transform transition-all duration-700 delay-300 ${
              isAnimated
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-3xl"></div>
            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                  <label
                    htmlFor="username"
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      focusedField === "username"
                        ? "text-orange-400"
                        : "text-gray-300"
                    }`}
                  >
                    Username
                  </label>
                  <div className="relative">
                    <FaUser
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === "username"
                          ? "text-orange-500"
                          : "text-gray-500"
                      }`}
                    />
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={username}
                      onChange={handleChange("username")}
                      onFocus={() => setFocusedField("username")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-12 pr-4 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                        focusedField === "username"
                          ? "border-orange-500 shadow-lg shadow-orange-500/25 bg-black/70"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      focusedField === "email"
                        ? "text-orange-400"
                        : "text-gray-300"
                    }`}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === "email"
                          ? "text-orange-500"
                          : "text-gray-500"
                      }`}
                    />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={handleChange("email")}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-12 pr-12 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                        focusedField === "email"
                          ? "border-orange-500 shadow-lg shadow-orange-500/25 bg-black/70"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      placeholder="Enter your email"
                      required
                    />
                    {email && email.includes("@") && (
                      <FaCheck className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                    )}
                  </div>
                </div>

                <div className="group">
                  <label
                    htmlFor="password"
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      focusedField === "password"
                        ? "text-orange-400"
                        : "text-gray-300"
                    }`}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <FaLock
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === "password"
                          ? "text-orange-500"
                          : "text-gray-500"
                      }`}
                    />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handleChange("password")}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-12 pr-12 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                        focusedField === "password"
                          ? "border-orange-500 shadow-lg shadow-orange-500/25 bg-black/70"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors duration-300"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-orange-500" />
                      ) : (
                        <FaEye className="text-orange-500" />
                      )}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-2">
                      <div className="flex space-x-1">
                        {[25, 50, 75, 100].map((threshold, index) => (
                          <div
                            key={index}
                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                              passwordStrength >= threshold
                                ? passwordStrength < 50
                                  ? "bg-red-400"
                                  : passwordStrength < 75
                                    ? "bg-yellow-400"
                                    : "bg-green-400"
                                : "bg-gray-600"
                            }`}
                          ></div>
                        ))}
                      </div>
                      <p
                        className={`text-xs mt-1 ${
                          passwordStrength < 50
                            ? "text-red-400"
                            : passwordStrength < 75
                              ? "text-yellow-400"
                              : "text-green-400"
                        }`}
                      >
                        {passwordStrength < 50
                          ? "Weak"
                          : passwordStrength < 75
                            ? "Medium"
                            : "Strong"}
                      </p>
                    </div>
                  )}
                </div>

                <div className="group">
                  <label
                    htmlFor="passwordConfirm"
                    className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      focusedField === "passwordConfirm"
                        ? "text-orange-400"
                        : "text-gray-300"
                    }`}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <FaLock
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === "passwordConfirm"
                          ? "text-orange-500"
                          : "text-gray-500"
                      }`}
                    />
                    <input
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordConfirm}
                      onChange={handleChange("passwordConfirm")}
                      onFocus={() => setFocusedField("passwordConfirm")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-12 pr-12 py-3 bg-black/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                        focusedField === "passwordConfirm"
                          ? "border-orange-500 shadow-lg shadow-orange-500/25 bg-black/70"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                      placeholder="Confirm your password"
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      {passwordConfirm && (
                        <div
                          className={`text-sm ${
                            password === passwordConfirm && password
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {password === passwordConfirm && password ? (
                            <FaCheck className="text-green-500" />
                          ) : (
                            <FaTimes className="text-red-500" />
                          )}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                      >
                        {showConfirmPassword ? (
                          <FaEyeSlash className="text-orange-500" />
                        ) : (
                          <FaEye className="text-orange-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center space-x-2">
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <FaUser className="group-hover:scale-110 transition-transform duration-300" />
                    )}
                    <span>
                      {loading ? "Creating Account..." : "Create Account"}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/users/login"
                    className="text-orange-500 hover:text-orange-400 font-semibold transition-colors duration-300 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
