import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../services/dashboardService";
import { StatCard, SimpleChart, ActivityFeed, AnalyticsCard } from "../../components/common/AdvancedComponents";

const AdminDashboard = () => {
    const [data, setData] = useState({
        totalHospitals: 3,
        totalDoctors: 24,
        activePatients: 1248,
        systemStatus: "Operational"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAdminDashboard().then(data => {
            setData(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const activities = [
        { action: "New patient registered", time: "2 minutes ago", color: "#3fb950" },
        { action: "Doctor Dr. Sharma checked in", time: "15 minutes ago", color: "#58a6ff" },
        { action: "Billing receipt #1024 created", time: "1 hour ago", color: "#d29922" },
        { action: "OPD entry completed", time: "2 hours ago", color: "#238636" },
        { action: "System backup completed", time: "5 hours ago", color: "#1f6feb" }
    ];

    const chartData = [
        { label: "Hospital A", value: 450 },
        { label: "Hospital B", value: 380 },
        { label: "Hospital C", value: 520 }
    ];

    if (loading) return <div className="dashboard"><p>Loading...</p></div>;

    return (
        <div className="dashboard">
            <div style={{ animation: 'slideInFromTop 0.4s ease-out' }}>
                <h1 className="dashboard-title text-gradient">Admin Dashboard</h1>
                <p className="dashboard-subtitle">
                    System overview and operations management
                </p>
            </div>

            {/* Stats Grid */}
            <div className="dashboard-grid">
                <StatCard 
                    title="Total Hospitals" 
                    value={data.totalHospitals}
                    icon="🏥"
                    color="#238636"
                    trend={5}
                />
                <StatCard 
                    title="Total Doctors" 
                    value={data.totalDoctors}
                    icon="👨‍⚕️"
                    color="#58a6ff"
                    trend={8}
                />
                <StatCard 
                    title="Active Patients" 
                    value={data.activePatients}
                    icon="👥"
                    color="#1f6feb"
                    trend={12}
                />
                <StatCard 
                    title="System Status" 
                    value={data.systemStatus}
                    icon="✓"
                    color="#3fb950"
                />
            </div>

            {/* Analytics Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '20px', marginTop: '30px' }}>
                <SimpleChart 
                    data={chartData}
                    title="Patient Distribution by Hospital"
                    type="bar"
                />
                
                <ActivityFeed activities={activities} />
            </div>

            {/* Analytics Cards */}
            <div style={{ marginTop: '30px' }}>
                <AnalyticsCard 
                    title="OPD Performance Metrics"
                    stats={[
                        { name: "Today's OPD", value: '42' },
                        { name: "This Week", value: '285' },
                        { name: "This Month", value: '1,248' },
                        { name: "Avg Rating", value: '4.8★' }
                    ]}
                />
            </div>
        </div>
    );
};

export default AdminDashboard;
