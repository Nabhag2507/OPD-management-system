import { useState, useEffect } from "react";
import FormInput from "../common/FormInput";
import Button from "../common/Button";

const EditForm = ({ fields, initialData, onSubmit }) => {
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="form" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            {fields.map((field, idx) => (
                <div key={field.name} style={{ animation: `slideInFromLeft 0.3s ease-out ${idx * 0.05}s both` }}>
                    <FormInput
                        label={field.label}
                        name={field.name}
                        type={field.type || "text"}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.label}
                    />
                </div>
            ))}
            <div className="form-actions">
                <Button label="Update" type="submit" className="btn-primary" />
            </div>
        </form>
    );
};

export default EditForm;
