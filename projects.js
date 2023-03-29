const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    currentStatus: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Project = mongoose.model('projects', projectSchema);

module.exports = Project;