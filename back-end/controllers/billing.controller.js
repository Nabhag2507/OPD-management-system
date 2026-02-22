const Billing = require("../models/billing.model");

// GET all billing records
exports.getAllBillings = async (req, res) => {
    try {
        const billings = await Billing.find().populate("patient");

        res.status(200).json({
            err: false,
            billings
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// GET billing by ID
exports.getBillingById = async (req, res) => {
    try {
        const billing = await Billing.findById(req.params.id).populate("patient");

        if (!billing) {
            return res.status(404).json({
                err: true,
                message: "Billing record not found"
            });
        }

        res.status(200).json({
            err: false,
            billing
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// CREATE billing
exports.createBilling = async (req, res) => {
    try {
        const newBilling = await Billing.create(req.body);

        res.status(201).json({
            err: false,
            message: "Billing record created successfully",
            billing: newBilling
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// UPDATE billing
exports.updateBilling = async (req, res) => {
    try {
        const updatedBilling = await Billing.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedBilling) {
            return res.status(404).json({
                err: true,
                message: "Billing record not found"
            });
        }

        res.status(200).json({
            err: false,
            message: "Billing updated successfully",
            billing: updatedBilling
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// DELETE billing
exports.deleteBilling = async (req, res) => {
    try {
        const deletedBilling = await Billing.findByIdAndDelete(req.params.id);

        if (!deletedBilling) {
            return res.status(404).json({
                err: true,
                message: "Billing record not found"
            });
        }

        res.status(200).json({
            err: false,
            message: "Billing deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};