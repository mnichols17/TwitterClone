const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const Account = require('../models/Account');
const auth = require('../middleware/auth');

// TODO: Forgot password/reset password

// Route: /api/accounts

// GET: Gets all accounts (Purely for testing)
router.get("/all", (req, res) => {
    Account.find()
    .sort({date: -1})
    .select("-password -__v")
    .then(accounts => res.json(accounts))
})

// GET: Gets account information (using token)
router.get("/", auth, (req, res) => {
    Account.findById(req.user.id)
    .select("-password -__v")
    .then(account => res.json(account))
})

// POST: Creates an account and assigns token
router.post("/", (req, res) => {
    const {username, password, email, name} = req.body

    if(!username || !password || !email || !name) return res.status(400).json({Error: "Please enter all fields"})

    Account.findOne(
        { 
            $or: [
                {username: username},
                {email: email}
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
                            token
                        })
                    })
                })
            })
        })
    })
})

// PUT: Edits a user account (using token)
router.put("/", auth, (req, res) => {
    // Test for multiple input changes & check if fields exist
    Account.findOne({username: req.body.username})
    .then(account => {
        if(account) return res.status(400).json({Error: "An account with that username already exists"})
        Account.updateOne({_id: req.user.id}, {$set: {username: req.body.username}})
        .then(response => {
            if(response.n === 0) return res.status(400).json({Error: "Account doesn't exist"}) // Probaby able to delete this one
            else if (response.nModified === 0) return res.status(400).json({Error: "Nothing was changed on the account"})
            res.json({msg: "Account modified"})
        })
    })
})

// DELETE: Deletes a user account
router.delete("/", auth, (req, res) => {
    Account.deleteOne({_id: req.user.id})
    .then(response => res.json({msg: "Account Deleted"}))
    // if (response.deletedCount === 0) return res.status(400).json({Error: "Account doesn't exist"}) // Probaby able to delete this one
})

module.exports = router;