const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CommentSchema = new Schema({
    body: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Comment', CommentSchema)