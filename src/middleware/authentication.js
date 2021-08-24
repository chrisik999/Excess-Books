const jwt = require('jsonwebtoken');
const {secret} = require('../config/config');

exports.authenticateUser = (req, res, next) => {
    //check for authorization header
    if(!req.headers.authorization){
        return res.status(401).json({message: 'authorization header required'});
    }
    let splittedHeader = req.headers.authorization.split(' ');
    if (splittedHeader[0] !== 'Bearer'){
        return res.status(401).json({message: 'Invalid authorization header'});
    }
    let token = splittedHeader[1];
    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) return res.status(500).json({message: err.message});
        if(!decodedToken){
            return res.status(401).json({message: 'Invalid authorization token, please login'});
        }
        req.user =  decodedToken;
        next()
    })
    
}

exports.checkAdmin = (req, res, next) => {
    if(req.user.role !== "admin") {
        return res.status(401).json({message: 'Restricted route'});
    }
    next()
}