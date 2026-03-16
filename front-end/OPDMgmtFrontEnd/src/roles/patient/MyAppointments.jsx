import { useEffect, useState } from "react";
import crudService from "../../services/crudService";
import Table from "../../components/common/Table";

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await crudService.appointments.getAll();
                setAppointments(response.data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    if (loading) return <div className="dashboard"><p>Loading...</p></div>;

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">My Appointments</h1>
            <Table columns={["id", "patient_id", "doctor_id", "date", "status"]} data={appointments} />
        </div>
    );
};

export default MyAppointments;
