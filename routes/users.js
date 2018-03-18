const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const config = require('../config/database');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res, next) => {

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password 
    });

    

    User.addUser(newUser, (err, user) => {

        if(err){
            res.json({success: false, message: "Registration failed"});
        }
        else{
            res.json({success:true, user: user, message: 'User registered'});
        }

    });

});

router.post('/authenticate', (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user)=>{

        if(err) throw err;

        if(!user){
            return res.json({success:false, message:'User not found'});
        }
        else{
            //  User is containing the list of methods from user model exports
            User.comparePassword(password, user.password, (err, isMatch) => {
                
                if(err) throw err;

                if(isMatch){

                    const tempUser = {
                        "_id": user._id,
                        "name": user.name,
                        "email": user.email,
                        "username": user.username
                    };

                    // Create token
                    let token = jwt.sign(tempUser, config.secret, {
                        expiresIn: 604800 // 1 week,
                    });

                   return res.json({
                        success: true,
                        token: 'bearer '+ token,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email,

                        }
                    });

                }
                else{
                    return res.json({success: false, message:'Wrong password' });
                }

            });

        }

    });

});

router.post('/profile', passport.authenticate('jwt', {session:false}), (req, res,next) => {

    return res.json({
        user : req.user
    });

});

module.exports = router;