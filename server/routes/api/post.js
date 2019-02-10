const express = require('express')
const router = express.Router()
const PostController = require('../../controllers/PostController')

router.post('/create', PostController.create)
router.delete('/delete/:id', PostController.delete)

module.exports = router