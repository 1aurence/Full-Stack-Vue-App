const Post = require("../models/Post");
const Comment = require("../models/Comment");
const mongoose = require("mongoose");

module.exports = {
  async create(req, res, next) {
    let {
      title,
      body,
      author
    } = req.body;
    let post = new Post({
      _id: new mongoose.Types.ObjectId(),
      title,
      body,
      author: new mongoose.Types.ObjectId(author)
    });
    try {
      let savePost = await post.save();
      if (savePost) res.send(savePost);
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  async delete(req, res, next) {
    try {
      let deletePost = await Post.deleteOne({
        _id: req.params.id
      });
      let deletePostComments = await Comment.deleteMany({
        postId: req.params.id
      });
      if (deletePost && deletePostComments) {
        res.send("Post deleted");
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  async getPosts(req, res, next) {
    try {
      let posts = await Post.find({}).populate("author", "username");
      if (posts) {
        res.send(posts);
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).send(err.message);
    }
  },
  async userPosts(req, res, next) {
    try {
      let usersPosts = await Post.find({
        author: req.params.id
      });
      res.send(usersPosts);
    } catch (err) {
      console.log(err.message);
      return res.status(404).send(err.message);
    }
  },
};