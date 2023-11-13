const CommentDao = require("../../dao/comment-dao");
const path = require("path");
let dao = new CommentDao(
  path.join(__dirname, "..", "..", "storage", "comments.json")
);

function UpdateAbl(req, res) {
  const comment = dao.get(req.params.id);
  const id = req.params.id;
  const newData = req.body;

  if (comment) {
    dao.update(id, newData);
    res.json("Comment has been updated");
  } else {
    res.status(400).json({ error: "Comment does not exist" });
  }

  res.json(updatedObject);
}
module.exports = UpdateAbl;
