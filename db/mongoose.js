const mongoose = require("mongoose");

const connectionUrl = "mongodb://127.0.0.1:27017/posts-manager";
mongoose
  .connect(connectionUrl)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });
