require('dotenv').config();

const mongoose = require('mongoose');
const mongoString = process.env.MONGODB_URI;

// remove deprecation warnings
mongoose.set('strictQuery', true);

mongoose.connect(mongoString) 
    .then(() => { console.log('Database OK') }) // connect
    .catch(err => {console.error(err)}); // error

const database = mongoose.connection;