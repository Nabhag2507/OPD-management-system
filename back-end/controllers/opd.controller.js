const OPD = require("../models/opd.model");
const Diagnosis = require("../models/diagnosis.model");
const Doctor = require("../models/doctors.model");
const Patient = require("../models/patient.model");
const {
    ensureReferences,
    pickDefined,
    sendError,
    toDate,
    validateObjectId,
} = require("../utils/controller.utils");

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
        sendError(res, err);
    }
};

// GET OPD by ID
exports.getOPDById = async (req, res) => {
    try {
        validateObjectId(req.params.id, "opd");
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
        sendError(res, err);
    }
};

// CREATE OPD record
exports.createOPD = async (req, res) => {
    try {
        const payload = {
            patient: req.body.patient,
            doctor: req.body.doctor,
            diagnosis: req.body.diagnosis,
            visitDate: toDate(req.body.visitDate),
        };

        await ensureReferences([
            { Model: Patient, id: payload.patient, label: "patient" },
            { Model: Doctor, id: payload.doctor, label: "doctor" },
            { Model: Diagnosis, id: payload.diagnosis, label: "diagnosis" },
        ]);

        const newOPD = await OPD.create(payload);

        res.status(201).json({
            err: false,
            message: "OPD record created successfully",
            opd: newOPD,
        });
    } catch (err) {
        sendError(res, err);
    }
};

// UPDATE OPD
exports.updateOPD = async (req, res) => {
    try {
        validateObjectId(req.params.id, "opd");

        const updates = pickDefined({
            patient: req.body.patient,
            doctor: req.body.doctor,
            diagnosis: req.body.diagnosis,
            visitDate: toDate(req.body.visitDate),
        });

        await ensureReferences([
            { Model: Patient, id: updates.patient, label: "patient" },
            { Model: Doctor, id: updates.doctor, label: "doctor" },
            { Model: Diagnosis, id: updates.diagnosis, label: "diagnosis" },
        ]);

        const updatedOPD = await OPD.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
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
        sendError(res, err);
    }
};

// DELETE OPD
exports.deleteOPD = async (req, res) => {
    try {
        validateObjectId(req.params.id, "opd");
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
        sendError(res, err);
    }
};
