const ReceptionistDashboard = () => {
    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Reception Dashboard</h1>
            <p className="dashboard-subtitle">
                Handle patient registrations, OPD entries, and billing.
            </p>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>Patients Registered Today</h3>
                    <p className="dashboard-value">42</p>
                </div>

                <div className="dashboard-card">
                    <h3>OPD Entries</h3>
                    <p className="dashboard-value">36</p>
                </div>

                <div className="dashboard-card">
                    <h3>Pending Bills</h3>
                    <p className="dashboard-value warning">7</p>
                </div>
            </div>
        </div>
    );
};

export default ReceptionistDashboard;
