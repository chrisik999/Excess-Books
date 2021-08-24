const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: 'string',
        required: true,
        minLength:3
    },
    lastName: {
        type: 'string',
        required: true,
        minLength:3
    },
    phone: {
        type: String,
        minLength: 11,
        required: true,
        unique: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        lowerCase:true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
});

const User = new mongoose.model('User', userSchema);
module.exports = User;