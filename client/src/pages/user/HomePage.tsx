// pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { getAllPost } from "../../api/user";

const HomePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [visibleBlogs, setVisibleBlogs] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setLoading(true);
        setError(null);
        const response = await getAllPost();

        if (response?.data?.data && Array.isArray(response.data.data)) {
          setBlogs(response.data.data);
        } else {
          setBlogs([]);
        }

        console.log("Response in the frontend is ", response);
      } catch (error) {
        console.log("error occurred while fetching the blog details", error);
        setError("Failed to load blogs. Please try again later.");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  console.log(blogs);

  const loadMoreBlogs = () => {
    setVisibleBlogs((prev) => Math.min(prev + 2, blogs.length));
  };

  // Loading Component
  const LoadingComponent = () => (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden animate-pulse"
          >
            <div className="p-4 flex items-center">
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <div className="ml-3">
                <div className="w-24 h-4 bg-gray-700 rounded mb-2"></div>
                <div className="w-16 h-3 bg-gray-700 rounded"></div>
              </div>
            </div>
            <div className="w-full h-64 bg-gray-700"></div>
            <div className="p-4">
              <div className="w-3/4 h-5 bg-gray-700 rounded mb-3"></div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-700 rounded"></div>
                <div className="w-2/3 h-4 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Error Component
  const ErrorComponent = () => (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-[#1a1a1a] border border-red-800 rounded-lg p-8 text-center">
        <div className="text-red-400 text-5xl mb-4">⚠️</div>
        <h3 className="text-white font-semibold text-lg mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-400 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  // No Blogs Component
  const NoBlogsComponent = () => (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-white font-semibold text-lg mb-2">
          No blogs available yet
        </h3>
        <p className="text-gray-400 mb-6">
          Be the first to share your story! Check back later for new content.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-all duration-200"
        >
          Refresh
        </button>
      </div>
    </div>
  );

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
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorComponent />
      ) : blogs.length === 0 ? (
        <NoBlogsComponent />
      ) : (
        <main className="max-w-2xl mx-auto px-4 py-8">
          <div className="space-y-8">
            {blogs.slice(0, visibleBlogs).map((blog) => (
              <article
                key={blog.id}
                className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden"
              >
                <div className="p-4 flex items-center">
                  <div className="ml-3">
                    <h3 className="text-white font-semibold text-sm">
                      {blog.userDetails?.name || "Anonymous"}
                    </h3>
                  </div>
                </div>

                <div className="relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/600x400/1a1a1a/gray?text=Image+Not+Available";
                    }}
                  />
                </div>

                {/* Post Actions */}
                <div className="p-4">
                  <div className="mb-3">
                    <h2 className="text-white font-semibold text-lg mb-2">
                      {blog.title || "Untitled"}
                    </h2>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {blog.description || "No description available."}
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
              <p className="text-gray-400">
                You've reached the end of the feed!
              </p>
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default HomePage;
