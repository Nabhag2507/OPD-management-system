const Patient = require("../models/patient.model");
const Doctor = require("../models/doctors.model");
const { buildScopedQuery, resolveDoctorForUser } = require("../utils/access.utils");
const {
    ensureReferences,
    pickDefined,
    sendError,
    toNumber,
    trimString,
    validateObjectId,
} = require("../utils/controller.utils");

// GET all patients
exports.getAllPatients = async (req, res) => {
    try {
        const scopedQuery = await buildScopedQuery(req.user, "patients");
        const patients = await Patient.find(scopedQuery || {});
        res.status(200).json({ err: false, patients });
    } catch (err) {
        sendError(res, err);
    }
};

// GET patient by ID
exports.getPatientById = async (req, res) => {
    try {
        validateObjectId(req.params.id, "patient");
        const scopedQuery = await buildScopedQuery(req.user, "patients");
        const patientById = await Patient.findOne({
            ...(scopedQuery || {}),
            _id: req.params.id,
        });

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
        let primaryDoctor;
        if (req.user?.role === "doctor") {
            const doctor = await resolveDoctorForUser(req.user);
            if (!doctor) {
                return res.status(400).json({
                    err: true,
                    message: "Doctor profile not found for logged-in user",
                });
            }
            primaryDoctor = doctor._id;
        } else if (req.body.primaryDoctor) {
            primaryDoctor = req.body.primaryDoctor;
        }

        await ensureReferences([
            { Model: Doctor, id: primaryDoctor, label: "doctor" },
        ]);

        const newPatient = await Patient.create({
            patientName: trimString(req.body.patientName),
            patientEmail: trimString(req.body.patientEmail)?.toLowerCase(),
            patientPhone: toNumber(req.body.patientPhone),
            patientAge: toNumber(req.body.patientAge),
            primaryDoctor,
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

        const updates = pickDefined({
            patientName: trimString(req.body.patientName),
            patientEmail: trimString(req.body.patientEmail)?.toLowerCase(),
            patientPhone: toNumber(req.body.patientPhone),
            patientAge: toNumber(req.body.patientAge),
            primaryDoctor: req.user?.role === "doctor" ? undefined : req.body.primaryDoctor,
        });

        await ensureReferences([
            { Model: Doctor, id: updates.primaryDoctor, label: "doctor" },
        ]);

        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { returnDocument: "after", runValidators: true }
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
