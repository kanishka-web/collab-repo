const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const managerSchema = new Schema({
    manager_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})

const Manager = mongoose.model('managers', managerSchema);

module.exports = Manager;