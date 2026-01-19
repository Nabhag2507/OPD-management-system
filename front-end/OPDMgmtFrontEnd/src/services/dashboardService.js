export const getAdminDashboard = async () => {
    const res = await fetch(process.env.adminDashboardURL)
    return res.json();
};

export const getDoctorDashboard = async () => {
    const res = await fetch(process.env.doctorDashboardURL);
    return res.json();
};

export const getReceptionistDashboard = async () => {
    return {
        registeredToday: 42,
        opdEntries: 36,
        pendingBills: 7
    };
};

export const getPatientDashboard = async () => {
    return {
        upcomingAppointments: 2,
        activeTreatments: 1,
        totalBills: 12500
    };
};
