const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/posts", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({ message: "Post added successfully" });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    { id: "a123sd", title: "1", content: "jkahsdkj" },
    { id: "asdasdqw", title: "2", content: "jkahsdkj" },
    { id: "asd123", title: "3", content: "jkahsdkj" },
  ];
  res.status(200).json({ posts: posts, message: "Posts fetched successfully" });
});

module.exports = app;

//ID5tUyHypBsbdV07