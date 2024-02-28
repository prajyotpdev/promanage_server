const mongoose = require("mongoose");

const subTaskSchema = new mongoose.Schema({
//      id: {
//         type: String,
//         required: true,
//            unique: true,
//     },
    subTaskTitle: {
        type: String,
        required: true,
     //    unique: true,
    },
    subTaskStatus: {
        type: String,
        required: true,
     //    unique: true,
    },
});

module.exports = mongoose.model("subTask", subTaskSchema);