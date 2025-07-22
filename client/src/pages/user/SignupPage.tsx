import React, { useState } from "react";
import { useFormik } from "formik";
import { signup } from "../../api/user";
import { SignupValidation } from "../../utils/validation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupValidation,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await signup(
          values.name,
          values.email,
          Number(values.phone),
          values.password,
          values.confirmPassword
        );
        console.log(response);
        if (
          response.data.success &&
          response.data.data.signupResponse !== null
        ) {
          
          toast.success("Signup successful!");
          navigate("/login");
        } else {
          toast.error("Sigup failed");
          navigate("/signup");
        }
      } catch (error) {
        console.log("Error occurred while signup from the signup form", error);
        toast.error("Signup failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] py-8">
      <div className="max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full border-2 border-white mb-4">
            <div className="h-6 w-6 text-white">
              <img src="/public/logo.png.png" alt="" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Join BlogBase</h2>
          <p className="text-gray-400">Create your account to get started</p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="mt-8 space-y-6"
          noValidate
        >
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 bg-transparent border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-400 text-sm mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-white mb-2"
              >
                Phone
              </label>
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 bg-transparent border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                  placeholder="Enter phone number"
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-400 text-sm mt-1">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 bg-transparent border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 bg-transparent border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {/* Icon stays same */}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 bg-transparent border border-white rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {/* Icon stays same */}
                </button>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-white rounded-lg text-sm font-medium text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          {/* Divider & Link */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-white hover:text-gray-300 transition-colors"
              >
                Sign in here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
