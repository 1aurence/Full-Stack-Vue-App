const User = require('../models/User')
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
        } else {
            // console.log(info)
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
            }
            if (getUser.verified) {
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
            res.status(404).send(err.message)
        }

    },
    async verify(req, res, next) {
        try {
            let user = await User.findById(req.params.id)
            user.verified = true
            let updateUser = await user.save()
            if (updateUser) {
                res.status(200).send('Your account has been verified')
            }

        } catch (err) {
            res.status(400).send(err.message)
        }

    }
}