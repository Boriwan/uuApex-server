// implement abl
const CommentDao = require("../../dao/comment-dao");
const path = require("path");

let dao = new CommentDao(
  path.join(__dirname, "..", "..", "storage", "comments.json")
);

function CreateAbl(req, res) {
  let body = req.body;
  if (!body.message) {
    return res
      .status(400)
      .json({ error: "Invalid input: code parameter is missing." });
  }

  let comment = {
    message: body.message,
    measurement: body.measurement,
  };

  const commentList = dao._listAll();
  const duplicate = commentList.find(
    (existingComment) => existingComment.message === comment.message
  );

  if (duplicate) {
    res.status(400);
    return res.json({ error: "Comment already exists." });
  }

  try {
    comment = dao.create(comment);
  } catch (e) {
    res.status(500);
    return res.json({ error: e.message });
  }

  res.send(comment);
}

module.exports = CreateAbl;
