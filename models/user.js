const mongoose = require('mongoose');
const user = new mongoose.Schema({
    firstname: String,
    lastname: String,
    role: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', user);

// async function createUser() {
//     const course = new Course({
//         name: 'sami',
//         isAdmin: 1,
//         email: 'mufti',
//         password: 'bbv'
//     });

//     const res = await course.save();
// }

// createUser();

module.exports = User;