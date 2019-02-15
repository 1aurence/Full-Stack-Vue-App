const express = require('express')
const router = express.Router()
const UserController = require('../../controllers/UserController')
const CommentController = require('../../controllers/CommentController')

router.post('/create', UserController.create)
router.post('/login', UserController.login)
router.get('', UserController.allUsers)
router.get('/user-info/:id', UserController.getUser)
router.get('/verify/:id', UserController.verify)
router.put('/change-username/:userId', UserController.changeUsername)
router.put('/change-password/:userId', UserController.changePassword)

module.exports = router