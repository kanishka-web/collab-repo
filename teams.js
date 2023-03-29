const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const teamSchema = new Schema({
    managerId: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Team = mongoose.model('teams', teamSchema);

module.exports = Team;