const mongoose = require('mongoose')

const treatmentSchema = mongoose.Schema({
    treatmentName: {
        type: String,
        required: true
    },
    treatmentCost: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Treatment", treatmentSchema)
