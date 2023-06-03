const express = require("express");
const Post = require("../models/post");


const router = express.Router();

//Add post
router.post("", async (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.title,
  });
  await post.save();
  res.status(201).json({ message: "Post added successfully", post: post });
});

//Get posts
router.get("", async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({ posts: posts, message: "Posts fetched successfully" });
});

//Get post
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ post: post, message: "Posts fetched successfully" });
  } catch (error) {
    res.status(404).json({ message: "Post not found" });
  }
});

//Update post
router.put("/:id", async (req, res, next) => {
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

//Delete post
router.delete("/:id", async (req, res, next) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ message: "Post Deleted" });
});

module.exports = router;
