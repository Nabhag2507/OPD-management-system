const Appointment = require("../models/appointment.model");
const Doctor = require("../models/doctors.model");
const Patient = require("../models/patient.model");
const { buildScopedQuery } = require("../utils/access.utils");
const {
    ensureReferences,
    pickDefined,
    sendError,
    toDate,
    trimString,
    validateObjectId,
} = require("../utils/controller.utils");

// GET all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const scopedQuery = await buildScopedQuery(req.user, "appointments");
        const appointments = await Appointment.find(scopedQuery || {})
            .populate("patient")
            .populate("doctor");

        res.status(200).json({
            err: false,
            appointments
        });
    } catch (err) {
        sendError(res, err);
    }
};

// GET appointment by ID
exports.getAppointmentById = async (req, res) => {
    try {
        validateObjectId(req.params.id, "appointment");
        const scopedQuery = await buildScopedQuery(req.user, "appointments");
        const appointment = await Appointment.findOne({
            ...(scopedQuery || {}),
            _id: req.params.id,
        })
            .populate("patient")
            .populate("doctor");

        if (!appointment) {
            return res.status(404).json({
                err: true,
                message: "Appointment not found"
            });
        }

        res.status(200).json({
            err: false,
            appointment
        });
    } catch (err) {
        sendError(res, err);
    }
};

// CREATE appointment
exports.createAppointment = async (req, res) => {
    try {
        const payload = {
            patient: req.body.patient,
            doctor: req.body.doctor,
            appointmentDate: toDate(req.body.appointmentDate),
            status: trimString(req.body.status)?.toLowerCase(),
        };

        await ensureReferences([
            { Model: Patient, id: payload.patient, label: "patient" },
            { Model: Doctor, id: payload.doctor, label: "doctor" },
        ]);

        const newAppointment = await Appointment.create(payload);

        res.status(201).json({
            err: false,
            message: "Appointment created successfully",
            appointment: newAppointment
        });
    } catch (err) {
        sendError(res, err);
    }
};

// UPDATE appointment
exports.updateAppointment = async (req, res) => {
    try {
        validateObjectId(req.params.id, "appointment");

        const updates = pickDefined({
            patient: req.body.patient,
            doctor: req.body.doctor,
            appointmentDate: toDate(req.body.appointmentDate),
            status: trimString(req.body.status)?.toLowerCase(),
        });

        await ensureReferences([
            { Model: Patient, id: updates.patient, label: "patient" },
            { Model: Doctor, id: updates.doctor, label: "doctor" },
        ]);

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { returnDocument: "after", runValidators: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({
                err: true,
                message: "Appointment not found"
            });
        }

        res.status(200).json({
            err: false,
            message: "Appointment updated successfully",
            appointment: updatedAppointment
        });
    } catch (err) {
        sendError(res, err);
    }
};

// DELETE appointment
exports.deleteAppointment = async (req, res) => {
    try {
        validateObjectId(req.params.id, "appointment");
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);

        if (!deletedAppointment) {
            return res.status(404).json({
                err: true,
                message: "Appointment not found"
            });
        }

        res.status(200).json({
            err: false,
            message: "Appointment deleted successfully"
        });
    } catch (err) {
        sendError(res, err);
    }
};
