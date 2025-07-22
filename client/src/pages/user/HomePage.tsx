// pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { getAllPost } from "../../api/user";

const HomePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [showDropdown, setShowDropdown] = useState(false);
  const [visibleBlogs, setVisibleBlogs] = useState(3);
  type Blog = {
    id: number;
    title: string;
    description: string;
    image: string;
    userDetails: {
      name: string;
    };
  };

  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllPost();
        setBlogs(response.data.data);
        console.log("Response in the frontend is ", response);
      } catch (error) {
        console.log("error occured while fetching the blog details", error);
        throw error;
      }
    };
    fetchBlogs();
  }, []);

  console.log(blogs)


  const loadMoreBlogs = () => {
    setVisibleBlogs((prev) => Math.min(prev + 2, blogs.length));
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />

      {!isLoggedIn && (
        <section className="bg-[#121212] py-20">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-5xl font-bold text-white mb-6">
              Welcome to BlogBase
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Discover amazing stories, insights, and ideas from writers around
              the world
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsLoggedIn(true)}
                className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Blog Feed */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {blogs.slice(0, visibleBlogs).map((blog) => (
            <article
              key={blog.id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden"
            >
              {/* Post Header */}
              <div className="p-4 flex items-center">
                {/* <img
                  src={blog.avatar}
                  alt={blog.author}
                  className="w-10 h-10 rounded-full border border-gray-700"
                /> */}
                <div className="ml-3">
                  <h3 className="text-white font-semibold text-sm">
                    {blog.userDetails.name}
                  </h3>
                  {/* <p className="text-gray-400 text-xs">{blog.date}</p> */}
                </div>
              </div>

              {/* Post Image */}
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Post Actions */}
              <div className="p-4">
                {/* Post Content */}
                <div className="mb-3">
                  <h2 className="text-white font-semibold text-lg mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {blog.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {visibleBlogs < blogs.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreBlogs}
              className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-all duration-200"
            >
              Load More Posts
            </button>
          </div>
        )}

        {/* End of Feed Message */}
        {visibleBlogs >= blogs.length && (
          <div className="text-center mt-8 py-8">
            <p className="text-gray-400">You've reached the end of the feed!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
