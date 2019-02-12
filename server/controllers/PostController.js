const Post = require('../models/Post')
const mongoose = require('mongoose')
module.exports = {
    async create(req, res, next) {
        console.log(req.body)
        let {
            title,
            body,
            author
        } = req.body
        let post = new Post({
            title,
            body,
            author: new mongoose.Types.ObjectId(author)
        })
        try {
            let savePost = await post.save()
            if (savePost)
                res.send(savePost)
        } catch (err) {
            res.status(400).send(err.message)
        }
    },
    async delete(req, res, next) {
        try {
            let deletePost = await Post.deleteOne({
                _id: req.params.id
            })
            if (deletePost) {
                res.send("Post deleted")
            }
        } catch (err) {
            res.status(400).send("Error removing post")
        }

    },
    async getPosts(req, res, next) {
        try {
            let posts = await Post.find({}).populate('author', 'username')
            if (posts) {
                res.send(posts)
            }
        } catch (err) {
            console.log(err.message)
            res.status(400).send(err.message)
        }
    },
    async addComment(req, res, next) {

        let comment = new Comment({
            body: req.body.body
        })
        try {
            let saveComment = await comment.save()
            if (saveComment) {
                res.send(saveComment)
            }

        } catch (err) {
            res.status(400).send(err.message)
        }
    }

}