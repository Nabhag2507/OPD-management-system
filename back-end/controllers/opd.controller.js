const OPD = require("../models/opd.model");

// GET all OPD records
exports.getAllOPD = async (req, res) => {
    try {
        const opdRecords = await OPD.find()
            .populate("patient")
            .populate("doctor")
            .populate("diagnosis");

        res.status(200).json({
            err: false,
            count: opdRecords.length,
            opdRecords,
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error",
        });
    }
};

// GET OPD by ID
exports.getOPDById = async (req, res) => {
    try {
        const opd = await OPD.findById(req.params.id)
            .populate("patient")
            .populate("doctor")
            .populate("diagnosis");

        if (!opd) {
            return res.status(404).json({
                err: true,
                message: "OPD record not found",
            });
        }

        res.status(200).json({
            err: false,
            opd,
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error",
        });
    }
};

// CREATE OPD record
exports.createOPD = async (req, res) => {
    try {
        const { patient, doctor, diagnosis, visitDate } = req.body;

        const newOPD = await OPD.create({
            patient,
            doctor,
            diagnosis,
            visitDate,
        });

        res.status(201).json({
            err: false,
            message: "OPD record created successfully",
            opd: newOPD,
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error",
        });
    }
};

// UPDATE OPD
exports.updateOPD = async (req, res) => {
    try {
        const updatedOPD = await OPD.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedOPD) {
            return res.status(404).json({
                err: true,
                message: "OPD record not found",
            });
        }

        res.status(200).json({
            err: false,
            message: "OPD updated successfully",
            opd: updatedOPD,
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error",
        });
    }
};

// DELETE OPD
exports.deleteOPD = async (req, res) => {
    try {
        const deletedOPD = await OPD.findByIdAndDelete(req.params.id);

        if (!deletedOPD) {
            return res.status(404).json({
                err: true,
                message: "OPD record not found",
            });
        }

        res.status(200).json({
            err: false,
            message: "OPD deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error",
        });
    }
};