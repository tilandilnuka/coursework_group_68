import { useState, useEffect } from "react";
import Link from "next/link";
import { logOutUser } from "@/actions/user";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaPlus,
  FaUsers,
  FaBox,
  FaShoppingBag,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";
const SideBar = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const handleLogout = () => {
    logOutUser();
    router.push("/");
  };

  if (!user) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-[60] p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 sm:hidden"
      >
        {sidebarOpen ? (
          <FaTimes className="text-lg" />
        ) : (
          <FaBars className="text-lg" />
        )}
      </button>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-50 w-72 h-full transition-all duration-500 ease-in-out transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 border-r border-gray-800/50 shadow-2xl backdrop-blur-lg overflow-hidden`}
        aria-label="Sidebar"
      >
        <div className="h-full px-6 py-8 overflow-y-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-700 hover:scrollbar-thumb-gray-600 relative">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 left-0 w-24 h-24 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-xl"></div>

          {/* User info section */}
          <div className="relative z-10 mb-8 p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <FaUser className="text-white text-xl" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg">
                  {user?.username}
                </p>
                <p className="text-gray-400 text-sm capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
          {user?.role == "admin" && (
            <ul className="space-y-4 font-medium relative z-10">
              {/* Dashboard/Home */}
              <li>
                <Link
                  href="/"
                  className="group flex items-center p-4 text-white rounded-2xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-transparent hover:border-orange-500/30"
                >
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-all duration-300">
                    <FaHome className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300" />
                  </div>
                  <span className="ml-4 text-gray-300 group-hover:text-white transition-colors duration-300">
                    Dashboard
                  </span>
                </Link>
              </li>

              {/* Profile */}
              <li>
                <Link
                  href={`/users/profile`}
                  className="group flex items-center p-4 text-white rounded-2xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-transparent hover:border-orange-500/30"
                >
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-all duration-300">
                    <FaUser className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300" />
                  </div>
                  <span className="ml-4 text-gray-300 group-hover:text-white transition-colors duration-300">
                    Profile
                  </span>
                </Link>
              </li>

              {/* Create Product */}
              <li>
                <Link
                  href={`/products/createProduct`}
                  className="group flex items-center p-4 text-white rounded-2xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-transparent hover:border-orange-500/30"
                >
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-all duration-300">
                    <FaPlus className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300" />
                  </div>
                  <span className="ml-4 text-gray-300 group-hover:text-white transition-colors duration-300">
                    Create Product
                  </span>
                </Link>
              </li>

              {/* All Users */}
              <li>
                <Link
                  href={`/users/allUsers`}
                  className="group flex items-center p-4 text-white rounded-2xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-transparent hover:border-orange-500/30"
                >
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-all duration-300">
                    <FaUsers className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300" />
                  </div>
                  <span className="ml-4 text-gray-300 group-hover:text-white transition-colors duration-300">
                    All Users
                  </span>
                </Link>
              </li>

              {/* All Products */}
              <li>
                <Link
                  href="/products/allProducts"
                  className="group flex items-center p-4 text-white rounded-2xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-transparent hover:border-orange-500/30"
                >
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-all duration-300">
                    <FaBox className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300" />
                  </div>
                  <span className="ml-4 text-gray-300 group-hover:text-white transition-colors duration-300">
                    All Products
                  </span>
                </Link>
              </li>

              {/* All Orders */}
              <li>
                <Link
                  href="/products/orders"
                  className="group flex items-center p-4 text-white rounded-2xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-transparent hover:border-orange-500/30"
                >
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-all duration-300">
                    <FaShoppingBag className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300" />
                  </div>
                  <span className="ml-4 text-gray-300 group-hover:text-white transition-colors duration-300">
                    All Orders
                  </span>
                </Link>
              </li>

              {/* Divider */}
              <li>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-6"></div>
              </li>

              {/* Sign Out */}
              <li>
                <div
                  className="group flex items-center p-4 text-white rounded-2xl hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-600/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer border border-transparent hover:border-red-500/30"
                  onClick={handleLogout}
                >
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-red-500/20 transition-all duration-300">
                    <FaSignOutAlt className="text-gray-400 group-hover:text-red-400 transition-colors duration-300" />
                  </div>
                  <span className="ml-4 text-gray-300 group-hover:text-red-300 transition-colors duration-300">
                    Sign Out
                  </span>
                </div>
              </li>
            </ul>
          )}
          {user?.role == "user" && (
            <ul className="space-y-4 font-medium relative z-10">
              {/* Dashboard/Home */}
              <li>
                <Link
                  href="/"
                  className="group flex items-center p-4 text-white rounded-2xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-transparent hover:border-orange-500/30"
                >
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-all duration-300">
                    <FaHome className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300" />
                  </div>
                  <span className="ml-4 text-gray-300 group-hover:text-white transition-colors duration-300">
                    Home
                  </span>
                </Link>
              </li>

              {/* Profile */}
              <li>
                <Link
                  href={`/users/profile`}
                  className="group flex items-center p-4 text-white rounded-2xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-transparent hover:border-orange-500/30"
                >
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-all duration-300">
                    <FaUser className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300" />
                  </div>
                  <span className="ml-4 text-gray-300 group-hover:text-white transition-colors duration-300">
                    Profile
                  </span>
                </Link>
              </li>

              {/* My Orders */}
              <li>
                <Link
                  href="/products/myOrders"
                  className="group flex items-center p-4 text-white rounded-2xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-transparent hover:border-orange-500/30"
                >
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-orange-500/20 transition-all duration-300">
                    <FaShoppingBag className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300" />
                  </div>
                  <span className="ml-4 text-gray-300 group-hover:text-white transition-colors duration-300">
                    My Orders
                  </span>
                </Link>
              </li>

              {/* Divider */}
              <li>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-6"></div>
              </li>

              {/* Sign Out */}
              <li>
                <div
                  className="group flex items-center p-4 text-white rounded-2xl hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-600/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer border border-transparent hover:border-red-500/30"
                  onClick={handleLogout}
                >
                  <div className="w-10 h-10 bg-gray-800/50 rounded-xl flex items-center justify-center group-hover:bg-red-500/20 transition-all duration-300">
                    <FaSignOutAlt className="text-gray-400 group-hover:text-red-400 transition-colors duration-300" />
                  </div>
                  <span className="ml-4 text-gray-300 group-hover:text-red-300 transition-colors duration-300">
                    Sign Out
                  </span>
                </div>
              </li>
            </ul>
          )}
        </div>
      </aside>

      <div className="transition-all duration-300 ease-in-out sm:ml-72">
        <div className="min-h-screen bg-transparent">{children}</div>
      </div>
    </>
  );
};

export default SideBar;
