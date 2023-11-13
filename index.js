const PostController = require("./controllers/post");
const CategoryController = require("./controllers/category");
const CommentController = require("./controllers/comment");
var express = require("express");
var app = express();
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

//default port
const port = 8000;

// controllers
app.use("/post", PostController);
app.use("/category", CategoryController);
app.use("/ingredient", CommentController);

app.listen(port);
