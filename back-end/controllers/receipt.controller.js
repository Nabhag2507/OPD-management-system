const Receipt = require("../models/receipt.model");
const OPD = require("../models/opd.model");
const Patient = require("../models/patient.model");
const {
    ensureReferences,
    pickDefined,
    sendError,
    toNumber,
    trimString,
    validateObjectId,
} = require("../utils/controller.utils");

// GET all receipts
exports.getAllReceipts = async (req, res) => {
    try {
        const receipts = await Receipt.find()
            .populate("patient")
            .populate("opd");

        res.status(200).json({
            err: false,
            receipts,
        });
    } catch (err) {
        sendError(res, err);
    }
};

// GET receipt by ID
exports.getReceiptById = async (req, res) => {
    try {
        validateObjectId(req.params.id, "receipt");
        const receipt = await Receipt.findById(req.params.id)
            .populate("patient")
            .populate("opd");

        if (!receipt) {
            return res.status(404).json({
                err: true,
                message: "Receipt not found",
            });
        }

        res.status(200).json({
            err: false,
            receipt,
        });
    } catch (err) {
        sendError(res, err);
    }
};

// CREATE receipt
exports.createReceipt = async (req, res) => {
    try {
        const payload = {
            patient: req.body.patient,
            opd: req.body.opd,
            amount: toNumber(req.body.amount),
            paymentMethod: trimString(req.body.paymentMethod),
            paymentStatus: trimString(req.body.paymentStatus)?.toLowerCase(),
        };

        await ensureReferences([
            { Model: Patient, id: payload.patient, label: "patient" },
            { Model: OPD, id: payload.opd, label: "opd" },
        ]);

        const newReceipt = await Receipt.create(payload);

        res.status(201).json({
            err: false,
            message: "Receipt created successfully",
            receipt: newReceipt,
        });
    } catch (err) {
        sendError(res, err);
    }
};

// UPDATE receipt
exports.updateReceipt = async (req, res) => {
    try {
        validateObjectId(req.params.id, "receipt");

        const updates = pickDefined({
            patient: req.body.patient,
            opd: req.body.opd,
            amount: toNumber(req.body.amount),
            paymentMethod: trimString(req.body.paymentMethod),
            paymentStatus: trimString(req.body.paymentStatus)?.toLowerCase(),
        });

        await ensureReferences([
            { Model: Patient, id: updates.patient, label: "patient" },
            { Model: OPD, id: updates.opd, label: "opd" },
        ]);

        const updatedReceipt = await Receipt.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedReceipt) {
            return res.status(404).json({
                err: true,
                message: "Receipt not found",
            });
        }

        res.status(200).json({
            err: false,
            message: "Receipt updated successfully",
            receipt: updatedReceipt,
        });
    } catch (err) {
        sendError(res, err);
    }
};

// DELETE receipt
exports.deleteReceipt = async (req, res) => {
    try {
        validateObjectId(req.params.id, "receipt");
        const deletedReceipt = await Receipt.findByIdAndDelete(req.params.id);

        if (!deletedReceipt) {
            return res.status(404).json({
                err: true,
                message: "Receipt not found",
            });
        }

        res.status(200).json({
            err: false,
            message: "Receipt deleted successfully",
        });
    } catch (err) {
        sendError(res, err);
    }
};
