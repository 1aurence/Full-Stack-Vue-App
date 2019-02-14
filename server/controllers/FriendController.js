const mongoose = require('mongoose')
const User = require('../models/User')
const Friend = require('../models/Friend')
module.exports = {
    async sendFriendRequest(req, res, next) {
        let friendRequest = new Friend({
            to: new mongoose.Types.ObjectId(req.body.recievingUser),
            from: new mongoose.Types.ObjectId(req.body.requestingUser)
        })
        try {
            let findDuplicateRequest = await Friend.findOne({
                from: req.body.requestingUser
            })
            if (!findDuplicateRequest) {
                let saveFriendRequest = await friendRequest.save()
                if (saveFriendRequest) {
                    res.send("Friend request has been sent")
                }
            }
            if (findDuplicateRequest.accepted) {
                throw new Error("User is already your friend")
            }
            if (!findDuplicateRequest.accepted) {
                throw new Error("Friend requset currently pending")
            }
        } catch (err) {
            console.log(err.message)
            res.status(400).send(err.message)
        }
    },
    async getFriendRequests(req, res, next) {
        try {
            let findRequests = await Friend.find({
                to: req.params.id,
                accepted: false
            }).populate("from", "username")
            res.send(findRequests)
        } catch (err) {
            res.status(400).send(err.message)
        }
    },
    async acceptFriendRequest(req, res, next) {
        try {
            let findRequest = await Friend.findOneAndUpdate({
                to: req.body.to,
                from: req.body.from
            }, {
                $set: {
                    accepted: true
                }
            })
            if (findRequest) {
                res.send("Friend request has been accepted")
            }
        } catch (err) {
            res.status(400).send(err.message)
        }

    },
    async getUsersFriends(req, res, next) {
        try {
            let getFriends = await Friend.find({
                to: req.params.id,
                accepted: true
            }).populate('from', 'username')
            res.send(getFriends)
        } catch (error) {
            res.status(400).send(err.message)
        }
    }
}