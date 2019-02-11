const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
    },
    body: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,

    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})

module.exports = mongoose.model('Post', PostSchema)