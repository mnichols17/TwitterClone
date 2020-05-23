const express = require('express');
const router = express.Router();

// userId, username, password, email, name (profile pic?)
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
    res.json(accounts)
})

// Gets an accounts
router.get("/:id", (req, res) => {
    console.log(req.params.id);
    res.send({
        msg: req.params.id
    })
})

// Creates an account
router.post("/", (req, res) => {
    accounts.push({
        id: accounts[accounts.length - 1].id + 1,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name
    })
    res.send(accounts)
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