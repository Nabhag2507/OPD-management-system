import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import crudService from "../../services/crudService";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import AddForm from "../../components/crud/AddForm";
import EditForm from "../../components/crud/EditForm";
import DeleteConfirm from "../../components/crud/DeleteConfirm";
import { SearchBar, FilterBar } from "../../components/common/AdvancedComponents";

const HospitalMaster = () => {
    const [hospitals, setHospitals] = useState([]);
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({ status: "all" });

    useEffect(() => {
        fetchHospitals();
    }, []);

    const fetchHospitals = async () => {
        setLoading(true);
        try {
            const response = await crudService.hospitals.getAll();
            setHospitals(response.data);
            setFilteredHospitals(response.data);
        } catch (error) {
            console.error("Error fetching hospitals:", error);
        }
        setLoading(false);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        applyFilters(hospitals, term, filters);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        applyFilters(hospitals, searchTerm, newFilters);
    };

    const applyFilters = (data, search, activeFilters) => {
        let filtered = data;

        // Search filter
        if (search) {
            filtered = filtered.filter(h => 
                h.name.toLowerCase().includes(search.toLowerCase()) ||
                h.location?.toLowerCase().includes(search.toLowerCase()) ||
                h.beds?.toString().includes(search)
            );
        }

        // Status filter
        if (activeFilters.status !== "all") {
            filtered = filtered.filter(h => h.status === activeFilters.status);
        }

        setFilteredHospitals(filtered);
    };

    const handleAdd = async (formData) => {
        try {
            const response = await crudService.hospitals.create(formData);
            if (response.success) {
                const updatedHospitals = [...hospitals, response.data];
                setHospitals(updatedHospitals);
                setFilteredHospitals(updatedHospitals);
                setShowAddModal(false);
                alert("Hospital added successfully!");
            }
        } catch (error) {
            alert("Error adding hospital");
        }
    };

    const handleEdit = async (formData) => {
        try {
            const response = await crudService.hospitals.update(selectedHospital.id, formData);
            if (response.success) {
                const updatedHospitals = hospitals.map(h => h.id === selectedHospital.id ? response.data : h);
                setHospitals(updatedHospitals);
                applyFilters(updatedHospitals, searchTerm, filters);
                setShowEditModal(false);
                alert("Hospital updated successfully!");
            }
        } catch (error) {
            alert("Error updating hospital");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await crudService.hospitals.delete(selectedHospital.id);
            if (response.success) {
                const updatedHospitals = hospitals.filter(h => h.id !== selectedHospital.id);
                setHospitals(updatedHospitals);
                applyFilters(updatedHospitals, searchTerm, filters);
                setShowDeleteModal(false);
                alert("Hospital deleted successfully!");
            }
        } catch (error) {
            alert("Error deleting hospital");
        }
    };

    const columns = ["id", "name", "location", "beds"];
    const fields = [
        { name: "name", label: "Hospital Name", type: "text", required: true },
        { name: "location", label: "Location", type: "text", required: true },
        { name: "beds", label: "Total Beds", type: "number", required: true }
    ];

    if (loading) return <div className="dashboard"><p>Loading...</p></div>;

    return (
        <div className="dashboard" style={{ animation: 'slideInFromTop 0.4s ease-out' }}>
            <div style={{ marginBottom: '30px' }}>
                <h1 className="dashboard-title text-gradient">Hospital Master</h1>
                <p className="dashboard-subtitle">Manage hospital information and settings</p>
            </div>

            {/* Search and Filter Bar */}
            <div style={{ marginBottom: '25px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <SearchBar 
                    onSearch={handleSearch} 
                    placeholder="Search hospitals by name or location..."
                />
                <FilterBar 
                    filters={[
                        { key: 'status', label: 'Status', options: ['all', 'active', 'inactive'] }
                    ]}
                    onFilterChange={handleFilterChange}
                />
            </div>

            {/* Add Button and Counter */}
            <div style={{ marginBottom: '20px' }}>
                <Button 
                    label="+ Add Hospital" 
                    onClick={() => setShowAddModal(true)} 
                    className="btn-primary"
                    style={{ animation: 'slideInFromLeft 0.3s ease-out' }}
                />
                <span style={{ marginLeft: '15px', color: '#8b949e', fontSize: '14px' }}>
                    Showing {filteredHospitals.length} of {hospitals.length} hospitals
                </span>
            </div>
            
            <Table
                columns={columns}
                data={filteredHospitals}
                onEdit={(item) => { setSelectedHospital(item); setShowEditModal(true); }}
                onDelete={(item) => { setSelectedHospital(item); setShowDeleteModal(true); }}
            />

            <Modal show={showAddModal} onClose={() => setShowAddModal(false)} title="Add Hospital">
                <AddForm fields={fields} onSubmit={handleAdd} />
            </Modal>

            <Modal show={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Hospital">
                {selectedHospital && <EditForm fields={fields} initialData={selectedHospital} onSubmit={handleEdit} />}
            </Modal>

            <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Confirm Delete">
                <DeleteConfirm onConfirm={handleDelete} onCancel={() => setShowDeleteModal(false)} />
            </Modal>
        </div>
    );
};

export default HospitalMaster;
