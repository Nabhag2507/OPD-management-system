const Hospital = require("../models/hospitals.model");
const {
    pickDefined,
    sendError,
    toNumber,
    trimString,
    validateObjectId,
} = require("../utils/controller.utils");

// GET all hospitals
exports.getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();

        res.status(200).json({
            err: false,
            hospitals
        });
    } catch (err) {
        sendError(res, err);
    }
};

// GET hospital by ID
exports.getHospitalById = async (req, res) => {
    try {
        validateObjectId(req.params.id, "hospital");
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
        sendError(res, err);
    }
};

// CREATE hospital
exports.createHospital = async (req, res) => {
    try {
        const newHospital = await Hospital.create({
            hospitalName: trimString(req.body.hospitalName),
            location: trimString(req.body.location),
            beds: toNumber(req.body.beds),
        });

        res.status(201).json({
            err: false,
            message: "Hospital created successfully",
            hospital: newHospital
        });
    } catch (err) {
        sendError(res, err);
    }
};

// UPDATE hospital
exports.updateHospital = async (req, res) => {
    try {
        validateObjectId(req.params.id, "hospital");
        const updatedHospital = await Hospital.findByIdAndUpdate(
            req.params.id,
            {
                $set: pickDefined({
                    hospitalName: trimString(req.body.hospitalName),
                    location: trimString(req.body.location),
                    beds: toNumber(req.body.beds),
                }),
            },
            { new: true, runValidators: true }
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
        sendError(res, err);
    }
};

// DELETE hospital
exports.deleteHospital = async (req, res) => {
    try {
        validateObjectId(req.params.id, "hospital");
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
        sendError(res, err);
    }
};
