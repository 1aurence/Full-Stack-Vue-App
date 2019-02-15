const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  async create(req, res, next) {
    console.log(req.body)
    let comment = new Comment({
      author: new mongoose.Types.ObjectId(req.body.authorId),
      postId: new mongoose.Types.ObjectId(req.body.postId),
      body: req.body.body
    });
    try {
      let saveComment = await comment.save();
      if (saveComment) {
        res.send(saveComment);
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).send(err.message);
    }
  },
  async postComments(req, res, next) {
    try {
      let comment = await Comment.find({
        postId: req.params.id
      }).populate("author", "username");
      res.send(comment);
    } catch (err) {
      console.log(err.message);
      res.status(400).send(err.message);
    }
  },
  async comments(req, res, next) {
    try {
      let getComments = await Comment.find({}).populate("author");
      if (getComments) {
        res.send(getComments);
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  async userComments(req, res, next) {
    try {
      let userComments = await Comment.find({
        author: req.params.id
      });
      res.send(userComments);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send(err.message);
    }
  }
};