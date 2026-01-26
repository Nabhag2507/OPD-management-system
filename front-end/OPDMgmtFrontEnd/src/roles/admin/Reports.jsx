const Reports = () => {
    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Reports & Analytics</h1>
            
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>Patient Statistics</h3>
                    <p className="dashboard-value">1,248</p>
                    <p className="dashboard-subtitle">Total Registered Patients</p>
                </div>

                <div className="dashboard-card">
                    <h3>OPD Visits</h3>
                    <p className="dashboard-value">342</p>
                    <p className="dashboard-subtitle">This Month</p>
                </div>

                <div className="dashboard-card">
                    <h3>Revenue</h3>
                    <p className="dashboard-value">₹245,000</p>
                    <p className="dashboard-subtitle">Monthly Revenue</p>
                </div>

                <div className="dashboard-card">
                    <h3>Doctor Performance</h3>
                    <p className="dashboard-value">4.8/5</p>
                    <p className="dashboard-subtitle">Average Rating</p>
                </div>
            </div>
        </div>
    );
};

export default Reports;
