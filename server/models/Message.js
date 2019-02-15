const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
        minlength: 3
    },
    body: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150,
        minlength: 3
    },


})
module.exports = mongoose.model('Message', MessageSchema)