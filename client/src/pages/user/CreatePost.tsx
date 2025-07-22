import React, { useState } from "react";
import Header from "../../components/Header";
import { useFormik } from "formik";
import { CreatePostValidation } from "../../utils/validation";
import { createPost } from "../../api/user";
import type { ICreatePost } from "../../interfaces/IDataInterface";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatePost: React.FC = () => {
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      // image: null as File | null,
    },
    validationSchema: CreatePostValidation,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        // const formData = new FormData();
        // formData.append("title", values.title);
        // formData.append("description", values.description);
        // if (values.image) formData.append("image", values.image);

        // await new Promise((res) => setTimeout(res, 1500));
        console.log("Form values submitted:", values);
        const data: ICreatePost = {
          title: values.title,
          description: values.description,
        };
        const response = await createPost(data);
        console.log(response);
        if (response.data.success && response.data.data) {
          toast.success("Blog posted successfully");
          navigate("/homepage");
        } else {
          toast.error("Blog posting not done !!");
          navigate("/homepage");
        }
      } catch (error) {
        console.error("Error submitting post:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.currentTarget.files?.[0];
  //   if (file) {
  //     formik.setFieldValue("image", file);
  //     setImagePreview(URL.createObjectURL(file));
  //   }
  // };

  return (
    <div className="bg-[#121212] min-h-screen">
      <Header />
      <div className="max-w-2xl mx-auto bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 shadow-md py-12 px-4 mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">
          Create a New Post
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your blog title"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your blog description"
              rows={5}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Image File Input */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              onBlur={formik.handleBlur}
              className="block w-full text-white bg-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-100"
            />
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.image as string}
              </p>
            )}
          </div>

          {/* Image Preview */}
          {/* {imagePreview && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image Preview:
              </label>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg border border-gray-700"
              />
            </div>
          )} */}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
              "Post Blog"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
