import { useState, useEffect } from "react";
import crudService from "../../services/crudService";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import AddForm from "../../components/crud/AddForm";
import EditForm from "../../components/crud/EditForm";
import DeleteConfirm from "../../components/crud/DeleteConfirm";

const SubTreatmentTypeMaster = () => {
    const [subTreatmentTypes, setSubTreatmentTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        fetchSubTreatmentTypes();
    }, []);

    const fetchSubTreatmentTypes = async () => {
        setLoading(true);
        try {
            const response = await crudService.subTreatmentTypes.getAll();
            setSubTreatmentTypes(response.data);
        } catch (error) {
            console.error("Error fetching sub treatment types:", error);
        }
        setLoading(false);
    };

    const handleAdd = async (formData) => {
        try {
            const response = await crudService.subTreatmentTypes.create(formData);
            if (response.success) {
                setSubTreatmentTypes([...subTreatmentTypes, response.data]);
                setShowAddModal(false);
                alert("Sub Treatment Type added successfully!");
            }
        } catch (error) {
            alert("Error adding sub treatment type");
        }
    };

    const handleEdit = async (formData) => {
        try {
            const response = await crudService.subTreatmentTypes.update(selectedType.id, formData);
            if (response.success) {
                setSubTreatmentTypes(subTreatmentTypes.map(s => s.id === selectedType.id ? response.data : s));
                setShowEditModal(false);
                alert("Sub Treatment Type updated successfully!");
            }
        } catch (error) {
            alert("Error updating sub treatment type");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await crudService.subTreatmentTypes.delete(selectedType.id);
            if (response.success) {
                setSubTreatmentTypes(subTreatmentTypes.filter(s => s.id !== selectedType.id));
                setShowDeleteModal(false);
                alert("Sub Treatment Type deleted successfully!");
            }
        } catch (error) {
            alert("Error deleting sub treatment type");
        }
    };

    const columns = ["id", "treatment_type_id", "name", "cost"];
    const fields = [
        { name: "treatment_type_id", label: "Treatment Type ID", type: "number", required: true },
        { name: "name", label: "Sub Treatment Name", type: "text", required: true },
        { name: "cost", label: "Cost", type: "number", required: true }
    ];

    if (loading) return <div className="dashboard"><p>Loading...</p></div>;

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Sub Treatment Type Master</h1>
            <Button label="Add Sub Treatment Type" onClick={() => setShowAddModal(true)} className="btn-primary" />
            
            <Table
                columns={columns}
                data={subTreatmentTypes}
                onEdit={(item) => { setSelectedType(item); setShowEditModal(true); }}
                onDelete={(item) => { setSelectedType(item); setShowDeleteModal(true); }}
            />

            <Modal show={showAddModal} onClose={() => setShowAddModal(false)} title="Add Sub Treatment Type">
                <AddForm fields={fields} onSubmit={handleAdd} />
            </Modal>

            <Modal show={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Sub Treatment Type">
                {selectedType && <EditForm fields={fields} initialData={selectedType} onSubmit={handleEdit} />}
            </Modal>

            <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Confirm Delete">
                <DeleteConfirm onConfirm={handleDelete} onCancel={() => setShowDeleteModal(false)} />
            </Modal>
        </div>
    );
};

export default SubTreatmentTypeMaster;
