const express = require('express')
const router = express.Router()
const PostController = require('../../controllers/PostController')
const CommentController = require('../../controllers/CommentController')

router.get('/posts', PostController.getPosts)
router.post('/create', PostController.create)
router.delete('/delete/:id', PostController.delete)
router.post('/comment', CommentController.addComment)
router.get('/comments/:id', CommentController.postComments)
router.get('/comments', CommentController.comments)

module.exports = router