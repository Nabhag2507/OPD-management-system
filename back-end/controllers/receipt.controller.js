const Receipt = require("../models/receipt.model");

// GET all receipts
exports.getAllReceipts = async (req, res) => {
    try {
        const receipts = await Receipt.find()
            .populate("patient")
            .populate("opd");

        res.status(200).json({
            err: false,
            receipts
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// GET receipt by ID
exports.getReceiptById = async (req, res) => {
    try {
        const receipt = await Receipt.findById(req.params.id)
            .populate("patient")
            .populate("opd");

        if (!receipt) {
            return res.status(404).json({
                err: true,
                message: "Receipt not found"
            });
        }

        res.status(200).json({
            err: false,
            receipt
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// CREATE receipt
exports.createReceipt = async (req, res) => {
    try {
        const newReceipt = await Receipt.create(req.body);

        res.status(201).json({
            err: false,
            message: "Receipt created successfully",
            receipt: newReceipt
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// UPDATE receipt
exports.updateReceipt = async (req, res) => {
    try {
        const updatedReceipt = await Receipt.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedReceipt) {
            return res.status(404).json({
                err: true,
                message: "Receipt not found"
            });
        }

        res.status(200).json({
            err: false,
            message: "Receipt updated successfully",
            receipt: updatedReceipt
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// DELETE receipt
exports.deleteReceipt = async (req, res) => {
    try {
        const deletedReceipt = await Receipt.findByIdAndDelete(req.params.id);

        if (!deletedReceipt) {
            return res.status(404).json({
                err: true,
                message: "Receipt not found"
            });
        }

        res.status(200).json({
            err: false,
            message: "Receipt deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};