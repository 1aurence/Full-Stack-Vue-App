const express = require('express')
const router = express.Router()
const MessageController = require('../../controllers/MessageController')

router.post('/create', MessageController.create)
router.get('/:id', MessageController.getUserMessages)
router.delete('/delete/:id', MessageController.deleteMessage)

module.exports = router