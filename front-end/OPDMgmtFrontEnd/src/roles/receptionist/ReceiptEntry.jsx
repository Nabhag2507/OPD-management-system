import { useState, useEffect } from "react";
import crudService from "../../services/crudService";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import AddForm from "../../components/crud/AddForm";

const ReceiptEntry = () => {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchReceipts();
    }, []);

    const fetchReceipts = async () => {
        setLoading(true);
        try {
            const response = await crudService.receipts.getAll();
            setReceipts(response.data);
        } catch (error) {
            console.error("Error fetching receipts:", error);
        }
        setLoading(false);
    };

    const handleAdd = async (formData) => {
        try {
            const response = await crudService.receipts.create(formData);
            if (response.success) {
                setReceipts([...receipts, response.data]);
                setShowModal(false);
                alert("Receipt created successfully!");
            }
        } catch (error) {
            alert("Error creating receipt");
        }
    };

    const columns = ["id", "patient_id", "amount", "date", "status"];
    const fields = [
        { name: "patient_id", label: "Patient ID", type: "number", required: true },
        { name: "amount", label: "Amount", type: "number", required: true },
        { name: "date", label: "Date", type: "date", required: true },
        { name: "status", label: "Status", type: "text", required: true }
    ];

    if (loading) return <div className="dashboard"><p>Loading...</p></div>;

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Receipt Entry</h1>
            <Button label="Create Receipt" onClick={() => setShowModal(true)} className="btn-primary" />
            
            <Table columns={columns} data={receipts} />

            <Modal show={showModal} onClose={() => setShowModal(false)} title="Create Receipt">
                <AddForm fields={fields} onSubmit={handleAdd} />
            </Modal>
        </div>
    );
};

export default ReceiptEntry;
