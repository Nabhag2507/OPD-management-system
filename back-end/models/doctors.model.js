const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    },
    experience: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);
