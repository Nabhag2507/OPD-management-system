import { useEffect, useState } from "react";
import crudService from "../../services/crudService";
import Table from "../../components/common/Table";

const MyTreatments = () => {
    const [treatments, setTreatments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTreatments = async () => {
            try {
                const response = await crudService.treatmentTypes.getAll();
                setTreatments(response.data);
            } catch (error) {
                console.error("Error fetching treatments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTreatments();
    }, []);

    if (loading) return <div className="dashboard"><p>Loading...</p></div>;

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">My Treatments</h1>
            <Table columns={["id", "name", "cost"]} data={treatments} />
        </div>
    );
};

export default MyTreatments;
