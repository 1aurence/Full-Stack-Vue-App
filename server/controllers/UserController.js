const mongoose = require('mongoose')
const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcryptjs')
const saltRounds = 10
const transporter = require('../routes/api/nodemailer')



function sendEmail(email, id) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify email for F-Stack App',
        html: `<p>Please verify your email by clicking <a targer="_blank" href="http://localhost:3000/api/user/verify/${id}">here</a></p>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err.message)
        }
    })
}
module.exports = {
    async create(req, res, next) {
        const {
            username,
            email,
            password
        } = req.body
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (hash) {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    username,
                    email,
                    password: hash
                })
                try {
                    const saveUser = await user.save()
                    if (saveUser) {
                        sendEmail(email, saveUser._id)
                        res.status(201).send(saveUser)
                    }
                } catch (err) {
                    if (err.code === 11000) {
                        res.status(400).send("Email or username already in use")
                    } else {
                        res.status(400).send(err.message)
                    }
                }
            }
        })

    },
    async login(req, res, next) {
        console.log(req.body)
        try {
            const getUser = await User.findOne({
                username: req.body.username
            })
            if (!getUser) {
                throw new Error("User not found")
            } else if (getUser.verified) {
                bcrypt.compare(req.body.password, getUser.password, (err, result) => {
                    if (result) {
                        res.status(200).send(getUser)
                    } else {
                        throw new Error("Incorrect password")
                    }
                })
            } else {
                throw new Error("Check your email to verify your account")
            }
        } catch (err) {
            return res.status(400).json({
                error: err.message
            })
        }

    },
    async verify(req, res, next) {
        try {
            let user = await User.findById(req.params.id)
            user.verified = true
            let updateUser = await user.save()
            if (updateUser) {
                res.sendStatus(200).send('Your account has been verified')
            }

        } catch (err) {
            res.status(400).send(JSON.stringify(err.message))
        }

    },
    async userPosts(req, res, next) {
        try {
            let usersPosts = await Post.find({
                author: req.body._id
            })
            res.send(usersPosts)
        } catch (err) {
            return res.status(404).send(JSON.stringify(err.message))
        }
    },
    async updateUsername(req, res, next) {
        console.log(req.params.username, req.body.newUsername)
        try {
            let findExistingUser = await User.findOne({
                username: req.body.username
            })
            if (findExistingUser) {
                throw new Error("Username is taken")
            } else {
                let updateUser = await User.updateOne({
                    username: req.params.username
                }, {
                    $set: {
                        username: req.body.newUsername
                    }
                })
                let returnUpdatedUser = await User.findOne({
                    username: req.body.newUsername
                })
                res.send(returnUpdatedUser)
            }
        } catch (err) {
            res.status(400).send(err.message)

        }
    }

}