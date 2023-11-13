const CommentDao = require("../../dao/comment-dao");
const path = require("path");

let dao = new CommentDao(
  path.join(__dirname, "..", "..", "storage", "comments.json")
);

function GetAbl(req, res) {
  const comment = dao.get(req.params.id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(400).json({ error: "Comment does not exist" });
  }
}

module.exports = GetAbl;
