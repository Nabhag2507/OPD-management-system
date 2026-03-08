const Diagnosis = require("../models/diagnosis.model");

// GET all diagnoses
exports.getAllDiagnoses = async (req, res) => {
    try {
        const diagnoses = await Diagnosis.find();

        res.status(200).json({
            err: false,
            diagnoses
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// GET diagnosis by ID
exports.getDiagnosisById = async (req, res) => {
    try {
        const diagnosis = await Diagnosis.findById(req.params.id);

        if (!diagnosis) {
            return res.status(404).json({
                err: true,
                message: "Diagnosis not found"
            });
        }

        res.status(200).json({
            err: false,
            diagnosis
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// CREATE diagnosis
exports.createDiagnosis = async (req, res) => {
    try {
        const newDiagnosis = await Diagnosis.create(req.body);

        res.status(201).json({
            err: false,
            message: "Diagnosis created successfully",
            diagnosis: newDiagnosis
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// UPDATE diagnosis
exports.updateDiagnosis = async (req, res) => {
    try {
        const updatedDiagnosis = await Diagnosis.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedDiagnosis) {
            return res.status(404).json({
                err: true,
                message: "Diagnosis not found"
            });
        }

        res.status(200).json({
            err: false,
            message: "Diagnosis updated successfully",
            diagnosis: updatedDiagnosis
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// DELETE diagnosis
exports.deleteDiagnosis = async (req, res) => {
    try {
        const deletedDiagnosis = await Diagnosis.findByIdAndDelete(req.params.id);

        if (!deletedDiagnosis) {
            return res.status(404).json({
                err: true,
                message: "Diagnosis not found"
            });
        }

        res.status(200).json({
            err: false,
            message: "Diagnosis deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};