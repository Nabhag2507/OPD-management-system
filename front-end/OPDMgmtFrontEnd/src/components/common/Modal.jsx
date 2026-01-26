const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content smooth-transition" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header" style={{ animation: 'slideInFromTop 0.3s ease-out' }}>
                    <h2>{title}</h2>
                    <button 
                        className="close-btn smooth-transition" 
                        onClick={onClose}
                        style={{ cursor: 'pointer' }}
                    >
                        ×
                    </button>
                </div>
                <div className="modal-body" style={{ animation: 'fadeIn 0.3s ease-out 0.1s both' }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
