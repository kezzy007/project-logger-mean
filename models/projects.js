const mongoose = require('mongoose');

const projectsSchema = mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    logs:{
        type: Object,
        required: false
    }

});

const Projects = module.exports = mongoose.model('Projects', projectsSchema);

module.exports.getProjects = (callback) => {
    
    Projects.find({}, callback);

};