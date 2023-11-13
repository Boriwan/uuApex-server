const CommentDao = require("../../dao/comment-dao");
const PostDao = require("../../dao/post-dao");
const path = require("path");

let commentDao = new CommentDao(
  path.join(__dirname, "..", "..", "storage", "comments.json")
);

let postDao = new PostDao(
  path.join(__dirname, "..", "..", "storage", "posts.json")
);

function DeleteAbl(req, res) {
  const commentId = req.params.id;
  const comment = commentDao.get(commentId);

  const commentName = commentDao
    .list()
    .find((comment) => comment.id === commentId)?.name;
}
module.exports = DeleteAbl;
