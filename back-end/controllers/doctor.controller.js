const Doctor = require("../models/doctors.model");
const Hospital = require("../models/hospitals.model");
const { buildScopedQuery } = require("../utils/access.utils");
const {
    ensureReferences,
    pickDefined,
    sendError,
    toNumber,
    trimString,
    validateObjectId,
} = require("../utils/controller.utils");

// GET all doctors
exports.getAllDoctors = async (req, res) => {
    try {
        const scopedQuery = await buildScopedQuery(req.user, "doctors");
        const doctors = await Doctor.find(scopedQuery || {}).populate("hospital");

        res.status(200).json({
            err: false,
            doctors
        });
    } catch (err) {
        sendError(res, err);
    }
};

// GET doctor by ID
exports.getDoctorById = async (req, res) => {
    try {
        validateObjectId(req.params.id, "doctor");
        const scopedQuery = await buildScopedQuery(req.user, "doctors");
        const doctor = await Doctor.findOne({
            ...(scopedQuery || {}),
            _id: req.params.id,
        }).populate("hospital");

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
        sendError(res, err);
    }
};

// CREATE doctor
exports.createDoctor = async (req, res) => {
    try {
        const payload = {
            doctorName: trimString(req.body.doctorName),
            doctorEmail: trimString(req.body.doctorEmail)?.toLowerCase(),
            specialization: trimString(req.body.specialization),
            hospital: req.body.hospital,
            experience: toNumber(req.body.experience),
        };

        await ensureReferences([
            { Model: Hospital, id: payload.hospital, label: "hospital" },
        ]);

        const newDoctor = await Doctor.create(payload);

        res.status(201).json({
            err: false,
            message: "Doctor created successfully",
            doctor: newDoctor
        });
    } catch (err) {
        sendError(res, err);
    }
};

// UPDATE doctor
exports.updateDoctor = async (req, res) => {
    try {
        validateObjectId(req.params.id, "doctor");

        const updates = pickDefined({
            doctorName: trimString(req.body.doctorName),
            doctorEmail: trimString(req.body.doctorEmail)?.toLowerCase(),
            specialization: trimString(req.body.specialization),
            hospital: req.body.hospital,
            experience: toNumber(req.body.experience),
        });

        await ensureReferences([
            { Model: Hospital, id: updates.hospital, label: "hospital" },
        ]);

        const updatedDoctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { returnDocument: "after", runValidators: true }
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
        sendError(res, err);
    }
};

// DELETE doctor
exports.deleteDoctor = async (req, res) => {
    try {
        validateObjectId(req.params.id, "doctor");
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
        sendError(res, err);
    }
};
