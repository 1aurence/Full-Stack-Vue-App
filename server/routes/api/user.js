const express = require('express')
const router = express.Router()
const UserController = require('../../controllers/UserController')

router.post('/create', UserController.create)
router.post('/login', UserController.login)
router.get('/verify/:id', UserController.verify)
router.post('/user-posts', UserController.userPosts)
router.put('/:username', UserController.updateUsername)


module.exports = router