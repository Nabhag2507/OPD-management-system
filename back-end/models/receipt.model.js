const  mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    opd: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OPD",
        required: true
    },
    amount: Number,
    paymentMethod: String,
    paymentStatus: {
        type: String,
        enum: ["paid", "pending"],
        default: "pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Receipt", receiptSchema)