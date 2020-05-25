const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// (id in DB) username, password, email, name (profile pic at some point)
const AccountSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = Account = mongoose.model('account', AccountSchema);

