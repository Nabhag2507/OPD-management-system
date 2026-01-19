import { useEffect, useState } from "react";
import { getDoctorDashboard } from "../../services/dashboardService";

const DoctorDashboard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getDoctorDashboard().then(setData);
    }, []);

    if (!data) return null;

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Doctor Dashboard</h1>
            <p className="dashboard-subtitle">
                Manage your patients and OPD visits.
            </p>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>Today’s OPD</h3>
                    <p className="dashboard-value">{data.todayOpd}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Patients</h3>
                    <p className="dashboard-value">{data.totalPatients}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Pending Reports</h3>
                    <p className="dashboard-value warning">{data.pendingReports}</p>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
