const express = require('express');
const router = express.Router();

// Models
const User = require('../models/user');
const Logs = require('../models/logs');
const Projects = require('../models/projects');

// Authentication modules
const passport = require('passport');
const config = require('../config/database');
const jwt = require('jsonwebtoken');

const ROLE_ADMIN = 'ADMIN';

router.post('/register', (req, res, next) => {

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role 
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
                        "username": user.username,
                        "role": user.role
                    };

                    // Create token
                    let token = jwt.sign(tempUser, config.secret, {
                        expiresIn: 604800 // 1 week,
                    });

                   return res.json({
                        success: true,
                        token: 'bearer '+ token,
                        user: tempUser
                    });

                }
                else{
                    return res.json({success: false, message:'Wrong password' });
                }

            });

        }

    });

});

router.post('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {

    return res.json({
        user : req.user
    });

});

router.post('/projects', passport.authenticate('jwt', {session:false}), (req,res, next) => {


    if(req.body.user.role.toUpperCase() !== ROLE_ADMIN)
        return res.json({success:false, message:"Unauthorized"});

    // This returns all the projects for the admin
    Projects.getProjects((err, projects) => {

            if(err) throw err;
            
            Logs.getLogs((err, logs) => {

                if(err) throw err;

                return res.json({success: true, projects: projects, logs: logs});

            });

    });

});

router.post('/save-project', passport.authenticate('jwt', {session:false}), (req, res, next) => {

    const project = new Projects(req.body.project);


    project.save((err, project) => {

        if(err) throw err;

        if(project){
            return res.json({success: true, message: 'Projects saved', project: project});
            
        }
        else{
            return res.json({success:false, message: 'Could not save'});
        }

    });

});

router.post('/save-log', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    const log = new Logs(req.body.log);

    log.save((err, log) => {

        if(err) throw err;

        console.log(log);

        return res.json({success:true, log: log});
    });

});

module.exports = router;