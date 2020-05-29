const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()

const Account = require('../models/Account');
const Tweet = require('../models/Tweet');
const auth = require('../middleware/auth');

// Route: /api/tweets

// GET: Gets all tweets for the timeline
router.get("/", (req, res) => {
    Tweet.find()
    .sort({date: -1})
    .select("-__v")
    .then(tweets => res.json(tweets))
})

// POST: Creates a tweet
router.post('/', auth, (req, res) => {
    const {body} = req.body

    Account.findById(req.user.id)
    .select("-password -__v")
    .then(account => {
        const newTweet = new Tweet({
            username: account.username,
            body
        });

        newTweet.save()
        .then(tweet => {
            res.status(201).json({
                msg: "Tweet created"
            })
        })
    })
})

// PUT: Changes number of favorites on a tweet
router.put('/favorite', auth, (req, res) => {
    const {tweetId, add} = req.body;
    
    Tweet.updateOne(
        {_id: tweetId},
        { $inc: {favorites: add}}
    )
    .then(response => {
        res.json({msg: "Favorites modified"})
    })
})

// Delete: Deletes a tweet (must be the creator of the tweet)
router.delete('/', auth, (req, res) => {
    const {tweetId} = req.body

    Account.findById(req.user.id)
    .then(account => {
        Tweet.findById(tweetId)
        .then(tweet => {
            if (tweet.username !== account.username) return res.status(400).json({Error: "You are not authorized to delete this tweet"})

            Tweet.deleteOne({_id: tweetId})
            .then(response => res.json({msg: "Tweet Deleted"}))
        })
    })
})

module.exports = router;