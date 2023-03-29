const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    managerId: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    currentStatus: {
        type: String,
        required: true
    }
}, {timestamps: true})

const User = mongoose.model('users', userSchema);

module.exports = User;