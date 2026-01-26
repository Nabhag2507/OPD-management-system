import { useState, useEffect } from "react";
import crudService from "../../services/crudService";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import AddForm from "../../components/crud/AddForm";
import EditForm from "../../components/crud/EditForm";
import DeleteConfirm from "../../components/crud/DeleteConfirm";

const TreatmentTypeMaster = () => {
    const [treatmentTypes, setTreatmentTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        fetchTreatmentTypes();
    }, []);

    const fetchTreatmentTypes = async () => {
        setLoading(true);
        try {
            const response = await crudService.treatmentTypes.getAll();
            setTreatmentTypes(response.data);
        } catch (error) {
            console.error("Error fetching treatment types:", error);
        }
        setLoading(false);
    };

    const handleAdd = async (formData) => {
        try {
            const response = await crudService.treatmentTypes.create(formData);
            if (response.success) {
                setTreatmentTypes([...treatmentTypes, response.data]);
                setShowAddModal(false);
                alert("Treatment Type added successfully!");
            }
        } catch (error) {
            alert("Error adding treatment type");
        }
    };

    const handleEdit = async (formData) => {
        try {
            const response = await crudService.treatmentTypes.update(selectedType.id, formData);
            if (response.success) {
                setTreatmentTypes(treatmentTypes.map(t => t.id === selectedType.id ? response.data : t));
                setShowEditModal(false);
                alert("Treatment Type updated successfully!");
            }
        } catch (error) {
            alert("Error updating treatment type");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await crudService.treatmentTypes.delete(selectedType.id);
            if (response.success) {
                setTreatmentTypes(treatmentTypes.filter(t => t.id !== selectedType.id));
                setShowDeleteModal(false);
                alert("Treatment Type deleted successfully!");
            }
        } catch (error) {
            alert("Error deleting treatment type");
        }
    };

    const columns = ["id", "name", "cost"];
    const fields = [
        { name: "name", label: "Treatment Name", type: "text", required: true },
        { name: "cost", label: "Cost", type: "number", required: true }
    ];

    if (loading) return <div className="dashboard"><p>Loading...</p></div>;

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Treatment Type Master</h1>
            <Button label="Add Treatment Type" onClick={() => setShowAddModal(true)} className="btn-primary" />
            
            <Table
                columns={columns}
                data={treatmentTypes}
                onEdit={(item) => { setSelectedType(item); setShowEditModal(true); }}
                onDelete={(item) => { setSelectedType(item); setShowDeleteModal(true); }}
            />

            <Modal show={showAddModal} onClose={() => setShowAddModal(false)} title="Add Treatment Type">
                <AddForm fields={fields} onSubmit={handleAdd} />
            </Modal>

            <Modal show={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Treatment Type">
                {selectedType && <EditForm fields={fields} initialData={selectedType} onSubmit={handleEdit} />}
            </Modal>

            <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Confirm Delete">
                <DeleteConfirm onConfirm={handleDelete} onCancel={() => setShowDeleteModal(false)} />
            </Modal>
        </div>
    );
};

export default TreatmentTypeMaster;
