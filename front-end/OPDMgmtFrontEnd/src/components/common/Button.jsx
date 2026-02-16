const Button = ({
    label,
    onClick,
    variant = "primary",
    disabled = false,
    type = "button"
}) => {

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn ${variant}`}
        >
            <span>{label}</span>
        </button>
    );
};

export default Button;
