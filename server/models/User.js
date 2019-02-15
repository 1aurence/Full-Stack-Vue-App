const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 12,
        minlength: 4,
        validate: {
            validator: function (v) {
                let usernameRegex = /\w/g
                return /\w/g.test(v)
            },
            message: "Username contains invalid characters"
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        // maxlength: 30,
        minlength: 4,
    },
    verified: {
        type: Boolean,
        default: false,
        required: true,
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Friend'
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],

})

module.exports = mongoose.model('User', UserSchema)