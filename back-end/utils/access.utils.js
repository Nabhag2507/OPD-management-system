const Appointment = require("../models/appointment.model");
const Doctor = require("../models/doctors.model");
const OPD = require("../models/opd.model");
const Patient = require("../models/patient.model");
const Receipt = require("../models/receipt.model");

const uniqueIds = (values = []) => [...new Set(values.map((value) => value.toString()))];

const normalizeDoctorName = (name = "") => name.replace(/^dr\.\s*/i, "").trim();

const resolveDoctorForUser = async (user) => {
    if (!user || user.role !== "doctor") {
        return null;
    }

    const baseName = normalizeDoctorName(user.name);
    const nameVariants = uniqueIds(
        [user.name, baseName, `Dr. ${baseName}`].filter(Boolean)
    );

    return Doctor.findOne({
        $or: [
            { doctorEmail: user.email },
            { doctorName: { $in: nameVariants } },
        ],
    });
};

const resolvePatientForUser = async (user) => {
    if (!user || user.role !== "patient") {
        return null;
    }

    return Patient.findOne({
        $or: [
            { patientEmail: user.email },
            { patientName: user.name },
        ],
    });
};

const getDoctorPatientIds = async (doctorId) => {
    const ownedPatientIds = await Patient.distinct("_id", { primaryDoctor: doctorId });
    const appointmentPatientIds = await Appointment.distinct("patient", { doctor: doctorId });
    const opdPatientIds = await OPD.distinct("patient", { doctor: doctorId });
    return uniqueIds([...ownedPatientIds, ...appointmentPatientIds, ...opdPatientIds]);
};

const buildScopedQuery = async (user, resource) => {
    if (!user) {
        return null;
    }

    if (user.role === "doctor") {
        const doctor = await resolveDoctorForUser(user);
        if (!doctor) {
            return { _id: { $in: [] } };
        }

        if (resource === "doctors") {
            return { _id: doctor._id };
        }

        if (resource === "patients") {
            const patientIds = await getDoctorPatientIds(doctor._id);
            return { _id: { $in: patientIds } };
        }

        if (resource === "appointments" || resource === "opds") {
            return { doctor: doctor._id };
        }

        if (resource === "receipts") {
            const patientIds = await getDoctorPatientIds(doctor._id);
            return { patient: { $in: patientIds } };
        }
    }

    if (user.role === "patient") {
        const patient = await resolvePatientForUser(user);
        if (!patient) {
            return { _id: { $in: [] } };
        }

        if (resource === "patients") {
            return { _id: patient._id };
        }

        if (resource === "appointments" || resource === "receipts" || resource === "opds") {
            return { patient: patient._id };
        }
    }

    return null;
};

const getScopedTreatmentsForPatient = async (user) => {
    const patient = await resolvePatientForUser(user);
    if (!patient) {
        return [];
    }

    const patientOpds = await OPD.find({ patient: patient._id })
        .populate("diagnosis")
        .populate("doctor");

    return patientOpds.map((entry) => ({
        id: entry._id,
        name: entry.diagnosis?.diagnosisName || "Consultation",
        cost: 0,
        date: entry.visitDate,
        doctor: entry.doctor?.doctorName || "",
    }));
};

const getScopedReceiptsForPatient = async (user) => {
    const patient = await resolvePatientForUser(user);
    if (!patient) {
        return [];
    }

    return Receipt.find({ patient: patient._id })
        .populate("patient")
        .populate("opd");
};

module.exports = {
    buildScopedQuery,
    getScopedTreatmentsForPatient,
    getScopedReceiptsForPatient,
    resolveDoctorForUser,
    resolvePatientForUser,
};
