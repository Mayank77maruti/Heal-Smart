const mongoose = require('mongoose');
require('dotenv').config()
mongoose.set('strictQuery', true);
const url = process.env.DB_URL;
const DBConnect = async () => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
        console.log("DB connection error", err);
        process.exit(1);
    }
}

module.exports = DBConnect;

