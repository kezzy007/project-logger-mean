const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const LogsSchema = mongoose.Schema({

    "log_message":{
        type:String,
        required: true
    },
    "project_id":{
        type:String,
        required:true
    },
    "user":{
        type:Object,
        required:true
    },
    
});

LogsSchema.plugin(timestamps);

const Logs = module.exports = mongoose.model('Logs',LogsSchema);

module.exports.getLogs = (callback) => {

    Logs.find({}, callback);

};