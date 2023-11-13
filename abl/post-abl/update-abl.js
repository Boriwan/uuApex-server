const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer"); // To handle file uploads
const fs = require("fs");
const PostDao = require("../../dao/post-dao");
const path = require("path");

let dao = new PostDao(
  path.join(__dirname, "..", "..", "storage", "posts.json")
);

function UpdateAbl(req, res) {
  const id = req.params.id;
  // const image = req.files.img; // debug output
  // let img = "";
  const today = new Date();
  const isoDate = today.toISOString().substr(0, 10);
  let body = req.body;

  let post = {
    name: body.name,
    desc: body.desc,
    categories: JSON.parse(body.categories),
    // img: body.img,
  };
  if (req.files) {
    const image = req.files.img;
    const id = req.params.id;

    const today = new Date();
    const isoDate = today.toISOString().substr(0, 10);
    image.mv("storage/img/" + isoDate + image.name);
    img = post.img = isoDate + image.name;
  }
  if (body.img) {
    img = body.img;
    post.img = body.img;
    console.log(body.img);
  }

  // if (req.file) {
  //   // check if req.file exists
  //   post.img = req.file.filename;
  // }
  console.log(post);
  if (post) {
    dao.update(id, post);
    res.json(post);
  } else {
    res.status(400).json({ error: "Post does not exist" });
  }
  res.json(post);
}

module.exports = UpdateAbl;
