const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Account = require('../models/Account');

// userId, username, password, email, name (profile pic at some point)

// Gets all accounts (Purely for testing)
router.get("/", (req, res) => {
    Account.find()
        .sort({date: -1})
        .select('-password -email')
        .then(accounts => res.json(accounts))
})

// Gets an account's informaton
router.get("/:username", (req, res) => {
    Account.findOne({username: req.params.username})
        .select('-password -email')
        .then(account => {
            if(account === null) res.status(400).json({Error: "Account doesn't exist"})
            res.json(account)
        })
})

// Creates an account
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
        if(account) res.status(400).json({Error: "Account already exists"})

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
                        jwt.sign({id: account.id}, "secrekey", {expiresIn: 3600}, (err, token) => {
                            if (err) throw err;
                            res.status(201).json({
                                token,
                                account: {
                                    id: account.id,
                                    username: account.username,
                                    email: account.email,
                                    name: account.name
                                }
                            })
                        })
                    })
            })
        })
    })
})

// Edits a user account
router.put("/", (req, res) => {
    Account.updateOne({email: req.body.email}, {$set: {username: req.body.username}})
        .then(response => {
            if(response.n === 0) res.status(400).json({Error: "Account doesn't exist"})
            else if (response.nModified === 0) res.status(400).json({Error: "Nothing was changed on the account"})
            res.json({msg: "Account modified"})
        })
})

// Deletes a user account
router.delete("/", (req, res) => {
    const {username, email} = req.body;
    if(!username || !email) return res.status(400).json({Error: "Please enter all fields"})

    Account.remove(
        { 
            $and: [
                {username: username},
                {email: email}
            ]
        },
        {
            justOne: true
        }
    )
    .then(response => {
        if (response.deletedCount === 0) res.status(400).json({Error: "Account doesn't exist"})
        res.json({msg: "Account deleted"})
    })
})

module.exports = router;