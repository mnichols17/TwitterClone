const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))

app.use(express.json());

app.use('/api/accounts', require('./routes/accounts'));

app.listen(port, () => console.log(`Server running on ${port}`))