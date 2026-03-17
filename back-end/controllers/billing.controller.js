const Billing = require("../models/billing.model");
const Patient = require("../models/patient.model");
const {
    ensureReferences,
    pickDefined,
    sendError,
    toDate,
    toNumber,
    trimString,
    validateObjectId,
} = require("../utils/controller.utils");

// GET all billing records
exports.getAllBillings = async (req, res) => {
    try {
        const billings = await Billing.find().populate("patient");

        res.status(200).json({
            err: false,
            billings,
        });
    } catch (err) {
        sendError(res, err);
    }
};

// GET billing by ID
exports.getBillingById = async (req, res) => {
    try {
        validateObjectId(req.params.id, "billing");
        const billing = await Billing.findById(req.params.id).populate("patient");

        if (!billing) {
            return res.status(404).json({
                err: true,
                message: "Billing record not found",
            });
        }

        res.status(200).json({
            err: false,
            billing,
        });
    } catch (err) {
        sendError(res, err);
    }
};

// CREATE billing
exports.createBilling = async (req, res) => {
    try {
        const payload = {
            patient: req.body.patient,
            amount: toNumber(req.body.amount),
            date: toDate(req.body.date),
            status: trimString(req.body.status)?.toLowerCase(),
        };

        await ensureReferences([
            { Model: Patient, id: payload.patient, label: "patient" },
        ]);

        const newBilling = await Billing.create(payload);

        res.status(201).json({
            err: false,
            message: "Billing record created successfully",
            billing: newBilling,
        });
    } catch (err) {
        sendError(res, err);
    }
};

// UPDATE billing
exports.updateBilling = async (req, res) => {
    try {
        validateObjectId(req.params.id, "billing");

        const updates = pickDefined({
            patient: req.body.patient,
            amount: toNumber(req.body.amount),
            date: toDate(req.body.date),
            status: trimString(req.body.status)?.toLowerCase(),
        });

        await ensureReferences([
            { Model: Patient, id: updates.patient, label: "patient" },
        ]);

        const updatedBilling = await Billing.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { returnDocument: "after", runValidators: true }
        );

        if (!updatedBilling) {
            return res.status(404).json({
                err: true,
                message: "Billing record not found",
            });
        }

        res.status(200).json({
            err: false,
            message: "Billing updated successfully",
            billing: updatedBilling,
        });
    } catch (err) {
        sendError(res, err);
    }
};

// DELETE billing
exports.deleteBilling = async (req, res) => {
    try {
        validateObjectId(req.params.id, "billing");
        const deletedBilling = await Billing.findByIdAndDelete(req.params.id);

        if (!deletedBilling) {
            return res.status(404).json({
                err: true,
                message: "Billing record not found",
            });
        }

        res.status(200).json({
            err: false,
            message: "Billing deleted successfully",
        });
    } catch (err) {
        sendError(res, err);
    }
};
