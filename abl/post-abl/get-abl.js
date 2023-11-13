const PostDao = require("../../dao/post-dao");
const path = require("path");

let dao = new PostDao(
  path.join(__dirname, "..", "..", "storage", "posts.json")
);

// console.log(postList);

function GetAbl(req, res) {
  const post = dao.get(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(400).json({ error: "Post does not exist" });
  }
}

module.exports = GetAbl;
