const Treatment = require("../models/treatment.model");
const { getScopedTreatmentsForPatient } = require("../utils/access.utils");
const {
    pickDefined,
    sendError,
    toNumber,
    trimString,
    validateObjectId,
} = require("../utils/controller.utils");

// GET all treatments
exports.getAllTreatments = async (req, res) => {
    try {
        if (req.user?.role === "patient") {
            const treatments = await getScopedTreatmentsForPatient(req.user);

            return res.status(200).json({
                err: false,
                treatments,
            });
        }

        const treatments = await Treatment.find();

        res.status(200).json({
            err: false,
            treatments
        });
    } catch (err) {
        sendError(res, err);
    }
};

// GET treatment by ID
exports.getTreatmentById = async (req, res) => {
    try {
        validateObjectId(req.params.id, "treatment");
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
        sendError(res, err);
    }
};

// CREATE treatment
exports.createTreatment = async (req, res) => {
    try {
        const newTreatment = await Treatment.create({
            treatmentName: trimString(req.body.treatmentName),
            treatmentCost: toNumber(req.body.treatmentCost),
        });

        res.status(201).json({
            err: false,
            message: "Treatment created successfully",
            treatment: newTreatment
        });
    } catch (err) {
        sendError(res, err);
    }
};

// UPDATE treatment
exports.updateTreatment = async (req, res) => {
    try {
        validateObjectId(req.params.id, "treatment");
        const updatedTreatment = await Treatment.findByIdAndUpdate(
            req.params.id,
            {
                $set: pickDefined({
                    treatmentName: trimString(req.body.treatmentName),
                    treatmentCost: toNumber(req.body.treatmentCost),
                }),
            },
            { returnDocument: "after", runValidators: true }
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
        sendError(res, err);
    }
};

// DELETE treatment
exports.deleteTreatment = async (req, res) => {
    try {
        validateObjectId(req.params.id, "treatment");
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
        sendError(res, err);
    }
};
