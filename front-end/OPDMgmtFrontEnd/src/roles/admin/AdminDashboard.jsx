const AdminDashboard = () => {
    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <p className="dashboard-subtitle">
                Overview of hospital operations and system configuration.
            </p>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>Total Hospitals</h3>
                    <p className="dashboard-value">3</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Doctors</h3>
                    <p className="dashboard-value">24</p>
                </div>

                <div className="dashboard-card">
                    <h3>Active Patients</h3>
                    <p className="dashboard-value">1,248</p>
                </div>

                <div className="dashboard-card">
                    <h3>System Status</h3>
                    <p className="dashboard-value success">Operational</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
