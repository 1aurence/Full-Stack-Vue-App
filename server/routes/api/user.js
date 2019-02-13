const express = require('express')
const router = express.Router()
const UserController = require('../../controllers/UserController')
const CommentController = require('../../controllers/CommentController')

router.post('/create', UserController.create)
router.post('/login', UserController.login)
router.get('/verify/:id', UserController.verify)
router.get('/user-posts/:id', UserController.userPosts)
router.get('/comments/:id', CommentController.userComments)
router.put('/change-username/:userId', UserController.changeUsername)
router.put('/change-password/:userId', UserController.changePassword)


module.exports = router