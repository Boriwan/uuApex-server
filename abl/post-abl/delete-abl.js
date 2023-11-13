const PostDao = require("../../dao/post-dao");
const path = require("path");
let dao = new PostDao(
  path.join(__dirname, "..", "..", "storage", "posts.json")
);

function DeleteAbl(req, res) {
  const post = dao.get(req.params.id);

  const updatedObject = { ...post, ...req.params };
  if (post) {
    dao.delete(post);
  } else {
    res.status(400).json({ error: "Post does not exist" });
  }

  res.json(`Post with id ${req.params.id} has been deleted`);
}
module.exports = DeleteAbl;
