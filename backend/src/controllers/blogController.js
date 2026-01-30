const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: "Missing fields" });
    const blog = await Blog.create({ title, content, author: req.userId });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    if (String(blog.author) !== String(req.userId))
      return res.status(403).json({ message: "Forbidden" });
    const { title, content } = req.body;
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    if (String(blog.author) !== String(req.userId))
      return res.status(403).json({ message: "Forbidden" });
    await Blog.deleteOne({ _id: id });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createBlog, getBlogs, updateBlog, deleteBlog };
