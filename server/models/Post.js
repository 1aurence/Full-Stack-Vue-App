const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    _id: Schema.Types.ObjectId,
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    showingComments: {
        type: Boolean,
        default: false
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]

})

module.exports = mongoose.model('Post', PostSchema)