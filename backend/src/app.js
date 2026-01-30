const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => res.send("MERN Blog API"));

module.exports = app;
