const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

async function makeConnection() {
    try {
        // const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
        const con = await mongoose.connect(`mongodb://${process.env.host}/${process.env.database}`, { useNewUrlParser: true, useUnifiedTopology: true });
        // console.log(con);
        console.log('\nDatabase Connected')
    } catch (err) {
        console.log(err + ' ***Database Connection Error');
    }
}

module.exports.makeConnection = makeConnection;