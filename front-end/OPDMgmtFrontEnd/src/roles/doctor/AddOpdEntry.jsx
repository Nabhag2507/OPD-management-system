import { useState } from "react";
import { useNavigate } from "react-router-dom";
import crudService from "../../services/crudService";
import Button from "../../components/common/Button";

const AddOPDPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        patient_id: "",
        doctor_id: "",
        diagnosis_id: "",
        date: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await crudService.opds.create(formData);
            if (response.success) {
                alert("OPD Entry added successfully!");
                navigate(-1);
            }
        } catch (error) {
            console.error(error);
            alert("Error adding OPD entry");
        }
    };

    return (
        <div className="dashboard">

            {/* Header */}
            <div className="form-header">
                <Button
                    label="← Back"
                    onClick={() => navigate(-1)}
                    variant="secondary"
                />
                <h1 className="dashboard-title">Add OPD Entry</h1>
            </div>

            {/* Form */}
            <div className="form-container">
                <form onSubmit={handleSubmit} className="opd-form">

                    <div className="form-group">
                        <label>Patient ID</label>
                        <input
                            type="number"
                            name="patient_id"
                            value={formData.patient_id}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Doctor ID</label>
                        <input
                            type="number"
                            name="doctor_id"
                            value={formData.doctor_id}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Diagnosis ID</label>
                        <input
                            type="number"
                            name="diagnosis_id"
                            value={formData.diagnosis_id}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <Button
                        label="Add OPD Entry"
                        type="submit"
                        variant="primary"
                    />

                </form>
            </div>

        </div>
    );
};

export default AddOPDPage;
