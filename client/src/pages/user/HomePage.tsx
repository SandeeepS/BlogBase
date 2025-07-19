// pages/HomePage.tsx
import React, { useState } from "react";
import Header from "../../components/Header";

const HomePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [visibleBlogs, setVisibleBlogs] = useState(4);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const blogData = [
    {
      id: 1,
      title: "The Future of Web Development",
      description:
        "Exploring the latest trends in web development, from AI integration to serverless architecture. Modern frameworks are revolutionizing how we build applications.",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
      author: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b6d3?w=40&h=40&fit=crop&crop=face",
      date: "2 hours ago",
      likes: 42,
      comments: 8,
    },
    {
      id: 2,
      title: "Mastering React Hooks",
      description:
        "A comprehensive guide to React Hooks and how they can simplify your component logic. Learn about useState, useEffect, and custom hooks with practical examples.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
      author: "Mike Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      date: "5 hours ago",
      likes: 67,
      comments: 12,
    },
    {
      id: 3,
      title: "Design Systems That Scale",
      description:
        "Building maintainable design systems for large applications. Learn about component libraries, design tokens, and how to create consistency across teams.",
      image:
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500&h=300&fit=crop",
      author: "Emma Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      date: "1 day ago",
      likes: 89,
      comments: 15,
    },
    {
      id: 4,
      title: "AI in Modern Development",
      description:
        "How artificial intelligence is transforming the way we write code. From code completion to automated testing, AI tools are becoming essential for developers.",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop",
      author: "Alex Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      date: "2 days ago",
      likes: 134,
      comments: 23,
    },
    {
      id: 5,
      title: "Mobile-First Development",
      description:
        "Best practices for building responsive applications that work seamlessly across all devices. Learn about mobile optimization and progressive enhancement.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop",
      author: "Lisa Wang",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      date: "3 days ago",
      likes: 78,
      comments: 19,
    },
    {
      id: 6,
      title: "The Art of Code Review",
      description:
        "How to conduct effective code reviews that improve code quality and team collaboration. Tips for giving and receiving constructive feedback.",
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop",
      author: "David Kim",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      date: "4 days ago",
      likes: 56,
      comments: 11,
    },
  ];

  const handleLike = (blogId: number) => {
    setLikedPosts((prev) =>
      prev.includes(blogId)
        ? prev.filter((id) => id !== blogId)
        : [...prev, blogId]
    );
  };

  const loadMoreBlogs = () => {
    setVisibleBlogs((prev) => Math.min(prev + 2, blogData.length));
  };

  return (
    <div className="min-h-screen bg-[#121212]">
   

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
              <button className="px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Blog Feed */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {blogData.slice(0, visibleBlogs).map((blog) => (
            <article
              key={blog.id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden"
            >
              {/* Post Header */}
              <div className="p-4 flex items-center">
                <img
                  src={blog.avatar}
                  alt={blog.author}
                  className="w-10 h-10 rounded-full border border-gray-700"
                />
                <div className="ml-3">
                  <h3 className="text-white font-semibold text-sm">
                    {blog.author}
                  </h3>
                  <p className="text-gray-400 text-xs">{blog.date}</p>
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
                <div className="flex items-center space-x-4 mb-3">
                  <button
                    onClick={() => handleLike(blog.id)}
                    className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <svg
                      className={`h-6 w-6 ${
                        likedPosts.includes(blog.id)
                          ? "fill-red-500 text-red-500"
                          : "fill-none"
                      }`}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Post Content */}
                <div className="mb-3">
                  <p className="text-white text-sm mb-1">
                    <span className="font-semibold">
                      {blog.likes + (likedPosts.includes(blog.id) ? 1 : 0)}
                    </span>{" "}
                    likes
                  </p>
                  <h2 className="text-white font-semibold text-lg mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {blog.description}
                  </p>
                </div>

                {/* Comments */}
                <button className="text-gray-400 text-sm hover:text-white transition-colors">
                  View all {blog.comments} comments
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {visibleBlogs < blogData.length && (
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
        {visibleBlogs >= blogData.length && (
          <div className="text-center mt-8 py-8">
            <p className="text-gray-400">You've reached the end of the feed!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
