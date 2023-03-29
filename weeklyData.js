const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const weeklyDataSchema = new Schema({
    userId: {
        type: String
    },
    teamId: {
        type: String
    },
    week: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
})

const WeeklyData = mongoose.model('weeklydata', weeklyDataSchema);

module.exports = WeeklyData;