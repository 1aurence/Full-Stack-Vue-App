const express = require('express')
const router = express.Router()
const UserController = require('../../controllers/UserController')

router.post('/create', UserController.create)
router.get('/get', UserController.login)
// router.get('/info', UserController.get)

module.exports = router