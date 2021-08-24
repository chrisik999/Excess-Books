const User = require('../models/user');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

exports.seedAdmin = () => {
    User.findOne({role: 'admin'}, (err, admin) => {
        if (err) {
            throw err;
        }
        if(admin){
            return "admin account exist";
        }
        User.create({
            firstName: config.firstName,
            lastName: config.lastName,
            username: config.username,
            phone: config.phone,
            role: config.role
        }, (err, user) => {
            if(err) {
                throw err;
            }
            bcrypt.genSalt(10, (err, salt) => {
                if(err) throw err;
              bcrypt.hash(config.password, salt, (err, hash) => {
                    if(err) throw err;
                    user.password = hash;
                    user.save((err, savedUser) => {
                        if (err) throw err;
                        console.log ('admin created');
                        return "admin account created";
                        
                    })
              })  
            })
        })
    })
}