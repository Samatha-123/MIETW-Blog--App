import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function BlogCard({ blog, onDelete }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAuthor = user && blog.author?._id === user.id;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await api.delete(`/blogs/${blog._id}`);
      if (onDelete) onDelete(blog._id);
    } catch (error) {
      console.error("Failed to delete post:", error);
      const errorMsg = error.response?.data?.message || "Failed to delete post";
      alert(errorMsg);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
      <p className="text-sm text-gray-500 mb-4">
        By {blog.author?.name || "Unknown"} •{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-4">
        {blog.content.substring(0, 200)}
        {blog.content.length > 200 && "..."}
      </p>
      {isAuthor && (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/edit/${blog._id}`)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
