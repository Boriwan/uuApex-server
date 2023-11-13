// implement abl
const CommentDao = require("../../dao/comment-dao");
const path = require("path");

let dao = new CommentDao(
  path.join(__dirname, "..", "..", "storage", "comments.json")
);

function ListAllAbl(req, res) {
  const comment = dao.list();

  res.json(comment);
}

module.exports = ListAllAbl;
