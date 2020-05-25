const jwt = require('jsonwebtoken');
require('dotenv').config()

// Allows private routes to be accessed
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    
    if(!token) return res.status(401).json({Error: "No access token provided"})

    try {
        req.user = jwt.verify(token, process.env.SECRET);
        next();
    } catch(e) {
        res.status(400).json({Error: "Invalid Token", Reason: e.message})
    }
}

module.exports = auth;