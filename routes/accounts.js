const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const Account = require('../models/Account');
const Tweet = require('../models/Tweet');
const Reply = require('../models/Reply');
const auth = require('../middleware/auth');

// TODO: Forgot password/reset password, Refresh token for when a user doens't access the site for longer than an hour but the token is valid

// Route: /api/accounts

// GET: Gets account information (using token)
router.get("/", auth, (req, res) => {
    Account.findById(req.user.id)
    .select("-password -__v")
    .then(account => res.json(account))
})

router.get("/:username", (req, res) => {
    Account.findOne({username: req.params.username})
    .select("-_id -email -password -__v")
    .then(account => res.json(account))
    .catch(err => res.status(400).json(err))
})

// POST: Creates an account, protects password and assigns token
router.post("/", (req, res) => {
    const {username, password, email, name} = req.body

    if(!username || !password || !email || !name) return res.status(400).json({Error: "Please enter all fields"})

    if(/\s/g.test(username) || /\s/g.test(password) || /\s/g.test(email)) return res.status(400).json({Error: "No whitespace is allowed in the username, password or email"})

    Account.findOne(
        { 
            $or: [
                {username: { $regex: username, $options: 'i' }},
                {email: { $regex: email, $options: 'i' }}
            ]
        }
    )
    .then(account => {
        if(account) return res.status(400).json({Error: "Account already exists"})

        const newAccount = new Account({
            username,
            password,
            email,
            name
        })
    
        bcrypt.genSalt((err, salt) => {
            bcrypt.hash(newAccount.password, salt, (err, hash) => {
                if (err) throw err;
                newAccount.password = hash;
                newAccount.save()
                .then(account => {
                    jwt.sign({id: account.id}, process.env.SECRET, {expiresIn: 3600}, (err, token) => {
                        if (err) throw err;
                        res.status(201).json({
                            token,
                            profile: {
                                username: newAccount.username,
                                name: newAccount.name,
                                email: newAccount.email
                            }
                        })
                    })
                })
            })
        })
    })
})

// PUT: Keeps track of tweets that the user favorited
router.put("/favorite", auth, (req, res) => {
    if(req.body.add > 0){
        Account.update(
            {_id: req.user.id},
            { $push: {favorites: req.body.tweetId}}
        )
        .then(msg => {
            res.json({
                id: req.body.tweetId,
                add: true
            })
        })
    } else {
        Account.update(
            {_id: req.user.id},
            { $pull: {favorites: req.body.tweetId}}
        )
        .then(msg => {
            res.json({
                id: req.body.tweetId,
                add: false
            })
        })
    }
    
})

// PUT: Edits a user account (using token) //look into findOneAndUpdate or one of the .updates
router.put("/", auth, (req, res) => {
    // Test for multiple input changes & check if fields exist
    Account.findOne({username: { $regex: req.body.username, $options: 'i' }})
    .then(account => {
        if(account) return res.status(400).json({Error: "An account with that username already exists"})

        Account.findById(req.user.id)
        .then(async(account) => {
            await Tweet.updateMany({username: account.username}, {$set: {username: req.body.username}})
            await Reply.updateMany({username: account.username}, {$set: {username: req.body.username}})
            Account.updateOne({_id: req.user.id}, {$set: {username: req.body.username}})
            .then(response => {
                if(response.n === 0) return res.status(400).json({Error: "Account doesn't exist"}) // Probaby able to delete this one
                else if (response.nModified === 0) return res.status(400).json({Error: "Nothing was changed on the account"})
                res.json({msg: "Account modified"})
            })
        })
    })
})

// DELETE: Deletes a user account and any tweets/favorites/replies they have. Updates tweets accordingly
router.delete("/", auth, (req, res) => {
    Account.findById(req.user.id)
    .then(async(account) => {
        account.favorites.map(async(favorite) => {
            await Tweet.updateOne({_id: favorite}, {$inc: {favorites: -1}})
            await Reply.updateOne({_id: favorite}, {$inc: {favorites: -1}})
        })
        await Tweet.deleteMany({username: account.username})
        Reply.find({username: account.username})
        .then(replies => {
            replies.map(async(reply) => {
                await Tweet.updateOne({_id: reply.originalTweet}, {$inc: {replies: -1}})
                await Reply.deleteOne({_id: reply._id})
            })
            Account.deleteOne({_id: req.user.id})
            .then(response => res.json({msg: "Account Deleted"}))
        })
    })
})

module.exports = router;