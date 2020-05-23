const express = require('express');
const router = express.Router();

// userId, username, password, email, name (profile pic?)
const accounts = [
    {
        id: 0,
        username: "admin",
        password: "admin",
        email: "admin@gmail.com",
        name: "Mr. Admin",
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

// Creates a user account
router.post("/", (req, res) => {
    console.log("CREATE ACCOUNT")
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