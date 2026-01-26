const FormInput = ({ label, name, type = "text", value, onChange, required = false, placeholder = "" }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="form-input"
            />
        </div>
    );
};

export default FormInput;
