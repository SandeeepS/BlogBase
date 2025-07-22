import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useFormik } from "formik";
import { CreatePostValidation } from "../../utils/validation";
import { uploadImageToCloudinary } from "../../utils/cloudinaryUpload";
import { getPostByBlogId, updatePost } from "../../api/user";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import type { IUpdateData } from "../../interfaces/IDataInterface";

const EditPost: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await getPostByBlogId(blogId as string);
        const post = response.data.data.data;

        formik.setValues({
          title: post.title,
          description: post.description,
          image: post.image,
        });

        setImagePreview(post.image);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (blogId) {
      fetchPostData();
    }
  }, [blogId]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: null as File | null,
    },
    validationSchema: CreatePostValidation,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        let imageUrl = imagePreview;
        if (values.image instanceof File) {
          imageUrl = await uploadImageToCloudinary(values.image);
          if (!imageUrl || imageUrl === "cloud name is not avaiblle") {
            toast.error("Image upload failed");
            return;
          }
        }

        const updateData: IUpdateData = {
          title: values.title,
          description: values.description,
          image: imageUrl as string,
        };

        const response = await updatePost(blogId as string, updateData);
        if (response.data.success) {
          toast.success("Post updated successfully");
          navigate("/myposts"); 
        } else {
          toast.error("Failed to update post");
        }
      } catch (error) {
        console.error("Error updating post:", error);
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-[#121212] min-h-screen">
      <Header />
      <div className="max-w-2xl mx-auto bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 shadow-md py-12 px-4 mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Edit Post</h2>

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
              placeholder="Edit blog title"
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
              rows={5}
              placeholder="Edit description"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Upload New Image */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Upload New Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-white bg-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-100"
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
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
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-black"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              "Update Blog"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
