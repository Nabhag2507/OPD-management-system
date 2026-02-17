const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
    diagnosisName: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Diagnosis", diagnosisSchema);
