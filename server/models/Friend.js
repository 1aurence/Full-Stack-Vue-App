const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FriendSchema = new Schema({
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
    accepted: {
        type: Boolean,
        default: false
    }

})
module.exports = mongoose.model('Friend', FriendSchema)