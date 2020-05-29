const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// (id in DB) original tweet ID that reply is towards, username associated with reply, reply body, date replied
const ReplySchema = new Schema({
    originalTweet: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    favorites: {
        type: Number,
        default: 0
    }
})

module.exports = Reply = mongoose.model('reply', ReplySchema);