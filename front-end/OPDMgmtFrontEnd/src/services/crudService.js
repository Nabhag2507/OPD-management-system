import { apiRequest } from "./api";

const pickId = (value) => {
    if (!value) return "";
    if (typeof value === "object") return value._id || value.id || "";
    return value;
};

const formatDate = (value) => {
    if (!value) return "";
    return new Date(value).toISOString().slice(0, 10);
};

const createResource = ({
    path,
    listKey,
    itemKey,
    serialize = (payload) => payload,
    deserialize = (item) => item,
}) => ({
    getAll: async () => {
        const response = await apiRequest(path);
        return {
            success: !response.err,
            data: (response[listKey] || []).map(deserialize),
            message: response.message,
        };
    },

    getById: async (id) => {
        const response = await apiRequest(`${path}/${id}`);
        return {
            success: !response.err,
            data: response[itemKey] ? deserialize(response[itemKey]) : null,
            message: response.message,
        };
    },

    create: async (payload) => {
        const response = await apiRequest(path, {
            method: "POST",
            body: JSON.stringify(serialize(payload)),
        });

        return {
            success: !response.err,
            data: response[itemKey] ? deserialize(response[itemKey]) : null,
            message: response.message,
        };
    },

    update: async (id, payload) => {
        const response = await apiRequest(`${path}/${id}`, {
            method: "PUT",
            body: JSON.stringify(serialize(payload)),
        });

        return {
            success: !response.err,
            data: response[itemKey] ? deserialize(response[itemKey]) : null,
            message: response.message,
        };
    },

    delete: async (id) => {
        const response = await apiRequest(`${path}/${id}`, {
            method: "DELETE",
        });

        return {
            success: !response.err,
            message: response.message,
        };
    },
});

const hospitals = createResource({
    path: "/hospitals",
    listKey: "hospitals",
    itemKey: "hospital",
    serialize: (payload) => ({
        hospitalName: payload.name,
        location: payload.location,
        beds: Number(payload.beds),
    }),
    deserialize: (item) => ({
        id: item._id,
        name: item.hospitalName,
        location: item.location,
        beds: item.beds,
    }),
});

const doctors = createResource({
    path: "/doctors",
    listKey: "doctors",
    itemKey: "doctor",
    serialize: (payload) => ({
        doctorName: payload.name,
        doctorEmail: payload.email,
        specialization: payload.specialization,
        hospital: payload.hospital_id,
        experience: Number(payload.experience),
    }),
    deserialize: (item) => ({
        id: item._id,
        name: item.doctorName,
        email: item.doctorEmail || "",
        specialization: item.specialization,
        hospital_id: pickId(item.hospital),
        experience: item.experience,
    }),
});

const diagnosisTypes = createResource({
    path: "/diagnosis",
    listKey: "diagnoses",
    itemKey: "diagnosis",
    serialize: (payload) => ({
        diagnosisName: payload.name,
        code: payload.code,
    }),
    deserialize: (item) => ({
        id: item._id,
        name: item.diagnosisName,
        code: item.code,
    }),
});

const treatmentTypes = createResource({
    path: "/treatments",
    listKey: "treatments",
    itemKey: "treatment",
    serialize: (payload) => ({
        treatmentName: payload.name,
        treatmentCost: Number(payload.cost),
    }),
    deserialize: (item) => ({
        id: item._id,
        name: item.treatmentName,
        cost: item.treatmentCost,
    }),
});

const patients = createResource({
    path: "/patients",
    listKey: "patients",
    itemKey: "patient",
    serialize: (payload) => ({
        patientName: payload.name,
        patientEmail: payload.email,
        patientPhone: payload.phone,
        patientAge: Number(payload.age),
    }),
    deserialize: (item) => ({
        id: item._id,
        name: item.patientName,
        email: item.patientEmail,
        phone: item.patientPhone,
        age: item.patientAge,
    }),
});

const opds = createResource({
    path: "/opd",
    listKey: "opdRecords",
    itemKey: "opd",
    serialize: (payload) => ({
        patient: payload.patient_id,
        doctor: payload.doctor_id,
        diagnosis: payload.diagnosis_id,
        visitDate: payload.date,
    }),
    deserialize: (item) => ({
        id: item._id,
        patient_id: pickId(item.patient),
        doctor_id: pickId(item.doctor),
        diagnosis_id: pickId(item.diagnosis),
        date: formatDate(item.visitDate),
    }),
});

const receipts = createResource({
    path: "/receipts",
    listKey: "receipts",
    itemKey: "receipt",
    serialize: (payload) => ({
        patient: payload.patient_id,
        opd: payload.opd_id,
        amount: Number(payload.amount),
        paymentMethod: payload.paymentMethod,
        paymentStatus: (payload.status || payload.paymentStatus || "pending").toLowerCase(),
    }),
    deserialize: (item) => ({
        id: item._id,
        patient_id: pickId(item.patient),
        opd_id: pickId(item.opd),
        amount: item.amount,
        paymentMethod: item.paymentMethod || "",
        status: item.paymentStatus || "pending",
    }),
});

const appointments = createResource({
    path: "/appointments",
    listKey: "appointments",
    itemKey: "appointment",
    serialize: (payload) => ({
        patient: payload.patient_id,
        doctor: payload.doctor_id,
        appointmentDate: payload.date,
        status: (payload.status || "pending").toLowerCase(),
    }),
    deserialize: (item) => ({
        id: item._id,
        patient_id: pickId(item.patient),
        doctor_id: pickId(item.doctor),
        date: formatDate(item.appointmentDate),
        status: item.status,
    }),
});

export const crudService = {
    hospitals,
    doctors,
    diagnosisTypes,
    treatmentTypes,
    subTreatmentTypes: treatmentTypes,
    patients,
    opds,
    receipts,
    appointments,
};

export default crudService;
