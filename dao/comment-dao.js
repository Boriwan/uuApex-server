"use-strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DEFAULT_STORAGE_PATH = path.join(
  __dirname,
  "server",
  "storage",
  "comments.json"
);

class CommentDao {
  constructor(storagePath) {
    this.commentStoragePath = storagePath
      ? storagePath
      : DEFAULT_STORAGE_PATH;
  }

  create(object) {
    let commentList = this._listAll();
    object.id = crypto.randomBytes(8).toString("hex");
    commentList.push(object);
    fs.writeFileSync(this._getStoragePath(), JSON.stringify(commentList));
    return object;
  }

  edit(object) {
    return object;
  }

  delete(object) {
    let commentList = this._listAll().filter(
      (comment) => comment.id !== object.id
    );
    fs.writeFileSync(this._getStoragePath(), JSON.stringify(commentList));
  }

  update(id, newData) {
    let commentList = this._listAll();

    const index = commentList.findIndex(
      (comment) => comment.id === id
    );
    console.log(id, index);
    if (index !== -1) {
      commentList[index] = { ...commentList[index], ...newData };
      fs.writeFileSync(this._getStoragePath(), JSON.stringify(commentList));
      console.log(commentList);
    }
  }

  list() {
    return this._listAll() || [];
  }
  get(id) {
    return this._listAll().find((comment) => comment.id === id);
  }

  _listAll() {
    let listAll;
    try {
      const fileData = fs.readFileSync(this._getStoragePath());
      if (fileData) listAll = JSON.parse(fileData);
    } catch (e) {
      listAll = [];
    }
    return listAll;
  }

  _getStoragePath() {
    return this.commentStoragePath;
  }
}

module.exports = CommentDao;
