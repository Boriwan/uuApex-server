"use-strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DEFAULT_STORAGE_PATH = path.join(
  __dirname,
  "server",
  "storage",
  "posts.json"
);

class PostDao {
  constructor(storagePath) {
    this.postStoragePath = storagePath ? storagePath : DEFAULT_STORAGE_PATH;
  }

  // create function
  create(object) {
    let postList = this._listAll();
    object.id = crypto.randomBytes(8).toString("hex");
    postList.push(object);
    fs.writeFileSync(this._getStoragePath(), JSON.stringify(postList));
    return object;
  }

  //edit function
  edit(object) {
    return object;
  }

  //delete function
  delete(object) {
    let postList = this._listAll().filter(
      (post) => post.id !== object.id
    );
    fs.writeFileSync(this._getStoragePath(), JSON.stringify(postList));
  }

  // edit function
  update(id, newData) {
    let postList = this._listAll();

    const index = postList.findIndex((post) => post.id === id);
    console.log(id, index);
    if (index !== -1) {
      postList[index] = { ...postList[index], ...newData };
      fs.writeFileSync(this._getStoragePath(), JSON.stringify(postList));
      console.log(postList);
    }
  }

  // post image function
  PosImg(object) {}

  // list all function
  list() {
    return this._listAll() || [];
  }

  // get specific post
  get(id) {
    return this._listAll().find((post) => post.id === id);
  }

  //filters the storage and returns all posts
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

  // returns the storage path where the post list is stored
  _getStoragePath() {
    return this.postStoragePath;
  }
}

module.exports = PostDao;
