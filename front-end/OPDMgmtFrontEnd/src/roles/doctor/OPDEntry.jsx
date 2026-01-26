import { useState, useEffect } from "react";
import crudService from "../../services/crudService";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import AddForm from "../../components/crud/AddForm";

const OPDEntry = () => {
    const [opds, setOpds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchOPDs();
    }, []);

    const fetchOPDs = async () => {
        setLoading(true);
        try {
            const response = await crudService.opds.getAll();
            setOpds(response.data);
        } catch (error) {
            console.error("Error fetching OPD data:", error);
        }
        setLoading(false);
    };

    const handleAdd = async (formData) => {
        try {
            const response = await crudService.opds.create(formData);
            if (response.success) {
                setOpds([...opds, response.data]);
                setShowModal(false);
                alert("OPD Entry added successfully!");
            }
        } catch (error) {
            alert("Error adding OPD entry");
        }
    };

    const columns = ["id", "patient_id", "doctor_id", "diagnosis_id", "date"];
    const fields = [
        { name: "patient_id", label: "Patient ID", type: "number", required: true },
        { name: "doctor_id", label: "Doctor ID", type: "number", required: true },
        { name: "diagnosis_id", label: "Diagnosis ID", type: "number", required: true },
        { name: "date", label: "Date", type: "date", required: true }
    ];

    if (loading) return <div className="dashboard"><p>Loading...</p></div>;

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">OPD Entry</h1>
            <Button label="Add OPD Entry" onClick={() => setShowModal(true)} className="btn-primary" />
            
            <Table columns={columns} data={opds} />

            <Modal show={showModal} onClose={() => setShowModal(false)} title="Add OPD Entry">
                <AddForm fields={fields} onSubmit={handleAdd} />
            </Modal>
        </div>
    );
};

export default OPDEntry;
