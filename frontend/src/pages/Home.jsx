import { useState, useEffect } from "react";
import api from "../api/axios";
import BlogCard from "../components/BlogCard";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const response = await api.get("/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Failed to load blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog._id !== id));
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>
      {blogs.length === 0 ? (
        <p className="text-gray-500">
          No posts yet. Be the first to create one!
        </p>
      ) : (
        blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}
