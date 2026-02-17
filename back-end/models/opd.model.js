const mongoose = require("mongoose");

const opdSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    diagnosis: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diagnosis",
        required: true
    },
    visitDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("OPD", opdSchema);
