const OPD = require("../models/opd.model");
const Diagnosis = require("../models/diagnosis.model");
const Doctor = require("../models/doctors.model");
const Patient = require("../models/patient.model");
const { buildScopedQuery, resolveDoctorForUser } = require("../utils/access.utils");
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
        const scopedQuery = await buildScopedQuery(req.user, "opds");
        const opdRecords = await OPD.find(scopedQuery || {})
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
        const scopedQuery = await buildScopedQuery(req.user, "opds");
        const opd = await OPD.findOne({
            ...(scopedQuery || {}),
            _id: req.params.id,
        })
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
        let doctorId = req.body.doctor;

        if (req.user?.role === "doctor") {
            const doctor = await resolveDoctorForUser(req.user);
            if (!doctor) {
                return res.status(400).json({
                    err: true,
                    message: "Doctor profile not found for logged-in user",
                });
            }
            doctorId = doctor._id;
        }

        const payload = {
            patient: req.body.patient,
            doctor: doctorId,
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

        let doctorId = req.body.doctor;
        if (req.user?.role === "doctor" && doctorId !== undefined) {
            const doctor = await resolveDoctorForUser(req.user);
            if (!doctor) {
                return res.status(400).json({
                    err: true,
                    message: "Doctor profile not found for logged-in user",
                });
            }
            doctorId = doctor._id;
        }

        const updates = pickDefined({
            patient: req.body.patient,
            doctor: doctorId,
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
            { returnDocument: "after", runValidators: true }
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
