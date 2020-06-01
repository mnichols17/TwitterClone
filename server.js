const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))

app.use(express.json());

app.use('/api/accounts', require('./routes/accounts'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tweets', require('./routes/tweets'));
app.use('/api/replies', require('./routes/replies'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, () => console.log(`Server running on ${port}`))