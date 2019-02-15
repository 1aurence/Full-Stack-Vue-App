const mongoose = require('mongoose')
const Message = require('../models/Message')

module.exports = {
    async create(req, res, next) {
        console.log(req.body)
        let msg = new Message({
            to: req.body.to,
            from: req.body.from,
            title: req.body.title,
            body: req.body.body
        })
        try {
            let saveMsg = await msg.save()
            if (saveMsg)
                res.send("Message has been sent")
        } catch (err) {
            res.status(400).send(err.message)
        }
    },
    async getUserMessages(req, res, next) {
        try {
            let msgs = await Message.find({
                to: req.params.id
            }).populate('from', 'username')
            res.send(msgs)
        } catch (err) {
            res.status(400).send(err.message)

        }
    },
    async deleteMessage(req, res, next) {
        try {
            let msg = await Message.findByIdAndDelete(req.params.id)
            res.send("Message has been deleted")
        } catch (err) {
            res.status(400).send(err.message)
        }
    }
}