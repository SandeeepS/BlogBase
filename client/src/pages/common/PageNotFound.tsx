import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full border-2 border-white mb-6">
          <img src="/public/logo.png.png" alt="Logo" className="h-6 w-6" />
        </div>

        <h1 className="text-5xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-lg text-sm font-medium text-black bg-white hover:bg-gray-100 transition-all duration-200"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
