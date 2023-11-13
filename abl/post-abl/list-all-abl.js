// implement abl
const PostDao = require("../../dao/post-dao");
const path = require("path");

let dao = new PostDao(
  path.join(__dirname, "..", "..", "storage", "posts.json")
);

function ListAllAbl(req, res) {
  const post = dao.list();


  res.json(post);
}

module.exports = ListAllAbl;
