const express = require("express");
const PostDao = require("../../dao/post-dao");
const path = require("path");

let dao = new PostDao(
  path.join(__dirname, "..", "..", "storage", "posts.json")
);

function RatingAbl(req, res) {
  const id = req.params.id;
  let post = dao.get(req.params.id);
  const rating = req.body.value;
  const list = post.ratingValue;
  let number = post.ratingCount;

  number++;

  //console.log(number);
  list.push(rating);
  dao.get(id);

  post.ratingValue = list;
  post.ratingCount = number;
  //console.log(id);
  const newData = post;
  //console.log(newData);
  dao.update(id, newData);
  res.json(post);
}

module.exports = RatingAbl;
