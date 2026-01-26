import { useState, useEffect } from "react";
import crudService from "../../services/crudService";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import AddForm from "../../components/crud/AddForm";
import EditForm from "../../components/crud/EditForm";
import DeleteConfirm from "../../components/crud/DeleteConfirm";

const DiagnosisTypeMaster = () => {
    const [diagnosisTypes, setDiagnosisTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        fetchDiagnosisTypes();
    }, []);

    const fetchDiagnosisTypes = async () => {
        setLoading(true);
        try {
            const response = await crudService.diagnosisTypes.getAll();
            setDiagnosisTypes(response.data);
        } catch (error) {
            console.error("Error fetching diagnosis types:", error);
        }
        setLoading(false);
    };

    const handleAdd = async (formData) => {
        try {
            const response = await crudService.diagnosisTypes.create(formData);
            if (response.success) {
                setDiagnosisTypes([...diagnosisTypes, response.data]);
                setShowAddModal(false);
                alert("Diagnosis Type added successfully!");
            }
        } catch (error) {
            alert("Error adding diagnosis type");
        }
    };

    const handleEdit = async (formData) => {
        try {
            const response = await crudService.diagnosisTypes.update(selectedType.id, formData);
            if (response.success) {
                setDiagnosisTypes(diagnosisTypes.map(d => d.id === selectedType.id ? response.data : d));
                setShowEditModal(false);
                alert("Diagnosis Type updated successfully!");
            }
        } catch (error) {
            alert("Error updating diagnosis type");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await crudService.diagnosisTypes.delete(selectedType.id);
            if (response.success) {
                setDiagnosisTypes(diagnosisTypes.filter(d => d.id !== selectedType.id));
                setShowDeleteModal(false);
                alert("Diagnosis Type deleted successfully!");
            }
        } catch (error) {
            alert("Error deleting diagnosis type");
        }
    };

    const columns = ["id", "name", "code"];
    const fields = [
        { name: "name", label: "Diagnosis Name", type: "text", required: true },
        { name: "code", label: "Code", type: "text", required: true }
    ];

    if (loading) return <div className="dashboard"><p>Loading...</p></div>;

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Diagnosis Type Master</h1>
            <Button label="Add Diagnosis Type" onClick={() => setShowAddModal(true)} className="btn-primary" />
            
            <Table
                columns={columns}
                data={diagnosisTypes}
                onEdit={(item) => { setSelectedType(item); setShowEditModal(true); }}
                onDelete={(item) => { setSelectedType(item); setShowDeleteModal(true); }}
            />

            <Modal show={showAddModal} onClose={() => setShowAddModal(false)} title="Add Diagnosis Type">
                <AddForm fields={fields} onSubmit={handleAdd} />
            </Modal>

            <Modal show={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Diagnosis Type">
                {selectedType && <EditForm fields={fields} initialData={selectedType} onSubmit={handleEdit} />}
            </Modal>

            <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Confirm Delete">
                <DeleteConfirm onConfirm={handleDelete} onCancel={() => setShowDeleteModal(false)} />
            </Modal>
        </div>
    );
};

export default DiagnosisTypeMaster;
