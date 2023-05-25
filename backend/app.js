const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("../db/mongoose");

const Post = require("./models/post");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/posts", async (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.title,
  });
  await post.save();
  res.status(201).json({ message: "Post added successfully", post: post });
});

app.get("/api/posts", async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({ posts: posts, message: "Posts fetched successfully" });
});

app.put("/api/posts/:id", async (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  });
  try {
    await Post.updateOne({ _id: req.params.id }, post);
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ message: "Update Successful!" });
});

app.delete("/api/posts/:id", async (req, res, next) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ message: "Post Deleted" });
});

module.exports = app;
