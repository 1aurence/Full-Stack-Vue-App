const express = require('express')
const router = express.Router()
const CommentController = require('../../controllers/CommentController')

router.post('/create', CommentController.create)
router.get('/post-comments/:id', CommentController.postComments)
router.get('/comments', CommentController.comments)
module.exports = router