const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer"); // To handle file uploads
const fs = require("fs");
const PostDao = require("../../dao/post-dao");
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/img/"); // Save images to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set the filename to be the current timestamp plus the original filename
  },
});
const upload = multer({ storage: storage });

let dao = new PostDao(
  path.join(__dirname, "..", "..", "storage", "posts.json")
);

function CreateAbl(req, res) {
  let body = req.body;
  const image = req.files.img;

  if (
    !body.name ||
    !body.desc || 
    !body.author
  ) {
    return res
      .status(400)
      .json({ error: "Invalid input: code parameter is missing." });
  }
  const today = new Date();
  const isoDate = today.toISOString().substr(0, 10);

  let post = {
    name: body.name,
    desc: body.desc,
    author: body.author,
    comments: JSON.parse(body.comments),
    img: isoDate + image.name,
    categories: JSON.parse(body.categories),
    ratingCount: 0,
  };

  // calculates the average rating for the post
  function getAvgRating() {
    if (post.ratings.length > 0) {
      const sum = post.ratings.reduce((acc, curr) => acc + curr, 0);
      const avg = sum / post.ratings.length;
      return avg;
    }
  }

  const postList = dao._listAll();
  const duplicate = postList.find(
    (existingPost) =>
      existingPost.name === post.name &&
      existingPost.desc === post.desc &&
      existingPost.finalAmount === post.finalAmount &&
      existingPost.prepLength === post.prepLength &&
      JSON.stringify(existingPost.comments) ===
        JSON.stringify(post.comments)
  );

  if (duplicate) {
    res.status(400);
    return res.json({ error: "Post already exists." });
  }

  try {
    post = dao.create(post);
  } catch (e) {
    res.status(500);
    return res.json({ error: e.message });
  }

  res.send(post);
}

module.exports = CreateAbl;
