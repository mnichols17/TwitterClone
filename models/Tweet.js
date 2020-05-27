const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// (id in DB) username associated with tweet, tweetbody, date tweeted
const TweetSchema = new Schema({
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
    }
})

module.exports = Tweet = mongoose.model('tweet', TweetSchema);