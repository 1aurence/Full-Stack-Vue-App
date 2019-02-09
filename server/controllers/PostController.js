const Post = require('../models/Post')

module.exports = {
    async create(req, res, next) {
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
    }
  
}