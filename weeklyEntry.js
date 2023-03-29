const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const weeklyEntrySchema = new Schema({
    weeklyDataId: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        required: true
    },
    planned: {
        type: String
    },
    actual: {
        type: String
    }
})

const WeeklyEntry = mongoose.model('weeklyentry', weeklyEntrySchema);

module.exports = WeeklyEntry;