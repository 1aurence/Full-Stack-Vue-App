const User = require('../models/User')
const bcrypt = require('bcryptjs')
const saltRounds = 10

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
            if (getUser) {
                bcrypt.compare(req.body.password, getUser.password, (err, result) => {
                    if (result) {
                        res.status(200).send(getUser)
                    } else {
                        res.status(400).send('Incorrect password')
                    }
                })
            } else {
                throw new Error("Username does not exist")
            }
        } catch (err) {
            res.status(404).send(err.message)
        }

    }
}