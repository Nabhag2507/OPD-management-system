const patient = require("../models/patient.model");

// GET all patients
exports.getAllPatients = async (req, res) => {
    try {
        const patients = await patient.find();
        res.status(200).json({ err: false, patients });
    } catch (err) {
        res.status(500).json({ err: true, message: "Internal server error" });
    }
};

// GET patient by ID
exports.getPatientById = async (req, res) => {
    try {
        const patientById = await patient.findById(req.params.id);

        if (!patientById) {
            return res.status(404).json({ err: true, message: "Patient not found" });
        }

        res.status(200).json({ err: false, patient: patientById });
    } catch (err) {
        res.status(500).json({ err: true, message: "Internal server error" });
    }
};

// CREATE patient
exports.createPatient = async (req, res) => {
    try {
        const { patientName, patientEmail, patientPhone, patientAge } = req.body;

        const newPatient = await patient.create({
            patientName,
            patientEmail,
            patientPhone,
            patientAge,
        });

        res.status(201).json({
            err: false,
            message: "Patient added successfully",
            patient: newPatient,
        });
    } catch (err) {
        res.status(500).json({ err: true, message: "Internal server error" });
    }
};

// UPDATE patient
exports.updatePatient = async (req, res) => {
    try {
        const updatedPatient = await patient.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
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
        res.status(500).json({ err: true, message: "Internal server error" });
    }
};

// DELETE patient
exports.deletePatient = async (req, res) => {
    try {
        const deletedPatient = await patient.findByIdAndDelete(req.params.id);

        if (!deletedPatient) {
            return res.status(404).json({ err: true, message: "Patient not found" });
        }

        res.status(200).json({
            err: false,
            message: "Patient deleted successfully",
        });
    } catch (err) {
        res.status(500).json({ err: true, message: "Internal server error" });
    }
};