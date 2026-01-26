import { useState } from "react";

const MyTreatments = () => {
    const [treatments] = useState([
        { id: 1, treatment: "General Check-up", date: "2025-01-20", doctor: "Dr. Sharma", cost: "₹500" },
        { id: 2, treatment: "Blood Test", date: "2025-01-21", doctor: "Dr. Patel", cost: "₹1000" },
        { id: 3, treatment: "Consultation", date: "2025-01-25", doctor: "Dr. Kumar", cost: "₹800" }
    ]);

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">My Treatments</h1>
            
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Treatment</th>
                        <th>Date</th>
                        <th>Doctor</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {treatments.map(t => (
                        <tr key={t.id}>
                            <td>{t.id}</td>
                            <td>{t.treatment}</td>
                            <td>{t.date}</td>
                            <td>{t.doctor}</td>
                            <td>{t.cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyTreatments;
