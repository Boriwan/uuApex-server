// implement abl
const CategoryDao = require("../../dao/category-dao");
const path = require("path");

let dao = new CategoryDao(
  path.join(__dirname, "..", "..", "storage", "categories.json")
);

function ListAllAbl(req, res) {
  const category = dao.list();


  res.json(category);
}

module.exports = ListAllAbl;
