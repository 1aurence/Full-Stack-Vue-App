const express = require('express')
const router = express.Router()
const PostController = require('../../controllers/PostController')

router.get('/posts', PostController.getPosts)
router.post('/create', PostController.create)
router.delete('/delete/:id', PostController.delete)
router.post('/comment', PostController.addComment)
module.exports = router