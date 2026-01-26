const Button = ({ label, onClick, className = "btn-primary", disabled = false, type = "button" }) => {
    return (
        <button 
            type={type} 
            className={`${className} smooth-transition`}
            onClick={onClick} 
            disabled={disabled}
            style={{
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {label}
        </button>
    );
};

export default Button;
