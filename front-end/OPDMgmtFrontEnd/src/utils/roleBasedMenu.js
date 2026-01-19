export const roleBasedMenu = {
    ADMIN: [
        { label: "Dashboard", path: "/admin" },
        { label: "Hospitals", path: "/admin/hospitals" },
        { label: "Doctors", path: "/admin/doctors" },
        { label: "Diagnosis Types", path: "/admin/diagnosis-types" },
        { label: "Treatment Types", path: "/admin/treatment-types" }
    ],

    DOCTOR: [
        { label: "Dashboard", path: "/doctor" },
        { label: "My Patients", path: "/doctor/patients" },
        { label: "OPD Entry", path: "/doctor/opd" }
    ],

    RECEPTIONIST: [
        { label: "Dashboard", path: "/receptionist" },
        { label: "Patient Registration", path: "/receptionist/patients" },
        { label: "OPD Entry", path: "/receptionist/opd" },
        { label: "Billing", path: "/receptionist/billing" }
    ],

    PATIENT: [
        { label: "Dashboard", path: "/patient" },
        { label: "My Appointments", path: "/patient/appointments" },
        { label: "My Treatments", path: "/patient/treatments" },
        { label: "My Receipts", path: "/patient/receipts" }
    ]
};
