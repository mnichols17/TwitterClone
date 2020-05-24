const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Account = require('../models/Account');

// userId, username, password, email, name (profile pic at some point)
const accounts = [
    {
        id: 0,
        username: "admin",
        password: "admin",
        email: "admin@gmail.com",
        name: "Admin Admin",
    },
    {
        id: 1,
        username: "TestUser",
        password: "password",
        email: "test@gmail.com",
        name: "Test User",
    }
]

// Gets all accounts (Purely for testing)
router.get("/", (req, res) => {
    Account.find()
        .sort({date: -1})
        .then(accounts => res.json(accounts))
})

// Gets an accounts
router.get("/:id", (req, res) => {
    res.send({
        msg: req.params.id
    })
})

// Creates an account
router.post("/", (req, res) => {
    const {username, password, email, name} = req.body

    if(!username || !password || !email || !name) return res.status(400).json({Error: "Please enter all fields"})

    //At some point, check if user exists in DB

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
                        res.json({
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

// Edits a user account
router.put("/", (req, res) => {
    console.log("PUT");
})

// Deletes a user account
router.delete("/", (req, res) => {
    console.log("DELETE")
})

module.exports = router;