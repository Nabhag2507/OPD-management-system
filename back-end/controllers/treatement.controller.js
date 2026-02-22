const Treatment = require("../models/treatment.model");

// GET all treatments
exports.getAllTreatments = async (req, res) => {
    try {
        const treatments = await Treatment.find();

        res.status(200).json({
            err: false,
            treatments
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// GET treatment by ID
exports.getTreatmentById = async (req, res) => {
    try {
        const treatment = await Treatment.findById(req.params.id);

        if (!treatment) {
            return res.status(404).json({
                err: true,
                message: "Treatment not found"
            });
        }

        res.status(200).json({
            err: false,
            treatment
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// CREATE treatment
exports.createTreatment = async (req, res) => {
    try {
        const newTreatment = await Treatment.create(req.body);

        res.status(201).json({
            err: false,
            message: "Treatment created successfully",
            treatment: newTreatment
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// UPDATE treatment
exports.updateTreatment = async (req, res) => {
    try {
        const updatedTreatment = await Treatment.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedTreatment) {
            return res.status(404).json({
                err: true,
                message: "Treatment not found"
            });
        }

        res.status(200).json({
            err: false,
            message: "Treatment updated successfully",
            treatment: updatedTreatment
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// DELETE treatment
exports.deleteTreatment = async (req, res) => {
    try {
        const deletedTreatment = await Treatment.findByIdAndDelete(req.params.id);

        if (!deletedTreatment) {
            return res.status(404).json({
                err: true,
                message: "Treatment not found"
            });
        }

        res.status(200).json({
            err: false,
            message: "Treatment deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};