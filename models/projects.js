const mongoose = require('mongoose');

const projectsSchema = mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

});

const Projects = module.exports = mongoose.model('Projects', projectsSchema);

module.exports.getProjects = (callback) => {
    
    Projects.find({}, callback);

};