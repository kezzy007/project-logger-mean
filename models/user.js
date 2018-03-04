const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');


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
    username:{
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User',userSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){

    const query = { username: username };

    User.findOne(query, callback);

}

module.exports.addUser = function(newUser, callback){

    // Hash user's password
    bcryptjs.genSalt(10, (err, salt) => {

        bcryptjs.hash(newUser.password, salt, (err, hashedPassword) => {

            if(err) throw err;

            newUser.password = hashedPassword;

            // Since newUser is a model object, it exhibits model properties
            newUser.save(callback);
        });

    });

};