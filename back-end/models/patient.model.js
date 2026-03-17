const mongoose = require('mongoose')

const patientSchema = mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    patientEmail: {
        type: String,
        required: true
    },
    patientPhone: {
        type: Number,
        required: true
    },
    patientAge: {
        type: Number,
        required: true
    },
    primaryDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    }
}, {timestamps : true})

module.exports = mongoose.model("Patient", patientSchema)
