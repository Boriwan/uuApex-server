const PostDao = require("../../dao/post-dao");
const path = require("path");

let dao = new PostDao(
  path.join(__dirname, "..", "..", "storage", "posts.json")
);

function GetTopPosts(req, res) {
  const posts = dao.list();
  const topPosts = posts
    .sort((a, b) => {
      const aRating =
        a.ratingValue.reduce((acc, val) => acc + val, 0) / a.ratingCount;
      const bRating =
        b.ratingValue.reduce((acc, val) => acc + val, 0) / b.ratingCount;
      return bRating - aRating;
    })
    .slice(0, 10);
  res.json(topPosts);
}

module.exports = GetTopPosts;
