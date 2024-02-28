const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
//      id: {
//         type: String,
//         required: true,
//            unique: true,
//     },
    taskTitle: {
        type: String,
        required: true,
     //    unique: true,
    },
    taskStatus: {
        type: String,
        required: true,
     //    unique: true,
    },
    taskPriority: {
        type: String,
        required: true,
    },
    taskValidity: {
        type: Date,
        required: false,
    },
    taskCheckList:{
     type: Array,
     required: false,
    },
    createdBy:{
     type: String,
     required: true,
    }
});

module.exports = mongoose.model("Task", taskSchema);