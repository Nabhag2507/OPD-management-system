const PatientDashboard = () => {
    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Patient Dashboard</h1>
            <p className="dashboard-subtitle">
                View your appointments, treatments, and receipts.
            </p>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>Upcoming Appointments</h3>
                    <p className="dashboard-value">2</p>
                </div>

                <div className="dashboard-card">
                    <h3>Active Treatments</h3>
                    <p className="dashboard-value">1</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Bills</h3>
                    <p className="dashboard-value">₹12,500</p>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
