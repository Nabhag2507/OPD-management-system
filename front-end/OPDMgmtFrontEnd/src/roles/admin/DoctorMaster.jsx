import { useState, useEffect } from "react";
import crudService from "../../services/crudService";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import AddForm from "../../components/crud/AddForm";
import EditForm from "../../components/crud/EditForm";
import DeleteConfirm from "../../components/crud/DeleteConfirm";

const DoctorMaster = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const response = await crudService.doctors.getAll();
            setDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
        setLoading(false);
    };

    const handleAdd = async (formData) => {
        try {
            const response = await crudService.doctors.create(formData);
            if (response.success) {
                setDoctors([...doctors, response.data]);
                setShowAddModal(false);
                alert("Doctor added successfully!");
            }
        } catch (error) {
            alert("Error adding doctor");
        }
    };

    const handleEdit = async (formData) => {
        try {
            const response = await crudService.doctors.update(selectedDoctor.id, formData);
            if (response.success) {
                setDoctors(doctors.map(d => d.id === selectedDoctor.id ? response.data : d));
                setShowEditModal(false);
                alert("Doctor updated successfully!");
            }
        } catch (error) {
            alert("Error updating doctor");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await crudService.doctors.delete(selectedDoctor.id);
            if (response.success) {
                setDoctors(doctors.filter(d => d.id !== selectedDoctor.id));
                setShowDeleteModal(false);
                alert("Doctor deleted successfully!");
            }
        } catch (error) {
            alert("Error deleting doctor");
        }
    };

    const columns = ["id", "name", "specialization", "hospital_id", "experience"];
    const fields = [
        { name: "name", label: "Doctor Name", type: "text", required: true },
        { name: "specialization", label: "Specialization", type: "text", required: true },
        { name: "hospital_id", label: "Hospital ID", type: "number", required: true },
        { name: "experience", label: "Years of Experience", type: "number", required: true }
    ];

    if (loading) return <div className="dashboard"><p>Loading...</p></div>;

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Doctor Master</h1>
            <Button label="Add Doctor" onClick={() => setShowAddModal(true)} className="btn-primary" />
            
            <Table
                columns={columns}
                data={doctors}
                onEdit={(item) => { setSelectedDoctor(item); setShowEditModal(true); }}
                onDelete={(item) => { setSelectedDoctor(item); setShowDeleteModal(true); }}
            />

            <Modal show={showAddModal} onClose={() => setShowAddModal(false)} title="Add Doctor">
                <AddForm fields={fields} onSubmit={handleAdd} />
            </Modal>

            <Modal show={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Doctor">
                {selectedDoctor && <EditForm fields={fields} initialData={selectedDoctor} onSubmit={handleEdit} />}
            </Modal>

            <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Confirm Delete">
                <DeleteConfirm onConfirm={handleDelete} onCancel={() => setShowDeleteModal(false)} />
            </Modal>
        </div>
    );
};

export default DoctorMaster;
