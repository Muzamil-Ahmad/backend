const dotenv = require('dotenv');
const express = require('express');
const db = require('./config/db_config');
const users = require('./routes/users');

// const users = require('./routes/user-routes');

var app = express();

app.use(express.json());

app.use('/api/users', users);

dotenv.config();
var port = process.env.PORT || 4000;


app.listen(port, (error) => {
    if (error) {
        throw error;
    }
    console.log(`\nlistening on port: ${port}`);
});

//create db connection
db.makeConnection();