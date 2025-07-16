// components/CreatePost.tsx
import React, { useState } from "react";
import Header from "../../components/Header";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, description, image });
    // You can send this data to the backend or add to state
  };

  return (
    <div className="bg-[#121212] min-h-screen ">
      <Header />
      <div className="max-w-2xl mx-auto bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 shadow-md py-12 px-4 mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">
          Create a New Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your blog title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your blog description"
              rows={5}
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Paste image link here"
              required
            />
          </div>

          {/* Preview (Optional) */}
          {image && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image Preview:
              </label>
              <img
                src={image}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg border border-gray-700"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition duration-200"
          >
            Post Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
