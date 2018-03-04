const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/register', (req, res, next) => {
   
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
            res.json({success: user, message: 'User registered'});
        }

    });

});

module.exports = router;