const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const Account = require('../models/Account');

// POST: Authenticates account and returns access token
router.post('/', (req, res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password) return res.status(400).json({Error: "Bad Request"})

    Account.findOne(
        { 
            $and: [
                {username: username},
                {email: email}
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

module.exports = router;