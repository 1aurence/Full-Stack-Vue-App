const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CommentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    body: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})
module.exports = mongoose.model('Comment', CommentSchema)