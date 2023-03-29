const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userProjectSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        required: true
    },
    currentStatus: {
        type: String,
        required: true
    }
}, {timestamps: true})

const UserProject = mongoose.model('userprojects', userProjectSchema);

module.exports = UserProject;