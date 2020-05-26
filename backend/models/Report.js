const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    reportData: {
        type: Array,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }

});

module.exports = Report = mongoose.model('report', ReportSchema)


