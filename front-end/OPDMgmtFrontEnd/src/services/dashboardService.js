export const getAdminDashboard = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                totalHospitals: 3,
                totalDoctors: 24,
                activePatients: 1248,
                systemStatus: "Operational"
            });
        }, 300);
    });
};

export const getDoctorDashboard = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                todayOpd: 8,
                totalPatients: 45,
                pendingReports: 3
            });
        }, 300);
    });
};

export const getReceptionistDashboard = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                registeredToday: 42,
                opdEntries: 36,
                pendingBills: 7
            });
        }, 300);
    });
};

export const getPatientDashboard = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                upcomingAppointments: 2,
                activeTreatments: 1,
                totalBills: 12500
            });
        }, 300);
    });
};
