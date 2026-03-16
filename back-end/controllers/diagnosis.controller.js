const Diagnosis = require("../models/diagnosis.model");
const {
    pickDefined,
    sendError,
    trimString,
    validateObjectId,
} = require("../utils/controller.utils");

// GET all diagnoses
exports.getAllDiagnoses = async (req, res) => {
    try {
        const diagnoses = await Diagnosis.find();

        res.status(200).json({
            err: false,
            diagnoses
        });
    } catch (err) {
        sendError(res, err);
    }
};

// GET diagnosis by ID
exports.getDiagnosisById = async (req, res) => {
    try {
        validateObjectId(req.params.id, "diagnosis");
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
        sendError(res, err);
    }
};

// CREATE diagnosis
exports.createDiagnosis = async (req, res) => {
    try {
        const newDiagnosis = await Diagnosis.create({
            diagnosisName: trimString(req.body.diagnosisName),
            code: trimString(req.body.code),
        });

        res.status(201).json({
            err: false,
            message: "Diagnosis created successfully",
            diagnosis: newDiagnosis
        });
    } catch (err) {
        sendError(res, err);
    }
};

// UPDATE diagnosis
exports.updateDiagnosis = async (req, res) => {
    try {
        validateObjectId(req.params.id, "diagnosis");
        const updatedDiagnosis = await Diagnosis.findByIdAndUpdate(
            req.params.id,
            {
                $set: pickDefined({
                    diagnosisName: trimString(req.body.diagnosisName),
                    code: trimString(req.body.code),
                }),
            },
            { new: true, runValidators: true }
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
        sendError(res, err);
    }
};

// DELETE diagnosis
exports.deleteDiagnosis = async (req, res) => {
    try {
        validateObjectId(req.params.id, "diagnosis");
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
        sendError(res, err);
    }
};
