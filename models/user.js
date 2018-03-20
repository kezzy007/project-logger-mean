const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const ROLES = { ROLE_ADMIN: 'ADMIN', ROLE_USER:'USER' };

const userSchema = mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
});

const User = module.exports = mongoose.model('User',userSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.getUserByEmail= function(email, callback){

    const query = { email: email };

    User.findOne(query, callback);

}

module.exports.comparePassword = (inputPassword, retrievedHashedPassword, callback) => {

    bcryptjs.compare(inputPassword, retrievedHashedPassword, (err, isMatch) => {

        callback(err, isMatch);
    });

};

module.exports.addUser = function(newUser, callback){

    // Hash user's password
    bcryptjs.genSalt(10, (err, salt) => {

        bcryptjs.hash(newUser.password, salt, (err, hashedPassword) => {

            if(err) throw err;

            newUser.password = hashedPassword;

            //User.find({'name': 'qasim'}).remove().exec();

            // Since newUser is a model object, it exhibits model properties
            newUser.save(callback);
        });

    });

};