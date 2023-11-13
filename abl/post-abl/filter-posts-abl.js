const PostDao = require("../../dao/post-dao");
const path = require("path");
const GetTopAbl = require("./get-top-abl");

let dao = new PostDao(
  path.join(__dirname, "..", "..", "storage", "posts.json")
);

function FilterPostsAbl(req, res) {
  const category = req.params.category;
  const posts = dao.list();
  const filteredPosts = posts.filter(
    (post) => post.categories && post.categories.includes(category)
  );
  const topPosts = filteredPosts
    .sort((a, b) => {
      const aRating =
        a.ratingValue.reduce((acc, val) => acc + val, 0) / a.ratingCount;
      const bRating =
        b.ratingValue.reduce((acc, val) => acc + val, 0) / b.ratingCount;
      return bRating - aRating;
    })
    .slice(0, 4);

  res.json(topPosts);
}

module.exports = FilterPostsAbl;
