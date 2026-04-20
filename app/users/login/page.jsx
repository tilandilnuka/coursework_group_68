"use client";

import { logIn } from "@/actions/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authenticate } from "@/actions/auth";
import Modal from "@/components/Modal";

const PARTICLE_STYLES = Array.from({ length: 20 }, (_, index) => ({
  left: `${(index * 17 + 11) % 100}%`,
  top: `${(index * 29 + 7) % 100}%`,
  animationDelay: `${(index % 6) * 0.45}s`,
  animationDuration: `${2 + (index % 5) * 0.55}s`,
}));

const Login = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [tempError, setTempError] = useState(false);

  useEffect(() => {}, []);

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setValues({
        ...values,
        loading: false,
        error: true,
        message: "Please provid a valid email..",
      });
      return;
    }
    if (!values.password || values.password.length <= 0) {
      setTempError(true);
      setValues({
        ...values,
        loading: false,
        error: true,
        message: "Please provide a valid password..",
      });
      return;
    }
    setValues({ ...values, loading: false, error: true, message: "Loading.." });
    const user = { email, password };

    await logIn(user)
      .then((data) => {
        console.log(data);
        if (data.status && data.status == "success") {
          data.data.token = data.token;
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });
          setTempError(false);
          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1500);
          authenticate(data.data, "user", () => {
            if (localStorage.getItem("user")) {
              router.push(`/`);
            }
          });
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: "Check Your credentials...",
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
          message: "check your credentials...",
          error: true,
          success: false,
        });
      });
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  return (
    <>
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-orange-600/10 to-red-600/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute inset-0">
          {PARTICLE_STYLES.map((style, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-500/30 rounded-full animate-pulse"
              style={style}
            ></div>
          ))}
        </div>

        {alert && alert?.message && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <Modal alert={alert} setAlert={resetAlert} />
          </div>
        )}

        <div className="relative z-10 max-w-md w-full">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
              <span className="text-4xl">🔐</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-thin text-white mb-4">
              Welcome{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-bold">
                Back
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Sign in to your account and continue your journey
            </p>
          </div>

          <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-3xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>

            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-lg font-semibold text-white mb-3 transition-colors duration-300"
                  >
                    📧 Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={handleChange("email")}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-6 py-4 bg-white/5 backdrop-blur-sm border-2 rounded-2xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                        focusedField === "email"
                          ? "border-orange-500 bg-white/10 scale-105 shadow-lg shadow-orange-500/25"
                          : "border-white/20 hover:border-white/40"
                      }`}
                      placeholder="Enter your email address"
                      required
                    />
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 pointer-events-none transition-opacity duration-300 ${
                        focusedField === "email" ? "opacity-100" : ""
                      }`}
                    ></div>
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-lg font-semibold text-white mb-3 transition-colors duration-300"
                  >
                    🔑 Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handleChange("password")}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-6 py-4 pr-14 bg-white/5 backdrop-blur-sm border-2 rounded-2xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                        focusedField === "password"
                          ? "border-orange-500 bg-white/10 scale-105 shadow-lg shadow-orange-500/25"
                          : "border-white/20 hover:border-white/40"
                      }`}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors duration-300"
                    >
                      <span className="text-xl">
                        {showPassword ? "🙈" : "👁️"}
                      </span>
                    </button>
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 pointer-events-none transition-opacity duration-300 ${
                        focusedField === "password" ? "opacity-100" : ""
                      }`}
                    ></div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="group-hover:animate-bounce text-2xl">
                      🚀
                    </span>
                    <span className="relative z-10">
                      {loading ? "Signing In..." : "Sign In"}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
              </form>
              <div className="mt-10 space-y-6">
                <div className="text-center">
                  <Link
                    href="/users/forgot-password"
                    className="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-300"
                  >
                    Forgot your password? 🔄
                  </Link>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <span className="text-gray-400 text-sm">or</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <p className="text-gray-300 mb-3">
                    Don&apos;t have an account yet?
                  </p>
                  <Link
                    href="/users/signup"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/40"
                  >
                    <span>✨</span>
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
