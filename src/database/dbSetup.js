const mongoose = require('mongoose');
const config = require('../config/config');

const connectionString = config.mongoUri;

module.exports = () => {
    mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    }, (err) => {
        if(err) console.log(err);
        else console.log('Database Connected');
    });
}