const Hospital = require("../models/hospital.model");

// GET all hospitals
exports.getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();

        res.status(200).json({
            err: false,
            hospitals
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// GET hospital by ID
exports.getHospitalById = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);

        if (!hospital) {
            return res.status(404).json({
                err: true,
                message: "Hospital not found"
            });
        }

        res.status(200).json({
            err: false,
            hospital
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// CREATE hospital
exports.createHospital = async (req, res) => {
    try {
        const newHospital = await Hospital.create(req.body);

        res.status(201).json({
            err: false,
            message: "Hospital created successfully",
            hospital: newHospital
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// UPDATE hospital
exports.updateHospital = async (req, res) => {
    try {
        const updatedHospital = await Hospital.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedHospital) {
            return res.status(404).json({
                err: true,
                message: "Hospital not found"
            });
        }

        res.status(200).json({
            err: false,
            message: "Hospital updated successfully",
            hospital: updatedHospital
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// DELETE hospital
exports.deleteHospital = async (req, res) => {
    try {
        const deletedHospital = await Hospital.findByIdAndDelete(req.params.id);

        if (!deletedHospital) {
            return res.status(404).json({
                err: true,
                message: "Hospital not found"
            });
        }

        res.status(200).json({
            err: false,
            message: "Hospital deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};