const Appointment = require("../models/appointment.model");

// GET all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("patient")
            .populate("doctor");

        res.status(200).json({
            err: false,
            appointments
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// GET appointment by ID
exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
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
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// CREATE appointment
exports.createAppointment = async (req, res) => {
    try {
        const newAppointment = await Appointment.create(req.body);

        res.status(201).json({
            err: false,
            message: "Appointment created successfully",
            appointment: newAppointment
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// UPDATE appointment
exports.updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
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
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};

// DELETE appointment
exports.deleteAppointment = async (req, res) => {
    try {
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
        res.status(500).json({
            err: true,
            message: "Internal server error"
        });
    }
};