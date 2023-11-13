var express = require("express");
var router = express.Router();
const CreateAbl = require("../abl/post-abl/create-abl");
const GetAbl = require("../abl/post-abl/get-abl");
const ListAll = require("../abl/post-abl/list-all-abl");
const DeleteAbl = require("../abl/post-abl/delete-abl");
const UpdateAbl = require("../abl/post-abl/update-abl");
const UploadImgAbl = require("../abl/post-abl/upload-img-abl");
const GetImgAbl = require("../abl/post-abl/get-img-abl");
const RatingAbl = require("../abl/post-abl/rating-abl.js");
const GetTopAbl = require("../abl/post-abl/get-top-abl.js");
const FilterPostsAbl = require("../abl/post-abl/filter-posts-abl.js");

// get post by its ID
router.get("/get/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  GetAbl(req, res);
});

// returns a list of all posts
router.get("/list", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  ListAll(req, res);
});

// get post Image
router.get("/image/:name", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  GetImgAbl(req, res);
});

//get list of posts
router.get("/getTopPosts", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  GetTopAbl(req, res);
});
router.get("/filterPosts/:category", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  FilterPostsAbl(req, res);
});

//create a new post
router.post("/create", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  CreateAbl(req, res);
  UploadImgAbl(req, res);
});

// post an image to the post
router.post("/postImage", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  UploadImgAbl(req, res);
});

//update a certain post by its ID
router.put("/update/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  UpdateAbl(req, res);
});
router.put("/addRating/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  RatingAbl(req, res);
});

//delete a certain post by its ID
router.delete("/delete/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  DeleteAbl(req, res);
});

//export this router to use in index.js
module.exports = router;
