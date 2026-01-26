import { useState, useEffect } from "react";
import crudService from "../../services/crudService";
import Table from "../../components/common/Table";

const MyPatients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        setLoading(true);
        try {
            const response = await crudService.patients.getAll();
            setPatients(response.data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
        setLoading(false);
    };

    const columns = ["id", "name", "email", "phone", "age"];

    if (loading) return <div className="dashboard"><p>Loading...</p></div>;

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">My Patients</h1>
            <Table columns={columns} data={patients} />
        </div>
    );
};

export default MyPatients;
