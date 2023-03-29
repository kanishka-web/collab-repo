const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const teamMemberSchema = new Schema({
    teamId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {timestamps: true})

const TeamMember = mongoose.model('teammembers', teamMemberSchema);

module.exports = TeamMember;