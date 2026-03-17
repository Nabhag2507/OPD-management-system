const Button = ({
    label,
    onClick,
    variant = "primary",
    disabled = false,
    type = "button",
    className = "",
    style,
}) => {
    const buttonClassName = ["btn", variant, className].filter(Boolean).join(" ");

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={buttonClassName}
            style={style}
        >
            <span>{label}</span>
        </button>
    );
};

export default Button;
