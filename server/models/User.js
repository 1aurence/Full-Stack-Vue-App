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
    },
    verified: {
        type: Boolean,
        default: false
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }


})

module.exports = mongoose.model('User', UserSchema)