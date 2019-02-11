const Post = require('../models/Post')

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
            author
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

    }

}