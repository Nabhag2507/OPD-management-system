const Doctor = require("../models/doctor.model");

// GET all doctors
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().populate("hospital");

        res.status(200).json({
            err: false,
            doctors
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// GET doctor by ID
exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate("hospital");

        if (!doctor) {
            return res.status(404).json({
                err: true,
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            err: false,
            doctor
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// CREATE doctor
exports.createDoctor = async (req, res) => {
    try {
        const newDoctor = await Doctor.create(req.body);

        res.status(201).json({
            err: false,
            message: "Doctor created successfully",
            doctor: newDoctor
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// UPDATE doctor
exports.updateDoctor = async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({
                err: true,
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            err: false,
            message: "Doctor updated successfully",
            doctor: updatedDoctor
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// DELETE doctor
exports.deleteDoctor = async (req, res) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);

        if (!deletedDoctor) {
            return res.status(404).json({
                err: true,
                message: "Doctor not found"
            });
        }

        res.status(200).json({
            err: false,
            message: "Doctor deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};