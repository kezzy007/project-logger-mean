const mongoose = require('mongoose');


const LogsSchema = mongoose.Schema({

    "log_message":{
        type:String,
        required: true
    },
    "project":{
        type:Object,
        required:true
    },
    "user":{
        type:Object,
        required:true
    },
    "logged_time":{
        type: Timestamp,
        required: true
    }

});

const Logs = module.exports = mongoose.model('Logs',LogsSchema);

module.exports.getLogs = (callback) => {

    Logs.find(callback);

};
