const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const Account = require('../models/Account');

// Route: /api/auth

// POST: Authenticates account and returns access token
router.post('/', (req, res) => {
    const {user, password} = req.body;

    if(!user || !password) return res.status(400).json({Error: "Missing Account Information"})

    Account.findOne(
        { 
            $or: [
                {username: user},
                {email: user}
            ]
        }
    )
    .then(account => {
        if(!account) return res.status(400).json({Error: "Account doesn't exist"})

        bcrypt.compare(password, account.password)
        .then(match => {
            if(!match) return res.status(400).json({Error: "Incorrect password"})
            jwt.sign({id: account.id}, process.env.SECRET, {expiresIn: 3600}, (err, token) => {
                if (err) throw err;
                res.status(201).json({token})
            })
        })
    })
})

module.exports = router;