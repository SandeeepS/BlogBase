import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {  getPostByUserId } from "../../api/user";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";

const UserPosts: React.FC = () => {
  const userData = useSelector((state: RootState) => state.auth.userData);
  const userId = userData?.id;
  const navigate = useNavigate();
  const [userBlogs, setUserBlogs] = useState<
    {
      _id: number;
      title: string;
      description: string;
      image: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await getPostByUserId(userId as string);
        setUserBlogs(response.data.data.data);
        console.log("User blogs:", response);
      } catch (error) {
        console.error("Error fetching user blogs", error);
      }
    };

    fetchUserBlogs();
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          My Posts
        </h1>
        <div className="space-y-8">
          {userBlogs.map((blog) => (
            <article
              key={blog._id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden"
            >
              {/* Post Image */}
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Post Content */}
              <div className="p-4 flex flex-col items-center">
                <div>
                  <h2 className="text-white font-semibold text-lg mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {blog.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  <button onClick={() => navigate(`/editPost/${blog._id}`)} className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-all duration-200">
                    Edit
                  </button>
                  <button className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition-all duration-200">
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}

          {userBlogs.length === 0 && (
            <p className="text-center text-gray-400">No posts to display.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserPosts;
