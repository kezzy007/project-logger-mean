const mongoose = require('mongoose');

const ProjectUsersSchema = mongoose.Schema({
    
    project_id: {
        type: Number,
        required: true
    },

    user: {
        type: Object,
        required: true
    }
});

const ProjectUsers = module.exports = mongoose.model('ProjectUsers', ProjectUsersSchema);

module.exports.getAllUsers = (callback) => {

    ProjectUsers.find({},{_id:false, project_id: true, user: true}, callback);

}