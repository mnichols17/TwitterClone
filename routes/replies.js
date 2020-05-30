const express = require('express');
const router = express.Router();
require('dotenv').config()

const Account = require('../models/Account');
const Tweet = require('../models/Tweet');
const Reply = require('../models/Reply')
const auth = require('../middleware/auth');

// Route: /api/replies

// GET: Gets all replies for a tweet
router.get("/:tweetId", (req, res) => {
    Reply.find(
        {originalTweet: req.params.tweetId}
    )
    .then(replies => {
        res.json(replies)
    })
})

// POST: Creates a reply
router.post('/', auth, (req, res) => {
    const {tweetId, body} = req.body
    console.log(req.body)

    Account.findById(req.user.id)
    .select("-password -__v")
    .then(account => {

        Tweet.updateOne(
            {_id: tweetId},
            { $inc: {replies: 1}}
        )
        .then(res => console.log(res))

        const newReply = new Reply({
            originalTweet: tweetId,
            username: account.username,
            body
        });

        newReply.save()
        .then(reply => {
            res.status(201).json(reply)
        })
    })
})

// PUT: Changes number of favorites on a reply
router.put('/favorite', auth, (req, res) => {
    const {replyId, add} = req.body;

    Reply.updateOne(
        {_id: replyId},
        { $inc: {favorites: add}}
    )
    .then(response => {
        res.json(response)
    })
})

// Delete: Deletes a reply and updates original tweet reply count
router.delete('/', auth, (req, res) => {
    const {replyId} = req.body;
    console.log(replyId)

    Account.findById(req.user.id)
    .then(account => {
        Reply.findById(replyId)
        .then(reply => {
            if (reply.username !== account.username) return res.status(400).json({Error: "You are not authorized to delete this reply"})

            Reply.deleteOne({_id: replyId})
            .then(msg => console.log(msg))

            Tweet.updateOne(
                {_id: reply.originalTweet},
                { $inc: {replies: -1}}
            )
            .then(response => {
                res.json({
                    msg: "Reply deleted",
                    replyId
                })
            })
        })
    })
})

module.exports = router;