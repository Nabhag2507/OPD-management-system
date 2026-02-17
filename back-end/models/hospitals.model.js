const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    hospitalName: String,
    location: String,
    beds: Number
}, { timestamps: true });

module.exports = mongoose.model("Hospital", hospitalSchema);
