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

// GET: Gets all tweets for an individual account
router.get("/:username", auth, (req, res) => {
    res.send({
        user: req.user
    })
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

// Delete: Deletes a tweet (must be the creator of the tweet)
router.post('/', auth, (req, res) => {
    res.send({
        user: req.user.username
    })
})

module.exports = router;