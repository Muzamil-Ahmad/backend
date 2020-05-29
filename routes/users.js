const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));


//route to register a admin in the DB - module - 1
//i havn't created login route for admin u can get the token from the register route itself
router.post('/register-admin', async(req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('Admin with the same email already registered');
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: 'admin',
        email: req.body.email,
        password: hashPass
    })
    savedUser = await user.save()
    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.jwtPrivateKey);
    if (savedUser && token) {
        return res.header('x-auth-header', token).send(_.pick(user, ['firstname', 'email']));
    } else {
        return res.status(400).send('Error in insert new record');
    }
});

//route to register a new user in the DB - module 1
router.post('/register-user', async(req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('User with the same email already registered');
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        role: 'user',
        email: req.body.email,
        password: hashPass
    })
    if (await user.save()) {
        return res.send(_.pick(user, ['firstname', 'email']));
    } else {
        return res.status(400).send('Error in insert new record');
    }
});

//route to login for user - module 2
router.post('/login', async(req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.send("Invalid email or password");

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.jwtPrivateKey);
    return res.send(token);
});

//test api
router.get('/test', (req, res) => {
    res.send('Hello World');
});

module.exports = router;