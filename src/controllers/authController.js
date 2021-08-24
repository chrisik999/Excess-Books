const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {createToken} = require('../services/jwtServices');
// const {secret, expiry} = require('../config/config');

// const secret = "TokyoRavens";
// const expiry = 3600;

exports.registerNewUser = (req, res) => {
    const user = req.body;
    console.log(user);
    
    User.findOne({username: user.username} , (err, fetchedUser) => {
        if (err) {
            return res.status(500).json({message: 'Internal server error', error: err.message});
        } else if(fetchedUser){
            return res.status(200).json({message: 'Username has already been used'});
        } 
            User.create({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                phone: user.phone
            }, (err, newUser) => {
                if (err) {
                    return res.status(500).json({message: 'Internal server error', error: err.message});
                }
                //hash the user password
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        return res.status(500).json({message: 'Internal server error', error: err.message});
                    }
                    bcrypt.hash(user.password, salt, (err, hashedPassword) => {
                        if (err) {
                            return res.status(500).json({message: 'Internal server error', error: err.message});
                        }
                        newUser.password = hashedPassword;
                        newUser.save((err, registeredUser) => {
                            if (err) {
                                return res.status(500).json({message: 'Internal server error', error: err.message});
                            }
                            //create jwt for the user...
                            let token = createToken(newUser);
                            if(!token) {
                                return res.status(500).json({message: 'sorry we cannot authenticcate you'});
                            }
                                return res.status(201).json({message: 'User registered Successfully.', token: token});
                            })
                        })
                    })
                })
            })
        
    } 

exports.loginUser = (req, res) => {
    const user = req.body;
    User.findOne({username: user.username}, (err, fetchedUser) => {
        if (err) {
            return res.status(500).json({message: 'Internall server error', error: err});
        } else if(!fetchedUser) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        let checkPassword = bcrypt.compareSync(user.password, fetchedUser.password);
        if(!checkPassword){
            return res.status(401).json({message: 'Invalid credentials'});
        }
        //create jwt for the user...
        let token = createToken(fetchedUser);
        if(!token) {
            return res.status(500).json({message: 'sorry we cannot authenticcate you'});
        }
            return res.status(201).json({message: 'User logged Successfully.', token: token});
        })
    }