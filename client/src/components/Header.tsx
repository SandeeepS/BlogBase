import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/store";
import { useDispatch } from "react-redux";
import { userLogout } from "../app/slices/authSlice";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useAppSelector((state) => state.auth);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleCreatePost = () => {
    navigate("/createPost");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userLogout());
    navigate("/login");
  };

  return (
    <header className="bg-[#121212] border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full border border-white flex items-center justify-center mr-3">
              <img
                src="/public/logo.png.png"
                alt="BlogBase"
                className="h-5 w-5"
              />
            </div>
            <h1 className="text-xl font-bold text-white">BlogBase</h1>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {!userData ? (
              <>
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-white border border-white rounded-lg hover:bg-white hover:text-black transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={handleSignup}
                  className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center"
                  onClick={handleCreatePost}
                >
                  <svg
                    className="h-4 w-4 mr-2"
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
                  Create Post
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                      alt="Profile"
                      className="w-8 h-8 rounded-full border border-white"
                    />
                    <svg
                      className="h-4 w-4"
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
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-lg py-1">
                      <a
                        href="/myposts"
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                      >
                        Your Posts
                      </a>
                      <hr className="border-gray-700 my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
