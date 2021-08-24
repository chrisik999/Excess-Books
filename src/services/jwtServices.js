const jwt = require('jsonwebtoken');
const {secret, expiry} = require('../config/config');

exports.createToken = (user) => {
    try {
        let token = jwt.sign({
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone
        }, secret, { 
            expiresIn : expiry
        });
        return token;
    } catch (err) {
        console.group(err);
        return null;
    }
}