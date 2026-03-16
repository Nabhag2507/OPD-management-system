import { useEffect, useState } from "react";
import crudService from "../../services/crudService";
import Table from "../../components/common/Table";

const MyReceipts = () => {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const response = await crudService.receipts.getAll();
                setReceipts(response.data);
            } catch (error) {
                console.error("Error fetching receipts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReceipts();
    }, []);

    if (loading) return <div className="dashboard"><p>Loading...</p></div>;

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">My Receipts</h1>
            <Table columns={["id", "patient_id", "opd_id", "amount", "paymentMethod", "status"]} data={receipts} />
        </div>
    );
};

export default MyReceipts;
