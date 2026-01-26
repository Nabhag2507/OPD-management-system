import { useState, useEffect } from "react";
import crudService from "../../services/crudService";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import AddForm from "../../components/crud/AddForm";
import EditForm from "../../components/crud/EditForm";

const PatientRegistration = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

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

    const handleAdd = async (formData) => {
        try {
            const response = await crudService.patients.create(formData);
            if (response.success) {
                setPatients([...patients, response.data]);
                setShowAddModal(false);
                alert("Patient registered successfully!");
            }
        } catch (error) {
            alert("Error registering patient");
        }
    };

    const handleEdit = async (formData) => {
        try {
            const response = await crudService.patients.update(selectedPatient.id, formData);
            if (response.success) {
                setPatients(patients.map(p => p.id === selectedPatient.id ? response.data : p));
                setShowEditModal(false);
                alert("Patient updated successfully!");
            }
        } catch (error) {
            alert("Error updating patient");
        }
    };

    const columns = ["id", "name", "email", "phone", "age"];
    const fields = [
        { name: "name", label: "Patient Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", type: "tel", required: true },
        { name: "age", label: "Age", type: "number", required: true }
    ];

    if (loading) return <div className="dashboard"><p>Loading...</p></div>;

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Patient Registration</h1>
            <Button label="Register Patient" onClick={() => setShowAddModal(true)} className="btn-primary" />
            
            <Table
                columns={columns}
                data={patients}
                onEdit={(item) => { setSelectedPatient(item); setShowEditModal(true); }}
            />

            <Modal show={showAddModal} onClose={() => setShowAddModal(false)} title="Register Patient">
                <AddForm fields={fields} onSubmit={handleAdd} />
            </Modal>

            <Modal show={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Patient">
                {selectedPatient && <EditForm fields={fields} initialData={selectedPatient} onSubmit={handleEdit} />}
            </Modal>
        </div>
    );
};

export default PatientRegistration;
