import { useState, useEffect } from "react";
import crudService from "../../services/crudService";
import Table from "../../components/common/Table";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([
        { id: 1, doctorName: "Dr. Sharma", date: "2025-01-28", time: "10:00 AM", status: "Confirmed" },
        { id: 2, doctorName: "Dr. Patel", date: "2025-02-03", time: "2:00 PM", status: "Pending" }
    ]);

    const columns = ["id", "doctorName", "date", "time", "status"];

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">My Appointments</h1>
            <Table columns={columns} data={appointments} />
        </div>
    );
};

export default MyAppointments;
