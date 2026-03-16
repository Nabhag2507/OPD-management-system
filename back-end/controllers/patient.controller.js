const Patient = require("../models/patient.model");
const {
    pickDefined,
    sendError,
    toNumber,
    trimString,
    validateObjectId,
} = require("../utils/controller.utils");

// GET all patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json({ err: false, patients });
    } catch (err) {
        sendError(res, err);
    }
};

// GET patient by ID
exports.getPatientById = async (req, res) => {
    try {
        validateObjectId(req.params.id, "patient");
        const patientById = await Patient.findById(req.params.id);

        if (!patientById) {
            return res.status(404).json({ err: true, message: "Patient not found" });
        }

        res.status(200).json({ err: false, patient: patientById });
    } catch (err) {
        sendError(res, err);
    }
};

// CREATE patient
exports.createPatient = async (req, res) => {
    try {
        const newPatient = await Patient.create({
            patientName: trimString(req.body.patientName),
            patientEmail: trimString(req.body.patientEmail)?.toLowerCase(),
            patientPhone: toNumber(req.body.patientPhone),
            patientAge: toNumber(req.body.patientAge),
        });

        res.status(201).json({
            err: false,
            message: "Patient added successfully",
            patient: newPatient,
        });
    } catch (err) {
        sendError(res, err);
    }
};

// UPDATE patient
exports.updatePatient = async (req, res) => {
    try {
        validateObjectId(req.params.id, "patient");

        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            {
                $set: pickDefined({
                    patientName: trimString(req.body.patientName),
                    patientEmail: trimString(req.body.patientEmail)?.toLowerCase(),
                    patientPhone: toNumber(req.body.patientPhone),
                    patientAge: toNumber(req.body.patientAge),
                }),
            },
            { new: true, runValidators: true }
        );

        if (!updatedPatient) {
            return res.status(404).json({ err: true, message: "Patient not found" });
        }

        res.status(200).json({
            err: false,
            message: "Patient updated successfully",
            patient: updatedPatient,
        });
    } catch (err) {
        sendError(res, err);
    }
};

// DELETE patient
exports.deletePatient = async (req, res) => {
    try {
        validateObjectId(req.params.id, "patient");
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

        if (!deletedPatient) {
            return res.status(404).json({ err: true, message: "Patient not found" });
        }

        res.status(200).json({
            err: false,
            message: "Patient deleted successfully",
        });
    } catch (err) {
        sendError(res, err);
    }
};
